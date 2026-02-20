import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroLogo from "@/assets/hero-logo.png";
import laptopMockup from "@/assets/desktop-mockup.png";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden py-32" style={{ backgroundColor: '#2b2a2b' }}>
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px] animate-pulse-glow" />
        <div className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-warm-muted/5 blur-[100px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          {/* Left: Text content */}
          <div className="flex-1 text-center lg:text-left">
            <img src={heroLogo} alt="seQRets logo" className="mx-auto mb-8 h-27 w-auto md:h-36 lg:mx-0" />

            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
              <span className="text-foreground font-black">Protect What</span>
              <br />
              <span className="text-foreground">Matters Most</span>
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl lg:mx-0">
              What happens to your passwords, access codes, account information, and digital assets when you're no longer around? seQRets helps you protect your most sensitive information today — and make sure the right people can access it tomorrow. Nothing stored online. Nothing shared with anyone you don't choose.
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
            <div className="relative w-full max-w-[620px]">
              <img
                src={laptopMockup}
                alt="seQRets desktop application running on a laptop"
                className="w-full drop-shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
              />
              {/* Glow under laptop */}
              <div className="absolute -bottom-6 left-1/2 h-16 w-2/3 -translate-x-1/2 rounded-full bg-primary/8 blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
