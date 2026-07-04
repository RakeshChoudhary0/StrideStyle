"use client";

import React from "react";
import MainProductCard from "@/Components/Products/MainProductCard";
import { Product } from "../Data/ArrivalsData";
import { Parent } from "../Data/ArrivalsData";

const ArrivalsSection = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-12">
      <div className="mb-6 px-1">
        <h2 className="text-lg font-bold tracking-tight text-zinc-950 uppercase">
          New Arrivals
        </h2>
      </div>

      {/* Grid container perfectly aligned for mobile (2 columns) and desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-3 gap-y-8 justify-items-center">
        {Product.map((prod) => {
          // Find the parent information to pass down available fallback options
          const parentData = Parent.find((p) => p._id === prod.parent);
          const colors = parentData ? parentData.totalColors : [];

          return (
            <MainProductCard
              key={prod._id}
              product={prod}
              availableColors={colors}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ArrivalsSection;
