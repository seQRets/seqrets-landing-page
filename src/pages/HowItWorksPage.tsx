import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Shield, QrCode, Users, CreditCard, MessageSquare, X, LifeBuoy } from "lucide-react";
import screenshotRestore from "@/assets/screenshot-restore.webp";
import screenshotBob from "@/assets/screenshot-bob.webp";
import screenshotSecure from "@/assets/screenshot-secure.webp";
import screenshotSmartcard from "@/assets/screenshot-smartcard.webp";
const screenshotInheritance = "/inherit.webp";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import PageHead from "@/components/PageHead";

const sections = [
  {
    id: "secure",
    screenshot: screenshotSecure,
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
    screenshot: screenshotRestore,
    icon: QrCode,
    title: "Restore Secrets",
    description:
      "When you need your secret back, scan the required number of Qards using your device's camera. The app reconstructs and decrypts your secret locally.",
    details: [
      "Open the restore flow and scan your Qards one by one",
      "Once the threshold is met, decryption begins automatically",
      "Enter your passphrase to unlock the secret",
      "Your restored secret is displayed — copy it and clear when done (clipboard auto-clears after 60 seconds)",
      "For BIP-39 seed phrases, a QR reveal dialog offers a SeedQR tab (default) for direct hardware-wallet import — blur-by-default, view-only, with a BIP-32 master fingerprint shown beneath so you can verify the scan against your hardware wallet",
    ],
  },
  {
    id: "inheritance",
    screenshot: screenshotInheritance,
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
    screenshot: screenshotSmartcard,
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
  {
    id: "bob-ai",
    screenshot: screenshotBob,
    icon: MessageSquare,
    title: "Ask Bob AI Assistant",
    description:
      "Bob AI Assistant — Google Gemini-powered AI for application and inheritance setup guidance and questions (optional, user-provided API key). Can be disconnected at any time by removing the API key from within the chat interface.",
    details: [
      "Open the Bob AI chat from within the app",
      "Enter your own Google Gemini API key to activate",
      "Ask questions about secrets, inheritance plans, or app features",
      "Remove your API key anytime to disconnect the assistant",
    ],
  },
];

const HowItWorksPage = () => {
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PageHead
        title="How It Works"
        description="See how seQRets encrypts your secrets, splits them into QR-coded shares, and distributes them to your heirs using Shamir's Secret Sharing. Includes seQRets Recover — an open-source recovery tool for long-term independence."
        path="/how-it-works"
      />
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Hero */}
        <div className="container mx-auto px-4 md:px-8 mb-20">
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
                    <div
                      className={`aspect-video rounded-xl border border-border/50 bg-card/50 flex items-center justify-center overflow-hidden ${section.screenshot ? "cursor-pointer transition-transform hover:scale-[1.02]" : ""}`}
                      onClick={() => section.screenshot && setLightbox(section.screenshot)}
                    >
                      {section.screenshot ? (
                        <img src={section.screenshot} alt={section.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-center p-8">
                          <Icon className="mx-auto h-12 w-12 text-muted-foreground/40 mb-3" />
                          <p className="text-sm text-muted-foreground/60">Screenshot coming soon</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`${isEven ? "" : "md:[direction:ltr]"}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-display text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                        Feature
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

        {/* seQRets Recover — Independent Recovery Tool */}
        <div className="container mx-auto px-4 md:px-8 mt-24">
          <div className="mx-auto max-w-4xl rounded-2xl border border-border/50 bg-card/40 p-8 md:p-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                <LifeBuoy className="h-5 w-5 text-primary" />
              </div>
              <span className="font-display text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                Open-Source Recovery Tool
              </span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              seQRets Recover
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong className="text-foreground">seQRets Recover</strong> is a
              separate, single-file recovery tool for the seQRets share format.
              One HTML file, ~200 lines of TypeScript, no install, no network.
              Open it in any modern browser, paste your Qards in, enter your
              password, and your secret comes back. It uses the same audited
              cryptographic primitives as the main app (XChaCha20-Poly1305,
              Argon2id, Shamir's Secret Sharing).
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Save a copy of{" "}
              <code className="text-xs bg-background/60 border border-border/40 rounded px-1.5 py-0.5 text-foreground">
                recover.html
              </code>{" "}
              alongside your Qards. Anyone holding the threshold of Qards plus
              the password can recover the secret with nothing but a web browser
              — no installation, no account, no dependency on this project still
              being around. It's a quiet architectural guarantee: the share
              format is open, and a reference implementation lives in its own
              repo with its own release chain.
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              <Link
                to="/recover"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
              >
                Get the Recovery Tool →
              </Link>
              <a
                href="https://github.com/seQRets/seQRets-Recover"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border/60 bg-background/40 px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-card/60"
              >
                View source on GitHub →
              </a>
            </div>

            <div className="rounded-lg border border-border/30 bg-background/40 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 mb-2">
                Verify your download
              </p>
              <p className="text-sm text-muted-foreground/80 mb-2">
                Every release publishes a SHA-256 hash so you can verify a copy
                received through an untrusted channel before using it with real
                credentials.
              </p>
              <code className="block text-xs bg-background/60 border border-border/40 rounded px-3 py-2 text-muted-foreground/90 font-mono overflow-x-auto">
                shasum -a 256 recover.html
              </code>
              <p className="text-xs text-muted-foreground/60 mt-2">
                Compare against the hash published on the{" "}
                <a
                  href="https://github.com/seQRets/seQRets-Recover/releases/latest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  latest release page
                </a>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="container mx-auto px-4 md:px-8 mt-24 text-center">
          <Link to="/shop">
            <Button size="lg" className="font-display font-semibold">
              Browse the Shop →
            </Button>
          </Link>
        </div>
      </main>
      <Footer />

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 cursor-pointer"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X className="h-8 w-8" />
          </button>
          <img
            src={lightbox}
            alt="Screenshot enlarged"
            className="max-w-full max-h-[90vh] rounded-xl shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default HowItWorksPage;
