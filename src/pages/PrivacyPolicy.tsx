import { useEffect } from "react";

import { ShieldCheck, Eye, Database, Globe, Cookie, Bot, Mail, Server, Coins, UserCheck, Clock, Plane } from "lucide-react";
import { Link } from "react-router-dom";
import PageHead from "@/components/PageHead";
import { PreviewPage } from "@/components/preview/PreviewChrome";

/* ------------------------------------------------------------------ *
 * /privacy — seventh interior page moved onto the redesign.
 *
 * This is a legal document, so the restyle was done as a mechanical
 * substitution of colour classes rather than a rewrite: not one line of
 * policy text was retyped, and the rendered text was diffed against the
 * previous version to prove it. Effective and revision dates likewise
 * left exactly as they were — they are claims about when this policy
 * changed, not styling.
 * ------------------------------------------------------------------ */

const PrivacyPolicy = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <PreviewPage>
      <PageHead
        title="Privacy Policy"
        description="seQRets does not collect, store, transmit, or sell your data. Zero analytics, zero tracking, zero telemetry. A product of Toothjockey LLC."
        path="/privacy"
      />
      <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">

        {/* Header */}
        <div className="mb-16 text-center">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-[var(--ink2)] mb-5">
            Trust & Transparency
          </p>
          <h1 className="font-display text-4xl font-black md:text-6xl text-[var(--ink)] tracking-tight mb-6">
            Privacy <span className="text-[var(--gold)]">Policy</span>
          </h1>
          <p className="text-lg text-[var(--ink2)] max-w-2xl mx-auto">
            seQRets does not collect, store, transmit, or sell your data. Period.
          </p>
          <p className="text-sm text-[var(--ink3)] mt-4">
            Effective date: May 1, 2026 &nbsp;·&nbsp; Last revised: June 12, 2026
          </p>
        </div>

        <div className="max-w-none space-y-16">

          {/* Overview */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--ink)] mb-8 flex items-center justify-center gap-3">
              <Eye className="h-7 w-7 text-[var(--gold)] shrink-0" />
              Overview
            </h2>
            <div className="rounded-2xl border border-[var(--gold-line)] bg-[var(--gold-fill)] p-6">
              <p className="text-sm text-[var(--ink2)] mb-4">
                <strong className="text-[var(--ink)]">In plain English:</strong> seQRets is a privacy-first product. We don't run a backend for your secrets. We don't have accounts. We don't track you. Your secrets never leave your device. This policy explains exactly what happens — and what doesn't — when you use seQRets, including the few optional, third-party network requests the app can make.
              </p>
              <ul className="space-y-2 text-sm text-[var(--ink2)]">
                <li className="flex items-start gap-2"><span className="text-[var(--gold)] mt-0.5">•</span><span>We <strong className="text-[var(--ink)]">never</strong> see your secrets, passwords, keyfiles, or Qards. All cryptography runs on your device.</span></li>
                <li className="flex items-start gap-2"><span className="text-[var(--gold)] mt-0.5">•</span><span>No accounts, no identity verification, no in-app analytics, no advertising trackers.</span></li>
                <li className="flex items-start gap-2"><span className="text-[var(--gold)] mt-0.5">•</span><span>Optional features (Bitcoin price ticker, the "Bob" assistant, donation link) contact third parties — described below.</span></li>
                <li className="flex items-start gap-2"><span className="text-[var(--gold)] mt-0.5">•</span><span>Our hosting/CDN provider processes standard server logs (such as IP address) to deliver the site.</span></li>
              </ul>
            </div>
            <p className="text-sm text-[var(--ink2)] mt-6">
              This Privacy Policy applies to the seQRets marketing website at <strong className="text-[var(--ink)]">seqrets.app</strong>, the web application at <strong className="text-[var(--ink)]">app.seqrets.app</strong>, and the seQRets desktop application (together, the "Services"). The Services are operated by <strong className="text-[var(--ink)]">Toothjockey LLC</strong>, a North Dakota limited liability company, the maker of seQRets. By using any of our Services, you acknowledge that you have read and understood this policy.
            </p>
          </section>

          {/* What We Don't Collect */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--ink)] mb-8 flex items-center justify-center gap-3">
              <ShieldCheck className="h-7 w-7 text-[var(--gold)] shrink-0" />
              What We Don't Collect
            </h2>
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--sf)] p-6">
              <p className="text-sm text-[var(--ink2)] mb-4">
                <strong className="text-[var(--ink)]">In plain English:</strong> We don't track you. No analytics, no cookies for tracking, no fingerprinting. Nothing in the app phones home to us.
              </p>
              <p className="text-sm text-[var(--ink2)]">
                Toothjockey does not operate analytics services, tracking pixels, browser fingerprinting, error-reporting services, telemetry, or any form of behavioral monitoring within the seQRets application. We do not collect or receive your secrets, passwords, keyfiles, shares, Qards, IP-linked profiles, device identifiers, usage patterns, or personally identifiable information. There are no third-party scripts loaded for advertising, remarketing, or audience measurement on any of our Services. The standard server logs that our hosting/CDN provider creates to deliver the site (described under <em className="text-[var(--ink)]">How the Services Are Delivered</em>) are the principal exception, and they never contain your cryptographic material.
              </p>
            </div>
          </section>

          {/* Data Processing */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--ink)] mb-8 flex items-center justify-center gap-3">
              <Server className="h-7 w-7 text-[var(--gold)] shrink-0" />
              How the Services Are Delivered
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--sf)] p-6">
                <div className="inline-flex rounded-xl bg-[var(--gold-fill)] p-3 mb-4">
                  <Globe className="h-5 w-5 text-[var(--gold)]" />
                </div>
                <h3 className="font-display text-base font-bold text-[var(--ink)] mb-2">Marketing Website (seqrets.app)</h3>
                <p className="text-sm text-[var(--ink2)]">
                  This website is a static site hosted on Cloudflare Pages. It does not run analytics and does not set tracking cookies. Toothjockey does not operate its own server logging. As part of edge delivery, Cloudflare may process standard server logs (such as IP address, request metadata, and user agent), which are retained by Cloudflare under its own <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-[var(--gold)] hover:underline">Privacy Policy</a> — Toothjockey does not receive or store them.
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--sf)] p-6">
                <div className="inline-flex rounded-xl bg-[var(--gold-fill)] p-3 mb-4">
                  <Database className="h-5 w-5 text-[var(--gold)]" />
                </div>
                <h3 className="font-display text-base font-bold text-[var(--ink)] mb-2">Web App (app.seqrets.app)</h3>
                <p className="text-sm text-[var(--ink2)]">
                  All cryptographic operations run entirely in your browser, inside an isolated Web Worker. The web app stores only a few items in your browser's local storage — for example your theme preference, an acknowledgment that you've seen the AI disclaimer, and your Gemini API key if you choose to provide one. None of this leaves your device or is transmitted to Toothjockey. The web app is served from GitHub Pages as its origin host, behind Cloudflare's edge network, which delivers the app and enforces its strict Content-Security-Policy; both providers may process standard server logs (such as IP address and user agent) as part of delivery, retained under their own policies. Toothjockey does not operate its own logging, does not receive these logs, and none of your cryptographic material is ever included in them.
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--sf)] p-6">
                <div className="inline-flex rounded-xl bg-[var(--gold-fill)] p-3 mb-4">
                  <ShieldCheck className="h-5 w-5 text-[var(--gold)]" />
                </div>
                <h3 className="font-display text-base font-bold text-[var(--ink)] mb-2">Desktop App</h3>
                <p className="text-sm text-[var(--ink2)]">
                  The desktop application performs all cryptography locally in native Rust. It does not transmit telemetry or behavioral data. Configuration and preferences are stored locally on your machine, and your Gemini API key (if provided) is stored in your operating system's keychain. Secrets are processed in memory and zeroized after use. Outbound network requests are limited to optional features you initiate, such as the AI assistant.
                  {/* TODO(legal): confirm whether the desktop app performs update checks and, if so, what they transmit; disclose here if applicable. */}
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--sf)] p-6">
                <div className="inline-flex rounded-xl bg-[var(--gold-fill)] p-3 mb-4">
                  <Cookie className="h-5 w-5 text-[var(--gold)]" />
                </div>
                <h3 className="font-display text-base font-bold text-[var(--ink)] mb-2">Cookies & Local Storage</h3>
                <p className="text-sm text-[var(--ink2)]">
                  Our Services do not use cookies for tracking or advertising, and the marketing website sets no cookies at all. The web app uses browser local storage for the limited preferences described above, which are never transmitted externally and can be cleared at any time through your browser settings.
                </p>
              </div>
            </div>
          </section>

          {/* External Network Requests */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--ink)] mb-8 flex items-center justify-center gap-3">
              <Globe className="h-7 w-7 text-[var(--gold)] shrink-0" />
              Optional Third-Party Requests
            </h2>
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--sf)] p-6 mb-4">
              <p className="text-sm text-[var(--ink2)] mb-4">
                <strong className="text-[var(--ink)]">In plain English:</strong> The app can make a couple of optional requests — a Bitcoin price check and, if you turn it on, AI assistant queries. Both are opt-in and go directly to the third-party provider. We never see, relay, or store this traffic.
              </p>
              <ul className="space-y-4 text-sm text-[var(--ink2)]">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--gold)] mt-0.5">1.</span>
                  <span><strong className="text-[var(--ink)]">Bitcoin price ticker:</strong> An unauthenticated, read-only request to the <a href="https://www.coinbase.com/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-[var(--gold)] hover:underline">Coinbase</a> price API to display the current Bitcoin price. No user data, secret, or identifier is included in this request.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--gold)] mt-0.5">2.</span>
                  <span><strong className="text-[var(--ink)]">"Bob" AI assistant (Google Gemini API) — off by default:</strong> The assistant is optional and disabled until you enable it by supplying <strong className="text-[var(--ink)]">your own</strong> Google Gemini API key. When enabled, the messages you type to Bob are sent directly from your device to Google's Gemini API using your key. Toothjockey never sees, stores, or relays these messages, and your API key is never transmitted to Toothjockey — it is stored locally (browser local storage on the web app; your OS keychain on the desktop app). Google's <a href="https://ai.google.dev/gemini-api/terms" target="_blank" rel="noopener noreferrer" className="text-[var(--gold)] hover:underline">Gemini API Terms</a> and <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[var(--gold)] hover:underline">Google Privacy Policy</a> govern that processing.</span>
                </li>
              </ul>
              <div className="mt-4 rounded-xl border border-[var(--gold-line)] bg-[var(--gold-fill)] p-4">
                <p className="text-sm text-[var(--ink2)]">
                  <strong className="text-[var(--ink)]">Never type a secret, seed phrase, password, or share into Bob.</strong> Anything you send to the assistant leaves your device and goes to Google. Bob is for guidance and questions only — not for handling the very material seQRets is designed to protect.
                </p>
              </div>
            </div>
            <p className="text-sm text-[var(--ink2)]">
              The Bitcoin ticker and the AI assistant are optional. The desktop app makes no external requests other than those you initiate.
            </p>
          </section>

          {/* Donations */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--ink)] mb-8 flex items-center justify-center gap-3">
              <Coins className="h-7 w-7 text-[var(--gold)] shrink-0" />
              Donations
            </h2>
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--sf)] p-6">
              <p className="text-sm text-[var(--ink2)] mb-4">
                <strong className="text-[var(--ink)]">In plain English:</strong> If you click our optional Bitcoin donation link, you leave our site and go to a third party that has its own privacy policy.
              </p>
              <p className="text-sm text-[var(--ink2)]">
                We provide an optional Bitcoin donation link via <a href="https://coinos.io" target="_blank" rel="noopener noreferrer" className="text-[var(--gold)] hover:underline">coinos.io</a>. Donating is entirely voluntary. If you choose to donate, you are taken to coinos.io, a third-party service that operates under its own <a href="https://coinos.io/privacy" target="_blank" rel="noopener noreferrer" className="text-[var(--gold)] hover:underline">privacy policy</a> and terms. Any information you provide there is handled by coinos, not by Toothjockey. We do not require donations to use any feature of seQRets.
              </p>
            </div>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--ink)] mb-8 flex items-center justify-center gap-3">
              <Bot className="h-7 w-7 text-[var(--gold)] shrink-0" />
              Third-Party Services
            </h2>
            <p className="text-sm text-[var(--ink2)] mb-4">
              Depending on which optional features you use, the following third parties may be involved. Each operates under its own privacy policy and terms:
            </p>
            <div className="overflow-x-auto rounded-2xl border border-[var(--line)]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--line)] bg-[var(--sf)]">
                    <th className="text-left p-4 font-display font-bold text-[var(--ink)]">Service</th>
                    <th className="text-left p-4 font-display font-bold text-[var(--ink)]">Purpose</th>
                    <th className="text-left p-4 font-display font-bold text-[var(--ink)]">Data Shared</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--line)]">
                  <tr className="hover:bg-[var(--sf)] transition-colors">
                    <td className="p-4 font-medium text-[var(--ink)]">Cloudflare</td>
                    <td className="p-4 text-[var(--ink2)]">Edge delivery for seqrets.app and app.seqrets.app</td>
                    <td className="p-4 text-[var(--ink2)]">Standard server logs (IP, user agent)</td>
                  </tr>
                  <tr className="hover:bg-[var(--sf)] transition-colors">
                    <td className="p-4 font-medium text-[var(--ink)]">GitHub Pages</td>
                    <td className="p-4 text-[var(--ink2)]">Web app origin host (behind Cloudflare)</td>
                    <td className="p-4 text-[var(--ink2)]">Standard server logs (IP, user agent)</td>
                  </tr>
                  <tr className="hover:bg-[var(--sf)] transition-colors">
                    <td className="p-4 font-medium text-[var(--ink)]">Coinbase API</td>
                    <td className="p-4 text-[var(--ink2)]">Bitcoin price display (optional)</td>
                    <td className="p-4 text-[var(--ink2)]">None (unauthenticated read-only request)</td>
                  </tr>
                  <tr className="hover:bg-[var(--sf)] transition-colors">
                    <td className="p-4 font-medium text-[var(--ink)]">Google Gemini API</td>
                    <td className="p-4 text-[var(--ink2)]">"Bob" AI assistant (opt-in, your own key)</td>
                    <td className="p-4 text-[var(--ink2)]">Your chat messages, sent directly with your API key</td>
                  </tr>
                  <tr className="hover:bg-[var(--sf)] transition-colors">
                    <td className="p-4 font-medium text-[var(--ink)]">coinos.io</td>
                    <td className="p-4 text-[var(--ink2)]">Optional Bitcoin donations</td>
                    <td className="p-4 text-[var(--ink2)]">Whatever you provide on their site (we receive none of it)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--ink)] mb-8 flex items-center justify-center gap-3">
              <UserCheck className="h-7 w-7 text-[var(--gold)] shrink-0" />
              Your Privacy Rights
            </h2>
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--sf)] p-6">
              <p className="text-sm text-[var(--ink2)] mb-4">
                <strong className="text-[var(--ink)]">In plain English:</strong> Privacy laws like the GDPR and CCPA give you rights over personal data a company holds about you. Because the seQRets app holds essentially none, in most cases there's nothing for us to retrieve, correct, or delete — but here's how it works.
              </p>
              <p className="text-sm text-[var(--ink2)] mb-4">
                Depending on where you live, laws such as the EU/UK General Data Protection Regulation (GDPR) or the California Consumer Privacy Act (CCPA/CPRA) may give you rights to access, correct, delete, or port personal data a business holds about you, to opt out of its "sale" or "sharing," and to be free from discrimination for exercising those rights. Toothjockey does not sell or share your personal information, and the seQRets application is designed so that we do not hold your secrets or maintain user accounts or profiles. As a result, in most cases we have no personal data to provide, correct, or delete. Where we do process limited data (for example, server logs held by our hosting/CDN provider, or correspondence you send us by email), you may contact us to exercise applicable rights, and we will respond as required by law.
              </p>
              {/* TODO(legal): confirm which privacy-law regimes apply given a global user base and a North Dakota entity; correct legal bases under GDPR Art. 6 (if any processing occurs); whether a CCPA "Do Not Sell or Share" notice is required; and exact rights wording, verification process, and response timelines. */}
            </div>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--ink)] mb-8 flex items-center justify-center gap-3">
              <Clock className="h-7 w-7 text-[var(--gold)] shrink-0" />
              Data Retention
            </h2>
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--sf)] p-6">
              <p className="text-sm text-[var(--ink2)] mb-4">
                <strong className="text-[var(--ink)]">In plain English:</strong> We don't keep your secrets — we never have them. The only data with any retention period is the routine server logs our host keeps, and any email you send us.
              </p>
              <p className="text-sm text-[var(--ink2)]">
                Because the seQRets application does not collect or store your secrets, passwords, keyfiles, shares, or Qards, there is nothing of that kind for us to retain or delete. Toothjockey does not operate its own server logs. Data stored locally on your device (preferences, an optional API key) remains under your control and is removed when you clear it. Any standard server logs created in the course of delivering the Services are retained by our hosting providers (Cloudflare and GitHub) under their own retention practices, not by Toothjockey. If you email us, we keep that correspondence only as long as needed to address your request and to meet any legal obligations.
              </p>
            </div>
          </section>

          {/* International Users */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--ink)] mb-8 flex items-center justify-center gap-3">
              <Plane className="h-7 w-7 text-[var(--gold)] shrink-0" />
              International Users
            </h2>
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--sf)] p-6">
              <p className="text-sm text-[var(--ink2)]">
                Toothjockey LLC is based in the United States, and the Services are operated from the United States. If you access the Services from outside the United States, any limited data processing described above (such as server logs created by our hosting providers, or requests you make to third-party services like Google's Gemini API) may occur in, or be transferred to, the United States or other countries that may have different data-protection laws than your own. By using the Services, you understand that your information may be processed in those countries.
                {/* TODO(legal): confirm whether any cross-border transfer mechanism or additional disclosures are required. */}
              </p>
            </div>
          </section>

          {/* Children's Privacy */}
          <section>
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--sf)] p-6">
              <h2 className="font-display text-xl font-bold text-[var(--ink)] mb-3">Children's Privacy</h2>
              <p className="text-sm text-[var(--ink2)]">
                seQRets is not directed at children and is intended for adults who can lawfully enter into the Terms of Service. We do not knowingly collect personal information from children. Because we do not collect personal information from anyone through the application, this concern is moot in practice — but we state it here for completeness. If you believe a child has provided us personal information (for example, by emailing us), contact us and we will delete it.
              </p>
            </div>
          </section>

          {/* Changes to This Policy */}
          <section>
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--sf)] p-6">
              <h2 className="font-display text-xl font-bold text-[var(--ink)] mb-3">Changes to This Policy</h2>
              <p className="text-sm text-[var(--ink2)]">
                If we update this policy, the revised version will be posted at this URL with an updated revision date. Because seQRets does not collect email addresses or maintain user accounts, we cannot notify you directly of changes, so we encourage you to review this page periodically. Material changes — particularly any that involve new data collection — will also be noted in our <a href="https://github.com/seQRets/seQRets-app" target="_blank" rel="noopener noreferrer" className="text-[var(--gold)] hover:underline">GitHub repository</a>, and, where the change affects the application, may be surfaced through the application's acceptance gate.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section>
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--sf)] p-8 flex items-start gap-6">
              <div className="rounded-xl bg-[var(--gold-fill)] p-3 shrink-0">
                <Mail className="h-6 w-6 text-[var(--gold)]" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-[var(--ink)] mb-2">Questions?</h2>
                <p className="text-[var(--ink2)]">
                  This Privacy Policy is provided by Toothjockey LLC (North Dakota, USA), the maker of seQRets. If you have questions about it, see our{" "}
                  <Link to="/contact" className="text-[var(--gold)] hover:underline">Contact page</Link>{" "}
                  or email{" "}
                  <a href="mailto:hello@seqrets.app" className="text-[var(--gold)] hover:underline">
                    hello@seqrets.app
                  </a>
                  . For security concerns, reach out to{" "}
                  <a href="mailto:security@seqrets.app" className="text-[var(--gold)] hover:underline">
                    security@seqrets.app
                  </a>
                  .
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </PreviewPage>
  );
};

export default PrivacyPolicy;
