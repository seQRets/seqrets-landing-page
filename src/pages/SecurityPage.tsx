import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Lock, Atom, Eye, Mail } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const FaqItem = ({ question, answer }: { question: string; answer: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-border/30 bg-card/20 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-card/40 transition-colors"
      >
        <span className="font-display text-sm font-bold text-foreground">{question}</span>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-6 pb-6 text-sm text-muted-foreground/80 border-t border-border/20 pt-4">
          {answer}
        </div>
      )}
    </div>
  );
};

const SecurityPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 md:px-8 py-24 max-w-4xl">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        {/* Header */}
        <div className="mb-16">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground/70 mb-5">
            Trust & Transparency
          </p>
          <h1 className="font-display text-4xl font-black md:text-6xl text-foreground tracking-tight mb-6">
            Security at <span className="text-gradient">seQRets</span>
          </h1>
          <p className="text-lg text-muted-foreground/80 max-w-2xl">
            Understanding the threat model, the architecture, and why your secrets are safe.
          </p>
        </div>

        <div className="prose prose-invert prose-lg max-w-none space-y-16">

          {/* How seQRets Protects Your Secrets */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
              <ShieldCheck className="h-7 w-7 text-primary shrink-0" />
              How seQRets Protects Your Secrets
            </h2>

            <div className="grid gap-4 md:grid-cols-2 mb-8">
              <div className="rounded-2xl border border-border/30 bg-card/20 p-6">
                <div className="inline-flex rounded-xl bg-primary/10 p-3 mb-4">
                  <Eye className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display text-base font-bold text-foreground mb-2">Zero-Knowledge Architecture</h3>
                <p className="text-sm text-muted-foreground/80">
                  seQRets never sees, stores, or transmits your secret. Everything — encryption, splitting, QR generation — happens locally on your device. There is no server. There is no account. No analytics payload carrying fragments of your data. Your secret enters memory, gets encrypted and split, and is destroyed.
                </p>
              </div>
              <div className="rounded-2xl border border-border/30 bg-card/20 p-6">
                <div className="inline-flex rounded-xl bg-primary/10 p-3 mb-4">
                  <Lock className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display text-base font-bold text-foreground mb-2">Encryption</h3>
                <p className="text-sm text-muted-foreground/80">
                  Your secret is encrypted with <strong className="text-foreground">XChaCha20-Poly1305</strong>, the same authenticated encryption used in Signal, WireGuard, and libsodium. The key is derived from your password using <strong className="text-foreground">Argon2id</strong> (64MB memory cost, 3 iterations) — the gold standard for resisting brute-force and GPU-based attacks.
                </p>
              </div>
              <div className="rounded-2xl border border-border/30 bg-card/20 p-6">
                <div className="inline-flex rounded-xl bg-primary/10 p-3 mb-4">
                  <Atom className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display text-base font-bold text-foreground mb-2">Shamir's Secret Sharing</h3>
                <p className="text-sm text-muted-foreground/80">
                  After encryption, the ciphertext is split using <strong className="text-foreground">Shamir's Secret Sharing</strong> — a mathematically proven threshold scheme. Any fewer shares than the threshold reveals <strong className="text-foreground">zero information</strong> about the original. This isn't obscurity — it's information-theoretic security.
                </p>
              </div>
              <div className="rounded-2xl border border-border/30 bg-card/20 p-6">
                <div className="inline-flex rounded-xl bg-primary/10 p-3 mb-4">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display text-base font-bold text-foreground mb-2">QR Code Output</h3>
                <p className="text-sm text-muted-foreground/80">
                  Each share is rendered as a printable QR code designed to be distributed — stored in separate locations, given to trusted people, or locked in different safes. No single QR code is useful on its own.
                </p>
              </div>
            </div>
          </section>

          {/* Threat Comparison Table */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Web App vs. Desktop App
            </h2>
            <p className="text-muted-foreground/80 mb-6">
              Both apps use the same cryptographic core, but the desktop app closes several threat vectors that browsers can't.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-border/30">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/30 bg-card/30">
                    <th className="text-left p-4 font-display font-bold text-foreground">Threat</th>
                    <th className="text-left p-4 font-display font-bold text-muted-foreground">Web App</th>
                    <th className="text-left p-4 font-display font-bold text-primary">Desktop App</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20">
                  {[
                    ["Malicious browser extensions", "Exposed — extensions can read DOM, intercept clipboard, log keystrokes", "Immune — Tauri's WebView loads no extensions"],
                    ["JavaScript supply-chain attack", "Possible — code served from CDN at load time", "Eliminated — bundled, code-signed binary"],
                    ["Memory persistence", "JavaScript GC — timing unpredictable, strings immutable", "Rust zeroization — compiler-fence ensures memory is cleared"],
                    ["Binary tampering", "N/A", "Detected — code-signed, integrity verified at install"],
                    ["Offline operation", "After initial load only", "Always — no network required"],
                    ["Key derivation", "JavaScript (noble/hashes)", "Native Rust — argon2, chacha20poly1305 crates"],
                  ].map(([threat, web, desktop]) => (
                    <tr key={threat} className="hover:bg-card/20 transition-colors">
                      <td className="p-4 font-medium text-foreground">{threat}</td>
                      <td className="p-4 text-muted-foreground/70">{web}</td>
                      <td className="p-4 text-primary/90 font-medium">{desktop}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground/70 mt-4">
              The web app mitigates supply-chain risk by working offline after the first load. Once cached, no external code is fetched. But for users handling high-value secrets, the desktop app is the recommended choice.
            </p>
          </section>

          {/* Go Pro CTA */}
          <section>
            <div className="rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/10 to-primary/5 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-primary/70 mb-2">Ready to upgrade?</p>
                <h3 className="font-display text-xl font-black text-foreground">The desktop app eliminates every browser threat vector.</h3>
                <p className="text-sm text-muted-foreground/80 mt-1">Native Rust crypto, memory zeroization, code-signed binary — no browser required.</p>
              </div>
              <a
                href="/shop"
                className="shrink-0 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_24px_hsl(var(--primary)/0.4)] whitespace-nowrap"
              >
                Go Pro! →
              </a>
            </div>
          </section>

          {/* The Seed Phrase Question */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
              The Seed Phrase Question
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">"Why does my seed phrase touch a connected device?"</h3>
                <p className="text-muted-foreground/80">
                  It has to — and the design accounts for it. Your secret enters memory, gets encrypted under a key derived from your password, is split into Shamir shares, rendered as QR codes, and then destroyed. In the desktop app, Rust zeroes the memory with compiler-fence zeroization. The entire operation takes seconds.
                </p>
                <p className="text-muted-foreground/80 mt-3">
                  After that, the device holds <strong className="text-foreground">zero shares and zero copies of your secret.</strong> There is nothing left to steal.
                </p>
              </div>

              <div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">"Briefly is all it takes!"</h3>
                <p className="text-muted-foreground/80 mb-3">
                  For that brief window to matter, an attacker would need <strong className="text-foreground">active malware already running on your device</strong> — sophisticated enough to read process memory in real time at the exact moment you perform the operation.
                </p>
                <p className="text-muted-foreground/80 mb-3">If that's your situation, no tool protects you — air-gapped or otherwise:</p>
                <ul className="space-y-2 text-muted-foreground/80 ml-4">
                  {[
                    "That same malware can keylog your hardware wallet PIN",
                    "It can screenshot your paper seed when you check it",
                    "It can modify clipboard contents when you copy an address",
                    "It can replace firmware on your hardware wallet during updates",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-muted-foreground/80 mt-3 italic">
                  The threat model isn't "does the secret touch a device?" It's "is the device compromised at that moment?"
                </p>
              </div>

              <div>
                <h3 className="font-display text-lg font-bold text-foreground mb-3">What seQRets actually replaces</h3>
                <p className="text-muted-foreground/80 mb-3">Most people aren't using air-gapped machines. They're protecting their seed phrases with:</p>
                <ul className="space-y-2 text-muted-foreground/80 ml-4 mb-4">
                  {[
                    "A piece of paper in a desk drawer (fire, theft, single point of failure)",
                    "A screenshot synced to iCloud or Google Photos",
                    "A password manager (centralized target, corporate breach risk)",
                    'A plaintext file called "seed.txt"',
                    "Nothing at all",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-destructive mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-muted-foreground/80">
                  seQRets replaces all of that with encrypted, threshold-split backups distributed across multiple locations. Even if one share is physically stolen, it's cryptographically useless without meeting the threshold.
                </p>
              </div>

              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
                <h3 className="font-display text-base font-bold text-foreground mb-2">The honest bottom line</h3>
                <p className="text-muted-foreground/80">
                  An air-gapped machine with a verified OS that never connects to anything is more secure. seQRets doesn't claim otherwise. But for the 99% of crypto holders who don't have that setup, the choice isn't between seQRets and a perfect air-gapped workflow. <strong className="text-foreground">It's between seQRets and a sticky note.</strong>
                </p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-2">
              {[
                {
                  q: "Is seQRets open source?",
                  a: "Yes. The full source code is publicly available on GitHub. You can audit the encryption, the splitting logic, and every dependency. There is nothing hidden.",
                },
                {
                  q: "Does seQRets phone home or collect telemetry?",
                  a: "No. There are no analytics, no tracking pixels, no error reporting services. The app makes exactly one optional network call — to fetch the current Bitcoin price for display purposes. That's it. Even that can be disabled by going offline.",
                },
                {
                  q: "Where is my API key for Bob AI stored?",
                  a: "Locally on your device only. It is never sent anywhere except directly to Google's Gemini API when you ask Bob a question. It is never included in any other request. You can remove it at any time from the settings.",
                },
                {
                  q: "Can seQRets recover my secret if I lose my shares?",
                  a: "No. seQRets has no server, no account system, and no backup of your data. If you lose enough shares to fall below your chosen threshold, your secret is gone. This is by design — it means nobody else can recover it either.",
                },
                {
                  q: "What happens if the seQRets website or app goes offline?",
                  a: "The web app works fully offline once loaded. The desktop app has no network dependency at all. Even if the project disappeared entirely, anyone with the source code could reconstruct the recovery tool. The cryptographic standards used are open, well-documented, and implemented in dozens of other libraries.",
                },
                {
                  q: "What's the difference between the web app and desktop app?",
                  a: "Both use the same encryption and splitting logic. The desktop app adds native Rust cryptography, memory zeroization, browser extension immunity, code signing, and features like the Inheritance Plan builder and JavaCard smart card support.",
                },
                {
                  q: "Is the Inheritance Plan stored somewhere?",
                  a: "No. The Inheritance Plan is encrypted and exported as a file or written to a JavaCard. seQRets does not store any copy. If you lose all copies of your encrypted plan, it cannot be recovered.",
                },
                {
                  q: "What cryptographic libraries does seQRets use?",
                  a: "Web: @noble/ciphers and @noble/hashes by Paul Miller — audited, zero-dependency JavaScript implementations. Desktop: Native Rust crates — argon2, chacha20poly1305, and zeroize from the RustCrypto project.",
                },
                {
                  q: "Has seQRets been audited?",
                  a: "Not yet by a third-party firm. The code is open source and uses well-audited cryptographic primitives. A formal audit is on the roadmap. In the meantime, we encourage independent review — the codebase is intentionally small and readable.",
                },
              ].map(({ q, a }) => (
                <FaqItem key={q} question={q} answer={a} />
              ))}
            </div>
          </section>

          {/* Responsible Disclosure */}
          <section>
            <div className="rounded-2xl border border-border/40 bg-card/30 p-8 flex items-start gap-6">
              <div className="rounded-xl bg-primary/10 p-3 shrink-0">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-foreground mb-2">Responsible Disclosure</h2>
                <p className="text-muted-foreground/80">
                  If you discover a security vulnerability in seQRets, please report it privately to{" "}
                  <a href="mailto:security@seqrets.app" className="text-primary hover:underline">
                    security@seqrets.app
                  </a>
                  . Do not open a public issue. We take all reports seriously and will respond within 48 hours.
                </p>
              </div>
            </div>
          </section>
          {/* Bottom Go Pro CTA */}
          <section>
            <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 via-primary/8 to-transparent p-10 text-center">
              <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-primary/70 mb-4">Upgrade your security</p>
              <h3 className="font-display text-2xl md:text-3xl font-black text-foreground mb-3">
                You've seen the difference.<br />Make the right choice.
              </h3>
              <p className="text-muted-foreground/80 max-w-md mx-auto mb-8">
                The desktop app gives you native Rust cryptography, memory zeroization, and zero browser attack surface. Your secrets deserve it.
              </p>
              <a
                href="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_32px_hsl(var(--primary)/0.5)]"
              >
                Go Pro! →
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SecurityPage;
