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
    <section id="features" className="py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <p className="font-display text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Features
          </p>
          <h2 className="font-display text-4xl font-bold md:text-5xl text-foreground">
            Everything You Need to Protect What Matters
          </h2>
        </div>

        <div className="mx-auto max-w-6xl grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-border/50 bg-card/30 p-6 transition-all duration-300 hover:border-primary/20 hover:bg-card/60"
            >
              <f.icon className="mb-4 h-6 w-6 text-primary" />
              <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{f.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
