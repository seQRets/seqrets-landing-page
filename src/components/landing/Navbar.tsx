import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import navbarIcon from "@/assets/navbar-icon.webp";

const navLinks = [
  { label: "Home", href: "#top", isScroll: true },
  { label: "How It Works", href: "/how-it-works", isRoute: true },
  { label: "Features", href: "/features", isRoute: true },
  { label: "Security", href: "/security", isRoute: true },
  { label: "Docs", href: "/docs", isRoute: true },
  { label: "Blog", href: "/blog", isRoute: true },
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
      window.scrollTo({ top: 0 });
    }
  };

  const handleAnchorClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      // Wait for home page to render, then scroll to the section
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const isActive = (link: typeof navLinks[number]) => {
    if (link.isScroll) return location.pathname === "/";
    if (link.isRoute) return location.pathname.startsWith(link.href);
    return false;
  };

  const baseCls = "text-[13px] font-medium rounded-md px-3 py-1.5 transition-all";
  const activeCls = `${baseCls} bg-foreground/10 text-foreground`;
  const inactiveCls = `${baseCls} text-foreground/60 hover:bg-foreground/5 hover:text-foreground`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-2xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <Link to="/" onClick={handleHomeClick} className="flex items-center gap-3">
          <img src={navbarIcon} alt="seQRets" className="h-8 w-auto rounded-md" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const cls = isActive(link) ? activeCls : inactiveCls;
            return link.isScroll ? (
              <a
                key={link.href}
                href="#"
                onClick={handleHomeClick}
                className={cls}
              >
                {link.label}
              </a>
            ) : link.isRoute ? (
              <Link
                key={link.href}
                to={link.href}
                className={cls}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className={cls}
              >
                {link.label}
              </a>
            );
          })}
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
