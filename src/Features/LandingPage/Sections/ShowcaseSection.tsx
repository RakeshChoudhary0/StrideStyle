"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ShowcaseSection = () => {
  const [selectedSize, setSelectedSize] = useState("L");

  return (
    <section className="w-full h-auto md:h-[50vh] min-h-[400px] bg-[#181a1f] text-white flex flex-col md:flex-row select-none">
      <div className="w-full md:w-1/2 h-[340px] md:h-full relative flex items-center justify-center p-4">
        <div className="relative w-full h-full  md:max-w-[360px] max-w-[300px] transition-transform duration-300 hover:-translate-y-1">
          <Image
            src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80"
            alt="Men's Heavyweight Tee"
            fill
            priority
            className="object-cover rounded-[24px] object-bottom"
          />
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 pb-12 md:py-0 md:px-16 lg:px-24">
        <span className="text-zinc-400 text-[10px] md:text-xs font-semibold tracking-widest uppercase mb-1 block">
          Men&apos;s Streetwear Drop // 01
        </span>

        <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-3">
          BOX-FIT HEAVYWEIGHT TEE
        </h2>

        <p className="text-zinc-400 text-xs md:text-sm leading-relaxed mb-6 max-w-md">
          Engineered from 320GSM ultra-dense organic cotton loopback. Features
          signature dropped shoulders and an authentic boxy structural cut
          designed specifically for a premium men&apos;s silhouette.
        </p>

        {/* Size Selection */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-[11px] font-bold uppercase text-zinc-400">
            Size:
          </span>
          <div className="flex gap-2">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-8 h-8 text-[11px] font-bold rounded transition-all ${
                  selectedSize === size
                    ? "bg-white text-black"
                    : "bg-white/5 text-zinc-300 hover:bg-white/10"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-xl md:text-2xl font-black">₹1,299</span>
          <span className="text-xs line-through text-zinc-500">₹1,999</span>
          <span className="text-[10px] bg-white text-black font-black px-1.5 py-0.5 rounded uppercase">
            35% OFF
          </span>
        </div>

        <Link
          href="/checkout"
          className="inline-block w-full sm:w-48 py-3.5 bg-white text-black text-xs font-bold tracking-widest uppercase text-center rounded transition-all hover:bg-zinc-200 active:scale-95"
        >
          BUY NOW
        </Link>
      </div>
    </section>
  );
};

export default ShowcaseSection;
