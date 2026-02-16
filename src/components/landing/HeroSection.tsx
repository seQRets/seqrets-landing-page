import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroLogoLight from "@/assets/hero-logo-light.png";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-[93vh] items-center justify-center overflow-hidden pt-16" style={{ backgroundColor: "#cfccc6" }}>
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/5 blur-[120px] animate-pulse-glow" />
        <div className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-black/5 blur-[100px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center md:px-8">
        <div className="mx-auto max-w-4xl">
          <img src={heroLogoLight} alt="seQRets logo" className="mx-auto mb-8 h-48 w-auto md:h-64" />

          <h1 className="font-display text-5xl font-bold leading-tight tracking-tight md:text-7xl lg:text-8xl">
            <span className="text-[#1a1a1a]">Your Secrets,</span>
            <br />
            <span className="text-[#1a1a1a]">Split Into</span>
            <br />
            <span className="text-[#1a1a1a]">Unbreakable Pieces</span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-[#3a3a3a] md:text-xl">
            seQRets uses Shamir's Secret Sharing to encrypt and split your most sensitive data into
            multiple QR-coded fragments. No single piece reveals anything — only the right combination
            can reconstruct your secret.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="font-display text-base font-semibold px-8 bg-[#1a1a1a] text-[#cfccc6] hover:bg-[#333]">
              <a href="https://seqrets.app" target="_blank" rel="noopener noreferrer">
                Try the Free Web App
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              size="lg"
              className="font-display text-base font-semibold px-8 border-[#1a1a1a] text-[#1a1a1a] bg-transparent hover:bg-[#1a1a1a]/10 border"
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
