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

          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Encrypt your seed phrases, passwords, and sensitive documents — then split them into printable QR code shares that you distribute to trusted people and places. Nothing stored online. Runs 100% on your device.
          </p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground/70">
            Desktop app coming soon — smart cards, auto-updates, inheritance planner & more.
            <span className="ml-2 inline-flex items-center gap-1.5 align-middle">
              {/* macOS */}
              <svg className="h-3.5 w-3.5 text-muted-foreground/50" viewBox="0 0 24 24" fill="currentColor" aria-label="macOS"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              {/* Windows */}
              <svg className="h-3.5 w-3.5 text-muted-foreground/50" viewBox="0 0 24 24" fill="currentColor" aria-label="Windows"><path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/></svg>
              {/* Linux */}
              <svg className="h-3.5 w-3.5 text-muted-foreground/50" viewBox="0 0 24 24" fill="currentColor" aria-label="Linux"><path d="M12.504 0c-.155 0-.315.008-.48.021C7.27.403 3.45 5.425 3.45 10.62c0 1.876.51 3.655 1.476 5.101.455 1.017.883 1.933 1.012 2.601.134.682.048 1.109-.35 1.405-.76.557-1.31 1.49-1.31 2.481v.008c0 1.484 1.044 2.782 2.498 2.782.534 0 1.02-.175 1.42-.469.258.204.578.321.913.321h4.776c.335 0 .655-.117.913-.321.4.294.886.469 1.42.469 1.454 0 2.498-1.298 2.498-2.782v-.008c0-.991-.55-1.924-1.31-2.481-.398-.296-.484-.723-.35-1.405.129-.668.557-1.584 1.012-2.601.966-1.446 1.476-3.225 1.476-5.101 0-5.195-3.82-10.217-8.574-10.599A6.77 6.77 0 0012.504 0zm.547 6.812c.148 0 .295.034.43.1.137.068.262.168.362.295.1.127.167.272.196.424a.877.877 0 01-.068.481.878.878 0 01-.285.363.876.876 0 01-.635.184.876.876 0 01-.423-.137.876.876 0 01-.3-.347.877.877 0 01-.086-.459.878.878 0 01.168-.432.878.878 0 01.364-.28.878.878 0 01.277-.192zm-2.338.007c.138 0 .274.033.399.096a.875.875 0 01.316.274.876.876 0 01.157.426.877.877 0 01-.083.457.875.875 0 01-.297.348.875.875 0 01-.42.139.874.874 0 01-.634-.182.874.874 0 01-.285-.362.874.874 0 01-.069-.48.875.875 0 01.195-.424.875.875 0 01.361-.295.874.874 0 01.36-.097z"/></svg>
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
