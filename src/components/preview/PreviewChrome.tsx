import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";

/* ------------------------------------------------------------------ *
 * DESIGN PREVIEW — shared chrome
 *
 * Palette, brand mark, nav, footer and the light/dark switcher used by
 * the /preview pages. Nothing here touches global CSS: the palette is a
 * plain object applied as CSS custom properties on a wrapper element,
 * so the live site is unaffected.
 * ------------------------------------------------------------------ */

export type PreviewMode = "light" | "dark";

/**
 * Concept B palette — sampled directly from the seQRets desktop app
 * (src/assets/app-light.webp): #E6E0D9 window body, #FAF8F6 cards,
 * #1C1C1C ink, #C09024 accent gold.
 *
 * Tokens ending in -ink are the text colour that sits ON that fill, so
 * contrast holds in both themes. The gold-card-* values are identical in
 * light and dark on purpose: it is a brand surface, not a themed one.
 */
export const THEMES_APP = {
  light: {
    "--pg": "#F3F0EB",
    "--band": "#E6E0D9",
    "--sf": "#FAF8F6",
    "--ink": "#1C1C1C",
    "--ink2": "#6A645B",
    "--ink3": "#99928A",
    "--line": "#DBD4CA",
    "--gold": "#8A6510",
    "--gold2": "#C09024",
    "--gold-ink": "#FFFFFF",
    "--goldsoft": "#F3E8D4",
    "--pg-blur": "rgba(243,240,235,.85)",
    "--gold-line": "rgba(138,101,16,.38)",
    "--gold-fill": "rgba(138,101,16,.16)",
    "--deep": "#1C1C1C",
    "--deep-gold": "#D9A63C",
    "--deep-ink": "#F5F0E8",
    "--deep-ink2": "#A79D91",
    "--deep-sf": "rgba(255,255,255,.06)",
    "--deep-line": "rgba(255,255,255,.13)",
    "--deep-on": "rgba(245,240,232,.88)",
    "--deep-dim": "rgba(245,240,232,.16)",
    "--gold-card-a": "#C09024",
    "--gold-card-b": "#D9A63C",
    "--gold-card-ink": "#1C1C1C",
    "--gold-card-ink2": "rgba(28,28,28,.72)",
    "--gold-card-fill": "rgba(28,28,28,.14)",
    "--card-line": "transparent",
    "--shadow": "0 24px 60px -24px rgba(40,30,18,.28)",
    "--shadow-sm": "0 10px 30px -14px rgba(40,30,18,.22)",
    "--shadow-card": "0 40px 80px -32px rgba(40,30,18,.30), 0 12px 28px -18px rgba(40,30,18,.16)",
    /* drop-shadow() for alpha images — no spread, so keep the blur tight */
    "--card-drop": "0 22px 30px rgba(40,30,18,.34)",
  },
  dark: {
    "--pg": "#14120F",
    "--band": "#191512",
    "--sf": "#251F19",
    "--ink": "#F5F0E8",
    "--ink2": "#A59B8F",
    "--ink3": "#7C7266",
    "--line": "#332C24",
    "--gold": "#E0A93C",
    "--gold2": "#C09024",
    "--gold-ink": "#1C1C1C",
    "--goldsoft": "#2B2317",
    "--pg-blur": "rgba(20,18,15,.85)",
    "--gold-line": "rgba(224,169,60,.38)",
    "--gold-fill": "rgba(224,169,60,.16)",
    "--deep": "#0D0B09",
    "--deep-gold": "#D9A63C",
    "--deep-ink": "#F5F0E8",
    "--deep-ink2": "#A59B8F",
    "--deep-sf": "rgba(255,255,255,.06)",
    "--deep-line": "rgba(255,255,255,.12)",
    "--deep-on": "rgba(245,240,232,.88)",
    "--deep-dim": "rgba(245,240,232,.16)",
    "--gold-card-a": "#C09024",
    "--gold-card-b": "#D9A63C",
    "--gold-card-ink": "#1C1C1C",
    "--gold-card-ink2": "rgba(28,28,28,.72)",
    "--gold-card-fill": "rgba(28,28,28,.14)",
    "--card-line": "#3A322A",
    "--shadow": "0 24px 60px -24px rgba(0,0,0,.75)",
    "--shadow-sm": "0 10px 30px -14px rgba(0,0,0,.6)",
    /*
      One layer, and every number is load-bearing. A shadow drawn on --band
      only has as many 8-bit steps as --band sits above black, and --band is
      25. Stretch those ~19 steps too thin and they read as contour bands
      rather than a gradient — the two-layer 80px version this replaced put a
      visible ring every 5px, on top of a second falloff edge of its own.

      Two rules, both relying on the fact that a shadow's tail reaches roughly
      a full BLUR past its edge (not blur/2, which the spec's sigma suggests):

        offset > spread + blur   — or the tail leaks above the card's top edge
                                   (36 > 0 + 26). The offset is set by the
                                   blur, not by taste.
        band width = blur/levels — blur alone sets the ramp length, so reach
                                   is bought with offset and spread instead.

      This is the softest setting that stays clean at 25 levels; a wider,
      more diffuse falloff needs a lighter --band, not a different shadow.

      Net: ~62px below, ~26px at the sides, nothing above.
    */
    "--shadow-card": "0 36px 26px 0 rgba(0,0,0,.78)",
    /*
      Kept deliberately tight on dark: a wide black blur has nothing darker to
      fall on, so it smears across the app window behind the card as a halo
      instead of reading as a shadow. Short offset + small blur hugs the edge.
    */
    "--card-drop": "0 10px 14px rgba(0,0,0,.55)",
  },
} as const;

/** Shared reveal-on-scroll motion props. */
export const rise = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

export const Mark = ({ className = "h-8 w-8" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
    <path
      d="M11 7h30v25H21l-9 9 1-9h-2z"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export const PreviewNav = ({
  links,
  cta = { label: "Open the app", href: "https://app.seqrets.app" },
  secondary,
  ctaStyle = "ink",
}: {
  links: [string, string][];
  cta?: { label: string; href: string };
  /** Optional ghost link to the left of the CTA, as in the reference's "Login". */
  secondary?: [string, string];
  /** "ink" = near-black pill (Concept A), "accent" = filled accent (Concept B). */
  ctaStyle?: "ink" | "accent";
}) => (
  <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--pg-blur)] backdrop-blur-xl">
    <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-6">
      <Link to="/" className="flex items-center gap-2.5">
        <Mark className="h-7 w-7 text-[var(--ink)]" />
        <span className="font-display text-[21px] font-extrabold tracking-tight">seQRets</span>
      </Link>

      <nav className="hidden items-center gap-9 md:flex">
        {links.map(([label, href]) =>
          href.startsWith("#") ? (
            <a
              key={href}
              href={href}
              className="text-[15px] font-medium text-[var(--ink2)] transition-colors hover:text-[var(--ink)]"
            >
              {label}
            </a>
          ) : (
            <Link
              key={href}
              to={href}
              className="text-[15px] font-medium text-[var(--ink2)] transition-colors hover:text-[var(--ink)]"
            >
              {label}
            </Link>
          ),
        )}
      </nav>

      <div className="flex items-center gap-2">
        {secondary && (
          <Link
            to={secondary[1]}
            className="hidden rounded-lg px-4 py-2.5 text-[14px] font-semibold text-[var(--ink2)] transition-colors hover:text-[var(--ink)] sm:block"
          >
            {secondary[0]}
          </Link>
        )}
        <a
          href={cta.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`font-display text-[14px] font-semibold transition-transform hover:scale-[1.03] ${
            ctaStyle === "accent"
              ? "rounded-lg bg-[var(--gold)] px-5 py-2.5 text-[var(--gold-ink)]"
              : "rounded-full bg-[var(--ink)] px-5 py-2.5 text-[var(--pg)]"
          }`}
        >
          {cta.label}
        </a>
      </div>
    </div>
  </header>
);

export const PreviewFooter = () => (
  <footer className="border-t border-[var(--line)] bg-[var(--band)] px-6 py-14">
    <div className="mx-auto max-w-6xl">
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <Mark className="h-6 w-6 text-[var(--ink)]" />
            <span className="font-display text-[19px] font-extrabold tracking-tight">seQRets</span>
          </div>
          <p className="mt-4 max-w-[22rem] text-[14.5px] leading-[1.6] text-[var(--ink2)]">
            Secure. Split. Share. Open source, offline-first protection for the
            things you can&rsquo;t replace.
          </p>
        </div>

        {[
          { h: "Learn", links: [["How it works", "/how-it-works"], ["Features", "/features"], ["Security", "/security"], ["Blog", "/blog"]] },
          { h: "Docs", links: [["Documentation", "/docs"], ["FAQ", "/docs/faq"], ["Threat model", "/docs/threat-model"], ["Recovery tool", "/recover"]] },
          { h: "More", links: [["Shop", "/preview/shop"], ["Contact", "/contact"], ["Privacy", "/privacy"], ["Terms", "/terms"]] },
        ].map((col) => (
          <div key={col.h}>
            <p className="font-display text-[13px] font-bold uppercase tracking-[0.14em] text-[var(--ink3)]">
              {col.h}
            </p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map(([label, to]) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-[14.5px] text-[var(--ink2)] transition-colors hover:text-[var(--ink)]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-12 border-t border-[var(--line)] pt-7 text-[13px] text-[var(--ink3)]">
        © {new Date().getFullYear()} seQRets · AGPLv3 · Built for people who keep
        their own keys.
      </p>
    </div>
  </footer>
);

export const ThemeToggle = ({
  mode,
  setMode,
}: {
  mode: PreviewMode;
  setMode: (m: PreviewMode) => void;
}) => (
  <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--sf)] p-1.5 shadow-[shadow:var(--shadow)]">
    <span className="px-3 text-[12px] font-semibold uppercase tracking-wider text-[var(--ink3)]">
      Preview
    </span>
    {(["light", "dark"] as const).map((m) => (
      <button
        key={m}
        onClick={() => setMode(m)}
        className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[13px] font-semibold capitalize transition-colors ${
          mode === m
            ? "bg-[var(--ink)] text-[var(--pg)]"
            : "text-[var(--ink2)] hover:text-[var(--ink)]"
        }`}
      >
        {m === "light" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
        {m}
      </button>
    ))}
  </div>
);
