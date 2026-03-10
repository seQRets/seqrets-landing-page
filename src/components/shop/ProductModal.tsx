import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Minus, Plus, ShoppingBag } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ProductInfo, ProductSlug } from "@/lib/stripe";
import {
  SHOP_LIVE,
  PRODUCTS,
  BUNDLE_CONTENTS,
  formatPrice,
} from "@/lib/stripe";
import { useCart } from "@/contexts/CartContext";
import WaitlistButton from "@/components/WaitlistButton";

interface ProductModalProps {
  product: ProductInfo;
  icon: LucideIcon;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({
  product,
  icon: Icon,
  isOpen,
  onClose,
}: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const { addItemBulk } = useCart();

  // Reset quantity when product changes
  useEffect(() => {
    setQuantity(1);
    setJustAdded(false);
  }, [product.slug]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Escape key to close
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const bundleItems = BUNDLE_CONTENTS[product.slug];

  function handleAddToCart() {
    addItemBulk(product.slug, quantity);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 800);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Centered container */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-2xl rounded-2xl border border-border/40 bg-card shadow-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={product.name}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground/40 hover:bg-card/50 hover:text-muted-foreground transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex flex-col md:flex-row">
                {/* Left column: product visual */}
                <div className="flex items-center justify-center bg-background/50 p-8 md:w-2/5 md:p-12">
                  <div className="flex h-32 w-32 items-center justify-center rounded-2xl bg-primary/10">
                    <Icon className="h-16 w-16 text-primary" />
                  </div>
                </div>

                {/* Right column: details */}
                <div className="flex flex-1 flex-col max-h-[70vh]">
                  {/* Scrollable content */}
                  <div className="flex-1 overflow-y-auto p-6 md:p-8 md:pb-0">
                    {/* Badge */}
                    {product.badge && (
                      <span className="mb-2 inline-block rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-semibold text-primary">
                        {product.badge}
                      </span>
                    )}

                    {/* Name */}
                    <h2 className="font-display text-2xl font-bold text-foreground mb-1.5">
                      {product.name}
                    </h2>

                    {/* Description */}
                    <p className="text-sm leading-relaxed text-muted-foreground mb-4">
                      {product.description}
                    </p>

                    {/* Features */}
                    <div className="mb-4">
                      <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 mb-2">
                        Features
                      </h4>
                      <ul className="space-y-1.5">
                        {product.features.map((f) => (
                          <li
                            key={f}
                            className="flex items-start gap-2 text-sm text-foreground/80"
                          >
                            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bundle contents */}
                    {bundleItems && bundleItems.length > 0 && (
                      <div className="mb-4 rounded-lg border border-border/30 bg-background/50 p-3">
                        <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 mb-2">
                          What's Included
                        </h4>
                        <ul className="space-y-1">
                          {bundleItems.map(
                            ({ slug, qty }: { slug: ProductSlug; qty: number }) => {
                              const item = PRODUCTS[slug];
                              return (
                                <li
                                  key={slug}
                                  className="flex items-center justify-between text-sm"
                                >
                                  <span className="text-foreground/80">
                                    {qty > 1 ? `${qty}\u00D7 ` : ""}
                                    {item.name}
                                  </span>
                                  <span className="text-muted-foreground/60">
                                    {formatPrice(item.priceInCents * qty)}
                                  </span>
                                </li>
                              );
                            },
                          )}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Pinned footer: price + action button */}
                  <div className="shrink-0 border-t border-border/20 p-6 md:px-8 md:py-5">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="font-display text-2xl font-bold text-foreground">
                          {formatPrice(product.priceInCents * quantity)}
                        </span>
                        {!product.priceFinal && (
                          <span className="ml-2 text-sm text-muted-foreground/60">
                            or less
                          </span>
                        )}
                        {quantity > 1 && (
                          <span className="ml-2 text-xs text-muted-foreground/40">
                            ({formatPrice(product.priceInCents)} each)
                          </span>
                        )}
                      </div>

                      {/* Quantity selector (only when shop is live) */}
                      {SHOP_LIVE && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Qty</span>
                          <div className="flex items-center">
                            <button
                              onClick={() =>
                                setQuantity(Math.max(1, quantity - 1))
                              }
                              disabled={quantity <= 1}
                              className="flex h-8 w-8 items-center justify-center rounded-l-md border border-border/40 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground disabled:opacity-30 disabled:pointer-events-none"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="flex h-8 w-9 items-center justify-center border-y border-border/40 text-sm font-medium text-foreground">
                              {quantity}
                            </span>
                            <button
                              onClick={() =>
                                setQuantity(Math.min(10, quantity + 1))
                              }
                              disabled={quantity >= 10}
                              className="flex h-8 w-8 items-center justify-center rounded-r-md border border-border/40 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground disabled:opacity-30 disabled:pointer-events-none"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action button */}
                    {SHOP_LIVE ? (
                      <button
                        onClick={handleAddToCart}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 font-display text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
                      >
                        {justAdded ? (
                          <>
                            <Check className="h-4 w-4" />
                            Added to Cart!
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="h-4 w-4" />
                            Add to Cart
                            {quantity > 1 ? ` (${quantity})` : ""}
                          </>
                        )}
                      </button>
                    ) : (
                      <WaitlistButton
                        source={`shop-modal-${product.slug}`}
                        label="Join Waitlist"
                        className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 font-display text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
                      />
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
