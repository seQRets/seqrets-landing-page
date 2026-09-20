import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Head } from "vite-react-ssg";
import { PreviewPage } from "@/components/preview/PreviewChrome";

/* ------------------------------------------------------------------ *
 * /checkout/cancel — the Stripe return page for an abandoned session.
 *
 * Same shape as its success twin, and noindex for the same reason.
 * ------------------------------------------------------------------ */

export default function CheckoutCancel() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PreviewPage>
      <Head>
        <title>Checkout cancelled | seQRets</title>
        <meta name="robots" content="noindex" />
      </Head>

      <section className="flex min-h-[68vh] items-center justify-center px-6 py-20">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--gold-fill)]">
            <ArrowLeft className="h-8 w-8 text-[var(--gold)]" />
          </div>

          <h1 className="mt-6 font-display text-[30px] font-bold tracking-[-0.03em] md:text-[36px]">
            Checkout cancelled
          </h1>

          <p className="mt-4 text-[15.5px] leading-[1.7] text-[var(--ink2)]">
            Your cart is still saved. Come back when you&rsquo;re ready.
          </p>

          <div className="mt-9 flex flex-col items-center gap-4">
            <Link
              to="/shop"
              className="inline-flex items-center rounded-[10px] bg-[var(--gold)] px-6 py-3.5 font-display text-[14px] font-semibold text-[var(--gold-ink)] transition-transform hover:scale-[1.02]"
            >
              Return to the shop
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
