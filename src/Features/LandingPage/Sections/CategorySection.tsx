"use client";

import React from "react";
import MobileCategory from "../Components/Category/MobileCategory";
import DesktopCategory from "../Components/Category/DesktopCategory";

const CategorySection = () => {
  return (
    <section className="w-full bg-white text-zinc-950 select-none antialiased">
      <div className="block md:hidden w-full">
        <MobileCategory />
      </div>

      <div className="hidden md:block w-full">
        <DesktopCategory />
      </div>
    </section>
  );
};

export default CategorySection;
