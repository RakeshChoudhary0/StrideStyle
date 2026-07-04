"use client";

import React, { useState, useEffect } from "react";
import ShowProductCard from "../Components/ShowProductCard";

// Using your exact production schema payload structure
const productsData = {
  products: [
    {
      id: 1,
      parentId: null,
      title: "Essential Cotton Tee",
      family: "Basic Tee",
      price: "₹899",
      discount: "20% OFF",
      imgUrl: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&auto=format&fit=crop&q=80",
      ],
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: 4,
      parentId: null,
      title: "Classic Denim Jacket",
      family: "Denim Jacket",
      price: "₹3,499",
      discount: "15% OFF",
      imgUrl: [
        "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=600&auto=format&fit=crop&q=80",
      ],
      sizes: ["M", "L", "XL", "XXL"],
    },
    {
      id: 7,
      parentId: null,
      title: "Signature Street Trackpants",
      family: "Trackpants",
      price: "₹1,399",
      discount: "30% OFF",
      imgUrl: [
        "https://images.unsplash.com/photo-1551854838-212c50b4c184?w=600&auto=format&fit=crop&q=80",
      ],
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: 13,
      parentId: null,
      title: "Cargo Joggers",
      family: "Joggers",
      price: "₹1,799",
      discount: "25% OFF",
      imgUrl: [
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&auto=format&fit=crop&q=80",
      ],
      sizes: ["S", "M", "L", "XL", "XXL"],
    },
  ],
};

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

  return (
    <section className="w-full bg-white h-auto text-black py-16 px-4 md:px-12 select-none border-t border-zinc-100">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Header Block */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-streethead font-extrabold uppercase tracking-tight text-primary">
            DEALS OF THE MONTH
          </h2>
          <p className="text-zinc-400 text-xs tracking-widest uppercase font-semibold mt-2">
            Premium Heavyweight Combinations / Limited Drop Prices
          </p>
        </div>

        {/* Countdown Timer Module */}
        <div className="flex flex-col items-center mb-16">
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
                <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-zinc-50 border border-zinc-200/60 rounded-xl font-mono text-base md:text-lg font-bold text-primary shadow-xs">
                  {formatNum(time.val)}
                </div>
                <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wide mt-1.5">
                  {time.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Clean, Reusable Product Horizontal Slider Container */}
        <div className="w-full flex gap-4 md:gap-6 overflow-x-auto md:p-6 scrollbar-none no-scrollbar snap-x snap-mandatory">
          {productsData.products.map((product, index) => (
            <ShowProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
