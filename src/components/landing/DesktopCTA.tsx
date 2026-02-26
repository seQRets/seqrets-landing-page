import { Monitor, RefreshCw, CreditCard, Usb, Github, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
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
    <section id="desktop" className="relative py-32 md:py-40">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />

      <div className="container mx-auto px-4 md:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 grid gap-4 md:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-border/30">
              <img src={appDark} alt="seQRets Dark Theme" className="w-full object-cover" />
            </div>
            <div className="overflow-hidden rounded-2xl border border-border/30">
              <img src={appLight} alt="seQRets Light Theme" className="w-full object-cover" />
            </div>
          </div>

          <div className="text-center">
            {/* Coming soon badge */}
            <div className="mx-auto mb-10 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="font-display text-xs font-bold uppercase tracking-wider text-primary">Coming Soon</span>
            </div>

            <h2 className="font-display text-4xl font-black md:text-6xl text-foreground mb-6 tracking-tight">
              The Official
              <br />
              <span className="text-gradient">Desktop App</span>
            </h2>
            <p className="text-base text-muted-foreground/80 mb-12 max-w-2xl mx-auto">
              Everything in the web app, plus smartcard integration, an in-app inheritance plan builder, code signing, and automatic updates — built natively with Rust and Tauri.
            </p>

            <div className="grid gap-3 sm:grid-cols-2 text-left mb-12">
              {perks.map((p) => (
                <div key={p.label} className="flex items-center gap-3 rounded-2xl border border-border/30 bg-card/20 p-5 transition-all duration-300 hover:bg-card/40">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <p.icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm text-foreground/80">{p.label}</span>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-border/30 bg-card/20 p-7 text-left mb-10">
              <h3 className="font-display text-base font-bold text-foreground mb-2">
                "Why pay when it's open source?"
              </h3>
              <p className="text-sm text-muted-foreground/80 leading-relaxed">
                You're paying for convenience — a signed, auto-updating binary with smartcard support and a portable USB reader.
                The code is always free under AGPLv3. You can build it yourself from source anytime.
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                to="/shop"
                className="inline-flex items-center rounded-full bg-primary px-8 py-3.5 font-display text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)]"
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Browse the Shop
              </Link>
              <a
                href="https://github.com/seQRets/seQRets-app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-border/50 bg-card/20 px-8 py-3.5 font-display text-sm font-semibold text-foreground transition-all hover:bg-card/40 hover:border-primary/30"
              >
                <Github className="mr-2 h-4 w-4" />
                Build from Source
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesktopCTA;
