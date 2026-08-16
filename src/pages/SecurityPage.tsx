import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Atom, Eye, Mail, ArrowUpRight } from "lucide-react";
import PageHead from "@/components/PageHead";
import { PreviewPage, rise } from "@/components/preview/PreviewChrome";
import PreviewFaq from "@/components/preview/PreviewFaq";

/* ------------------------------------------------------------------ *
 * /security — second interior page moved onto the redesign.
 *
 * Chrome and theming come from PreviewPage; this file is content only.
 * Colours are palette tokens rather than shadcn semantics, which is what
 * gives the page a light theme.
 *
 * Two Tailwind traps to avoid here, both silent:
 *   - an arbitrary box-shadow wrapping a CSS var parses as a shadow
 *     COLOUR, so box-shadow computes to none; it needs the shadow: prefix.
 *   - an opacity modifier on a var() colour computes to transparent, so
 *     translucent fills use their own tokens (--gold-fill, --gold-line).
 * ------------------------------------------------------------------ */

const PILLARS = [
  {
    icon: Eye,
    t: "Zero-knowledge architecture",
    p: "seQRets never sees, stores, or transmits your secret. Everything — encryption, splitting, QR generation — happens locally on your device. There is no server. There is no account. No analytics payload carrying fragments of your data. Your secret enters memory, gets encrypted and split, and is destroyed.",
  },
  {
    icon: Lock,
    t: "Encryption",
    p: "Your secret is encrypted with XChaCha20-Poly1305, the same authenticated encryption used in Signal, WireGuard, and libsodium. The key is derived from your password (and optional keyfile) using Argon2id (64MB memory cost, 4 iterations) — the gold standard for resisting brute-force and GPU-based attacks. A generated keyfile adds 256 bits of entropy, defeating brute-force regardless of password strength.",
  },
  {
    icon: Atom,
    t: "Shamir's Secret Sharing",
    p: "After encryption, the ciphertext is split using Shamir's Secret Sharing — a mathematically proven threshold scheme. Any fewer shares than the threshold reveals zero information about the original. This isn't obscurity — it's information-theoretic security.",
  },
  {
    icon: ShieldCheck,
    t: "QR code output",
    p: "Each share is rendered as a printable QR code designed to be distributed — stored in separate locations, given to trusted people, or locked in different safes. No single QR code is useful on its own. A Qard reveals nothing about your secret — not its contents, and not even its size: payloads are padded to fixed-size buckets before encryption, so a 12-word seed, a 24-word seed, and a labeled backup all produce identically sized Qards.",
  },
];

const THREATS: [string, string, string][] = [
  ["Malicious browser extensions", "Exposed — extensions can read DOM, intercept clipboard, log keystrokes", "Immune — Tauri's WebView loads no extensions"],
  ["JavaScript supply-chain attack", "Possible — code served from CDN at load time", "Eliminated — bundled, code-signed binary"],
  ["Memory persistence", "JavaScript GC — timing unpredictable, strings immutable", "Rust zeroization — compiler-fence ensures memory is cleared"],
  ["Binary tampering", "N/A", "Detected — code-signed, integrity verified at install"],
  ["Offline operation", "After initial load only", "Always — no network required"],
  ["Key derivation", "JavaScript (noble/hashes)", "Native Rust — argon2, chacha20poly1305 crates"],
  ["Share integrity verification", "SHA-256 hash embedded and verified silently — no visible UI", "Auto-verified on restore with shield icon, SHA-256 fingerprint on printed cards"],
  ["Clipboard auto-clear", "60 seconds after copy", "60 seconds after copy"],
  ["Bob AI API key storage", "localStorage (optional \"remember\")", "OS keychain (macOS Keychain / Windows Credential Store)"],
  ["Network exposure indicator", "Pulsing header dot: red = online, green = offline", "Pulsing header dot: red = online, green = offline"],
];

const REPLACES = [
  "A piece of paper in a desk drawer (fire, theft, single point of failure)",
  "A screenshot synced to iCloud or Google Photos",
  "A password manager (centralized target, corporate breach risk)",
  'A plaintext file called "seed.txt"',
  "Nothing at all",
];

const SAME_MALWARE = [
  "That same malware can keylog your hardware wallet PIN",
  "It can screenshot your paper seed when you check it",
  "It can modify clipboard contents when you copy an address",
  "It can replace firmware on your hardware wallet during updates",
];

const FAQS = [
  {
    q: "Is seQRets open source?",
    a: "Yes. The full code base is publicly available on GitHub. You can audit the encryption, the splitting logic, and every dependency. There is nothing hidden.",
  },
  {
    q: "Does seQRets phone home or collect telemetry?",
    a: "No. There are no analytics, no tracking pixels, no error reporting services. The app makes exactly one optional network call — to fetch the current Bitcoin price for display purposes. That's it. Even that can be disabled by going offline.",
  },
  {
    q: "Where is my API key for Bob AI stored?",
    a: "Locally on your device only. On the desktop app, the key is stored in the OS keychain (macOS Keychain / Windows Credential Store) rather than localStorage. On the web app, it is kept in localStorage, with an optional \"Remember this key\" toggle — unchecked, the key is session-only. It is never sent anywhere except directly to Google's Gemini API when you ask Bob a question, and is never included in any other request. You can remove it at any time from the settings.",
  },
  {
    q: "Why does seQRets enforce a 24-character password minimum?",
    a: "Password entropy compounds exponentially per character; KDF iteration counts (Argon2id rounds) only multiply attacker work by a constant factor. A 24-character random password drawn from mixed character classes carries roughly 150–200 bits of entropy — enough to make brute-force infeasible on its own, before Argon2id slows it down further. Tools that allow short passwords or short human-memorable passphrases push the entire defense onto the KDF. seQRets refuses to let weak passwords exist in the first place: 24-character minimum, multiple character classes required, and a built-in generator that produces ≈200-bit-entropy passwords by default.",
  },
  {
    q: "What is a keyfile and should I use one?",
    a: "A keyfile is an optional binary file that acts as a second authentication factor alongside your password. When provided, the keyfile bytes are concatenated with your password before key derivation. A generated keyfile adds 256 bits of entropy, making brute-force attacks infeasible regardless of password strength. It also protects against keyloggers and shoulder surfing since the keyfile is never typed or displayed.",
  },
  {
    q: "What happens if I lose my keyfile?",
    a: "If you encrypted with a keyfile and lose it, your secret cannot be decrypted. There is no recovery mechanism. Back up your keyfile separately from your shares and password — treat it with the same care as any other critical credential.",
  },
  {
    q: "Can seQRets recover my secret if I lose my shares?",
    a: "No. seQRets has no server, no account system, and no backup of your data. If you lose enough shares to fall below your chosen threshold, your secret is gone. This is by design — it means nobody else can recover it either.",
  },
  {
    q: "What happens if seqrets.app goes offline?",
    a: "Your secrets remain recoverable. We maintain a separate open-source recovery tool called seQRets Recover — one HTML file, no install, no network, works offline in any modern browser. Save a copy of recover.html alongside your Qards and it will keep working long after this website is gone. The recovery tool lives in its own repository (github.com/seQRets/seQRets-Recover) with its own release chain, independent of the main app. The web app and desktop app also work offline once loaded, and the share format is documented well enough that any developer could reimplement the recovery tool from scratch in an afternoon.",
  },
  {
    q: "What's the difference between the web app and desktop app?",
    a: "Both use the same encryption and splitting logic. The desktop app adds native Rust cryptography, memory zeroization, browser extension immunity, code signing, SHA-256 share integrity verification with visual indicators, and features like the Inheritance Plan builder and JavaCard smart card support.",
  },
  {
    q: "Is the Inheritance Plan stored somewhere?",
    a: "No. The Inheritance Plan is encrypted and exported as a file or written to a JavaCard. seQRets does not store any copy. If you lose all copies of your encrypted plan, it cannot be recovered.",
  },
  {
    q: "What cryptographic libraries does seQRets use?",
    a: "Web: @noble/ciphers, @noble/hashes, @scure/bip32, and @scure/bip39 by Paul Miller — audited, zero-dependency JavaScript implementations. Shamir splitting uses the shamir-secret-sharing library (independently audited by Cure53 and Zellic). Desktop: native Rust crates — argon2, chacha20poly1305, and zeroize from the RustCrypto project.",
  },
  {
    q: "Has seQRets been audited?",
    a: "Not yet as a whole product by a third-party firm, but the app is built on well-audited primitives: the shamir-secret-sharing library has been independently audited by both Cure53 and Zellic; @noble/* and @scure/* libraries by Paul Miller have undergone extensive public review; and the RustCrypto crates used on the desktop are widely vetted. An internal code review in v1.4.0 identified 11 findings — all resolved. A formal whole-product audit is on the roadmap.",
  },
  {
    q: "Why is the connection indicator red when I'm online?",
    a: "Intentional inversion. For a security app, being online means being exposed to the network — which is the riskier state. Green = offline (safer). The dot pulses red while online and stays solid green while offline. Behind the scenes it pings a tiny (1-byte) file every 5 seconds, because browser navigator.onLine is unreliable.",
  },
  {
    q: "Does seQRets auto-clear the clipboard?",
    a: "Yes. Any secret copied from seQRets (password, recovered plaintext, share text) is automatically cleared from the system clipboard 60 seconds after the copy.",
  },
  {
    q: "Can I install seQRets as an app?",
    a: "Yes. The web app at app.seqrets.app is a Progressive Web App — use your browser's install prompt (or \"Add to Home Screen\" on mobile) to install it to your device. Once installed, it runs fully offline after first load. For higher-assurance use, install the Desktop app instead: native Rust crypto, explicit memory zeroization, code signing, and an isolated WebView.",
  },
];

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-display text-[27px] font-bold leading-[1.2] tracking-[-0.03em] md:text-[32px]">
    {children}
  </h2>
);

const SecurityPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PreviewPage>
      <PageHead
        title="Security"
        description="How seQRets protects your secrets: XChaCha20-Poly1305 encryption, Argon2id key derivation, Shamir's Secret Sharing, and zero-knowledge architecture."
        path="/security"
      />

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 pb-14 pt-16 md:pt-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 h-[420px] w-[46%] opacity-[.55]"
          style={{ background: "radial-gradient(60% 55% at 70% 30%, var(--goldsoft), transparent)" }}
        />
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-3xl text-center"
        >
          <p className="font-display text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--gold)]">
            Trust &amp; transparency
          </p>
          <h1 className="mt-4 font-display text-[38px] font-bold leading-[1.1] tracking-[-0.035em] sm:text-[46px] md:text-[54px]">
            The threat model, in the open.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[15.5px] leading-[1.7] text-[var(--ink2)]">
            What seQRets protects against, how the architecture works, and where
            the honest limits are.
          </p>
        </motion.div>
      </section>

      {/* ── Audit status ────────────────────────────────────── */}
      <section className="px-6 pb-16">
        <motion.p
          {...rise}
          className="mx-auto max-w-2xl rounded-2xl border border-[var(--line)] bg-[var(--band)] p-5 text-center text-[13.5px] leading-[1.65] text-[var(--ink2)]"
        >
          <span className="font-semibold text-[var(--ink)]">Audit status:</span>{" "}
          seQRets has not yet undergone a formal third-party security audit. It
          is built on independently audited cryptographic libraries, and a
          whole-product audit is on the roadmap. Until then, keep an independent
          backup of anything you protect with seQRets.
        </motion.p>
      </section>

      {/* ── Pillars ─────────────────────────────────────────── */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl">
          <motion.div {...rise} className="text-center">
            <p className="font-display text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--gold)]">
              The architecture
            </p>
            <SectionHeading>How seQRets protects your secrets</SectionHeading>
          </motion.div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {PILLARS.map((c, i) => (
              <motion.div
                key={c.t}
                {...rise}
                transition={{ ...rise.transition, delay: i * 0.06 }}
                className="rounded-[22px] border border-[var(--line)] bg-[var(--sf)] p-7"
              >
                <span className="inline-flex rounded-[12px] bg-[var(--gold-fill)] p-3">
                  <c.icon className="h-5 w-5 text-[var(--gold)]" strokeWidth={1.8} />
                </span>
                <h3 className="mt-5 font-display text-[17px] font-bold">{c.t}</h3>
                <p className="mt-2.5 text-[14px] leading-[1.7] text-[var(--ink2)]">
                  {c.p}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Web vs desktop ──────────────────────────────────── */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-5xl">
          <motion.div {...rise}>
            <SectionHeading>Web app vs. desktop app</SectionHeading>
            <p className="mt-3.5 max-w-2xl text-[15px] leading-[1.7] text-[var(--ink2)]">
              Both apps use the same cryptographic core, but the desktop app
              closes several threat vectors that browsers can&rsquo;t.
            </p>
          </motion.div>

          <motion.div
            {...rise}
            className="mt-8 overflow-x-auto rounded-[18px] border border-[var(--line)]"
          >
            <table className="w-full min-w-[640px] text-[13.5px]">
              <thead>
                <tr className="bg-[var(--band)]">
                  <th className="p-4 text-left font-display font-bold text-[var(--ink)]">Threat</th>
                  <th className="p-4 text-left font-display font-bold text-[var(--ink2)]">Web app</th>
                  <th className="p-4 text-left font-display font-bold text-[var(--gold)]">Desktop app</th>
                </tr>
              </thead>
              <tbody>
                {THREATS.map(([threat, web, desktop]) => (
                  <tr key={threat} className="border-t border-[var(--line)]">
                    <td className="p-4 font-medium text-[var(--ink)]">{threat}</td>
                    <td className="p-4 leading-[1.6] text-[var(--ink2)]">{web}</td>
                    <td className="p-4 font-medium leading-[1.6] text-[var(--gold)]">{desktop}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.p {...rise} className="mt-4 text-[13.5px] leading-[1.65] text-[var(--ink3)]">
            The web app mitigates supply-chain risk by working offline after the
            first load. Once cached, no external code is fetched. But for users
            handling high-value secrets, the desktop app is the recommended
            choice.
          </motion.p>
        </div>
      </section>

      {/* ── Mid CTA ─────────────────────────────────────────── */}
      <section className="px-6 pb-20">
        <motion.div
          {...rise}
          className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 rounded-[22px] border border-[var(--gold-line)] bg-[var(--gold-fill)] p-8 md:flex-row md:items-center"
        >
          <div>
            <p className="font-display text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--gold)]">
              Ready to upgrade?
            </p>
            <h3 className="mt-2.5 font-display text-[20px] font-bold leading-[1.3]">
              The desktop app eliminates every browser threat vector.
            </h3>
            <p className="mt-1.5 text-[14px] leading-[1.6] text-[var(--ink2)]">
              Native Rust crypto, memory zeroization, code-signed binary — no
              browser required.
            </p>
          </div>
          <Link
            to="/preview/shop"
            className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-[10px] bg-[var(--gold)] px-6 py-3 font-display text-[14px] font-semibold text-[var(--gold-ink)] transition-transform hover:scale-[1.02]"
          >
            Get the app
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>
      </section>

      {/* ── The seed phrase question ────────────────────────── */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-3xl">
          <motion.div {...rise}>
            <SectionHeading>The seed phrase question</SectionHeading>
          </motion.div>

          <motion.div {...rise} className="mt-9">
            <h3 className="font-display text-[17px] font-bold">
              &ldquo;Why does my seed phrase touch a connected device?&rdquo;
            </h3>
            <p className="mt-2.5 text-[15px] leading-[1.7] text-[var(--ink2)]">
              It has to — and the design accounts for it. Your secret briefly
              enters memory, gets encrypted under a key derived from your
              password and optional keyfile, is split into Shamir shares,
              rendered as QR codes, and then destroyed. In the desktop app, Rust
              zeroes the memory with compiler-fence zeroization. The entire
              operation takes seconds.
            </p>
            <p className="mt-3 text-[15px] leading-[1.7] text-[var(--ink2)]">
              After that, the device holds{" "}
              <strong className="font-semibold text-[var(--ink)]">
                zero shares and zero copies of your secret.
              </strong>{" "}
              There is nothing left to steal.
            </p>
          </motion.div>

          <motion.div {...rise} className="mt-9">
            <h3 className="font-display text-[17px] font-bold">
              &ldquo;Briefly is all it takes!&rdquo;
            </h3>
            <p className="mt-2.5 text-[15px] leading-[1.7] text-[var(--ink2)]">
              For that brief window to matter, an attacker would need{" "}
              <strong className="font-semibold text-[var(--ink)]">
                active malware already running on your device
              </strong>{" "}
              — sophisticated enough to read process memory in real time at the
              exact moment you perform the operation.
            </p>
            <p className="mt-3 text-[15px] leading-[1.7] text-[var(--ink2)]">
              If that&rsquo;s your situation, no tool protects you — air-gapped
              or otherwise:
            </p>
            <ul className="mt-4 space-y-2.5">
              {SAME_MALWARE.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold)]" />
                  <span className="text-[15px] leading-[1.7] text-[var(--ink2)]">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[15px] italic leading-[1.7] text-[var(--ink2)]">
              The threat model isn&rsquo;t &ldquo;does the secret touch a
              device?&rdquo; It&rsquo;s &ldquo;is the device compromised at that
              moment?&rdquo;
            </p>
          </motion.div>

          <motion.div {...rise} className="mt-9">
            <h3 className="font-display text-[17px] font-bold">
              What seQRets actually replaces
            </h3>
            <p className="mt-2.5 text-[15px] leading-[1.7] text-[var(--ink2)]">
              Most people aren&rsquo;t using air-gapped machines. They&rsquo;re
              protecting their seed phrases with:
            </p>
            <ul className="mt-4 space-y-2.5">
              {REPLACES.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--ink3)]" />
                  <span className="text-[15px] leading-[1.7] text-[var(--ink2)]">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[15px] leading-[1.7] text-[var(--ink2)]">
              seQRets replaces all of that with encrypted, threshold-split
              backups distributed across multiple locations. Even if one share is
              physically stolen, it&rsquo;s cryptographically useless without
              meeting the threshold.
            </p>
          </motion.div>

          <motion.div
            {...rise}
            className="mt-9 rounded-[18px] border border-[var(--gold-line)] bg-[var(--gold-fill)] p-6"
          >
            <h3 className="font-display text-[16px] font-bold">The honest bottom line</h3>
            <p className="mt-2.5 text-[15px] leading-[1.7] text-[var(--ink2)]">
              An air-gapped machine with a verified OS that never connects to
              anything is more secure. seQRets doesn&rsquo;t claim otherwise. But
              for the 99% of crypto holders who don&rsquo;t have that setup, the
              choice isn&rsquo;t between seQRets and a perfect air-gapped
              workflow.{" "}
              <strong className="font-semibold text-[var(--ink)]">
                It&rsquo;s between seQRets and a sticky note.
              </strong>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────── */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-3xl">
          <motion.div {...rise} className="text-center">
            <p className="font-display text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--gold)]">
              Questions
            </p>
            <SectionHeading>Frequently asked</SectionHeading>
          </motion.div>
          <div className="mt-10 space-y-2.5">
            {FAQS.map(({ q, a }) => (
              <PreviewFaq key={q} question={q} answer={a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Responsible disclosure ──────────────────────────── */}
      <section className="px-6 pb-20">
        <motion.div
          {...rise}
          className="mx-auto flex max-w-3xl items-start gap-5 rounded-[22px] border border-[var(--line)] bg-[var(--sf)] p-8"
        >
          <span className="shrink-0 rounded-[12px] bg-[var(--gold-fill)] p-3">
            <Mail className="h-6 w-6 text-[var(--gold)]" strokeWidth={1.8} />
          </span>
          <div>
            <h2 className="font-display text-[19px] font-bold">Responsible disclosure</h2>
            <p className="mt-2 text-[15px] leading-[1.7] text-[var(--ink2)]">
              If you discover a security vulnerability in seQRets, please report
              it privately to{" "}
              <a
                href="mailto:security@seqrets.app"
                className="font-semibold text-[var(--gold)] underline underline-offset-2 transition-opacity hover:opacity-80"
              >
                security@seqrets.app
              </a>
              . Do not open a public issue. We take all reports seriously and
              will respond within 48 hours.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── Bottom CTA ──────────────────────────────────────── */}
      <section className="px-6 pb-24">
        <motion.div {...rise} className="mx-auto max-w-2xl text-center">
          <p className="font-display text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--gold)]">
            Upgrade your security
          </p>
          <h2 className="mt-4 font-display text-[27px] font-bold leading-[1.2] tracking-[-0.03em] md:text-[32px]">
            You&rsquo;ve seen the difference.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-[1.7] text-[var(--ink2)]">
            The desktop app gives you native Rust cryptography, memory
            zeroization, and zero browser attack surface.
          </p>
          <Link
            to="/preview/shop"
            className="mt-7 inline-flex items-center gap-1.5 rounded-[10px] bg-[var(--gold)] px-6 py-3.5 font-display text-[14px] font-semibold text-[var(--gold-ink)] transition-transform hover:scale-[1.02]"
          >
            Get the app
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>
      </section>
    </PreviewPage>
  );
};

export default SecurityPage;
