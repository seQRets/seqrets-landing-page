import { Link } from "react-router-dom";
import DocsHead from "@/components/docs/DocsHead";
import {
  PRODUCTS,
  BUNDLE_CONTENTS,
  formatPrice,
  type ProductSlug,
} from "@/lib/stripe";

interface ProductSpec {
  specs: [string, string][];
  extendedDescription: string;
}

const PRODUCT_SPECS: Partial<Record<ProductSlug, ProductSpec>> = {
  "desktop-app": {
    extendedDescription:
      "Native desktop application built with Rust and Tauri. Provides the same encryption and splitting functionality as the web app, plus smart card integration, memory zeroization, code signing, and an isolated WebView with no browser extension attack surface.",
    specs: [
      ["Runtime", "Rust (Tauri 2.x) + WebView"],
      ["Platforms", "macOS (ARM64/x64), Windows (x64), Linux (x64/ARM64)"],
      ["Code Signing", "Apple notarization (macOS), Authenticode (Windows)"],
      ["Updates", "Automatic delta updates via Tauri updater"],
      ["Memory Safety", "Rust zeroize crate with compiler-fence"],
      ["Crypto Libraries", "argon2, chacha20poly1305, zeroize (RustCrypto)"],
      ["License", "AGPLv3"],
    ],
  },
  "smart-card": {
    extendedDescription:
      "JCOP-based Java Card with the seQRets applet pre-installed. Used to store encrypted shares as a physical backup that can be read by the desktop app via a USB card reader.",
    specs: [
      ["Card Type", "Java Card (JCOP)"],
      ["Interface", "Contact (ISO 7816)"],
      ["Applet", "seQRets applet pre-installed"],
      ["Standard", "GlobalPlatform 2.3+"],
      ["Branding", "seQRets logo printed on card"],
    ],
  },
  "smart-card-3pack": {
    extendedDescription:
      "Three JCOP smart cards at a volume discount. Ideal for inheritance plans requiring multiple share holders, or as backup cards for replacements.",
    specs: [
      ["Contents", "3\u00D7 JCOP smart cards with seQRets applet"],
      ["Savings", "~20% vs buying individually"],
      ["Use Case", "Multi-share inheritance plans, backup cards"],
    ],
  },
  "usb-card-reader": {
    extendedDescription:
      "Compact, portable USB smart card reader for communicating with JCOP smart cards via the seQRets desktop app. Plug-and-play on all major platforms.",
    specs: [
      ["Connector", "USB-A (USB 2.0)"],
      ["Protocol", "CCID (Chip Card Interface Device)"],
      ["Card Interface", "Contact (ISO 7816)"],
      ["Platforms", "macOS, Windows, Linux (no driver required on most systems)"],
      ["Linux Note", "May require pcsclite package"],
    ],
  },
  "tamper-evident-envelopes": {
    extendedDescription:
      "Security envelopes that reveal any unauthorized opening attempt. Use to distribute Qards (printed QR code shares) or smart cards to trusted holders.",
    specs: [
      ["Pack Size", "5 envelopes"],
      ["Tamper Indicator", "VOID pattern appears when seal is broken"],
      ["Use Case", "Distributing shares to heirs, safe deposit boxes"],
    ],
  },
  "fireproof-case": {
    extendedDescription:
      "Compact fireproof storage case rated for high-temperature protection. Designed to hold smart cards, printed Qards, and the inheritance guide.",
    specs: [
      ["Fire Rating", "1,200 \u00B0F (649 \u00B0C) for 30 minutes"],
      ["Contents Capacity", "Smart cards, printed documents, small items"],
      ["Use Case", "Primary share storage location, document protection"],
    ],
  },
  "inheritance-guide": {
    extendedDescription:
      "Comprehensive PDF guide covering every aspect of crypto inheritance planning using Shamir's Secret Sharing. Includes checklists, templates, and legal considerations.",
    specs: [
      ["Format", "Downloadable PDF"],
      ["Topics", "Threshold selection, share distribution, beneficiary instructions, legal checklist"],
      ["Use Case", "Template for your inheritance letter of instruction"],
    ],
  },
  "backup-bundle": {
    extendedDescription:
      "A complete starter kit for backing up your crypto secrets to physical smart cards. Includes the desktop app license, two smart cards, and a portable USB reader.",
    specs: [
      ["Target User", "Individual crypto holder wanting physical backups"],
      ["Use Case", "Personal seed phrase backup with smart card redundancy"],
    ],
  },
  "inheritance-bundle": {
    extendedDescription:
      "The complete inheritance planning kit. Everything you need to create, encrypt, split, and physically distribute your crypto secrets across multiple trusted holders with tamper-proof packaging and fireproof storage.",
    specs: [
      ["Target User", "Crypto holder planning for estate inheritance"],
      ["Use Case", "Full inheritance plan with physical distribution to family/locations"],
    ],
  },
};

const ALL_SLUGS: ProductSlug[] = [
  "desktop-app",
  "backup-bundle",
  "inheritance-bundle",
  "smart-card",
  "smart-card-3pack",
  "usb-card-reader",
  "tamper-evident-envelopes",
  "fireproof-case",
  "inheritance-guide",
];

const PRODUCT_CATEGORIES: { label: string; slugs: ProductSlug[] }[] = [
  {
    label: "Software",
    slugs: ["desktop-app"],
  },
  {
    label: "Bundles",
    slugs: ["backup-bundle", "inheritance-bundle"],
  },
  {
    label: "Hardware",
    slugs: ["smart-card", "smart-card-3pack", "usb-card-reader"],
  },
  {
    label: "Accessories",
    slugs: ["tamper-evident-envelopes", "fireproof-case"],
  },
  {
    label: "Guides",
    slugs: ["inheritance-guide"],
  },
];

const DocsProducts = () => {
  const jsonLd = ALL_SLUGS.map((slug) => {
    const p = PRODUCTS[slug];
    return {
      "@type": "Product",
      name: p.name,
      description: PRODUCT_SPECS[slug]?.extendedDescription ?? p.description,
      brand: { "@type": "Brand", name: "seQRets" },
      offers: {
        "@type": "Offer",
        price: (p.priceInCents / 100).toFixed(2),
        priceCurrency: "USD",
        availability: "https://schema.org/PreOrder",
        url: "https://seqrets.app/shop",
      },
    };
  });

  return (
    <>
      <DocsHead
        title="Product Specs"
        description="Technical specifications for seQRets products — desktop app, smart cards, USB reader, tamper-evident envelopes, fireproof case, and bundles."
        path="/docs/products"
        jsonLd={jsonLd}
      />

      <div className="mb-10">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-gradient-silver mb-4">
          Product Specs
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-black text-foreground tracking-tight mb-4">
          Product <span className="text-gradient">Specifications</span>
        </h1>
        <p className="text-muted-foreground/80">
          Technical specifications for all seQRets products.{" "}
          <Link to="/shop" className="text-primary hover:underline">
            Visit the shop
          </Link>{" "}
          to purchase.
        </p>
      </div>

      <div className="space-y-12">
        {PRODUCT_CATEGORIES.map((category) => (
          <div key={category.label}>
            <h2 className="font-display text-xl font-bold text-foreground mb-4 border-b border-border/20 pb-2">
              {category.label}
            </h2>
            <div className="space-y-6">
        {category.slugs.map((slug) => {
          const product = PRODUCTS[slug];
          const spec = PRODUCT_SPECS[slug];
          const bundleItems = BUNDLE_CONTENTS[slug];

          return (
            <section
              key={slug}
              id={slug}
              className="rounded-2xl border border-border/30 bg-card/20 p-6"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
                    {product.tag}
                  </span>
                  <h2 className="font-display text-lg font-bold text-foreground">
                    {product.name}
                  </h2>
                  {product.badge && (
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary mt-1">
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <p className="font-display text-lg font-bold text-foreground">
                    {formatPrice(product.priceInCents)}
                  </p>
                  {!product.priceFinal && (
                    <p className="text-xs text-muted-foreground/60">or less</p>
                  )}
                </div>
              </div>

              <p className="text-sm text-muted-foreground/80 mb-4">
                {spec?.extendedDescription ?? product.description}
              </p>

              {/* Bundle contents */}
              {bundleItems && (
                <div className="mb-4">
                  <h3 className="text-sm font-bold text-foreground mb-2">
                    What's Included
                  </h3>
                  <ul className="space-y-1 text-sm text-muted-foreground/80">
                    {bundleItems.map(({ slug: itemSlug, qty }) => (
                      <li key={itemSlug} className="flex items-center gap-2">
                        <span className="text-primary">&#8226;</span>
                        {qty}&times; {PRODUCTS[itemSlug].name}
                        <span className="text-muted-foreground/50">
                          ({formatPrice(PRODUCTS[itemSlug].priceInCents)} each)
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Specs table */}
              {spec?.specs && spec.specs.length > 0 && (
                <div className="overflow-x-auto rounded-xl border border-border/20">
                  <table className="w-full text-sm">
                    <tbody className="divide-y divide-border/15">
                      {spec.specs.map(([label, value]) => (
                        <tr
                          key={label}
                          className="hover:bg-card/20 transition-colors"
                        >
                          <td className="p-3 font-medium text-foreground whitespace-nowrap w-40">
                            {label}
                          </td>
                          <td className="p-3 text-muted-foreground/80">
                            {value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Features */}
              {product.features.length > 0 && (
                <div className="mt-4">
                  <ul className="flex flex-wrap gap-2">
                    {product.features.map((f) => (
                      <li
                        key={f}
                        className="rounded-full bg-card/40 border border-border/20 px-3 py-1 text-xs text-muted-foreground/70"
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          );
        })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DocsProducts;
