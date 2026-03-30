import { useEffect, useState } from "react";
import { Shield, Copy, Download, Check, Terminal, Mail, Globe } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import PageHead from "@/components/PageHead";

const PGP_KEY = `-----BEGIN PGP PUBLIC KEY BLOCK-----

xjMEacpEdhYJKwYBBAHaRw8BAQdA3eq293JbcFwBSw/xCTjnHYXC+ANt9CGT
ETql5JpKZXHNJXNlcXJldHNAcHJvdG9uLm1lIDxzZXFyZXRzQHByb3Rvbi5t
ZT7CwBEEExYKAIMFgmnKRHYDCwkHCRDkYtOnOGbF2UUUAAAAAAAcACBzYWx0
QG5vdGF0aW9ucy5vcGVucGdwanMub3Jn0rnlg8wq1M8wTrws9Pi9ZDiPusFg
bhPOYOvNhgBOgpQDFQoIBBYAAgECGQECmwMCHgEWIQQsTc1mHyIFrBXDrATk
YtOnOGbF2QAA8v4BAKTBpbBF6pDat6OXR1fdOWB2euBwYu9iskWTB8Rg2eIv
AQC1ruUEtdYeGIgDuPOwH+gb4fR24YB1ydklB0X1Jt+KBs44BGnKRHYSCisG
AQQBl1UBBQEBB0A6qy3k6WUxJMVDp8z5JriKvbyNz6vf/Nl4m2reFlRJPgMB
CAfCvgQYFgoAcAWCacpEdgkQ5GLTpzhmxdlFFAAAAAAAHAAgc2FsdEBub3Rh
dGlvbnMub3BlbnBncGpzLm9yZ5Ln/ZRbn2MZRFo4bdfRkMCoCLa8do8U/BVC
lPa34TzSApsMFiEELE3NZh8iBawVw6wE5GLTpzhmxdkAAGWUAQDDbWbzN3cy
J0RToe6PWyXg9n8rkaJMgXqavfrbSnROPQD/ePEf4ltEPx+steE7Opb7Hy//
xDNfoS0mhX00N7LbBwE=
=djrs
-----END PGP PUBLIC KEY BLOCK-----`;

const FINGERPRINT = "2C4D CD66 1F22 05AC 15C3  AC04 E462 D3A7 3866 C5D9";

const PgpPage = () => {
  const [copied, setCopied] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(PGP_KEY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHead
        title="PGP Key"
        description="Send encrypted messages to seQRets. PGP public key and instructions for secure communication."
        path="/pgp"
      />
      <Navbar />
      <main className="container mx-auto px-4 md:px-8 py-24 max-w-4xl">

        {/* Header */}
        <div className="mb-16 text-center">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground/70 mb-5">
            Secure Communication
          </p>
          <h1 className="font-display text-4xl font-black md:text-6xl text-foreground tracking-tight mb-6">
            PGP <span className="text-gradient">Public Key</span>
          </h1>
          <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
            Encrypt your message before sending it to{" "}
            <a href="mailto:seqrets@proton.me" className="text-primary hover:underline">
              seqrets@proton.me
            </a>
          </p>
        </div>

        {/* Fingerprint */}
        <div className="mb-12 rounded-xl border border-border/30 bg-card/20 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-5 w-5 text-primary" />
            <h2 className="font-display text-lg font-bold text-foreground">Key Fingerprint</h2>
          </div>
          <p className="text-xs text-muted-foreground/60 mb-3">
            After importing the key, verify the fingerprint matches:
          </p>
          <code className="block text-sm md:text-base font-mono text-foreground/90 tracking-wider mb-4">
            {FINGERPRINT}
          </code>
          <pre className="overflow-x-auto rounded-lg bg-background/80 p-3 text-xs font-mono text-muted-foreground/60 leading-relaxed">
{`gpg --import pgp.txt
gpg --fingerprint seqrets@proton.me`}
          </pre>
        </div>

        {/* Public Key Block */}
        <div className="mb-16 rounded-xl border border-border/30 bg-card/20 p-6 md:p-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-bold text-foreground">Public Key</h2>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 rounded-md border border-border/40 bg-background/50 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-border/60 transition-colors"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>
              <a
                href="/pgp.txt"
                download
                className="inline-flex items-center gap-1.5 rounded-md border border-border/40 bg-background/50 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-border/60 transition-colors"
              >
                <Download className="h-3.5 w-3.5" />
                Download
              </a>
            </div>
          </div>
          <pre className="overflow-x-auto rounded-lg bg-background/80 p-4 text-xs font-mono text-foreground/70 leading-relaxed">
            {PGP_KEY}
          </pre>
        </div>

        {/* How to Use */}
        <h2 className="font-display text-2xl font-black md:text-3xl text-foreground tracking-tight mb-8 text-center">
          How to Send an <span className="text-gradient">Encrypted Message</span>
        </h2>

        <div className="space-y-8 mb-16">

          {/* Option 1: Alice & Bob */}
          <div className="rounded-xl border border-border/30 bg-card/20 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-lg bg-primary/10 p-2">
                <Globe className="h-4 w-4 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground">
                Option 1: Use aliceandbob.io
                <span className="ml-2 text-xs font-normal text-primary">(easiest)</span>
              </h3>
            </div>
            <ol className="space-y-3 text-sm text-muted-foreground/80 list-decimal list-inside">
              <li>
                Go to{" "}
                <a
                  href="https://aliceandbob.io/online-pgp-tool"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  aliceandbob.io/online-pgp-tool
                </a>
              </li>
              <li>Paste the public key above into the "Recipient's Public Key" field</li>
              <li>Type your message and click Encrypt</li>
              <li>
                Copy the encrypted output and email it to{" "}
                <a href="mailto:seqrets@proton.me" className="text-primary hover:underline">
                  seqrets@proton.me
                </a>
              </li>
            </ol>
            <p className="mt-4 text-xs text-muted-foreground/50">
              aliceandbob.io runs entirely in your browser — nothing is sent to any server.
            </p>
          </div>

          {/* Option 2: GPG CLI */}
          <div className="rounded-xl border border-border/30 bg-card/20 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-lg bg-primary/10 p-2">
                <Terminal className="h-4 w-4 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground">
                Option 2: GPG Command Line
              </h3>
            </div>
            <div className="space-y-3">
              <pre className="overflow-x-auto rounded-lg bg-background/80 p-4 text-xs font-mono text-foreground/70 leading-relaxed">
{`# Download and import the key
curl -sO https://seqrets.app/pgp.txt
gpg --import pgp.txt

# Encrypt a message
echo "Your secret message" | \\
  gpg --encrypt --armor \\
  --recipient seqrets@proton.me

# Or encrypt a file
gpg --encrypt --armor \\
  --recipient seqrets@proton.me \\
  document.pdf`}
              </pre>
              <p className="text-xs text-muted-foreground/50">
                Send the encrypted output (.asc) as an email or attachment to seqrets@proton.me.
              </p>
            </div>
          </div>

          {/* Option 3: Email Clients */}
          <div className="rounded-xl border border-border/30 bg-card/20 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-lg bg-primary/10 p-2">
                <Mail className="h-4 w-4 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground">
                Option 3: Email Clients
              </h3>
            </div>
            <div className="space-y-4 text-sm text-muted-foreground/80">
              <div>
                <p className="font-semibold text-foreground/90 mb-1">Thunderbird</p>
                <p>Built-in OpenPGP support. Go to Settings &rarr; End-to-End Encryption &rarr; OpenPGP Key Manager &rarr; Import. Then compose to seqrets@proton.me and click the encrypt button.</p>
              </div>
              <div>
                <p className="font-semibold text-foreground/90 mb-1">Apple Mail</p>
                <p>
                  Install{" "}
                  <a href="https://gpgtools.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    GPG Suite
                  </a>
                  , import the key, then compose normally — it auto-encrypts when a recipient key is available.
                </p>
              </div>
              <div>
                <p className="font-semibold text-foreground/90 mb-1">Outlook (Windows)</p>
                <p>
                  Install{" "}
                  <a href="https://gpg4win.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Gpg4win
                  </a>
                  {" "}with Kleopatra, import the key, then use the GpgOL plugin to encrypt from Outlook.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="text-center text-sm text-muted-foreground/50 mb-8">
          <p>
            Proton Mail users: messages sent to seqrets@proton.me from another Proton account
            are end-to-end encrypted automatically — no extra steps needed.
          </p>
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default PgpPage;
