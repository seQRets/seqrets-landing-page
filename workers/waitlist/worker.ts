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

function getCorsHeaders(request: Request) {
  const origin = request.headers.get("Origin") || "";
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGINS.has(origin) ? origin : "https://seqrets.app",
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Admin-Secret",
  };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// --- Admin rate limiting (uses WAITLIST KV with "ratelimit:" prefix) ---
const RATE_LIMIT_MAX = 5;        // max failed attempts before lockout
const RATE_LIMIT_WINDOW_S = 900; // 15-minute lockout window

function rateLimitKey(request: Request): string {
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  return `ratelimit:${ip}`;
}

async function isRateLimited(kv: KVNamespace, key: string): Promise<boolean> {
  const raw = await kv.get(key);
  if (!raw) return false;
  const { count } = JSON.parse(raw) as { count: number };
  return count >= RATE_LIMIT_MAX;
}

async function recordFailedAttempt(kv: KVNamespace, key: string): Promise<void> {
  const raw = await kv.get(key);
  const count = raw ? (JSON.parse(raw) as { count: number }).count + 1 : 1;
  await kv.put(key, JSON.stringify({ count }), { expirationTtl: RATE_LIMIT_WINDOW_S });
}

async function clearRateLimit(kv: KVNamespace, key: string): Promise<void> {
  await kv.delete(key);
}

const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
};

function jsonResponse(body: Record<string, unknown>, status: number, extra: Record<string, string>) {
  return new Response(JSON.stringify(body, null, status === 200 ? 2 : 0), {
    status,
    headers: { ...extra, ...SECURITY_HEADERS, "Content-Type": "application/json" },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const cors = getCorsHeaders(request);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: { ...cors, ...SECURITY_HEADERS } });
    }

    // Admin endpoint: GET / → list waitlist entries (requires ADMIN_SECRET header)
    if (request.method === "GET") {
      const rlKey = rateLimitKey(request);
      if (await isRateLimited(env.WAITLIST, rlKey)) {
        return jsonResponse({ error: "Too many attempts. Try again later." }, 429, cors);
      }

      const secret = request.headers.get("X-Admin-Secret");
      if (!secret || secret !== env.ADMIN_SECRET) {
        await recordFailedAttempt(env.WAITLIST, rlKey);
        return jsonResponse({ error: "Unauthorized" }, 401, cors);
      }

      await clearRateLimit(env.WAITLIST, rlKey);

      try {
        const keys = await env.WAITLIST.list();
        const entries = await Promise.all(
          keys.keys.map(async (k) => {
            const val = await env.WAITLIST.get(k.name);
            return { key: k.name, value: val };
          }),
        );
        return jsonResponse({ count: keys.keys.length, entries }, 200, cors);
      } catch {
        return jsonResponse({ error: "KV list failed" }, 500, cors);
      }
    }

    // Admin endpoint: DELETE / → remove a waitlist entry (requires ADMIN_SECRET header)
    if (request.method === "DELETE") {
      const rlKey = rateLimitKey(request);
      if (await isRateLimited(env.WAITLIST, rlKey)) {
        return jsonResponse({ error: "Too many attempts. Try again later." }, 429, cors);
      }

      const secret = request.headers.get("X-Admin-Secret");
      if (!secret || secret !== env.ADMIN_SECRET) {
        await recordFailedAttempt(env.WAITLIST, rlKey);
        return jsonResponse({ error: "Unauthorized" }, 401, cors);
      }

      await clearRateLimit(env.WAITLIST, rlKey);

      try {
        const { email } = (await request.json()) as { email?: string };
        const trimmed = email?.trim().toLowerCase();

        if (!trimmed) {
          return jsonResponse({ error: "Email required" }, 400, cors);
        }

        await env.WAITLIST.delete(trimmed);
        return jsonResponse({ ok: true, deleted: trimmed }, 200, cors);
      } catch {
        return jsonResponse({ error: "Delete failed" }, 500, cors);
      }
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", {
        status: 405,
        headers: { ...cors, ...SECURITY_HEADERS },
      });
    }

    try {
      const { email, source } = (await request.json()) as {
        email?: string;
        source?: string;
      };

      const trimmed = email?.trim().toLowerCase();

      if (!trimmed || !EMAIL_RE.test(trimmed)) {
        return jsonResponse({ error: "Invalid email address" }, 400, cors);
      }

      // Deduplicate: use email as key, store metadata as value
      const existing = await env.WAITLIST.get(trimmed);

      const payload = JSON.stringify({
        email: trimmed,
        source: source || "unknown",
        signedUpAt: new Date().toISOString(),
      });

      if (!existing) {
        await env.WAITLIST.put(trimmed, payload);
      }

      return jsonResponse({ ok: true }, 200, cors);
    } catch {
      return jsonResponse({ error: "Internal error" }, 500, cors);
    }
  },
};
