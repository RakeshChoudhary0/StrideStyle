"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "../../Data/categeoryData";

const DesktopCategory = () => {
  return (
    <div className="max-w-7xl mx-auto px-8 py-20 border-t border-zinc-100">
      {/* Header Block Section */}
      <div className="text-center mb-16 space-y-3">
        <h2 className="text-5xl font-streethead font-black uppercase tracking-tight text-zinc-900">
          SHOP BY CATEGORY
        </h2>
        <div className="h-px w-8 bg-zinc-950 mx-auto opacity-30" />
        <p className="text-zinc-500 text-xs tracking-wider max-w-sm mx-auto font-medium">
          Discover precision-cut silhouettes designed for the contemporary
          street wardrobe.
        </p>
      </div>

      {/* Grid Layout Setup */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={cat.linkUrl}
            className="group relative w-full aspect-[3/4] overflow-hidden bg-zinc-50 rounded-none block border border-zinc-100/50"
          >
            <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
              <Image
                src={cat.imgUrl}
                alt={cat.title}
                fill
                sizes="(max-w-1024px) 50vw, 25vw"
                className="object-cover object-center transform scale-100 transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
            </div>

            {cat.count && (
              <div className="absolute top-4 left-4 z-10 bg-white/10 border border-white/10 backdrop-blur-md px-2.5 py-1 transition-all duration-200 group-hover:bg-white group-hover:border-white">
                <span className="text-[9px] text-white font-bold tracking-widest uppercase transition-colors duration-200 group-hover:text-zinc-950">
                  {cat.count} Units
                </span>
              </div>
            )}

            <div className="absolute bottom-5 left-5 right-5 z-10 flex items-end justify-between pointer-events-none">
              <div className="space-y-1">
                <h3 className="text-base font-bold uppercase tracking-[0.08em] text-white">
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

      {/* Catalog Button */}
      <div className="mt-16 text-center">
        <Link
          href="/shop"
          className="inline-flex items-center justify-center border border-zinc-950 bg-transparent px-10 py-4 text-xs font-bold uppercase tracking-[0.15em] text-zinc-950 transition-all duration-300 hover:bg-zinc-950 hover:text-white"
        >
          Browse Full Catalog
        </Link>
      </div>
    </div>
  );
};

export default DesktopCategory;
