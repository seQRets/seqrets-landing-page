import { Lock, Split, QrCode } from "lucide-react";
import { Link } from "react-router-dom";
import stepSecure from "@/assets/step-secure.png";
import stepSplit from "@/assets/step-split.png";
import stepShare from "@/assets/step-share.png";

const steps = [
  {
    icon: Lock,
    title: "Secure",
    image: stepSecure,
    description:
      "Your secret is encrypted locally using military-grade XChaCha20-Poly1305 with a key derived from Argon2id. Nothing leaves your device.",
  },
  {
    icon: Split,
    title: "Split",
    image: stepSplit,
    description:
      "Using Shamir's Secret Sharing, the encrypted secret is mathematically split into multiple shares — each share alone reveals nothing.",
  },
  {
    icon: QrCode,
    title: "Share",
    image: stepShare,
    description:
      "Each share becomes a Qard — a QR code you can print, store on smart cards, or give to trusted people. Reconstruct only when needed.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="relative py-32 md:py-40 bg-section-alt">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />

      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-20">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground/70 mb-5">
            How It Works
          </p>
          <h2 className="font-display text-4xl font-black md:text-6xl text-foreground tracking-tight">
            Three Steps to
            <br />
            <span className="text-gradient">Unbreakable Security</span>
          </h2>
        </div>

        <div className="mx-auto max-w-5xl grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="group rounded-2xl border border-border/30 bg-card/20 p-6 transition-all duration-500 hover:border-primary/30 hover:bg-card/40"
            >
              <div className="mb-5 overflow-hidden rounded-xl bg-background/50">
                <img src={step.image} alt={step.title} className="w-full h-44 object-contain" />
              </div>
              <div className="mb-2 font-display text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50">
                Step {i + 1}
              </div>
              <h3 className="mb-3 font-display text-xl font-black text-foreground">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground/80">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center space-y-5">
          <p className="text-sm text-muted-foreground/60">
            🔒 Everything runs 100% locally — your secrets never leave your device.
          </p>
          <Link
            to="/how-it-works"
            className="inline-flex items-center rounded-full border border-border/50 bg-card/20 px-7 py-3 font-display text-sm font-semibold text-foreground transition-all hover:bg-card/40 hover:border-primary/30"
          >
            Learn More →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
