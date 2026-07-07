"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { ProductType } from "@/Features/Shop/Data/ProductData";

export interface ParentColorType {
  colorName: string;
  hex: string;
  productSlug: string;
}

interface ProductCardProps {
  product?: ProductType;
  availableColors?: ParentColorType[];
}

const MainProductCard: React.FC<ProductCardProps> = ({
  product,
  availableColors,
}) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  if (!product || !product.images || product.images.length === 0) return null;

  const hasDiscount = product.discount > 0;
  const hasMultipleImages = product.images.length > 1;
  const displayPrice = product.salePrice || product.basePrice;

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImgIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1,
    );
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImgIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1,
    );
  };

  const handleLikeToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <div className="w-full group">
      {/* Dynamic SEO Clean Route Path Alignment */}
      <Link href={`/product/${product.slug}`} className="block w-full">
        <div className="relative w-full aspect-3/4 bg-zinc-50 overflow-hidden rounded-lg border border-zinc-100/80">
          <button
            onClick={handleLikeToggle}
            className="absolute top-2.5 right-2.5 z-20 w-8 h-8 hidden sm:flex items-center justify-center bg-white/90 backdrop-blur-xs rounded-full border border-zinc-200/60 text-zinc-900 shadow-sm cursor-pointer"
          >
            <Heart
              className={`w-4 h-4 transition-colors duration-200 ${
                isLiked
                  ? "fill-black stroke-black"
                  : "text-zinc-800 stroke-[1.5]"
              }`}
            />
          </button>

          {hasDiscount && (
            <div className="absolute z-20 bottom-2.5 right-2.5 bg-zinc-950 text-white font-mono font-bold text-[11px] md:text-[13px] tracking-wider px-2 py-0.5 rounded-sm uppercase">
              -{product.discount}%
            </div>
          )}

          {hasMultipleImages && (
            <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 z-30 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <button
                onClick={handlePrevImage}
                className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-zinc-900 border border-zinc-100 pointer-events-auto cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 stroke-2" />
              </button>
              <button
                onClick={handleNextImage}
                className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-zinc-900 border border-zinc-100 pointer-events-auto cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 stroke-2" />
              </button>
            </div>
          )}

          <Image
            src={product.images[currentImgIndex]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.01]"
            priority
          />
        </div>

        <div className="mt-2 flex flex-col gap-1 px-0.5">
          <h3 className="text-[14px] font-medium tracking-tight text-zinc-900 truncate uppercase line-clamp-2">
            {product.name}
          </h3>

          {/* Corrected Clean Numeric Price Layout Node */}
          <div className="flex items-baseline gap-1.5 font-mono text-[13px]">
            <span className="font-bold text-zinc-900 text-[14px] md:text-[16px]">
              ₹{displayPrice.toLocaleString("en-IN")}
            </span>
            {hasDiscount && (
              <span className="text-zinc-400 line-through">
                ₹{product.basePrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          {/* Dynamic Swatch Rendering Context */}
          {availableColors && availableColors.length > 0 && (
            <div className="flex items-center gap-1.5 mt-1">
              {availableColors.slice(0, 4).map((colorItem, i) => {
                const isActiveSelection =
                  product.color.toLowerCase() === colorItem.hex.toLowerCase();
                return (
                  <div
                    key={i}
                    title={colorItem.colorName}
                    style={{ backgroundColor: colorItem.hex }}
                    className={`w-3 h-3 rounded-full border border-zinc-300/60 ${
                      isActiveSelection
                        ? "ring-1 ring-offset-[1.5px] ring-zinc-950 border-zinc-950"
                        : ""
                    }`}
                  />
                );
              })}
              {availableColors.length > 4 && (
                <span className="text-[10px] text-zinc-400 font-medium pl-0.5">
                  +{availableColors.length - 4} More
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default MainProductCard;
