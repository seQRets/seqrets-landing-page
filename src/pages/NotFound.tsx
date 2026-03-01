import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import notFoundBg from "@/assets/404-bg.png";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-end bg-cover bg-center pb-16 px-6 text-center"
      style={{ backgroundImage: `url(${notFoundBg})` }}
    >
      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-8 py-4 text-base font-bold shadow-lg hover:opacity-90 transition-opacity"
      >
        Ooops! Get Me Outa Here!
      </Link>
    </div>
  );
};

export default NotFound;
