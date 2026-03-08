import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, Loader2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import {
  PRODUCTS,
  formatPrice,
  createCheckoutSession,
} from "@/lib/stripe";

export default function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    totalPrice,
    setDrawerOpen,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setError(null);
    setIsCheckingOut(true);
    try {
      const lineItems = items.map((item) => ({
        price: PRODUCTS[item.slug].priceId,
        quantity: item.quantity,
      }));
      const url = await createCheckoutSession(lineItems);
      window.location.href = url;
    } catch {
      setError("Something went wrong. Please try again.");
      setIsCheckingOut(false);
    }
  }

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border/50 bg-background shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/50 px-6 py-4">
              <h2 className="font-display text-lg font-bold text-foreground">
                Your Cart
              </h2>
              <button
                onClick={() => setDrawerOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-card/50 hover:text-foreground"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                <p className="text-muted-foreground">Your cart is empty.</p>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                {/* Item List */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <ul className="space-y-4">
                    {items.map((item) => {
                      const product = PRODUCTS[item.slug];
                      return (
                        <li
                          key={item.slug}
                          className="flex items-start gap-4 rounded-lg border border-border/30 bg-card/20 p-4"
                        >
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-foreground truncate">
                              {product.name}
                            </h3>
                            <p className="mt-0.5 text-xs text-muted-foreground">
                              {formatPrice(product.priceInCents)} each
                            </p>

                            {/* Quantity controls */}
                            <div className="mt-2 flex items-center gap-2">
                              <button
                                onClick={() =>
                                  updateQuantity(item.slug, item.quantity - 1)
                                }
                                className="flex h-7 w-7 items-center justify-center rounded-md border border-border/40 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="w-6 text-center text-sm font-medium text-foreground">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.slug, item.quantity + 1)
                                }
                                className="flex h-7 w-7 items-center justify-center rounded-md border border-border/40 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground"
                                aria-label="Increase quantity"
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-2">
                            <span className="text-sm font-bold text-foreground">
                              {formatPrice(
                                product.priceInCents * item.quantity,
                              )}
                            </span>
                            <button
                              onClick={() => removeItem(item.slug)}
                              className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                              aria-label={`Remove ${product.name}`}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Footer */}
                <div className="border-t border-border/50 px-6 py-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Subtotal
                    </span>
                    <span className="font-display text-lg font-bold text-foreground">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>

                  {error && (
                    <p className="text-xs text-destructive">{error}</p>
                  )}

                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="flex w-full items-center justify-center rounded-md bg-primary px-6 py-3 font-display text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {isCheckingOut ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Redirecting...
                      </>
                    ) : (
                      "Checkout"
                    )}
                  </button>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setDrawerOpen(false)}
                      className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Continue Shopping
                    </button>
                    <button
                      onClick={clearCart}
                      className="text-xs text-muted-foreground transition-colors hover:text-destructive"
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
