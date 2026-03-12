import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import DocsBreadcrumbs from "./DocsBreadcrumbs";
import DocsSidebar from "./DocsSidebar";

const DocsLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 md:px-8 pt-24 pb-16 max-w-6xl">
        <DocsBreadcrumbs />
        <div className="lg:flex lg:gap-10">
          <DocsSidebar />
          <main className="flex-1 min-w-0 lg:max-w-3xl">
            <Outlet />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DocsLayout;
