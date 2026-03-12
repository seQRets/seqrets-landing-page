import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import navbarIcon from "@/assets/navbar-icon.webp";

const navLinks = [
  { label: "Home", href: "#top", isScroll: true },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Security", href: "#security" },
  { label: "Docs", href: "/docs", isRoute: true },
  { label: "Go Pro!", href: "#desktop" },
  { label: "Shop", href: "/shop", isRoute: true },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const handleAnchorClick = (e: React.MouseEvent, href: string) => {
    if (location.pathname !== "/") {
      e.preventDefault();
      navigate("/" + href);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-2xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img src={navbarIcon} alt="seQRets" className="h-8 w-auto rounded-md" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) =>
            link.isScroll ? (
              <a
                key={link.href}
                href="#"
                onClick={handleHomeClick}
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
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="text-[13px] font-medium text-foreground/60 transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            )
          )}
        </div>

        <Link
          to="/shop"
          className="hidden lg:inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
        >
          Go Pro! 🚀
        </Link>

        {/* Mobile/tablet toggle */}
        <button
          className="lg:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="bg-background/95 backdrop-blur-2xl px-4 pb-6 pt-4 lg:hidden">
          {navLinks.map((link) =>
            link.isScroll ? (
              <a
                key={link.href}
                href="#"
                onClick={(e) => { handleHomeClick(e); setOpen(false); }}
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
                onClick={(e) => { handleAnchorClick(e, link.href); setOpen(false); }}
                className="block py-3 text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            )
          )}
          <Link
            to="/shop"
            onClick={() => setOpen(false)}
            className="mt-4 block w-full rounded-md bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground"
          >
            Go Pro! 🚀
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
