# seQRets Security Audit — Status Tracker

> Last updated: March 14, 2026

---

## Summary

| Status | Count |
|--------|-------|
| Fixed | 22 |
| Remaining | 6 |

---

## Fixed

| ID | Severity | Finding | Fix Applied |
|----|----------|---------|-------------|
| C-1 | CRITICAL | Missing Content-Security-Policy | Added CSP to `_headers`; migrated to Cloudflare Pages so headers are enforced |
| C-4 | CRITICAL | Unhandled JSON parse errors in Workers | Added `safeParseJson()` with try-catch + Content-Type validation in both workers |
| C-5 | CRITICAL | Stripe error messages may leak sensitive data | Replaced raw Stripe error forwarding with generic message; full error logged server-side |
| H-1 | HIGH | No rate limiting on public waitlist POST | Added IP-based rate limiting: 10 signups/IP/hour with KV-backed counter |
| H-2 | HIGH | Admin secret comparison vulnerable to timing attacks | Replaced `!==` with HMAC-based constant-time comparison via Web Crypto API |
| H-3 | HIGH | No request body size limits | Added 10KB limit (waitlist) and 50KB limit (checkout) with Content-Length + body checks |
| H-4 | HIGH | KV key injection via email addresses | Namespaced all email keys with `email:` prefix; rate-limit keys use `ratelimit:` prefix |
| H-7 | HIGH | Error messages distinguish auth vs system failures | Unified all admin auth failures to generic "Access denied" (403) |
| H-8 | HIGH | Stripe checkout URL validation too permissive | Replaced `startsWith()` with `new URL()` parsing; validates hostname and protocol |
| M-1 | MEDIUM | CORS fallback returns valid origin for unauthorized requests | Unauthorized origins now get null CORS headers instead of reflecting a valid origin |
| M-3 | MEDIUM | Missing Content-Type validation before JSON parsing | Both workers now reject non-`application/json` requests with 415 |
| M-4 | MEDIUM | Weak email validation regex | Tightened to require 2+ char TLD, alphanumeric local part, 254 char max (frontend + backend) |
| M-5 | MEDIUM | localStorage cart data lacks quantity upper bounds | Added `MAX_QUANTITY = 100` check when loading cart from localStorage |
| L-1 | LOW | Missing Cache-Control headers on API responses | Added `Cache-Control: no-store, no-cache` to all worker responses |
| L-3 | LOW | Missing X-Permitted-Cross-Domain-Policies header | Added `X-Permitted-Cross-Domain-Policies: none` to `_headers` |
| L-4 | LOW | Outdated wrangler compatibility_date | Updated both workers from `2024-01-01` to `2026-01-01` |
| I-2 | INFO | Stripe price IDs visible in client bundle | No action needed — standard Stripe practice |
| I-3 | INFO | Live Stripe publishable key in .env.local | Env vars now set in Cloudflare Pages dashboard (encrypted) |
| C-2 | CRITICAL | Admin secret stored client-side in JS variable | Replaced with server-side session tokens: `POST /admin/login` exchanges secret for random 32-byte token stored in KV with 15-min TTL; admin.html stores only the token; `POST /admin/logout` invalidates server-side; secret cleared from DOM immediately after login |
| H-5 | HIGH | No session timeout for admin dashboard | Session tokens have 15-min TTL with sliding window (refreshed on each use); expired sessions return 403 and redirect to login |
| C-3 | CRITICAL | Rate limiting bypass via IP spoofing | Mitigated: `CF-Connecting-IP` is set by Cloudflare's proxy and cannot be spoofed by end users; KV-based rate limiting is effective behind Cloudflare |
| — | — | npm audit vulnerabilities (2 high) | Resolved via `npm audit fix` |

---

## Remaining

| ID | Severity | Finding | Recommended Action |
|----|----------|---------|-------------------|
| H-6 | HIGH | No CSRF protection on admin operations | Add random CSRF token in response body, echo back on subsequent requests |
| M-2 | MEDIUM | Race condition in waitlist deduplication | Make writes idempotent with unconditional put; accept KV non-atomicity |
| M-6 | MEDIUM | Weak deletion confirmation (3s two-click) | Replace with modal dialog requiring typed confirmation |
| M-7 | MEDIUM | No schema validation on parsed waitlist entries | Validate shape before rendering; skip or flag invalid entries |
| M-8 | MEDIUM | Unvalidated redirect path via sessionStorage | Validate against known route whitelist regex |
| I-1 | INFO | No audit logging on admin actions | Add `console.log` in Worker for admin actions (visible in `wrangler tail`) |

---

## Infrastructure Changes

| Change | Status |
|--------|--------|
| Migrated landing page from GitHub Pages to Cloudflare Pages | Done |
| Switched from bun to npm (lockfile compatibility) | Done |
| Both Cloudflare Workers redeployed with security hardening | Done |
| Custom domain `seqrets.app` pointed to Cloudflare Pages | Done |
| GitHub Pages unpublished | Done |
| Security headers verified live via DevTools | Done |
