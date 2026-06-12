import { useEffect } from "react";

import { Mail, Lock, ShieldAlert, Scale, Github, MessageSquare, Youtube, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import PageHead from "@/components/PageHead";

const ContactPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-background">
      <PageHead
        title="Contact"
        description="How to reach seQRets — general questions, security disclosures, licensing, and encrypted communication. A product of Toothjockey LLC."
        path="/contact"
      />
      <Navbar />
      <main className="container mx-auto px-4 md:px-8 py-24 max-w-4xl">

        {/* Header */}
        <div className="mb-16 text-center">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground/70 mb-5">
            Get in Touch
          </p>
          <h1 className="font-display text-4xl font-black md:text-6xl text-foreground tracking-tight mb-6">
            Contact <span className="text-gradient">seQRets</span>
          </h1>
          <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
            One page for every way to reach us. Pick the channel that fits what you need.
          </p>
        </div>

        {/* Primary contact cards */}
        <div className="grid gap-4 md:grid-cols-2 mb-12">

          {/* General */}
          <div className="rounded-2xl border border-border/30 bg-card/20 p-6">
            <div className="inline-flex rounded-xl bg-primary/10 p-3 mb-4">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <h2 className="font-display text-lg font-bold text-foreground mb-2">General Questions</h2>
            <p className="text-sm text-muted-foreground/80 mb-3">
              Questions about the product, the website, partnerships, press, or anything not covered below.
            </p>
            <a href="mailto:hello@seqrets.app" className="text-sm font-medium text-primary hover:underline">
              hello@seqrets.app
            </a>
          </div>

          {/* Security */}
          <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6">
            <div className="inline-flex rounded-xl bg-destructive/10 p-3 mb-4">
              <ShieldAlert className="h-5 w-5 text-destructive" />
            </div>
            <h2 className="font-display text-lg font-bold text-foreground mb-2">Security Disclosures</h2>
            <p className="text-sm text-muted-foreground/80 mb-3">
              Found a vulnerability? Report it here. For sensitive reports, please encrypt your message
              with our PGP key first (see below).
            </p>
            <a href="mailto:security@seqrets.app" className="text-sm font-medium text-primary hover:underline">
              security@seqrets.app
            </a>
          </div>

          {/* Licensing */}
          <div className="rounded-2xl border border-border/30 bg-card/20 p-6">
            <div className="inline-flex rounded-xl bg-primary/10 p-3 mb-4">
              <Scale className="h-5 w-5 text-primary" />
            </div>
            <h2 className="font-display text-lg font-bold text-foreground mb-2">Commercial Licensing</h2>
            <p className="text-sm text-muted-foreground/80 mb-3">
              seQRets is open source under AGPL-3.0-or-later. For proprietary or enterprise use where
              AGPL obligations aren't feasible, get a commercial license.
            </p>
            <a href="mailto:licensing@seqrets.app" className="text-sm font-medium text-primary hover:underline">
              licensing@seqrets.app
            </a>
          </div>

          {/* Encrypted / PGP */}
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
            <div className="inline-flex rounded-xl bg-primary/10 p-3 mb-4">
              <Lock className="h-5 w-5 text-primary" />
            </div>
            <h2 className="font-display text-lg font-bold text-foreground mb-2">Encrypted Communication</h2>
            <p className="text-sm text-muted-foreground/80 mb-3">
              For anything sensitive, send us an end-to-end encrypted message. Our PGP public key, fingerprint,
              and step-by-step instructions live on a dedicated page.
            </p>
            <div className="flex flex-col gap-1.5">
              <Link to="/pgp" className="text-sm font-medium text-primary hover:underline">
                View our PGP key & instructions →
              </Link>
              <a href="mailto:seqrets@proton.me" className="text-xs text-muted-foreground/70 hover:text-foreground transition-colors">
                seqrets@proton.me
              </a>
            </div>
          </div>

        </div>

        {/* Community & channels */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6 text-center">
            Community &amp; Other Channels
          </h2>
          <div className="rounded-2xl border border-border/30 bg-card/20 p-6">
            <ul className="space-y-4 text-sm text-muted-foreground/80">
              <li className="flex items-start gap-3">
                <Github className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Report a bug or request a feature:</strong>{" "}
                  <a href="https://github.com/seQRets/seQRets-app/issues" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    GitHub Issues
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MessageSquare className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Ask a question or join the discussion:</strong>{" "}
                  <a href="https://github.com/seQRets/seQRets-app/discussions" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    GitHub Discussions
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Youtube className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Watch tutorials and updates:</strong>{" "}
                  <a href="https://www.youtube.com/@SVRNMoney" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    YouTube
                  </a>
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Legal entity / notices */}
        <section>
          <div className="rounded-2xl border border-border/40 bg-card/30 p-8 flex items-start gap-6">
            <div className="rounded-xl bg-primary/10 p-3 shrink-0">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-2">Legal Entity &amp; Notices</h2>
              <p className="text-sm text-muted-foreground/80 mb-3">
                seQRets is a product of <strong className="text-foreground">Toothjockey LLC</strong>, a limited liability
                company organized in North Dakota, USA. For legal notices, or questions about our{" "}
                <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> or{" "}
                <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>, email{" "}
                <a href="mailto:hello@seqrets.app" className="text-primary hover:underline">hello@seqrets.app</a>.
              </p>
              <p className="text-sm text-muted-foreground/80">
                <strong className="text-foreground">Mailing address &amp; registered agent</strong> (for formal notices and service of process):
              </p>
              <address className="mt-1 not-italic text-sm text-muted-foreground/80 leading-relaxed">
                Toothjockey LLC<br />
                3003 32nd Ave S, Ste 240<br />
                Fargo, ND 58103<br />
                USA
              </address>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
