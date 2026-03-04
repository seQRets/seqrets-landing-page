import { useEffect } from "react";

import { ShieldCheck, Eye, Database, Globe, Cookie, Bot, Mail, Server } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const PrivacyPolicy = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 md:px-8 py-24 max-w-4xl">

        {/* Header */}
        <div className="mb-16 text-center">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground/70 mb-5">
            Trust & Transparency
          </p>
          <h1 className="font-display text-4xl font-black md:text-6xl text-foreground tracking-tight mb-6">
            Privacy <span className="text-gradient">Policy</span>
          </h1>
          <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
            seQRets does not collect, store, transmit, or sell your data. Period.
          </p>
          <p className="text-sm text-muted-foreground/50 mt-4">
            Last updated: March 3, 2026
          </p>
        </div>

        <div className="prose prose-invert prose-lg max-w-none space-y-16">

          {/* Overview */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 flex items-center justify-center gap-3">
              <Eye className="h-7 w-7 text-primary shrink-0" />
              Overview
            </h2>
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
              <p className="text-sm text-muted-foreground/80">
                <strong className="text-foreground">In plain English:</strong> seQRets is a privacy-first product. We don't run servers. We don't have accounts. We don't track you. Your secrets never leave your device. This policy explains exactly what happens — and what doesn't — when you use seQRets.
              </p>
            </div>
            <p className="text-sm text-muted-foreground/80 mt-6">
              This Privacy Policy applies to the seQRets marketing website at <strong className="text-foreground">seqrets.app</strong>, the web application at <strong className="text-foreground">app.seqrets.app</strong>, and the seQRets desktop application. Together, these are referred to as the "Services." By using any of our Services, you acknowledge that you have read and understood this policy.
            </p>
          </section>

          {/* What We Don't Collect */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 flex items-center justify-center gap-3">
              <ShieldCheck className="h-7 w-7 text-primary shrink-0" />
              What We Don't Collect
            </h2>
            <div className="rounded-2xl border border-border/30 bg-card/20 p-6">
              <p className="text-sm text-muted-foreground/80 mb-4">
                <strong className="text-foreground">In plain English:</strong> We don't track you. At all. No analytics, no cookies, no fingerprinting. Nothing phones home.
              </p>
              <p className="text-sm text-muted-foreground/80">
                seQRets does not employ analytics services, tracking pixels, browser fingerprinting, error reporting services, telemetry, or any form of behavioral monitoring. We do not collect IP addresses, device identifiers, usage patterns, or any personally identifiable information. There are no third-party scripts loaded for advertising, remarketing, or audience measurement on any of our Services.
              </p>
            </div>
          </section>

          {/* Data Processing */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 flex items-center justify-center gap-3">
              <Server className="h-7 w-7 text-primary shrink-0" />
              Data Processing
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-border/30 bg-card/20 p-6">
                <div className="inline-flex rounded-xl bg-primary/10 p-3 mb-4">
                  <Globe className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display text-base font-bold text-foreground mb-2">Marketing Website (seqrets.app)</h3>
                <p className="text-sm text-muted-foreground/80">
                  This website is a static site hosted on GitHub Pages. It does not set cookies, use local storage, or make any requests to seQRets-controlled servers. GitHub may collect standard server logs (IP address, browser type) as part of hosting — see <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub's Privacy Statement</a> for details.
                </p>
              </div>
              <div className="rounded-2xl border border-border/30 bg-card/20 p-6">
                <div className="inline-flex rounded-xl bg-primary/10 p-3 mb-4">
                  <Database className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display text-base font-bold text-foreground mb-2">Web App (app.seqrets.app)</h3>
                <p className="text-sm text-muted-foreground/80">
                  All cryptographic operations run entirely in your browser. The web app stores only three items in local browser storage: your theme preference (light/dark), the AI disclaimer acknowledgment, and your Gemini API key (if you choose to provide one). None of this data leaves your device or is transmitted to any server.
                </p>
              </div>
              <div className="rounded-2xl border border-border/30 bg-card/20 p-6">
                <div className="inline-flex rounded-xl bg-primary/10 p-3 mb-4">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display text-base font-bold text-foreground mb-2">Desktop App</h3>
                <p className="text-sm text-muted-foreground/80">
                  The desktop application operates entirely offline. It does not phone home, check for telemetry, or transmit any data. Configuration and preferences are stored locally on your machine. Secrets are processed in memory using native Rust and zeroized after use.
                </p>
              </div>
              <div className="rounded-2xl border border-border/30 bg-card/20 p-6">
                <div className="inline-flex rounded-xl bg-primary/10 p-3 mb-4">
                  <Cookie className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display text-base font-bold text-foreground mb-2">Cookies</h3>
                <p className="text-sm text-muted-foreground/80">
                  seQRets does not use cookies on any of its Services. The web app uses browser local storage for the limited preferences described above, which are never transmitted externally and can be cleared at any time through your browser settings.
                </p>
              </div>
            </div>
          </section>

          {/* External Network Requests */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 flex items-center justify-center gap-3">
              <Globe className="h-7 w-7 text-primary shrink-0" />
              External Network Requests
            </h2>
            <div className="rounded-2xl border border-border/30 bg-card/20 p-6 mb-4">
              <p className="text-sm text-muted-foreground/80 mb-4">
                <strong className="text-foreground">In plain English:</strong> The web app makes two optional network requests — a Bitcoin price check and AI assistant queries. Both are opt-in and go directly to the third-party provider. We never see, relay, or store this traffic.
              </p>
              <ul className="space-y-4 text-sm text-muted-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">1.</span>
                  <span><strong className="text-foreground">Bitcoin ticker (Coinbase API):</strong> An unauthenticated, read-only request to retrieve the current Bitcoin price for display purposes. No user data is included in this request.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">2.</span>
                  <span><strong className="text-foreground">Bob AI Assistant (Google Gemini API):</strong> If you choose to use the AI assistant, your queries are sent directly from your browser to Google's Gemini API using your own API key. seQRets never sees, stores, or relays these messages. Google's <a href="https://ai.google.dev/gemini-api/terms" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Gemini API Terms of Service</a> apply to this feature.</span>
                </li>
              </ul>
            </div>
            <p className="text-sm text-muted-foreground/70">
              Both requests are optional and can be avoided entirely by using the app offline. The desktop app makes no external network requests whatsoever.
            </p>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 flex items-center justify-center gap-3">
              <Bot className="h-7 w-7 text-primary shrink-0" />
              Third-Party Services
            </h2>
            <p className="text-sm text-muted-foreground/80 mb-4">
              The following third-party services may be involved when you use seQRets. Each has its own privacy policy and terms:
            </p>
            <div className="overflow-x-auto rounded-2xl border border-border/30">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/30 bg-card/30">
                    <th className="text-left p-4 font-display font-bold text-foreground">Service</th>
                    <th className="text-left p-4 font-display font-bold text-foreground">Purpose</th>
                    <th className="text-left p-4 font-display font-bold text-foreground">Data Shared</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20">
                  <tr className="hover:bg-card/20 transition-colors">
                    <td className="p-4 font-medium text-foreground">GitHub Pages</td>
                    <td className="p-4 text-muted-foreground/70">Hosting</td>
                    <td className="p-4 text-muted-foreground/70">Standard server logs (IP, user agent)</td>
                  </tr>
                  <tr className="hover:bg-card/20 transition-colors">
                    <td className="p-4 font-medium text-foreground">Coinbase API</td>
                    <td className="p-4 text-muted-foreground/70">Bitcoin price display</td>
                    <td className="p-4 text-muted-foreground/70">None (unauthenticated read-only request)</td>
                  </tr>
                  <tr className="hover:bg-card/20 transition-colors">
                    <td className="p-4 font-medium text-foreground">Google Gemini API</td>
                    <td className="p-4 text-muted-foreground/70">Bob AI Assistant (opt-in)</td>
                    <td className="p-4 text-muted-foreground/70">Your queries, sent directly with your API key</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Children's Privacy */}
          <section>
            <div className="rounded-2xl border border-border/30 bg-card/20 p-6">
              <h2 className="font-display text-xl font-bold text-foreground mb-3">Children's Privacy</h2>
              <p className="text-sm text-muted-foreground/80">
                seQRets is not directed at children under the age of 13. We do not knowingly collect personal information from children. Since we do not collect personal information from anyone, this concern is moot in practice — but we state it here for completeness.
              </p>
            </div>
          </section>

          {/* Changes to This Policy */}
          <section>
            <div className="rounded-2xl border border-border/30 bg-card/20 p-6">
              <h2 className="font-display text-xl font-bold text-foreground mb-3">Changes to This Policy</h2>
              <p className="text-sm text-muted-foreground/80">
                If we update this policy, the revised version will be posted at this URL with an updated "Last updated" date. Because seQRets does not collect email addresses or user accounts, we cannot notify you directly of changes. We encourage you to review this page periodically. Material changes — particularly any that involve new data collection — will also be noted in our <a href="https://github.com/seQRets/seQRets-app" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub repository</a>.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section>
            <div className="rounded-2xl border border-border/40 bg-card/30 p-8 flex items-start gap-6">
              <div className="rounded-xl bg-primary/10 p-3 shrink-0">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-foreground mb-2">Questions?</h2>
                <p className="text-muted-foreground/80">
                  If you have questions about this Privacy Policy, contact us at{" "}
                  <a href="mailto:hello@seqrets.app" className="text-primary hover:underline">
                    hello@seqrets.app
                  </a>
                  . For security concerns, reach out to{" "}
                  <a href="mailto:security@seqrets.app" className="text-primary hover:underline">
                    security@seqrets.app
                  </a>
                  .
                </p>
              </div>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
