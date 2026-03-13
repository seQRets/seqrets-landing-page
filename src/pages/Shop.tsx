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
  Mail,
  ShoppingBag,
  ShoppingCart,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import navbarIcon from "@/assets/navbar-icon.webp";
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
import WaitlistButton from "@/components/WaitlistButton";
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
      <span className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
        {product.tag}
      </span>
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
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
          <span className="font-display text-2xl font-bold text-foreground">
            {formatPrice(product.priceInCents)}
          </span>
          {!product.priceFinal && (
            <span className="ml-2 text-xs text-muted-foreground/60">
              or less
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
          <div onClick={(e) => e.stopPropagation()}>
            <WaitlistButton
              source={`shop-${product.slug}`}
              label="Join Waitlist"
              className="inline-flex items-center rounded-md bg-primary/20 px-4 py-2 text-xs font-semibold text-primary transition-all hover:bg-primary/30"
            />
          </div>
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
            <span className="font-display text-3xl font-bold text-foreground">
              {formatPrice(product.priceInCents)}
            </span>
            {!product.priceFinal && (
              <span className="ml-2 text-xs text-muted-foreground/60">
                or less
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
            <div onClick={(e) => e.stopPropagation()}>
              <WaitlistButton
                source={`shop-${product.slug}`}
                label="Join Waitlist"
                className="inline-flex items-center rounded-md bg-primary/20 px-5 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-primary/30"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Shop Page ───────────────────────────────────────────────────
const Shop = () => {
  const cart = useCart();
  const [modalProduct, setModalProduct] = useState<ProductInfo | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);

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

  return (
    <div className="min-h-screen bg-background">
      <PageHead
        title="Shop"
        description="Hardware, software, and kits to protect your crypto secrets. Smart cards, USB readers, bundles, and the seQRets Desktop App."
        path="/shop"
      />
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={navbarIcon}
              alt="seQRets"
              className="h-9 w-auto rounded-md"
            />
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <Link
              to="/"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Home
            </Link>

            {SHOP_LIVE ? (
              <button
                onClick={cart.toggleDrawer}
                className="relative inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
              >
                <ShoppingCart className="mr-1.5 h-3.5 w-3.5" />
                Cart
                {cart.totalItems > 0 && (
                  <span className="ml-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
                    {cart.totalItems}
                  </span>
                )}
              </button>
            ) : (
              <WaitlistButton
                source="shop-navbar"
                label="Join Waitlist"
                className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
              />
            )}
          </div>
        </div>
      </nav>

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
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/70 to-background" />
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
              <p className="mt-3 text-xs font-medium text-muted-foreground/40 tracking-wide">
                {Object.keys(PRODUCTS).length} products
              </p>
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
                  Want to know when the shop opens?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Join the waitlist and be the first to grab a bundle at
                  launch-day pricing.
                </p>
                <WaitlistButton
                  source="shop-bottom-cta"
                  label="Join the Waitlist"
                  className="inline-flex items-center rounded-md bg-primary px-8 py-3.5 font-display text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
                />
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
