// Cloudflare Worker — Stripe Checkout Session creator
// Deploy: `npx wrangler deploy`
// Secret: `npx wrangler secret put STRIPE_SECRET_KEY`

interface Env {
  STRIPE_SECRET_KEY: string;
}

const ALLOWED_ORIGINS = new Set([
  "https://seqrets.app",
  "http://localhost:8080",
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
};

function getCorsHeaders(request: Request) {
  const origin = request.headers.get("Origin") ?? "";
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGINS.has(origin) ? origin : "https://seqrets.app",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function jsonResponse(body: Record<string, unknown>, status: number, extra: Record<string, string>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...extra, ...SECURITY_HEADERS, "Content-Type": "application/json" },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const corsHeaders = getCorsHeaders(request);

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: { ...corsHeaders, ...SECURITY_HEADERS } });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", {
        status: 405,
        headers: { ...corsHeaders, ...SECURITY_HEADERS },
      });
    }

    try {
      const { lineItems } = (await request.json()) as {
        lineItems: { price: string; quantity: number }[];
      };

      if (!Array.isArray(lineItems) || lineItems.length === 0) {
        return jsonResponse({ error: "No items provided" }, 400, corsHeaders);
      }

      // Validate every line item against the price whitelist and quantity bounds
      for (const item of lineItems) {
        if (!VALID_PRICE_IDS.has(item.price)) {
          return jsonResponse({ error: "Invalid price ID" }, 400, corsHeaders);
        }
        if (!Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > MAX_QUANTITY) {
          return jsonResponse({ error: "Invalid quantity" }, 400, corsHeaders);
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
        return jsonResponse(
          { error: session.error?.message ?? "Failed to create session" },
          500,
          corsHeaders,
        );
      }

      return jsonResponse({ url: session.url }, 200, corsHeaders);
    } catch {
      return jsonResponse({ error: "Internal error" }, 500, corsHeaders);
    }
  },
};
