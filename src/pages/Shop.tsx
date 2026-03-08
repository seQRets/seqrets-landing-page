import { useEffect, useState } from "react";
import {
  Monitor,
  Shield,
  Package,
  CreditCard,
  BookOpen,
  Flame,
  Lock,
  Mail,
  Store,
  ShoppingBag,
  ShoppingCart,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import navbarIcon from "@/assets/navbar-icon.webp";
import smartcardSilver from "@/assets/smartcard-silver.webp";
import {
  SHOP_LIVE,
  BUNDLES,
  ACCESSORIES,
  formatPrice,
  type ProductInfo,
  type ProductSlug,
} from "@/lib/stripe";
import { useCart } from "@/contexts/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";
import CartIcon from "@/components/cart/CartIcon";
import type { LucideIcon } from "lucide-react";

const slugIconMap: Record<ProductSlug, LucideIcon> = {
  "desktop-app": Monitor,
  "backup-bundle": Shield,
  "inheritance-bundle": Package,
  "smart-card": CreditCard,
  "usb-card-reader": Monitor,
  "tamper-evident-envelopes": Lock,
  "fireproof-case": Flame,
  "inheritance-guide": BookOpen,
};

// ─── Product Card ────────────────────────────────────────────────
const ProductCard = ({ product }: { product: ProductInfo }) => {
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
      className={`relative flex flex-col rounded-xl border p-6 transition-all hover:glow-border ${
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
        <span className="font-display text-2xl font-bold text-foreground">
          {formatPrice(product.priceInCents)}
        </span>

        {SHOP_LIVE ? (
          <button
            onClick={handleAdd}
            className="inline-flex items-center rounded-full bg-primary/20 px-4 py-2 text-xs font-semibold text-primary transition-all hover:bg-primary/30"
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
          <a
            href={`mailto:hello@seqrets.app?subject=Waitlist%3A%20${encodeURIComponent(product.name)}&body=Hi%2C%20I'm%20interested%20in%20the%20${encodeURIComponent(product.name)}.%20Please%20notify%20me%20when%20it's%20available.%20Thanks!`}
            className="inline-flex items-center rounded-full bg-primary/20 px-4 py-2 text-xs font-semibold text-primary transition-all hover:bg-primary/30"
          >
            <Mail className="mr-1.5 h-3.5 w-3.5" />
            Join Waitlist
          </a>
        )}
      </div>
    </div>
  );
};

// ─── Shop Page ───────────────────────────────────────────────────
const Shop = () => {
  const cart = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
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
              <a
                href="mailto:hello@seqrets.app?subject=seQRets%20Shop%20Waitlist&body=Hi%2C%20please%20notify%20me%20when%20the%20seQRets%20shop%20opens.%20Thanks!"
                className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
              >
                <Mail className="mr-1.5 h-3.5 w-3.5" />
                Join Waitlist
              </a>
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

        {/* Hero */}
        <section
          className={`relative py-24 md:py-32 overflow-hidden ${!SHOP_LIVE ? "" : "pt-40 md:pt-48"}`}
        >
          {/* Background glow effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-primary/5 blur-[100px]" />
            <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-warm-muted/5 blur-[80px]" />
          </div>
          <div className="container relative mx-auto px-4 md:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
                <Store className="h-7 w-7 text-primary" />
              </div>
              <h1 className="font-display text-4xl font-black md:text-5xl text-foreground mb-5">
                The seQRets Shop
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
                Hardware, software, and kits to protect your secrets — from
                everyday backups to generational inheritance.
              </p>
            </div>
            <div className="mt-12 flex justify-center">
              <img
                src={smartcardSilver}
                alt="seQRets branded smart card"
                className="w-72 md:w-96 drop-shadow-2xl rounded-xl"
              />
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
                <ProductCard key={p.slug} product={p} />
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
                <ProductCard key={p.slug} product={p} />
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
                  className="inline-flex items-center rounded-full bg-primary px-8 py-3.5 font-display text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)]"
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
                <a
                  href="mailto:hello@seqrets.app?subject=seQRets%20Shop%20Waitlist&body=Hi%2C%20please%20notify%20me%20when%20the%20seQRets%20shop%20opens.%20Thanks!"
                  className="inline-flex items-center rounded-full bg-primary px-8 py-3.5 font-display text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)]"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Join the Waitlist
                </a>
              </>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4 md:px-8 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} seQRets · Open-source under AGPLv3
        </div>
      </footer>

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
