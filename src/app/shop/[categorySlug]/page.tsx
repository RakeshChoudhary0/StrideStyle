"use client";

import React, { useState, use, useMemo } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { Product, Parent } from "@/Features/Shop/Data/ProductData";
import { categories } from "@/Features/LandingPage/Data/categeoryData";
import MainProductCard from "@/Components/Products/MainProductCard";

interface CategoryPageProps {
  params: Promise<{
    categorySlug: string;
  }>;
}

export default function CategoryFilteredPage({ params }: CategoryPageProps) {
  const resolvedParams = use(params);
  const currentSlug = resolvedParams.categorySlug;

  // Validate slug mapping via landing configurations array
  const activeCategory = categories.find(
    (cat) => cat.categorySlug === currentSlug,
  );
  if (!activeCategory) {
    notFound();
  }

  // State Management Hooks
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(4000);

  // 1. Isolate parent items matching this specific category slug parameter
  const matchedParentIds = useMemo(() => {
    return Parent.filter((p) => p.categorySlug === currentSlug).map(
      (p) => p._id,
    );
  }, [currentSlug]);

  // 2. Isolate products targeting those parent elements
  const categoryProductsPool = useMemo(() => {
    return Product.filter((p) => matchedParentIds.includes(p.parent));
  }, [matchedParentIds]);

  // 3. Extract unique Design Fit options dynamically from current category results
  const uniqueStyles = useMemo(() => {
    const styles = Parent.filter((p) => matchedParentIds.includes(p._id)).map(
      (p) => p.style,
    );
    return Array.from(new Set(styles));
  }, [matchedParentIds]);

  // 4. Compute active user state filter settings
  const finalFilteredProducts = useMemo(() => {
    return categoryProductsPool.filter((product) => {
      const parentItem = Parent.find((p) => p._id === product.parent);
      const displayPrice = product.salePrice || product.basePrice;

      const matchStyle =
        selectedStyles.length === 0 ||
        (parentItem && selectedStyles.includes(parentItem.style));
      const matchPrice = displayPrice <= maxPrice;

      return matchStyle && matchPrice;
    });
  }, [categoryProductsPool, selectedStyles, maxPrice]);

  const toggleStyleFilter = (styleName: string) => {
    setSelectedStyles((prev) =>
      prev.includes(styleName)
        ? prev.filter((s) => s !== styleName)
        : [...prev, styleName],
    );
  };

  return (
    <div className="min-h-screen bg-zinc-50 pt-28 pb-16 px-4 sm:px-6 lg:px-12 relative overflow-x-hidden">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Control Utility Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-zinc-400">
            <Link
              href="/shop"
              className="hover:text-zinc-900 transition-colors"
            >
              Shop
            </Link>
            <span>/</span>
            <span className="text-zinc-900">{activeCategory.title}</span>
          </div>

          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-2 border border-zinc-950 bg-transparent px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-zinc-950 hover:bg-zinc-950 hover:text-white transition-all duration-300 cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filter
          </button>
        </div>

        {/* Header Display */}
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight text-zinc-900 uppercase">
            {activeCategory.title}
          </h1>
          <p className="text-zinc-500 text-xs tracking-wider font-medium">
            Showing {finalFilteredProducts.length} items curated under this
            selection.
          </p>
        </div>

        <hr className="border-zinc-200" />

        {/* Category Result Grid Container */}
        {finalFilteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white border border-zinc-200 rounded-lg">
            <p className="text-sm text-zinc-400 font-medium mb-4">
              No active matching items found in this section.
            </p>
            <button
              onClick={() => {
                setSelectedStyles([]);
                setMaxPrice(4000);
              }}
              className="text-xs font-bold uppercase border border-zinc-950 px-5 py-2.5 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6">
            {finalFilteredProducts.map((product) => {
              const matchedParent = Parent.find(
                (p) => p._id === product.parent,
              );
              return (
                <MainProductCard
                  key={product._id}
                  product={product}
                  availableColors={matchedParent?.totalColors || []}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* RIGHT SIDE SLIDING PANEL COMPONENT BLOCK */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${isDrawerOpen ? "visible" : "invisible"}`}
      >
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300 ${isDrawerOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setIsDrawerOpen(false)}
        />

        <div
          className={`absolute top-0 right-0 h-full w-full max-w-md bg-white p-6 shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="space-y-6 overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
              <h2 className="text-base font-black tracking-widest uppercase text-zinc-900">
                Filters
              </h2>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="text-zinc-500 hover:text-zinc-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Design Fit Checklist Element */}
            {uniqueStyles.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold tracking-wider uppercase text-zinc-400">
                  Design Fit
                </h3>
                <div className="space-y-2">
                  {uniqueStyles.map((style) => (
                    <label
                      key={style}
                      className="flex items-center gap-3 text-xs font-bold text-zinc-800 uppercase cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        checked={selectedStyles.includes(style)}
                        onChange={() => toggleStyleFilter(style)}
                        className="w-4 h-4 accent-zinc-950 border-zinc-300 rounded-none"
                      />
                      {style}
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Price Threshold Track Slider element */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-bold tracking-wider uppercase text-zinc-400">
                <span>Max Budget</span>
                <span className="text-zinc-900">
                  ₹{maxPrice.toLocaleString("en-IN")}
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="4000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1 bg-zinc-200 accent-zinc-950 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="border-t border-zinc-100 pt-4 grid grid-cols-2 gap-3 bg-white">
            <button
              onClick={() => {
                setSelectedStyles([]);
                setMaxPrice(4000);
              }}
              className="w-full py-3.5 border border-zinc-200 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
            >
              Clear All
            </button>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="w-full py-3.5 bg-zinc-950 text-white text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
