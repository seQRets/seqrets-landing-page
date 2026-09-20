import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Head } from "vite-react-ssg";
import { THEMES_APP } from "@/components/preview/PreviewChrome";
import notFoundBg from "@/assets/404-bg.webp";

/* ------------------------------------------------------------------ *
 * 404.
 *
 * The page is a full-bleed photograph, so it stays dark in both themes
 * for the same reason the /features and /blog heroes do — fading a dark
 * photo into the cream background reads as mud. It carries the dark
 * palette on the wrapper rather than inheriting one, because the catch
 * all route renders outside PreviewPage and every var() would otherwise
 * collapse.
 *
 * Note this component only renders on client-side navigation to a bad
 * route: the build emits no 404.html, so a cold hit on an unknown URL
 * gets the host's own error page instead of this one.
 * ------------------------------------------------------------------ */

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.warn("404: No route matches", location.pathname);
    }
  }, [location.pathname]);

  return (
    <>
      <Head>
        <title>Page not found | seQRets</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div
        style={
          {
            ...THEMES_APP.dark,
            backgroundImage: `url(${notFoundBg})`,
          } as React.CSSProperties
        }
        className="relative flex min-h-screen flex-col items-center justify-end bg-cover bg-center px-6 pb-16 text-center font-body antialiased"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-[10px] bg-[var(--gold)] px-8 py-4 font-display text-[15px] font-semibold text-[var(--gold-ink)] shadow-[shadow:var(--shadow)] transition-transform hover:scale-[1.02]"
        >
          Ooops! Get Me Outa Here!
        </Link>
      </div>
    </>
  );
};

export default NotFound;
