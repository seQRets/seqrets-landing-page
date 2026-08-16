import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, QrCode, Users, CreditCard, MessageSquare, X, LifeBuoy, ArrowUpRight } from "lucide-react";
import screenshotRestore from "@/assets/screenshot-restore.webp";
import screenshotBob from "@/assets/screenshot-bob.webp";
import screenshotSecure from "@/assets/screenshot-secure.webp";
import screenshotSmartcard from "@/assets/screenshot-smartcard.webp";
const screenshotInheritance = "/inherit.webp";
import PageHead from "@/components/PageHead";
import { PreviewPage, rise } from "@/components/preview/PreviewChrome";

/* ------------------------------------------------------------------ *
 * /how-it-works — first interior page moved onto the redesign.
 *
 * All chrome and theming comes from PreviewPage, so this file only
 * describes its own content. Colours are palette tokens rather than the
 * old shadcn semantic classes, which is what gives the page a light
 * theme: the previous version was dark-only because bg-background and
 * text-muted-foreground resolve to a single fixed palette.
 *
 * Two Tailwind traps this file has to avoid, both of which fail silently:
 *   - an arbitrary box-shadow wrapping a CSS var parses as a shadow COLOUR,
 *     so box-shadow computes to none. It needs the explicit shadow: prefix,
 *     as written on the cards below.
 *   - an opacity modifier applied to a var() colour computes to transparent.
 *     Translucent values need their own token, hence --gold-fill.
 * ------------------------------------------------------------------ */

const sections = [
  {
    id: "secure",
    screenshot: screenshotSecure,
    icon: Shield,
    title: "Secure Secrets",
    description:
      "Encrypt any secret — passwords, seed phrases, private keys — using military-grade XChaCha20-Poly1305 with Argon2id key derivation. Everything happens locally on your device.",
    details: [
      "Enter or paste your secret into the app",
      "Set a strong passphrase to protect it",
      "The secret is encrypted instantly on your device",
      "Choose how many Qards (shares) to create and the threshold needed to restore",
    ],
  },
  {
    id: "restore",
    screenshot: screenshotRestore,
    icon: QrCode,
    title: "Restore Secrets",
    description:
      "When you need your secret back, scan the required number of Qards using your device's camera. The app reconstructs and decrypts your secret locally.",
    details: [
      "Open the restore flow and scan your Qards one by one",
      "(v1.11+ Qards) The app shows a per-set live countdown — \"Set [ID] — 2 of 3 added · 1 more Qard required\" — so heirs always know how many remain, even decades later when they may not remember the threshold",
      "Once the threshold is met, decryption begins automatically",
      "Enter your passphrase to unlock the secret",
      "Your restored secret is displayed — copy it and clear when done (clipboard auto-clears after 60 seconds)",
      "For BIP-39 seed phrases, a QR reveal dialog offers a SeedQR tab (default) for direct hardware-wallet import — blur-by-default, view-only, with a BIP-32 master fingerprint shown beneath so you can verify the scan against your hardware wallet",
    ],
  },
  {
    id: "inheritance",
    screenshot: screenshotInheritance,
    icon: Users,
    title: "Inheritance Plans",
    description:
      "Distribute Qards to trusted family members or store them in secure locations. If something happens to you, your loved ones can reconstruct your secrets together.",
    details: [
      "Create a secret with a higher share count (e.g. 5 shares, 3 needed)",
      "Distribute Qards to trusted people or safe locations",
      "Include instructions for your beneficiaries",
      "They combine their Qards to restore access when needed",
    ],
  },
  {
    id: "smartcard",
    screenshot: screenshotSmartcard,
    icon: CreditCard,
    title: "Smart Card Function",
    description:
      "The Desktop app supports writing Qards directly to JCOP smart cards — physical, tamper-evident storage that fits in your wallet. Available exclusively in the Desktop edition.",
    details: [
      "Connect a USB smart card reader to your computer",
      "Write individual Qards to a card over the reader (contact mode)",
      "Cards are portable, durable, and offline by nature",
      "Read cards back anytime to restore your secrets",
    ],
  },
  {
    id: "bob-ai",
    screenshot: screenshotBob,
    icon: MessageSquare,
    title: "Ask Bob AI Assistant",
    description:
      "Bob AI Assistant — Google Gemini-powered AI for application and inheritance setup guidance and questions (optional, user-provided API key). Can be disconnected at any time by removing the API key from within the chat interface.",
    details: [
      "Open the Bob AI chat from within the app",
      "Enter your own Google Gemini API key to activate",
      "Ask questions about secrets, inheritance plans, or app features",
      "Remove your API key anytime to disconnect the assistant",
    ],
  },
];

const HowItWorksPage = () => {
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PreviewPage>
      <PageHead
        title="How It Works"
        description="See how seQRets encrypts your secrets, splits them into QR-coded shares, and distributes them to your heirs using Shamir's Secret Sharing. Includes seQRets Recover — an open-source recovery tool for long-term independence."
        path="/how-it-works"
      />

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 pb-16 pt-16 md:pt-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 h-[420px] w-[46%] opacity-[.55]"
          style={{ background: "radial-gradient(60% 55% at 70% 30%, var(--goldsoft), transparent)" }}
        />
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-3xl text-center"
        >
          <p className="font-display text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--gold)]">
            A closer look
          </p>
          <h1 className="mt-4 font-display text-[38px] font-bold leading-[1.1] tracking-[-0.035em] sm:text-[46px] md:text-[54px]">
            Every part of the app, one at a time.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[15.5px] leading-[1.7] text-[var(--ink2)]">
            From encrypting your first secret to writing Qards onto smart cards
            for the people who will need them.
          </p>
        </motion.div>
      </section>

      {/* ── Feature walkthrough ─────────────────────────────── */}
      <div className="space-y-24 px-6 pb-8 md:space-y-28">
        {sections.map((section, i) => {
          const Icon = section.icon;
          const isEven = i % 2 === 0;
          return (
            <motion.section
              key={section.id}
              id={section.id}
              {...rise}
              className="mx-auto grid max-w-6xl scroll-mt-24 items-center gap-10 md:grid-cols-2 md:gap-16"
            >
              {/* Screenshot */}
              <div className={isEven ? "" : "md:order-2"}>
                <button
                  type="button"
                  onClick={() => setLightbox(section.screenshot)}
                  aria-label={`Enlarge the ${section.title} screenshot`}
                  className="block w-full overflow-hidden rounded-[18px] border border-[var(--line)] bg-[var(--sf)] shadow-[shadow:var(--shadow)] transition-transform hover:scale-[1.02]"
                >
                  <img
                    src={section.screenshot}
                    alt={`The ${section.title} screen in the seQRets app`}
                    className="aspect-video w-full object-cover"
                  />
                </button>
              </div>

              {/* Content */}
              <div className={isEven ? "" : "md:order-1"}>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[var(--gold-fill)]">
                    <Icon className="h-5 w-5 text-[var(--gold)]" strokeWidth={1.8} />
                  </span>
                  <span className="font-display text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--ink3)]">
                    Feature {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h2 className="mt-5 font-display text-[27px] font-bold leading-[1.2] tracking-[-0.03em] md:text-[32px]">
                  {section.title}
                </h2>
                <p className="mt-3.5 text-[15px] leading-[1.7] text-[var(--ink2)]">
                  {section.description}
                </p>

                <ul className="mt-7 space-y-3.5">
                  {section.details.map((detail, j) => (
                    <li key={j} className="flex items-start gap-3.5">
                      <span className="mt-px flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--gold-fill)] font-display text-[12px] font-bold text-[var(--gold)]">
                        {j + 1}
                      </span>
                      <span className="text-[14px] leading-[1.65] text-[var(--ink2)]">
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.section>
          );
        })}
      </div>

      {/* ── seQRets Recover ─────────────────────────────────── */}
      <section className="px-6 py-24">
        <motion.div
          {...rise}
          className="mx-auto max-w-4xl rounded-[26px] border border-[var(--card-line)] bg-[var(--sf)] p-8 shadow-[shadow:var(--shadow-card)] md:p-12"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[var(--gold-fill)]">
              <LifeBuoy className="h-5 w-5 text-[var(--gold)]" strokeWidth={1.8} />
            </span>
            <span className="font-display text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--ink3)]">
              Open-source recovery tool
            </span>
          </div>

          <h2 className="mt-5 font-display text-[27px] font-bold leading-[1.2] tracking-[-0.03em] md:text-[32px]">
            seQRets Recover
          </h2>

          <p className="mt-4 text-[15px] leading-[1.7] text-[var(--ink2)]">
            <strong className="font-semibold text-[var(--ink)]">seQRets Recover</strong>{" "}
            is a separate, single-file recovery tool for the seQRets share
            format. One HTML file with a ~400-line crypto core, no install, no
            network. Open it in any modern browser, paste your Qards in, enter
            your password, and your secret comes back. It uses the same
            cryptographic primitives as the main app (XChaCha20-Poly1305,
            Argon2id, Shamir&rsquo;s Secret Sharing).
          </p>

          <p className="mt-4 text-[15px] leading-[1.7] text-[var(--ink2)]">
            Save a copy of{" "}
            <code className="rounded border border-[var(--line)] bg-[var(--pg)] px-1.5 py-0.5 font-mono text-[13px] text-[var(--ink)]">
              recover.html
            </code>{" "}
            alongside your Qards. Anyone holding the threshold of Qards plus the
            password can recover the secret with nothing but a web browser — no
            installation, no account, no dependency on this project still being
            around. The share format is open, and a reference implementation
            lives in its own repo with its own release chain.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/recover"
              className="inline-flex items-center gap-1.5 rounded-[10px] bg-[var(--gold)] px-5 py-3 font-display text-[14px] font-semibold text-[var(--gold-ink)] transition-transform hover:scale-[1.02]"
            >
              Get the recovery tool
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <a
              href="https://github.com/seQRets/seQRets-Recover"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-[10px] border border-[var(--line)] px-5 py-3 font-display text-[14px] font-semibold text-[var(--ink)] transition-colors hover:bg-[var(--band)]"
            >
              View the code base
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="mt-8 rounded-[16px] border border-[var(--line)] bg-[var(--pg)] p-5">
            <p className="font-display text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--ink3)]">
              Verify your download
            </p>
            <p className="mt-2.5 text-[14px] leading-[1.6] text-[var(--ink2)]">
              Every release publishes a SHA-256 hash so you can verify a copy
              received through an untrusted channel before using it with real
              credentials.
            </p>
            <code className="mt-3 block overflow-x-auto rounded-[10px] border border-[var(--line)] bg-[var(--band)] px-3.5 py-2.5 font-mono text-[13px] text-[var(--ink)]">
              shasum -a 256 recover.html
            </code>
            <p className="mt-2.5 text-[13px] text-[var(--ink3)]">
              Compare against the hash published on the{" "}
              <a
                href="https://github.com/seQRets/seQRets-Recover/releases/latest"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[var(--gold)] underline underline-offset-2 transition-opacity hover:opacity-80"
              >
                latest release page
              </a>
              .
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── Bottom CTA ──────────────────────────────────────── */}
      <section className="px-6 pb-24">
        <motion.div {...rise} className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[27px] font-bold leading-[1.2] tracking-[-0.03em] md:text-[32px]">
            Ready for something you can hold?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-[1.7] text-[var(--ink2)]">
            The app is free. The hardware around it — smart cards, readers, and
            kits — is what turns a backup into something physical.
          </p>
          <Link
            to="/preview/shop"
            className="mt-7 inline-flex items-center gap-1.5 rounded-[10px] bg-[var(--gold)] px-6 py-3.5 font-display text-[14px] font-semibold text-[var(--gold-ink)] transition-transform hover:scale-[1.02]"
          >
            Browse the shop
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>
      </section>

      {/* ── Lightbox ────────────────────────────────────────── */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged screenshot"
          className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute right-6 top-6 text-white/70 transition-colors hover:text-white"
            onClick={() => setLightbox(null)}
          >
            <X className="h-8 w-8" />
          </button>
          <img
            src={lightbox}
            alt="Screenshot enlarged"
            className="max-h-[90vh] max-w-full rounded-[18px] object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </PreviewPage>
  );
};

export default HowItWorksPage;
