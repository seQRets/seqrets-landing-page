import { Shield, QrCode, Users, CreditCard, Binary, Bot } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import smartcardGold from "@/assets/smartcard-gold.webp";
import inheritanceImg from "@/assets/screenshot-inheritance.webp";

type Category = "crypto" | "smart" | "inherit" | "ai";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  category: Category;
};

const features: Feature[] = [
  {
    icon: Binary,
    title: "BIP-39 Optimized",
    category: "crypto",
    description: "Purpose-built for cryptocurrency seed phrases and private keys. Validates BIP-39 mnemonics and checksums automatically.",
  },
  {
    icon: Shield,
    title: "Secure Any Secret",
    category: "crypto",
    description: "Not just crypto. Passwords, API keys, legal documents, account credentials — if it's sensitive, seQRets can encrypt and split it.",
  },
  {
    icon: Users,
    title: "Inheritance Planning",
    category: "inherit",
    description: "Distribute shares to trusted family or advisors. Set thresholds so no single person can access alone.",
  },
  {
    icon: CreditCard,
    title: "Smart Card Support",
    category: "smart",
    description: "Store shares on NFC-enabled smart cards for durable, tamper-evident physical security.",
  },
  {
    icon: QrCode,
    title: "QR-Coded Shares",
    category: "smart",
    description: "Each share becomes a scannable QR code (Qard) for easy physical storage and recovery.",
  },
  {
    icon: Bot,
    title: "Bob — AI Assistant",
    category: "ai",
    description: "Built-in AI guide that helps you understand security concepts and plan your secret management strategy.",
  },
];

const accentMap: Record<Category, { bg: string; text: string; border: string; borderHover: string; bgCard: string; bgCardHover: string; badge: string; badgeText: string }> = {
  crypto:  { bg: "bg-accent-crypto/10", text: "text-accent-crypto", border: "border-accent-crypto/30", borderHover: "hover:border-accent-crypto/50", bgCard: "bg-accent-crypto/5", bgCardHover: "hover:bg-accent-crypto/10", badge: "bg-accent-crypto/15", badgeText: "text-accent-crypto" },
  smart:   { bg: "bg-accent-smart/10",  text: "text-accent-smart",  border: "border-accent-smart/30",  borderHover: "hover:border-accent-smart/50",  bgCard: "bg-accent-smart/5",  bgCardHover: "hover:bg-accent-smart/10",  badge: "bg-accent-smart/15",  badgeText: "text-accent-smart" },
  inherit: { bg: "bg-accent-inherit/10", text: "text-accent-inherit", border: "border-accent-inherit/30", borderHover: "hover:border-accent-inherit/50", bgCard: "bg-accent-inherit/5", bgCardHover: "hover:bg-accent-inherit/10", badge: "bg-accent-inherit/15", badgeText: "text-accent-inherit" },
  ai:      { bg: "bg-accent-ai/10",     text: "text-accent-ai",     border: "border-accent-ai/30",     borderHover: "hover:border-accent-ai/50",     bgCard: "bg-accent-ai/5",     bgCardHover: "hover:bg-accent-ai/10",     badge: "bg-accent-ai/15",     badgeText: "text-accent-ai" },
};

const FeaturesGrid = () => {
  return (
    <section id="features" className="relative py-20 md:py-28">
      {/* Subtle top divider */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />

      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-14">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-gradient-silver mb-5">
            Features
          </p>
          <h2 className="font-display text-4xl font-black md:text-6xl text-foreground tracking-tight">
            Built for What You
            <br />
            <span className="text-gradient">Can't Afford to Lose</span>
          </h2>
        </div>

        <div className="mx-auto max-w-5xl grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => {
            const accent = accentMap[f.category];
            const isSpecial = f.title === "Smart Card Support" || f.title === "Inheritance Planning";

            return (
              <div
                key={f.title}
                className={`group rounded-2xl border transition-all duration-500 hover:scale-[1.04] overflow-hidden ${
                  isSpecial
                    ? `${accent.border} ${accent.bgCard} ${accent.borderHover} ${accent.bgCardHover}`
                    : "border-border/30 bg-card/20 hover:border-border/60 hover:bg-card/40"
                }`}
              >
                {f.title === "Smart Card Support" ? (
                  <div className="w-full h-36 overflow-hidden">
                    <img src={smartcardGold} alt="seQRets NFC smart card" className="w-full h-full object-cover object-center" />
                  </div>
                ) : f.title === "Inheritance Planning" ? (
                  <div className="w-full h-36 overflow-hidden">
                    <img src={inheritanceImg} alt="Inheritance Planning" className="w-full h-full object-cover object-top" />
                  </div>
                ) : (
                  <div className="px-8 pt-8">
                    <div className={`mb-5 inline-flex rounded-xl p-3 ${accent.bg}`}>
                      <f.icon className={`h-5 w-5 ${accent.text}`} />
                    </div>
                  </div>
                )}
                <div className={isSpecial ? "px-8 pb-8 pt-5" : "px-8 pb-8"}>
                  <h3 className="mb-2 font-display text-base font-bold text-foreground">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground/80">{f.description}</p>
                  {isSpecial && (
                    <span className={`mt-4 inline-block rounded-full px-3 py-0.5 font-display text-[11px] font-semibold tracking-wide uppercase ${accent.badge} ${accent.badgeText}`}>
                      Pro · Desktop
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
