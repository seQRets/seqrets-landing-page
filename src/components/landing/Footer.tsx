import { Github, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import navbarIcon from "@/assets/navbar-icon.png";

const Footer = () => {
  return (
    <footer className="border-t border-border/20 py-16">
      <div className="container mx-auto px-4 md:px-8">

        {/* Main footer grid */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 mb-14">

          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img src={navbarIcon} alt="seQRets" className="h-8 w-auto rounded-md" />
            </Link>
            <p className="text-sm text-muted-foreground/60 leading-relaxed">
              Protect your most sensitive information today — and ensure the right people can access it tomorrow.
            </p>
            <div className="flex items-center gap-4 pt-1">
              <a
                href="https://github.com/seQRets/seQRets-app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground/40 transition-colors hover:text-foreground"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="mailto:hello@seqrets.app"
                className="text-muted-foreground/40 transition-colors hover:text-foreground"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60">Product</h4>
            <ul className="space-y-3">
              <li><a href="https://app.seqrets.app" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground/60 transition-colors hover:text-foreground">Web App (Free)</a></li>
              <li><a href="#desktop" className="text-sm text-muted-foreground/60 transition-colors hover:text-foreground">Desktop App</a></li>
              <li><Link to="/shop" className="text-sm text-muted-foreground/60 transition-colors hover:text-foreground">Shop</Link></li>
              <li><a href="#features" className="text-sm text-muted-foreground/60 transition-colors hover:text-foreground">Features</a></li>
            </ul>
          </div>

          {/* Learn */}
          <div className="space-y-4">
            <h4 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60">Learn</h4>
            <ul className="space-y-3">
              <li><a href="#how-it-works" className="text-sm text-muted-foreground/60 transition-colors hover:text-foreground">How It Works</a></li>
              <li><Link to="/how-it-works" className="text-sm text-muted-foreground/60 transition-colors hover:text-foreground">Deep Dive</Link></li>
              <li><Link to="/security" className="text-sm text-muted-foreground/60 transition-colors hover:text-foreground">Security</Link></li>
              <li>
                <a
                  href="https://github.com/seQRets/seQRets-app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground/60 transition-colors hover:text-foreground"
                >
                  Open Source
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:hello@seqrets.app" className="text-sm text-muted-foreground/60 transition-colors hover:text-foreground">
                  hello@seqrets.app
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/seQRets/seQRets-app/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground/60 transition-colors hover:text-foreground"
                >
                  Report an Issue
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/seQRets/seQRets-app/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground/60 transition-colors hover:text-foreground"
                >
                  Community
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/15 pt-8 flex flex-col items-center gap-3 text-center">
          <p className="text-xs text-muted-foreground/50">
            © 2026 seQRets. All rights reserved. Licensed under AGPLv3.
          </p>
          <p className="text-[11px] text-muted-foreground/30">
            Your security is your responsibility. Use with caution.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
