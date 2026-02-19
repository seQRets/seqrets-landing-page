import { Github, Globe, BookOpen } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-warm-border py-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/jalapeno4332/seQRets"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://seqrets.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Globe className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/jalapeno4332/seQRets"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <BookOpen className="h-5 w-5" />
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 seQRets. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/60">
            Your security is your responsibility. Use with caution.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
