import { Github, Scale, Users } from "lucide-react";

const OpenSource = () => {
  return (
    <section className="relative py-32 md:py-40 bg-section-alt">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />

      <div className="container mx-auto px-4 md:px-8">
        <div className="mx-auto max-w-4xl rounded-2xl border border-border/30 bg-card/20 p-10 md:p-14">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <p className="font-display text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground/60 mb-5">
                Open Source & Trust
              </p>
              <h2 className="font-display text-3xl font-black md:text-4xl text-foreground mb-5 tracking-tight">
                Don't Trust,
                <br />
                <span className="text-gradient">Verify</span>
              </h2>
              <p className="text-sm text-muted-foreground/80 leading-relaxed">
                seQRets is fully open source under the AGPLv3 license. Every line of cryptographic
                code is auditable. We believe security software must be transparent — anything less
                demands blind trust.
              </p>
            </div>
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Scale className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm text-foreground/80">Licensed under AGPLv3</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Github className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm text-foreground/80">Full source code on GitHub</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm text-foreground/80">Community contributions welcome</span>
              </div>
              <a
                href="https://github.com/jalapeno4332/seQRets"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center rounded-full border border-border/50 bg-card/20 px-6 py-2.5 font-display text-sm font-semibold text-foreground transition-all hover:bg-card/40 hover:border-primary/30"
              >
                <Github className="mr-2 h-4 w-4" />
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpenSource;
