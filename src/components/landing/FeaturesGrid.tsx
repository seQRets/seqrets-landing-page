import { Shield, QrCode, Users, CreditCard, Binary, Bot } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Secure Any Secret",
    description: "Passwords, seed phrases, private keys, documents — encrypt and split anything sensitive.",
  },
  {
    icon: QrCode,
    title: "QR-Coded Shares",
    description: "Each share becomes a scannable QR code (Qard) for easy physical storage and recovery.",
  },
  {
    icon: Users,
    title: "Inheritance Planning",
    description: "Distribute shares to trusted family or advisors. Set thresholds so no single person can access alone.",
  },
  {
    icon: CreditCard,
    title: "Smart Card Support",
    description: "Store shares on NFC-enabled smart cards for durable, tamper-evident physical security.",
  },
  {
    icon: Binary,
    title: "BIP-39 Optimized",
    description: "Special handling for cryptocurrency seed phrases with built-in mnemonic validation and checksums.",
  },
  {
    icon: Bot,
    title: "Bob — AI Assistant",
    description: "Built-in AI guide that helps you understand security concepts and plan your secret management strategy.",
  },
];

const FeaturesGrid = () => {
  return (
    <section id="features" className="relative py-32 md:py-40">
      {/* Subtle top divider */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />

      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-20">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground/70 mb-5">
            Features
          </p>
          <h2 className="font-display text-4xl font-black md:text-6xl text-foreground tracking-tight">
            Powerful Tools,
            <br />
            <span className="text-gradient">Zero Compromise</span>
          </h2>
        </div>

        <div className="mx-auto max-w-5xl grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className={`group rounded-2xl border p-8 transition-all duration-500 ${
                f.title === "Smart Card Support"
                  ? "border-primary/30 bg-primary/5 hover:border-primary/50 hover:bg-primary/10"
                  : "border-border/30 bg-card/20 hover:border-border/60 hover:bg-card/40"
              }`}
            >
              <div className="mb-5 inline-flex rounded-xl bg-primary/10 p-3">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-2 font-display text-base font-bold text-foreground">{f.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground/80">{f.description}</p>
              {f.title === "Smart Card Support" && (
                <span className="mt-4 inline-block rounded-full bg-primary/15 px-3 py-0.5 font-display text-[11px] font-semibold text-primary tracking-wide uppercase">
                  Desktop Exclusive
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
