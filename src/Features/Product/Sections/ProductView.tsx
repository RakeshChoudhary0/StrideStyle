"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ProductType, ParentType } from "../../Shop/Data/ProductData";
import {
  ChevronLeft,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RefreshCw,
  Heart,
  Share2,
  ChevronDown,
  DollarSign,
  Check,
  Loader2,
} from "lucide-react";

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
  const [activeImage, setActiveImage] = useState<string>(
    currentProduct.images[0],
  );
  const [activeMobileIndex, setActiveMobileIndex] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string | null>("details");

  // Cart Interactive Button States: 'idle' | 'loading' | 'added'
  const [cartState, setCartState] = useState<"idle" | "loading" | "added">(
    "idle",
  );

  const displayPrice = currentProduct.salePrice || currentProduct.basePrice;
  const hasDiscount = currentProduct.discount > 0;

  const handleAddToCart = () => {
    if (!selectedSize || cartState !== "idle") return;

    setCartState("loading");

    // Simulate async network request
    setTimeout(() => {
      setCartState("added");

      // Reset back to idle state after displaying confirmation
      setTimeout(() => {
        setCartState("idle");
      }, 2000);
    }, 900);
  };

  const handleMobileScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const index = Math.round(container.scrollLeft / container.clientWidth);
    setActiveMobileIndex(index);
  };

  const handleShare = async () => {
    const shareData = {
      title: currentProduct.name,
      text: `Check out ${currentProduct.name} on Stride Style!`,
      url: window.location.href,
    };

    if (
      navigator.share &&
      navigator.canShare &&
      navigator.canShare(shareData)
    ) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
      }
    }

    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Clipboard failure:", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-950 pb-48 sm:pb-32 md:pb-20 select-none antialiased">
      {/* Floating Back Navigation Action (Mobile Viewport) */}
      <div className="fixed top-4 left-4 z-40 md:hidden">
        <Link
          href="/shop"
          className="flex items-center justify-center w-11 h-11 rounded-full text-zinc-900 bg-white/90 backdrop-blur-md border border-zinc-200/80 shadow-md active:scale-95 transition-transform"
        >
          <ChevronLeft className="w-5 h-5" strokeWidth={2} />
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 pt-0 md:pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 sm:gap-x-8 lg:gap-x-12 items-start">
          {/* =========================================================================
              LEFT PANEL: Media Gallery Strip & Snap Carousel
             ========================================================================= */}
          <div className="lg:col-span-7 grid grid-cols-12 gap-3 md:sticky md:top-24">
            {/* Desktop Vertical Thumbnail Track */}
            <div className="col-span-2 flex-col gap-3 max-h-[620px] overflow-y-auto no-scrollbar hidden sm:flex">
              {currentProduct.images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`aspect-[4/5] relative rounded-xl overflow-hidden bg-zinc-50 border transition-all duration-200 ${
                    activeImage === img
                      ? "border-zinc-950 ring-1 ring-zinc-950 opacity-100"
                      : "border-zinc-200/80 hover:border-zinc-400 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Product Angle ${idx + 1}`}
                    fill
                    sizes="10vw"
                    className="object-cover object-center"
                    priority={idx === 0}
                  />
                </button>
              ))}
            </div>

            {/* Primary Interactive Viewer Frame */}
            <div className="col-span-12 sm:col-span-10 aspect-[4/5] sm:rounded-2xl overflow-hidden bg-zinc-50 sm:border border-zinc-100 relative group">
              {/* Desktop Main Preview */}
              <div className="hidden sm:block w-full h-full relative">
                <Image
                  src={activeImage}
                  alt={currentProduct.name}
                  fill
                  sizes="(max-width: 1024px) 90vw, 50vw"
                  className="object-cover object-center transition-all duration-500"
                  priority
                />
              </div>

              {/* Mobile Native Snap-Scroll Frame */}
              <div
                onScroll={handleMobileScroll}
                className="sm:hidden w-full h-full flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
              >
                {currentProduct.images.map((img: string, idx: number) => (
                  <div
                    key={idx}
                    className="w-full h-full shrink-0 snap-start snap-always relative"
                  >
                    <Image
                      src={img}
                      alt={`${currentProduct.name} Mobile View ${idx + 1}`}
                      fill
                      sizes="100vw"
                      className="object-cover object-center"
                      priority={idx === 0}
                    />
                  </div>
                ))}
              </div>

              {/* Floating Action Trigger Badges */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-md border border-zinc-200/60 shadow-xs hover:bg-white text-zinc-900 transition-all active:scale-90"
                  aria-label="Wishlist Item"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      isWishlisted ? "fill-zinc-950 text-zinc-950" : ""
                    }`}
                  />
                </button>
                <button
                  onClick={handleShare}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-md border border-zinc-200/60 shadow-xs hover:bg-white text-zinc-900 transition-all active:scale-90 relative"
                  aria-label="Share Product"
                >
                  <Share2 className="w-4 h-4" />
                  {copied && (
                    <span className="absolute right-12 bg-zinc-950 text-white text-[9px] font-bold tracking-widest px-2 py-1 rounded shadow-sm whitespace-nowrap">
                      COPIED!
                    </span>
                  )}
                </button>
              </div>

              {hasDiscount && (
                <span className="absolute bottom-4 left-4 z-10 bg-zinc-950/90 backdrop-blur-md text-white font-black text-[9px] tracking-widest uppercase px-3 py-1.5 rounded-md border border-white/10 shadow-xs">
                  {currentProduct.discount}% OFF
                </span>
              )}

              {/* Mobile Carousel Page Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:hidden bg-zinc-950/30 backdrop-blur-md px-3 py-1.5 rounded-full z-10">
                {currentProduct.images.map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      activeMobileIndex === idx
                        ? "w-4 bg-white"
                        : "w-1 bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* =========================================================================
              RIGHT PANEL: Product Details, Color Variations, & Sizes
             ========================================================================= */}
          <div className="lg:col-span-5 space-y-6 px-4 sm:px-0">
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 block">
                {parentData?.gender.replace("s", "'s")} Wear &bull;{" "}
                {parentData?.style}
              </span>
              <h1 className="text-2xl md:text-4xl font-black tracking-tight text-zinc-950 font-streethead uppercase leading-tight">
                {parentData?.name}
              </h1>
            </div>

            {/* Pricing Section */}
            <div className="py-3.5 border-y border-zinc-100 flex items-baseline gap-3">
              <span className="text-3xl font-black text-zinc-950">
                ₹{displayPrice.toLocaleString("en-IN")}
              </span>
              {hasDiscount && (
                <span className="text-base text-zinc-400 line-through font-medium">
                  ₹{currentProduct.basePrice.toLocaleString("en-IN")}
                </span>
              )}
            </div>

            {/* Color Variant Selector */}
            <div className="space-y-3 pt-1">
              <div className="flex justify-between items-center text-xs tracking-wider font-bold text-zinc-950 uppercase">
                <span>
                  Color:{" "}
                  <span className="text-zinc-500 font-medium normal-case ml-1">
                    {currentProduct.colorName}
                  </span>
                </span>
                <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">
                  {variants.length} COLORS
                </span>
              </div>

              <div className="grid grid-cols-5 gap-2.5">
                {variants.map((v) => {
                  const isCurrentVariant = v.slug === currentProduct.slug;

                  return (
                    <Link
                      key={v._id}
                      href={`/product/${v.slug}`}
                      className="group flex flex-col items-center focus:outline-none"
                    >
                      <div
                        className={`w-full aspect-[3/4] relative rounded-xl overflow-hidden bg-zinc-50 border transition-all duration-200 ${
                          isCurrentVariant
                            ? "border-zinc-950 ring-2 ring-zinc-950 ring-offset-2"
                            : "border-zinc-200/80 group-hover:border-zinc-400"
                        }`}
                      >
                        <Image
                          src={v.images[0]}
                          alt={v.colorName}
                          fill
                          sizes="(max-width: 640px) 20vw, 10vw"
                          className="object-cover object-center"
                        />
                      </div>
                      <span
                        className={`text-[9px] tracking-tight leading-tight mt-1 text-center truncate w-full px-0.5 uppercase ${
                          isCurrentVariant
                            ? "text-zinc-950 font-bold"
                            : "text-zinc-400 group-hover:text-zinc-950"
                        }`}
                      >
                        {v.colorName}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Size Matrix Selector */}
            <div className="space-y-3 pt-1">
              <div className="flex justify-between items-center text-xs font-bold tracking-wider text-zinc-950 uppercase">
                <span>Select Size</span>
                <button className="text-zinc-400 text-[10px] font-bold tracking-widest uppercase hover:text-zinc-950 transition-colors underline">
                  Size Guide
                </button>
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
                      className={`h-11 rounded-xl text-xs font-bold tracking-widest uppercase border transition-all duration-150 relative flex items-center justify-center ${
                        isOutOfStock
                          ? "bg-zinc-50 border-zinc-100 text-zinc-300 cursor-not-allowed line-through"
                          : selectedSize === sz
                            ? "bg-zinc-950 border-zinc-950 text-white shadow-xs"
                            : "bg-white border-zinc-200/80 text-zinc-900 hover:border-zinc-950"
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
              <p className="text-[10px] text-zinc-400 text-center font-bold tracking-wider uppercase pt-0.5">
                FREE Dispatch on all local orders
              </p>
            </div>

            {/* Desktop Dynamic Interactive CTA Button */}
            <button
              disabled={!selectedSize || cartState !== "idle"}
              onClick={handleAddToCart}
              className={`w-full h-12 rounded-xl text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-xs hidden sm:flex items-center justify-center gap-2.5 active:scale-[0.99] ${
                cartState === "added"
                  ? "bg-emerald-600 text-white border border-emerald-600"
                  : cartState === "loading"
                    ? "bg-zinc-900 text-white opacity-90 cursor-wait"
                    : !selectedSize
                      ? "bg-zinc-100 text-zinc-400 border border-zinc-200 cursor-not-allowed shadow-none"
                      : "bg-zinc-950 text-white hover:bg-zinc-800"
              }`}
            >
              {cartState === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>ADDING TO BAG...</span>
                </>
              ) : cartState === "added" ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>ADDED TO BAG!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    {selectedSize ? "ADD TO BAG" : "SELECT SIZE TO ADD"}
                  </span>
                </>
              )}
            </button>

            {/* Accordion Specification Panels */}
            <div className="border-t border-zinc-100 pt-1 space-y-1">
              {[
                {
                  id: "details",
                  label: "Product Description",
                  desc:
                    parentData?.description ||
                    "Crafted from heavyweight French Terry cotton. Designed with drop shoulders, dense ribbing, and structured unisex silhouette.",
                },
                {
                  id: "delivery",
                  label: "Shipping & Returns",
                  desc: "Dispatched within 24 hours. Standard delivery takes 2-4 business days. Returns accepted within 7 days in original condition.",
                },
              ].map((tab) => (
                <div key={tab.id} className="border-b border-zinc-100">
                  <button
                    onClick={() =>
                      setActiveTab(activeTab === tab.id ? null : tab.id)
                    }
                    className="w-full py-3.5 flex justify-between items-center text-xs font-bold tracking-wider text-zinc-950 uppercase text-left"
                  >
                    <span>{tab.label}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
                        activeTab === tab.id ? "rotate-180 text-zinc-950" : ""
                      }`}
                    />
                  </button>
                  {activeTab === tab.id && (
                    <div className="pb-4 text-xs text-zinc-500 leading-relaxed font-medium transition-all duration-200">
                      {tab.desc}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Brand Assurance Badges */}
            <div className="grid grid-cols-3 gap-2 pt-1 text-[9px] uppercase font-bold tracking-widest text-zinc-500">
              <div className="flex flex-col items-center gap-1.5 text-center p-3 rounded-xl bg-zinc-50 border border-zinc-100">
                {currentProduct.isFreeDelivery ? (
                  <>
                    <Truck className="w-4 h-4 text-zinc-900" />
                    <span>Free Shipping</span>
                  </>
                ) : (
                  <>
                    <DollarSign className="w-4 h-4 text-zinc-900" />
                    <span>Standard Shipping</span>
                  </>
                )}
              </div>
              <div className="flex flex-col items-center gap-1.5 text-center p-3 rounded-xl bg-zinc-50 border border-zinc-100">
                <RefreshCw className="w-4 h-4 text-zinc-900" />
                <span>7 Day Returns</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 text-center p-3 rounded-xl bg-zinc-50 border border-zinc-100">
                <ShieldCheck className="w-4 h-4 text-zinc-900" />
                <span>100% Authentic</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Purchasing Dock - Positioned safely above Mobile Bottom Navbar */}
      <div className="fixed bottom-[calc(56px+env(safe-area-inset-bottom))] inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-zinc-100 p-3 sm:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <button
          disabled={!selectedSize || cartState !== "idle"}
          onClick={handleAddToCart}
          className={`w-full h-12 rounded-xl text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2.5 active:scale-[0.98] ${
            cartState === "added"
              ? "bg-emerald-600 text-white"
              : cartState === "loading"
                ? "bg-zinc-900 text-white opacity-90 cursor-wait"
                : !selectedSize
                  ? "bg-zinc-100 text-zinc-400 border border-zinc-200 cursor-not-allowed"
                  : "bg-zinc-950 text-white shadow-sm"
          }`}
        >
          {cartState === "loading" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>ADDING TO BAG...</span>
            </>
          ) : cartState === "added" ? (
            <>
              <Check className="w-4 h-4 text-white" />
              <span>ADDED TO BAG!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>{selectedSize ? "ADD TO BAG" : "SELECT SIZE TO ADD"}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
