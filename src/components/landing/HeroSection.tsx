import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroLogo from "@/assets/hero-logo.png";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-[93vh] items-center justify-center overflow-hidden pt-16" style={{ backgroundColor: '#2b2a2b' }}>
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px] animate-pulse-glow" />
        <div className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-warm-muted/5 blur-[100px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center md:px-8">
        <div className="mx-auto max-w-4xl">
          <img src={heroLogo} alt="seQRets logo" className="mx-auto mb-8 h-48 w-auto md:h-64" />

          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
            <span className="text-foreground font-black">Your Secrets,</span>
            <br />
            <span className="text-foreground">Split Into</span>
            <br />
            <span className="text-foreground">Unbreakable Pieces</span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            seQRets uses Shamir's Secret Sharing to encrypt and split your most sensitive data into
            multiple QR-coded fragments. No single piece reveals anything — only the right combination
            can reconstruct your secret.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
      </div>
    </section>
  );
};

export default HeroSection;
