import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorks from "@/components/landing/HowItWorks";
import FeaturesGrid from "@/components/landing/FeaturesGrid";
import ExploreTiles from "@/components/landing/ExploreTiles";
import SecuritySection from "@/components/landing/SecuritySection";
import ComparisonTable from "@/components/landing/ComparisonTable";
import DesktopCTA from "@/components/landing/DesktopCTA";
import OpenSource from "@/components/landing/OpenSource";
import { PreviewFooter } from "@/components/preview/PreviewChrome";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorks />
        <FeaturesGrid />
        <SecuritySection />
        <DesktopCTA />
        <ComparisonTable />
        <ExploreTiles />
        <OpenSource />
      </main>
      <PreviewFooter mode="dark" />
    </div>
  );
};

export default Index;
