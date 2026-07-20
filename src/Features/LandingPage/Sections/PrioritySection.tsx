"use client";

import React from "react";
import { ShieldCheck, Truck, Gem, RefreshCw, Hourglass } from "lucide-react";

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const TRUST_FEATURES: FeatureItem[] = [
  {
    icon: <Gem className="w-5 h-5 stroke-[1.5]" />,
    title: "PREMIUM FABRIC",
    desc: "320GSM+ heavy loopback material",
  },
  {
    icon: <Truck className="w-5 h-5 stroke-[1.5]" />,
    title: "EXPRESS DELIVERY",
    desc: "Dispatched within 24-48 hours",
  },
  {
    icon: <ShieldCheck className="w-5 h-5 stroke-[1.5]" />,
    title: "UNCOMPROMISED QUALITY",
    desc: "Reinforced structure & stitching",
  },
  {
    icon: <RefreshCw className="w-5 h-5 stroke-[1.5]" />,
    title: "EASY EXCHANGES",
    desc: "Hassle-free 7-day pickup window",
  },
  {
    icon: <Hourglass className="w-5 h-5 stroke-[1.5]" />,
    title: "24x7 SUPPORT",
    desc: "rakeshchoudhary1154@gmail.com",
  },
];

const PrioritySection = () => {
  return (
    <section className="w-full bg-[#fbf9f6] text-zinc-950 select-none border-t border-b border-zinc-200/50">
      {/* Mobile Component Trigger */}
      <div className="block md:hidden">
        <MobilePriority />
      </div>

      {/* Desktop Component Trigger */}
      <div className="hidden md:block">
        <DesktopPriority />
      </div>
    </section>
  );
};

export default PrioritySection;

const MobilePriority = () => {
  return (
    <div className="w-full px-4 py-3 bg-white">
      <div className="w-full bg-[#fbf9f6] rounded-2xl border border-zinc-200/40 p-1 divide-y divide-zinc-200/40">
        {TRUST_FEATURES.map((feat, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3.5 active:bg-zinc-100/70 transition-colors duration-100 first:rounded-t-2xl last:rounded-b-2xl"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-zinc-900 text-white shadow-sm">
                {feat.icon}
              </div>

              {/* Text Meta Stack */}
              <div className="flex flex-col">
                <span className="text-[11px] font-bold tracking-wider text-zinc-900 uppercase">
                  {feat.title}
                </span>
                <span className="text-[10px] text-zinc-400 font-medium tracking-normal mt-0.5">
                  {feat.desc}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const DesktopPriority = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 h-36 flex items-center">
      <div className="grid grid-cols-5 w-full divide-x divide-zinc-200/60">
        {TRUST_FEATURES.map((feat, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center px-4 first:pl-0 last:pr-0 space-y-2.5"
          >
            {/* Minimalist Top Icon Block */}
            <div className="text-zinc-900 bg-white shadow-xs border border-zinc-100 rounded-full p-2.5">
              {feat.icon}
            </div>

            {/* Typography Content Container */}
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-900">
                {feat.title}
              </h4>
              <p className="text-[11px] text-zinc-400 font-medium tracking-wide max-w-45 mx-auto leading-relaxed">
                {feat.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
