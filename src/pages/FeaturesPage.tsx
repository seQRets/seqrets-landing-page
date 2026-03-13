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
  Github,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
  visualLabel: string;
  visualItems: string[];
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
      "Validates all 2,048 BIP-39 English words in real time",
      "Automatic checksum verification catches typos instantly",
      "Supports 12, 15, 18, 21, and 24-word seed phrases",
      "Detects and warns about common transcription errors",
    ],
    visualLabel: "Seed Phrase Validation",
    visualItems: ["goddess  attend  educate  coffee  bean  ···"],
  },
  {
    icon: Shield,
    title: "Secure Any Secret",
    category: "crypto",
    description:
      "Not just crypto. Passwords, API keys, legal documents, account credentials, private notes — if it's sensitive, seQRets can encrypt and split it into shares that no single person can read alone.",
    details: [
      "XChaCha20-Poly1305 authenticated encryption",
      "Argon2id key derivation resists GPU/ASIC brute-force",
      "Zero-knowledge architecture — nothing leaves your device",
      "Works offline — no server, no cloud, no account required",
    ],
    visualLabel: "Encryption Pipeline",
    visualItems: ["Plaintext → Argon2id", "→ XChaCha20-Poly1305", "→ Encrypted Blob", "→ Shamir Split", "→ QR Shares"],
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
    visualLabel: "Share Distribution",
    visualItems: ["Qard 1 → Safe deposit box", "Qard 2 → Family member", "Qard 3 → Home safe", "Qard 4 → Trusted advisor", "Qard 5 → Secure location"],
  },
  {
    icon: CreditCard,
    title: "Smart Card Support",
    category: "smart",
    desktopOnly: true,
    description:
      "Store shares on NFC-enabled smart cards for durable, tamper-evident physical security. Tap your card to back up or restore — no cables, no adapters, no friction.",
    details: [
      "NFC tap-to-read and tap-to-write — instant transfers",
      "Tamper-evident design reveals physical compromise",
      "Survives water, dust, and everyday wear",
      "Portable USB card reader included with bundles",
    ],
    visualLabel: "NFC Workflow",
    visualItems: ["1. Tap card to reader", "2. Authenticate with PIN", "3. Write share to card", "4. Verify written data", "5. Store card securely"],
  },
  {
    icon: Users,
    title: "Inheritance Planning",
    category: "inherit",
    desktopOnly: true,
    description:
      "Distribute shares to trusted family members or advisors. Set thresholds so no single person can access your secrets alone — but the right group can reconstruct them when the time comes.",
    details: [
      "Visual drag-and-drop inheritance plan builder",
      "Custom thresholds: choose how many shares are needed",
      "Assign shares to named recipients with instructions",
      "Generate tamper-evident envelopes for physical distribution",
    ],
    visualLabel: "Threshold Scheme",
    visualItems: ["5 total shares created", "3 required to restore", "2 → Family members", "1 → Safe deposit box", "2 → Trusted advisors"],
  },
  {
    icon: Bot,
    title: "Bob — AI Assistant",
    category: "ai",
    description:
      "Meet Bob, your built-in security guide. Bob helps you understand encryption concepts, plan your secret management strategy, and make informed decisions — without ever seeing your secrets.",
    details: [
      "Explains security concepts in plain language",
      "Suggests optimal share distribution strategies",
      "Helps plan inheritance and recovery scenarios",
      "Runs locally — your questions never leave your device",
    ],
    visualLabel: "Ask Bob",
    visualItems: ["\"How many shares do I need?\"", "\"What's a good threshold?\"", "\"Explain Shamir's scheme\"", "\"Help me plan inheritance\"", "\"Is my setup secure?\""],
  },
];

const desktopPerks = [
  { icon: ShieldCheck, label: "Code-signed binary — installs cleanly on Mac, Windows & Linux" },
  { icon: Zap, label: "Automatic delta updates — security patches delivered instantly" },
  { icon: CreditCard, label: "NFC smart card support — tap to back up or restore" },
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
        description="Explore seQRets features: BIP-39 validation, Shamir's Secret Sharing, QR-coded backups, NFC smart cards, inheritance planning, and Bob the AI assistant."
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

      {/* Feature Sections */}
      <main className="space-y-0">
        {sections.map((section, i) => {
          const accent = accentClasses[section.category];
          const isEven = i % 2 === 0;

          return (
            <section
              key={section.title}
              id={section.title.toLowerCase().replace(/\s+/g, "-")}
              className={`py-16 md:py-24 scroll-mt-24 ${i % 2 === 0 ? "bg-section-alt" : ""}`}
            >
              <div className="container mx-auto px-4 md:px-8">
                <div className={`mx-auto max-w-6xl grid gap-10 md:gap-16 items-center md:grid-cols-2 ${!isEven ? "md:[direction:rtl]" : ""}`}>
                  {/* Visual placeholder */}
                  <div className={`overflow-hidden rounded-xl border ${accent.border} bg-card/30 p-6 md:p-8 md:[direction:ltr]`}>
                    <div className="flex items-center gap-3 mb-5">
                      <div className={`inline-flex rounded-lg p-2 ${accent.bg}`}>
                        <section.icon className={`h-4 w-4 ${accent.text}`} />
                      </div>
                      <span className={`font-display text-xs font-bold uppercase tracking-[0.15em] ${accent.text}`}>
                        {section.visualLabel}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {section.visualItems.map((item, j) => (
                        <div
                          key={j}
                          className="rounded-lg border border-border/20 bg-background/50 px-4 py-2.5 font-mono text-xs text-muted-foreground/70"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:[direction:ltr]">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`inline-flex rounded-xl p-3 ${accent.bg}`}>
                        <section.icon className={`h-5 w-5 ${accent.text}`} />
                      </div>
                      {section.desktopOnly && (
                        <span className={`rounded-full px-3 py-0.5 font-display text-[11px] font-semibold tracking-wide uppercase ${accent.badge} ${accent.badgeText}`}>
                          Pro · Desktop
                        </span>
                      )}
                    </div>

                    <h2 className="font-display text-2xl font-black md:text-3xl text-foreground tracking-tight mb-4">
                      {section.title}
                    </h2>

                    <p className="text-base text-muted-foreground/80 leading-relaxed mb-6">
                      {section.description}
                    </p>

                    <ul className="space-y-3">
                      {section.details.map((detail, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${accent.bg}`}>
                            <Check className={`h-3 w-3 ${accent.text}`} />
                          </div>
                          <span className="text-sm text-muted-foreground/80">{detail}</span>
                        </li>
                      ))}
                    </ul>

                    {section.desktopOnly && (
                      <p className="mt-6 text-sm text-muted-foreground/60 italic">
                        Requires the seQRets Desktop App — available in the{" "}
                        <Link to="/shop" className="text-primary hover:underline">Shop</Link>.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>
          );
        })}

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
                  A code-signed desktop app with automatic updates, NFC smart card support, and a portable USB reader — all included. The source code is always free under AGPLv3.
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
