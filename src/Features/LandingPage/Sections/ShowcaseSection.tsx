"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, Parent } from "@/Features/Shop/Data/ProductData";

const ShowcaseSection = () => {
  const featuredProduct = Product[0];
  const parentData = Parent.find((p) => p._id === featuredProduct.parent);

  const availableColors = parentData ? parentData.totalColors : [];
  const description = parentData ? parentData.description : "";

  // Cleaned up category parsing matching unified gender, type, and style parameters
  const subcategoryText = parentData
    ? `${parentData.gender}'s wear // ${parentData.style} ${parentData.type}`
    : "Premium Drop";

  const [selectedSize, setSelectedSize] = useState<string>(
    featuredProduct.sizes[1] || "M",
  );
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);

  const displayPrice = featuredProduct.salePrice || featuredProduct.basePrice;
  const hasDiscount = featuredProduct.discount > 0;

  return (
    <section className="w-full min-h-[500px] md:h-[75vh] bg-white text-zinc-950 flex flex-col md:flex-row select-none border-t border-b border-zinc-100">
      {/* LEFT GALLERY PANEL */}
      <div className="w-full md:w-1/2 h-[480px] md:h-full relative bg-zinc-50 overflow-hidden border-b md:border-b-0 md:border-r border-zinc-100 group">
        <Image
          src={
            featuredProduct.images[activeImageIdx] || featuredProduct.images[0]
          }
          alt={featuredProduct.name}
          fill
          priority
          className="object-cover object-center transform scale-100 transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
        />

        {hasDiscount && (
          <div className="absolute top-6 left-6 z-10 bg-zinc-950 px-2.5 py-1">
            <span className="text-[9px] text-white font-bold tracking-[0.2em] uppercase">
              {featuredProduct.discount}% OFF DROP
            </span>
          </div>
        )}

        {/* Thumbnail Interaction Strip */}
        {featuredProduct.images.length > 1 && (
          <div className="absolute bottom-6 left-6 z-10 flex gap-2">
            {featuredProduct.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImageIdx(index)}
                onMouseEnter={() => setActiveImageIdx(index)}
                className={`w-20 h-20 relative overflow-hidden rounded-none border transition-all ${
                  activeImageIdx === index
                    ? "border-zinc-950 opacity-100 scale-105"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT METADATA PANEL */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 py-12 md:py-0 md:px-16 lg:px-24 bg-white">
        <span className="text-[10px] font-bold tracking-[0.25em] text-zinc-400 uppercase mb-2 block">
          {subcategoryText}
        </span>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-streethead font-black uppercase tracking-tight text-zinc-900 mb-4 leading-none">
          {parentData?.name || featuredProduct.name.split(" - ")[0]}
        </h2>

        <p className="text-zinc-500 text-xs md:text-sm leading-relaxed mb-8 max-w-md font-medium">
          {description}
        </p>

        {/* Color Tones Matrix */}
        {availableColors.length > 0 && (
          <div className="space-y-2.5 mb-6">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
              Available Tones:
            </span>
            <div className="flex gap-2.5 items-center">
              {availableColors.map((color) => {
                const isCurrentActiveColor =
                  color.hex.toLowerCase() ===
                  featuredProduct.color.toLowerCase();
                return (
                  <div
                    key={color.colorName}
                    title={color.colorName}
                    className={`w-6 h-6 flex items-center justify-center border transition-all ${
                      isCurrentActiveColor
                        ? "border-zinc-950 scale-110 p-0.5"
                        : "border-zinc-200 hover:border-zinc-400"
                    }`}
                  >
                    <div
                      className="w-full h-full border border-black/10"
                      style={{ backgroundColor: color.hex }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Size Selection Array */}
        <div className="space-y-3 mb-8">
          <div className="flex justify-between items-center max-w-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              Select Size:
            </span>
          </div>
          <div className="flex gap-2">
            {featuredProduct.sizes.map((size) => {
              const sizeStockItem = featuredProduct.stock?.find(
                (s) => s.size === size,
              );
              const isOutOfStock = sizeStockItem
                ? sizeStockItem.stock === 0
                : false;

              return (
                <button
                  key={size}
                  disabled={isOutOfStock}
                  onClick={() => setSelectedSize(size)}
                  className={`w-10 h-10 text-xs font-bold rounded-none transition-all duration-200 border uppercase relative ${
                    isOutOfStock
                      ? "bg-zinc-50 text-zinc-300 border-zinc-100 cursor-not-allowed line-through"
                      : selectedSize === size
                        ? "bg-zinc-950 text-white border-zinc-950"
                        : "bg-white text-zinc-800 border-zinc-200 hover:border-zinc-950"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        {/* Numeric Pricing Display Context */}
        <div className="flex items-baseline gap-3 mb-8">
          <span className="text-2xl md:text-3xl font-black text-zinc-950 tracking-tight">
            ₹{displayPrice.toLocaleString("en-IN")}
          </span>
          {hasDiscount && (
            <>
              <span className="text-xs md:text-sm line-through text-zinc-400 font-medium">
                ₹{featuredProduct.basePrice.toLocaleString("en-IN")}
              </span>
              <span className="text-[10px] text-red-600 font-bold tracking-widest uppercase">
                ({featuredProduct.discount}% OFF)
              </span>
            </>
          )}
        </div>

        {/* Dynamic clean SEO action link container */}
        <div className="w-full max-w-md">
          <Link
            href={`/product/${featuredProduct.slug}`}
            className="group inline-flex w-full items-center justify-center bg-zinc-950 text-white text-xs font-bold tracking-[0.2em] uppercase py-4 transition-all duration-300 hover:bg-zinc-900 rounded-none"
          >
            View The Product
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
