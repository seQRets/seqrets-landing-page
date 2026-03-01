import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import brokenQr from "@/assets/404-qr.png";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground px-6 text-center">
      <img
        src={brokenQr}
        alt="Broken QR code looking sad"
        className="w-48 h-48 mb-8 opacity-90"
      />
      <p className="text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-3">
        Error 404
      </p>
      <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
        This secret doesn't exist.
      </h1>
      <p className="text-muted-foreground max-w-md mb-2">
        Either someone hid it <em>too</em> well, or this page never existed in the first place.
      </p>
      <p className="text-muted-foreground/60 text-sm mb-10">
        Even our QR codes are confused.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-semibold hover:opacity-80 transition-opacity"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default NotFound;
