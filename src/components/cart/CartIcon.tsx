import { ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";

export default function CartIcon() {
  const { totalItems, toggleDrawer } = useCart();

  if (totalItems === 0) return null;

  return (
    <button
      onClick={toggleDrawer}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)]"
      aria-label={`Shopping cart with ${totalItems} item${totalItems === 1 ? "" : "s"}`}
    >
      <ShoppingCart className="h-6 w-6" />
      <AnimatePresence mode="popLayout">
        <motion.span
          key={totalItems}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background"
        >
          {totalItems}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
