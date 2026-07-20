"use client";

import React from "react";
import ShowProductCard from "../Components/ShowProductCard";
import { Product } from "@/Features/Shop/Data/ProductData";

const DealsSection = () => {
  const currentMonth = new Date()
    .toLocaleString("en-US", { month: "long" })
    .toUpperCase();

  // Filter products with active discounts dynamically to ensure relevance
  const renderingList = Product.filter((p) => p.discount > 0).slice(0, 4);

  return (
    <section className="w-full bg-white text-zinc-950 select-none border-t border-zinc-100 antialiased overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Breathable Header Block */}
        <div className="w-full text-center mb-12 md:mb-20 flex flex-col items-center space-y-3">
          <span className="text-[10px] md:text-xs font-bold tracking-[0.25em] text-zinc-400 uppercase">
            LIMITED TIME OFFERS
          </span>

          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none text-zinc-900 font-streethead">
            {currentMonth} DEALS
          </h2>

          <div className="h-px w-8 bg-zinc-900 opacity-20 my-2" />

          <p className="text-zinc-500 text-xs md:text-sm tracking-wide max-w-md mx-auto font-medium leading-relaxed">
            Premium lounge essentials and heavyweight separates at curated
            pricing.
          </p>
        </div>

        {/* Fluid Adaptive Track: Scroll on Mobile/Tablet (md) -> Rigid Grid on Desktop (lg) */}
        <div className="w-full relative">
          <div className="flex md:flex-row gap-5 overflow-x-auto pb-6 lg:pb-0 scrollbar-none no-scrollbar snap-x snap-mandatory lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-x-visible">
            {renderingList.map((product, index) => (
              <div
                key={product._id}
                className="min-w-[78vw] sm:min-w-[45vw] md:min-w-[33vw] lg:min-w-0 snap-start shrink-0 bg-white"
              >
                {/* Embedded ShowProductCard Wrapper */}
                <div className="w-full h-full transform active:scale-[0.99] lg:hover:scale-[1.01] lg:active:scale-100 transition-transform duration-200">
                  <ShowProductCard product={product} index={index} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
