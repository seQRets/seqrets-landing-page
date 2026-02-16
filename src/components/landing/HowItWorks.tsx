import { Lock, Split, QrCode } from "lucide-react";
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
    <section id="how-it-works" className="relative py-24 md:py-32 bg-section-alt">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <p className="font-display text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground mb-4">
            How It Works
          </p>
          <h2 className="font-display text-4xl font-bold md:text-5xl text-foreground">
            Three Steps to Unbreakable Security
          </h2>
        </div>

        <div className="mx-auto max-w-5xl grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="group relative rounded-xl border border-border/50 bg-card/50 p-8 transition-all duration-300 hover:border-primary/30 hover:bg-card glow-border"
            >
              <div className="mb-6 overflow-hidden rounded-lg">
                <img src={step.image} alt={step.title} className="w-full h-40 object-contain" />
              </div>
              <div className="mb-2 font-display text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                Step {i + 1}
              </div>
              <h3 className="mb-3 font-display text-2xl font-bold text-foreground">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-muted-foreground">
          🔒 Everything runs 100% locally — your secrets never leave your device.
        </p>
      </div>
    </section>
  );
};

export default HowItWorks;
