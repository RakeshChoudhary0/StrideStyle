"use client";

import React from "react";
import MainProductCard from "@/Components/Products/MainProductCard";
import { Product, Parent } from "@/Features/Shop/Data/ProductData";

const ArrivalsSection = () => {
  return (
    <section className="w-full bg-white text-zinc-950 py-16 md:py-24 px-4 sm:px-6 lg:px-8 select-none border-t border-zinc-100 antialiased">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Balanced Header Block */}
        <div className="text-center mb-12 md:mb-16 space-y-2">
          <h2 className="text-3xl md:text-5xl font-streethead font-black uppercase tracking-tight text-zinc-900">
            NEW ARRIVALS
          </h2>
          <p className="text-zinc-400 text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold">
            Fresh Seasonal Drop &bull; Premium Heavyweight Silhouettes
          </p>
        </div>

        {/* Clean, Uniform Full-Width Product Grid */}
        <div className="w-full grid grid-cols-2 gap-x-2 gap-y-8 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4">
          {Product.map((prod) => {
            // Find parent configuration to pass color attributes down safely
            const parentData = Parent.find((p) => p._id === prod.parent);
            const colors = parentData ? parentData.totalColors : [];

            return (
              <div
                key={prod._id}
                className="w-full transform active:scale-[0.99] transition-transform duration-150"
              >
                <MainProductCard product={prod} availableColors={colors} />
              </div>
            );
          })}
        </div>

        {/* Action Trigger Block */}
        <div className="mt-14 md:mt-20 text-center w-full sm:w-auto">
          <a
            href="/new-arrivals"
            className="inline-flex w-full sm:w-auto items-center justify-center border border-zinc-950 bg-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] text-zinc-950 transition-all duration-300 hover:bg-zinc-950 hover:text-white active:scale-98"
          >
            Explore Full Drop
          </a>
        </div>
      </div>
    </section>
  );
};

export default ArrivalsSection;
