import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import App from "./App.tsx";
import "./index.css";

// GitHub Pages SPA redirect: restore the path stored by 404.html
// [M-8] Validate against known routes to prevent open redirect via sessionStorage
const VALID_ROUTE_RE = /^\/(?:shop|how-it-works|features|security|privacy|terms|blog(?:\/[\w-]+)?|checkout\/(?:success|cancel)|docs(?:\/(?:technical|inheritance|threat-model|products|faq))?)?\/?$/;
const redirectPath = sessionStorage.getItem('redirectPath');
if (redirectPath) {
  sessionStorage.removeItem('redirectPath');
  if (VALID_ROUTE_RE.test(redirectPath)) {
    window.history.replaceState(null, '', redirectPath);
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </HelmetProvider>
  </StrictMode>
);
