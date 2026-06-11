"use client";

import React from "react";

const CATEGORIES = [
  { label: "MEN TEE" },
  { label: "MEN TRACK" },
  { label: "WOMEN TEE" },
  { label: "WOMEN TRACK" },
  { label: "KIDS SET" },
];

interface HeroCategoryNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function HeroCategoryNav({
  activeTab,
  setActiveTab,
}: HeroCategoryNavProps) {
  return (
    <section className="w-full bg-background border-b border-on-background/10 py-7  flex items-center shrink-0">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 w-full flex items-center justify-start md:justify-center gap-8 md:gap-16 overflow-x-auto whitespace-nowrap scrollbar-none touch-pan-x">
        {CATEGORIES.map((cat, idx) => (
          <button
            onClick={() => setActiveTab(cat.label)}
            key={idx}
            type="button"
            className={`font-sans text-[12px] font-medium py-1 transition-all uppercase tracking-[0.2em] cursor-pointer select-none shrink-0 outline-none ${
              activeTab === cat.label
                ? "text-on-background border-b-2 border-on-background"
                : "text-on-background/50 hover:text-on-background"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </section>
  );
}
