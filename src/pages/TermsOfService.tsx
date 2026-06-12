import { useEffect } from "react";

import { Scale, AlertTriangle, Shield, FileText, Code, ShoppingBag, Mail, Gavel, UserCheck, Info, Ban, RefreshCw, Building2, ShieldOff } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import PageHead from "@/components/PageHead";

const TermsOfService = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-background">
      <PageHead
        title="Terms of Service"
        description="Terms and conditions for using seQRets software and services, operated by Toothjockey LLC."
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
            Effective date: May 1, 2026 &nbsp;·&nbsp; Last revised: June 12, 2026
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
              These Terms of Service ("Terms") govern your access to and use of the seQRets website at <strong className="text-foreground">seqrets.app</strong>, the web application at <strong className="text-foreground">app.seqrets.app</strong>, and the seQRets desktop application (collectively, the "Services"). The Services are operated by <strong className="text-foreground">Toothjockey LLC</strong>, a North Dakota limited liability company ("Toothjockey," "we," "us," or "our"). "seQRets" is a product of Toothjockey LLC. By accessing or using any of our Services, you agree to be bound by these Terms. If you do not agree, you must discontinue use immediately.
            </p>
            <p className="text-sm text-muted-foreground/80 mt-4">
              The seQRets application presents these Terms through a versioned acceptance gate. You must affirmatively accept the then-current version of these Terms before using the application. Your acceptance is recorded by version. See <em className="text-foreground/90">Changes to These Terms</em> below for how material changes trigger renewed acceptance.
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
                <strong className="text-foreground">In plain English:</strong> seQRets encrypts your secrets, splits them into multiple QR-code shares ("Qards"), and lets you distribute them. Everything runs on your device. We have no ability to access, recover, or view your data — ever.
              </p>
              <p className="text-sm text-muted-foreground/80 mb-4">
                seQRets provides client-side cryptographic tools that encrypt sensitive information (for example, a cryptocurrency seed phrase) on your own device using XChaCha20-Poly1305 authenticated encryption with an Argon2id key-derivation function, and split the result into threshold shares using Shamir's Secret Sharing, rendered as QR codes we call "Qards."
              </p>
              <p className="text-sm text-muted-foreground/80">
                All cryptographic operations occur entirely on your device — in an isolated browser Web Worker on the web app, and in native Rust code on the desktop app. <strong className="text-foreground">Toothjockey operates no server backend that processes, stores, transmits, or has access to your secrets, passwords, keyfiles, shares, Qards, or any cryptographic material.</strong> The core application has no user accounts, no identity verification, and collects no user data. Because we never possess your material, <strong className="text-foreground">we cannot recover, reset, restore, decrypt, or reconstruct anything for you.</strong> If you lose your Qards, password, or keyfile below your chosen recovery threshold, your secret is permanently unrecoverable by anyone, including us.
              </p>
            </div>
          </section>

          {/* Eligibility */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 flex items-center justify-center gap-3">
              <UserCheck className="h-7 w-7 text-primary shrink-0" />
              Eligibility
            </h2>
            <div className="rounded-2xl border border-border/30 bg-card/20 p-6">
              <p className="text-sm text-muted-foreground/80 mb-4">
                <strong className="text-foreground">In plain English:</strong> You must be an adult with the legal capacity to enter a contract, and you must use seQRets only where it's legal to do so.
              </p>
              <p className="text-sm text-muted-foreground/80">
                You must be at least the age of majority in your jurisdiction (18 years of age in most jurisdictions) and have the legal capacity to enter into a binding contract to use the Services. By using the Services, you represent and warrant that you meet these requirements, that you are not barred from using the Services under the laws of any applicable jurisdiction, and that you will use the Services only in compliance with these Terms and all applicable laws.
              </p>
            </div>
          </section>

          {/* User Responsibilities / Assumption of Risk */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 flex items-center justify-center gap-3">
              <Scale className="h-7 w-7 text-primary shrink-0" />
              Your Responsibilities & Assumption of Risk
            </h2>
            <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6">
              <p className="text-sm text-muted-foreground/80 mb-4">
                <strong className="text-foreground">In plain English:</strong> You — and only you — are responsible for your secrets, passwords, keyfiles, and Qard shares. If you lose them, they're gone forever. We can't help you recover anything. That's the design, not a defect.
              </p>
              <p className="text-sm text-muted-foreground/80 mb-4">
                You acknowledge that the Services are tools for managing irreplaceable secrets, that their use carries inherent and irreversible risk, and that you accept that risk. By using the Services, you acknowledge and accept sole responsibility for the following:
              </p>
              <ul className="space-y-3 text-sm text-muted-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span><strong className="text-foreground">Passwords and keyfiles:</strong> You are solely responsible for choosing, remembering, and securely storing the passwords and any keyfiles used to encrypt your secrets. There is no password reset and no recovery mechanism of any kind.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span><strong className="text-foreground">Share custody and distribution:</strong> You are solely responsible for the safekeeping and distribution of your Qard shares. If you lose enough shares to fall below your chosen reconstruction threshold, your secret is permanently irrecoverable.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span><strong className="text-foreground">Backups:</strong> You are solely responsible for creating and maintaining adequate backups of your secrets, shares, and any information needed to reconstruct them. We maintain no backups and have no copy of anything.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span><strong className="text-foreground">Device security:</strong> You are responsible for ensuring that any device on which you run seQRets is free from malware, compromised browser extensions, keyloggers, screen capture, and other threats, and that your operating environment is trustworthy.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span><strong className="text-foreground">Lawful use:</strong> You are responsible for using the Services only for lawful purposes and in compliance with all laws and regulations applicable to you.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* No Advice */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 flex items-center justify-center gap-3">
              <Info className="h-7 w-7 text-primary shrink-0" />
              No Professional Advice
            </h2>
            <div className="rounded-2xl border border-border/30 bg-card/20 p-6">
              <p className="text-sm text-muted-foreground/80 mb-4">
                <strong className="text-foreground">In plain English:</strong> seQRets is a software tool, not an advisor. We don't give financial, investment, legal, tax, or estate-planning advice. Talk to a licensed professional for that.
              </p>
              <p className="text-sm text-muted-foreground/80">
                seQRets is a software tool and does not provide financial, investment, legal, tax, estate-planning, or other professional advice. Nothing in the Services — including any documentation, in-app guidance, the "Bob" assistant, blog content, or other materials — constitutes professional advice or a recommendation to take or refrain from any action. You are solely responsible for your decisions regarding the management, inheritance, and disposition of your secrets and assets. For advice specific to your circumstances, consult a qualified, licensed professional in the relevant field.
              </p>
            </div>
          </section>

          {/* Acceptable Use */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 flex items-center justify-center gap-3">
              <Ban className="h-7 w-7 text-primary shrink-0" />
              Acceptable Use
            </h2>
            <div className="rounded-2xl border border-border/30 bg-card/20 p-6">
              <p className="text-sm text-muted-foreground/80 mb-4">
                <strong className="text-foreground">In plain English:</strong> Don't use seQRets to break the law or to attack, abuse, or misrepresent the software.
              </p>
              <p className="text-sm text-muted-foreground/80 mb-4">
                You agree not to use the Services to, and not to attempt to:
              </p>
              <ul className="space-y-3 text-sm text-muted-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>violate any applicable law or regulation, or facilitate any unlawful activity, including money laundering, sanctions evasion, or the financing of illegal activity;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>infringe the intellectual property, privacy, or other rights of any person;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>interfere with, disrupt, or compromise the integrity or security of the Services or any related systems, or attempt to gain unauthorized access to them;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>misrepresent your affiliation with Toothjockey or seQRets, or distribute modified versions of the software in a way that implies official endorsement; or</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>use the Services in any manner not permitted by these Terms or by the software's open-source license.</span>
                </li>
              </ul>
              <p className="text-sm text-muted-foreground/70 mt-4">
                Lawful security research and review of the open-source code in accordance with its license are permitted and encouraged. Responsible disclosure of vulnerabilities is welcomed at <a href="mailto:security@seqrets.app" className="text-primary hover:underline">security@seqrets.app</a>.
              </p>
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
                <strong className="text-foreground">In plain English:</strong> seQRets is provided "as is." It's software that hasn't been independently audited yet. We believe the cryptography is sound — the code is open source and uses well-established primitives — but we make no guarantees. Use it at your own risk.
              </p>
              <p className="text-sm text-muted-foreground/80 uppercase font-semibold">
                The Services are provided "as is" and "as available," without warranty of any kind, whether express, implied, or statutory, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, title, accuracy, and non-infringement. Toothjockey does not warrant that the Services will be uninterrupted, timely, secure, available, accurate, complete, or error-free, or that defects or vulnerabilities will be corrected. seQRets has not undergone an independent third-party security audit. You acknowledge that you use the Services entirely at your own risk. Some jurisdictions do not allow the exclusion of certain warranties, so some of the above exclusions may not apply to you.
              </p>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 flex items-center justify-center gap-3">
              <Gavel className="h-7 w-7 text-primary shrink-0" />
              Limitation of Liability
            </h2>
            <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6">
              <p className="text-sm text-muted-foreground/80 mb-4">
                <strong className="text-foreground">In plain English:</strong> We are not liable if you lose access to your secrets, lose cryptocurrency, or suffer any other loss from using seQRets. Because we have zero access to your data, we have zero ability to help recover it — and our total liability to you is capped.
              </p>
              <p className="text-sm text-muted-foreground/80 mb-4 uppercase font-semibold">
                To the maximum extent permitted by applicable law, in no event shall Toothjockey LLC or its members, managers, employees, contributors, maintainers, or affiliates be liable for any indirect, incidental, special, consequential, exemplary, or punitive damages, or for any loss of profits, revenue, data, goodwill, cryptocurrency, digital assets, or other intangible losses, and specifically including any lost funds, lost cryptocurrency, lost or corrupted data, or inability to recover or reconstruct any secret, password, keyfile, share, or Qard, arising out of or relating to (a) your use of or inability to use the Services; (b) loss of access to or destruction of any encrypted secret, share, password, keyfile, or Qard; (c) unauthorized access to or alteration of your device, transmissions, or data; (d) any bug, error, defect, or vulnerability in the software; (e) the conduct of any third party, including any third-party service described in our Privacy Policy; or (f) any other matter relating to the Services. This applies whether the claim is based in warranty, contract, tort (including negligence), strict liability, or any other legal theory, and whether or not Toothjockey has been advised of the possibility of such damages.
              </p>
              <p className="text-sm text-muted-foreground/80">
                <strong className="text-foreground">Aggregate cap.</strong> To the maximum extent permitted by applicable law, the total aggregate liability of Toothjockey LLC arising out of or relating to the Services and these Terms shall not exceed <strong className="text-foreground">zero U.S. dollars (US$0.00)</strong>. The Services are provided to you free of charge, and you acknowledge that this allocation of risk — including a zero-dollar liability cap — is a fundamental basis of the bargain between you and Toothjockey and is reflected in the decision to provide the Services at no cost. Some jurisdictions do not allow the limitation or exclusion of liability for certain damages, so some of the above limitations may not apply to you; in those jurisdictions, our liability is limited to the smallest amount permitted by law. Nothing in these Terms excludes or limits liability that cannot be excluded or limited under applicable law.
              </p>
            </div>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 flex items-center justify-center gap-3">
              <ShieldOff className="h-7 w-7 text-primary shrink-0" />
              Indemnification
            </h2>
            <div className="rounded-2xl border border-border/30 bg-card/20 p-6">
              <p className="text-sm text-muted-foreground/80 mb-4">
                <strong className="text-foreground">In plain English:</strong> If your misuse of seQRets causes a legal problem for us, you agree to cover the resulting costs.
              </p>
              <p className="text-sm text-muted-foreground/80">
                To the maximum extent permitted by applicable law, you agree to indemnify, defend, and hold harmless Toothjockey LLC and its members, managers, employees, contributors, maintainers, and affiliates from and against any claims, liabilities, damages, losses, and expenses, including reasonable attorneys' fees, arising out of or in any way connected with (a) your use or misuse of the Services; (b) your violation of these Terms; (c) your violation of any applicable law or the rights of any third party; or (d) your handling, storage, or distribution of your secrets, shares, or Qards. Toothjockey reserves the right to assume the exclusive defense and control of any matter otherwise subject to indemnification by you, in which case you agree to cooperate with our defense of that claim.
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
                <strong className="text-foreground">In plain English:</strong> The source code is open source under AGPLv3 (or any later version). You can read, audit, fork, and modify it — subject to that license. Commercial licensing is available separately.
              </p>
              <p className="text-sm text-muted-foreground/80 mb-3">
                The seQRets source code is released under the <strong className="text-foreground">GNU Affero General Public License, version 3 or any later version (AGPL-3.0-or-later)</strong>. You may use, copy, modify, and distribute the source code in accordance with that license. The full license text is available in the project's <a href="https://github.com/seQRets/seQRets-app" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub repository</a>. These Terms govern your use of the Services we operate; the AGPL governs your rights in the source code itself. In the event of a conflict between these Terms and the AGPL with respect to the source code, the AGPL controls as to the code.
              </p>
              <p className="text-sm text-muted-foreground/80">
                For commercial licensing inquiries (use in proprietary products, enterprise deployments, or contexts where AGPL obligations are not feasible), contact <a href="mailto:licensing@seqrets.app" className="text-primary hover:underline">licensing@seqrets.app</a>.
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
                <strong className="text-foreground">In plain English:</strong> The desktop app and physical accessories are paid products. When the shop launches, purchases will be handled through a third-party payment processor. We'll add specific purchase terms at that time.
              </p>
              <p className="text-sm text-muted-foreground/80">
                Certain products, including the seQRets desktop application and physical accessories, may be offered for purchase. All payment processing is handled by third-party providers; Toothjockey does not directly collect or store your full payment card details. Specific purchase terms — including pricing, refund policy, and delivery terms — will be presented at the point of sale and are incorporated into these Terms by reference.
                {/* TODO(legal): confirm payment processor (Stripe) and refund policy before the shop launches. */}
              </p>
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <div className="rounded-2xl border border-border/30 bg-card/20 p-6">
              <h2 className="font-display text-xl font-bold text-foreground mb-3">Intellectual Property</h2>
              <p className="text-sm text-muted-foreground/80">
                The "seQRets" and "Qard" names, the seQRets logo, and the associated branding are the property of Toothjockey LLC. The source code is licensed under AGPL-3.0-or-later as described above. Third-party libraries used in seQRets retain their respective licenses and copyrights. Nothing in these Terms grants you rights to our trademarks or branding beyond what is necessary to use the Services or as permitted by the open-source license.
              </p>
            </div>
          </section>

          {/* Termination */}
          <section>
            <div className="rounded-2xl border border-border/30 bg-card/20 p-6">
              <h2 className="font-display text-xl font-bold text-foreground mb-3">Termination</h2>
              <p className="text-sm text-muted-foreground/80">
                Because the core application has no accounts, there is nothing to "terminate" in the traditional sense. You may stop using the Services at any time. We reserve the right to modify, suspend, or discontinue the Services (or any part of them) at any time, with or without notice. Because the software is open source, the cryptographic tools remain available to the community regardless of the status of our hosted Services. The provisions of these Terms that by their nature should survive termination — including <em className="text-foreground/90">Your Responsibilities & Assumption of Risk</em>, <em className="text-foreground/90">Disclaimer of Warranties</em>, <em className="text-foreground/90">Limitation of Liability</em>, <em className="text-foreground/90">Indemnification</em>, and <em className="text-foreground/90">Governing Law & Venue</em> — survive.
              </p>
            </div>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 flex items-center justify-center gap-3">
              <RefreshCw className="h-7 w-7 text-primary shrink-0" />
              Changes to These Terms
            </h2>
            <div className="rounded-2xl border border-border/30 bg-card/20 p-6">
              <p className="text-sm text-muted-foreground/80 mb-4">
                <strong className="text-foreground">In plain English:</strong> We can update these terms. The app uses a versioned acceptance gate — when we make a material change, you'll be asked to accept the new version before continuing.
              </p>
              <p className="text-sm text-muted-foreground/80">
                We may update these Terms from time to time. The revised version will be posted at this URL with an updated revision date. The seQRets application records your acceptance by version. When we make a material change to these Terms, the application will present the updated Terms through its acceptance gate and require you to accept the new version before continuing to use the application. Your continued use of the Services after the effective date of a change, or your acceptance through the in-app gate, constitutes your acceptance of the updated Terms. If you do not agree to a revised version, you must stop using the Services. Material changes will also be noted in our <a href="https://github.com/seQRets/seQRets-app" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub repository</a>.
              </p>
            </div>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 flex items-center justify-center gap-3">
              <Building2 className="h-7 w-7 text-primary shrink-0" />
              Governing Law &amp; Venue
            </h2>
            <div className="rounded-2xl border border-border/30 bg-card/20 p-6">
              <p className="text-sm text-muted-foreground/80 mb-4">
                <strong className="text-foreground">In plain English:</strong> These terms are governed by North Dakota law. Most disputes are resolved by binding arbitration in Cass County, North Dakota, individually rather than as a class action.
              </p>
              <p className="text-sm text-muted-foreground/80 mb-4">
                These Terms and any dispute arising out of or relating to them or the Services are governed by the laws of the <strong className="text-foreground">State of North Dakota, USA</strong>, without regard to its conflict-of-law principles. Subject to the arbitration provision below, you agree that the exclusive venue for any dispute shall be the state and federal courts located in <strong className="text-foreground">Cass County, North Dakota</strong>, and you consent to the personal jurisdiction of those courts. If you access the Services from outside the United States, you are responsible for compliance with your local laws.
              </p>
              <p className="text-sm text-muted-foreground/80 mb-4">
                <strong className="text-foreground">Binding arbitration.</strong> Except for claims that qualify for small-claims court and claims seeking injunctive relief for infringement or misuse of intellectual property, you and Toothjockey agree to resolve any dispute arising out of or relating to these Terms or the Services through final and binding arbitration, rather than in court. The arbitration will be seated in <strong className="text-foreground">Cass County, North Dakota</strong>, conducted in English, and governed by North Dakota law. Judgment on the arbitration award may be entered in any court of competent jurisdiction. You and Toothjockey each waive the right to a trial by jury.
                {/* TODO(legal): confirm arbitration administrator and rules (e.g., AAA Consumer Arbitration Rules), fee allocation, and any opt-out window before launch. */}
              </p>
              <p className="text-sm text-muted-foreground/80">
                <strong className="text-foreground">Class-action waiver.</strong> You and Toothjockey agree that each may bring claims against the other only in your or its individual capacity, and not as a plaintiff or class member in any purported class, consolidated, or representative proceeding. The arbitrator may not consolidate more than one person's claims and may not preside over any form of a representative or class proceeding. If this class-action waiver is found unenforceable as to a particular claim, that claim — and only that claim — shall be severed and brought in the courts of Cass County, North Dakota.
              </p>
            </div>
          </section>

          {/* Severability & Entire Agreement */}
          <section>
            <div className="rounded-2xl border border-border/30 bg-card/20 p-6">
              <h2 className="font-display text-xl font-bold text-foreground mb-3">Severability &amp; Entire Agreement</h2>
              <p className="text-sm text-muted-foreground/80 mb-3">
                If any provision of these Terms is held to be invalid, unlawful, or unenforceable, that provision will be modified to the minimum extent necessary to make it enforceable, or severed if it cannot be modified, and the remaining provisions will remain in full force and effect.
              </p>
              <p className="text-sm text-muted-foreground/80">
                These Terms, together with the Privacy Policy and any terms presented at the point of sale for paid products, constitute the entire agreement between you and Toothjockey LLC regarding the Services and supersede any prior agreements on that subject. Our failure to enforce any provision is not a waiver of that provision. You may not assign these Terms without our prior written consent; we may assign them in connection with a merger, acquisition, or sale of assets.
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
                <h2 className="font-display text-xl font-bold text-foreground mb-2">Questions or Legal Notices</h2>
                <p className="text-muted-foreground/80">
                  These Services are operated by Toothjockey LLC (North Dakota, USA). For questions about these Terms or to send a legal notice, see our{" "}
                  <Link to="/contact" className="text-primary hover:underline">Contact page</Link>{" "}
                  or email{" "}
                  <a href="mailto:hello@seqrets.app" className="text-primary hover:underline">
                    hello@seqrets.app
                  </a>
                  .
                </p>
                <p className="text-sm text-muted-foreground/70 mt-3">
                  Legal notices and service of process may be sent to: Toothjockey LLC, 3003 32nd Ave S, Ste 240, Fargo, ND 58103, USA.
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
