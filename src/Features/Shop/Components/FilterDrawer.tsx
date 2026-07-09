"use client";

import React from "react";
import { X } from "lucide-react";

interface FilterOptionsType {
  categories: string[];
  styles: string[];
  sizes: string[];
  highestPrice: number;
}

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filterOptions: FilterOptionsType;
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  selectedStyles: string[];
  setSelectedStyles: React.Dispatch<React.SetStateAction<string[]>>;
  selectedSizes: string[];
  setSelectedSizes: React.Dispatch<React.SetStateAction<string[]>>;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
  onReset: () => void;
}

export default function FilterDrawer({
  isOpen,
  onClose,
  filterOptions,
  selectedCategories,
  setSelectedCategories,
  selectedStyles,
  setSelectedStyles,
  selectedSizes,
  setSelectedSizes,
  maxPrice,
  setMaxPrice,
  onReset,
}: FilterDrawerProps) {
  const handleToggle = (
    value: string,
    currentList: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setList(
      currentList.includes(value)
        ? currentList.filter((item) => item !== value)
        : [...currentList, value],
    );
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${isOpen ? "visible" : "invisible"}`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-zinc-950/40 backdrop-blur-xs transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />

      {/* Drawer Canvas */}
      <div
        className={`absolute top-0 right-0 h-full w-full max-w-md bg-white p-6 shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="space-y-8 overflow-y-auto no-scrollbar pr-1">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
            <h2 className="text-sm font-bold tracking-widest uppercase text-zinc-900">
              Filter Collections
            </h2>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h3 className="text-[11px] font-bold tracking-widest uppercase text-zinc-400">
              Category
            </h3>
            <div className="space-y-2.5">
              {filterOptions.categories.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-3 text-xs font-semibold text-zinc-800 uppercase cursor-pointer select-none group"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() =>
                      handleToggle(
                        cat,
                        selectedCategories,
                        setSelectedCategories,
                      )
                    }
                    className="w-4 h-4 rounded-none border-zinc-300 text-zinc-950 focus:ring-0 accent-zinc-950 cursor-pointer"
                  />
                  <span className="group-hover:text-zinc-950 transition-colors">
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Styles */}
          <div className="space-y-3">
            <h3 className="text-[11px] font-bold tracking-widest uppercase text-zinc-400">
              Fit Profile
            </h3>
            <div className="space-y-2.5">
              {filterOptions.styles.map((style) => (
                <label
                  key={style}
                  className="flex items-center gap-3 text-xs font-semibold text-zinc-800 uppercase cursor-pointer select-none group"
                >
                  <input
                    type="checkbox"
                    checked={selectedStyles.includes(style)}
                    onChange={() =>
                      handleToggle(style, selectedStyles, setSelectedStyles)
                    }
                    className="w-4 h-4 rounded-none border-zinc-300 text-zinc-950 focus:ring-0 accent-zinc-950 cursor-pointer"
                  />
                  <span className="group-hover:text-zinc-950 transition-colors">
                    {style}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-3">
            <h3 className="text-[11px] font-bold tracking-widest uppercase text-zinc-400">
              Select Size
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {filterOptions.sizes.map((size) => {
                const isSelected = selectedSizes.includes(size);
                return (
                  <button
                    key={size}
                    onClick={() =>
                      handleToggle(size, selectedSizes, setSelectedSizes)
                    }
                    className={`h-11 text-xs font-bold tracking-wider border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-zinc-900 border-zinc-900 text-white shadow-xs"
                        : "bg-white border-zinc-200 text-zinc-800 hover:border-zinc-900"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pricing Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-center text-[11px] font-bold tracking-widest uppercase text-zinc-400">
              <span>Max Budget Range</span>
              <span className="text-zinc-900 font-mono text-xs">
                ₹{maxPrice.toLocaleString("en-IN")}
              </span>
            </div>
            <input
              type="range"
              min="500"
              max={filterOptions.highestPrice || 4000}
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-[3px] bg-zinc-200 accent-zinc-950 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Action Controls */}
        <div className="border-t border-zinc-100 pt-4 grid grid-cols-2 gap-3 bg-white">
          <button
            onClick={onReset}
            className="w-full py-4 border border-zinc-200 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900 hover:border-zinc-400 transition-all cursor-pointer"
          >
            Clear Filters
          </button>
          <button
            onClick={onClose}
            className="w-full py-4 bg-zinc-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors shadow-md cursor-pointer"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
