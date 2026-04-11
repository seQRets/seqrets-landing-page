import { ViteReactSSG } from "vite-react-ssg";
import routes from "./App";
import "./index.css";

/* Catch fatal errors that occur outside the React tree (e.g. during
   router initialisation) where the in-tree ErrorBoundary can't reach. */
if (typeof window !== "undefined") {
  window.addEventListener("error", () => {
    const root = document.getElementById("root");
    if (root && !root.hasChildNodes()) {
      root.innerHTML =
        '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;font-family:system-ui,sans-serif;color:#e4e4e7;text-align:center;padding:2rem">' +
        '<h1 style="font-size:1.5rem;font-weight:700;margin-bottom:1rem">Something went wrong</h1>' +
        '<p style="color:#a1a1aa;margin-bottom:2rem">An unexpected error occurred. Please refresh the page.</p>' +
        '<button onclick="location.reload()" style="padding:.75rem 2rem;border-radius:.375rem;background:#6d28d9;color:#fff;border:none;cursor:pointer;font-weight:600">Refresh Page</button>' +
        "</div>";
    }
  });
}

export const createRoot = ViteReactSSG({ routes });
