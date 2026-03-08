import { loadStripe } from "@stripe/stripe-js";

// ─── Launch Toggle ───────────────────────────────────────────────
// Flip to `true` when the shop is ready to accept orders.
export const SHOP_LIVE = false;

// ─── Stripe Instance ─────────────────────────────────────────────
let stripePromise: ReturnType<typeof loadStripe> | null = null;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

// ─── Product Catalog ─────────────────────────────────────────────
export type ProductSlug =
  | "desktop-app"
  | "backup-bundle"
  | "inheritance-bundle"
  | "smart-card"
  | "usb-card-reader"
  | "tamper-evident-envelopes"
  | "fireproof-case"
  | "inheritance-guide";

export interface ProductInfo {
  slug: ProductSlug;
  name: string;
  description: string;
  priceInCents: number;
  priceId: string; // Stripe Price ID — replace with real IDs after creating products
  features: string[];
  badge?: string;
  highlight?: boolean;
  category: "bundle" | "accessory";
}

export const PRODUCTS: Record<ProductSlug, ProductInfo> = {
  "desktop-app": {
    slug: "desktop-app",
    name: "Desktop App",
    description:
      "Code-signed, auto-updating binary with NFC smart card support. macOS, Windows & Linux.",
    priceInCents: 4900,
    priceId: "price_REPLACE_ME",
    features: [
      "Code-signed binary",
      "Automatic delta updates",
      "NFC smart card integration",
      "All desktop platforms",
    ],
    category: "bundle",
  },
  "backup-bundle": {
    slug: "backup-bundle",
    name: "Backup Bundle",
    description:
      "Everything you need to back up your secrets to a physical smart card with a portable reader.",
    priceInCents: 8900,
    priceId: "price_REPLACE_ME",
    badge: "Popular",
    highlight: true,
    features: [
      "Desktop App license",
      "1\u00D7 branded smart card",
      "1\u00D7 portable USB card reader",
      "Quick-start guide",
    ],
    category: "bundle",
  },
  "inheritance-bundle": {
    slug: "inheritance-bundle",
    name: "Inheritance Bundle",
    description:
      "A complete inheritance kit \u2014 distribute secret shares across multiple cards with tamper-proof packaging.",
    priceInCents: 17900,
    priceId: "price_REPLACE_ME",
    badge: "Best Value",
    features: [
      "Desktop App license",
      "3\u20135\u00D7 smart cards",
      "1\u00D7 portable USB card reader",
      "PDF inheritance guide",
      "Tamper-evident envelopes",
      "Fireproof storage case",
    ],
    category: "bundle",
  },
  "smart-card": {
    slug: "smart-card",
    name: "Smart Card",
    description:
      "JCOP-based NFC smart card, branded with the seQRets logo.",
    priceInCents: 1200,
    priceId: "price_REPLACE_ME",
    features: ["NFC & contact interface", "JCOP applet compatible"],
    category: "accessory",
  },
  "usb-card-reader": {
    slug: "usb-card-reader",
    name: "USB Card Reader",
    description:
      "Compact, portable USB smart card reader. Plug-and-play on all platforms.",
    priceInCents: 1900,
    priceId: "price_REPLACE_ME",
    features: ["USB-A connector", "macOS / Windows / Linux"],
    category: "accessory",
  },
  "tamper-evident-envelopes": {
    slug: "tamper-evident-envelopes",
    name: "Tamper-Evident Envelopes",
    description:
      "Pack of 5 security envelopes that reveal any opening attempt.",
    priceInCents: 900,
    priceId: "price_REPLACE_ME",
    features: ["5-pack", "Void pattern on tamper"],
    category: "accessory",
  },
  "fireproof-case": {
    slug: "fireproof-case",
    name: "Fireproof Case",
    description:
      "Compact fireproof document & card case rated to 1,200 \u00B0F for 30 minutes.",
    priceInCents: 3900,
    priceId: "price_REPLACE_ME",
    features: ["Fits cards & documents", "1,200 \u00B0F / 30 min rated"],
    category: "accessory",
  },
  "inheritance-guide": {
    slug: "inheritance-guide",
    name: "Inheritance Guide (PDF)",
    description:
      "Step-by-step guide for setting up a dead man\u2019s switch and distributing shares to heirs.",
    priceInCents: 1500,
    priceId: "price_REPLACE_ME",
    features: ["Printable PDF", "Legal considerations checklist"],
    category: "accessory",
  },
};

export const BUNDLES = Object.values(PRODUCTS).filter(
  (p) => p.category === "bundle",
);
export const ACCESSORIES = Object.values(PRODUCTS).filter(
  (p) => p.category === "accessory",
);

// ─── Checkout Helper ─────────────────────────────────────────────
export async function createCheckoutSession(
  lineItems: { price: string; quantity: number }[],
): Promise<string> {
  const res = await fetch(import.meta.env.VITE_CHECKOUT_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lineItems }),
  });

  if (!res.ok) {
    throw new Error("Failed to create checkout session");
  }

  const { url } = await res.json();
  return url;
}

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)}`;
}
