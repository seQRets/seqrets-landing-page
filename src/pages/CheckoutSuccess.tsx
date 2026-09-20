import { useEffect } from "react";
import { CircleCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Head } from "vite-react-ssg";
import { useCart } from "@/contexts/CartContext";
import { PreviewPage } from "@/components/preview/PreviewChrome";

/* ------------------------------------------------------------------ *
 * /checkout/success — the Stripe return page.
 *
 * Chrome and theming come from PreviewPage, which also gives someone
 * who has just paid somewhere to go other than a single button.
 *
 * The success mark is gold rather than green: the palette has no green,
 * and the heading already says what happened. Noindex because a
 * transactional return page has no business in a search result.
 * ------------------------------------------------------------------ */

export default function CheckoutSuccess() {
  const { clearCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
    clearCart();
  }, [clearCart]);

  return (
    <PreviewPage>
      <Head>
        <title>Payment successful | seQRets</title>
        <meta name="robots" content="noindex" />
      </Head>

      <section className="flex min-h-[68vh] items-center justify-center px-6 py-20">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--gold-fill)]">
            <CircleCheck className="h-8 w-8 text-[var(--gold)]" />
          </div>

          <h1 className="mt-6 font-display text-[30px] font-bold tracking-[-0.03em] md:text-[36px]">
            Payment successful
          </h1>

          <p className="mt-4 text-[15.5px] leading-[1.7] text-[var(--ink2)]">
            Thank you for your purchase. You&rsquo;ll receive a confirmation
            email shortly with your order details.
          </p>

          <div className="mt-9 flex flex-col items-center gap-4">
            <Link
              to="/shop"
              className="inline-flex items-center rounded-[10px] bg-[var(--gold)] px-6 py-3.5 font-display text-[14px] font-semibold text-[var(--gold-ink)] transition-transform hover:scale-[1.02]"
            >
              Back to the shop
            </Link>
            <Link
              to="/"
              className="text-[14px] text-[var(--ink3)] transition-colors hover:text-[var(--ink)]"
            >
              Go home
            </Link>
          </div>
        </div>
      </section>
    </PreviewPage>
  );
}
