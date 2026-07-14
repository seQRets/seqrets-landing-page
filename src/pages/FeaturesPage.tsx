import { useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import TechnicalDetails from "@/components/ui/TechnicalDetails";
import WaitlistButton from "@/components/WaitlistButton";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import PageHead from "@/components/PageHead";

import appDark from "@/assets/app-dark.webp";
import appLight from "@/assets/app-light.webp";

type Category = "crypto" | "smart" | "inherit" | "ai";

const accentClasses: Record<Category, { bg: string; text: string; border: string; badge: string; badgeText: string }> = {
  crypto:  { bg: "bg-accent-crypto/10", text: "text-accent-crypto", border: "border-accent-crypto/30", badge: "bg-accent-crypto/15", badgeText: "text-accent-crypto" },
  smart:   { bg: "bg-accent-smart/10",  text: "text-accent-smart",  border: "border-accent-smart/30",  badge: "bg-accent-smart/15",  badgeText: "text-accent-smart" },
  inherit: { bg: "bg-accent-inherit/10", text: "text-accent-inherit", border: "border-accent-inherit/30", badge: "bg-accent-inherit/15", badgeText: "text-accent-inherit" },
  ai:      { bg: "bg-accent-ai/10",     text: "text-accent-ai",     border: "border-accent-ai/30",     badge: "bg-accent-ai/15",     badgeText: "text-accent-ai" },
};

interface FeatureSection {
  icon: typeof Shield;
  title: string;
  category: Category;
  description: string;
  details: string[];
  technicalDetails?: string[];
  desktopOnly?: boolean;
}

const sections: FeatureSection[] = [
  {
    icon: Binary,
    title: "BIP-39 Optimized",
    category: "crypto",
    description:
      "Purpose-built for cryptocurrency seed phrases and private keys. seQRets validates BIP-39 mnemonics and checksums automatically — so you know your backup is correct before you split it.",
    details: [
      "Real-time BIP-39 validation — catches typos and transcription errors before you split",
      "Supports 12, 15, 18, 21, and 24-word seed phrases",
      "SeedQR output for direct hardware-wallet import (Jade, Coldcard, Trezor)",
      "Master fingerprint shown beside each SeedQR so you can verify the correct seed loaded into your wallet",
    ],
    technicalDetails: [
      "Validation via @scure/bip39; XFP derivation via @scure/bip32 (both audited)",
      "XFP format: 8 uppercase hex chars (e.g., 73C5DA0A), derived from the master public key — no seed exposure",
      "Caveat: the on-device XFP will differ if you apply a BIP-39 passphrase at wallet-import time",
    ],
  },
  {
    icon: Shield,
    title: "Secure Any Secret",
    category: "crypto",
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
    category: "smart",
    description:
      "Each share becomes a scannable QR code — a Qard. Print them, laminate them, store them in different locations. When you need your secret back, scan enough Qards to meet your threshold.",
    details: [
      "Scannable from any device with a camera",
      "Print-friendly format for physical backups",
      "Each Qard is useless alone — mathematically guaranteed",
      "Durable paper backups outlast digital storage",
    ],
    technicalDetails: [
      "Share format: seQRets|salt|data|sha256:<hex> — 4-part with embedded SHA-256 integrity hash",
      "v1.11+ optional recovery metadata: seQRets|salt|data|sha256:<hex>|t=K|n=N|i=I — adds threshold, total, and 1-based index for restore-time countdown UX. Hash-covered (untamperable). Opt-out toggle.",
      "Shamir's Secret Sharing over GF(256) via the shamir-secret-sharing library (Cure53 + Zellic audits)",
      "Legacy 3-part shares (no hash) are still fully supported for backward compatibility",
      "Manually verifiable in any terminal: echo -n \"seQRets|salt|data\" | shasum -a 256 (append |t=K|n=N|i=I if metadata enabled)",
    ],
  },
  {
    icon: CreditCard,
    title: "Smart Card Support",
    category: "smart",
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
    category: "inherit",
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
    category: "ai",
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
    <div className="min-h-screen bg-background">
      <PageHead
        title="Features"
        description="Explore seQRets features: BIP-39 validation, Shamir's Secret Sharing, QR-coded backups, smart card storage, inheritance planning, and Bob the AI assistant."
        path="/features"
      />
      <Navbar />

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -top-[20%] -bottom-[20%] pointer-events-none will-change-transform">
          <img
            ref={bgRef}
            src="/Features_Hero_v2.webp"
            alt=""
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        </div>

        <div className="relative container mx-auto px-4 md:px-8 text-center pt-16">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-gradient-silver mb-5">
            Features
          </p>
          <h1 className="font-display text-4xl font-black md:text-6xl text-foreground tracking-tight">
            Built for What You
            <br />
            <span className="text-gradient">Can't Afford to Lose</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground/80">
            From seed phrase validation to inheritance planning — every feature is designed to protect your most sensitive information with zero compromise.
          </p>
        </div>
      </section>

      {/* Feature Grid */}
      <main>
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="mx-auto max-w-6xl grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sections.map((section) => {
                const accent = accentClasses[section.category];
                return (
                  <div
                    key={section.title}
                    id={section.title.toLowerCase().replace(/\s+/g, "-")}
                    className={`scroll-mt-24 rounded-2xl border ${accent.border} bg-card/20 p-6 md:p-7 flex flex-col transition-all duration-300 hover:bg-card/40`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`inline-flex rounded-xl p-2.5 ${accent.bg}`}>
                        <section.icon className={`h-5 w-5 ${accent.text}`} />
                      </div>
                      {section.desktopOnly && (
                        <span className={`rounded-full px-2.5 py-0.5 font-display text-[10px] font-semibold tracking-wide uppercase ${accent.badge} ${accent.badgeText}`}>
                          Pro · Desktop
                        </span>
                      )}
                    </div>

                    <h2 className="font-display text-xl font-black text-foreground tracking-tight mb-3">
                      {section.title}
                    </h2>

                    <p className="text-sm text-muted-foreground/80 leading-relaxed mb-5">
                      {section.description}
                    </p>

                    <ul className="space-y-2.5 mb-4 flex-1">
                      {section.details.map((detail, j) => (
                        <li key={j} className="flex items-start gap-2.5">
                          <div className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${accent.bg}`}>
                            <Check className={`h-2.5 w-2.5 ${accent.text}`} />
                          </div>
                          <span className="text-sm text-muted-foreground/80">{detail}</span>
                        </li>
                      ))}
                    </ul>

                    {section.technicalDetails && section.technicalDetails.length > 0 && (
                      <TechnicalDetails className="mt-auto">
                        <ul className="space-y-2">
                          {section.technicalDetails.map((td, k) => (
                            <li key={k} className="flex items-start gap-2">
                              <span className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${accent.bg}`} />
                              <span>{td}</span>
                            </li>
                          ))}
                        </ul>
                      </TechnicalDetails>
                    )}

                    {section.desktopOnly && (
                      <p className="mt-3 pt-3 border-t border-border/20 text-xs text-muted-foreground/60 italic">
                        Requires Desktop — see the{" "}
                        <Link to="/shop" className="text-primary hover:underline not-italic">Shop</Link>.
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Desktop CTA Section */}
        <section className="py-20 md:py-28 bg-section-alt">
          <div className="container mx-auto px-4 md:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-gradient-silver mb-4">
                Desktop App
              </p>
              <h2 className="font-display text-4xl font-black md:text-5xl text-foreground tracking-tight mb-6">
                Ready to{" "}
                <span className="text-gradient">Go Pro?</span>
              </h2>
              <p className="text-base text-muted-foreground/80 mb-12 max-w-2xl mx-auto">
                Everything in the free web app, plus smart card integration, an in-app inheritance plan builder,
                code signing, and automatic updates — built natively with Rust and Tauri.
              </p>

              <div className="mb-12 grid gap-4 md:grid-cols-2 overflow-hidden">
                <div className="overflow-hidden rounded-2xl border border-border/30">
                  <img src={appDark} alt="seQRets Desktop — Dark Theme" className="w-full object-cover" />
                </div>
                <div className="overflow-hidden rounded-2xl border border-border/30">
                  <img src={appLight} alt="seQRets Desktop — Light Theme" className="w-full object-cover" />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 text-left mb-12">
                {desktopPerks.map((p) => (
                  <div key={p.label} className="flex items-center gap-3 rounded-2xl border border-border/30 bg-card/20 p-5 transition-all duration-300 hover:bg-card/40">
                    <div className="rounded-lg bg-primary/10 p-2 flex items-center justify-center">
                      <p.icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm text-foreground/80">{p.label}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-7 text-left mb-10">
                <h3 className="font-display text-base font-bold text-foreground mb-2">
                  One-time purchase. No subscription. Yours forever.
                </h3>
                <p className="text-sm text-muted-foreground/80 leading-relaxed">
                  A code-signed desktop app with automatic updates, smart card support, and a portable USB reader — all included. The source code is always free under AGPLv3.
                </p>
              </div>

              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <WaitlistButton
                  source="features-desktop-cta"
                  label="Join the Waitlist"
                  className="inline-flex items-center rounded-md bg-primary px-8 py-3.5 font-display text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
                />
                <Button variant="tertiary" size="lg" className="rounded-md font-display font-semibold" asChild>
                  <a href="https://github.com/seQRets/seQRets-app" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Build from Source
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FeaturesPage;
