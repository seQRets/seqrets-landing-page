import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import navbarIcon from "@/assets/navbar-icon.png";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Security", href: "#security" },
  { label: "Desktop App", href: "#desktop" },
  { label: "Shop", href: "/shop", isRoute: true },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <a href="#" className="flex items-center gap-3">
          <img src={navbarIcon} alt="seQRets" className="h-9 w-auto rounded-md" />
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) =>
            link.isRoute ? (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            )
          )}
          <Button asChild size="sm" className="font-display font-semibold">
            <a href="https://seqrets.app" target="_blank" rel="noopener noreferrer">
              Get Started Free
            </a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border/50 bg-background px-4 pb-6 pt-4 md:hidden">
          {navLinks.map((link) =>
            link.isRoute ? (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            )
          )}
          <Button asChild size="sm" className="mt-4 w-full font-display font-semibold">
            <a href="https://seqrets.app" target="_blank" rel="noopener noreferrer">
              Get Started Free
            </a>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
