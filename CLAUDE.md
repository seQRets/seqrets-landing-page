# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Marketing and landing page site for [seQRets](https://seqrets.app) — a zero-knowledge cryptographic app for securing, splitting, and sharing secrets. This is the public-facing website (seqrets.app), separate from the main app repo. Licensed under AGPLv3.

## Build & Development Commands

```bash
npm install
npm run dev          # Vite dev server on http://localhost:8080
npm run build        # SSG prerender to dist/ + inject CSP hashes for inline scripts
npm run build:dev    # Dev-mode build (no SSG)
npm run preview      # Preview production build locally
npm run lint         # ESLint
npm run test         # Vitest (single run; --passWithNoTests, no test files yet)
npm run test:watch   # Vitest in watch mode
```

`npm run build` is `vite-react-ssg build && node scripts/inject-csp-hashes.mjs`. The post-build script walks every emitted HTML file, hashes any inline `<script>` blocks, and rewrites the CSP `<meta>` tag in each page so the strict CSP doesn't block them.

## Architecture

**Stack:** React 18 + TypeScript + Vite + `vite-react-ssg` + Tailwind CSS 3 + Framer Motion + react-router-dom v6

**Pre-rendered SSG, not a SPA.** Build emits one static HTML file per route (~27 pages including all blog posts). Each page hydrates client-side after load. Cloudflare Pages serves the static files directly; SPA-style fallback isn't needed because every route has its own HTML.

**Entry points:**
- `src/main.tsx` — instantiates `ViteReactSSG` and hands it the route records from App.tsx
- `src/App.tsx` — exports `routes: RouteRecord[]` (not a default `<App />` component). Top-level layout wraps everything in `CartProvider` + `ErrorBoundary`. Non-index routes use `lazy: lazy(() => import(...))` for code-splitting. Blog post routes are generated dynamically from `BLOG_POSTS` in `src/lib/blog.ts`.

**Deployment:** Static build (`dist/`) deployed to Cloudflare Pages (project: `seqrets-landing-page`). Custom domain: seqrets.app (DNS managed at Cloudflare; the legacy `public/CNAME` file has been removed). Security headers configured in `public/_headers`.

### Key Directories

- `src/pages/` — Route-level page components: Index, HowItWorksPage, FeaturesPage, SecurityPage, RecoverPage, BlogPage, BlogPostPage, Shop, CheckoutSuccess, CheckoutCancel, PrivacyPolicy, TermsOfService, PgpPage, AdminPage, NotFound, plus `docs/*` (DocsHub, DocsTechnical, DocsInheritance, DocsThreatModel, DocsProducts, DocsFaq)
- `src/components/landing/` — Landing page sections: Navbar, HeroSection, HowItWorks, HowItWorksAnimations, FeaturesGrid, ExploreTiles, SecuritySection, ComparisonTable, DesktopCTA, OpenSource, Footer
- `src/components/docs/` — Docs layout (DocsLayout), sidebar (DocsSidebar), breadcrumbs, FAQ accordion, and `DocsNav.ts` (sidebar tree definition); `DocsHead` for per-docs-page meta
- `src/components/cart/` — Shopping cart drawer and icon
- `src/components/shop/` — Product modal
- `src/components/ui/` — Lightweight UI primitives: shadcn-style `button`/`badge` plus `TechnicalDetails` (collapsible disclosure used on FeaturesPage to hide deeper technical content behind "Show technical details")
- `src/components/` (top-level) — `ErrorBoundary` (in-tree fallback), `PageHead` (per-page meta, used outside docs), `WaitlistButton`
- `src/lib/` — Utilities: `stripe.ts` (product catalog + checkout), `blog.ts` (blog posts as inline data), `waitlist.ts`, `utils.ts`
- `src/contexts/CartContext.tsx` — Cart state (useReducer + localStorage persistence)
- `scripts/inject-csp-hashes.mjs` — Post-build script that hashes inline `<script>` blocks and updates the CSP meta tag in every emitted HTML file
- `workers/` — Cloudflare Workers: `create-checkout` (Stripe Checkout sessions) and `waitlist` (email capture). Each has its own `wrangler.toml`.
- `public/llms.txt` and `public/llms-full.txt` — LLM-facing canonical documentation (kept in sync with the seQRets app feature set)

### External Services

The site integrates with two Cloudflare Workers via env vars (see `.env.example`):
- **Checkout Worker** (`VITE_CHECKOUT_API_URL`) — creates Stripe Checkout sessions
- **Waitlist Worker** (`VITE_WAITLIST_API_URL`) — captures email signups

Stripe publishable key: `VITE_STRIPE_PUBLISHABLE_KEY`. The shop is behind a launch toggle: `SHOP_LIVE` in `src/lib/stripe.ts`.

### Product Catalog

All products/pricing are defined inline in `src/lib/stripe.ts` as the `PRODUCTS` record. Blog posts are similarly defined inline in `src/lib/blog.ts` (no CMS, no markdown files). Adding a new blog post means appending to `BLOG_POSTS`; the route is generated automatically.

### SEO / Meta

Per-page meta tags managed via **`vite-react-ssg`'s `<Head>` component** (not `react-helmet-async`). Defaults live in `index.html` and are overridden per-route by:
- `src/components/PageHead.tsx` for top-level pages
- `src/components/docs/DocsHead.tsx` for `/docs/*` pages (also accepts JSON-LD)

Because pages are pre-rendered, the resolved title/meta/OG tags appear in the served HTML — social-share crawlers and search engines see the correct content without executing JS.

## Path Alias

`@/*` maps to `./src/*`
