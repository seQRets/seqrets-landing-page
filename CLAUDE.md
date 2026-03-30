# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Marketing and landing page site for [seQRets](https://seqrets.app) — a zero-knowledge cryptographic app for securing, splitting, and sharing secrets. This is the public-facing website (seqrets.app), separate from the main app repo. Licensed under AGPLv3.

## Build & Development Commands

```bash
npm install
npm run dev          # Vite dev server on http://localhost:8080
npm run build        # Production build to dist/
npm run build:dev    # Dev-mode build
npm run preview      # Preview production build locally
npm run lint         # ESLint
npm run test         # Vitest (single run)
npm run test:watch   # Vitest in watch mode
```

## Architecture

**Stack:** React 18 + TypeScript + Vite + Tailwind CSS 3 + Framer Motion + react-router-dom v6

**SPA with client-side routing.** Entry point is `index.html` → `src/main.tsx` → `src/App.tsx`. All routes defined in App.tsx using react-router-dom `<Routes>`. Non-index pages are lazy-loaded. Cloudflare Pages handles SPA fallback for direct URL access natively.

**Deployment:** Static build (`dist/`) deployed to Cloudflare Pages (project: `seqrets-landing-page`). Custom domain: seqrets.app. Security headers configured in `public/_headers`.

### Key Directories

- `src/pages/` — Route-level page components (Index, Shop, Blog, Features, Security, docs/*)
- `src/components/landing/` — Landing page sections (Hero, HowItWorks, FeaturesGrid, SecuritySection, etc.)
- `src/components/docs/` — Documentation layout, sidebar, nav structure (`DocsNav.ts` defines the sidebar tree)
- `src/components/cart/` — Shopping cart drawer and icon
- `src/components/shop/` — Product modal
- `src/components/ui/` — shadcn/ui primitives (button, badge)
- `src/lib/` — Utilities: `stripe.ts` (product catalog + checkout), `blog.ts` (blog posts as data), `waitlist.ts`
- `src/contexts/CartContext.tsx` — Cart state (useReducer + localStorage persistence)
- `workers/` — Cloudflare Workers (checkout session creation, waitlist signups) — each has its own `wrangler.toml`

### External Services

The site integrates with two Cloudflare Workers via env vars (see `.env.example`):
- **Checkout Worker** (`VITE_CHECKOUT_API_URL`) — creates Stripe Checkout sessions
- **Waitlist Worker** (`VITE_WAITLIST_API_URL`) — captures email signups

Stripe publishable key: `VITE_STRIPE_PUBLISHABLE_KEY`. The shop is behind a launch toggle: `SHOP_LIVE` in `src/lib/stripe.ts`.

### Product Catalog

All products/pricing are defined inline in `src/lib/stripe.ts` as the `PRODUCTS` record. Blog posts are similarly defined inline in `src/lib/blog.ts` (no CMS, no markdown files).

### SEO / Meta

Per-page meta tags managed via `react-helmet-async`. Default OG/Twitter tags in App.tsx, overridden per-page by `PageHead` and `DocsHead` components.

## Path Alias

`@/*` maps to `./src/*`
