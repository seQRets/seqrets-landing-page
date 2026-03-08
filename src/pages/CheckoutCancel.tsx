import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function CheckoutCancel() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <ArrowLeft className="h-8 w-8 text-primary" />
        </div>
        <h1 className="font-display text-3xl font-bold text-foreground mb-3">
          Checkout Cancelled
        </h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Your cart is still saved. Come back when you're ready.
        </p>
        <div className="flex flex-col items-center gap-3">
          <Link
            to="/shop"
            className="inline-flex items-center rounded-md bg-primary px-6 py-3 font-display text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
          >
            Return to Shop
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
