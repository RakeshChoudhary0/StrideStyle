"use client";

import React from "react";
import Link from "next/link";
import ShowProductCard from "../Components/ShowProductCard";
import { Product, Parent } from "@/Features/Shop/Data/ProductData";

const HeroSection = () => {
  return (
    <section className="w-full pb-10  md:pb-0 lg:min-h-screen bg-white text-zinc-950 select-none pt-1  md:pt-24 overflow-hidden">
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

        {/* Premium Clean Collection Header Line */}
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

        {/* Balanced Structural Layout: Free Swipe Carousel on Mobile -> Perfect 4-Column Grid Grid on Laptop */}
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

export default HeroSection;
