import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { DOCS_NAV } from "./DocsNav";

const DocsBreadcrumbs = () => {
  const { pathname } = useLocation();
  const segment = pathname.replace("/docs", "").replace(/^\//, "");
  const current = DOCS_NAV.find((item) => item.path === segment);

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground/60 mb-8">
      <Link to="/docs" className="hover:text-foreground transition-colors">
        Docs
      </Link>
      {current && current.path !== "" && (
        <>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground/80">{current.label}</span>
        </>
      )}
    </nav>
  );
};

export default DocsBreadcrumbs;
