"use client";

import React from "react";
import Image from "next/image";

interface MinimalProductCardProps {
  title: string;
  category: string;
  price: string;
  imageProduct: string;
  colorTags: string[];
  isNew?: boolean;
}

export default function MinimalProductCard({
  title,
  category,
  price,
  imageProduct,
  colorTags,
  isNew = false,
}: MinimalProductCardProps) {
  return (
    <div className="md:max-w-[300px] max-w-[340px]  bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xl group relative p-5 transition-all duration-300 hover:shadow-2xl flex flex-col justify-between">
      <div>
        <div className="w-full bg-gray-50 rounded-xl flex items-center justify-center mb-4 overflow-hidden relative aspect-square">
          {isNew && (
            <div className="absolute top-4 left-4 z-10 bg-[#5E2B13] text-white px-3 py-1 text-[10px] uppercase font-bold tracking-widest rounded-md">
              NEW
            </div>
          )}

          <Image
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            src={imageProduct}
            width={400}
            height={400}
          />
        </div>

        <div className="flex justify-between items-start mb-5 px-1">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-neutral-400 block uppercase mb-0.5">
              {category}
            </span>
            <h3 className="text-base md:text-lg font-black tracking-tight text-gray-900 mb-2 uppercase">
              {title}
            </h3>

            <div className="flex gap-2">
              {colorTags.map((color, i) => (
                <span
                  key={i}
                  className={`w-4 h-4 rounded-full border border-black/10 shadow-inner ${color}`}
                />
              ))}
            </div>
          </div>

          <span className="text-lg font-bold text-[#5E2B13] shrink-0 whitespace-nowrap">
            {price}
          </span>
        </div>
      </div>

      {/* Primary Action Call */}
      <button className="w-full py-3.5 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition-all active:scale-[0.98]">
        View the collection →
      </button>
    </div>
  );
}
