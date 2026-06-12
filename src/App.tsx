import { Outlet } from "react-router-dom";
import { Head } from "vite-react-ssg";
import type { RouteRecord } from "vite-react-ssg";
import { CartProvider } from "./contexts/CartContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { BLOG_POSTS } from "./lib/blog";

const DEFAULT_TITLE = "seQRets — Secure. Split. Share.";
const DEFAULT_DESC =
  "Encrypt & split your secrets into QR codes using Shamir's Secret Sharing. Zero-knowledge crypto inheritance for Bitcoin seed phrases.";

/**
 * Cart wrapper — on the server the provider is skipped (localStorage
 * doesn't exist) but `loadCart()` already returns [] for SSR, so we
 * can safely render the provider on both sides.  The `typeof window`
 * guard in CartContext handles the localStorage access.
 */

/** Root layout — wraps every route with providers and default meta */
function RootLayout() {
  return (
    <ErrorBoundary>
      <Head>
        <title>{DEFAULT_TITLE}</title>
        <meta name="description" content={DEFAULT_DESC} />
        <meta property="og:title" content={DEFAULT_TITLE} />
        <meta property="og:description" content={DEFAULT_DESC} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://seqrets.app" />
        <meta property="og:image" content="https://seqrets.app/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="seQRets" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={DEFAULT_TITLE} />
        <meta name="twitter:description" content={DEFAULT_DESC} />
        <meta name="twitter:image" content="https://seqrets.app/og-image.png" />
        <link rel="canonical" href="https://seqrets.app" />
      </Head>
      <CartProvider>
        <Outlet />
      </CartProvider>
    </ErrorBoundary>
  );
}

/**
 * vite-react-ssg route records expect `lazy` to return `{ Component }`,
 * but React.lazy() / dynamic imports return `{ default }`. This adapter
 * bridges the two so we can use standard `() => import("./Page")` syntax.
 */
const lazy = (load: () => Promise<{ default: React.ComponentType }>) =>
  () => load().then((m) => ({ Component: m.default }));

const routes: RouteRecord[] = [
  {
    path: "/",
    Component: RootLayout,
    children: [
      // ── Landing ────────────────────────────────────────
      { index: true, Component: Index },
      { path: "how-it-works", lazy: lazy(() => import("./pages/HowItWorksPage")) },
      { path: "features", lazy: lazy(() => import("./pages/FeaturesPage")) },
      { path: "security", lazy: lazy(() => import("./pages/SecurityPage")) },
      { path: "privacy", lazy: lazy(() => import("./pages/PrivacyPolicy")) },
      { path: "terms", lazy: lazy(() => import("./pages/TermsOfService")) },
      { path: "pgp", lazy: lazy(() => import("./pages/PgpPage")) },
      { path: "contact", lazy: lazy(() => import("./pages/ContactPage")) },
      { path: "recover", lazy: lazy(() => import("./pages/RecoverPage")) },

      // ── Blog ───────────────────────────────────────────
      { path: "blog", lazy: lazy(() => import("./pages/BlogPage")) },
      {
        path: "blog/:slug",
        lazy: lazy(() => import("./pages/BlogPostPage")),
        getStaticPaths: () => BLOG_POSTS.map((p) => `blog/${p.slug}`),
      },

      // ── Docs ───────────────────────────────────────────
      {
        path: "docs",
        lazy: lazy(() => import("./components/docs/DocsLayout")),
        children: [
          { index: true, lazy: lazy(() => import("./pages/docs/DocsHub")) },
          { path: "technical", lazy: lazy(() => import("./pages/docs/DocsTechnical")) },
          { path: "inheritance", lazy: lazy(() => import("./pages/docs/DocsInheritance")) },
          { path: "threat-model", lazy: lazy(() => import("./pages/docs/DocsThreatModel")) },
          { path: "products", lazy: lazy(() => import("./pages/docs/DocsProducts")) },
          { path: "faq", lazy: lazy(() => import("./pages/docs/DocsFaq")) },
        ],
      },

      // ── Shop / Checkout (client-only, not prerendered) ─
      { path: "shop", lazy: lazy(() => import("./pages/Shop")) },
      { path: "checkout/success", lazy: lazy(() => import("./pages/CheckoutSuccess")) },
      { path: "checkout/cancel", lazy: lazy(() => import("./pages/CheckoutCancel")) },

      // ── Admin (client-only) ────────────────────────────
      { path: "admin", lazy: lazy(() => import("./pages/AdminPage")) },

      // ── 404 ────────────────────────────────────────────
      { path: "*", Component: NotFound },
    ],
  },
];

export default routes;
