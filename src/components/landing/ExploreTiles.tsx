import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Users, AlertTriangle, Lock, HelpCircle, BookOpen } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Tile = {
  icon: LucideIcon;
  title: string;
  description: string;
  to: string;
  accent: string;
};

const tiles: Tile[] = [
  {
    icon: Users,
    title: "Inheritance Guide",
    description: "Crypto inheritance with Shamir splits, beneficiaries, and incapacitation planning.",
    to: "/docs/inheritance",
    accent: "text-accent-inherit",
  },
  {
    icon: Shield,
    title: "Technical Docs",
    description: "Cryptographic primitives, architecture, key derivation, and keyfile support.",
    to: "/docs/technical",
    accent: "text-primary",
  },
  {
    icon: AlertTriangle,
    title: "Threat Model",
    description: "What seQRets protects against — and honest limitations.",
    to: "/docs/threat-model",
    accent: "text-accent-crypto",
  },
  {
    icon: Lock,
    title: "Security Deep Dive",
    description: "Full security architecture, zero-knowledge design, and web vs. desktop comparison.",
    to: "/security",
    accent: "text-accent-smart",
  },
  {
    icon: HelpCircle,
    title: "FAQ",
    description: "Common questions, troubleshooting, keyfiles, and quick answers.",
    to: "/docs/faq",
    accent: "text-accent-ai",
  },
  {
    icon: BookOpen,
    title: "Blog",
    description: "Security insights, product updates, and guides for protecting your secrets.",
    to: "/blog",
    accent: "text-accent-inherit",
  },
];

const ExploreTiles = () => (
  <section className="relative py-24 md:py-36 overflow-hidden">
    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/8 to-transparent" />

    <div className="container mx-auto px-4 md:px-8">
      <div className="text-center mb-14">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.35em] text-gradient-silver mb-5">
          Explore
        </p>
        <h2 className="font-display text-4xl font-black md:text-6xl text-foreground tracking-tight">
          Go Deeper into
          <br />
          <span className="text-gradient">seQRets</span>
        </h2>
      </div>

      <div className="mx-auto max-w-5xl grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((tile, i) => (
          <motion.div
            key={tile.to}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
          >
            <Link
              to={tile.to}
              className="group block rounded-2xl border border-border/30 bg-card/20 p-6 transition-all duration-500 hover:scale-[1.04] hover:border-border/60 hover:bg-card/40"
            >
              <div className="inline-flex rounded-xl bg-primary/10 p-3 mb-4">
                <tile.icon className={`h-5 w-5 ${tile.accent}`} />
              </div>
              <h3 className="font-display text-base font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors">
                {tile.title}
              </h3>
              <p className="text-sm text-muted-foreground/70 leading-relaxed">
                {tile.description}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ExploreTiles;
