"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories } from "../Data/categeoryData";

const CategorySection = () => {
  return (
    <section className="w-full bg-[#181a1f] text-white py-16 px-4 md:px-12 select-none">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-zinc-400 text-[10px] md:text-xs font-semibold tracking-widest uppercase block mb-1">
              Curated Collections
            </span>
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight">
              SHOP BY CATEGORY
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white border-b border-zinc-500 hover:border-white pb-0.5 self-start md:self-auto transition-colors"
          >
            Browse Full Catalog
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.linkUrl}
              className="group relative w-full h-[280px] sm:h-[320px] md:h-[380px] bg-zinc-900/40 rounded-2xl overflow-hidden border border-zinc-800/60 block transition-all duration-300 hover:-translate-y-1.5 hover:border-zinc-700/80"
            >
              <div className="absolute inset-0 w-full h-full z-0">
                <Image
                  src={cat.imgUrl}
                  alt={cat.title}
                  fill
                  sizes="(max-w-640px) 100vw, (max-w-1024px) 50vw, 25vw"
                  className="object-cover object-center"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-black/5 transition-opacity group-hover:opacity-95" />
              </div>

              <div className="absolute bottom-5 left-5 right-5 z-10 flex items-end justify-between pointer-events-none">
                <div>
                  <span className="text-[10px] text-zinc-400 font-medium tracking-wide block mb-0.5">
                    {cat.count}
                  </span>
                  <h3 className="text-base md:text-lg font-black uppercase tracking-tight text-white">
                    {cat.title}
                  </h3>
                </div>

                <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 transform group-hover:rotate-45 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
