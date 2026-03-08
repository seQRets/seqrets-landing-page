import { Lock, Split, QrCode } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LockAnimation, SplitAnimation, QRCodeAnimation } from "./HowItWorksAnimations";

const steps = [
  {
    icon: Lock,
    title: "Secure",
    animation: LockAnimation,
    description:
      "Your secret is locked with military-grade encryption before anything else happens. Even if a share is intercepted, the data is unreadable without your passphrase. Powered by XChaCha20-Poly1305 + Argon2id.",
  },
  {
    icon: Split,
    title: "Split",
    animation: SplitAnimation,
    description:
      "No single share — and no single person — can reconstruct your secret alone. You choose how many shares to create and how many are needed to recover. Based on Shamir's Secret Sharing, a mathematically unbreakable threshold scheme.",
  },
  {
    icon: QrCode,
    title: "Share",
    animation: QRCodeAnimation,
    description:
      "Print each share as a Qard — a scannable QR code — and store them in different locations, safes, or with trusted people. When the time comes, bring enough shares together to reconstruct the original.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="relative py-20 md:py-28 bg-section-alt">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />

      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-14">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-gradient-silver mb-5">
            How It Works
          </p>
          <h2 className="font-display text-4xl font-black md:text-6xl text-foreground tracking-tight">
            Three Steps to
            <br />
            <span className="text-gradient">Unbreakable Security</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground/80">
            You have secrets that would be devastating to lose — and dangerous in the wrong hands. seQRets ensures no single point of failure can compromise them.
          </p>
        </div>

        <div className="mx-auto max-w-5xl grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="group rounded-2xl border border-border/30 bg-card/20 p-6 transition-all duration-500 hover:border-primary/30 hover:bg-card/40"
            >
              <div className="mb-5 overflow-hidden rounded-xl bg-background/50">
                <step.animation />
              </div>
              <div className="mb-2 font-display text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50">
                Step {i + 1}
              </div>
              <h3 className="mb-3 font-display text-xl font-black text-foreground">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground/80">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 space-y-5">
          <div className="mx-auto max-w-2xl rounded-2xl border border-border/30 bg-card/20 p-6 text-left">
            <p className="text-sm font-semibold text-foreground mb-2">Example</p>
            <p className="text-sm leading-relaxed text-muted-foreground/80">
              Split your Bitcoin seed phrase into 5 Qards. Give 2 to family, put 1 in a safe deposit box, keep 2 at home. Any 3 can reconstruct the original — but no attacker, lawyer, or single heir can access it alone.
            </p>
          </div>
          <div className="text-center">
            <Button variant="tertiary" size="lg" className="rounded-md font-display font-semibold" asChild>
              <Link to="/how-it-works">Learn More →</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
