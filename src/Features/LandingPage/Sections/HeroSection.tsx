"use client";

import React from "react";
import MobileHero from "../Components/Hero/MobileHero";
import DesktopHero from "../Components/Hero/DesktopHero";

const HeroSection = () => {
  return (
    <section className="w-full  bg-white text-zinc-950 select-none overflow-hidden antialiased">
      {/* Mobile-only view render */}
      <div className="block md:hidden w-full">
        <MobileHero />
      </div>

      {/* Desktop-only view render */}
      <div className="hidden md:block w-full">
        <DesktopHero />
      </div>
    </section>
  );
};

export default HeroSection;
