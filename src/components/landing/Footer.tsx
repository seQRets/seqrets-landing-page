import { Github, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import navbarIcon from "@/assets/navbar-icon.webp";

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
            <p className="text-sm text-muted-foreground/80 leading-relaxed">
              Protect your most sensitive information today — and ensure the right people can access it tomorrow.
            </p>
            <div className="flex items-center gap-4 pt-1">
              <a
                href="https://github.com/seQRets/seQRets-app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground/60 transition-colors hover:text-foreground"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://www.youtube.com/@SVRNMoney"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground/60 transition-colors hover:text-foreground"
                aria-label="YouTube"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a
                href="mailto:hello@seqrets.app"
                className="text-muted-foreground/60 transition-colors hover:text-foreground"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/80">Product</h4>
            <ul className="space-y-3">
              <li><a href="https://app.seqrets.app" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground/80 transition-colors hover:text-foreground">Web App (Free)</a></li>
              <li><a href="/#desktop" className="text-sm text-muted-foreground/80 transition-colors hover:text-foreground">Desktop App</a></li>
              <li><Link to="/shop" className="text-sm text-muted-foreground/80 transition-colors hover:text-foreground">Shop</Link></li>
              <li><Link to="/features" className="text-sm text-muted-foreground/80 transition-colors hover:text-foreground">Features</Link></li>
            </ul>
          </div>

          {/* Learn */}
          <div className="space-y-4">
            <h4 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/80">Learn</h4>
            <ul className="space-y-3">
              <li><Link to="/how-it-works" className="text-sm text-muted-foreground/80 transition-colors hover:text-foreground">How It Works</Link></li>
              <li><Link to="/security" className="text-sm text-muted-foreground/80 transition-colors hover:text-foreground">Security</Link></li>
              <li><Link to="/docs" className="text-sm text-muted-foreground/80 transition-colors hover:text-foreground">Documentation</Link></li>
              <li><Link to="/blog" className="text-sm text-muted-foreground/80 transition-colors hover:text-foreground">Blog</Link></li>
              <li>
                <a
                  href="https://github.com/seQRets/seQRets-app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground/80 transition-colors hover:text-foreground"
                >
                  Open Source
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/80">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:hello@seqrets.app" className="text-sm text-muted-foreground/80 transition-colors hover:text-foreground">
                  hello@seqrets.app
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/seQRets/seQRets-app/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground/80 transition-colors hover:text-foreground"
                >
                  Report an Issue
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/seQRets/seQRets-app/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground/80 transition-colors hover:text-foreground"
                >
                  Community
                </a>
              </li>
              <li><Link to="/pgp" className="text-sm text-muted-foreground/80 transition-colors hover:text-foreground">PGP Key</Link></li>
              <li><Link to="/privacy" className="text-sm text-muted-foreground/80 transition-colors hover:text-foreground">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-muted-foreground/80 transition-colors hover:text-foreground">Terms of Service</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/15 pt-8 flex flex-col items-center gap-3 text-center">
          <p className="text-xs text-muted-foreground/70">
            © {new Date().getFullYear()} seQRets. All rights reserved. Licensed under AGPLv3.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground/60">
            <Link to="/privacy" className="transition-colors hover:text-foreground">Privacy</Link>
            <span>·</span>
            <Link to="/terms" className="transition-colors hover:text-foreground">Terms</Link>
          </div>
          <p className="text-[11px] text-muted-foreground/50">
            Your security is your responsibility. Use with caution.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
