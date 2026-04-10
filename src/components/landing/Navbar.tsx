import { useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { DOCS_NAV } from "@/components/docs/DocsNav";
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

const docsSubPages = DOCS_NAV.filter((item) => item.path !== "");

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [docsOpen, setDocsOpen] = useState(false);
  const [docsExpanded, setDocsExpanded] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
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

  const openDocs = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDocsOpen(true);
  };
  const closeDocs = () => {
    closeTimer.current = setTimeout(() => setDocsOpen(false), 150);
  };

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

            if (link.isScroll) {
              return (
                <a key={link.href} href="#" onClick={handleHomeClick} className={cls}>
                  {link.label}
                </a>
              );
            }

            /* Docs — hover dropdown */
            if (link.label === "Docs") {
              return (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={openDocs}
                  onMouseLeave={closeDocs}
                >
                  <Link to="/docs" className={`${cls} flex items-center gap-1`}>
                    Docs
                    <ChevronDown
                      className={`h-3 w-3 transition-transform duration-200 ${docsOpen ? "rotate-180" : ""}`}
                    />
                  </Link>

                  <AnimatePresence>
                    {docsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[340px]"
                      >
                        <div className="rounded-2xl border border-border/30 bg-background/95 backdrop-blur-2xl p-2 shadow-xl">
                          {docsSubPages.map((item) => {
                            const Icon = item.icon;
                            return (
                              <Link
                                key={item.path}
                                to={`/docs/${item.path}`}
                                onClick={() => setDocsOpen(false)}
                                className="flex items-start gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-foreground/5"
                              >
                                <div className="mt-0.5 rounded-lg bg-primary/10 p-2">
                                  <Icon className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                                  <p className="text-xs text-muted-foreground/60 leading-relaxed">
                                    {item.description}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            if (link.isRoute) {
              return (
                <Link key={link.href} to={link.href} className={cls}>
                  {link.label}
                </Link>
              );
            }

            return (
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
          className="hidden lg:inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30"
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
          {navLinks.map((link) => {
            if (link.isScroll) {
              return (
                <a
                  key={link.href}
                  href="#"
                  onClick={(e) => { handleHomeClick(e); setOpen(false); }}
                  className="block py-3 text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              );
            }

            /* Docs — expand/collapse */
            if (link.label === "Docs") {
              return (
                <div key={link.href}>
                  <button
                    onClick={() => setDocsExpanded(!docsExpanded)}
                    aria-expanded={docsExpanded}
                    className="flex w-full items-center justify-between py-3 text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
                  >
                    Docs
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${docsExpanded ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {docsExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 pb-2 space-y-1">
                          <Link
                            to="/docs"
                            onClick={() => { setOpen(false); setDocsExpanded(false); }}
                            className="block py-2 text-sm text-foreground/50 hover:text-foreground transition-colors"
                          >
                            All Docs
                          </Link>
                          {docsSubPages.map((item) => (
                            <Link
                              key={item.path}
                              to={`/docs/${item.path}`}
                              onClick={() => { setOpen(false); setDocsExpanded(false); }}
                              className="block py-2 text-sm text-foreground/50 hover:text-foreground transition-colors"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            if (link.isRoute) {
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              );
            }

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { handleAnchorClick(e, link.href); setOpen(false); }}
                className="block py-3 text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            );
          })}
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
