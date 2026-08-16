import { useState } from "react";
import { Mail, Loader2, Check, Bell, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { joinWaitlist } from "@/lib/waitlist";

interface WaitlistButtonProps {
  source: string;
  label?: string;
  className?: string;
  icon?: "mail" | "bell";
}

/**
 * Reusable waitlist CTA. Click opens an inline email capture popover
 * that posts to the waitlist Worker (falls back to mailto if unconfigured).
 */
const WaitlistButton = ({
  source,
  label = "Join the Waitlist",
  className = "",
  icon = "mail",
}: WaitlistButtonProps) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    // [M-4] Stricter email validation: requires 2+ char TLD, max 254 chars (RFC 5321)
    if (!trimmed || trimmed.length > 254 || !/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(trimmed)) return;

    setSubmitting(true);
    setErrorMsg("");
    const result = await joinWaitlist(trimmed, source);
    setSubmitting(false);

    if (result.ok) {
      setSubmitted(true);
    } else {
      setErrorMsg(result.error || "Something went wrong");
    }
  };

  const IconComponent = icon === "bell" ? Bell : Mail;

  return (
    <div className="relative inline-block">
      <button
        onClick={() => { setOpen(true); setSubmitted(false); setEmail(""); setErrorMsg(""); }}
        className={className}
      >
        <IconComponent className="mr-2 h-4 w-4" />
        {label}
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            {/* Panel */}
            <motion.div
              className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[var(--line,#332C24)] bg-[var(--sf,#251F19)] p-8 shadow-2xl"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {/* Close button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 text-[var(--ink3,#7C7266)] transition-colors hover:text-[var(--ink,#F5F0E8)]"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>

              {submitted ? (
                <div className="text-center py-4">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--goldsoft,#2B2317)]">
                    <Check className="h-6 w-6 text-[var(--gold,#E0A93C)]" />
                  </div>
                  <h3 className="mb-2 font-display text-lg font-bold text-[var(--ink,#F5F0E8)]">You're on the list!</h3>
                  <p className="text-sm text-[var(--ink2,#A59B8F)]">We'll email you as soon as it's available.</p>
                  <button
                    onClick={() => setOpen(false)}
                    className="mt-6 rounded-md bg-[var(--goldsoft,#2B2317)] px-6 py-2 text-sm font-semibold text-[var(--gold,#E0A93C)] transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--goldsoft,#2B2317)]">
                      <Bell className="h-5 w-5 text-[var(--gold,#E0A93C)]" />
                    </div>
                    <h3 className="mb-1 font-display text-xl font-bold text-[var(--ink,#F5F0E8)]">Get Notified</h3>
                    <p className="text-sm text-[var(--ink2,#A59B8F)]">Drop your email and we'll ping you the moment it's available.</p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      maxLength={255}
                      disabled={submitting}
                      className="w-full rounded-md border border-[var(--line,#332C24)] bg-[var(--pg,#14120F)] px-4 py-3 text-sm text-[var(--ink,#F5F0E8)] transition-colors placeholder:text-[var(--ink3,#7C7266)] focus:border-[var(--gold,#E0A93C)] focus:outline-none disabled:opacity-50"
                    />
                    {errorMsg && (
                      <p className="text-xs text-red-400">{errorMsg}</p>
                    )}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[var(--gold,#E0A93C)] px-6 py-3 font-display text-sm font-semibold text-[var(--gold-ink,#1C1C1C)] transition-transform hover:scale-[1.01] disabled:opacity-50"
                    >
                      {submitting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Mail className="h-4 w-4" />
                      )}
                      {submitting ? "Joining..." : "Notify Me"}
                    </button>
                  </form>
                  <button
                    onClick={() => setOpen(false)}
                    className="mt-4 w-full text-center text-xs text-[var(--ink3,#7C7266)] transition-colors hover:text-[var(--ink2,#A59B8F)]"
                  >
                    No thanks
                  </button>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WaitlistButton;
