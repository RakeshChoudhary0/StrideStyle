"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "../../Data/categeoryData";

const MobileCategory = () => {
  return (
    <div className="w-full py-6 px-4 bg-white">
      {/* Streamlined Header Section */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-black tracking-tight text-zinc-900 uppercase font-streethead">
          Shop By Category
        </h2>
        <Link
          href="/shop"
          className="text-xs font-bold text-zinc-400 active:text-zinc-950 flex items-center gap-1"
        >
          See All <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Clean Square Grid Layout */}
      <div className="grid grid-cols-2 gap-3">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={cat.linkUrl}
            className="group relative aspect-square rounded-2xl overflow-hidden bg-zinc-100 block active:scale-[0.98] transition-transform duration-100"
          >
            {/* Image Layer */}
            <div className="absolute inset-0 w-full h-full z-0">
              <Image
                src={cat.imgUrl}
                alt={cat.title}
                fill
                sizes="50vw"
                className="object-cover object-center"
              />
              {/* Text contrast layer */}
              <div className="absolute inset-0 bg-linear-to-t from-zinc-950/70 via-transparent to-transparent" />
            </div>

            {/* Bottom Title Frame */}
            <div className="absolute inset-x-0 bottom-0 p-3.5 z-10 flex items-center justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-streethead leading-none">
                {cat.title}
              </h3>
              <ArrowRight className="w-3.5 h-3.5 text-white opacity-80" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileCategory;
