"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Tag, Bell } from "lucide-react";
import Image from "next/image";
import { Product, Parent } from "@/Features/Shop/Data/ProductData";

const MobileHero = () => {
  // Pull live data from your arrays dynamically
  const featuredProduct = Product[0];
  const featuredParent = Parent.find((p) => p._id === featuredProduct?.parent);

  // Fallback data if arrays are empty
  const heroImage =
    featuredProduct?.images[0] ||
    "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?q=80&w=800";
  const collectionLabel =
    featuredParent?.name || "Everyday Heavyweight Collection";
  const displayPrice = featuredProduct?.salePrice
    ? `₹${featuredProduct.salePrice.toLocaleString("en-IN")}`
    : "₹7,999";
  const shopUrl = featuredProduct?.slug
    ? `/shop/${featuredProduct.slug}`
    : "/shop";

  return (
    <div className="w-full pb-10 pt-2 bg-white">
      <div className="flex items-center justify-between px-5 py-3 mb-2 sticky top-0 z-10 bg-white/90 backdrop-blur-md">
        <h1 className="text-xl font-bold tracking-tight text-zinc-900">
          Stride Style
        </h1>
      </div>

      <div className="px-4">
        {/* iOS Native Main Feature Hero Card */}
        <div className="relative w-full h-135 rounded-4xl overflow-hidden bg-zinc-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <Image
            src={heroImage}
            alt={collectionLabel}
            className="absolute inset-0 w-full h-full object-cover object-center"
            fill
            priority
          />

          <div className="absolute inset-0 bg-linear-to-r from-[#e5e5e5]/95 via-[#e5e5e5]/60 to-transparent"></div>

          <div className="absolute inset-0 p-6 flex flex-col justify-between">
            <div className="mt-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 block mb-3">
                {collectionLabel}
              </span>
              <h2 className="text-[3rem] leading-[0.88] font-light uppercase tracking-tighter text-zinc-900 font-streethead drop-shadow-sm">
                Designed
                <br />
                To Live In.
                <br />
              </h2>
              <h2 className="text-3xl leading-8  uppercase tracking-tighter text-zinc-800 font-black italic mt-1">
                Premium
                <br />
                Silhouettes.
              </h2>
            </div>

            {/* iOS Micro-Interaction Tag with Dynamic Price */}
            <div className="absolute right-4 bottom-24 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg border border-zinc-200">
              <Tag className="w-3.5 h-3.5 text-zinc-900" />
              <span className="text-[13px] font-bold tracking-tight text-zinc-900">
                {displayPrice}
              </span>
            </div>

            {/* Primary Touch Call To Action */}
            <Link
              href={"/shop"}
              className="self-start inline-flex items-center gap-2 px-5 py-3.5 bg-zinc-950 text-white text-[11px] font-bold tracking-widest rounded-full active:scale-95 transition-transform shadow-lg"
            >
              EXPLORE THE COMFORT
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileHero;
