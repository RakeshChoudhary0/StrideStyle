"use client";

import React, { useState, useMemo } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Product, Parent } from "@/Features/Shop/Data/ProductData";
import MainProductCard from "@/Components/Products/MainProductCard";
import FilterDrawer from "@/Features/Shop/Components/FilterDrawer";

export default function AllProductsShopPage() {
  // UI Panel Toggle State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Active Filtration Sub-selection Arrays
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(4000);

  // Parse raw filter limits dynamically from arrays
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

  // Compute products list against parameters
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
    <div className="min-h-screen bg-zinc-50/50 pt-28 pb-24 px-4 sm:px-6 lg:px-12 select-none">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Minimalist Professional Header */}
        <div className="flex items-end justify-between border-b border-zinc-200/60 pb-5">
          <div className="space-y-1.5">
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-zinc-900 uppercase">
              Catalogue
            </h1>
            <p className="text-zinc-400 text-xs font-medium tracking-wide">
              Displaying {filteredProducts.length} of {Product.length}{" "}
              contemporary pieces
            </p>
          </div>

          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-2.5 border border-zinc-900 bg-white px-5 py-3 text-xs font-bold uppercase tracking-widest text-zinc-950 hover:bg-zinc-900 hover:text-white transition-all duration-300 shadow-xs cursor-pointer active:scale-98"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" strokeWidth={2} />
            Filter
          </button>
        </div>

        {/* Product Space Grid Viewport */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 bg-white border border-zinc-200/60 rounded-xl max-w-xl mx-auto p-6 space-y-4 shadow-xs">
            <p className="text-xs text-zinc-400 font-medium tracking-wider uppercase">
              No configurations match your current selection filter criteria.
            </p>
            <button
              onClick={handleResetFilters}
              className="text-[11px] font-bold uppercase border border-zinc-950 bg-zinc-950 text-white px-6 py-3 tracking-widest hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
            {filteredProducts.map((product) => {
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

      {/* Decoupled Filter Drawer Layout */}
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
