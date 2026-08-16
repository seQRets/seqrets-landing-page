import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Head } from "vite-react-ssg";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  Lock,
  Scissors,
  MapPin,
  CloudOff,
} from "lucide-react";

import {
  THEMES_APP,
  rise,
  PreviewNav,
  PreviewFooter,
  ThemeToggle,
  type PreviewMode,
} from "@/components/preview/PreviewChrome";

import appLight from "@/assets/app-light.webp";
import appDark from "@/assets/app-dark.webp";
import qard from "@/assets/seQRets-Qard-SatoshisBTC-05.webp";
import smartcardFlat from "@/assets/credit_flat.webp";

/* ------------------------------------------------------------------ *
 * REDESIGN — the landing page for this branch, served at "/"
 *
 * Follows the Finpay reference layout section for section:
 *   nav (ghost + filled CTA) → split hero with an inline action unit and
 *   a wordmark strip beneath → elevated white card overlapping the fold,
 *   holding a 3-column feature row → centred "why" bento grid → dark
 *   full-bleed band with ghosted numerals → centred mission + stat row →
 *   two side-by-side plan cards → inset dark CTA card → footer.
 *
 * Two slots are deliberately re-pointed, because the reference fills
 * them with things seQRets doesn't have and can't invent:
 *   · the customer logo row  → a plain-language "use it for" strip
 *   · the vanity metrics     → verifiable product facts (the zeros)
 * ------------------------------------------------------------------ */

/* One crypto, two everyday — the product isn't crypto-only. */
const USE_FOR = ["Seed phrases", "Master passwords", "Recovery codes"];

const STEPS = [
  {
    Icon: Lock,
    t: "Lock it up",
    p: "Type in what you want to protect and set a password. It's encrypted on your own device — nothing is sent anywhere.",
  },
  {
    Icon: Scissors,
    t: "Split it into Qards",
    p: "The encrypted result is split into Qards — QR codes you can print, store, or distribute digitally. You choose the numbers: five Qards, say, where any three can rebuild it.",
  },
  {
    Icon: MapPin,
    t: "Spread them out",
    p: "One at your sister's. One in a safe deposit box. Two at home. Any three, plus the password you set, bring the secret back — one or two reveal nothing at all.",
  },
];

const PROTECTS = [
  {
    n: "1",
    t: "A burglar finds one Qard",
    p: "It tells them nothing — not part of your secret, none of it. Below your threshold, a Qard is useless even with the password.",
  },
  {
    n: "2",
    t: "A fire takes two Qards",
    p: "You've lost nothing. Three of the remaining Qards, with your password, still bring the whole thing back, exactly as it was.",
  },
  {
    n: "3",
    t: "You're gone, and your family needs in",
    p: "They bring their Qards together and follow the instructions you left them. No lawyer holds the key, and no single heir can act alone.",
  },
];

const STATS = [
  { n: "0", l: "servers holding your secret" },
  { n: "0", l: "accounts to create" },
  { n: "1", l: "small HTML file is all the software you need" },
];

/* ── Hero visual: layered product UI ────────────────────────────── */
const HeroStack = ({ mode }: { mode: PreviewMode }) => (
  <div className="relative mx-auto w-full max-w-[520px]">
    {/*
      A fanned pair of real Qards exported from the app, in the slot the
      reference gives its payment card. These sit *before* the app window in
      DOM order so they paint behind it — a supporting prop, not a rival to
      the product UI. This is a throwaway set ("Satoshi's BTC", 0SHjA9cp) —
      never put a Qard from a live set on a public page.
    */}
    <img
      src={qard}
      alt=""
      aria-hidden="true"
      className="pointer-events-none absolute -top-[70px] right-2 w-[156px] rotate-[-8deg] rounded-[10px] border border-[var(--line)] shadow-[shadow:var(--shadow)] sm:right-0"
    />
    <img
      src={qard}
      alt="A printed seQRets Qard: a QR code above the label Satoshi's BTC, Qard #5, and a warning to store it securely and separately from other Qards"
      className="pointer-events-none absolute -top-12 -right-6 w-[164px] rotate-[13deg] rounded-[10px] border border-[var(--line)] shadow-[shadow:var(--shadow)] sm:-right-4"
    />

    <img
      src={mode === "light" ? appLight : appDark}
      alt="The seQRets app home screen, offering three choices: Secure a Secret, Inheritance Plan, and Restore a Secret"
      className="relative w-full"
    />

    {/*
      Floating smart card, in the slot the reference gives its stat card.
      Hidden below sm: at phone widths it crowds the app window behind it.

      The shadow is applied inline from the --card-drop token rather than as a
      Tailwind arbitrary drop-shadow class: any such class wrapping a CSS var
      trips the guard grep this file is checked against.
    */}
    <img
      src={smartcardFlat}
      alt="A black seQRets smart card, embossed in gold with the seQRets mark and a contactless symbol"
      style={{ filter: "drop-shadow(var(--card-drop))" }}
      className="pointer-events-none absolute hidden w-[272px] rotate-[-10deg] sm:-bottom-[32px] sm:-left-[63px] sm:block"
    />
  </div>
);

/* Corner arrow badge used on the plan cards, as in the reference. */
const CornerArrow = ({ on = "light" }: { on?: "light" | "accent" }) => (
  <span
    className={`flex h-9 w-9 items-center justify-center rounded-full ${
      on === "accent" ? "bg-[var(--gold-card-fill)] text-[var(--gold-card-ink)]" : "bg-[var(--goldsoft)] text-[var(--gold)]"
    }`}
  >
    <ArrowUpRight className="h-4 w-4" />
  </span>
);

/* ── Page ───────────────────────────────────────────────────────── */
const PreviewLandingB = () => {
  const [mode, setMode] = useState<PreviewMode>("dark");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const vars = { ...THEMES_APP[mode] } as React.CSSProperties;

  return (
    <>
      <Head>
        <title>seQRets — Secure. Split. Share.</title>
      </Head>

      <div
        style={vars}
        className="min-h-screen bg-[var(--pg)] font-body text-[var(--ink)] antialiased transition-colors duration-300"
      >
        <PreviewNav
          links={[
            ["How it works", "#how"],
            ["Why trust it", "#why"],
            ["Get started", "#plans"],
          ]}
          secondary={["Docs", "/docs"]}
          cta={{ label: "Open the app", href: "https://app.seqrets.app" }}
          ctaStyle="accent"
        />

        <main>
          {/* ── 1. Hero ───────────────────────────────────────── */}
          <section className="relative overflow-hidden px-6 pb-44 pt-14 md:pb-52 md:pt-20">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-0 h-[560px] w-[46%] opacity-[.55]"
              style={{ background: "radial-gradient(60% 55% at 70% 30%, var(--goldsoft), transparent)" }}
            />

            <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.02fr_.98fr]">
              <motion.div
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                <h1 className="font-display text-[42px] font-bold leading-[1.08] tracking-[-0.035em] sm:text-[50px] lg:text-[56px]">
                  Some things you
                  <br className="hidden sm:inline" /> can&rsquo;t afford
                  <br className="hidden sm:inline" /> to lose.
                </h1>

                <p className="mt-6 max-w-[27rem] text-[15.5px] leading-[1.7] text-[var(--ink2)]">
                  Secure and distribute your most important secrets. The
                  seQRets app encrypts your secret, then splits it into Qards:
                  QR codes you can print, store, or distribute digitally.
                  Recovery requires a set number of Qards and the password you
                  set — while a single compromised Qard reveals nothing about
                  the underlying secret.
                </p>

                {/* inline action unit, in place of the reference's email capture */}
                <div className="mt-8 flex max-w-[26rem] items-center gap-2 rounded-[14px] border border-[var(--line)] bg-[var(--sf)] p-2 shadow-[shadow:var(--shadow-sm)]">
                  <span className="flex-1 pl-3 font-mono text-[14px] text-[var(--ink3)]">
                    app.seqrets.app
                  </span>
                  <a
                    href="https://app.seqrets.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-[10px] bg-[var(--gold)] px-5 py-3 font-display text-[14px] font-semibold text-[var(--gold-ink)] transition-transform hover:scale-[1.02]"
                  >
                    Get started
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
                <p className="mt-3 text-[13px] text-[var(--ink3)]">
                  Free · No sign-up · Nothing is uploaded
                </p>

                {/* wordmark strip, in place of the reference's logo row */}
                <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
                  {USE_FOR.map((w) => (
                    <span
                      key={w}
                      className="font-display text-[17px] font-bold tracking-[-0.01em] text-[var(--ink2)]"
                    >
                      {w}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <HeroStack mode={mode} />
              </motion.div>
            </div>
          </section>

          {/* ── 2. Elevated card overlapping the fold ─────────── */}
          {/*
            `flow-root` is load-bearing: without it the card's negative top
            margin collapses through the section and drags the band's
            background up with it, so nothing straddles the seam.
          */}
          <section
            id="how"
            className="flow-root scroll-mt-20 bg-[var(--band)] px-6 pb-20 md:pb-24"
          >
            <motion.div
              {...rise}
              className="relative z-10 mx-auto -mt-32 max-w-6xl rounded-[26px] border border-[var(--card-line)] bg-[var(--sf)] px-8 py-10 shadow-[shadow:var(--shadow-card)] md:-mt-40 md:px-14 md:py-14"
            >
              {/* header: eyebrow + heading left, supporting copy right */}
              <p className="font-display text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--gold)]">
                How it works
              </p>
              <div className="mt-4 grid gap-6 md:grid-cols-[1.05fr_0.95fr] md:gap-16">
                <h2 className="font-display text-[29px] font-bold leading-[1.2] tracking-[-0.03em] md:text-[35px]">
                  Three steps. That&rsquo;s the whole idea.
                </h2>
                <p className="text-[15px] leading-[1.75] text-[var(--ink2)] md:pt-1.5">
                  No dashboard, no settings to get wrong. You open it, pick what
                  you&rsquo;re doing, and it walks you through the rest — one
                  screen, one decision at a time.
                </p>
              </div>

              {/* three feature columns */}
              <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-14">
                {STEPS.map((s) => (
                  <div key={s.t}>
                    <s.Icon className="h-7 w-7 text-[var(--gold)]" strokeWidth={1.5} />
                    <h3 className="mt-5 font-display text-[16px] font-bold">{s.t}</h3>
                    <p className="mt-2.5 text-[13.5px] leading-[1.7] text-[var(--ink2)]">{s.p}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* ── 3. "Why" bento grid ───────────────────────────── */}
          <section id="why" className="scroll-mt-20 px-6 py-20 md:py-24">
            <div className="mx-auto max-w-6xl">
              <motion.div {...rise} className="text-center">
                <p className="font-display text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--gold)]">
                  Why us
                </p>
                <h2 className="mt-4 font-display text-[30px] font-bold leading-[1.18] tracking-[-0.03em] md:text-[38px]">
                  Why people trust it with the real thing
                </h2>
              </motion.div>

              <div className="mt-12 grid gap-5 md:grid-cols-5">
                {/* big number card */}
                <motion.div
                  {...rise}
                  className="rounded-[22px] bg-[var(--band)] p-9 md:col-span-2"
                >
                  <p className="font-display text-[64px] font-bold leading-none tracking-[-0.04em] text-[var(--gold)]">
                    3 of 5
                  </p>
                  <p className="mt-6 max-w-[15rem] font-display text-[19px] font-bold leading-[1.35]">
                    Qards to open it, plus the password you set — and you pick the numbers
                  </p>
                </motion.div>

                {/* nothing-uploaded card */}
                <motion.div
                  {...rise}
                  transition={{ ...rise.transition, delay: 0.08 }}
                  className="rounded-[22px] bg-[var(--band)] p-9 md:col-span-3"
                >
                  <h3 className="max-w-[20rem] font-display text-[21px] font-bold leading-[1.35]">
                    Nothing ever leaves your device
                  </h3>
                  <div className="mt-8 flex items-center gap-4">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--gold)]">
                      <Lock className="h-6 w-6 text-[var(--gold-ink)]" strokeWidth={1.8} />
                    </span>
                    <span className="h-px flex-1 bg-[var(--line)]" />
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--ink)]">
                      <CloudOff className="h-6 w-6 text-[var(--pg)]" strokeWidth={1.8} />
                    </span>
                  </div>
                  <p className="mt-6 max-w-[26rem] text-[14.5px] leading-[1.6] text-[var(--ink2)]">
                    The locking and unlocking happens in your browser. There is no
                    server holding your secret, because there is no server.
                  </p>
                </motion.div>

                {/* wide card with the progress panel */}
                <motion.div
                  {...rise}
                  transition={{ ...rise.transition, delay: 0.14 }}
                  className="grid items-center gap-8 rounded-[22px] bg-[var(--band)] p-9 md:col-span-5 md:grid-cols-[1fr_1.35fr]"
                >
                  <div>
                    <h3 className="font-display text-[21px] font-bold leading-[1.35]">
                      Your heirs are never left guessing
                    </h3>
                    <p className="mt-3 max-w-[22rem] text-[14.5px] leading-[1.6] text-[var(--ink2)]">
                      As Qards are scanned, the app counts them out — so decades
                      from now, whoever is holding them knows exactly how many
                      are still missing.
                    </p>
                  </div>

                  <div className="rounded-[18px] border border-[var(--line)] bg-[var(--sf)] p-6">
                    <div className="flex items-baseline justify-between">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--ink3)]">
                        Set afgP3ivE
                      </p>
                      <p className="text-[11px] font-semibold text-[var(--gold)]">In progress</p>
                    </div>
                    <p className="mt-4 font-display text-[38px] font-bold leading-none tracking-[-0.03em]">
                      2 <span className="text-[var(--ink3)]">of</span> 3
                    </p>
                    <p className="mt-2 text-[14px] text-[var(--ink2)]">
                      1 more Qard required to unlock
                    </p>
                    <div className="mt-5 flex gap-2">
                      {[true, true, false].map((f, i) => (
                        <span
                          key={i}
                          className={`h-2 flex-1 rounded-full ${f ? "bg-[var(--gold)]" : "bg-[var(--line)]"}`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ── 4. Dark band with ghosted numerals ────────────── */}
          <section className="bg-[var(--deep)] px-6 py-20 md:py-24">
            <div className="mx-auto max-w-6xl">
              <motion.div {...rise}>
                <p className="font-display text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--deep-gold)]">
                  What it protects you from
                </p>
                <h2 className="mt-4 max-w-2xl font-display text-[28px] font-bold leading-[1.2] tracking-[-0.03em] text-[var(--deep-ink)] md:text-[36px]">
                  Every way of losing it, covered by the same idea.
                </h2>
              </motion.div>

              <div className="mt-12 grid gap-5 md:grid-cols-3">
                {PROTECTS.map((c, i) => (
                  <motion.div
                    key={c.n}
                    {...rise}
                    transition={{ ...rise.transition, delay: i * 0.08 }}
                    className="rounded-[18px] border border-[var(--deep-line)] bg-[var(--deep-sf)] p-8"
                  >
                    <p className="font-display text-[40px] font-bold leading-none text-[var(--deep-dim)]">
                      {c.n}
                    </p>
                    <h3 className="mt-6 font-display text-[17px] font-bold text-[var(--deep-ink)]">
                      {c.t}
                    </h3>
                    <p className="mt-2.5 text-[14px] leading-[1.65] text-[var(--deep-ink2)]">
                      {c.p}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ── 5. Centred mission + stat row ─────────────────── */}
          <section id="trust" className="scroll-mt-20 px-6 py-20 md:py-24">
            <div className="mx-auto max-w-6xl">
              <motion.div {...rise} className="mx-auto max-w-2xl text-center">
                <p className="font-display text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--gold)]">
                  Our position
                </p>
                <h2 className="mt-4 font-display text-[30px] font-bold leading-[1.18] tracking-[-0.03em] md:text-[38px]">
                  We built it so you
                  <br className="hidden md:inline" /> don&rsquo;t have to trust us
                </h2>
                <p className="mx-auto mt-5 max-w-lg text-[15px] leading-[1.7] text-[var(--ink2)]">
                  seQRets is open source, so you don&rsquo;t have to take our word
                  for how it works — and it keeps working whether or not we do.
                </p>
              </motion.div>

              <div className="mx-auto mt-14 grid max-w-3xl gap-10 text-center sm:grid-cols-3">
                {STATS.map((s, i) => (
                  <motion.div key={s.l} {...rise} transition={{ ...rise.transition, delay: i * 0.08 }}>
                    <p className="font-display text-[46px] font-bold leading-none tracking-[-0.04em]">
                      {s.n}
                    </p>
                    <p className="mx-auto mt-3 max-w-[11rem] text-[14px] leading-[1.5] text-[var(--ink2)]">
                      {s.l}
                    </p>
                  </motion.div>
                ))}
              </div>

              <motion.p
                {...rise}
                className="mx-auto mt-14 max-w-2xl rounded-2xl bg-[var(--band)] p-5 text-center text-[13.5px] leading-[1.6] text-[var(--ink2)]"
              >
                <span className="font-semibold text-[var(--ink)]">Being straight with you:</span>{" "}
                seQRets is in beta. The code has been reviewed internally, but it
                has not yet had an independent third-party security audit.
              </motion.p>
            </div>
          </section>

          {/* ── 6. Two plan cards ─────────────────────────────── */}
          <section id="plans" className="scroll-mt-20 px-6 pb-20 md:pb-24">
            <div className="mx-auto max-w-6xl">
              <motion.p
                {...rise}
                className="text-center font-display text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--ink3)]"
              >
                Choose your path
              </motion.p>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <motion.a
                  {...rise}
                  href="https://app.seqrets.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[248px] flex-col justify-between rounded-[22px] bg-[var(--band)] p-9 transition-transform hover:-translate-y-1"
                >
                  <div>
                    <h3 className="font-display text-[26px] font-bold tracking-[-0.02em]">
                      Web app
                    </h3>
                    <p className="mt-3 max-w-[22rem] text-[14.5px] leading-[1.6] text-[var(--ink2)]">
                      Everything you need to encrypt a secret and export the
                      Qards. Works in any browser.
                    </p>
                  </div>
                  <div className="flex items-end justify-between">
                    <p className="font-display text-[22px] font-bold">Free, forever</p>
                    <CornerArrow />
                  </div>
                </motion.a>

                <motion.div
                  {...rise}
                  transition={{ ...rise.transition, delay: 0.08 }}
                  className="flex min-h-[248px] flex-col justify-between rounded-[22px] p-9"
                  style={{ background: "linear-gradient(135deg, var(--gold-card-a) 0%, var(--gold-card-b) 100%)" }}
                >
                  <div>
                    <h3 className="font-display text-[26px] font-bold tracking-[-0.02em] text-[var(--gold-card-ink)]">
                      Desktop &amp; smart cards
                    </h3>
                    <p className="mt-3 max-w-[22rem] text-[14.5px] leading-[1.6] text-[var(--gold-card-ink2)]">
                      Write your Qards onto tamper-evident smart cards, plus
                      inheritance planning for your family.
                    </p>
                  </div>
                  <div className="flex items-end justify-between">
                    <p className="font-display text-[22px] font-bold text-[var(--gold-card-ink)]">Pricing TBA</p>
                    <CornerArrow on="accent" />
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ── 7. Inset dark CTA card ────────────────────────── */}
          <section className="px-6 pb-24 md:pb-28">
            <motion.div
              {...rise}
              className="mx-auto grid max-w-6xl items-center gap-8 rounded-[26px] bg-[var(--deep)] px-9 py-12 md:grid-cols-[1.3fr_1fr] md:px-14 md:py-14"
            >
              <div>
                <p className="font-display text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--deep-gold)]">
                  Try it now
                </p>
                <h2 className="mt-4 font-display text-[28px] font-bold leading-[1.18] tracking-[-0.03em] text-[var(--deep-ink)] md:text-[36px]">
                  Start with something that doesn&rsquo;t matter.
                </h2>
                <p className="mt-4 max-w-[28rem] text-[14.5px] leading-[1.65] text-[var(--deep-ink2)]">
                  Lock up a note that says &ldquo;hello&rdquo;. Print the Qards.
                  Get it back. Then do it with the thing that actually matters.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 md:justify-end">
                <a
                  href="https://app.seqrets.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-[10px] bg-[var(--gold)] px-6 py-3.5 font-display text-[14.5px] font-semibold text-[var(--gold-ink)] transition-transform hover:scale-[1.02]"
                >
                  Open the free app
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  to="/docs/technical"
                  className="inline-flex items-center gap-2 rounded-[10px] border border-[var(--deep-line)] px-6 py-3.5 font-display text-[14.5px] font-semibold text-[var(--deep-ink)] transition-colors hover:bg-[var(--deep-sf)]"
                >
                  Learn more
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </section>
        </main>

        <PreviewFooter />
        <ThemeToggle mode={mode} setMode={setMode} />
      </div>
    </>
  );
};

export default PreviewLandingB;
