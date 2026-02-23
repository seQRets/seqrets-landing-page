import { useEffect, useRef, useState } from "react";
import { ArrowRight, Clock } from "lucide-react";
import heroLogo from "@/assets/hero-logo.png";
import laptopMockup from "@/assets/laptop2.png";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        // Only update while the hero is visible
        if (rect.bottom > 0) {
          setScrollY(window.scrollY);
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Full-bleed background with laptop — parallax */}
      <div className="absolute inset-0 flex items-end justify-center">
        <img
          src={laptopMockup}
          alt="seQRets desktop application running on a laptop"
          className="w-[85%] max-w-[900px] object-contain will-change-transform"
          style={{
            transform: `translateY(calc(15% - ${scrollY * 0.35}px)) scale(${1 + scrollY * 0.0002})`,
            opacity: Math.min(scrollY * 0.001, 0.65),
          }}
        />
        {/* Gradient overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/6 blur-[150px]" />
        <div className="absolute right-1/3 bottom-1/3 h-[300px] w-[300px] rounded-full bg-warm-muted/5 blur-[120px]" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 pt-24 pb-32 text-center md:px-8">
        <img src={heroLogo} alt="seQRets logo" className="mx-auto mb-10 h-20 w-auto md:h-28" />

        <h1 className="font-display text-5xl font-black leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
          <span className="text-foreground">Protect What</span>
          <br />
          <span className="text-gradient">Matters Most</span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          What happens to your passwords, access codes, account information, and digital assets when you're no longer around? seQRets helps you protect your most sensitive information today — and make sure the right people can access it tomorrow. Nothing stored online. No KYC. No account. Nothing shared with anyone you don't choose.
        </p>

        <div className="mx-auto mt-4 flex items-center justify-center gap-3">
          <p className="text-sm text-muted-foreground/70">
            Available as a free web-app or an upgraded Pro Desktop version.
          </p>
          <div className="flex items-center gap-2 text-muted-foreground/50">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/></svg>
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12.504 0c-.155 0-.311.015-.466.04-3.063.54-4.38 3.83-2.73 6.325C10.71 8.446 12.895 9.7 15.293 9.7c.155 0 .311-.015.466-.04 3.062-.54 4.38-3.83 2.73-6.325C17.086 1.254 14.9 0 12.504 0zm-.5 2c1.73 0 3.3.895 4.224 2.352 1.14 1.717.3 3.978-1.74 4.338-.095.017-.19.01-.288.01-1.73 0-3.3-.895-4.224-2.352-1.14-1.717-.3-3.978 1.74-4.338.095-.017.19-.01.288-.01zM8.196 11.049c-.992.063-1.88.546-2.384 1.41L.363 21.147C-.586 22.648.564 24.5 2.326 24.5h14.15c1.058 0 2.033-.594 2.513-1.54l3.56-7.013c.665-1.31-.186-2.874-1.642-3.088l-2.182-.32a3.138 3.138 0 0 0-.462-.034c-1.142 0-2.19.6-2.775 1.578l-2.18 3.64-2.18-3.64C10.543 12.7 9.72 11.81 8.69 11.38c-.16-.063-.325-.1-.494-.131z"/></svg>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
            href="#desktop"
            className="inline-flex items-center rounded-full border border-border/50 bg-card/30 px-8 py-3.5 font-display text-sm font-semibold text-foreground transition-all hover:bg-card/60 hover:border-primary/30"
          >
            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
            Desktop App — Coming Soon
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
