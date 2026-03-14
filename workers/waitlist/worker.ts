// Cloudflare Worker — Waitlist email capture
// Deploy: `cd workers/waitlist && npx wrangler deploy`
// Setup: `npx wrangler kv:namespace create WAITLIST` → paste ID into wrangler.toml

interface Env {
  WAITLIST: KVNamespace;
  ADMIN_SECRET: string; // set via `wrangler secret put ADMIN_SECRET`
}

// Production origins only — add http://localhost:8080 etc. for local dev
const ALLOWED_ORIGINS = new Set([
  "https://seqrets.app",
]);

// [M-1] Reject unauthorized origins instead of falling back to a valid one
function getCorsHeaders(request: Request): Record<string, string> | null {
  const origin = request.headers.get("Origin") || "";
  if (!ALLOWED_ORIGINS.has(origin)) return null;
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Admin-Secret",
  };
}

// Fallback CORS headers for error responses (no origin reflection)
const DENY_CORS: Record<string, string> = {
  "Access-Control-Allow-Origin": "https://seqrets.app",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, X-Admin-Secret",
};

// [M-4] Stricter email validation: requires 2+ char TLD, no dots-only, max 254 chars
const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
const MAX_EMAIL_LENGTH = 254; // RFC 5321

// --- Rate limiting (uses WAITLIST KV with "ratelimit:" prefix) ---
const ADMIN_RATE_LIMIT_MAX = 5;    // max failed admin auth attempts before lockout
const ADMIN_RATE_LIMIT_WINDOW_S = 900; // 15-minute lockout window

// [H-1] Separate rate limit for public POST endpoint
const SIGNUP_RATE_LIMIT_MAX = 10;     // max signups per IP per window
const SIGNUP_RATE_LIMIT_WINDOW_S = 3600; // 1-hour window

function rateLimitKey(request: Request, prefix: string): string {
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  return `ratelimit:${prefix}:${ip}`;
}

async function isRateLimited(kv: KVNamespace, key: string, max: number): Promise<boolean> {
  const raw = await kv.get(key);
  if (!raw) return false;
  try {
    const { count } = JSON.parse(raw) as { count: number };
    return count >= max;
  } catch {
    return false;
  }
}

async function recordAttempt(kv: KVNamespace, key: string, ttl: number): Promise<void> {
  const raw = await kv.get(key);
  let count = 1;
  if (raw) {
    try {
      count = (JSON.parse(raw) as { count: number }).count + 1;
    } catch {
      // Corrupted entry — reset to 1
    }
  }
  await kv.put(key, JSON.stringify({ count }), { expirationTtl: ttl });
}

async function clearRateLimit(kv: KVNamespace, key: string): Promise<void> {
  await kv.delete(key);
}

// [H-2] Constant-time string comparison using HMAC to prevent timing attacks
async function timeSafeEqual(a: string, b: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode("seqrets-hmac-comparison-key");
  const key = await crypto.subtle.importKey(
    "raw", keyData, { name: "HMAC", hash: "SHA-256" }, false, ["sign"],
  );
  const sigA = new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(a)));
  const sigB = new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(b)));
  if (sigA.length !== sigB.length) return false;
  let result = 0;
  for (let i = 0; i < sigA.length; i++) {
    result |= sigA[i] ^ sigB[i];
  }
  return result === 0;
}

const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Cache-Control": "no-store, no-cache", // [L-1] Prevent caching of API responses
};

function jsonResponse(body: Record<string, unknown>, status: number, extra: Record<string, string>) {
  return new Response(JSON.stringify(body, null, status === 200 ? 2 : 0), {
    status,
    headers: { ...extra, ...SECURITY_HEADERS, "Content-Type": "application/json" },
  });
}

// [H-3] Validate request body size before parsing
const MAX_BODY_SIZE = 10240; // 10 KB

// [M-3] Validate Content-Type before JSON parsing, with [C-4] error handling
async function safeParseJson(request: Request): Promise<{ ok: true; data: unknown } | { ok: false; error: string }> {
  const contentType = request.headers.get("Content-Type") || "";
  if (!contentType.includes("application/json")) {
    return { ok: false, error: "Content-Type must be application/json" };
  }

  const contentLength = parseInt(request.headers.get("Content-Length") || "0", 10);
  if (contentLength > MAX_BODY_SIZE) {
    return { ok: false, error: "Payload too large" };
  }

  try {
    const text = await request.text();
    if (text.length > MAX_BODY_SIZE) {
      return { ok: false, error: "Payload too large" };
    }
    const data = JSON.parse(text);
    return { ok: true, data };
  } catch {
    return { ok: false, error: "Invalid JSON" };
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const cors = getCorsHeaders(request);
    // Use valid CORS for allowed origins, fallback for rejected origins
    const responseCors = cors ?? DENY_CORS;

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: { ...responseCors, ...SECURITY_HEADERS } });
    }

    // Admin endpoint: GET / → list waitlist entries (requires ADMIN_SECRET header)
    if (request.method === "GET") {
      const rlKey = rateLimitKey(request, "admin");
      if (await isRateLimited(env.WAITLIST, rlKey, ADMIN_RATE_LIMIT_MAX)) {
        // [H-7] Generic error message — don't distinguish rate limit from auth failure
        return jsonResponse({ error: "Access denied" }, 403, responseCors);
      }

      const secret = request.headers.get("X-Admin-Secret") || "";
      if (!secret || !(await timeSafeEqual(secret, env.ADMIN_SECRET))) {
        await recordAttempt(env.WAITLIST, rlKey, ADMIN_RATE_LIMIT_WINDOW_S);
        // [H-7] Same generic error for wrong secret, missing secret, or rate limit
        return jsonResponse({ error: "Access denied" }, 403, responseCors);
      }

      await clearRateLimit(env.WAITLIST, rlKey);

      try {
        const keys = await env.WAITLIST.list();
        // [H-4] Only return email-namespaced keys, skip ratelimit: keys
        const emailKeys = keys.keys.filter((k) => k.name.startsWith("email:"));
        const entries = await Promise.all(
          emailKeys.map(async (k) => {
            const val = await env.WAITLIST.get(k.name);
            return { key: k.name.replace(/^email:/, ""), value: val };
          }),
        );
        return jsonResponse({ count: emailKeys.length, entries }, 200, responseCors);
      } catch {
        return jsonResponse({ error: "Internal error" }, 500, responseCors);
      }
    }

    // Admin endpoint: DELETE / → remove a waitlist entry (requires ADMIN_SECRET header)
    if (request.method === "DELETE") {
      const rlKey = rateLimitKey(request, "admin");
      if (await isRateLimited(env.WAITLIST, rlKey, ADMIN_RATE_LIMIT_MAX)) {
        return jsonResponse({ error: "Access denied" }, 403, responseCors);
      }

      const secret = request.headers.get("X-Admin-Secret") || "";
      if (!secret || !(await timeSafeEqual(secret, env.ADMIN_SECRET))) {
        await recordAttempt(env.WAITLIST, rlKey, ADMIN_RATE_LIMIT_WINDOW_S);
        return jsonResponse({ error: "Access denied" }, 403, responseCors);
      }

      await clearRateLimit(env.WAITLIST, rlKey);

      const parsed = await safeParseJson(request);
      if (!parsed.ok) {
        return jsonResponse({ error: parsed.error }, 400, responseCors);
      }

      const { email } = parsed.data as { email?: string };
      const trimmed = email?.trim().toLowerCase();

      if (!trimmed) {
        return jsonResponse({ error: "Email required" }, 400, responseCors);
      }

      // [H-4] Use namespaced key for deletion
      await env.WAITLIST.delete(`email:${trimmed}`);
      return jsonResponse({ ok: true, deleted: trimmed }, 200, responseCors);
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", {
        status: 405,
        headers: { ...responseCors, ...SECURITY_HEADERS },
      });
    }

    // [H-1] Rate limit public POST endpoint
    const signupRlKey = rateLimitKey(request, "signup");
    if (await isRateLimited(env.WAITLIST, signupRlKey, SIGNUP_RATE_LIMIT_MAX)) {
      return jsonResponse({ error: "Too many requests. Please try again later." }, 429, responseCors);
    }

    const parsed = await safeParseJson(request);
    if (!parsed.ok) {
      return jsonResponse({ error: parsed.error }, 400, responseCors);
    }

    const { email, source } = parsed.data as {
      email?: string;
      source?: string;
    };

    const trimmed = email?.trim().toLowerCase();

    // [M-4] Validate with stricter regex + length check
    if (!trimmed || trimmed.length > MAX_EMAIL_LENGTH || !EMAIL_RE.test(trimmed)) {
      return jsonResponse({ error: "Invalid email address" }, 400, responseCors);
    }

    // Record the signup attempt for rate limiting
    await recordAttempt(env.WAITLIST, signupRlKey, SIGNUP_RATE_LIMIT_WINDOW_S);

    // [H-4] Namespace email keys with "email:" prefix to prevent collision with ratelimit keys
    const kvKey = `email:${trimmed}`;

    // Deduplicate: use email as key, store metadata as value
    const existing = await env.WAITLIST.get(kvKey);

    const payload = JSON.stringify({
      email: trimmed,
      source: source || "unknown",
      signedUpAt: new Date().toISOString(),
    });

    if (!existing) {
      await env.WAITLIST.put(kvKey, payload);
    }

    return jsonResponse({ ok: true }, 200, responseCors);
  },
};
