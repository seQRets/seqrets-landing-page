import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CartProvider } from "./contexts/CartContext";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import HowItWorksPage from "./pages/HowItWorksPage";
import FeaturesPage from "./pages/FeaturesPage";
import SecurityPage from "./pages/SecurityPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import CheckoutCancel from "./pages/CheckoutCancel";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import NotFound from "./pages/NotFound";
import DocsLayout from "./components/docs/DocsLayout";
import DocsHub from "./pages/docs/DocsHub";
import DocsTechnical from "./pages/docs/DocsTechnical";
import DocsInheritance from "./pages/docs/DocsInheritance";
import DocsThreatModel from "./pages/docs/DocsThreatModel";
import DocsProducts from "./pages/docs/DocsProducts";
import DocsFaq from "./pages/docs/DocsFaq";

const DEFAULT_TITLE = "seQRets — Secure. Split. Share.";
const DEFAULT_DESC =
  "Encrypt & split your secrets into QR codes using Shamir's Secret Sharing. Zero-knowledge crypto inheritance for Bitcoin seed phrases.";

const App = () => (
  <CartProvider>
    <BrowserRouter>
      {/* Default meta — overridden per-page by PageHead / DocsHead */}
      <Helmet>
        <title>{DEFAULT_TITLE}</title>
        <meta name="description" content={DEFAULT_DESC} />
        <meta property="og:title" content={DEFAULT_TITLE} />
        <meta property="og:description" content={DEFAULT_DESC} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://seqrets.app" />
        <meta property="og:image" content="https://seqrets.app/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="seQRets" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={DEFAULT_TITLE} />
        <meta name="twitter:description" content={DEFAULT_DESC} />
        <meta name="twitter:image" content="https://seqrets.app/og-image.png" />
        <link rel="canonical" href="https://seqrets.app" />
      </Helmet>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
        <Route path="/checkout/cancel" element={<CheckoutCancel />} />
        <Route path="/docs" element={<DocsLayout />}>
          <Route index element={<DocsHub />} />
          <Route path="technical" element={<DocsTechnical />} />
          <Route path="inheritance" element={<DocsInheritance />} />
          <Route path="threat-model" element={<DocsThreatModel />} />
          <Route path="products" element={<DocsProducts />} />
          <Route path="faq" element={<DocsFaq />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </CartProvider>
);

export default App;
