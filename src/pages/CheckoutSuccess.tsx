import { useEffect } from "react";
import { CircleCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

export default function CheckoutSuccess() {
  const { clearCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
    clearCart();
  }, [clearCart]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
          <CircleCheck className="h-8 w-8 text-green-500" />
        </div>
        <h1 className="font-display text-3xl font-bold text-foreground mb-3">
          Payment Successful!
        </h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Thank you for your purchase. You'll receive a confirmation email
          shortly with your order details.
        </p>
        <div className="flex flex-col items-center gap-3">
          <Link
            to="/shop"
            className="inline-flex items-center rounded-md bg-primary px-6 py-3 font-display text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
          >
            Back to Shop
          </Link>
          <Link
            to="/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
