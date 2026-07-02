import ArrivalsSection from "@/Features/LandingPage/Sections/ArrivalsSection";
import CardSection from "@/Features/LandingPage/Sections/ShowcaseSection";
import DealsSection from "@/Features/LandingPage/Sections/DealsSection";
import FollowOnInstagramSection from "@/Features/LandingPage/Sections/FollowOnInstagramSection";
import HeroSection from "@/Features/LandingPage/Sections/HeroSection";

const Home = () => {
  return (
    <div className="h-full w-full ">
      <HeroSection />
      <DealsSection />
      <CardSection />
      <ArrivalsSection />
      <FollowOnInstagramSection />
    </div>
  );
};

export default Home;
