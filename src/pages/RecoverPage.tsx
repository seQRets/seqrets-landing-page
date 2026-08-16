import { useEffect } from "react";
import { motion } from "framer-motion";
import { LifeBuoy, Globe, Download, Github, ShieldCheck, ArrowUpRight } from "lucide-react";
import PageHead from "@/components/PageHead";
import { PreviewPage, rise } from "@/components/preview/PreviewChrome";

/* ------------------------------------------------------------------ *
 * /recover — fourth interior page moved onto the redesign.
 *
 * Chrome and theming come from PreviewPage; this file is content only.
 *
 * Two Tailwind traps to avoid, both silent: an arbitrary box-shadow
 * wrapping a CSS var parses as a shadow COLOUR and computes to none, and
 * an opacity modifier on a var() colour computes to transparent — hence
 * the dedicated --gold-fill / --gold-line tokens.
 * ------------------------------------------------------------------ */

const RECOVER_PAGES_URL = "https://seqrets.github.io/seQRets-Recover/";
const RECOVER_DOWNLOAD_URL =
  "https://github.com/seQRets/seQRets-Recover/releases/latest/download/recover.html";
const RECOVER_REPO_URL = "https://github.com/seQRets/seQRets-Recover";
const RECOVER_RELEASES_URL =
  "https://github.com/seQRets/seQRets-Recover/releases/latest";

const WHICH_ONE: [string, string][] = [
  ["Setting up an inheritance plan", "Download. Save recover.html alongside your Qards."],
  ["Testing that your shares decrypt correctly", "Either works. Online is faster for a one-off check."],
  ["Recovering on a device that can't easily download files", "Online."],
  ["Long-term storage / archival", "Download. The hosted version depends on GitHub Pages staying up."],
  ["Verifying the tool isn't tampered with before use", "Download, then verify the SHA-256 against the release page."],
];

const RecoverPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PreviewPage>
      <PageHead
        title="Recovery Tool"
        description="seQRets Recover — open-source, single-file recovery tool for the seQRets share format. Use online for a quick check, or download for offline and inheritance use."
        path="/recover"
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
          <span className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-[14px] bg-[var(--gold-fill)]">
            <LifeBuoy className="h-6 w-6 text-[var(--gold)]" strokeWidth={1.8} />
          </span>
          <p className="font-display text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--gold)]">
            Open-source recovery tool
          </p>
          <h1 className="mt-4 font-display text-[38px] font-bold leading-[1.1] tracking-[-0.035em] sm:text-[46px] md:text-[54px]">
            seQRets Recover
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[15.5px] leading-[1.7] text-[var(--ink2)]">
            An independent, single-file recovery tool for the seQRets share
            format. The same cryptographic primitives as the main app — all it
            needs is a web browser, your Qards, and the password you set.
          </p>
        </motion.div>
      </section>

      {/* ── The two options ─────────────────────────────────── */}
      <section className="px-6 pb-14">
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
          {/* Use online */}
          <motion.div
            {...rise}
            className="flex flex-col rounded-[22px] border border-[var(--line)] bg-[var(--sf)] p-7"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-[var(--line)] bg-[var(--band)]">
                <Globe className="h-5 w-5 text-[var(--ink2)]" strokeWidth={1.8} />
              </span>
              <span className="font-display text-[11.5px] font-bold uppercase tracking-[0.14em] text-[var(--ink3)]">
                Use online — quick check
              </span>
            </div>

            <h2 className="mt-5 font-display text-[22px] font-bold tracking-[-0.02em]">
              Open in your browser
            </h2>
            <p className="mt-3 text-[14px] leading-[1.7] text-[var(--ink2)]">
              Hosted on GitHub Pages. One click and you&rsquo;re using it. Good
              for testing that your shares decrypt correctly, or for an
              emergency recovery on a device you can&rsquo;t easily save files
              to. Requires GitHub Pages to be online.
            </p>

            <ul className="mt-5 flex-1 space-y-2.5">
              {[
                "No download or install",
                "Same cryptographic primitives as the offline version",
                "Treat as a sanity check, not your inheritance plan",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--ink3)]" />
                  <span className="text-[14px] leading-[1.65] text-[var(--ink2)]">{item}</span>
                </li>
              ))}
            </ul>

            <a
              href={RECOVER_PAGES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-1.5 rounded-[10px] border border-[var(--line)] px-5 py-3 font-display text-[14px] font-semibold text-[var(--ink)] transition-colors hover:bg-[var(--band)]"
            >
              Open Recover (online)
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </motion.div>

          {/* Download offline — the recommended path */}
          <motion.div
            {...rise}
            transition={{ ...rise.transition, delay: 0.08 }}
            className="flex flex-col rounded-[22px] border border-[var(--gold-line)] bg-[var(--gold-fill)] p-7"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-[var(--gold-line)] bg-[var(--goldsoft)]">
                <Download className="h-5 w-5 text-[var(--gold)]" strokeWidth={1.8} />
              </span>
              <span className="font-display text-[11.5px] font-bold uppercase tracking-[0.14em] text-[var(--gold)]">
                Download offline — recommended
              </span>
            </div>

            <h2 className="mt-5 font-display text-[22px] font-bold tracking-[-0.02em]">
              Save recover.html
            </h2>
            <p className="mt-3 text-[14px] leading-[1.7] text-[var(--ink2)]">
              One HTML file with all dependencies inlined. Save it alongside
              your Qards. Works in any modern browser, with no internet, no
              install, no dependency on this project still being around. This is
              the right choice for inheritance and long-term archival.
            </p>

            <ul className="mt-5 flex-1 space-y-2.5">
              {[
                "Works offline forever — no network ever required",
                "SHA-256 published per release for verification",
                "Mirrorable, archivable, MIT licensed",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold)]" />
                  <span className="text-[14px] leading-[1.65] text-[var(--ink2)]">{item}</span>
                </li>
              ))}
            </ul>

            <a
              href={RECOVER_DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-1.5 rounded-[10px] bg-[var(--gold)] px-5 py-3 font-display text-[14px] font-semibold text-[var(--gold-ink)] transition-transform hover:scale-[1.02]"
            >
              Download recover.html
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Verify the download ─────────────────────────────── */}
      <section className="px-6 pb-14">
        <motion.div
          {...rise}
          className="mx-auto flex max-w-5xl items-start gap-5 rounded-[22px] border border-[var(--line)] bg-[var(--sf)] p-7"
        >
          <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-[var(--gold-fill)] sm:flex">
            <ShieldCheck className="h-5 w-5 text-[var(--gold)]" strokeWidth={1.8} />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-[17px] font-bold">
              Verify your downloaded copy
            </h3>
            <p className="mt-2.5 text-[14px] leading-[1.7] text-[var(--ink2)]">
              Every release publishes a SHA-256 hash of{" "}
              <code className="rounded border border-[var(--line)] bg-[var(--pg)] px-1.5 py-0.5 font-mono text-[12.5px] text-[var(--ink)]">
                recover.html
              </code>{" "}
              so you can confirm a copy received through an untrusted channel
              hasn&rsquo;t been modified before using it with real credentials.
            </p>

            <div className="mt-4 overflow-x-auto rounded-[12px] border border-[var(--line)] bg-[var(--pg)] px-4 py-3.5 font-mono text-[12.5px] leading-[1.7] text-[var(--ink)]">
              <span className="text-[var(--ink3)]"># macOS / Linux</span>
              <br />
              shasum -a 256 recover.html
              <br />
              <br />
              <span className="text-[var(--ink3)]"># Windows (PowerShell)</span>
              <br />
              Get-FileHash recover.html -Algorithm SHA256
            </div>

            <p className="mt-3 text-[13px] leading-[1.6] text-[var(--ink3)]">
              Compare the output to the hash published on the{" "}
              <a
                href={RECOVER_RELEASES_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[var(--gold)] underline underline-offset-2 transition-opacity hover:opacity-80"
              >
                latest release page
              </a>
              . If they don&rsquo;t match exactly, the file has been modified —
              don&rsquo;t use it.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── Which one should you use? ───────────────────────── */}
      <section className="px-6 pb-14">
        <div className="mx-auto max-w-5xl">
          <motion.h3 {...rise} className="font-display text-[17px] font-bold">
            Which one should you use?
          </motion.h3>
          <motion.div
            {...rise}
            className="mt-5 overflow-x-auto rounded-[18px] border border-[var(--line)]"
          >
            <table className="w-full min-w-[520px] text-[14px]">
              <thead>
                <tr className="bg-[var(--band)]">
                  <th className="p-4 text-left font-display font-bold text-[var(--ink)]">
                    Situation
                  </th>
                  <th className="p-4 text-left font-display font-bold text-[var(--ink)]">
                    Recommendation
                  </th>
                </tr>
              </thead>
              <tbody>
                {WHICH_ONE.map(([situation, rec]) => (
                  <tr key={situation} className="border-t border-[var(--line)]">
                    <td className="p-4 font-medium leading-[1.6] text-[var(--ink)]">
                      {situation}
                    </td>
                    <td className="p-4 leading-[1.6] text-[var(--ink2)]">{rec}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ── View source ─────────────────────────────────────── */}
      <section className="px-6 pb-24 text-center">
        <a
          href={RECOVER_REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[14px] text-[var(--ink3)] transition-colors hover:text-[var(--ink)]"
        >
          <Github className="h-4 w-4" />
          View the code base on GitHub
        </a>
      </section>
    </PreviewPage>
  );
};

export default RecoverPage;
