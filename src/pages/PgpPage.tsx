import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Shield, ShieldCheck, Copy, Download, Check, Terminal, Mail, Globe } from "lucide-react";
import PageHead from "@/components/PageHead";
import { PreviewPage, rise } from "@/components/preview/PreviewChrome";

/* ------------------------------------------------------------------ *
 * /pgp — sixth interior page moved onto the redesign.
 *
 * Chrome and theming come from PreviewPage; this file is content only.
 *
 * PGP_KEY and FINGERPRINT below are deliberately untouched by the
 * restyle — they are the material a reader verifies us against, and a
 * single altered character would either break verification or, worse,
 * quietly point at a different key. Nothing here reformats them.
 *
 * Two Tailwind traps to avoid, both silent: an arbitrary box-shadow
 * wrapping a CSS var parses as a shadow COLOUR and computes to none, and
 * an opacity modifier on a var() colour computes to transparent.
 * ------------------------------------------------------------------ */

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
    <PreviewPage>
      <PageHead
        title="PGP Key"
        description="Send encrypted messages to seQRets. PGP public key and instructions for secure communication."
        path="/pgp"
      />

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 pb-14 pt-16 md:pt-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 h-[420px] w-[46%] opacity-[.55]"
          style={{ background: "radial-gradient(60% 55% at 70% 30%, var(--goldsoft), transparent)" }}
        />
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-3xl text-center"
        >
          <p className="font-display text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--gold)]">
            Secure communication
          </p>
          <h1 className="mt-4 font-display text-[38px] font-bold leading-[1.1] tracking-[-0.035em] sm:text-[46px] md:text-[54px]">
            PGP public key
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[15.5px] leading-[1.7] text-[var(--ink2)]">
            Encrypt your message before sending it to{" "}
            <a
              href="mailto:seqrets@proton.me"
              className="font-semibold text-[var(--gold)] underline underline-offset-2 transition-opacity hover:opacity-80"
            >
              seqrets@proton.me
            </a>
          </p>
        </motion.div>
      </section>

      {/* ── Fingerprint ─────────────────────────────────────── */}
      <section className="px-6 pb-6">
        <motion.div
          {...rise}
          className="mx-auto max-w-4xl rounded-[22px] border border-[var(--line)] bg-[var(--sf)] p-6 md:p-8"
        >
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-[var(--gold)]" strokeWidth={1.8} />
            <h2 className="font-display text-[17px] font-bold">Key fingerprint</h2>
          </div>
          <p className="mt-3 text-[13px] text-[var(--ink3)]">
            After importing the key, verify the fingerprint matches:
          </p>
          <code className="mt-3 block font-mono text-[14px] tracking-wider text-[var(--ink)] md:text-[15px]">
            {FINGERPRINT}
          </code>
          <pre className="mt-4 overflow-x-auto rounded-[12px] border border-[var(--line)] bg-[var(--pg)] p-3.5 font-mono text-[12.5px] leading-[1.7] text-[var(--ink2)]">
{`gpg --import pgp.txt
gpg --fingerprint seqrets@proton.me`}
          </pre>
        </motion.div>
      </section>

      {/* ── Public key block ────────────────────────────────── */}
      <section className="px-6 pb-16">
        <motion.div
          {...rise}
          className="mx-auto max-w-4xl rounded-[22px] border border-[var(--line)] bg-[var(--sf)] p-6 md:p-8"
        >
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-[17px] font-bold">Public key</h2>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 rounded-[8px] border border-[var(--line)] px-3 py-1.5 text-[12px] font-medium text-[var(--ink2)] transition-colors hover:bg-[var(--band)] hover:text-[var(--ink)]"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-[var(--gold)]" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                {copied ? "Copied" : "Copy"}
              </button>
              <a
                href="/pgp.txt"
                download
                className="inline-flex items-center gap-1.5 rounded-[8px] border border-[var(--line)] px-3 py-1.5 text-[12px] font-medium text-[var(--ink2)] transition-colors hover:bg-[var(--band)] hover:text-[var(--ink)]"
              >
                <Download className="h-3.5 w-3.5" />
                Download
              </a>
            </div>
          </div>
          <pre className="mt-4 overflow-x-auto rounded-[12px] border border-[var(--line)] bg-[var(--pg)] p-4 font-mono text-[11.5px] leading-[1.7] text-[var(--ink2)]">
            {PGP_KEY}
          </pre>
        </motion.div>
      </section>

      {/* ── How to send ─────────────────────────────────────── */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-4xl">
          <motion.h2
            {...rise}
            className="text-center font-display text-[27px] font-bold leading-[1.2] tracking-[-0.03em] md:text-[32px]"
          >
            How to send an encrypted message
          </motion.h2>

          {/* Two-way encryption note */}
          <motion.div
            {...rise}
            className="mt-8 space-y-3 rounded-[18px] border border-[var(--gold-line)] bg-[var(--gold-fill)] p-5 text-[14px] leading-[1.7] text-[var(--ink2)] md:p-6"
          >
            <p>
              <span className="font-semibold text-[var(--ink)]">
                Planning an encrypted conversation?
              </span>{" "}
              Encryption is one-directional. To send <em>us</em> an encrypted
              message you only need{" "}
              <span className="text-[var(--ink)]">our</span> public key (below).
              For us to reply encrypted, we need{" "}
              <span className="text-[var(--ink)]">your</span> public key — so
              you&rsquo;ll want your own PGP key pair. The steps below walk you
              through generating one and sharing your public key with us. (Only
              need to send something one-way, with no reply? You can skip the
              key-generation step.)
            </p>
            <p>
              <span className="font-semibold text-[var(--ink)]">
                Skip all of this if you use Proton Mail:
              </span>{" "}
              emailing seqrets@proton.me from a Proton account is end-to-end
              encrypted in both directions automatically, with no keys to manage
              by either side — see Option 1 below.
            </p>
          </motion.div>

          <div className="mt-6 space-y-5">
            {/* Option 1 — Proton Mail, the recommended route */}
            <motion.div
              {...rise}
              className="rounded-[22px] border-2 border-[var(--gold)] bg-[var(--sf)] p-6 md:p-8"
            >
              <div className="flex items-center gap-3">
                <span className="rounded-[10px] bg-[var(--gold-fill)] p-2">
                  <ShieldCheck className="h-4 w-4 text-[var(--gold)]" strokeWidth={1.8} />
                </span>
                <h3 className="font-display text-[17px] font-bold">
                  Option 1: Proton Mail
                  <span className="ml-2 text-[12px] font-normal text-[var(--gold)]">
                    (easiest — no keys, no tools)
                  </span>
                </h3>
              </div>
              <p className="mt-4 text-[14px] leading-[1.7] text-[var(--ink2)]">
                If you use <span className="text-[var(--ink)]">Proton Mail</span>, just email{" "}
                <a
                  href="mailto:seqrets@proton.me"
                  className="font-semibold text-[var(--gold)] underline underline-offset-2 transition-opacity hover:opacity-80"
                >
                  seqrets@proton.me
                </a>{" "}
                directly. Messages between Proton accounts are end-to-end
                encrypted{" "}
                <span className="text-[var(--ink)]">in both directions</span>{" "}
                automatically — no public keys to paste, no PGP tool, no
                copy-and-paste, and replies are encrypted too. This is the
                simplest option and the one we recommend if you have (or can
                create) a Proton account.
              </p>
            </motion.div>

            {/* Option 2 — aliceandbob.io */}
            <motion.div
              {...rise}
              className="rounded-[22px] border border-[var(--line)] bg-[var(--sf)] p-6 md:p-8"
            >
              <div className="flex items-center gap-3">
                <span className="rounded-[10px] bg-[var(--gold-fill)] p-2">
                  <Globe className="h-4 w-4 text-[var(--gold)]" strokeWidth={1.8} />
                </span>
                <h3 className="font-display text-[17px] font-bold">
                  Option 2: Use aliceandbob.io
                  <span className="ml-2 text-[12px] font-normal text-[var(--ink3)]">
                    (no account needed)
                  </span>
                </h3>
              </div>
              <ol className="mt-5 list-inside list-decimal space-y-3 text-[14px] leading-[1.7] text-[var(--ink2)]">
                <li>
                  Go to{" "}
                  <a
                    href="https://aliceandbob.io/online-pgp-tool"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[var(--gold)] underline underline-offset-2 transition-opacity hover:opacity-80"
                  >
                    aliceandbob.io/online-pgp-tool
                  </a>
                </li>
                <li>
                  <span className="text-[var(--ink)]">
                    Generate your own key pair (for an encrypted reply):
                  </span>{" "}
                  on the default{" "}
                  <span className="text-[var(--ink)]">&ldquo;Generate a PGP key pair&rdquo;</span>{" "}
                  screen, enter an email and a passphrase you&rsquo;ll remember,
                  leave the curve as{" "}
                  <span className="text-[var(--ink)]">curve25519</span>, and click{" "}
                  <span className="text-[var(--ink)]">Generate</span>. Save your
                  private key and passphrase somewhere safe — you&rsquo;ll need
                  them to read our reply.{" "}
                  <span className="text-[var(--ink3)]">
                    (Skip this step if you don&rsquo;t need an encrypted reply.)
                  </span>
                </li>
                <li>
                  In the left sidebar, click the{" "}
                  <span className="text-[var(--ink)]">Encrypt</span> icon (the
                  padlock) to open{" "}
                  <span className="text-[var(--ink)]">&ldquo;Encrypt a message&rdquo;</span>
                </li>
                <li>
                  Paste <span className="text-[var(--ink)]">our</span> public key
                  (above) into the{" "}
                  <span className="text-[var(--ink)]">
                    &ldquo;Public PGP key of the receiver&rdquo;
                  </span>{" "}
                  field
                </li>
                <li>
                  In{" "}
                  <span className="text-[var(--ink)]">&ldquo;Text to encrypt&rdquo;</span>,
                  write your message — and paste{" "}
                  <span className="text-[var(--ink)]">your own public key</span>{" "}
                  at the top so we can encrypt our reply to you — then click{" "}
                  <span className="text-[var(--ink)]">Encrypt</span>
                </li>
                <li>
                  Copy the encrypted output and email it to{" "}
                  <a
                    href="mailto:seqrets@proton.me"
                    className="font-semibold text-[var(--gold)] underline underline-offset-2 transition-opacity hover:opacity-80"
                  >
                    seqrets@proton.me
                  </a>
                </li>
              </ol>
              <p className="mt-4 text-[12.5px] leading-[1.6] text-[var(--ink3)]">
                When we reply, open the tool&rsquo;s{" "}
                <span className="text-[var(--ink2)]">Decrypt</span> tab and use
                your private key and passphrase to read it. aliceandbob.io runs
                entirely in your browser — nothing is sent to any server.
              </p>
            </motion.div>

            {/* Option 3 — GPG command line */}
            <motion.div
              {...rise}
              className="rounded-[22px] border border-[var(--line)] bg-[var(--sf)] p-6 md:p-8"
            >
              <div className="flex items-center gap-3">
                <span className="rounded-[10px] bg-[var(--gold-fill)] p-2">
                  <Terminal className="h-4 w-4 text-[var(--gold)]" strokeWidth={1.8} />
                </span>
                <h3 className="font-display text-[17px] font-bold">
                  Option 3: GPG command line
                </h3>
              </div>
              <pre className="mt-5 overflow-x-auto rounded-[12px] border border-[var(--line)] bg-[var(--pg)] p-4 font-mono text-[12.5px] leading-[1.7] text-[var(--ink2)]">
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
              <p className="mt-3 text-[12.5px] leading-[1.6] text-[var(--ink3)]">
                Send the encrypted output (.asc) as an email or attachment to
                seqrets@proton.me. For an encrypted reply, also send us your own
                public key — export it with{" "}
                <code className="font-mono text-[var(--ink2)]">
                  gpg --export --armor you@example.com
                </code>
                .
              </p>
            </motion.div>

            {/* Option 4 — email clients */}
            <motion.div
              {...rise}
              className="rounded-[22px] border border-[var(--line)] bg-[var(--sf)] p-6 md:p-8"
            >
              <div className="flex items-center gap-3">
                <span className="rounded-[10px] bg-[var(--gold-fill)] p-2">
                  <Mail className="h-4 w-4 text-[var(--gold)]" strokeWidth={1.8} />
                </span>
                <h3 className="font-display text-[17px] font-bold">
                  Option 4: Email clients
                </h3>
              </div>
              <div className="mt-5 space-y-4 text-[14px] leading-[1.7] text-[var(--ink2)]">
                <div>
                  <p className="font-semibold text-[var(--ink)]">Thunderbird</p>
                  <p className="mt-1">
                    Built-in OpenPGP support. Go to Settings &rarr; End-to-End
                    Encryption &rarr; OpenPGP Key Manager &rarr; Import. Then
                    compose to seqrets@proton.me and click the encrypt button.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-[var(--ink)]">Apple Mail</p>
                  <p className="mt-1">
                    Install{" "}
                    <a
                      href="https://gpgtools.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[var(--gold)] underline underline-offset-2 transition-opacity hover:opacity-80"
                    >
                      GPG Suite
                    </a>
                    , import the key, then compose normally — it auto-encrypts
                    when a recipient key is available.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-[var(--ink)]">Outlook (Windows)</p>
                  <p className="mt-1">
                    Install{" "}
                    <a
                      href="https://gpg4win.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[var(--gold)] underline underline-offset-2 transition-opacity hover:opacity-80"
                    >
                      Gpg4win
                    </a>{" "}
                    with Kleopatra, import the key, then use the GpgOL plugin to
                    encrypt from Outlook.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Closing safety note */}
          <motion.p
            {...rise}
            className="mx-auto mt-10 max-w-2xl text-center text-[13.5px] leading-[1.7] text-[var(--ink3)]"
          >
            Always verify the key fingerprint above before trusting it. And a
            reminder: seQRets never needs your seed phrase, private keys, or
            Qards — never send those to anyone, including us.
          </motion.p>
        </div>
      </section>
    </PreviewPage>
  );
};

export default PgpPage;
