"use client";

import HeroGallery from "./components/HeroGallery";
import Link from "next/link";
export default function Hero() {
  return (
    <div className="w-full md:h-[85vh] flex flex-col bg-background text-on-background overflow-y-auto md:overflow-hidden">
      <section className="relative w-full shrink-0 grow flex flex-col md:flex-row items-stretch border-b border-on-background/10 min-h-0">
        {/* Text Content – Mobile optimised */}
        <div className="w-full md:w-1/2 flex flex-col justify-between gap-6 p-6 sm:p-8 md:p-20 lg:p-28 bg-surface-container-lowest md:h-full">
          <div className="max-w-xl mx-auto md:mx-0 w-full">
            <span className="font-mono text-[10px] sm:text-[11px] md:text-[12px] uppercase tracking-[0.45em] text-secondary font-medium block text-center md:text-left">
              Core Collection / 2026
            </span>

            <h1 className="font-serif mt-4 sm:mt-6 md:mt-20 text-4xl sm:text-5xl lg:text-7xl xl:text-8xl mb-4 md:mb-8 uppercase tracking-wide text-on-background font-normal leading-[1.1] sm:leading-[1.05] text-center md:text-left">
              Stride <br />
              <span className="font-light italic text-secondary">Style</span>
            </h1>

            <p className="font-sans text-xs sm:text-sm lg:text-base text-on-background/70 font-normal leading-relaxed max-w-md text-center md:text-left mx-auto md:mx-0 mt-2 md:mt-6">
              Architectural cuts engineered for effortless silhouettes. Premium
              heavyweight cotton and refined proportions designed for modern
              exclusivity.
            </p>
          </div>

          <div className="flex justify-center md:justify-start mt-2">
            <Link
              href="/store"
              className="bg-on-background rounded-lg  text-background px-6 py-3 sm:px-8 sm:py-3.5 md:px-10 md:py-5 font-sans text-[11px] sm:text-[12px] uppercase tracking-[0.25em] font-semibold hover:bg-secondary hover:text-white transition-all duration-500 shadow-xl active:scale-95 z-30 min-h-[44px] w-full sm:w-auto"
            >
              Shop Collection
            </Link>
          </div>
        </div>

        <HeroGallery />
      </section>
    </div>
  );
}
