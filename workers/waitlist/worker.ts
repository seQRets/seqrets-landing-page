// Cloudflare Worker — Waitlist email capture
// Deploy: `cd workers/waitlist && npx wrangler deploy`
// Setup: `npx wrangler kv:namespace create WAITLIST` → paste ID into wrangler.toml

interface Env {
  WAITLIST: KVNamespace;
  ADMIN_SECRET: string; // set via `wrangler secret put ADMIN_SECRET`
}

const ALLOWED_ORIGINS = new Set([
  "https://seqrets.app",
  "http://localhost:5173",
  "http://localhost:8080",
  "http://localhost:9002",
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

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const cors = getCorsHeaders(request);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cors });
    }

    // Admin endpoint: GET / → list waitlist entries (requires ADMIN_SECRET header)
    if (request.method === "GET") {
      const secret = request.headers.get("X-Admin-Secret");
      if (!secret || secret !== env.ADMIN_SECRET) {
        return new Response(
          JSON.stringify({ error: "Unauthorized" }),
          { status: 401, headers: { ...cors, "Content-Type": "application/json" } },
        );
      }

      try {
        const keys = await env.WAITLIST.list();
        const entries = await Promise.all(
          keys.keys.map(async (k) => {
            const val = await env.WAITLIST.get(k.name);
            return { key: k.name, value: val };
          }),
        );
        return new Response(
          JSON.stringify({ count: keys.keys.length, entries }, null, 2),
          { headers: { ...cors, "Content-Type": "application/json" } },
        );
      } catch {
        return new Response(
          JSON.stringify({ error: "KV list failed" }),
          { status: 500, headers: { ...cors, "Content-Type": "application/json" } },
        );
      }
    }

    // Admin endpoint: DELETE / → remove a waitlist entry (requires ADMIN_SECRET header)
    if (request.method === "DELETE") {
      const secret = request.headers.get("X-Admin-Secret");
      if (!secret || secret !== env.ADMIN_SECRET) {
        return new Response(
          JSON.stringify({ error: "Unauthorized" }),
          { status: 401, headers: { ...cors, "Content-Type": "application/json" } },
        );
      }

      try {
        const { email } = (await request.json()) as { email?: string };
        const trimmed = email?.trim().toLowerCase();

        if (!trimmed) {
          return new Response(
            JSON.stringify({ error: "Email required" }),
            { status: 400, headers: { ...cors, "Content-Type": "application/json" } },
          );
        }

        await env.WAITLIST.delete(trimmed);
        return new Response(
          JSON.stringify({ ok: true, deleted: trimmed }),
          { headers: { ...cors, "Content-Type": "application/json" } },
        );
      } catch {
        return new Response(
          JSON.stringify({ error: "Delete failed" }),
          { status: 500, headers: { ...cors, "Content-Type": "application/json" } },
        );
      }
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405, headers: cors });
    }

    try {
      const { email, source } = (await request.json()) as {
        email?: string;
        source?: string;
      };

      const trimmed = email?.trim().toLowerCase();

      if (!trimmed || !EMAIL_RE.test(trimmed)) {
        return new Response(
          JSON.stringify({ error: "Invalid email address" }),
          { status: 400, headers: { ...cors, "Content-Type": "application/json" } },
        );
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

      return new Response(
        JSON.stringify({ ok: true }),
        { headers: { ...cors, "Content-Type": "application/json" } },
      );
    } catch {
      return new Response(
        JSON.stringify({ error: "Internal error" }),
        { status: 500, headers: { ...cors, "Content-Type": "application/json" } },
      );
    }
  },
};
