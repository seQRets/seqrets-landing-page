import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Atom, Eye, Lock } from "lucide-react";
import argon2Code from "@/assets/argon2-code.png";

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
  const imageRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        const windowH = window.innerHeight;
        // Progress from 0 (entering viewport) to 1 (leaving viewport)
        const progress = Math.max(0, Math.min(1, 1 - (rect.bottom / (windowH + rect.height))));
        setScrollProgress(progress);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="security" className="relative py-20 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />

      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-14">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground/70 mb-5">
            Security Architecture
          </p>
          <h2 className="font-display text-4xl font-black md:text-6xl text-foreground tracking-tight">
            Encrypt-First,
            <br />
            <span className="text-gradient">Zero-Knowledge</span>
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-base text-muted-foreground/80">
            Your secret is encrypted <em>before</em> it's split. Even if every share were compromised,
            attackers still face military-grade encryption.
          </p>

          <div ref={imageRef} className="mx-auto mt-10 max-w-2xl overflow-hidden rounded-2xl h-[300px] md:h-[400px] relative">
            <img
              src={argon2Code}
              alt="seQRets cryptographic source code showing Argon2id, XChaCha20, and Shamir's Secret Sharing"
              className="w-full object-cover object-top will-change-transform"
              style={{
                transform: `translateY(-${scrollProgress * 60}%)`,
              }}
            />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-background to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent" />
          </div>
        </div>

        <div className="mx-auto max-w-4xl grid gap-4 md:grid-cols-3 mb-16">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="rounded-2xl border border-border/30 bg-card/20 p-7 text-center transition-all duration-500 hover:border-border/60 hover:bg-card/40"
            >
              <div className="mx-auto mb-4 inline-flex rounded-xl bg-primary/10 p-3">
                <tech.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-display text-base font-bold text-foreground">{tech.name}</h3>
              <p className="text-sm text-muted-foreground/80">{tech.description}</p>
            </div>
          ))}
        </div>

        {/* Callouts */}
        <div className="mx-auto max-w-3xl grid gap-4 md:grid-cols-2">
          <div className="flex items-start gap-4 rounded-2xl border border-primary/15 bg-primary/5 p-6">
            <div className="mt-0.5 rounded-lg bg-primary/10 p-2">
              <Atom className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h4 className="font-display text-sm font-bold text-foreground">Quantum Resistant</h4>
              <p className="mt-1 text-sm text-muted-foreground/80">
                Shamir's scheme is information-theoretically secure — no quantum computer can break it.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-2xl border border-primary/15 bg-primary/5 p-6">
            <div className="mt-0.5 rounded-lg bg-primary/10 p-2">
              <Eye className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h4 className="font-display text-sm font-bold text-foreground">Zero Knowledge</h4>
              <p className="mt-1 text-sm text-muted-foreground/80">
                Your secrets never leave your device. No servers, no cloud, no tracking.
              </p>
            </div>
          </div>
        </div>

        {/* More Info Button */}
        <div className="text-center mt-10">
          <Link
            to="/security"
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-6 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-primary/20 hover:border-primary/60"
          >
            More Security Information →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
