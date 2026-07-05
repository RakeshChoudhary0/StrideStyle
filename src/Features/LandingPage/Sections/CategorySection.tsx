"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "../Data/categeoryData";

const CategorySection = () => {
  return (
    <section className="w-full bg-white text-zinc-950 md:py-20 py-4 px-4 sm:px-6 lg:px-12 select-none border-t border-zinc-100">
      <div className="w-full flex flex-col items-center">
        <div className="text-center md:mb-16 mb-6 space-y-3">
          <h2 className="text-3xl md:text-5xl font-streethead font-black uppercase tracking-tight text-zinc-900">
            SHOP BY CATEGORY
          </h2>
          <div className="h-px w-8 bg-zinc-950 mx-auto opacity-30"></div>
          <p className="text-zinc-500 text-xs tracking-wider max-w-sm mx-auto font-medium">
            Discover precision-cut silhouettes designed for the contemporary
            street wardrobe.
          </p>
        </div>

        <div className="w-full grid grid-cols-2 gap-2 sm:gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.linkUrl}
              className="group relative w-full aspect-3/4 overflow-hidden bg-zinc-50 rounded-none block border border-zinc-100/50"
            >
              <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                <Image
                  src={cat.imgUrl}
                  alt={cat.title}
                  fill
                  sizes="(max-w-640px) 50vw, (max-w-1024px) 33vw, 25vw"
                  className="object-cover object-center transform scale-100 transition-transform duration-[1200ms] cubic-bezier(0.25, 1, 0.5, 1) group-hover:scale-106"
                  priority={true}
                />

                <div className="absolute inset-0 bg-linear-to-t from-zinc-950/80 via-zinc-950/20 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
              </div>

              {cat.count && (
                <div className="absolute top-4 left-4 z-10 bg-white/10 border border-white/10 backdrop-blur-md px-2.5 py-1 transition-all duration-300 group-hover:bg-white group-hover:border-white">
                  <span className="text-[9px] text-white font-bold tracking-widest uppercase transition-colors duration-300 group-hover:text-zinc-950">
                    {cat.count} Units
                  </span>
                </div>
              )}

              <div className="absolute bottom-5 left-5 right-5 z-10 flex items-end justify-between pointer-events-none">
                <div className="space-y-1">
                  <h3 className="text-sm md:text-base font-bold uppercase tracking-[0.08em] text-white">
                    {cat.title}
                  </h3>
                  <span className="inline-block text-[10px] text-zinc-300 font-semibold tracking-wider lowercase opacity-0 -translate-x-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0">
                    explore collection &rarr;
                  </span>
                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/0 text-white backdrop-blur-xs transition-all duration-300 ease-out group-hover:bg-white group-hover:text-zinc-950 group-hover:border-white">
                  <ArrowRight className="w-3.5 h-3.5 transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 md:mt-16 md:mb-0 mb-7 text-center">
          <Link
            href="/shop"
            className="group inline-flex items-center justify-center border border-zinc-950 bg-transparent px-10 py-4 text-xs font-bold uppercase tracking-[0.15em] text-zinc-950 transition-all duration-300 hover:bg-zinc-950 hover:text-white sm:text-sm"
          >
            Browse Full Catalog
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
