import Features from "@/features/home/FeaturesSection";
import FeaturesCard from "@/features/home/components/FeaturesCard";
import Hero from "@/features/home/HeroSection";
import TrendingSection from "@/features/home/TrendingSection";

const Home = () => {
  return (
    <div className="h-full w-full ">
      <Hero />
      <Features />
      <TrendingSection />
    </div>
  );
};

export default Home;
