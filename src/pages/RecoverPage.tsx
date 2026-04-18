import { useEffect } from "react";
import { LifeBuoy, Globe, Download, Github, ShieldCheck } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import PageHead from "@/components/PageHead";

const RECOVER_PAGES_URL = "https://seqrets.github.io/seQRets-Recover/";
const RECOVER_DOWNLOAD_URL =
  "https://github.com/seQRets/seQRets-Recover/releases/latest/download/recover.html";
const RECOVER_REPO_URL = "https://github.com/seQRets/seQRets-Recover";
const RECOVER_RELEASES_URL =
  "https://github.com/seQRets/seQRets-Recover/releases/latest";

const RecoverPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PageHead
        title="Recovery Tool"
        description="seQRets Recover — open-source, single-file recovery tool for the seQRets share format. Use online for a quick check, or download for offline and inheritance use."
        path="/recover"
      />
      <Navbar />
      <main className="container mx-auto px-4 md:px-8 py-24 max-w-5xl">
        {/* Hero */}
        <div className="mb-14 text-center">
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
            <LifeBuoy className="h-6 w-6 text-primary" />
          </div>
          <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground/70 mb-4">
            Open-Source Recovery Tool
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-black text-foreground tracking-tight mb-5">
            seQRets <span className="text-gradient">Recover</span>
          </h1>
          <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
            An independent, single-file recovery tool for the seQRets share
            format. Same audited cryptography as the main app — just a web
            browser and your Qards.
          </p>
        </div>

        {/* Two options */}
        <div className="grid gap-6 md:grid-cols-2 mb-12">
          {/* Use Online */}
          <div className="flex flex-col rounded-2xl border border-border/40 bg-card/30 p-7">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-card/60 border border-border/40">
                <Globe className="h-5 w-5 text-foreground/70" />
              </div>
              <span className="font-display text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground/60">
                Use Online — Quick Check
              </span>
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-3">
              Open in Your Browser
            </h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed mb-5">
              Hosted on GitHub Pages. One click and you're using it. Good for
              testing that your shares decrypt correctly, or for an emergency
              recovery on a device you can't easily save files to. Requires
              GitHub Pages to be online.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground/70 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-foreground/40 mt-0.5">•</span>
                <span>No download or install</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground/40 mt-0.5">•</span>
                <span>Same cryptographic primitives as the offline version</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground/40 mt-0.5">•</span>
                <span>Treat as a sanity check, not your inheritance plan</span>
              </li>
            </ul>
            <a
              href={RECOVER_PAGES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center justify-center gap-2 rounded-md border border-border/60 bg-background/40 px-5 py-3 text-sm font-semibold text-foreground transition-all hover:bg-card/60"
            >
              Open Recover (Online) →
            </a>
          </div>

          {/* Download Offline */}
          <div className="flex flex-col rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-transparent p-7">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 border border-primary/30">
                <Download className="h-5 w-5 text-primary" />
              </div>
              <span className="font-display text-xs font-semibold uppercase tracking-[0.15em] text-primary/80">
                Download Offline — Recommended
              </span>
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-3">
              Save recover.html
            </h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed mb-5">
              One HTML file with all dependencies inlined. Save it alongside
              your Qards. Works in any modern browser, with no internet, no
              install, no dependency on this project still being around. This
              is the right choice for inheritance and long-term archival.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground/70 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Works offline forever — no network ever required</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>SHA-256 published per release for verification</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Mirrorable, archivable, MIT licensed</span>
              </li>
            </ul>
            <a
              href={RECOVER_DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
            >
              Download recover.html →
            </a>
          </div>
        </div>

        {/* SHA-256 verify */}
        <div className="rounded-2xl border border-border/30 bg-card/20 p-6 mb-12">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 shrink-0">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-display text-base font-bold text-foreground mb-2">
                Verify your downloaded copy
              </h3>
              <p className="text-sm text-muted-foreground/80 mb-3">
                Every release publishes a SHA-256 hash of{" "}
                <code className="text-xs bg-background/60 border border-border/40 rounded px-1.5 py-0.5 text-foreground">
                  recover.html
                </code>{" "}
                so you can confirm a copy received through an untrusted channel
                hasn't been modified before using it with real credentials.
              </p>
              <div className="rounded-lg border border-border/30 bg-background/50 px-4 py-3 font-mono text-xs text-muted-foreground/90 mb-2 overflow-x-auto">
                <span className="text-muted-foreground/50"># macOS / Linux</span>
                <br />
                shasum -a 256 recover.html
                <br />
                <br />
                <span className="text-muted-foreground/50">
                  # Windows (PowerShell)
                </span>
                <br />
                Get-FileHash recover.html -Algorithm SHA256
              </div>
              <p className="text-xs text-muted-foreground/60">
                Compare the output to the hash published on the{" "}
                <a
                  href={RECOVER_RELEASES_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  latest release page
                </a>
                . If they don't match exactly, the file has been modified —
                don't use it.
              </p>
            </div>
          </div>
        </div>

        {/* When to use which */}
        <div className="rounded-2xl border border-border/30 bg-card/20 p-6 mb-12">
          <h3 className="font-display text-base font-bold text-foreground mb-4">
            Which one should you use?
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/30">
                  <th className="text-left p-3 font-display font-bold text-foreground">
                    Situation
                  </th>
                  <th className="text-left p-3 font-display font-bold text-foreground">
                    Recommendation
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                {[
                  [
                    "Setting up an inheritance plan",
                    "Download. Save recover.html alongside your Qards.",
                  ],
                  [
                    "Testing that your shares decrypt correctly",
                    "Either works. Online is faster for a one-off check.",
                  ],
                  [
                    "Recovering on a device that can't easily download files",
                    "Online.",
                  ],
                  [
                    "Long-term storage / archival",
                    "Download. The hosted version depends on GitHub Pages staying up.",
                  ],
                  [
                    "Verifying the tool isn't tampered with before use",
                    "Download, then verify the SHA-256 against the release page.",
                  ],
                ].map(([situation, rec]) => (
                  <tr key={situation} className="hover:bg-card/20 transition-colors">
                    <td className="p-3 font-medium text-foreground">{situation}</td>
                    <td className="p-3 text-muted-foreground/80">{rec}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* View source */}
        <div className="text-center">
          <a
            href={RECOVER_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground/70 hover:text-foreground transition-colors"
          >
            <Github className="h-4 w-4" />
            View source on GitHub
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RecoverPage;
