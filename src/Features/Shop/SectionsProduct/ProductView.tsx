"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ProductType, ParentType } from "../Data/ProductData";
import {
  ChevronLeft,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RefreshCw,
  Heart,
  Share2,
  Star,
  ChevronDown,
  Copy,
  Check,
} from "lucide-react";

// Safe, optimized pricing logic utility
export function calculateDiscount(
  price: string | number,
  discount: string | number | undefined,
): number {
  const cleanPriceString = String(price).replace(/[^0-9.]/g, "");
  const numericPrice = parseFloat(cleanPriceString);
  const cleanDiscountString = String(discount ?? "0").replace(/[^0-9.]/g, "");
  const numericDiscount = parseFloat(cleanDiscountString);

  if (isNaN(numericPrice) || numericPrice <= 0) return 0;
  if (isNaN(numericDiscount) || numericDiscount <= 0)
    return Math.round(numericPrice);
  if (numericDiscount >= 100) return 0;

  const finalPrice = numericPrice - numericPrice * (numericDiscount / 100);
  return Math.round(finalPrice);
}

interface ProductViewType {
  currentProduct: ProductType;
  parentData: ParentType | undefined;
  variants: ProductType[];
}

export default function ProductView({
  currentProduct,
  parentData,
  variants,
}: ProductViewType) {
  const [activeImage, setActiveImage] = useState(currentProduct.images[0]);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>("details");

  const originalPrice = parseFloat(
    String(currentProduct.price).replace(/[^0-9.]/g, ""),
  );
  const discountPercent = parseFloat(
    String(currentProduct.discount || "0").replace(/[^0-9.]/g, ""),
  );
  const currentPrice = calculateDiscount(
    currentProduct.price,
    currentProduct.discount,
  );

  const handleMobileScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const index = Math.round(container.scrollLeft / container.clientWidth);
    setActiveMobileIndex(index);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: parentData?.name || currentProduct.name,
          url: window.location.href,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50/60 pb-32 md:pb-20">
      {/* Mobile Sticky Navigation Row */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Link
          href="/shop"
          className="flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 active:scale-95 text-zinc-700 bg-white/90 backdrop-blur-md border border-zinc-200/60 shadow-md"
        >
          <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 pt-0 md:pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 sm:gap-x-8 lg:gap-x-14 items-start">
          {/* LEFT PANEL: Media Layout Gallery & Mobile Carousel */}
          <div className="lg:col-span-7 grid grid-cols-12 gap-3 md:sticky md:top-24">
            {/* Multi-angle Vertical Strips (Desktop Only) */}
            <div className="col-span-2 md:col-span-2 flex-col gap-2.5 max-h-[580px] overflow-y-auto no-scrollbar hidden sm:flex">
              {currentProduct.images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`aspect-4/5 relative rounded-lg overflow-hidden bg-zinc-100 border transition-all duration-200 ${
                    activeImage === img
                      ? "border-zinc-900 ring-1 ring-zinc-900"
                      : "border-zinc-200/80 hover:border-zinc-400"
                  }`}
                >
                  <Image
                    src={img}
                    alt=""
                    fill
                    sizes="10vw"
                    className="object-cover"
                    priority={idx === 0}
                  />
                </button>
              ))}
            </div>

            {/* Main Interactive Media Wrapper */}
            <div className="col-span-12 sm:col-span-10 aspect-3/3 sm:rounded-2xl overflow-hidden bg-zinc-100 sm:border border-zinc-200/60 sm:shadow-sm relative group">
              {/* DESKTOP VIEW VIEWPORT */}
              <div className="hidden sm:block w-full h-full relative">
                <Image
                  src={activeImage}
                  alt={currentProduct.name}
                  fill
                  sizes="(max-width: 1024px) 90vw, 50vw"
                  className="object-cover transition-all duration-500"
                  priority
                />
              </div>

              {/* MOBILE VIEW COMPREHENSIVE SNAP SCROLL HORIZONTAL CAROUSEL */}
              <div
                onScroll={handleMobileScroll}
                className=" rounded-md  sm:hidden w-full h-full flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
              >
                {currentProduct.images.map((img: string, idx: number) => (
                  <div
                    key={idx}
                    className="w-full h-full shrink-0 snap-start snap-always relative"
                  >
                    <Image
                      src={img}
                      alt={`${currentProduct.name} View ${idx + 1}`}
                      fill
                      sizes="100vw"
                      className="object-cover"
                      priority={idx === 0}
                    />
                  </div>
                ))}
              </div>

              {/* Floating Action Utilities */}
              <div className="absolute top-4 right-4 flex flex-col gap-2.5 z-10">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-md border border-zinc-200/40 shadow-sm hover:bg-white text-zinc-700 transition-all active:scale-95"
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${isWishlisted ? "fill-red-500 text-red-500" : ""}`}
                  />
                </button>
                <button
                  onClick={handleShare}
                  className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-md border border-zinc-200/40 shadow-sm hover:bg-white text-zinc-700 transition-all active:scale-95"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {discountPercent > 0 && (
                <span className="absolute top-4 left-4 bg-zinc-900 text-white font-bold text-[10px] tracking-widest uppercase px-3 py-1 rounded-md shadow-sm">
                  {discountPercent}% OFF
                </span>
              )}

              {/* Mobile Carousel Position Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:hidden bg-black/20 backdrop-blur-sm px-2.5 py-1.5 rounded-full z-10">
                {currentProduct.images.map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeMobileIndex === idx
                        ? "w-4 bg-white"
                        : "w-1.5 bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: Dynamic Details Pane */}
          <div className="lg:col-span-5 space-y-6 px-4 sm:px-0">
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                {currentProduct.for}
              </span>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 leading-tight">
                {parentData?.name}
              </h1>

              <div className="flex items-center gap-2 pt-1">
                <div className="flex items-center gap-1 bg-zinc-900 text-white text-xs font-bold px-2 py-0.5 rounded">
                  <span>4.4</span>
                  <Star className="w-3 h-3 fill-white" />
                </div>
                <span className="text-xs font-semibold text-zinc-500">
                  10 Ratings and 10 Reviews
                </span>
              </div>
            </div>

            {/* Pricing Matrix using calculation function output */}
            <div className="py-3 border-y border-zinc-200/60 flex items-baseline gap-3">
              <span className="text-3xl font-black text-zinc-900">
                ₹{currentPrice.toLocaleString()}
              </span>
              {discountPercent > 0 && (
                <span className="text-lg text-zinc-400 line-through font-medium">
                  ₹{originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <div className="space-y-3.5 pt-2">
              <div className="flex justify-between items-center text-xs tracking-wider font-bold text-zinc-900 uppercase">
                <span>Colors</span>
                <span className="text-zinc-400 font-medium normal-case">
                  {variants.length} available
                </span>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                {variants.map((v) => {
                  const resolvedColorObj = parentData?.totalColors.find(
                    (tc) => tc.hex.toLowerCase() === v.color.toLowerCase(),
                  );
                  const colorTitle = resolvedColorObj
                    ? resolvedColorObj.colorName
                    : "Custom Color";
                  const isCurrentVariant = v.slug === currentProduct.slug;

                  return (
                    <Link
                      key={v._id}
                      href={`/shop/${v.slug}/${v._id}?c=${v.color}`}
                      className="group flex flex-col items-center focus:outline-none"
                    >
                      <div
                        className={`w-full aspect-[3/4] relative rounded-xl overflow-hidden bg-zinc-100 border transition-all duration-300 ${
                          isCurrentVariant
                            ? "border-zinc-900 ring-2 ring-zinc-900 ring-offset-2 scale-[0.98]"
                            : "border-zinc-200/80 group-hover:border-zinc-400 group-hover:scale-[1.02]"
                        }`}
                      >
                        <Image
                          src={v.images[0]}
                          alt={colorTitle}
                          fill
                          sizes="(max-width: 640px) 25vw, 15vw"
                          className="object-cover"
                        />
                      </div>

                      <span
                        className={`text-[10px] tracking-tight leading-tight mt-1.5 text-center max-w-full truncate px-0.5 line-clamp-1 transition-colors ${
                          isCurrentVariant
                            ? "text-zinc-900 font-bold"
                            : "text-zinc-500 group-hover:text-zinc-900"
                        }`}
                      >
                        {colorTitle}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Size Section */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center text-xs font-bold tracking-wider text-zinc-900 uppercase">
                <span>Sizes</span>
                <span className="text-zinc-400 font-medium underline cursor-pointer hover:text-zinc-900 transition-colors normal-case">
                  Size Chart
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {currentProduct.sizes.map((sz: string) => {
                  const sizeRecord = currentProduct.stock.find(
                    (s) => s.size === sz,
                  );
                  const isOutOfStock = !sizeRecord || sizeRecord.stock === 0;

                  return (
                    <button
                      key={sz}
                      disabled={isOutOfStock}
                      onClick={() => setSelectedSize(sz)}
                      className={`h-11 rounded-xl text-xs font-bold tracking-wider uppercase border transition-all duration-150 relative ${
                        isOutOfStock
                          ? "bg-zinc-50 border-zinc-200 text-zinc-300 cursor-not-allowed line-through"
                          : selectedSize === sz
                            ? "bg-zinc-900 border-zinc-900 text-white shadow-sm"
                            : "bg-white border-zinc-200 text-zinc-800 hover:border-zinc-900"
                      }`}
                    >
                      {sz}
                      {!isOutOfStock && sizeRecord.stock <= 5 && (
                        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-zinc-400 text-center pt-1 font-medium">
                FREE 1-2 day delivery on 5k+ pincodes
              </p>
            </div>

            {/* Main Action Call Trigger Button */}
            <button
              disabled={!selectedSize}
              className="w-full h-12 bg-zinc-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg transition-all duration-300 hover:bg-zinc-800 active:scale-[0.99] disabled:bg-zinc-200 disabled:text-zinc-400 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2.5"
            >
              <ShoppingBag className="w-4 h-4" strokeWidth={2.5} />
              {selectedSize ? "Add to Bag" : "Select Size to Add"}
            </button>

            {/* Interactive Accordion Sheets */}
            <div className="border-t border-zinc-200 pt-2 space-y-1">
              {[
                {
                  id: "details",
                  label: "Details",
                  desc:
                    parentData?.description ||
                    "Premium fabric processing with standard double stitched hems.",
                },
                {
                  id: "delivery",
                  label: "Delivery & Returns",
                  desc: "Free standard dispatch tier applied. 7 business day returns permitted on un-worn items.",
                },
              ].map((tab) => (
                <div key={tab.id} className="border-b border-zinc-100">
                  <button
                    onClick={() =>
                      setActiveTab(activeTab === tab.id ? null : tab.id)
                    }
                    className="w-full py-3.5 flex justify-between items-center text-xs font-bold tracking-wider text-zinc-900 uppercase text-left"
                  >
                    <span>{tab.label}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-500 transition-transform ${activeTab === tab.id ? "rotate-180" : ""}`}
                    />
                  </button>
                  {activeTab === tab.id && (
                    <div className="pb-4 text-xs text-zinc-500 leading-relaxed animate-fadeIn">
                      {tab.desc}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Micro-Badges Trust Segment */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] uppercase font-bold tracking-wider text-zinc-400">
              <div className="flex flex-col items-center gap-1.5 text-center p-2.5 rounded-xl bg-zinc-50 border border-zinc-200/40">
                <Truck className="w-4 h-4 text-zinc-600" />
                <span>Free Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 text-center p-2.5 rounded-xl bg-zinc-50 border border-zinc-200/40">
                <RefreshCw className="w-4 h-4 text-zinc-600" />
                <span>7 Day Returns</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 text-center p-2.5 rounded-xl bg-zinc-50 border border-zinc-200/40">
                <ShieldCheck className="w-4 h-4 text-zinc-600" />
                <span>100% Original</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
