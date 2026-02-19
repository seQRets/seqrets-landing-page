import { Link } from "react-router-dom";
import { Shield, QrCode, Users, CreditCard, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const sections = [
  {
    id: "secure",
    icon: Shield,
    title: "Secure Secrets",
    description:
      "Encrypt any secret — passwords, seed phrases, private keys — using military-grade XChaCha20-Poly1305 with Argon2id key derivation. Everything happens locally on your device.",
    details: [
      "Enter or paste your secret into the app",
      "Set a strong passphrase to protect it",
      "The secret is encrypted instantly on your device",
      "Choose how many Qards (shares) to create and the threshold needed to restore",
    ],
  },
  {
    id: "restore",
    icon: QrCode,
    title: "Restore Secrets",
    description:
      "When you need your secret back, scan the required number of Qards using your device's camera. The app reconstructs and decrypts your secret locally.",
    details: [
      "Open the restore flow and scan your Qards one by one",
      "Once the threshold is met, decryption begins automatically",
      "Enter your passphrase to unlock the secret",
      "Your restored secret is displayed — copy it and clear when done",
    ],
  },
  {
    id: "inheritance",
    icon: Users,
    title: "Inheritance Plans",
    description:
      "Distribute Qards to trusted family members or store them in secure locations. If something happens to you, your loved ones can reconstruct your secrets together.",
    details: [
      "Create a secret with a higher share count (e.g. 5 shares, 3 needed)",
      "Distribute Qards to trusted people or safe locations",
      "Include instructions for your beneficiaries",
      "They combine their Qards to restore access when needed",
    ],
  },
  {
    id: "smartcard",
    icon: CreditCard,
    title: "Smart Card Function",
    description:
      "The Desktop app supports writing Qards directly to NFC smart cards — physical, tamper-evident storage that fits in your wallet. Available exclusively in the Desktop edition.",
    details: [
      "Connect a USB smart card reader to your computer",
      "Write individual Qards to NFC cards with one tap",
      "Cards are portable, durable, and offline by nature",
      "Read cards back anytime to restore your secrets",
    ],
  },
];

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Hero */}
        <div className="container mx-auto px-4 md:px-8 mb-20">
          <Link to="/#how-it-works">
            <Button variant="ghost" size="sm" className="mb-8 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-display text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground mb-4">
              How It Works
            </p>
            <h1 className="font-display text-4xl font-bold md:text-5xl lg:text-6xl text-foreground mb-6">
              A Closer Look at seQRets
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Walk through each feature of the app — from encrypting your first secret to distributing
              smart cards for inheritance planning.
            </p>
          </div>
        </div>

        {/* Sections */}
        <div className="container mx-auto px-4 md:px-8 space-y-24">
          {sections.map((section, i) => {
            const Icon = section.icon;
            const isEven = i % 2 === 0;
            return (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <div className={`mx-auto max-w-6xl grid gap-10 md:gap-16 items-center md:grid-cols-2 ${isEven ? "" : "md:[direction:rtl]"}`}>
                  {/* Screenshot placeholder */}
                  <div className={`${isEven ? "" : "md:[direction:ltr]"}`}>
                    <div className="aspect-video rounded-xl border border-border/50 bg-card/50 flex items-center justify-center overflow-hidden">
                      <div className="text-center p-8">
                        <Icon className="mx-auto h-12 w-12 text-muted-foreground/40 mb-3" />
                        <p className="text-sm text-muted-foreground/60">Screenshot coming soon</p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`${isEven ? "" : "md:[direction:ltr]"}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-display text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                        Step {i + 1}
                      </span>
                    </div>
                    <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                      {section.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {section.description}
                    </p>
                    <ul className="space-y-3">
                      {section.details.map((detail, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                            {j + 1}
                          </span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="container mx-auto px-4 md:px-8 mt-24 text-center">
          <a href="https://seqrets.app" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="font-display font-semibold">
              Try the Free Web App →
            </Button>
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorksPage;
