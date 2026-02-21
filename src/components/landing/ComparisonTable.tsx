import { Check, X, Minus } from "lucide-react";

const rows = [
  { feature: "Encrypt & split secrets", web: true, desktop: true },
  { feature: "QR code generation", web: true, desktop: true },
  { feature: "BIP-39 seed phrase support", web: true, desktop: true },
  { feature: "AI assistant (Bob)", web: true, desktop: true },
  { feature: "Open source (AGPLv3)", web: true, desktop: true },
  { feature: "Auto-updates", web: true, desktop: true },
  { feature: "Inheritance planning", web: false, desktop: true },
  { feature: "Code-signed binary", web: false, desktop: true },
  { feature: "Smart card (NFC) support", web: false, desktop: true },
  { feature: "Portable USB card reader", web: false, desktop: true },
  { feature: "Offline-first by design", web: "partial", desktop: true },
];

const StatusIcon = ({ value }: { value: boolean | string }) => {
  if (value === true) return <Check className="h-5 w-5 text-primary" />;
  if (value === "partial") return <Minus className="h-5 w-5 text-warm-muted" />;
  return <X className="h-5 w-5 text-muted-foreground/40" />;
};

const ComparisonTable = () => {
  return (
    <section className="py-24 md:py-32 bg-warm-surface">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <p className="font-display text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Compare
          </p>
          <h2 className="font-display text-4xl font-bold md:text-5xl text-foreground">
            Web App vs Desktop
          </h2>
        </div>

        <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-border/50">
          <div className="grid grid-cols-3 border-b border-border/50 bg-card/60 px-6 py-4">
            <div className="font-display text-sm font-semibold text-muted-foreground">Feature</div>
            <div className="text-center font-display text-sm font-semibold text-foreground">
              Web App
              <span className="ml-2 rounded-full bg-primary/20 px-2 py-0.5 text-xs text-primary">Free</span>
            </div>
            <div className="text-center font-display text-sm font-semibold text-foreground">
              Desktop App
            </div>
          </div>
          {rows.map((row) => (
            <div
              key={row.feature}
              className="grid grid-cols-3 items-center border-b border-border/30 px-6 py-3 last:border-0 hover:bg-card/30 transition-colors"
            >
              <span className="text-sm text-foreground">{row.feature}</span>
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
