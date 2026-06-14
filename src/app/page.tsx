import Features from "@/features/home/FeaturesSection";

import Hero from "@/features/home/HeroSection";
import TrendingSection from "@/features/home/TrendingSection";
import ContactUs from "@/features/home/ContactUs";

const Home = () => {
  return (
    <div className="h-full w-full ">
      <Hero />
      <Features />
      <TrendingSection />

      <ContactUs />
    </div>
  );
};

export default Home;
