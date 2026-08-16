import { useState, useEffect } from "react";
import { Head } from "vite-react-ssg";
import { motion } from "framer-motion";
import {
  Monitor,
  Shield,
  Package,
  CreditCard,
  Layers,
  BookOpen,
  Flame,
  Lock,
  Mail,
  Loader2,
  Check,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import {
  SHOP_LIVE,
  BUNDLES,
  ACCESSORIES,
  formatPrice,
  type ProductInfo,
  type ProductSlug,
} from "@/lib/stripe";
import { joinWaitlist } from "@/lib/waitlist";
import {
  THEMES_APP,
  rise,
  PreviewNav,
  PreviewFooter,
  ThemeToggle,
  type PreviewMode,
} from "@/components/preview/PreviewChrome";

import smartcard from "@/assets/smartcard-gold.webp";
import appLight from "@/assets/app-light.webp";
import qards from "@/assets/qr-qards.webp";

/* ------------------------------------------------------------------ *
 * DESIGN PREVIEW — /preview/shop
 *
 * The existing storefront, rebuilt in the new visual language. Same nine
 * products, same SHOP_LIVE gating; only the presentation changes.
 * ------------------------------------------------------------------ */

const ICONS: Record<ProductSlug, LucideIcon> = {
  "desktop-app": Monitor,
  "backup-bundle": Shield,
  "inheritance-bundle": Package,
  "smart-card": CreditCard,
  "smart-card-3pack": Layers,
  "usb-card-reader": Monitor,
  "tamper-evident-envelopes": Lock,
  "fireproof-case": Flame,
  "inheritance-guide": BookOpen,
};

/** Preview-only imagery, so cards aren't all icon tiles. */
const PREVIEW_IMAGES: Partial<Record<ProductSlug, string>> = {
  "desktop-app": appLight,
  "inheritance-bundle": qards,
  "smart-card": smartcard,
  "smart-card-3pack": smartcard,
};

const imageFor = (p: ProductInfo) => PREVIEW_IMAGES[p.slug] ?? p.image;

/* ── Price / status line ────────────────────────────────────────── */
const PriceLine = ({ product, big = false }: { product: ProductInfo; big?: boolean }) =>
  SHOP_LIVE ? (
    <span
      className={`font-display font-extrabold text-[var(--ink)] ${big ? "text-[28px]" : "text-[22px]"}`}
    >
      {formatPrice(product.priceInCents)}
      {!product.priceFinal && (
        <span className="ml-2 text-[12px] font-medium text-[var(--ink3)]">or less</span>
      )}
    </span>
  ) : (
    <span className="font-display text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--ink3)]">
      Pricing TBA
    </span>
  );

const StatusChip = () => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--gold-line)] bg-[var(--goldsoft)] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--gold)]">
    <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
    Coming soon
  </span>
);

/* ── Bundle card (large) ────────────────────────────────────────── */
const BundleCard = ({ product }: { product: ProductInfo }) => {
  const Icon = ICONS[product.slug];
  const img = imageFor(product);

  return (
    <div
      className={`flex h-full flex-col overflow-hidden rounded-[28px] border bg-[var(--sf)] transition-transform hover:-translate-y-1 ${
        product.highlight ? "border-[var(--gold-line)]" : "border-[var(--line)]"
      }`}
    >
      <div className="relative h-[168px] bg-[var(--band)]">
        {img ? (
          <img src={img} alt={product.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Icon className="h-14 w-14 text-[var(--gold)]" strokeWidth={1.4} />
          </div>
        )}
        {product.badge && (
          <span className="absolute right-4 top-4 rounded-full bg-[var(--ink)] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--pg)]">
            {product.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-7">
        <span className="font-display text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--gold)]">
          {product.tag}
        </span>
        <h3 className="mt-2.5 font-display text-[23px] font-bold tracking-[-0.01em]">
          {product.name}
        </h3>
        <p className="mt-3 text-[15px] leading-[1.6] text-[var(--ink2)]">{product.description}</p>

        <ul className="mt-6 flex-1 space-y-2.5">
          {product.features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-[14.5px] text-[var(--ink2)]">
              <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold)]" />
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex items-center justify-between border-t border-[var(--line)] pt-5">
          <PriceLine product={product} big />
          <StatusChip />
        </div>
      </div>
    </div>
  );
};

/* ── Accessory card (compact) ───────────────────────────────────── */
const AccessoryCard = ({ product }: { product: ProductInfo }) => {
  const Icon = ICONS[product.slug];
  const img = imageFor(product);

  return (
    <div className="flex gap-5 rounded-3xl border border-[var(--line)] bg-[var(--sf)] p-6 transition-transform hover:-translate-y-1">
      <div className="h-[92px] w-[92px] shrink-0 overflow-hidden rounded-2xl bg-[var(--band)]">
        {img ? (
          <img src={img} alt={product.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Icon className="h-8 w-8 text-[var(--gold)]" strokeWidth={1.5} />
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="font-display text-[11.5px] font-bold uppercase tracking-[0.16em] text-[var(--gold)]">
              {product.tag}
            </span>
            <h3 className="mt-1 font-display text-[18px] font-bold leading-tight">
              {product.name}
            </h3>
          </div>
          {product.badge && (
            <span className="shrink-0 rounded-full bg-[var(--goldsoft)] px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.08em] text-[var(--gold)]">
              {product.badge}
            </span>
          )}
        </div>

        <p className="mt-2 text-[14.5px] leading-[1.55] text-[var(--ink2)]">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-5">
          <PriceLine product={product} />
          <span className="text-[12px] font-medium text-[var(--ink3)]">
            {product.features.join(" · ")}
          </span>
        </div>
      </div>
    </div>
  );
};

/* ── Page ───────────────────────────────────────────────────────── */
const PreviewShop = () => {
  const [mode, setMode] = useState<PreviewMode>("dark");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("any");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = email.trim();
    if (
      !trimmed ||
      trimmed.length > 254 ||
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmed)
    )
      return;
    const honeypot =
      (e.currentTarget.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";
    setSubmitting(true);
    setError("");
    const result = await joinWaitlist(trimmed, `shop-interest-${interest}`, honeypot);
    setSubmitting(false);
    if (result.ok) setSubmitted(true);
    else setError(result.error || "Something went wrong");
  }

  const vars = { ...THEMES_APP[mode] } as React.CSSProperties;

  return (
    <>
      <Head>
        <title>Shop — Design Preview | seQRets</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div
        style={vars}
        className="min-h-screen bg-[var(--pg)] font-body text-[var(--ink)] antialiased transition-colors duration-300"
      >
        <PreviewNav
          links={[
            ["Bundles", "#bundles"],
            ["Individual items", "#items"],
            ["Back to landing", "/"],
          ]}
        />

        <main>
          {/* ── Hero ──────────────────────────────────────────── */}
          <section className="relative overflow-hidden px-6 pb-16 pt-16 md:pt-24">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-40 left-1/2 h-[440px] w-[820px] -translate-x-1/2 rounded-full opacity-25 blur-[110px] md:opacity-40"
              style={{ background: "radial-gradient(closest-side, var(--gold2), transparent)" }}
            />

            <motion.div
              className="relative mx-auto max-w-3xl text-center"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {!SHOP_LIVE && (
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--gold-line)] bg-[var(--goldsoft)] px-4 py-2 text-[13px] font-semibold text-[var(--gold)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
                  Not on sale yet — pricing to be announced
                </span>
              )}

              <h1 className="mt-6 font-display text-[40px] font-extrabold leading-[1.06] tracking-[-0.03em] md:text-[54px]">
                Something you can hold.
              </h1>

              <p className="mx-auto mt-6 max-w-xl text-[17.5px] leading-[1.65] text-[var(--ink2)]">
                The app is free and always will be. This is the hardware around
                it — cards, readers, and kits for people who&rsquo;d rather their
                backup survived a house fire than a hard drive.
              </p>

              <a
                href="#notify"
                className="mt-9 inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-7 py-4 font-display text-[15px] font-semibold text-[var(--pg)] shadow-[shadow:var(--shadow-sm)] transition-transform hover:scale-[1.02]"
              >
                Tell me when it ships
              </a>
            </motion.div>
          </section>

          {/* ── Bundles ───────────────────────────────────────── */}
          <section
            id="bundles"
            className="scroll-mt-20 border-t border-[var(--line)] bg-[var(--band)] px-6 py-20 md:py-24"
          >
            <div className="mx-auto max-w-6xl">
              <motion.div {...rise} className="max-w-2xl">
                <p className="font-display text-[13px] font-bold uppercase tracking-[0.18em] text-[var(--gold)]">
                  Bundles
                </p>
                <h2 className="mt-4 font-display text-[30px] font-extrabold leading-[1.14] tracking-[-0.02em] md:text-[40px]">
                  Start with a kit, not a shopping list.
                </h2>
                <p className="mt-5 text-[16.5px] leading-[1.6] text-[var(--ink2)]">
                  Three levels, depending on how much you&rsquo;re protecting and
                  how many people need to be able to reach it.
                </p>
              </motion.div>

              <div className="mt-12 grid gap-6 md:grid-cols-3">
                {BUNDLES.map((p, i) => (
                  <motion.div
                    key={p.slug}
                    {...rise}
                    transition={{ ...rise.transition, delay: i * 0.08 }}
                    className="h-full"
                  >
                    <BundleCard product={p} />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Individual items ──────────────────────────────── */}
          <section id="items" className="scroll-mt-20 px-6 py-20 md:py-24">
            <div className="mx-auto max-w-6xl">
              <motion.div {...rise} className="max-w-2xl">
                <p className="font-display text-[13px] font-bold uppercase tracking-[0.18em] text-[var(--gold)]">
                  Individual items
                </p>
                <h2 className="mt-4 font-display text-[30px] font-extrabold leading-[1.14] tracking-[-0.02em] md:text-[40px]">
                  Already have some of it?
                </h2>
                <p className="mt-5 text-[16.5px] leading-[1.6] text-[var(--ink2)]">
                  Everything in the bundles is also sold on its own.
                </p>
              </motion.div>

              <div className="mt-12 grid gap-5 lg:grid-cols-2">
                {ACCESSORIES.map((p, i) => (
                  <motion.div key={p.slug} {...rise} transition={{ ...rise.transition, delay: i * 0.06 }}>
                    <AccessoryCard product={p} />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Waitlist ──────────────────────────────────────── */}
          <section
            id="notify"
            className="scroll-mt-20 border-y border-[var(--line)] bg-[var(--band)] px-6 py-20 md:py-28"
          >
            <motion.div {...rise} className="mx-auto max-w-xl text-center">
              <h2 className="font-display text-[30px] font-extrabold leading-[1.12] tracking-[-0.02em] md:text-[40px]">
                One email, when it&rsquo;s real.
              </h2>
              <p className="mx-auto mt-5 max-w-md text-[16.5px] leading-[1.65] text-[var(--ink2)]">
                We&rsquo;ll write once, the day the shop opens. Nothing else, ever.
              </p>

              {submitted ? (
                <div className="mx-auto mt-10 max-w-md rounded-3xl border border-[var(--gold-line)] bg-[var(--goldsoft)] p-8">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--gold-fill)]">
                    <Check className="h-6 w-6 text-[var(--gold)]" />
                  </div>
                  <h3 className="mt-4 font-display text-[19px] font-bold">You&rsquo;re on the list.</h3>
                  <p className="mt-2 text-[15px] text-[var(--ink2)]">
                    We&rsquo;ll email you as soon as it&rsquo;s available.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-md space-y-3 text-left">
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: "-9999px",
                      width: "1px",
                      height: "1px",
                      overflow: "hidden",
                    }}
                  >
                    <label>
                      Website
                      <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
                    </label>
                  </div>

                  <select
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    disabled={submitting}
                    className="w-full rounded-2xl border border-[var(--line)] bg-[var(--sf)] px-5 py-4 text-[15px] text-[var(--ink)] outline-none transition-colors focus:border-[var(--gold)] disabled:opacity-50"
                  >
                    <option value="any">Just let me know when anything ships</option>
                    <option value="desktop-app">Desktop app + inheritance planner</option>
                    <option value="smartcards">Smart cards &amp; readers</option>
                    <option value="backup-bundle">Backup bundle</option>
                    <option value="inheritance-bundle">Full inheritance kit</option>
                  </select>

                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    maxLength={255}
                    disabled={submitting}
                    className="w-full rounded-2xl border border-[var(--line)] bg-[var(--sf)] px-5 py-4 text-[15px] text-[var(--ink)] outline-none transition-colors placeholder:text-[var(--ink3)] focus:border-[var(--gold)] disabled:opacity-50"
                  />

                  {error && <p className="text-[13px] text-red-400">{error}</p>}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--ink)] px-7 py-4 font-display text-[15px] font-semibold text-[var(--pg)] transition-transform hover:scale-[1.01] disabled:opacity-50"
                  >
                    {submitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Mail className="h-4 w-4" />
                    )}
                    {submitting ? "Joining…" : "Join the waitlist"}
                  </button>
                </form>
              )}
            </motion.div>
          </section>
        </main>

        <PreviewFooter />
        <ThemeToggle mode={mode} setMode={setMode} />
      </div>
    </>
  );
};

export default PreviewShop;
