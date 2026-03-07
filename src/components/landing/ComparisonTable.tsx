import { Check, X, Minus, Mail, Bell } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return;
    window.location.href = `mailto:hello@seqrets.app?subject=Desktop%20App%20Waitlist&body=Please%20add%20me%20to%20the%20waitlist%3A%20${encodeURIComponent(trimmed)}`;
    setSubmitted(true);
  };

  return (
    <section className="relative py-20 md:py-28 bg-section-alt">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />

      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-14">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-gradient-silver mb-5">
            Compare
          </p>
          <h2 className="font-display text-4xl font-black md:text-6xl text-foreground tracking-tight">
            Free Forever.
            <br />
            <span className="text-gradient">Or Go Pro.</span>
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
              <span className="ml-2 rounded-full bg-accent/15 px-2 py-0.5 text-[10px] text-accent normal-case tracking-normal">One-Time Purchase</span>
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

        {/* CTA button */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => { setOpen(true); setSubmitted(false); setEmail(""); }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-7 py-3 font-display text-sm font-semibold text-foreground transition-all hover:bg-primary/25 hover:border-primary/60 hover:shadow-[0_0_24px_hsl(var(--primary)/0.2)]"
          >
            <Bell className="h-4 w-4 text-primary" />
            Let me know when the Desktop App launches!
          </button>
        </div>
      </div>

      {/* Popover / modal */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            {/* Panel */}
            <motion.div
              className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border/40 bg-card p-8 shadow-2xl"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {submitted ? (
                <div className="text-center py-4">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/15">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">You're on the list!</h3>
                  <p className="text-sm text-muted-foreground">We'll email you as soon as the Desktop App launches.</p>
                  <button
                    onClick={() => setOpen(false)}
                    className="mt-6 rounded-full bg-primary/15 px-6 py-2 text-sm font-semibold text-primary hover:bg-primary/25 transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                      <Bell className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-1">Get Notified at Launch</h3>
                    <p className="text-sm text-muted-foreground">Drop your email and we'll ping you the moment the Desktop App is available.</p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      maxLength={255}
                      className="w-full rounded-xl border border-border/50 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
                    />
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-display text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
                    >
                      <Mail className="h-4 w-4" />
                      Notify Me
                    </button>
                  </form>
                  <button
                    onClick={() => setOpen(false)}
                    className="mt-4 w-full text-center text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors"
                  >
                    No thanks
                  </button>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ComparisonTable;
