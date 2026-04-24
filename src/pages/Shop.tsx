import { useEffect, useRef, useState, useCallback } from "react";
import {
  Monitor,
  Shield,
  Package,
  CreditCard,
  Layers,
  BookOpen,
  Flame,
  Lock,
  ShoppingBag,
  ShoppingCart,
  Check,
  Mail,
  Loader2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/landing/Navbar";
import {
  SHOP_LIVE,
  PRODUCTS,
  BUNDLES,
  ACCESSORIES,
  formatPrice,
  type ProductInfo,
  type ProductSlug,
} from "@/lib/stripe";
import { useCart } from "@/contexts/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";
import CartIcon from "@/components/cart/CartIcon";
import { joinWaitlist } from "@/lib/waitlist";
import PageHead from "@/components/PageHead";
import Footer from "@/components/landing/Footer";
import ProductModal from "@/components/shop/ProductModal";
import type { LucideIcon } from "lucide-react";

const slugIconMap: Record<ProductSlug, LucideIcon> = {
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

// ─── Product Card ────────────────────────────────────────────────
const ProductCard = ({
  product,
  onOpenDetail,
}: {
  product: ProductInfo;
  onOpenDetail: (product: ProductInfo) => void;
}) => {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const Icon = slugIconMap[product.slug];

  function handleAdd() {
    addItem(product.slug);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  }

  return (
    <div
      onClick={() => onOpenDetail(product)}
      className={`relative flex flex-col rounded-xl border p-6 transition-all hover:glow-border cursor-pointer ${
        product.highlight
          ? "border-primary/40 bg-warm-surface"
          : "border-border/50 bg-card/30"
      }`}
    >
      {product.badge && (
        <Badge className="absolute -top-2.5 right-4 font-display text-xs">
          {product.badge}
        </Badge>
      )}
      {product.image && (
        <div className="-mx-6 -mt-6 mb-4 overflow-hidden rounded-t-xl">
          <img
            src={product.image}
            alt={product.name}
            className="h-32 w-full object-cover"
            style={{ objectPosition: product.imagePosition || "center" }}
          />
        </div>
      )}
      <span className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
        {product.tag}
      </span>
      <div className="mb-4 flex items-center gap-3">
        {!product.image && (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        )}
        <h3 className="font-display text-lg font-bold text-foreground">
          {product.name}
        </h3>
      </div>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        {product.description}
      </p>
      <ul className="mb-6 flex-1 space-y-2">
        {product.features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-2 text-sm text-foreground/80"
          >
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            {f}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex items-center justify-between">
        <div>
          {SHOP_LIVE ? (
            <>
              <span className="font-display text-2xl font-bold text-foreground">
                {formatPrice(product.priceInCents)}
              </span>
              {!product.priceFinal && (
                <span className="ml-2 text-xs text-muted-foreground/60">
                  or less
                </span>
              )}
            </>
          ) : (
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Launch pricing TBA
            </span>
          )}
        </div>

        {SHOP_LIVE ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAdd();
            }}
            className="inline-flex items-center rounded-md bg-primary/20 px-4 py-2 text-xs font-semibold text-primary transition-all hover:bg-primary/30"
          >
            {justAdded ? (
              <>
                <Check className="mr-1.5 h-3.5 w-3.5" />
                Added!
              </>
            ) : (
              <>
                <ShoppingBag className="mr-1.5 h-3.5 w-3.5" />
                Add to Cart
              </>
            )}
          </button>
        ) : (
          <span className="inline-flex items-center rounded-md border border-primary/30 bg-primary/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
            Coming soon
          </span>
        )}
      </div>
    </div>
  );
};

// ─── Bundle Card (premium layout) ────────────────────────────────
const BundleCard = ({
  product,
  featured = false,
  onOpenDetail,
}: {
  product: ProductInfo;
  featured?: boolean;
  onOpenDetail: (product: ProductInfo) => void;
}) => {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const Icon = slugIconMap[product.slug];

  function handleAdd() {
    addItem(product.slug);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  }

  return (
    <div
      onClick={() => onOpenDetail(product)}
      className={`relative flex flex-col rounded-xl border-t-2 border border-t-primary/30 p-8 transition-all hover:glow-border cursor-pointer ${
        featured
          ? "md:flex-row md:items-center md:gap-10"
          : ""
      } ${
        product.highlight
          ? "border-primary/40 border-t-primary/50 bg-warm-surface"
          : "border-border/50 bg-card/30"
      }`}
    >
      {product.badge && (
        <Badge className="absolute -top-3 right-5 font-display text-xs">
          {product.badge}
        </Badge>
      )}

      {/* Visual area */}
      <div
        className={`mb-6 flex items-center justify-center ${
          featured
            ? "md:mb-0 md:w-1/4 md:shrink-0"
            : ""
        }`}
      >
        {product.image ? (
          <div className="h-36 w-full overflow-hidden rounded-2xl">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
            <Icon className="h-10 w-10 text-primary" />
          </div>
        )}
      </div>

      {/* Details */}
      <div className={`flex flex-1 flex-col ${featured ? "md:py-2" : ""}`}>
        <span className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
          {product.tag}
        </span>
        <h3 className="font-display text-xl font-bold text-foreground mb-2">
          {product.name}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>
        <ul className={`mb-6 flex-1 space-y-2 ${featured ? "md:columns-2 md:gap-x-8" : ""}`}>
          {product.features.map((f) => (
            <li
              key={f}
              className="flex items-start gap-2 text-sm text-foreground/80 break-inside-avoid"
            >
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {f}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center justify-between">
          <div>
            {SHOP_LIVE ? (
              <>
                <span className="font-display text-3xl font-bold text-foreground">
                  {formatPrice(product.priceInCents)}
                </span>
                {!product.priceFinal && (
                  <span className="ml-2 text-xs text-muted-foreground/60">
                    or less
                  </span>
                )}
              </>
            ) : (
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Launch pricing TBA
              </span>
            )}
          </div>

          {SHOP_LIVE ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAdd();
              }}
              className="inline-flex items-center rounded-md bg-primary/20 px-5 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-primary/30"
            >
              {justAdded ? (
                <>
                  <Check className="mr-1.5 h-4 w-4" />
                  Added!
                </>
              ) : (
                <>
                  <ShoppingBag className="mr-1.5 h-4 w-4" />
                  Add to Cart
                </>
              )}
            </button>
          ) : (
            <span className="inline-flex items-center rounded-md border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
              Coming soon
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Interest options for the consolidated waitlist form ─────────
const INTEREST_OPTIONS: { value: string; label: string }[] = [
  { value: "any", label: "Just let me know when anything ships" },
  { value: "desktop-app", label: "Desktop App + Inheritance Planner" },
  { value: "smartcards", label: "Smartcards & readers" },
  { value: "backup-bundle", label: "Starter / Backup Bundle" },
  { value: "inheritance-bundle", label: "Full Inheritance Kit" },
];

// ─── Shop Page ───────────────────────────────────────────────────
const Shop = () => {
  const cart = useCart();
  const [modalProduct, setModalProduct] = useState<ProductInfo | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);

  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistInterest, setWaitlistInterest] = useState("any");
  const [waitlistSubmitting, setWaitlistSubmitting] = useState(false);
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [waitlistError, setWaitlistError] = useState("");

  async function handleWaitlistSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = waitlistEmail.trim();
    if (
      !trimmed ||
      trimmed.length > 254 ||
      !/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(trimmed)
    )
      return;
    setWaitlistSubmitting(true);
    setWaitlistError("");
    const result = await joinWaitlist(trimmed, `shop-interest-${waitlistInterest}`);
    setWaitlistSubmitting(false);
    if (result.ok) setWaitlistSubmitted(true);
    else setWaitlistError(result.error || "Something went wrong");
  }

  const handleScroll = useCallback(() => {
    if (ticking.current) return;
    ticking.current = true;
    requestAnimationFrame(() => {
      if (heroRef.current && bgRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        // Only apply when hero is in/near viewport
        if (rect.bottom > 0) {
          const offset = window.scrollY * 0.45;
          bgRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
        }
      }
      ticking.current = false;
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // ─── Shared waitlist form (used in hero + bottom CTA) ─────────
  const waitlistForm = waitlistSubmitted ? (
    <div className="mx-auto max-w-md rounded-xl border border-primary/30 bg-primary/5 p-8 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/15">
        <Check className="h-6 w-6 text-primary" />
      </div>
      <h3 className="font-display text-lg font-bold text-foreground mb-2">
        You're on the list!
      </h3>
      <p className="text-sm text-muted-foreground">
        We'll email you as soon as it's available.
      </p>
    </div>
  ) : (
    <form
      onSubmit={handleWaitlistSubmit}
      className="mx-auto flex max-w-md flex-col gap-3 text-left"
    >
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
        Most interested in?
        <select
          value={waitlistInterest}
          onChange={(e) => setWaitlistInterest(e.target.value)}
          disabled={waitlistSubmitting}
          className="mt-1.5 w-full appearance-none rounded-md border border-border/50 bg-background bg-no-repeat py-3 pl-4 pr-12 text-sm font-normal normal-case tracking-normal text-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors disabled:opacity-50"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23a1a1aa' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",
            backgroundPosition: "right 1rem center",
            backgroundSize: "14px",
          }}
        >
          {INTEREST_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>
      <input
        type="email"
        required
        placeholder="you@example.com"
        value={waitlistEmail}
        onChange={(e) => setWaitlistEmail(e.target.value)}
        maxLength={255}
        disabled={waitlistSubmitting}
        className="w-full rounded-md border border-border/50 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors disabled:opacity-50"
      />
      {waitlistError && (
        <p className="text-xs text-red-400">{waitlistError}</p>
      )}
      <button
        type="submit"
        disabled={waitlistSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-8 py-3.5 font-display text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
      >
        {waitlistSubmitting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Mail className="h-4 w-4" />
        )}
        {waitlistSubmitting ? "Joining…" : "Join the Waitlist"}
      </button>
    </form>
  );

  return (
    <div className="min-h-screen bg-background">
      <PageHead
        title="Shop"
        description="Hardware, software, and kits to protect your crypto secrets. Smart cards, USB readers, bundles, and the seQRets Desktop App."
        path="/shop"
      />
      <Navbar />

      <main>
        {/* Coming Soon Banner — only shown when not live */}
        {!SHOP_LIVE && (
          <div className="pt-16">
            <div className="flex items-center justify-center gap-2 bg-primary/10 border-b border-primary/20 px-4 py-2.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="font-display text-sm font-semibold text-primary">
                Shop Coming Soon — Join the waitlist to get notified
              </span>
            </div>
          </div>
        )}

        {/* Hero — compact */}
        <section
          ref={heroRef}
          className={`relative py-16 md:py-24 overflow-hidden ${!SHOP_LIVE ? "" : "pt-28 md:pt-36"}`}
        >
          {/* Hero background image — parallax */}
          <div ref={bgRef} className="absolute inset-0 -top-[20%] -bottom-[20%] pointer-events-none will-change-transform">
            <img
              src="/Shop_hero.webp"
              alt=""
              className="h-full w-full scale-110 object-cover object-center blur-md"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/85 to-background" />
          </div>
          <div className="container relative mx-auto px-4 md:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-display text-3xl font-black md:text-4xl text-foreground mb-3">
                The seQRets Shop
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
                Hardware, software, and kits to protect your secrets — from
                everyday backups to generational inheritance.
              </p>
              {SHOP_LIVE ? (
                <p className="mt-3 text-xs font-medium text-muted-foreground/40 tracking-wide">
                  {Object.keys(PRODUCTS).length} products
                </p>
              ) : (
                <div className="mt-10">
                  <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-primary">
                    Be the first to know when it ships
                  </p>
                  {waitlistForm}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Bundles */}
        <section className="py-16 bg-section-warm">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="font-display text-3xl font-bold text-foreground mb-2">
              Bundles
            </h2>
            <p className="text-muted-foreground mb-10">
              Pick a tier that fits your threat model.
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              {BUNDLES.map((p) => (
                <BundleCard key={p.slug} product={p} onOpenDetail={setModalProduct} />
              ))}
            </div>
          </div>
        </section>

        {/* Individual Items */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="font-display text-3xl font-bold text-foreground mb-2">
              Individual Items
            </h2>
            <p className="text-muted-foreground mb-10">
              Already have some gear? Grab exactly what you need.
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {ACCESSORIES.map((p) => (
                <ProductCard key={p.slug} product={p} onOpenDetail={setModalProduct} />
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-20 bg-section-warm">
          <div className="container mx-auto px-4 md:px-8 text-center">
            {SHOP_LIVE ? (
              <>
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                  Ready to secure your secrets?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Add what you need to your cart and check out in seconds.
                </p>
                <button
                  onClick={cart.toggleDrawer}
                  className="inline-flex items-center rounded-md bg-primary px-8 py-3.5 font-display text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  View Cart
                </button>
              </>
            ) : (
              <>
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                  Still here? Get on the list.
                </h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  We'll email you the moment the shop ships — no spam, just a
                  single heads-up.
                </p>
                {waitlistForm}
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />

      {/* Product Detail Modal */}
      {modalProduct && (
        <ProductModal
          product={modalProduct}
          icon={slugIconMap[modalProduct.slug]}
          isOpen={modalProduct !== null}
          onClose={() => setModalProduct(null)}
        />
      )}

      {/* Cart UI — only rendered when shop is live */}
      {SHOP_LIVE && (
        <>
          <CartDrawer />
          <CartIcon />
        </>
      )}
    </div>
  );
};

export default Shop;
