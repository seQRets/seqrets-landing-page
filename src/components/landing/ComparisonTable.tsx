import { Check, X, Minus } from "lucide-react";

const rows = [
  { feature: "Encrypt & split secrets", web: true, desktop: true },
  { feature: "QR code generation", web: true, desktop: true },
  { feature: "BIP-39 seed phrase support", web: true, desktop: true },
  { feature: "AI assistant (Bob)", web: true, desktop: true },
  { feature: "Open source (AGPLv3)", web: true, desktop: true },
  { feature: "Auto-updates", web: true, desktop: true },
  { feature: "Inheritance plan builder", web: false, desktop: true },
  { feature: "Code-signed binary", web: false, desktop: true },
  { feature: "Smart card (NFC) support", web: false, desktop: true },
  { feature: "Portable USB card reader", web: false, desktop: true },
  { feature: "Offline-first by design", web: "partial", desktop: true },
];

const StatusIcon = ({ value }: { value: boolean | string }) => {
  if (value === true) return <Check className="h-4 w-4 text-primary" />;
  if (value === "partial") return <Minus className="h-4 w-4 text-warm-muted" />;
  return <X className="h-4 w-4 text-muted-foreground/30" />;
};

const ComparisonTable = () => {
  return (
    <section className="relative py-32 md:py-40 bg-section-alt">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />

      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-20">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground/70 mb-5">
            Compare
          </p>
          <h2 className="font-display text-4xl font-black md:text-6xl text-foreground tracking-tight">
            Web App vs Desktop
          </h2>
        </div>

        <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-border/30">
          <div className="grid grid-cols-3 border-b border-border/30 bg-card/30 px-6 py-4">
            <div className="font-display text-xs font-bold uppercase tracking-wider text-muted-foreground/60">Feature</div>
            <div className="text-center font-display text-xs font-bold uppercase tracking-wider text-foreground/80">
              Web App
              <span className="ml-2 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] text-primary normal-case tracking-normal">Free</span>
            </div>
            <div className="text-center font-display text-xs font-bold uppercase tracking-wider text-foreground/80">
              Desktop App
            </div>
          </div>
          {rows.map((row) => (
            <div
              key={row.feature}
              className="grid grid-cols-3 items-center border-b border-border/15 px-6 py-3.5 last:border-0 hover:bg-card/20 transition-colors"
            >
              <span className="text-sm text-foreground/80">{row.feature}</span>
              <div className="flex justify-center">
                <StatusIcon value={row.web} />
              </div>
              <div className="flex justify-center">
                <StatusIcon value={row.desktop} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
