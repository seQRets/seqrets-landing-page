import { Link } from "react-router-dom";
import DocsHead from "@/components/docs/DocsHead";

const DocsTechnical = () => {
  const jsonLd = {
    "@type": "TechArticle",
    name: "seQRets Technical Overview",
    description:
      "Detailed technical specification of seQRets cryptographic architecture: XChaCha20-Poly1305 encryption, Argon2id KDF, Shamir's Secret Sharing, and QR code output.",
    proficiencyLevel: "Expert",
    about: [
      { "@type": "Thing", name: "XChaCha20-Poly1305" },
      { "@type": "Thing", name: "Argon2id" },
      { "@type": "Thing", name: "Shamir's Secret Sharing" },
    ],
  };

  return (
    <>
      <DocsHead
        title="Technical Overview"
        description="Cryptographic architecture of seQRets: XChaCha20-Poly1305, Argon2id, Shamir's Secret Sharing, QR code encoding, and zero-knowledge design."
        path="/docs/technical"
        jsonLd={jsonLd}
      />

      <div className="mb-10">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-gradient-silver mb-4">
          Technical Overview
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-black text-foreground tracking-tight mb-4">
          Cryptographic <span className="text-gradient">Architecture</span>
        </h1>
        <p className="text-muted-foreground/80">
          How seQRets protects your secrets — algorithms, parameters, and design
          decisions. No marketing, just facts.
        </p>
      </div>

      <div className="space-y-12">
        {/* Pipeline */}
        <section>
          <h2 className="font-display text-xl font-bold text-foreground mb-4">
            Processing Pipeline
          </h2>
          <div className="rounded-2xl border border-border/30 bg-card/20 p-6">
            <div className="flex flex-wrap items-center gap-2 text-sm font-mono">
              {[
                "Secret Input",
                "Argon2id KDF",
                "XChaCha20-Poly1305 Encrypt",
                "Shamir Split (K-of-N)",
                "QR Encode (Qards)",
              ].map((step, i) => (
                <span key={step} className="flex items-center gap-2">
                  <span className="rounded-lg bg-primary/10 px-3 py-1.5 text-primary font-medium">
                    {step}
                  </span>
                  {i < 4 && (
                    <span className="text-muted-foreground/40">&rarr;</span>
                  )}
                </span>
              ))}
            </div>
            <p className="text-sm text-muted-foreground/70 mt-4">
              The secret enters memory, is encrypted under a password-derived
              key, split into threshold shares, rendered as QR codes, and then
              destroyed. In the desktop app, Rust zeroes the memory with
              compiler-fence zeroization.
            </p>
          </div>
        </section>

        {/* Crypto primitives table */}
        <section>
          <h2 className="font-display text-xl font-bold text-foreground mb-4">
            Cryptographic Primitives
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-border/30">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/30 bg-card/30">
                  <th className="text-left p-4 font-display font-bold text-foreground">
                    Algorithm
                  </th>
                  <th className="text-left p-4 font-display font-bold text-foreground">
                    Purpose
                  </th>
                  <th className="text-left p-4 font-display font-bold text-foreground">
                    Key / Output Size
                  </th>
                  <th className="text-left p-4 font-display font-bold text-foreground">
                    Library (Web)
                  </th>
                  <th className="text-left p-4 font-display font-bold text-foreground">
                    Library (Desktop)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                {[
                  [
                    "XChaCha20-Poly1305",
                    "Authenticated encryption",
                    "256-bit key, 192-bit nonce",
                    "@noble/ciphers",
                    "chacha20poly1305 (RustCrypto)",
                  ],
                  [
                    "Argon2id",
                    "Key derivation (KDF)",
                    "256-bit output",
                    "@noble/hashes",
                    "argon2 (RustCrypto)",
                  ],
                  [
                    "Shamir's Secret Sharing",
                    "Threshold splitting",
                    "Variable (matches input)",
                    "Custom GF(256) impl",
                    "Custom GF(256) impl",
                  ],
                ].map(([algo, purpose, size, webLib, desktopLib]) => (
                  <tr
                    key={algo}
                    className="hover:bg-card/20 transition-colors"
                  >
                    <td className="p-4 font-medium text-foreground font-mono text-xs">
                      {algo}
                    </td>
                    <td className="p-4 text-muted-foreground/80">{purpose}</td>
                    <td className="p-4 text-muted-foreground/80 font-mono text-xs">
                      {size}
                    </td>
                    <td className="p-4 text-muted-foreground/80 font-mono text-xs">
                      {webLib}
                    </td>
                    <td className="p-4 text-muted-foreground/80 font-mono text-xs">
                      {desktopLib}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Argon2id parameters */}
        <section>
          <h2 className="font-display text-xl font-bold text-foreground mb-4">
            Argon2id Parameters
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-border/30">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/30 bg-card/30">
                  <th className="text-left p-4 font-display font-bold text-foreground">
                    Parameter
                  </th>
                  <th className="text-left p-4 font-display font-bold text-foreground">
                    Value
                  </th>
                  <th className="text-left p-4 font-display font-bold text-foreground">
                    Purpose
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                {[
                  [
                    "Memory cost",
                    "64 MB (65536 KiB)",
                    "Resists GPU/ASIC brute-force attacks by requiring large memory",
                  ],
                  [
                    "Iterations (time cost)",
                    "4",
                    "Increases computation time per password attempt",
                  ],
                  [
                    "Parallelism",
                    "1",
                    "Single-threaded derivation — deterministic output",
                  ],
                  [
                    "Output length",
                    "32 bytes (256 bits)",
                    "Matches XChaCha20-Poly1305 key size",
                  ],
                  [
                    "Salt",
                    "16 bytes (random)",
                    "Unique per encryption — prevents rainbow tables",
                  ],
                ].map(([param, val, purpose]) => (
                  <tr
                    key={param}
                    className="hover:bg-card/20 transition-colors"
                  >
                    <td className="p-4 font-medium text-foreground">{param}</td>
                    <td className="p-4 text-muted-foreground/80 font-mono text-xs">
                      {val}
                    </td>
                    <td className="p-4 text-muted-foreground/80">{purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Shamir's Secret Sharing */}
        <section>
          <h2 className="font-display text-xl font-bold text-foreground mb-4">
            Shamir's Secret Sharing
          </h2>
          <div className="space-y-4">
            <div className="rounded-2xl border border-border/30 bg-card/20 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    label: "Security Type",
                    value: "Information-theoretic",
                    detail:
                      "Security does not depend on computational hardness. Fewer than K shares provide zero bits of information about the secret, regardless of computing power.",
                  },
                  {
                    label: "Quantum Resistance",
                    value: "Yes",
                    detail:
                      "Shamir's SSS relies on polynomial interpolation over finite fields, not factoring or discrete logarithms. Quantum computers provide no advantage against it.",
                  },
                  {
                    label: "Threshold Semantics",
                    value: "K-of-N configurable",
                    detail:
                      "You choose K (threshold) and N (total shares). Any K shares reconstruct; K-1 or fewer reveal nothing. Common choices: 2-of-3, 3-of-5.",
                  },
                  {
                    label: "Field",
                    value: "GF(256)",
                    detail:
                      "Operations are performed in the Galois Field GF(2^8), enabling byte-level splitting with no data expansion.",
                  },
                ].map(({ label, value, detail }) => (
                  <div key={label}>
                    <p className="text-xs text-muted-foreground/60 uppercase tracking-wider mb-1">
                      {label}
                    </p>
                    <p className="text-sm font-medium text-foreground mb-1">
                      {value}
                    </p>
                    <p className="text-xs text-muted-foreground/70">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* QR Code Encoding */}
        <section>
          <h2 className="font-display text-xl font-bold text-foreground mb-4">
            QR Code Encoding
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
                  ["Data format", "Base64-encoded ciphertext share"],
                  ["Error correction", "Level M (15% recovery)"],
                  [
                    "Maximum capacity",
                    "~2,953 bytes (Version 40, Level L) — practical limit depends on error correction level",
                  ],
                  [
                    "Output",
                    "Printable QR code (Qard) — designed for physical distribution",
                  ],
                  [
                    "Metadata",
                    "Share index, threshold, total shares — included in the QR payload, not stored externally",
                  ],
                ].map(([prop, val]) => (
                  <tr
                    key={prop}
                    className="hover:bg-card/20 transition-colors"
                  >
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

        {/* Zero-Knowledge Claims */}
        <section>
          <h2 className="font-display text-xl font-bold text-foreground mb-4">
            Zero-Knowledge Claims
          </h2>
          <div className="space-y-4">
            <div className="rounded-2xl border border-border/30 bg-card/20 p-6">
              <h3 className="text-sm font-bold text-foreground mb-3">
                What "zero-knowledge" means for seQRets
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground/80">
                {[
                  "No server — all processing happens locally on your device",
                  "No account — no registration, no login, no user database",
                  "No cloud storage — nothing is uploaded, synced, or backed up",
                  "No analytics — no tracking pixels, error reporters, or usage telemetry",
                  "No network dependency — the app works fully offline after initial load (web) or always (desktop)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">&#10003;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6">
              <h3 className="text-sm font-bold text-foreground mb-3">
                Explicit Caveats
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground/80">
                {[
                  "Bob AI assistant (optional) — if you provide a Google Gemini API key and ask Bob a question, your question is sent to Google's Gemini API. No secret data is included.",
                  "BTC price display (optional) — the app fetches the current Bitcoin price from a public API for display purposes. No user data is transmitted. Disabled when offline.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-0.5">&#9888;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Source Code References */}
        <section>
          <h2 className="font-display text-xl font-bold text-foreground mb-4">
            Source Code
          </h2>
          <div className="rounded-2xl border border-border/30 bg-card/20 p-6">
            <p className="text-sm text-muted-foreground/80 mb-4">
              The full source code is available for audit and independent
              verification.
            </p>
            <div className="space-y-2 text-sm">
              {[
                {
                  label: "Main Repository",
                  url: "https://github.com/seQRets/seQRets-app",
                },
                {
                  label: "License",
                  url: "https://github.com/seQRets/seQRets-app/blob/main/LICENSE",
                },
                {
                  label: "Security Policy",
                  url: "https://github.com/seQRets/seQRets-app/blob/main/SECURITY.md",
                },
              ].map(({ label, url }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="text-muted-foreground/60 w-32 shrink-0">
                    {label}
                  </span>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline truncate"
                  >
                    {url.replace("https://", "")}
                  </a>
                </div>
              ))}
            </div>
          </div>
          <p className="text-sm text-muted-foreground/60 mt-4">
            For the full web vs. desktop security comparison, see the{" "}
            <Link to="/security" className="text-primary hover:underline">
              Security page
            </Link>
            .
          </p>
        </section>
      </div>
    </>
  );
};

export default DocsTechnical;
