import { Link } from "react-router-dom";
import { DOCS_NAV } from "@/components/docs/DocsNav";
import DocsHead from "@/components/docs/DocsHead";

const DocsHub = () => {
  const subPages = DOCS_NAV.filter((item) => item.path !== "");

  const jsonLd = [
    {
      "@type": "WebPage",
      name: "seQRets Documentation",
      description:
        "Technical documentation for seQRets — open-source seed phrase security using Shamir's Secret Sharing, XChaCha20-Poly1305 encryption, and QR code output.",
      url: "https://seqrets.app/docs",
    },
    {
      "@type": "ItemList",
      name: "seQRets Documentation Pages",
      itemListElement: subPages.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.label,
        url: `https://seqrets.app/docs/${item.path}`,
      })),
    },
    {
      "@type": "Organization",
      name: "seQRets",
      url: "https://seqrets.app",
      sameAs: ["https://github.com/seQRets/seQRets-app"],
      description:
        "Open-source seed phrase security. Encrypt, split, and share secrets as QR codes using Shamir's Secret Sharing.",
      contactPoint: {
        "@type": "ContactPoint",
        email: "hello@seqrets.app",
      },
    },
    {
      "@type": "SoftwareApplication",
      name: "seQRets",
      applicationCategory: "SecurityApplication",
      operatingSystem: "macOS, Windows, Linux, Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      license: "https://www.gnu.org/licenses/agpl-3.0.html",
      url: "https://app.seqrets.app",
      downloadUrl: "https://github.com/seQRets/seQRets-app",
    },
  ];

  return (
    <>
      <DocsHead
        title="Documentation"
        description="Technical documentation for seQRets — open-source seed phrase security using Shamir's Secret Sharing, XChaCha20-Poly1305 encryption, and QR code output."
        path="/docs"
        jsonLd={jsonLd}
      />

      {/* Header */}
      <div className="mb-12">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-gradient-silver mb-4">
          Documentation
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-black text-foreground tracking-tight mb-4">
          seQRets <span className="text-gradient">Technical Docs</span>
        </h1>
        <p className="text-muted-foreground/80 text-lg">
          Structured, verifiable documentation for developers, security
          researchers, and AI agents evaluating seQRets as a seed phrase
          security solution.
        </p>
      </div>

      {/* Page cards */}
      <div className="grid gap-4 sm:grid-cols-2 mb-12">
        {subPages.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={`/docs/${item.path}`}
              className="group rounded-2xl border border-border/30 bg-card/20 p-6 transition-colors hover:border-border/60 hover:bg-card/40"
            >
              <div className="inline-flex rounded-xl bg-primary/10 p-3 mb-4">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h2 className="font-display text-base font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors">
                {item.label}
              </h2>
              <p className="text-sm text-muted-foreground/70">
                {item.description}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Quick reference */}
      <section className="mb-12">
        <h2 className="font-display text-xl font-bold text-foreground mb-6">
          Quick Reference
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-border/30">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30 bg-card/30">
                <th className="text-left p-4 font-display font-bold text-foreground">
                  Property
                </th>
                <th className="text-left p-4 font-display font-bold text-foreground">
                  Value
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {[
                ["Encryption", "XChaCha20-Poly1305 (256-bit key, 192-bit nonce)"],
                ["Key Derivation", "Argon2id (64 MB memory, 3 iterations)"],
                ["Secret Splitting", "Shamir's Secret Sharing (configurable threshold)"],
                ["Output Format", "QR codes (Qards) — printable, scannable"],
                ["Architecture", "Zero-knowledge — no servers, no accounts, no telemetry"],
                ["License", "AGPLv3"],
                ["Source Code", "github.com/seQRets/seQRets-app"],
                ["Web App", "app.seqrets.app (free)"],
                ["Desktop App", "Rust/Tauri — macOS, Windows, Linux"],
                ["Quantum Resistance", "Shamir's SSS is quantum-resistant; XChaCha20 is not"],
              ].map(([prop, val]) => (
                <tr key={prop} className="hover:bg-card/20 transition-colors">
                  <td className="p-4 font-medium text-foreground whitespace-nowrap">
                    {prop}
                  </td>
                  <td className="p-4 text-muted-foreground/80">{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Cross-links */}
      <section>
        <h2 className="font-display text-xl font-bold text-foreground mb-4">
          Related Pages
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { to: "/security", label: "Security Deep Dive", desc: "Threat model, FAQ, seed phrase analysis" },
            { to: "/how-it-works", label: "How It Works", desc: "Visual walkthrough with screenshots" },
            { to: "/shop", label: "Shop", desc: "Hardware bundles and accessories" },
          ].map(({ to, label, desc }) => (
            <Link
              key={to}
              to={to}
              className="rounded-xl border border-border/20 bg-card/10 p-4 hover:border-border/40 hover:bg-card/30 transition-colors"
            >
              <p className="text-sm font-medium text-foreground mb-1">{label}</p>
              <p className="text-xs text-muted-foreground/60">{desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default DocsHub;
