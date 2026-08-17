import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  ShieldAlert,
  Scale,
  Github,
  MessageSquare,
  Youtube,
  Building2,
  ArrowUpRight,
} from "lucide-react";
import PageHead from "@/components/PageHead";
import { PreviewPage, rise } from "@/components/preview/PreviewChrome";

/* ------------------------------------------------------------------ *
 * /contact — fifth interior page moved onto the redesign.
 *
 * Chrome and theming come from PreviewPage; this file is content only.
 *
 * The security-disclosure card used to be red, via the shadcn
 * `destructive` token. The redesign palette has no such colour, and
 * inventing a theme-aware one for a single card is not worth it — so the
 * two cards that were emphasised before (security, encrypted comms) keep
 * their emphasis another way: a solid 2px gold border on the same surface
 * as the plain cards. A translucent gold fill was tried first and read as
 * a muddy brown box with no weight — on this palette the accent carries
 * far better as a hard edge than as a wash.
 *
 * Two Tailwind traps to avoid, both silent: an arbitrary box-shadow
 * wrapping a CSS var parses as a shadow COLOUR and computes to none, and
 * an opacity modifier on a var() colour computes to transparent.
 * ------------------------------------------------------------------ */

const CHANNELS = [
  {
    icon: Github,
    label: "Report a bug or request a feature:",
    linkText: "GitHub Issues",
    href: "https://github.com/seQRets/seQRets-app/issues",
  },
  {
    icon: MessageSquare,
    label: "Ask a question or join the discussion:",
    linkText: "GitHub Discussions",
    href: "https://github.com/seQRets/seQRets-app/discussions",
  },
  {
    icon: Youtube,
    label: "Watch tutorials and updates:",
    linkText: "YouTube",
    href: "https://www.youtube.com/@SVRNMoney",
  },
];

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PreviewPage>
      <PageHead
        title="Contact"
        description="How to reach seQRets — general questions, security disclosures, licensing, and encrypted communication. A product of Toothjockey LLC."
        path="/contact"
      />

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 pb-14 pt-16 md:pt-24">
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
            Get in touch
          </p>
          <h1 className="mt-4 font-display text-[38px] font-bold leading-[1.1] tracking-[-0.035em] sm:text-[46px] md:text-[54px]">
            Pick the channel that fits.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[15.5px] leading-[1.7] text-[var(--ink2)]">
            One page for every way to reach us — general questions, security
            disclosures, licensing, and encrypted mail.
          </p>
        </motion.div>
      </section>

      {/* ── Primary contact cards ───────────────────────────── */}
      <section className="px-6 pb-14">
        <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
          {/* General */}
          <motion.div
            {...rise}
            className="rounded-[22px] border border-[var(--line)] bg-[var(--sf)] p-6"
          >
            <span className="inline-flex rounded-[12px] bg-[var(--gold-fill)] p-3">
              <Mail className="h-5 w-5 text-[var(--gold)]" strokeWidth={1.8} />
            </span>
            <h2 className="mt-4 font-display text-[17px] font-bold">General questions</h2>
            <p className="mt-2 text-[14px] leading-[1.7] text-[var(--ink2)]">
              Questions about the product, the website, partnerships, press, or
              anything not covered below.
            </p>
            <a
              href="mailto:hello@seqrets.app"
              className="mt-3 inline-block font-semibold text-[14px] text-[var(--gold)] underline underline-offset-2 transition-opacity hover:opacity-80"
            >
              hello@seqrets.app
            </a>
          </motion.div>

          {/* Security disclosures — emphasised */}
          <motion.div
            {...rise}
            transition={{ ...rise.transition, delay: 0.06 }}
            className="rounded-[22px] border-2 border-[var(--gold)] bg-[var(--sf)] p-6"
          >
            <span className="inline-flex rounded-[12px] bg-[var(--gold-fill)] p-3">
              <ShieldAlert className="h-5 w-5 text-[var(--gold)]" strokeWidth={1.8} />
            </span>
            <h2 className="mt-4 font-display text-[17px] font-bold">Security disclosures</h2>
            <p className="mt-2 text-[14px] leading-[1.7] text-[var(--ink2)]">
              Found a vulnerability? Report it here. For sensitive reports,
              please encrypt your message with our PGP key first (see below).
            </p>
            <a
              href="mailto:security@seqrets.app"
              className="mt-3 inline-block font-semibold text-[14px] text-[var(--gold)] underline underline-offset-2 transition-opacity hover:opacity-80"
            >
              security@seqrets.app
            </a>
          </motion.div>

          {/* Commercial licensing */}
          <motion.div
            {...rise}
            transition={{ ...rise.transition, delay: 0.12 }}
            className="rounded-[22px] border border-[var(--line)] bg-[var(--sf)] p-6"
          >
            <span className="inline-flex rounded-[12px] bg-[var(--gold-fill)] p-3">
              <Scale className="h-5 w-5 text-[var(--gold)]" strokeWidth={1.8} />
            </span>
            <h2 className="mt-4 font-display text-[17px] font-bold">Commercial licensing</h2>
            <p className="mt-2 text-[14px] leading-[1.7] text-[var(--ink2)]">
              seQRets is open source under AGPL-3.0-or-later. For proprietary or
              enterprise use where AGPL obligations aren&rsquo;t feasible, get a
              commercial license.
            </p>
            <a
              href="mailto:licensing@seqrets.app"
              className="mt-3 inline-block font-semibold text-[14px] text-[var(--gold)] underline underline-offset-2 transition-opacity hover:opacity-80"
            >
              licensing@seqrets.app
            </a>
          </motion.div>

          {/* Encrypted communication — emphasised */}
          <motion.div
            {...rise}
            transition={{ ...rise.transition, delay: 0.18 }}
            className="rounded-[22px] border-2 border-[var(--gold)] bg-[var(--sf)] p-6"
          >
            <span className="inline-flex rounded-[12px] bg-[var(--gold-fill)] p-3">
              <Lock className="h-5 w-5 text-[var(--gold)]" strokeWidth={1.8} />
            </span>
            <h2 className="mt-4 font-display text-[17px] font-bold">Encrypted communication</h2>
            <p className="mt-2 text-[14px] leading-[1.7] text-[var(--ink2)]">
              For anything sensitive, send us an end-to-end encrypted message
              using Proton Mail or our PGP public key. Follow the link below for
              step-by-step instructions.
            </p>
            {/*
              The proton address used to sit here too. It is spelled out on
              /pgp — in the mailto, the gpg --recipient commands, and the
              Proton-to-Proton note — so repeating it here only raised the
              question of which address to use.
            */}
            <Link
              to="/pgp"
              className="mt-3 inline-flex items-center gap-1.5 font-semibold text-[14px] text-[var(--gold)] underline underline-offset-2 transition-opacity hover:opacity-80"
            >
              View our PGP key &amp; instructions
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Community & other channels ──────────────────────── */}
      <section className="px-6 pb-14">
        <div className="mx-auto max-w-4xl">
          <motion.h2
            {...rise}
            className="text-center font-display text-[27px] font-bold leading-[1.2] tracking-[-0.03em] md:text-[32px]"
          >
            Community &amp; other channels
          </motion.h2>

          <motion.ul
            {...rise}
            className="mt-8 space-y-4 rounded-[22px] border border-[var(--line)] bg-[var(--sf)] p-7"
          >
            {CHANNELS.map((c) => (
              <li key={c.href} className="flex items-start gap-3.5">
                <c.icon
                  className="mt-0.5 h-5 w-5 shrink-0 text-[var(--gold)]"
                  strokeWidth={1.8}
                />
                <span className="text-[14.5px] leading-[1.65] text-[var(--ink2)]">
                  <strong className="font-semibold text-[var(--ink)]">{c.label}</strong>{" "}
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[var(--gold)] underline underline-offset-2 transition-opacity hover:opacity-80"
                  >
                    {c.linkText}
                  </a>
                </span>
              </li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ── Legal entity & notices ──────────────────────────── */}
      <section className="px-6 pb-24">
        <motion.div
          {...rise}
          className="mx-auto flex max-w-4xl items-start gap-5 rounded-[22px] border border-[var(--line)] bg-[var(--sf)] p-8"
        >
          <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-[12px] bg-[var(--gold-fill)] sm:flex">
            <Building2 className="h-6 w-6 text-[var(--gold)]" strokeWidth={1.8} />
          </span>
          <div>
            <h2 className="font-display text-[19px] font-bold">
              Legal entity &amp; notices
            </h2>
            <p className="mt-2.5 text-[14.5px] leading-[1.7] text-[var(--ink2)]">
              seQRets is a product of{" "}
              <strong className="font-semibold text-[var(--ink)]">Toothjockey LLC</strong>,
              a limited liability company organized in North Dakota, USA. For
              legal notices, or questions about our{" "}
              <Link
                to="/terms"
                className="font-semibold text-[var(--gold)] underline underline-offset-2 transition-opacity hover:opacity-80"
              >
                Terms of Service
              </Link>{" "}
              or{" "}
              <Link
                to="/privacy"
                className="font-semibold text-[var(--gold)] underline underline-offset-2 transition-opacity hover:opacity-80"
              >
                Privacy Policy
              </Link>
              , email{" "}
              <a
                href="mailto:hello@seqrets.app"
                className="font-semibold text-[var(--gold)] underline underline-offset-2 transition-opacity hover:opacity-80"
              >
                hello@seqrets.app
              </a>
              .
            </p>
            <p className="mt-4 text-[14.5px] leading-[1.7] text-[var(--ink2)]">
              <strong className="font-semibold text-[var(--ink)]">
                Mailing address &amp; registered agent
              </strong>{" "}
              (for formal notices and service of process):
            </p>
            <address className="mt-1.5 text-[14.5px] not-italic leading-[1.7] text-[var(--ink2)]">
              Toothjockey LLC
              <br />
              3003 32nd Ave S, Ste 240
              <br />
              Fargo, ND 58103
              <br />
              USA
            </address>
          </div>
        </motion.div>
      </section>
    </PreviewPage>
  );
};

export default ContactPage;
