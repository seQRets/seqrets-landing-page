// Cloudflare Worker — Stripe Checkout Session creator
// Deploy: `npx wrangler deploy`
// Secret: `npx wrangler secret put STRIPE_SECRET_KEY`

interface Env {
  STRIPE_SECRET_KEY: string;
}

const ALLOWED_ORIGINS = [
  "https://seqrets.app",
  "http://localhost:8080",
];

function getCorsHeaders(request: Request) {
  const origin = request.headers.get("Origin") ?? "";
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const corsHeaders = getCorsHeaders(request);

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405, headers: corsHeaders });
    }

    try {
      const { lineItems } = (await request.json()) as {
        lineItems: { price: string; quantity: number }[];
      };

      if (!lineItems?.length) {
        return new Response(JSON.stringify({ error: "No items provided" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Create Checkout Session via Stripe REST API (no SDK needed in Workers)
      const origin = request.headers.get("Origin") ?? "https://seqrets.app";
      const baseUrl = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];

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
        return new Response(
          JSON.stringify({ error: session.error?.message ?? "Failed to create session" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }

      return new Response(JSON.stringify({ url: session.url }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch {
      return new Response(JSON.stringify({ error: "Internal error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  },
};
