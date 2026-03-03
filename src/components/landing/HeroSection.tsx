import { ArrowRight, Mail } from "lucide-react";
import heroLogo from "@/assets/hero-logo.png";
import laptopMockup from "@/assets/qr-qards.png";
import heroBg from "@/assets/hero-bg.png";


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

          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Encrypt your seed phrases, passwords, and sensitive documents — then split them into printable QR code shares that you distribute to trusted people and places. Nothing stored online. Runs 100% on your device.
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
              className="inline-flex items-center rounded-full border border-border/50 bg-card/30 px-8 py-3.5 font-display text-sm font-semibold text-foreground transition-all hover:bg-card/60 hover:border-primary/30"
            >
              <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
              Notify Me at Launch
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
