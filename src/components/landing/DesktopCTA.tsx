import { ShieldCheck, Zap, CreditCard, Package, Github } from "lucide-react";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import WaitlistButton from "@/components/WaitlistButton";
import appDark from "@/assets/app-dark.webp";
import appLight from "@/assets/app-light.webp";

const perks = [
  { icon: ShieldCheck, label: "Verified & trusted — installs cleanly on Mac, Windows & Linux" },
  { icon: Zap, label: "Always up to date — security patches delivered automatically" },
  { icon: CreditCard, label: "Tap to back up — store secrets on tamper-proof smart cards" },
  { icon: Package, label: "Everything in the box — smart card & USB reader shipped to you" },
];

const DesktopCTA = () => {
  const screenshotsRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: screenshotsRef,
    offset: ["start end", "center center"],
  });

  const leftX = useTransform(scrollYProgress, [0, 1], [-120, 0]);
  const rightX = useTransform(scrollYProgress, [0, 1], [120, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section id="desktop" className="relative py-24 md:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/8 to-transparent" />

      <div className="container mx-auto px-4 md:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Section label — matches other sections */}
          <div className="mb-10 text-center">
            <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-gradient-silver mb-4">Desktop App</p>
            <h2 className="font-display text-4xl font-black md:text-6xl text-foreground tracking-tight">
              Ready to
              <br />
              <span className="text-gradient">Go Pro?</span>
            </h2>
          </div>

          <div ref={screenshotsRef} className="mb-12 grid gap-4 md:grid-cols-2 overflow-hidden">
            <motion.div
              className="overflow-hidden rounded-2xl border border-border/30"
              style={{ x: leftX, opacity }}
            >
              <img src={appDark} alt="seQRets Dark Theme" className="w-full object-cover" />
            </motion.div>
            <motion.div
              className="overflow-hidden rounded-2xl border border-border/30"
              style={{ x: rightX, opacity }}
            >
              <img src={appLight} alt="seQRets Light Theme" className="w-full object-cover" />
            </motion.div>
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

            <p className="text-base text-muted-foreground/80 mb-12 max-w-2xl mx-auto">
              Everything in the web app, plus smartcard integration, an in-app inheritance plan builder, code signing, and automatic updates — built natively with Rust and Tauri.
            </p>

            <div className="grid gap-3 sm:grid-cols-2 text-left mb-12">
              {perks.map((p) => (
                <div key={p.label} className="flex items-center gap-3 rounded-2xl border border-border/30 bg-card/20 p-5 transition-all duration-300 hover:bg-card/40">
                  <div className="rounded-lg bg-primary/10 p-2 flex items-center justify-center">
                    <p.icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm text-foreground/80">{p.label}</span>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-7 text-left mb-10">
              <h3 className="font-display text-base font-bold text-foreground mb-2">
                One-time purchase. No subscription. Yours forever.
              </h3>
              <p className="text-sm text-muted-foreground/80 leading-relaxed">
                A code-signed desktop app with automatic updates, NFC smart card support, and a portable USB reader — all included. The source code is always free under AGPLv3.
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <WaitlistButton
                source="desktop-cta"
                label="Join the Waitlist"
                className="inline-flex items-center rounded-md bg-primary px-8 py-3.5 font-display text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
              />
              <Button variant="tertiary" size="lg" className="rounded-md font-display font-semibold" asChild>
                <a href="https://github.com/seQRets/seQRets-app" target="_blank" rel="noopener noreferrer">
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
