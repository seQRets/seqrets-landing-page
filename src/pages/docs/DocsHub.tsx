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
        <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-[var(--ink2)] mb-4">
          Documentation
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-black text-[var(--ink)] tracking-tight mb-4">
          seQRets <span className="text-[var(--gold)]">Technical Docs</span>
        </h1>
        <p className="text-[var(--ink2)] text-lg">
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
              className="group rounded-2xl border border-[var(--line)] bg-[var(--sf)] p-6 transition-colors hover:border-[var(--gold-line)] hover:bg-[var(--band)]"
            >
              <div className="inline-flex rounded-xl bg-[var(--gold-fill)] p-3 mb-4">
                <Icon className="h-5 w-5 text-[var(--gold)]" />
              </div>
              <h2 className="font-display text-base font-bold text-[var(--ink)] mb-1.5 group-hover:text-[var(--gold)] transition-colors">
                {item.label}
              </h2>
              <p className="text-sm text-[var(--ink2)]">
                {item.description}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Quick reference */}
      <section className="mb-12">
        <h2 className="font-display text-xl font-bold text-[var(--ink)] mb-6">
          Quick Reference
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-[var(--line)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--line)] bg-[var(--sf)]">
                <th className="text-left p-4 font-display font-bold text-[var(--ink)]">
                  Property
                </th>
                <th className="text-left p-4 font-display font-bold text-[var(--ink)]">
                  Value
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[color:var(--line)]">
              {[
                ["Encryption", "XChaCha20-Poly1305 (256-bit key, 192-bit nonce)"],
                ["Key Derivation", "Argon2id (64 MB memory, 4 iterations)"],
                ["Optional Keyfile", "Second-factor binary file — concatenated with password before Argon2id. Generated keyfiles are 256-bit CSPRNG."],
                ["Secret Splitting", "Shamir's Secret Sharing (configurable threshold)"],
                ["Output Format", "QR codes (Qards) — printable, scannable"],
                ["Architecture", "Zero-knowledge — no servers, no accounts, no telemetry"],
                ["License", "AGPLv3"],
                ["Source Code", "github.com/seQRets/seQRets-app"],
                ["Web App", "app.seqrets.app (free)"],
                ["Desktop App", "Rust/Tauri — macOS, Windows, Linux"],
                ["Quantum Resistance", "Fully quantum-resistant while < K shares are compromised (information-theoretic Shamir); XChaCha20-Poly1305 adds defense-in-depth"],
              ].map(([prop, val]) => (
                <tr key={prop} className="hover:bg-[var(--band)] transition-colors">
                  <td className="p-4 font-medium text-[var(--ink)] whitespace-nowrap">
                    {prop}
                  </td>
                  <td className="p-4 text-[var(--ink2)]">{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Cross-links */}
      <section>
        <h2 className="font-display text-xl font-bold text-[var(--ink)] mb-4">
          Related Pages
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { to: "/security", label: "Security Deep Dive", desc: "Threat model, FAQ, seed phrase analysis" },
            { to: "/how-it-works", label: "How It Works", desc: "Visual walkthrough with screenshots" },
            { to: "/preview/shop", label: "Shop", desc: "Hardware bundles and accessories" },
          ].map(({ to, label, desc }) => (
            <Link
              key={to}
              to={to}
              className="rounded-xl border border-[var(--line)] bg-[var(--sf)] p-4 hover:border-[var(--gold-line)] hover:bg-[var(--band)] transition-colors"
            >
              <p className="text-sm font-medium text-[var(--ink)] mb-1">{label}</p>
              <p className="text-xs text-[var(--ink3)]">{desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default DocsHub;
