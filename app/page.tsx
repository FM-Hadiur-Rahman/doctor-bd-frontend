import HeroSection from "@/src/components/home/HeroSection";
import FeatureSection from "@/src/components/home/FeatureSection";
import HowItWorks from "@/src/components/home/HowItWorks";
import SpecialtyGrid from "@/src/components/home/SpecialtyGrid";
import TrustSection from "@/src/components/home/TrustSection";
import PromoBanners from "@/src/components/home/PromoBanners";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <HeroSection />
      <FeatureSection />
      <HowItWorks />
      <TrustSection />
      <PromoBanners />
      <SpecialtyGrid />
    </main>
  );
}
