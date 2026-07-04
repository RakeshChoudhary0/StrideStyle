import ArrivalsSection from "@/Features/LandingPage/Sections/ArrivalsSection";
import CardSection from "@/Features/LandingPage/Sections/ShowcaseSection";
import DealsSection from "@/Features/LandingPage/Sections/DealsSection";
import FollowOnInstagramSection from "@/Features/LandingPage/Sections/FollowOnInstagramSection";
import HeroSection from "@/Features/LandingPage/Sections/HeroSection";
import CategorySection from "@/Features/LandingPage/Sections/CategorySection";

const Home = () => {
  return (
    <div className="h-full w-full ">
      <HeroSection />
      <CategorySection />
      <DealsSection />
      <CardSection />
      <ArrivalsSection />
      <FollowOnInstagramSection />
    </div>
  );
};

export default Home;
