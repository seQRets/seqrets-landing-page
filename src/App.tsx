import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import HowItWorksPage from "./pages/HowItWorksPage";
import SecurityPage from "./pages/SecurityPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import CheckoutCancel from "./pages/CheckoutCancel";
import NotFound from "./pages/NotFound";
import DocsLayout from "./components/docs/DocsLayout";
import DocsHub from "./pages/docs/DocsHub";
import DocsTechnical from "./pages/docs/DocsTechnical";
import DocsInheritance from "./pages/docs/DocsInheritance";
import DocsThreatModel from "./pages/docs/DocsThreatModel";
import DocsProducts from "./pages/docs/DocsProducts";
import DocsFaq from "./pages/docs/DocsFaq";

const App = () => (
  <CartProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
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
