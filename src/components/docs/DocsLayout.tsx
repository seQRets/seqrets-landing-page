import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { PreviewPage } from "@/components/preview/PreviewChrome";
import DocsBreadcrumbs from "./DocsBreadcrumbs";
import DocsSidebar from "./DocsSidebar";

/* ------------------------------------------------------------------ *
 * /docs/* — the docs shell, moved onto the redesign.
 *
 * Chrome and theming now come from PreviewPage, which already renders
 * the <main> landmark; everything below it is a plain div rather than a
 * second one.
 *
 * The information architecture is unchanged: breadcrumbs, a sticky
 * sidebar on large screens, and a measure-limited column for the page
 * itself. Only the colours and the surrounding chrome moved.
 * ------------------------------------------------------------------ */

const DocsLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <PreviewPage>
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-10 md:pb-24 md:pt-12">
        <DocsBreadcrumbs />
        <div className="lg:flex lg:gap-12">
          <DocsSidebar />
          <div className="min-w-0 flex-1 lg:max-w-3xl">
            <Outlet />
          </div>
        </div>
      </div>
    </PreviewPage>
  );
};

export default DocsLayout;
