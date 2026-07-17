"use client";

import React, { useState, useMemo } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Product, Parent } from "@/Features/Shop/Data/ProductData";
import MainProductCard from "@/Components/Products/MainProductCard";
import FilterDrawer from "@/Features/Shop/Components/FilterDrawer";

export default function AllProductsShopPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(4000);

  const filterOptions = useMemo(() => {
    const categories = Array.from(new Set(Parent.map((p) => p.categorySlug)));
    const styles = Array.from(new Set(Parent.map((p) => p.style)));
    const sizes = Array.from(new Set(Product.flatMap((p) => p.sizes)));
    const highestPrice = Math.max(
      ...Product.map((p) => p.salePrice || p.basePrice),
      4000,
    );

    return { categories, styles, sizes, highestPrice };
  }, []);

  const filteredProducts = useMemo(() => {
    return Product.filter((product) => {
      const parentItem = Parent.find((p) => p._id === product.parent);
      if (!parentItem) return false;

      const currentPrice = product.salePrice || product.basePrice;

      const matchCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(parentItem.categorySlug);
      const matchStyle =
        selectedStyles.length === 0 ||
        selectedStyles.includes(parentItem.style);
      const matchSize =
        selectedSizes.length === 0 ||
        product.sizes.some((sz) => selectedSizes.includes(sz));
      const matchPrice = currentPrice <= maxPrice;

      return matchCategory && matchStyle && matchSize && matchPrice;
    });
  }, [selectedCategories, selectedStyles, selectedSizes, maxPrice]);

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedStyles([]);
    setSelectedSizes([]);
    setMaxPrice(filterOptions.highestPrice);
  };

  return (
    /* padding-bottom adjusted safely to never collide with MobileBottomBar links */
    <div className="min-h-screen bg-zinc-50/30 pt-0 md:pt-32 pb-32 md:pb-24 px-4 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-0 md:space-y-12">
        {/* Core Header Area */}
        <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-zinc-200/60 py-3">
          <div className="space-y-1 md:space-y-2">
            <h1 className="text-2xl md:text-3xl font-serif text-zinc-900 tracking-wide">
              The Collection
            </h1>
          </div>

          <button
            onClick={() => setIsDrawerOpen(true)}
            type="button"
            className="hidden md:flex items-center justify-center gap-2.5 border border-zinc-900 bg-white px-6 py-3 text-xs font-bold uppercase tracking-widest text-zinc-950 hover:bg-zinc-900 hover:text-white transition-all duration-300 shadow-xs cursor-pointer active:scale-98"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" strokeWidth={2} />
            Filter Choices
          </button>
        </div>

        {/* Mobile Sticky Action Bar — Sticks beautifully below your view stack */}
        <div className="sticky top-0 space-y-2 mb-5 z-30 -mx-4 px-4 py-3 bg-zinc-50/90 backdrop-blur-md border-b border-zinc-200/40 md:hidden flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
            {filteredProducts.length} Items Available
          </span>

          <button
            onClick={() => setIsDrawerOpen(true)}
            type="button"
            className="flex items-center gap-2 border border-zinc-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-zinc-900 rounded-lg shadow-xs active:scale-95"
          >
            <SlidersHorizontal
              className="w-3.5 h-3.5 text-zinc-500"
              strokeWidth={2}
            />
            Filter
          </button>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white border border-zinc-200/60 rounded-2xl max-w-md mx-auto p-8 space-y-5 shadow-xs">
            <p className="text-sm text-zinc-500 font-medium tracking-wide">
              We couldn&apos;t find any items matching your exact choices.
            </p>
            <button
              onClick={handleResetFilters}
              className="text-xs font-bold uppercase tracking-widest border border-zinc-950 bg-zinc-950 text-white px-6 py-3 hover:bg-zinc-800 transition-colors cursor-pointer shadow-sm"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-12">
            {filteredProducts.map((product) => {
              const matchedParent = Parent.find(
                (p) => p._id === product.parent,
              );
              return (
                <div
                  key={product._id}
                  className="transition-transform duration-300 hover:-translate-y-1"
                >
                  <MainProductCard
                    product={product}
                    availableColors={matchedParent?.totalColors || []}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>

      <FilterDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        filterOptions={filterOptions}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        selectedStyles={selectedStyles}
        setSelectedStyles={setSelectedStyles}
        selectedSizes={selectedSizes}
        setSelectedSizes={setSelectedSizes}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        onReset={handleResetFilters}
      />
    </div>
  );
}
