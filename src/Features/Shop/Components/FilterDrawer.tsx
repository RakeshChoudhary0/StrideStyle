"use client";

import React, { useState, useEffect } from "react";
import { X, Check } from "lucide-react";

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
  // Local temporary states so changes only apply when clicking "Apply Filters"
  const [localCategories, setLocalCategories] =
    useState<string[]>(selectedCategories);
  const [localStyles, setLocalStyles] = useState<string[]>(selectedStyles);
  const [localSizes, setLocalSizes] = useState<string[]>(selectedSizes);
  const [localMaxPrice, setLocalMaxPrice] = useState<number>(maxPrice);

  // Sync local state when the drawer opens
  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocalCategories(selectedCategories);
      setLocalStyles(selectedStyles);
      setLocalSizes(selectedSizes);
      setLocalMaxPrice(maxPrice);
    }
  }, [isOpen, selectedCategories, selectedStyles, selectedSizes, maxPrice]);

  const availableSizes = React.useMemo(() => {
    const defaultTrack = [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL",
      "4XL",
      "5XL",
    ];
    const originalSizes = filterOptions.sizes.map((s) => s.toUpperCase());

    return Array.from(new Set([...defaultTrack, ...originalSizes]));
  }, [filterOptions.sizes]);

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

  const handleApplyFilters = () => {
    setSelectedCategories(localCategories);
    setSelectedStyles(localStyles);
    setSelectedSizes(localSizes);
    setMaxPrice(localMaxPrice);
    onClose();
  };

  const handleLocalReset = () => {
    setLocalCategories([]);
    setLocalStyles([]);
    setLocalSizes([]);
    setLocalMaxPrice(filterOptions.highestPrice || 4000);
    onReset();
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${isOpen ? "visible" : "invisible"}`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-zinc-950/30 backdrop-blur-xs transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />

      {/* Drawer Canvas */}
      <div
        className={`absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Main Contents */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8 CustomScrollbar">
          {/* Header Layout */}
          <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
            <div className="space-y-0.5">
              <h2 className="text-lg font-serif text-zinc-900">
                Filter Choices
              </h2>
              <p className="text-xs text-zinc-400">Refine your look</p>
            </div>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-zinc-900 p-1.5 rounded-full hover:bg-zinc-50 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" strokeWidth={2} />
            </button>
          </div>

          {/* Categories Option Container */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-zinc-400 tracking-wide">
              Categories
            </h3>
            <div className="space-y-2">
              {filterOptions.categories.map((cat) => {
                const isChecked = localCategories.includes(cat);
                return (
                  <button
                    key={cat}
                    onClick={() =>
                      handleToggle(cat, localCategories, setLocalCategories)
                    }
                    className="flex items-center gap-3 w-full py-1 text-sm font-medium text-zinc-700 capitalize text-left cursor-pointer select-none group"
                  >
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                        isChecked
                          ? "bg-zinc-900 border-zinc-900 text-white"
                          : "border-zinc-300 group-hover:border-zinc-400 bg-white"
                      }`}
                    >
                      {isChecked && (
                        <Check className="w-3.5 h-3.5" strokeWidth={3} />
                      )}
                    </div>
                    <span
                      className={`${isChecked ? "text-zinc-950 font-semibold" : "group-hover:text-zinc-950"} transition-colors`}
                    >
                      {cat.replace("-", " ")}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fit & Styles */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-zinc-400 tracking-wide">
              Fit Profile
            </h3>
            <div className="space-y-2">
              {filterOptions.styles.map((style) => {
                const isChecked = localStyles.includes(style);
                return (
                  <button
                    key={style}
                    onClick={() =>
                      handleToggle(style, localStyles, setLocalStyles)
                    }
                    className="flex items-center gap-3 w-full py-1 text-sm font-medium text-zinc-700 capitalize text-left cursor-pointer select-none group"
                  >
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                        isChecked
                          ? "bg-zinc-900 border-zinc-900 text-white"
                          : "border-zinc-300 group-hover:border-zinc-400 bg-white"
                      }`}
                    >
                      {isChecked && (
                        <Check className="w-3.5 h-3.5" strokeWidth={3} />
                      )}
                    </div>
                    <span
                      className={`${isChecked ? "text-zinc-950 font-semibold" : "group-hover:text-zinc-950"} transition-colors`}
                    >
                      {style}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sizes Metric Block */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-zinc-400 tracking-wide">
              Select Sizes
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {availableSizes.map((size) => {
                const isSelected =
                  localSizes.includes(size.toLowerCase()) ||
                  localSizes.includes(size);
                return (
                  <button
                    key={size}
                    onClick={() => {
                      // Match against both dynamic casing types safely
                      const matchedValue =
                        filterOptions.sizes.find(
                          (s) => s.toUpperCase() === size.toUpperCase(),
                        ) || size;
                      handleToggle(matchedValue, localSizes, setLocalSizes);
                    }}
                    className={`h-11 text-xs font-medium border rounded-lg transition-all cursor-pointer flex items-center justify-center ${
                      isSelected
                        ? "bg-zinc-900 border-zinc-900 text-white font-semibold shadow-xs"
                        : "bg-white border-zinc-200 text-zinc-700 hover:border-zinc-400 hover:bg-zinc-50"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pricing Slider Segment */}
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs font-semibold tracking-wide text-zinc-400">
              <span>Maximum Budget</span>
              <span className="text-zinc-950 font-semibold text-sm">
                ₹{localMaxPrice.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="relative pt-1">
              <input
                type="range"
                min="500"
                max={filterOptions.highestPrice || 4000}
                step="100"
                value={localMaxPrice}
                onChange={(e) => setLocalMaxPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-100 accent-zinc-900 rounded-lg appearance-none cursor-pointer border border-zinc-200/50"
              />
            </div>
          </div>
        </div>

        {/* Dynamic Navigation/Action Row Controls */}
        <div className="border-t border-zinc-100 px-6 py-4 grid grid-cols-2 gap-3 bg-zinc-50/50">
          <button
            onClick={handleLocalReset}
            className="w-full py-3 border border-zinc-200 bg-white text-sm font-medium text-zinc-600 rounded-xl hover:text-zinc-950 hover:border-zinc-300 transition-all cursor-pointer shadow-xs"
          >
            Clear All
          </button>
          <button
            onClick={handleApplyFilters}
            className="w-full py-3 bg-zinc-900 text-white text-sm font-medium rounded-xl hover:bg-zinc-800 transition-colors shadow-sm cursor-pointer"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
