import { useEffect } from "react";

import { Scale, AlertTriangle, Shield, FileText, Code, ShoppingBag, Mail, Gavel } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import PageHead from "@/components/PageHead";

const TermsOfService = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-background">
      <PageHead
        title="Terms of Service"
        description="Terms and conditions for using seQRets software and services."
        path="/terms"
      />
      <Navbar />
      <main className="container mx-auto px-4 md:px-8 py-24 max-w-4xl">

        {/* Header */}
        <div className="mb-16 text-center">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground/70 mb-5">
            Legal
          </p>
          <h1 className="font-display text-4xl font-black md:text-6xl text-foreground tracking-tight mb-6">
            Terms of <span className="text-gradient">Service</span>
          </h1>
          <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
            What you're agreeing to when you use seQRets.
          </p>
          <p className="text-sm text-muted-foreground/50 mt-4">
            Last updated: March 3, 2026
          </p>
        </div>

        <div className="prose prose-invert prose-lg max-w-none space-y-16">

          {/* Agreement */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 flex items-center justify-center gap-3">
              <FileText className="h-7 w-7 text-primary shrink-0" />
              Agreement to Terms
            </h2>
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
              <p className="text-sm text-muted-foreground/80">
                <strong className="text-foreground">In plain English:</strong> By using seQRets — the website, the web app, or the desktop app — you agree to these terms. If you don't agree, don't use it.
              </p>
            </div>
            <p className="text-sm text-muted-foreground/80 mt-6">
              These Terms of Service ("Terms") govern your access to and use of the seQRets website at <strong className="text-foreground">seqrets.app</strong>, the web application at <strong className="text-foreground">app.seqrets.app</strong>, and the seQRets desktop application (collectively, the "Services"), operated by seQRets ("we," "us," or "our"). By accessing or using any of our Services, you agree to be bound by these Terms. If you do not agree, you must discontinue use immediately.
            </p>
          </section>

          {/* Service Description */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 flex items-center justify-center gap-3">
              <Shield className="h-7 w-7 text-primary shrink-0" />
              What seQRets Does
            </h2>
            <div className="rounded-2xl border border-border/30 bg-card/20 p-6">
              <p className="text-sm text-muted-foreground/80 mb-4">
                <strong className="text-foreground">In plain English:</strong> seQRets is a tool that encrypts your secrets, splits them into multiple QR code shares, and lets you distribute them. Everything runs on your device. We have no ability to access, recover, or view your data.
              </p>
              <p className="text-sm text-muted-foreground/80">
                seQRets provides client-side cryptographic tools for encrypting sensitive information and splitting it into threshold shares using Shamir's Secret Sharing, rendered as QR codes ("Qards"). The Services operate entirely on your device. We do not operate servers that process, store, or have access to your secrets, passwords, shares, or any cryptographic material. We have no ability to recover lost data.
              </p>
            </div>
          </section>

          {/* User Responsibilities */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 flex items-center justify-center gap-3">
              <Scale className="h-7 w-7 text-primary shrink-0" />
              Your Responsibilities
            </h2>
            <div className="rounded-2xl border border-border/30 bg-card/20 p-6">
              <p className="text-sm text-muted-foreground/80 mb-4">
                <strong className="text-foreground">In plain English:</strong> You're responsible for your own secrets, passwords, and Qard shares. If you lose them, they're gone. We can't help you recover anything — that's a feature, not a limitation.
              </p>
              <p className="text-sm text-muted-foreground/80 mb-4">
                By using the Services, you acknowledge and accept the following responsibilities:
              </p>
              <ul className="space-y-3 text-sm text-muted-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span><strong className="text-foreground">Password management:</strong> You are solely responsible for remembering or securely storing the passwords used to encrypt your secrets. There is no password recovery mechanism.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span><strong className="text-foreground">Share custody:</strong> You are responsible for the safekeeping and distribution of your Qard shares. If you lose enough shares to fall below your chosen threshold, your secret is irrecoverable.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span><strong className="text-foreground">Device security:</strong> You are responsible for ensuring the device on which you run seQRets is free from malware, unauthorized browser extensions, and other threats.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span><strong className="text-foreground">Lawful use:</strong> You agree to use the Services only for lawful purposes and in compliance with all applicable laws and regulations in your jurisdiction.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* No Warranty / Beta */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 flex items-center justify-center gap-3">
              <AlertTriangle className="h-7 w-7 text-primary shrink-0" />
              Disclaimer of Warranties
            </h2>
            <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6">
              <p className="text-sm text-muted-foreground/80 mb-4">
                <strong className="text-foreground">In plain English:</strong> seQRets is provided "as is." It's beta software that hasn't been independently audited yet. We believe the cryptography is sound — the code is open source and uses well-audited primitives — but we make no guarantees. Use it at your own risk.
              </p>
              <p className="text-sm text-muted-foreground/80 uppercase font-semibold">
                The Services are provided "as is" and "as available," without warranty of any kind, express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the Services will be uninterrupted, error-free, or free of vulnerabilities. seQRets has not undergone an independent third-party security audit. You acknowledge that you use the Services at your own risk.
              </p>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 flex items-center justify-center gap-3">
              <Gavel className="h-7 w-7 text-primary shrink-0" />
              Limitation of Liability
            </h2>
            <div className="rounded-2xl border border-border/30 bg-card/20 p-6">
              <p className="text-sm text-muted-foreground/80 mb-4">
                <strong className="text-foreground">In plain English:</strong> We are not liable if you lose access to your secrets, lose cryptocurrency, or suffer any other loss from using seQRets. Because we have zero access to your data, we have zero ability to help recover it.
              </p>
              <p className="text-sm text-muted-foreground/80">
                To the maximum extent permitted by applicable law, in no event shall seQRets, its contributors, maintainers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, cryptocurrency, digital assets, or other intangible losses, resulting from (a) your use of or inability to use the Services; (b) loss of access to encrypted secrets, shares, passwords, or Qards; (c) unauthorized access to or alteration of your device or data; (d) any bugs, errors, or vulnerabilities in the software; or (e) any other matter relating to the Services. This limitation applies whether the claim is based on warranty, contract, tort, or any other legal theory, and whether or not we have been advised of the possibility of such damages.
              </p>
            </div>
          </section>

          {/* Open Source */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 flex items-center justify-center gap-3">
              <Code className="h-7 w-7 text-primary shrink-0" />
              Open Source License
            </h2>
            <div className="rounded-2xl border border-border/30 bg-card/20 p-6">
              <p className="text-sm text-muted-foreground/80 mb-4">
                <strong className="text-foreground">In plain English:</strong> The source code is open source under AGPLv3. You can read, audit, fork, and modify it — subject to that license. Commercial licensing is available separately.
              </p>
              <p className="text-sm text-muted-foreground/80 mb-3">
                The seQRets source code is released under the <strong className="text-foreground">GNU Affero General Public License, version 3 (AGPLv3)</strong>. You may use, copy, modify, and distribute the source code in accordance with that license. The full license text is available in the project's <a href="https://github.com/seQRets/seQRets-app" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub repository</a>.
              </p>
              <p className="text-sm text-muted-foreground/80">
                For commercial licensing inquiries (use in proprietary products, enterprise deployments, or contexts where AGPLv3 obligations are not feasible), contact <a href="mailto:licensing@seqrets.app" className="text-primary hover:underline">licensing@seqrets.app</a>.
              </p>
            </div>
          </section>

          {/* Purchases & Shop */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 flex items-center justify-center gap-3">
              <ShoppingBag className="h-7 w-7 text-primary shrink-0" />
              Purchases
            </h2>
            <div className="rounded-2xl border border-border/30 bg-card/20 p-6">
              <p className="text-sm text-muted-foreground/80 mb-4">
                <strong className="text-foreground">In plain English:</strong> The desktop app and physical accessories are paid products. When the shop launches, purchases will be handled through a third-party payment processor. We'll update this section with specific terms at that time.
              </p>
              <p className="text-sm text-muted-foreground/80">
                Certain products, including the seQRets desktop application and physical accessories, may be offered for purchase. All payment processing is handled by third-party providers. We do not directly collect or store payment information. Specific purchase terms, including refund policies and delivery terms, will be provided at the point of sale and are incorporated into these Terms by reference.
              </p>
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <div className="rounded-2xl border border-border/30 bg-card/20 p-6">
              <h2 className="font-display text-xl font-bold text-foreground mb-3">Intellectual Property</h2>
              <p className="text-sm text-muted-foreground/80">
                The seQRets name, logo, and branding are the property of seQRets. The source code is licensed under AGPLv3 as described above. Third-party libraries used in seQRets retain their respective licenses and copyrights. Nothing in these Terms grants you rights to our trademarks or branding beyond what is necessary to use the Services.
              </p>
            </div>
          </section>

          {/* Termination */}
          <section>
            <div className="rounded-2xl border border-border/30 bg-card/20 p-6">
              <h2 className="font-display text-xl font-bold text-foreground mb-3">Termination</h2>
              <p className="text-sm text-muted-foreground/80">
                Since seQRets has no accounts, there is nothing to "terminate" in the traditional sense. You may stop using the Services at any time. We reserve the right to modify or discontinue the Services (or any part thereof) at any time without notice. Because the software is open source, the cryptographic tools remain available to the community regardless of the status of our hosted Services.
              </p>
            </div>
          </section>

          {/* Changes to Terms */}
          <section>
            <div className="rounded-2xl border border-border/30 bg-card/20 p-6">
              <h2 className="font-display text-xl font-bold text-foreground mb-3">Changes to These Terms</h2>
              <p className="text-sm text-muted-foreground/80">
                We may update these Terms from time to time. The revised version will be posted at this URL with an updated "Last updated" date. Your continued use of the Services after any changes constitutes your acceptance of the updated Terms. Material changes will also be noted in our <a href="https://github.com/seQRets/seQRets-app" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub repository</a>.
              </p>
            </div>
          </section>

          {/* Governing Law */}
          <section>
            <div className="rounded-2xl border border-border/30 bg-card/20 p-6">
              <h2 className="font-display text-xl font-bold text-foreground mb-3">Governing Law</h2>
              <p className="text-sm text-muted-foreground/80">
                These Terms shall be governed by and construed in accordance with applicable law, without regard to conflict of law principles. Any disputes arising under these Terms shall be resolved in a court of competent jurisdiction.
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
                  If you have questions about these Terms, contact us at{" "}
                  <a href="mailto:hello@seqrets.app" className="text-primary hover:underline">
                    hello@seqrets.app
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

export default TermsOfService;
