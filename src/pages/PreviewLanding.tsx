import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Head } from "vite-react-ssg";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Flame,
  Copy,
  MessageSquare,
  KeyRound,
  Users,
  FileLock2,
  Bitcoin,
} from "lucide-react";

import {
  THEMES,
  rise,
  PreviewNav,
  PreviewFooter,
  ThemeToggle,
  type PreviewMode,
} from "@/components/preview/PreviewChrome";

import qards from "@/assets/qr-qards.webp";
import appLight from "@/assets/app-light.webp";

/* ------------------------------------------------------------------ *
 * DESIGN PREVIEW — /preview
 *
 * A self-contained redesign concept for the landing page. It does not
 * import any existing landing component and does not touch global CSS:
 * the palette comes from `PreviewChrome` and is applied as CSS custom
 * properties on a single wrapper element.
 *
 * Two goals:
 *   1. A warm, calm, modern look that matches the actual app UI.
 *   2. Radical simplification — plain language, one idea per screen.
 * ------------------------------------------------------------------ */

/* ── Step illustrations ─────────────────────────────────────────── */
const IllLock = () => (
  <svg viewBox="0 0 200 130" fill="none" className="h-full w-full" aria-hidden="true">
    <rect x="52" y="20" width="96" height="94" rx="10" fill="var(--sf)" stroke="var(--line)" strokeWidth="2.5" />
    <path d="M70 48h44M70 62h60M70 76h34" stroke="var(--ink3)" strokeWidth="4" strokeLinecap="round" />
    <circle cx="140" cy="88" r="26" fill="var(--goldsoft)" stroke="var(--gold)" strokeWidth="2.5" />
    <rect x="130" y="86" width="20" height="16" rx="3.5" stroke="var(--gold)" strokeWidth="2.5" fill="none" />
    <path d="M134 86v-4.5a6 6 0 0 1 12 0V86" stroke="var(--gold)" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const IllSplit = () => (
  <svg viewBox="0 0 200 130" fill="none" className="h-full w-full" aria-hidden="true">
    {/* the original */}
    <rect x="10" y="38" width="46" height="54" rx="7" fill="var(--sf)" stroke="var(--line)" strokeWidth="2.5" />
    <rect x="21" y="51" width="24" height="24" rx="2" fill="var(--ink)" opacity=".16" />

    {/* arrow */}
    <path d="M66 65h16" stroke="var(--gold)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="5 5" />
    <path d="M80 59.5l6 5.5-6 5.5" stroke="var(--gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

    {/* the shares */}
    {[
      { x: 104, y: 12, r: -13 },
      { x: 122, y: 33, r: 0 },
      { x: 140, y: 54, r: 13 },
    ].map((c, i) => (
      <g key={i} transform={`translate(${c.x} ${c.y}) rotate(${c.r} 23 27)`}>
        <rect width="46" height="54" rx="7" fill="var(--sf)" stroke="var(--line)" strokeWidth="2.5" />
        <rect x="11" y="13" width="24" height="24" rx="2" fill="var(--gold)" opacity={0.85 - i * 0.2} />
      </g>
    ))}
  </svg>
);

/* Simple 20×20 place glyphs: home, bank vault, trusted person */
const PLACES = [
  { x: 10, d: "M2 9.5 10 2.5l8 7V18a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" },
  { x: 77, d: "M1.5 8 10 3l8.5 5zM4 10h2.4v6H4zM8.8 10h2.4v6H8.8zM13.6 10h2.4v6h-2.4zM2 17.5h16V19H2z" },
  { x: 144, d: "M10 9.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 18.5a7 7 0 0 1 14 0z" },
];

const IllSpread = () => (
  <svg viewBox="0 0 200 130" fill="none" className="h-full w-full" aria-hidden="true">
    {/* connectors from each place down to the threshold pill */}
    {[33, 100, 167].map((cx) => (
      <path
        key={cx}
        d={`M${cx} 60 Q ${cx} 84 100 90`}
        stroke="var(--line)"
        strokeWidth="2.5"
        strokeDasharray="5 6"
        strokeLinecap="round"
      />
    ))}

    {PLACES.map((p, i) => (
      <g key={i} transform={`translate(${p.x} 14)`}>
        <rect width="46" height="46" rx="10" fill="var(--sf)" stroke="var(--line)" strokeWidth="2.5" />
        <g transform="translate(13 6)" fill="var(--gold)">
          <path d={p.d} />
        </g>
        <rect x="12" y="33" width="22" height="4" rx="2" fill="var(--ink)" opacity=".16" />
      </g>
    ))}

    <g transform="translate(68 90)">
      <rect width="64" height="28" rx="14" fill="var(--goldsoft)" stroke="var(--gold)" strokeWidth="2.5" />
      <text
        x="32"
        y="19"
        textAnchor="middle"
        fontSize="13"
        fontWeight="800"
        fill="var(--gold)"
        fontFamily="Inter, system-ui, sans-serif"
      >
        any 3 of 5
      </text>
    </g>
  </svg>
);

/* ── Data ───────────────────────────────────────────────────────── */
const STEPS = [
  {
    n: "1",
    title: "Lock it up",
    body:
      "Type in the thing you want to protect and set a password. It's encrypted on your own computer or phone. Nothing is sent anywhere.",
    Ill: IllLock,
  },
  {
    n: "2",
    title: "Split it into Qards",
    body:
      "The encrypted result is split into Qards — QR codes you can print, store, or distribute digitally. You choose the numbers: five Qards, say, where any three can rebuild it.",
    Ill: IllSplit,
  },
  {
    n: "3",
    title: "Spread them out",
    body:
      "One at your sister's house. One in a safe deposit box. Two at home. Any three, plus the password you set, bring the secret back — one or two reveal nothing at all.",
    Ill: IllSpread,
  },
];

const PROBLEMS = [
  { Icon: Flame, h: "One copy in a drawer", p: "A fire, a flood, or a move — and it's gone for good." },
  { Icon: Copy, h: "Ten copies, to be safe", p: "Now there are ten ways for the wrong person to find it." },
  { Icon: MessageSquare, h: "Told it to someone", p: "One person now holds everything, and you have to hope." },
];

const USES = [
  { Icon: Bitcoin, t: "Crypto seed phrases", p: "The 12 or 24 words behind your Bitcoin. Lose them and the coins are gone.", v: "1" },
  { Icon: KeyRound, t: "Master passwords & recovery codes", p: "The master password to your password manager. The backup codes. The ones with no reset button.", v: "2" },
  { Icon: Users, t: "What your family inherits", p: "So the people you love can get in — together — without a lawyer holding the key.", v: "3" },
  { Icon: FileLock2, t: "Private documents", p: "A file, a set of instructions, an inheritance plan — anything meant for one day only.", v: "4" },
];

const TRUST = [
  { t: "Nothing leaves your device", p: "The locking and unlocking happens in your browser. There is no server holding your secret, because there is no server." },
  { t: "No account, ever", p: "No sign-up, no email, no ID check. You don't have an account with us because we don't want one." },
  { t: "Anyone can check the code", p: "seQRets is open source. You don't have to take our word for how it works — you can go read it." },
  { t: "It works without us", p: "A single HTML file reads your Qards in any browser, offline. Even if this project disappeared tomorrow." },
];

/* ── Page ───────────────────────────────────────────────────────── */
const PreviewLanding = () => {
  const [mode, setMode] = useState<PreviewMode>("dark");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const vars = { ...THEMES[mode] } as React.CSSProperties;

  return (
    <>
      <Head>
        <title>Design Preview | seQRets</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div
        style={vars}
        className="min-h-screen bg-[var(--pg)] font-body text-[var(--ink)] antialiased transition-colors duration-300"
      >
        <PreviewNav
          links={[
            ["How it works", "#how"],
            ["What it's for", "#uses"],
            ["Why trust it", "#trust"],
            ["Shop", "/preview/shop"],
          ]}
        />

        <main id="top">
          {/* ── Hero ──────────────────────────────────────────── */}
          <section className="relative overflow-hidden px-6 pb-24 pt-16 md:pt-24">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full opacity-30 blur-[110px] md:opacity-[.5]"
              style={{ background: "radial-gradient(closest-side, var(--gold2), transparent)" }}
            />

            <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-10">
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--sf)] px-3.5 py-1.5 text-[13px] font-medium text-[var(--ink2)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
                  Free · Runs in your browser · Nothing is uploaded
                </span>

                <h1 className="mt-6 font-display text-[44px] font-extrabold leading-[1.04] tracking-[-0.03em] sm:text-[56px] lg:text-[64px]">
                  Some things you{" "}
                  <br className="hidden md:inline" />
                  can&rsquo;t afford{" "}
                  <br className="hidden md:inline" />
                  to lose.
                </h1>

                <p className="mt-7 max-w-[30rem] text-[18px] leading-[1.65] text-[var(--ink2)]">
                  Secure and distribute your most important secrets. The
                  seQRets app encrypts your secret, then splits it into Qards:
                  QR codes you can print, store, or distribute digitally.
                  Recovery requires a set number of Qards and the password you
                  set —{" "}
                  <span className="font-semibold text-[var(--ink)]">
                    while a single compromised Qard reveals nothing about the
                    underlying secret.
                  </span>
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    href="https://app.seqrets.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-7 py-4 font-display text-[15px] font-semibold text-[var(--pg)] shadow-[shadow:var(--shadow-sm)] transition-transform hover:scale-[1.02]"
                  >
                    Try it free — no sign-up
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                  <a
                    href="#how"
                    className="inline-flex items-center justify-center rounded-full border border-[var(--line)] bg-[var(--sf)] px-7 py-4 font-display text-[15px] font-semibold text-[var(--ink)] transition-colors hover:border-[var(--gold)]"
                  >
                    Show me how it works
                  </a>
                </div>

                <p className="mt-6 text-[13.5px] text-[var(--ink3)]">
                  Takes about two minutes. Try it with something small first.
                </p>
              </motion.div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="relative mx-auto max-w-[460px]">
                  <img
                    src={qards}
                    alt="Three printed seQRets cards, each showing a QR code, fanned out with a black smart card resting on top"
                    className={`w-full drop-shadow-[0_30px_60px_rgba(60,44,24,.25)] ${
                      mode === "light" ? "mix-blend-multiply" : ""
                    }`}
                  />

                  <div className="absolute -left-2 top-6 rounded-2xl border border-[var(--line)] bg-[var(--sf)] px-4 py-3 shadow-[shadow:var(--shadow-sm)] sm:-left-6">
                    <p className="font-display text-[22px] font-extrabold leading-none text-[var(--gold)]">
                      3 <span className="text-[var(--ink3)]">of</span> 5
                    </p>
                    <p className="mt-1 text-[12px] font-medium text-[var(--ink2)]">
                      Qards + your password to open it
                    </p>
                  </div>

                  <div className="absolute -right-1 bottom-8 rounded-2xl border border-[var(--line)] bg-[var(--sf)] px-4 py-3 shadow-[shadow:var(--shadow-sm)] sm:-right-4">
                    <p className="text-[12.5px] font-semibold text-[var(--ink)]">
                      Found just this one?
                    </p>
                    <p className="mt-0.5 text-[12px] text-[var(--ink2)]">It tells them nothing.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── The problem ───────────────────────────────────── */}
          <section className="border-y border-[var(--line)] bg-[var(--band)] px-6 py-20 md:py-28">
            <div className="mx-auto max-w-6xl">
              <motion.div {...rise} className="max-w-2xl">
                <p className="font-display text-[13px] font-bold uppercase tracking-[0.18em] text-[var(--gold)]">
                  The problem
                </p>
                <h2 className="mt-4 font-display text-[32px] font-extrabold leading-[1.14] tracking-[-0.02em] md:text-[42px]">
                  Every way of keeping a secret safe has the same flaw.
                </h2>
              </motion.div>

              <div className="mt-12 grid gap-5 md:grid-cols-3">
                {PROBLEMS.map((p, i) => (
                  <motion.div
                    key={p.h}
                    {...rise}
                    transition={{ ...rise.transition, delay: i * 0.08 }}
                    className="rounded-3xl border border-[var(--line)] bg-[var(--sf)] p-7"
                  >
                    <p.Icon className="h-6 w-6 text-[var(--gold)]" strokeWidth={1.8} />
                    <h3 className="mt-5 font-display text-[19px] font-bold">{p.h}</h3>
                    <p className="mt-2.5 text-[15.5px] leading-[1.6] text-[var(--ink2)]">{p.p}</p>
                  </motion.div>
                ))}
              </div>

              <motion.p
                {...rise}
                className="mx-auto mt-12 max-w-2xl text-center font-display text-[21px] font-semibold leading-[1.45] md:text-[26px]"
              >
                You&rsquo;re stuck choosing between losing it and leaking it.
                <br />
                <span className="text-[var(--gold)]">seQRets removes the choice.</span>
              </motion.p>
            </div>
          </section>

          {/* ── How it works ──────────────────────────────────── */}
          <section id="how" className="scroll-mt-20 px-6 py-20 md:py-28">
            <div className="mx-auto max-w-6xl">
              <motion.div {...rise} className="max-w-2xl">
                <p className="font-display text-[13px] font-bold uppercase tracking-[0.18em] text-[var(--gold)]">
                  How it works
                </p>
                <h2 className="mt-4 font-display text-[32px] font-extrabold leading-[1.14] tracking-[-0.02em] md:text-[42px]">
                  Three steps. That&rsquo;s the whole idea.
                </h2>
              </motion.div>

              <div className="mt-14 grid gap-6 md:grid-cols-3">
                {STEPS.map((s, i) => (
                  <motion.div
                    key={s.n}
                    {...rise}
                    transition={{ ...rise.transition, delay: i * 0.1 }}
                    className="overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--sf)]"
                  >
                    <div className="h-[168px] bg-[var(--band)] p-5">
                      <s.Ill />
                    </div>
                    <div className="p-7">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--goldsoft)] font-display text-[15px] font-extrabold text-[var(--gold)]">
                        {s.n}
                      </span>
                      <h3 className="mt-4 font-display text-[22px] font-bold tracking-[-0.01em]">
                        {s.title}
                      </h3>
                      <p className="mt-3 text-[15.5px] leading-[1.65] text-[var(--ink2)]">{s.body}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Payoff */}
              <motion.div
                {...rise}
                className="mt-8 rounded-[28px] border border-[var(--gold-line)] bg-[var(--goldsoft)] p-8 md:p-11"
              >
                <p className="font-display text-[13px] font-bold uppercase tracking-[0.18em] text-[var(--gold)]">
                  The short version
                </p>
                <p className="mt-4 max-w-3xl font-display text-[22px] font-semibold leading-[1.45] md:text-[27px]">
                  A burglar who finds one Qard gets nothing. A fire that takes
                  two Qards costs you nothing. You need three plus the password
                  you set — and you decide who holds what.
                </p>
                <Link
                  to="/docs/technical"
                  className="mt-7 inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-[var(--gold)] hover:underline"
                >
                  For the technically curious: the cryptography behind it
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>
          </section>

          {/* ── Uses ──────────────────────────────────────────── */}
          <section
            id="uses"
            className="scroll-mt-20 border-y border-[var(--line)] bg-[var(--band)] px-6 py-20 md:py-28"
          >
            <div className="mx-auto max-w-6xl">
              <motion.div {...rise} className="max-w-2xl">
                <p className="font-display text-[13px] font-bold uppercase tracking-[0.18em] text-[var(--gold)]">
                  What people use it for
                </p>
                <h2 className="mt-4 font-display text-[32px] font-extrabold leading-[1.14] tracking-[-0.02em] md:text-[42px]">
                  If losing it would be a disaster, it belongs here.
                </h2>
              </motion.div>

              <div className="mt-12 grid gap-5 sm:grid-cols-2">
                {USES.map((u, i) => (
                  <motion.div
                    key={u.t}
                    {...rise}
                    transition={{ ...rise.transition, delay: i * 0.07 }}
                    className="flex gap-5 rounded-3xl border border-[var(--line)] bg-[var(--sf)] p-7"
                  >
                    <span
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                      style={{
                        background: `var(--c${u.v}bg)`,
                        color: `var(--c${u.v})`,
                      }}
                    >
                      <u.Icon className="h-[22px] w-[22px]" strokeWidth={1.9} />
                    </span>
                    <div>
                      <h3 className="font-display text-[19px] font-bold">{u.t}</h3>
                      <p className="mt-2 text-[15.5px] leading-[1.6] text-[var(--ink2)]">{u.p}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ── App shot ──────────────────────────────────────── */}
          <section className="px-6 py-20 md:py-28">
            <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
              <motion.div {...rise}>
                <p className="font-display text-[13px] font-bold uppercase tracking-[0.18em] text-[var(--gold)]">
                  The app
                </p>
                <h2 className="mt-4 font-display text-[32px] font-extrabold leading-[1.14] tracking-[-0.02em] md:text-[42px]">
                  It asks you one question at a time.
                </h2>
                <p className="mt-6 max-w-[30rem] text-[17px] leading-[1.68] text-[var(--ink2)]">
                  No dashboard. No settings to get wrong. You open it, you pick
                  what you&rsquo;re doing, and it walks you through the rest — one
                  screen, one decision.
                </p>
                <ul className="mt-8 space-y-3.5">
                  {[
                    "Secure a secret — encrypt something and print the Qards",
                    "Restore a secret — scan the Qards to get it back",
                    "Inheritance plan — leave instructions for your family",
                  ].map((li) => (
                    <li key={li} className="flex items-start gap-3 text-[15.5px] text-[var(--ink2)]">
                      <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold)]" />
                      {li}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div {...rise} transition={{ ...rise.transition, delay: 0.1 }}>
                <img
                  src={appLight}
                  alt="The seQRets app home screen, showing three large choices: Secure a Secret, Inheritance Plan, and Restore a Secret"
                  className="w-full rounded-[26px] shadow-[shadow:var(--shadow)]"
                />
              </motion.div>
            </div>
          </section>

          {/* ── Trust ─────────────────────────────────────────── */}
          <section
            id="trust"
            className="scroll-mt-20 border-y border-[var(--line)] bg-[var(--band)] px-6 py-20 md:py-28"
          >
            <div className="mx-auto max-w-6xl">
              <motion.div {...rise} className="max-w-2xl">
                <p className="font-display text-[13px] font-bold uppercase tracking-[0.18em] text-[var(--gold)]">
                  Why you can trust it
                </p>
                <h2 className="mt-4 font-display text-[32px] font-extrabold leading-[1.14] tracking-[-0.02em] md:text-[42px]">
                  We built it so you don&rsquo;t have to trust us.
                </h2>
              </motion.div>

              <div className="mt-12 grid gap-5 md:grid-cols-2">
                {TRUST.map((t, i) => (
                  <motion.div
                    key={t.t}
                    {...rise}
                    transition={{ ...rise.transition, delay: i * 0.07 }}
                    className="rounded-3xl border border-[var(--line)] bg-[var(--sf)] p-7"
                  >
                    <h3 className="font-display text-[19px] font-bold">{t.t}</h3>
                    <p className="mt-2.5 text-[15.5px] leading-[1.6] text-[var(--ink2)]">{t.p}</p>
                  </motion.div>
                ))}
              </div>

              <motion.p
                {...rise}
                className="mx-auto mt-10 max-w-3xl rounded-2xl border border-[var(--line)] bg-[var(--pg)] p-5 text-center text-[14px] leading-[1.6] text-[var(--ink2)]"
              >
                <span className="font-semibold text-[var(--ink)]">Being straight with you:</span>{" "}
                seQRets is in beta. The code has been reviewed internally, but it
                has not yet had an independent third-party security audit.
              </motion.p>
            </div>
          </section>

          {/* ── CTA ───────────────────────────────────────────── */}
          <section className="px-6 py-24 md:py-32">
            <motion.div {...rise} className="mx-auto max-w-3xl text-center">
              <h2 className="font-display text-[34px] font-extrabold leading-[1.1] tracking-[-0.025em] md:text-[48px]">
                Start with something{" "}
                <br className="hidden md:inline" />
                that doesn&rsquo;t matter.
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-[17.5px] leading-[1.65] text-[var(--ink2)]">
                Lock up a note that says &ldquo;hello&rdquo;. Print the Qards.
                Get it back. Once you&rsquo;ve seen it work, do it with the
                thing that actually matters.
              </p>
              <a
                href="https://app.seqrets.app"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-10 inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-9 py-4.5 font-display text-[16px] font-semibold text-[var(--pg)] shadow-[shadow:var(--shadow-sm)] transition-transform hover:scale-[1.02]"
                style={{ paddingTop: "1.1rem", paddingBottom: "1.1rem" }}
              >
                Open the free app
                <ArrowRight className="h-[18px] w-[18px] transition-transform group-hover:translate-x-0.5" />
              </a>
              <p className="mt-5 text-[13.5px] text-[var(--ink3)]">
                No account. No card. Nothing to install.
              </p>
            </motion.div>
          </section>

        </main>

        <PreviewFooter />

        <ThemeToggle mode={mode} setMode={setMode} concept="A" />
      </div>
    </>
  );
};

export default PreviewLanding;
