import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";
import { DOCS_NAV } from "./DocsNav";

const DocsSidebar = () => {
  const { pathname } = useLocation();
  const segment = pathname.replace("/docs", "").replace(/^\//, "");
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = DOCS_NAV.filter((item) => item.path !== ""); // exclude hub from sidebar

  const navContent = (
    <ul className="space-y-1">
      {links.map((item) => {
        const active = segment === item.path;
        const Icon = item.icon;
        return (
          <li key={item.path}>
            <Link
              to={`/docs/${item.path}`}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                active
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground/70 hover:text-foreground hover:bg-card/30"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-56 shrink-0 sticky top-24 self-start">
        {navContent}
      </aside>

      {/* Mobile dropdown */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center gap-2 rounded-lg border border-border/30 bg-card/20 px-4 py-2.5 text-sm font-medium text-foreground/80 w-full"
        >
          <Menu className="h-4 w-4" />
          Docs Menu
        </button>
        {mobileOpen && (
          <div className="mt-2 rounded-lg border border-border/30 bg-card/30 p-3">
            {navContent}
          </div>
        )}
      </div>
    </>
  );
};

export default DocsSidebar;
