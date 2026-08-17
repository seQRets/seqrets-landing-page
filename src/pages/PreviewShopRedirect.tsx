import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Head } from "vite-react-ssg";

/* ------------------------------------------------------------------ *
 * /preview/shop → /shop
 *
 * The redesigned storefront lived here while it was a preview; it now
 * serves /shop, which is the URL the sitemap and llms.txt have always
 * published. This keeps previously shared preview links resolving
 * without two URLs serving the same storefront.
 *
 * The redirect runs on hydration rather than during prerender, so the
 * emitted HTML is this fallback — hence the noindex and the manual
 * link, which is all a reader without JS would see.
 * ------------------------------------------------------------------ */

const PreviewShopRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/shop", { replace: true });
  }, [navigate]);

  return (
    <>
      <Head>
        <title>Shop | seQRets</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://seqrets.app/shop" />
      </Head>
      <div className="flex min-h-screen items-center justify-center bg-[#14120F] px-6 text-center font-body text-[#F5F0E8] antialiased">
        <p className="text-[15px] text-[#A59B8F]">
          The shop moved to{" "}
          <Link to="/shop" className="text-[#E0A93C] underline">
            /shop
          </Link>
          .
        </p>
      </div>
    </>
  );
};

export default PreviewShopRedirect;
