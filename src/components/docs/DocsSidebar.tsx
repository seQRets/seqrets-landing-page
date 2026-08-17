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
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-[14px] transition-colors ${
                active
                  ? "bg-[var(--gold-fill)] font-medium text-[var(--gold)]"
                  : "text-[var(--ink2)] hover:bg-[var(--sf)] hover:text-[var(--ink)]"
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
      {/* Desktop sidebar — offset by the 72px sticky nav plus a little air */}
      <aside className="sticky top-[88px] hidden w-56 shrink-0 self-start lg:block">
        {navContent}
      </aside>

      {/* Mobile dropdown */}
      <div className="mb-6 lg:hidden">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          className="flex w-full items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--sf)] px-4 py-2.5 text-[14px] font-medium text-[var(--ink)]"
        >
          <Menu className="h-4 w-4" />
          Docs Menu
        </button>
        {mobileOpen && (
          <div className="mt-2 rounded-lg border border-[var(--line)] bg-[var(--sf)] p-3">
            {navContent}
          </div>
        )}
      </div>
    </>
  );
};

export default DocsSidebar;
