"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const DealsSection = () => {
  // 1. Live Countdown Timer State
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 6,
    minutes: 5,
    seconds: 30,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0)
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0)
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        clearInterval(interval);
        return prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatNum = (num: number) => String(num).padStart(2, "0");

  // 2. Curated Product Focus Catalog (Updated to Indian Rupees ₹)
  const dealProducts = [
    {
      id: 1,
      title: "Boxy Heavyweight Tee",
      price: "₹999",
      originalPrice: "₹1,499",
      discount: "33% OFF",
      tag: "BESTSELLER",
      imgUrl:
        "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=80",
    },
    {
      id: 2,
      title: "Signature Street Trackpants",
      price: "₹1,399",
      originalPrice: "₹1,999",
      discount: "30% OFF",
      tag: "NEW DROP",
      imgUrl:
        "https://images.unsplash.com/photo-1551854838-212c50b4c184?w=500&auto=format&fit=crop&q=80",
    },
    {
      id: 3,
      title: "Oversized Graphic Tee",
      price: "₹1,199",
      originalPrice: "₹1,799",
      discount: "33% OFF",
      tag: "LIMITED",
      imgUrl:
        "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&auto=format&fit=crop&q=80",
    },
    {
      id: 4,
      title: "Relaxed Fit Cargo Trackpants",
      price: "₹1,499",
      originalPrice: "₹2,299",
      discount: "35% OFF",
      tag: "CRITICAL DROP",
      imgUrl:
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <section className="w-full bg-white h-[95vh] text-black py-16 px-4 md:px-12 select-none border-t border-zinc-100">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-streethead font-extrabold uppercase tracking-tight text-primary">
            DEALS OF THE MONTH
          </h2>
          <p className="text-zinc-400 text-xs tracking-widest uppercase font-semibold mt-2">
            Premium Heavyweight Combinations / Limited Drop Prices
          </p>
        </div>

        <div className="flex flex-col items-center mb-20">
          <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase mb-3">
            Hurry, Before It&apos;s Too Late!
          </span>
          <div className="flex gap-2">
            {[
              { label: "Days", val: timeLeft.days },
              { label: "Hr", val: timeLeft.hours },
              { label: "Mins", val: timeLeft.minutes },
              { label: "Sec", val: timeLeft.seconds },
            ].map((time, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-zinc-50 border border-zinc-200/60 rounded-xl font-mono text-base md:text-lg font-bold text-primary shadow-sm">
                  {formatNum(time.val)}
                </div>
                <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wide mt-1.5">
                  {time.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full flex gap-4 md:gap-6 overflow-x-auto md:p-6 scrollbar-none no-scrollbar snap-x snap-mandatory">
          {dealProducts.map((product, index) => (
            <Link
              key={product.id}
              href={`/shop/${product.id}`}
              className={`group relative min-w-[210px] md:min-w-[270px] flex-1 h-[380px] md:h-[490px] rounded-[24px] overflow-hidden shadow-sm snap-start transition-all duration-500 hover:-translate-y-2 block border border-zinc-200/40 ${
                index % 2 === 1 ? "md:mt-8" : ""
              }`}
            >
              {/* Product Layout Visual Container */}
              <div className="absolute inset-0 w-full h-full bg-zinc-100 z-0">
                <div className="absolute top-4 left-4 z-20 flex flex-col gap-1 items-start">
                  <span className="bg-primary text-white text-[9px] font-bold tracking-wider px-2 py-1 uppercase rounded-sm">
                    {product.tag}
                  </span>
                  <span className="bg-white/95 backdrop-blur-sm border border-zinc-200 text-black text-[9px] font-black tracking-wider px-2 py-0.5 rounded-sm shadow-sm">
                    {product.discount}
                  </span>
                </div>

                <Image
                  src={product.imgUrl}
                  alt={product.title}
                  fill
                  sizes="(max-w-768px) 50vw, 25vw"
                  className="w-full h-full object-cover transition-all duration-500"
                />

                {/* Dark Vignette Bottom shadow filter edge to process label readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />
              </div>

              {/* Bottom Details Layout Frame overlay */}
              <div className="absolute bottom-6 left-6 right-6 z-20 flex items-end justify-between pointer-events-none">
                <div className="flex flex-col gap-0.5 text-left">
                  <h3 className="text-sm font-bold tracking-tight text-white uppercase font-streethead">
                    {product.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-white">
                      {product.price}
                    </span>
                    <span className="text-xs line-through text-zinc-400">
                      {product.originalPrice}
                    </span>
                  </div>
                </div>

                {/* Micro Action Button Circle */}
                <div className="w-8 h-8 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-300 shrink-0">
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

export default DealsSection;
