import { ArrowRight, Mail } from "lucide-react";

import heroLogo from "@/assets/hero-logo.webp";
import laptopMockup from "@/assets/qr-qards.webp";
import heroBg from "@/assets/hero-bg.webp";


const HeroSection = () => {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: "90vh" }}>

      {/* Static background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Two-column layout */}
      <div className="relative z-10 flex w-full flex-col items-center pt-16 lg:flex-row" style={{ minHeight: "90vh" }}>

        {/* Left column — text content */}
        <div className="flex w-full flex-col items-center justify-center px-8 py-16 text-center lg:w-1/2 lg:px-16 xl:px-24">
          <img src={heroLogo} alt="seQRets logo" className="mb-10 h-[112px] w-auto md:h-[151px]" />

          <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground/70 mb-5">
            Encrypt. Split. Share. On Paper or Smart Cards.
          </p>

          <h1 className="font-display text-5xl font-black leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            <span className="text-foreground">Protect What</span>
            <br />
            <span className="text-gradient">Matters Most</span>
          </h1>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg text-left">
            Encrypt your seed phrases, passwords, and sensitive documents — then split them into printable QR code shares that you distribute to trusted people and places. Nothing stored online. Runs 100% on your device.
          </p>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg text-left">
            <strong>Desktop app coming soon</strong> — <span className="text-white font-semibold">a one-time purchase</span> with smart cards, auto-updates, inheritance planner & more. Built for Mac, Win & Linux.
            <span className="ml-2 inline-flex items-center gap-1.5 align-middle">
              {/* macOS */}
              <svg className="h-5 w-5 text-muted-foreground/50" viewBox="0 0 24 24" fill="currentColor" aria-label="macOS"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              {/* Windows */}
              <svg className="h-5 w-5 text-muted-foreground/50" viewBox="0 0 24 24" fill="currentColor" aria-label="Windows"><path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/></svg>
              {/* Linux */}
              <svg className="h-5 w-5 text-muted-foreground/50" viewBox="0 0 24 24" fill="currentColor" aria-label="Linux"><path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139z"/></svg>
            </span>
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row md:items-start">
            <a
              href="https://app.seqrets.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-primary px-8 py-3.5 font-display text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)]"
            >
              Try the Free Web App
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a
              href="mailto:hello@seqrets.app?subject=Desktop%20App%20Waitlist&body=Hi%2C%20please%20notify%20me%20when%20the%20seQRets%20desktop%20app%20launches.%20Thanks!"
              className="inline-flex items-center rounded-full border border-primary/40 bg-primary/15 px-8 py-3.5 font-display text-sm font-semibold text-foreground transition-all hover:bg-primary/25 hover:border-primary/60"
            >
              <Mail className="mr-2 h-4 w-4 text-primary" />
              Join the Desktop Waitlist
            </a>
          </div>
        </div>

        {/* Right column — product images */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center py-16 pr-8 lg:pr-12 relative">
          <img
            src={laptopMockup}
            alt="seQRets QR Qards - printed secret backup cards"
            className="h-auto w-full max-w-[650px] object-contain xl:max-w-[775px]"
          />
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
