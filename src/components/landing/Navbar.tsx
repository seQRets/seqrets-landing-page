import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import navbarIcon from "@/assets/navbar-icon.png";

const navLinks = [
  { label: "Home", href: "#top", isScroll: true },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Security", href: "#security" },
  { label: "Go Pro!", href: "#desktop" },
  { label: "Shop", href: "/shop", isRoute: true },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-2xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img src={navbarIcon} alt="seQRets" className="h-8 w-auto rounded-md" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) =>
            link.isScroll ? (
              <a
                key={link.href}
                href="#"
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="text-[13px] font-medium text-foreground/60 transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ) : link.isRoute ? (
              <Link
                key={link.href}
                to={link.href}
                className="text-[13px] font-medium text-foreground/60 transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] font-medium text-foreground/60 transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            )
          )}
        </div>

        <a
          href="https://seqrets.app"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center rounded-full bg-primary px-5 py-2 text-[13px] font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
        >
          Get Started
        </a>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="bg-background/95 backdrop-blur-2xl px-4 pb-6 pt-4 md:hidden">
          {navLinks.map((link) =>
            link.isScroll ? (
              <a
                key={link.href}
                href="#"
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); setOpen(false); }}
                className="block py-3 text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ) : link.isRoute ? (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            )
          )}
          <a
            href="https://seqrets.app"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block w-full rounded-full bg-primary px-5 py-2.5 text-center text-sm font-semibold text-primary-foreground"
          >
            Get Started
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
