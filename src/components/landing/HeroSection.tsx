import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroLogo from "@/assets/hero-logo.png";
import laptopMockup from "@/assets/laptop2.png";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden py-24" style={{ backgroundColor: '#2b2a2b' }}>
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
              What happens to your passwords, access codes, account information, and digital assets when you're no longer around? seQRets helps you protect your most sensitive information today — and make sure the right people can access it tomorrow. Nothing stored online. No KYC. No account. Nothing shared with anyone you don't choose.
            </p>

            <div className="mx-auto mt-4 flex items-center gap-3 lg:mx-0">
              <p className="text-base text-muted-foreground">
                Available as a free web-app or an upgraded Pro Desktop version.
              </p>
              <div className="flex items-center gap-2 text-muted-foreground">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/></svg>
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12.504 0c-.155 0-.311.015-.466.04-3.063.54-4.38 3.83-2.73 6.325C10.71 8.446 12.895 9.7 15.293 9.7c.155 0 .311-.015.466-.04 3.062-.54 4.38-3.83 2.73-6.325C17.086 1.254 14.9 0 12.504 0zm-.5 2c1.73 0 3.3.895 4.224 2.352 1.14 1.717.3 3.978-1.74 4.338-.095.017-.19.01-.288.01-1.73 0-3.3-.895-4.224-2.352-1.14-1.717-.3-3.978 1.74-4.338.095-.017.19-.01.288-.01zM8.196 11.049c-.992.063-1.88.546-2.384 1.41L.363 21.147C-.586 22.648.564 24.5 2.326 24.5h14.15c1.058 0 2.033-.594 2.513-1.54l3.56-7.013c.665-1.31-.186-2.874-1.642-3.088l-2.182-.32a3.138 3.138 0 0 0-.462-.034c-1.142 0-2.19.6-2.775 1.578l-2.18 3.64-2.18-3.64C10.543 12.7 9.72 11.81 8.69 11.38c-.16-.063-.325-.1-.494-.131z"/></svg>
              </div>
            </div>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <Button asChild size="lg" className="font-display text-base font-semibold px-8">
                <a href="https://app.seqrets.app" target="_blank" rel="noopener noreferrer">
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
