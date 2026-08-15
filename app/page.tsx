import Navbar from "@/components/landingpage/Navbar";
import Hero from "@/components/landingpage/Hero";
import ProblemBanner from "@/components/landingpage/ProblemBanner";
import HowItWorks from "@/components/landingpage/HowItWorks";
import FeatureSection from "@/components/landingpage/FeatureSection";
import DashboardPreview from "@/components/landingpage/DashboardPreview";
import FarmerInsights from "@/components/landingpage/FarmerInsights";
import WhySagani from "@/components/landingpage/WhySagani";
import FinalCTA from "@/components/landingpage/FinalCTA";
import Footer from "@/components/landingpage/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ProblemBanner />
        <HowItWorks />
        <FeatureSection />
        <DashboardPreview />
        <FarmerInsights />
        <WhySagani />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}