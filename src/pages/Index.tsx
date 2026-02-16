import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorks from "@/components/landing/HowItWorks";
import FeaturesGrid from "@/components/landing/FeaturesGrid";
import SecuritySection from "@/components/landing/SecuritySection";
import ComparisonTable from "@/components/landing/ComparisonTable";
import DesktopCTA from "@/components/landing/DesktopCTA";
import OpenSource from "@/components/landing/OpenSource";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorks />
        <FeaturesGrid />
        <SecuritySection />
        <ComparisonTable />
        <DesktopCTA />
        <OpenSource />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
