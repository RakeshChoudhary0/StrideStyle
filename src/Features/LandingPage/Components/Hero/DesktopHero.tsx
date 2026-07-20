"use client";

import React from "react";
import Link from "next/link";
import ShowProductCard from "../ShowProductCard";
import { Product } from "@/Features/Shop/Data/ProductData";

const DesktopHero = () => {
  return (
    <div className="w-full h-screen pb-10 lg:min-h-screen bg-white text-zinc-950 select-none pt-24 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        <div className="w-full text-center py-14 flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-[-0.02em] leading-[0.95] mb-4 font-streethead max-w-3xl text-zinc-900">
            DESIGNED TO LIVE IN.
          </h1>

          <p className="text-zinc-400 text-xs md:text-sm tracking-widest uppercase font-medium md:mb-8 mb-5 max-w-md">
            Premium heavyweight silhouettes crafted for everyday comfort.
          </p>

          <Link
            href="/shop"
            className="px-10 py-4 bg-zinc-950 text-white text-xs font-bold tracking-[0.25em] uppercase transition-all duration-200 border border-zinc-950 hover:bg-white hover:text-zinc-950 rounded-none active:scale-98"
          >
            EXPLORE THE COMFORT
          </Link>
        </div>

        {/* Clean Header Rule Line */}
        <div className="w-full flex items-end justify-between border-b border-zinc-100 pb-3 mb-6">
          <h2 className="text-xs md:text-sm font-bold tracking-[0.15em] uppercase text-zinc-900 font-streethead">
            NEW ARRIVALS
          </h2>
          <Link
            href="/shop"
            className="text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase text-zinc-400 hover:text-zinc-950 transition-colors duration-200"
          >
            VIEW ALL
          </Link>
        </div>

        {/* Perfect Structural Layout Grid */}
        <div className="w-full relative">
          <div className="lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-x-visible lg:pb-0">
            {Product.slice(0, 4).map((product, index) => (
              <div key={product._id} className="lg:min-w-0">
                <ShowProductCard product={product} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopHero;
