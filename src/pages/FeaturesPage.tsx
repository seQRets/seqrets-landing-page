import { useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shield,
  QrCode,
  Users,
  CreditCard,
  Binary,
  Bot,
  Check,
  ShieldCheck,
  Zap,
  Package,
  Fingerprint,
  Github,
  ArrowUpRight,
} from "lucide-react";
import TechnicalDetails from "@/components/ui/TechnicalDetails";
import WaitlistButton from "@/components/WaitlistButton";
import PageHead from "@/components/PageHead";
import { PreviewPage, rise } from "@/components/preview/PreviewChrome";

import appDark from "@/assets/app-dark.webp";
import appLight from "@/assets/app-light.webp";

/* ------------------------------------------------------------------ *
 * /features — third interior page moved onto the redesign.
 *
 * Chrome and theming come from PreviewPage; this file is content only.
 *
 * The hero keeps its photograph, which is dark and stays dark in both
 * themes — so it is built from the --deep-* tokens, the same set the
 * landing page's dark band uses. Those are identical in light and dark on
 * purpose: it is a fixed surface, not a themed one.
 *
 * The per-category accent colours (--accent-crypto and friends) are gone.
 * They are fixed mid-lightness hues defined once in index.css, so they do
 * not follow the theme and read poorly on the light background. Nothing
 * on the page ever named the category, so the colour was carrying no
 * information a reader could decode.
 *
 * Two Tailwind traps to avoid, both silent: an arbitrary box-shadow
 * wrapping a CSS var parses as a shadow COLOUR and computes to none, and
 * an opacity modifier on a var() colour computes to transparent.
 * ------------------------------------------------------------------ */

interface FeatureSection {
  icon: typeof Shield;
  title: string;
  description: string;
  details: string[];
  technicalDetails?: string[];
  desktopOnly?: boolean;
}

const sections: FeatureSection[] = [
  {
    icon: Binary,
    title: "BIP-39 & SLIP-39",
    description:
      "Purpose-built for cryptocurrency seed phrases and recovery shares. Trezor Suite now backs up new wallets with a 20-word SLIP-39 phrase by default — seQRets speaks SLIP-39, so you can protect that backup exactly like a seed phrase, and it validates both formats automatically before you split.",
    details: [
      "Real-time BIP-39 validation — catches typos and transcription errors before you split",
      "Supports 12, 15, 18, 21, and 24-word BIP-39 seed phrases",
      "SLIP-39 detection — Trezor-style recovery shares (20 or 33 words, including multi-share sets) are recognized and checksum-validated on entry and on restore, so a mistyped word is caught before encryption",
      "SeedQR output for direct hardware-wallet import (Jade, Coldcard, Trezor)",
      "Restores show a numbered word grid — for both BIP-39 and SLIP-39 — so you can type the phrase back into a hardware wallet without losing your place",
      "Master fingerprint shown beside each SeedQR so you can verify the correct seed loaded into your wallet",
    ],
    technicalDetails: [
      "BIP-39 validation via @scure/bip39; XFP derivation via @scure/bip32 (both audited)",
      "XFP format: 8 uppercase hex chars (e.g., 73C5DA0A), derived from the master public key — no seed exposure",
      "Caveat: the on-device XFP will differ if you apply a BIP-39 passphrase at wallet-import time",
      "SLIP-39 detection is validation-only (RS1024 checksum) — a zero-dependency module embedding the official 1024-word list, verified against all 45 SatoshiLabs test vectors. seQRets validates and protects SLIP-39 shares; it does not generate, split, or combine them — your wallet does that.",
      "SLIP-39 phrases are stored as plain text rather than converted to entropy (preserving each share's metadata); no SeedQR is offered, as SeedQR is a BIP-39-only format",
    ],
  },
  {
    icon: Shield,
    title: "Secure Any Secret",
    description:
      "Not just crypto. Passwords, API keys, legal documents, account credentials, private notes — if it's sensitive, seQRets can encrypt and split it into shares that no single person can read alone.",
    details: [
      "The same encryption used in Signal and WireGuard (XChaCha20-Poly1305 + Argon2id)",
      "Optional keyfile adds a second factor — defeats keyloggers and weak passwords",
      "Fully offline. No server, no account, no telemetry",
      "Clipboard auto-clears 60 seconds after copy",
    ],
    technicalDetails: [
      "XChaCha20-Poly1305 AEAD: 256-bit key, 192-bit random nonce",
      "Argon2id KDF: 64 MB memory, 4 iterations, 16-byte random salt (password ‖ keyfile input)",
      "Optional keyfile adds up to 256 bits of entropy — concatenated with password before key derivation",
      "Installable as a Progressive Web App — service worker caches all assets for true offline use after first load",
    ],
  },
  {
    icon: QrCode,
    title: "QR-Coded Shares",
    description:
      "Each share becomes a scannable QR code — a Qard. Print them, laminate them, store them in different locations. When you need your secret back, scan enough Qards to meet your threshold.",
    details: [
      "Scannable from any device with a camera",
      "Print-friendly format for physical backups",
      "Each Qard is useless alone — mathematically guaranteed",
      "A Qard reveals nothing about your secret — not its contents, and not even its size",
      "Every Qard is stamped with its format version, so software decades from now can tell a damaged backup apart from one it's too old to read",
      "Blind export — switch labels off so cards and file names show only a card number and set ID; handy when someone else prints or etches your cards",
      "Durable paper backups outlast digital storage",
    ],
    technicalDetails: [
      "Share format (v1.14+): seQRets|<salt>|<data>|v=1[|t=K|n=N|i=I]|sha256:<64hex> — the SHA-256 integrity hash always sits last, and covers everything before it",
      "Format-version marker v=1 (v1.14+): first metadata segment, hash-covered. No v= segment means a pre-v1.14 share, parsed under the original rules; a v= above the supported version raises a clear \"created by a newer version — update\" error instead of misparsing",
      "Optional recovery metadata (v1.11+): t=K|n=N|i=I adds threshold, total, and 1-based card index for the restore-time countdown. Hash-covered (untamperable). Opt-out toggle.",
      "Length-privacy padding (v1.14+): the compressed payload is zero-padded to 192-byte buckets before encryption, so ciphertext size no longer correlates with secret size",
      "Label blind export (v1.14+): labels are always encrypted inside the payload; the \"Show label on Qards & file names\" switch (on by default) governs only the plaintext surfaces — card faces, file names, and smart-card entries",
      "Shamir's Secret Sharing over GF(256) via the shamir-secret-sharing library (Cure53 + Zellic audits)",
      "Legacy 3-part shares (no hash) are still fully supported for backward compatibility",
      "Manually verifiable in any terminal: echo -n \"seQRets|salt|data|v=1|t=K|n=N|i=I\" | shasum -a 256 — hash input is everything before |sha256:",
    ],
  },
  {
    icon: CreditCard,
    title: "Smart Card Support",
    desktopOnly: true,
    description:
      "Store shares on JCOP smart cards for durable, tamper-evident physical security. Insert your card into the USB reader to back up or restore.",
    details: [
      "Read and write shares over a USB card reader",
      "Tamper-evident design reveals physical compromise",
      "Survives water, dust, and everyday wear",
      "Portable USB card reader included with bundles",
    ],
    technicalDetails: [
      "JCOP-based dual-interface Java Cards; the desktop app uses the contact interface (ISO 7816) via a USB reader (NFC not yet supported)",
      "GlobalPlatform 2.3+ compatible — seQRets applet pre-installed on branded cards",
      "Desktop app communicates via standard USB CCID readers (contact mode)",
      "PIN-protected with wipe-after-5-attempts; optional wipe protection flag prevents factory reset on lockout",
    ],
  },
  {
    icon: Users,
    title: "Inheritance Planning",
    desktopOnly: true,
    description:
      "Document every secret, assign assets to beneficiaries, and plan for incapacitation — all in one encrypted plan.",
    details: [
      "Multiple seQRet Sets — capture every secret in one plan",
      "Live restore countdown — heirs see '2 of 3 added' as they scan, no need to remember the threshold",
      "Beneficiaries and emergency contacts — who gets what, and what happens if you're incapacitated",
      "Edit, re-encrypt, or export a printable PDF for heirs",
      "Automatic review reminders so your plan never goes stale",
    ],
    technicalDetails: [
      "Plan schema v5 with backward-compatible migration — older plans auto-upgrade on decryption",
      "Review reminders use a local sidecar file storing only a future date — zero plan contents, zero identifiers",
      "Reminder cadence: 6, 12, or 24 months; home-tab banner + nav badge + optional OS notification",
      "PDF export uses dynamic section numbering — empty sections are skipped, no gaps",
    ],
  },
  {
    icon: Bot,
    title: "Bob — AI Assistant",
    description:
      "Meet Bob, your built-in security guide. Bob helps you understand encryption concepts, plan your secret management strategy, and make informed decisions — without ever seeing your secrets.",
    details: [
      "Explains security concepts in plain language",
      "Suggests share distribution and threshold strategies",
      "Helps plan inheritance and recovery scenarios",
      "Optional — bring your own Google Gemini key, disconnect anytime",
    ],
    technicalDetails: [
      "Your questions are sent directly to Google's Gemini API — no middleman, no seQRets server",
      "Desktop: API key stored in the OS keychain (macOS Keychain / Windows Credential Store)",
      "Web: key stored in localStorage with an optional \"Remember this key\" toggle — unchecked = session-only",
      "No secret data, share data, or plan contents are ever included in any request",
    ],
  },
];

const desktopPerks = [
  { icon: ShieldCheck, label: "Code-signed binary — installs cleanly on Mac, Windows & Linux" },
  { icon: Zap, label: "Automatic delta updates — security patches delivered instantly" },
  { icon: CreditCard, label: "Smart card support — store shares on a JCOP card via USB reader" },
  { icon: Fingerprint, label: "Printed SHA fingerprint on every Qard — verifiable against your records without scanning" },
  { icon: Package, label: "Everything included — smart card & USB reader shipped to you" },
];

const FeaturesPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleScroll = useCallback(() => {
    if (!heroRef.current || !bgRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const progress = -rect.top / rect.height;
    bgRef.current.style.transform = `translateY(${progress * 30}%)`;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <PreviewPage>
      <PageHead
        title="Features"
        description="Explore seQRets features: BIP-39 validation, Shamir's Secret Sharing, QR-coded backups, smart card storage, inheritance planning, and Bob the AI assistant."
        path="/features"
      />

      {/* ── Hero — a fixed dark band in both themes ─────────── */}
      <section
        ref={heroRef}
        className="relative flex min-h-[62vh] items-center justify-center overflow-hidden bg-[var(--deep)] md:min-h-[72vh]"
      >
        <div className="pointer-events-none absolute -bottom-[20%] -top-[20%] inset-x-0 will-change-transform">
          <img
            ref={bgRef}
            src="/Features_Hero_v2.webp"
            alt=""
            className="h-full w-full object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(13,11,9,.62), rgba(13,11,9,.55) 45%, rgba(13,11,9,.96))",
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-3xl px-6 pt-12 text-center"
        >
          <p className="font-display text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--deep-gold)]">
            Features
          </p>
          <h1 className="mt-4 font-display text-[38px] font-bold leading-[1.1] tracking-[-0.035em] text-[var(--deep-ink)] sm:text-[46px] md:text-[54px]">
            Built for what you
            <br />
            can&rsquo;t afford to lose.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[15.5px] leading-[1.7] text-[var(--deep-ink2)]">
            From seed phrase validation to inheritance planning — every feature
            is designed to protect your most sensitive information with zero
            compromise.
          </p>
        </motion.div>
      </section>

      {/* ── Feature grid ────────────────────────────────────── */}
      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              id={section.title.toLowerCase().replace(/\s+/g, "-")}
              {...rise}
              transition={{ ...rise.transition, delay: (i % 3) * 0.06 }}
              className="flex scroll-mt-24 flex-col rounded-[22px] border border-[var(--line)] bg-[var(--sf)] p-6 md:p-7"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex rounded-[12px] bg-[var(--gold-fill)] p-2.5">
                  <section.icon className="h-5 w-5 text-[var(--gold)]" strokeWidth={1.8} />
                </span>
                {section.desktopOnly && (
                  <span className="rounded-full bg-[var(--gold-fill)] px-2.5 py-0.5 font-display text-[10px] font-semibold uppercase tracking-wide text-[var(--gold)]">
                    Pro · Desktop
                  </span>
                )}
              </div>

              <h2 className="mt-4 font-display text-[19px] font-bold tracking-[-0.02em]">
                {section.title}
              </h2>

              <p className="mt-3 text-[14px] leading-[1.7] text-[var(--ink2)]">
                {section.description}
              </p>

              <ul className="mt-5 flex-1 space-y-2.5">
                {section.details.map((detail, j) => (
                  <li key={j} className="flex items-start gap-2.5">
                    <span className="mt-[3px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--gold-fill)]">
                      <Check className="h-2.5 w-2.5 text-[var(--gold)]" strokeWidth={3} />
                    </span>
                    <span className="text-[14px] leading-[1.65] text-[var(--ink2)]">
                      {detail}
                    </span>
                  </li>
                ))}
              </ul>

              {section.technicalDetails && section.technicalDetails.length > 0 && (
                <TechnicalDetails className="mt-5">
                  <ul className="space-y-2">
                    {section.technicalDetails.map((td, k) => (
                      <li key={k} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--gold)]" />
                        <span>{td}</span>
                      </li>
                    ))}
                  </ul>
                </TechnicalDetails>
              )}

              {section.desktopOnly && (
                <p className="mt-3 border-t border-[var(--line)] pt-3 text-[12px] italic text-[var(--ink3)]">
                  Requires Desktop — see the{" "}
                  <Link
                    to="/preview/shop"
                    className="font-semibold not-italic text-[var(--gold)] underline underline-offset-2"
                  >
                    Shop
                  </Link>
                  .
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Desktop CTA ─────────────────────────────────────── */}
      <section className="bg-[var(--band)] px-6 py-20 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div {...rise}>
            <p className="font-display text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--gold)]">
              Desktop app
            </p>
            <h2 className="mt-4 font-display text-[30px] font-bold leading-[1.18] tracking-[-0.03em] md:text-[38px]">
              Ready to go pro?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-[1.7] text-[var(--ink2)]">
              Everything in the free web app, plus smart card integration, an
              in-app inheritance plan builder, code signing, and automatic
              updates — built natively with Rust and Tauri.
            </p>
          </motion.div>

          <motion.div {...rise} className="mt-12 grid gap-4 md:grid-cols-2">
            <div className="overflow-hidden rounded-[18px] border border-[var(--line)]">
              <img src={appDark} alt="The seQRets desktop app in its dark theme" className="w-full object-cover" />
            </div>
            <div className="overflow-hidden rounded-[18px] border border-[var(--line)]">
              <img src={appLight} alt="The seQRets desktop app in its light theme" className="w-full object-cover" />
            </div>
          </motion.div>

          <div className="mt-12 grid gap-3 text-left sm:grid-cols-2">
            {desktopPerks.map((p, i) => (
              <motion.div
                key={p.label}
                {...rise}
                transition={{ ...rise.transition, delay: (i % 2) * 0.06 }}
                className="flex items-center gap-3 rounded-[18px] border border-[var(--line)] bg-[var(--sf)] p-5"
              >
                <span className="flex shrink-0 items-center justify-center rounded-[10px] bg-[var(--gold-fill)] p-2">
                  <p.icon className="h-4 w-4 text-[var(--gold)]" strokeWidth={1.8} />
                </span>
                <span className="text-[14px] leading-[1.5] text-[var(--ink2)]">{p.label}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            {...rise}
            className="mt-10 rounded-[18px] border border-[var(--gold-line)] bg-[var(--gold-fill)] p-7 text-left"
          >
            <h3 className="font-display text-[16px] font-bold">
              One-time purchase. No subscription. Yours forever.
            </h3>
            <p className="mt-2 text-[14px] leading-[1.7] text-[var(--ink2)]">
              A code-signed desktop app with automatic updates, smart card
              support, and a portable USB reader — all included. The code base is
              always free under AGPLv3.
            </p>
          </motion.div>

          <motion.div
            {...rise}
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          >
            <WaitlistButton
              source="features-desktop-cta"
              label="Join the waitlist"
              className="inline-flex items-center rounded-[10px] bg-[var(--gold)] px-7 py-3.5 font-display text-[14px] font-semibold text-[var(--gold-ink)] transition-transform hover:scale-[1.02]"
            />
            <a
              href="https://github.com/seQRets/seQRets-app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-[10px] border border-[var(--line)] px-7 py-3.5 font-display text-[14px] font-semibold text-[var(--ink)] transition-colors hover:bg-[var(--sf)]"
            >
              <Github className="h-4 w-4" />
              Build from the code base
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </motion.div>
        </div>
      </section>
    </PreviewPage>
  );
};

export default FeaturesPage;
