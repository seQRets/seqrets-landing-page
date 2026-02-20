import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroLogo from "@/assets/hero-logo.png";
import appScreenshot from "@/assets/app-dark.png";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-[93vh] items-center overflow-hidden pt-16" style={{ backgroundColor: '#2b2a2b' }}>
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px] animate-pulse-glow" />
        <div className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-warm-muted/5 blur-[100px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          {/* Left: Text content */}
          <div className="flex-1 text-center lg:text-left">
            <img src={heroLogo} alt="seQRets logo" className="mx-auto mb-8 h-36 w-auto md:h-48 lg:mx-0" />

            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
              <span className="text-foreground font-black">Your Secrets,</span>
              <br />
              <span className="text-foreground">Split Into</span>
              <br />
              <span className="text-foreground">Unbreakable Pieces</span>
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl lg:mx-0">
              seQRets uses Shamir's Secret Sharing to encrypt and split your most sensitive data into
              multiple QR-coded fragments. No single piece reveals anything — only the right combination
              can reconstruct your secret.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <Button asChild size="lg" className="font-display text-base font-semibold px-8">
                <a href="https://seqrets.app" target="_blank" rel="noopener noreferrer">
                  Try the Free Web App
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="font-display text-base font-semibold px-8 border-border/50"
                asChild
              >
                <a href="#desktop">
                  <Clock className="mr-2 h-4 w-4" />
                  Desktop App — Coming Soon
                </a>
              </Button>
            </div>
          </div>

          {/* Right: Laptop mockup */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[600px]">
              {/* Laptop screen */}
              <div className="rounded-t-xl border border-border/30 bg-[#1a1a1a] p-2 shadow-2xl shadow-black/50">
                {/* Screen bezel top bar */}
                <div className="mb-1 flex items-center gap-1.5 px-2 py-1">
                  <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                  <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
                  <span className="h-2 w-2 rounded-full bg-[#28c840]" />
                </div>
                {/* Screenshot */}
                <img
                  src={appScreenshot}
                  alt="seQRets desktop application showing the Secure Secret interface"
                  className="w-full rounded-sm"
                />
              </div>
              {/* Laptop base */}
              <div className="relative mx-auto h-4 w-[110%] -translate-x-[5%] rounded-b-xl bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] shadow-lg shadow-black/30">
                <div className="absolute left-1/2 top-0 h-1 w-16 -translate-x-1/2 rounded-b-md bg-[#3a3a3a]" />
              </div>
              {/* Glow under laptop */}
              <div className="absolute -bottom-8 left-1/2 h-16 w-3/4 -translate-x-1/2 rounded-full bg-primary/10 blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
