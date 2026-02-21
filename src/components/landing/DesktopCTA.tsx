import { Monitor, RefreshCw, CreditCard, Usb, Github, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import appDark from "@/assets/app-dark.png";
import appLight from "@/assets/app-light.png";

const perks = [
  { icon: Monitor, label: "Code-signed binary for macOS, Windows & Linux" },
  { icon: RefreshCw, label: "Automatic updates with delta patching" },
  { icon: CreditCard, label: "NFC smart card reader integration" },
  { icon: Usb, label: "Portable USB card reader included" },
];

const DesktopCTA = () => {
  return (
    <section id="desktop" className="relative py-24 md:py-32 bg-section-warm">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container mx-auto px-4 md:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 grid gap-4 md:grid-cols-2">
            <div className="overflow-hidden rounded-xl border border-border/50">
              <img src={appDark} alt="seQRets Dark Theme" className="w-full object-cover" />
            </div>
            <div className="overflow-hidden rounded-xl border border-border/50">
              <img src={appLight} alt="seQRets Light Theme" className="w-full object-cover" />
            </div>
          </div>

          <div className="text-center">
          {/* Coming soon badge */}
          <div className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="font-display text-sm font-semibold text-primary">Coming Soon</span>
          </div>

          <h2 className="font-display text-4xl font-bold md:text-5xl text-foreground mb-6">
            The Official Desktop App
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Everything in the web app, plus smartcard integration, an in-app inheritance plan builder, code signing, and automatic updates — built natively with Rust and Tauri.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 text-left mb-10">
            {perks.map((p) => (
              <div key={p.label} className="flex items-center gap-3 rounded-lg border border-border/50 bg-card/30 p-4">
                <p.icon className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm text-foreground">{p.label}</span>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-border/50 bg-card/30 p-6 text-left mb-8">
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">
              "Why pay when it's open source?"
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              You're paying for convenience — a signed, auto-updating binary with smartcard support and a portable USB reader.
              The code is always free under AGPLv3. You can build it yourself from source anytime.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="font-display font-semibold px-8" asChild>
              <Link to="/shop">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Browse the Shop
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="font-display font-semibold px-8 border-border/50" asChild>
              <a href="https://github.com/seqrets" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                Build from Source
              </a>
            </Button>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesktopCTA;
