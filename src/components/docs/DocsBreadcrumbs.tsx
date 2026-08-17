import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { DOCS_NAV } from "./DocsNav";

const DocsBreadcrumbs = () => {
  const { pathname } = useLocation();
  const segment = pathname.replace("/docs", "").replace(/^\//, "");
  const current = DOCS_NAV.find((item) => item.path === segment);

  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-8 flex items-center gap-1.5 text-[13.5px] text-[var(--ink3)]"
    >
      <Link to="/docs" className="transition-colors hover:text-[var(--ink)]">
        Docs
      </Link>
      {current && current.path !== "" && (
        <>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-[var(--ink2)]">{current.label}</span>
        </>
      )}
    </nav>
  );
};

export default DocsBreadcrumbs;
