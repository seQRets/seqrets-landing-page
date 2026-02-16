import { ShieldCheck, Atom, Eye, Lock } from "lucide-react";

const techStack = [
  {
    icon: Lock,
    name: "Argon2id",
    description: "Memory-hard key derivation resistant to GPU/ASIC attacks",
  },
  {
    icon: ShieldCheck,
    name: "XChaCha20-Poly1305",
    description: "Authenticated encryption with extended nonces for maximum security",
  },
  {
    icon: Atom,
    name: "Shamir's Secret Sharing",
    description: "Information-theoretically secure threshold scheme — mathematically unbreakable",
  },
];

const SecuritySection = () => {
  return (
    <section id="security" className="relative py-24 md:py-32 bg-section-alt">
      {/* Subtle divider glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <p className="font-display text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Security Architecture
          </p>
          <h2 className="font-display text-4xl font-bold md:text-5xl text-foreground">
            Encrypt-First, Zero-Knowledge
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Your secret is encrypted <em>before</em> it's split. Even if every share were compromised,
            attackers still face military-grade encryption.
          </p>
        </div>

        <div className="mx-auto max-w-4xl grid gap-6 md:grid-cols-3 mb-12">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="rounded-xl border border-border/50 bg-card/50 p-6 text-center glow-border"
            >
              <tech.icon className="mx-auto mb-4 h-8 w-8 text-primary" />
              <h3 className="mb-2 font-display text-lg font-bold text-foreground">{tech.name}</h3>
              <p className="text-sm text-muted-foreground">{tech.description}</p>
            </div>
          ))}
        </div>

        {/* Callouts */}
        <div className="mx-auto max-w-3xl grid gap-4 md:grid-cols-2">
          <div className="flex items-start gap-4 rounded-lg border border-primary/20 bg-primary/5 p-5">
            <Atom className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <h4 className="font-display font-semibold text-foreground">Quantum Resistant</h4>
              <p className="mt-1 text-sm text-muted-foreground">
                Shamir's scheme is information-theoretically secure — no quantum computer can break it.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-lg border border-primary/20 bg-primary/5 p-5">
            <Eye className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <h4 className="font-display font-semibold text-foreground">Zero Knowledge</h4>
              <p className="mt-1 text-sm text-muted-foreground">
                Your secrets never leave your device. No servers, no cloud, no tracking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
