"use client";

import React from "react";
import { ShieldCheck, Truck, Gem, RefreshCw } from "lucide-react";

const PrioritySection = () => {
  // Ultra-clean streetwear feature matrix
  const trustFeatures = [
    {
      icon: <Gem className="w-5 h-5 stroke-[1.25]" />,
      title: "PREMIUM FABRIC",
      desc: "320GSM+ heavy loopback Materail",
    },
    {
      icon: <Truck className="w-5 h-5 stroke-[1.25]" />,
      title: "EXPRESS DELIVERY",
      desc: "Dispatched within 24-48 hours",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 stroke-[1.25]" />,
      title: "UNCOMPROMISED QUALITY",
      desc: "Reinforced structure & stitching",
    },
    {
      icon: <RefreshCw className="w-5 h-5 stroke-[1.25]" />,
      title: "EASY EXCHANGES",
      desc: "Hassle-free 7-day pickup window",
    },
  ];

  return (
    <section className="w-full bg-[#fbf9f6] text-zinc-950 md:h-[180px] flex items-center select-none border-t border-b border-zinc-100 py-10 md:py-0">
      <div className="w-full px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-2 gap-y-8 gap-x-4 md:flex md:flex-row md:justify-between md:items-center md:gap-4 md:divide-x md:divide-zinc-100">
          {trustFeatures.map((feat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center space-y-2 w-full md:px-4 first:pl-0 last:pr-0"
            >
              <div className="text-zinc-900 mb-1">{feat.icon}</div>

              {/* Feature Copy */}
              <div className="space-y-0.5">
                <h4 className="text-[11px] md:text-xs font-bold uppercase tracking-[0.15em] text-zinc-900">
                  {feat.title}
                </h4>
                <p className="text-[10px] md:text-11px text-zinc-400 font-medium tracking-wide">
                  {feat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrioritySection;
