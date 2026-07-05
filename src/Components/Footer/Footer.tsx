"use client";

import React from "react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#fbf9f6] text-zinc-900 pt-16 pb-8 border-t border-zinc-200/60 select-none font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        {/* SECTION 1: Snitch-Style Semantic Keyword Copy Matrices */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 border-b border-zinc-200/60 pb-12 text-xs md:text-[13px] text-zinc-600 leading-relaxed tracking-wide">
          {/* Left Block: Brand Positioning & Comfort Fabric Narrative */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold tracking-widest text-zinc-900 uppercase font-streethead">
              The Luxury Comfort Standard — Redefining Daily Wear
            </h3>
            <p>
              We craft everyday essential silhouettes engineered strictly for
              comfort. Our signature collections feature premium heavyweight
              cotton trackpants in multiple custom fits, relaxed-fit round neck
              t-shirts, structured polos, and minimalist chain neck tees. By
              prioritizing texture and fabric architecture, our garments deliver
              a premium feel that handles the demands of daily life
              effortlessly.
            </p>
            <p>
              Designed as gender-neutral, unisex basics, our clothing
              transitions seamlessly across wardrobes, offering timeless plain
              minimalist apparel for men, women, and children who refuse to
              compromise on ease.
            </p>
          </div>

          {/* Right Block: Fit Engineering & Multi-Generational Apparel */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold tracking-widest text-zinc-900 uppercase font-streethead">
              Premium Loungewear Built For Everyone
            </h3>
            <p>
              Whether you are hunting for clean tailored trackpants for evening
              leisure, classic polo shirts for casual smart styling, or durable
              everyday basics for kids, our structural styles deliver fluid
              flexibility. We eliminate stiff, uncomfortable tailoring in favor
              of breathable textures, premium finishes, and versatile drapes.
            </p>
            <ul className="space-y-1.5 text-zinc-500 list-none pl-0">
              <li>
                ✓ <strong>Premium Trackpants:</strong> Engineered with flexible
                waistbands and deep side pockets.
              </li>
              <li>
                ✓ <strong>Essential Tee Varieties:</strong> Clean round necks,
                modern chain necks, and timeless plain basics.
              </li>
              <li>
                ✓ <strong>All-Demographic Luxury:</strong> Curated sizing
                frameworks across men, women, and children collections.
              </li>
            </ul>
          </div>
        </div>

        {/* SECTION 2: Structured Internal Crawl Grid Link Map */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-zinc-200/60">
          {/* Column 1: Trackpants Anchor Matrix */}
          <div className="flex flex-col space-y-2.5">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-900 mb-1">
              TRACKPANTS
            </span>
            <Link
              href="/shop/trackpants/premium"
              className="text-xs text-zinc-500 hover:text-zinc-950 transition-colors"
            >
              Premium Trackpants
            </Link>
            <Link
              href="/shop/trackpants/relaxed-fit"
              className="text-zinc-500 text-xs hover:text-zinc-950 transition-colors"
            >
              Relaxed Fit Joggers
            </Link>
            <Link
              href="/shop/trackpants/heavyweight"
              className="text-zinc-500 text-xs hover:text-zinc-950 transition-colors"
            >
              Heavyweight Loungewear
            </Link>
            <Link
              href="/shop/trackpants/daily-wear"
              className="text-zinc-500 text-xs hover:text-zinc-950 transition-colors"
            >
              Daily Casual Pants
            </Link>
          </div>

          {/* Column 2: Tops & Tees Keyword Anchor Map */}
          <div className="flex flex-col space-y-2.5">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-900 mb-1">
              TOPS &amp; TEES
            </span>
            <Link
              href="/shop/tees/round-neck"
              className="text-xs text-zinc-500 hover:text-zinc-950 transition-colors"
            >
              Round Neck T-Shirts
            </Link>
            <Link
              href="/shop/tees/chain-neck"
              className="text-zinc-500 text-xs hover:text-zinc-950 transition-colors"
            >
              Chain Neck Tees
            </Link>
            <Link
              href="/shop/tees/polos"
              className="text-zinc-500 text-xs hover:text-zinc-950 transition-colors"
            >
              Classic Polo Shirts
            </Link>
            <Link
              href="/shop/tees/plain-essentials"
              className="text-zinc-500 text-xs hover:text-zinc-950 transition-colors"
            >
              Plain Premium Tees
            </Link>
          </div>

          {/* Column 3: Demographics Filter Matrix */}
          <div className="flex flex-col space-y-2.5">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-900 mb-1">
              SHOP BY SIZE
            </span>
            <Link
              href="/shop/unisex"
              className="text-xs text-zinc-500 hover:text-zinc-950 transition-colors"
            >
              Unisex Essentials
            </Link>
            <Link
              href="/shop/men"
              className="text-zinc-500 text-xs hover:text-zinc-950 transition-colors"
            >
              {`Men's Casual Wear`}
            </Link>
            <Link
              href="/shop/women"
              className="text-zinc-500 text-xs hover:text-zinc-950 transition-colors"
            >
              {`Women's Loungewear`}
            </Link>
            <Link
              href="/shop/kids"
              className="text-zinc-500 text-xs hover:text-zinc-950 transition-colors"
            >
              Kids Comfort Collection
            </Link>
          </div>

          {/* Column 4: Trust Links (Google E-E-A-T Quality Signals) */}
          <div className="flex flex-col space-y-2.5">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-900 mb-1">
              SUPPORT
            </span>
            <Link
              href="/returns"
              className="text-xs text-zinc-500 hover:text-zinc-950 transition-colors"
            >
              Returns &amp; Exchanges
            </Link>
            <Link
              href="/shipping"
              className="text-zinc-500 text-xs hover:text-zinc-950 transition-colors"
            >
              Shipping Information
            </Link>
            <Link
              href="/size-guide"
              className="text-zinc-500 text-xs hover:text-zinc-950 transition-colors"
            >
              Size Charts
            </Link>
            <Link
              href="/about"
              className="text-zinc-500 text-xs hover:text-zinc-950 transition-colors"
            >
              Our Philosophy
            </Link>
          </div>
        </div>

        {/* SECTION 3: Minimalist Corporate Utility Sub-Bar */}
        <div className="w-full pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-zinc-400 tracking-widest uppercase">
          <p>© {currentYear} STRIDESTYLE. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
