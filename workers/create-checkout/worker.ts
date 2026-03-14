// Cloudflare Worker — Stripe Checkout Session creator
// Deploy: `npx wrangler deploy`
// Secret: `npx wrangler secret put STRIPE_SECRET_KEY`

interface Env {
  STRIPE_SECRET_KEY: string;
}

// Production origins only — add http://localhost:8080 for local dev
const ALLOWED_ORIGINS = new Set([
  "https://seqrets.app",
]);

// Whitelist of valid Stripe Price IDs — keep in sync with src/lib/stripe.ts
const VALID_PRICE_IDS = new Set([
  "price_1T8b06JrPvZLpOYSoQmbw6Am", // Desktop App
  "price_1T8b2NJrPvZLpOYSWz4kPGjR", // Backup Bundle
  "price_1T8b36JrPvZLpOYSF5inqQjK", // Inheritance Bundle
  "price_1T8b3hJrPvZLpOYSRMKDcSm7", // Smart Card
  "price_1T8bsDJrPvZLpOYSsO5BORyz", // Smart Card 3-Pack
  "price_1T8b4CJrPvZLpOYSbfoPtIvm", // USB Card Reader
  "price_1T8b4kJrPvZLpOYS1d7cNz9e", // Tamper-Evident Envelopes
  "price_1T8b5rJrPvZLpOYSAEiQqSlR", // Fireproof Case
  "price_1T8b6PJrPvZLpOYS6MqyLB2M", // Inheritance Guide
]);

const MAX_QUANTITY = 100;

const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Cache-Control": "no-store, no-cache", // [L-1] Prevent caching of API responses
};

// [M-1] Reject unauthorized origins instead of falling back
function getCorsHeaders(request: Request): Record<string, string> | null {
  const origin = request.headers.get("Origin") ?? "";
  if (!ALLOWED_ORIGINS.has(origin)) return null;
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

const DENY_CORS: Record<string, string> = {
  "Access-Control-Allow-Origin": "https://seqrets.app",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function jsonResponse(body: Record<string, unknown>, status: number, extra: Record<string, string>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...extra, ...SECURITY_HEADERS, "Content-Type": "application/json" },
  });
}

// [H-3] Max body size
const MAX_BODY_SIZE = 51200; // 50 KB

// [M-3] + [C-4] Safe JSON parsing with Content-Type validation and error handling
async function safeParseJson(request: Request): Promise<{ ok: true; data: unknown } | { ok: false; error: string; status: number }> {
  const contentType = request.headers.get("Content-Type") || "";
  if (!contentType.includes("application/json")) {
    return { ok: false, error: "Content-Type must be application/json", status: 415 };
  }

  const contentLength = parseInt(request.headers.get("Content-Length") || "0", 10);
  if (contentLength > MAX_BODY_SIZE) {
    return { ok: false, error: "Payload too large", status: 413 };
  }

  try {
    const text = await request.text();
    if (text.length > MAX_BODY_SIZE) {
      return { ok: false, error: "Payload too large", status: 413 };
    }
    const data = JSON.parse(text);
    return { ok: true, data };
  } catch {
    return { ok: false, error: "Invalid JSON", status: 400 };
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const cors = getCorsHeaders(request);
    const responseCors = cors ?? DENY_CORS;

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: { ...responseCors, ...SECURITY_HEADERS } });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", {
        status: 405,
        headers: { ...responseCors, ...SECURITY_HEADERS },
      });
    }

    // Parse and validate request body
    const parsed = await safeParseJson(request);
    if (!parsed.ok) {
      return jsonResponse({ error: parsed.error }, parsed.status, responseCors);
    }

    try {
      const { lineItems } = parsed.data as {
        lineItems: { price: string; quantity: number }[];
      };

      if (!Array.isArray(lineItems) || lineItems.length === 0) {
        return jsonResponse({ error: "No items provided" }, 400, responseCors);
      }

      // Validate every line item against the price whitelist and quantity bounds
      for (const item of lineItems) {
        if (!VALID_PRICE_IDS.has(item.price)) {
          return jsonResponse({ error: "Invalid price ID" }, 400, responseCors);
        }
        if (!Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > MAX_QUANTITY) {
          return jsonResponse({ error: "Invalid quantity" }, 400, responseCors);
        }
      }

      // Create Checkout Session via Stripe REST API (no SDK needed in Workers)
      const origin = request.headers.get("Origin") ?? "https://seqrets.app";
      const baseUrl = ALLOWED_ORIGINS.has(origin) ? origin : "https://seqrets.app";

      const params = new URLSearchParams();
      params.append("mode", "payment");
      params.append("success_url", `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`);
      params.append("cancel_url", `${baseUrl}/checkout/cancel`);

      lineItems.forEach((item, i) => {
        params.append(`line_items[${i}][price]`, item.price);
        params.append(`line_items[${i}][quantity]`, String(item.quantity));
      });

      const stripeRes = await fetch("https://api.stripe.com/v1/checkout/sessions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });

      const session = (await stripeRes.json()) as { url?: string; error?: { message: string } };

      if (!stripeRes.ok || !session.url) {
        // [C-5] Never forward raw Stripe error messages to clients — log server-side only
        console.error("Stripe checkout error:", session.error?.message ?? "No URL returned");
        return jsonResponse(
          { error: "Checkout session could not be created. Please try again." },
          500,
          responseCors,
        );
      }

      return jsonResponse({ url: session.url }, 200, responseCors);
    } catch (err) {
      // [C-4] Catch any unexpected errors and return generic message
      console.error("Checkout worker error:", err);
      return jsonResponse({ error: "Internal error" }, 500, responseCors);
    }
  },
};
