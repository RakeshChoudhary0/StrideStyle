// components/Footer.tsx
"use client";

import React from "react";
import { FooterCopyright } from "./footerComponent/FooterCopyRight";
import { FooterLinkColumn } from "./footerComponent/FooterLinkColumn";
import { FooterLogoColumn } from "./footerComponent/FooterLogoColumn";

// 1. Memory Optimization: Lift static data outside the component to prevent re-renders
const SHOP_LINKS = [
  { label: "Men's Collection", href: "#" },
  { label: "Women's Collection", href: "#" },
  { label: "Kids' Comfort", href: "#" },
  { label: "New Arrivals", href: "#" },
];

const SUPPORT_LINKS = [
  { label: "Returns & Exchanges", href: "#" },
  { label: "Shipping Policy", href: "#" },
  { label: "Size Guide", href: "#" },
  { label: "Contact Us", href: "#" },
];

const JOURNAL_LINKS = [
  { label: "Our Story", href: "#" },
  { label: "Sustainability", href: "#" },
  { label: "Care Guide", href: "#" },
];

export default function Footer() {
  // Memoized or stable callbacks for interactive actions
  const handleLinkClick = React.useCallback(
    (link: { label: string; href: string }) => {
      console.log(`User navigated to: ${link.label} (${link.href})`);
    },
    [],
  );

  return (
    <footer className="bg-on-secondary-fixed w-full md:min-h-[92vh] flex flex-col justify-between relative overflow-hidden select-none">
      <div className="w-full px-4 sm:px-6 md:px-16 pt-24 pb-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-6 max-w-[1440px] mx-auto z-10">
        <FooterLogoColumn />

        <FooterLinkColumn
          title="Shop"
          links={SHOP_LINKS}
          onClick={handleLinkClick}
        />
        <FooterLinkColumn
          title="Support"
          links={SUPPORT_LINKS}
          onClick={handleLinkClick}
        />
        <FooterLinkColumn
          title="Journal"
          links={JOURNAL_LINKS}
          onClick={handleLinkClick}
        />
      </div>

      {/* Middle Display Grid: Big Typography Section
        Using mt-auto to naturally push it cleanly to the floor of the viewport space
      */}
      <div className=" w-full md:mx-auto my-auto px-4  md:md:pb-30 pointer-events-none mt-auto overflow-hidden">
        <h1 className="hidden md:block md:text-[100px] xl:text-[170px] font-black tracking-wide text-center uppercase text-error-container font-serif">
          STRIDESTYLE
        </h1>
      </div>

      <div className="w-full border-t border-secondary-fixed-variant/10 bg-on-secondary-fixed">
        <FooterCopyright />
      </div>
    </footer>
  );
}
