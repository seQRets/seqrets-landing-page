import { Github, Scale, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const OpenSource = () => {
  return (
    <section className="py-24 md:py-32 bg-section-alt">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mx-auto max-w-4xl rounded-2xl border border-border/50 bg-card/30 p-8 md:p-12">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <p className="font-display text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground mb-4">
                Open Source & Trust
              </p>
              <h2 className="font-display text-3xl font-bold md:text-4xl text-foreground mb-4">
                Verify, Don't Trust
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                seQRets is fully open source under the AGPLv3 license. Every line of cryptographic
                code is auditable. We believe security software must be transparent — anything less
                demands blind trust.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Scale className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm text-foreground">Licensed under AGPLv3</span>
              </div>
              <div className="flex items-center gap-3">
                <Github className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm text-foreground">Full source code on GitHub</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm text-foreground">Community contributions welcome</span>
              </div>
              <Button variant="outline" className="mt-4 font-display font-semibold border-border/50" asChild>
                <a href="https://github.com/seqrets" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  View on GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpenSource;
