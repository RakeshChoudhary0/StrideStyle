"use client";

import React from "react";
import ShowProductCard from "../Components/ShowProductCard";
import { Product } from "../Data/DealsData";

const DealsSection = () => {
  const currentMonth = new Date()
    .toLocaleString("en-US", { month: "long" })
    .toUpperCase();

  return (
    <section className="w-full bg-white text-zinc-950 select-none pt-12 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Minimalist Editorial Header Block */}
        <div className="w-full text-center py-12 md:py-16 flex flex-col items-center">
          <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-zinc-400 uppercase mb-3">
            LIMITED TIME OFFERS
          </span>

          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-[-0.02em] leading-none mb-4 font-streethead text-zinc-900">
            {currentMonth} DEALS
          </h2>

          <p className="text-zinc-400 text-xs md:text-sm tracking-[0.1em] uppercase font-medium max-w-md">
            Premium lounge essentials and heavyweight separates at curated
            pricing.
          </p>
        </div>

        {/* Clean Balanced Layout Framework: Swiper on Mobile -> Perfect 4-Column Grid on Laptop */}
        <div className="w-full relative">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none no-scrollbar snap-x snap-mandatory lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-x-visible lg:pb-0">
            {Product.slice(0, 4).map((product, index) => (
              <div
                key={product._id}
                className="min-w-[75vw] sm:min-w-[45vw] lg:min-w-0 snap-center"
              >
                <ShowProductCard product={product} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
