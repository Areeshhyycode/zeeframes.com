import HeroSection from "../components/HeroSection";
import VideoSection from "../components/VideoSection";
import ServicesSection from "../components/ServicesSection";
import ShowcaseSection from "../components/ShowcaseSection";
import ProcessSection from "../components/ProcessSection";

export default function Home() {
  return (
    <main className="bg-black overflow-x-hidden">
      <HeroSection />
      <VideoSection />
      <ServicesSection />
      <ShowcaseSection />
      <ProcessSection />
    </main>
  );
}
