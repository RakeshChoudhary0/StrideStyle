"use client";

import React from "react";
import { Trash2, Plus, Minus, ShieldCheck } from "lucide-react";
import { ProductType, ParentType } from "@/Features/Shop/Data/ProductData";
import Image from "next/image";
import Link from "next/link";

interface CartItemRowProps {
  product: ProductType;
  selectedSize: string;
  quantity: number;
  onUpdateQuantity: (change: number) => void;
  onRemove: () => void;
  parentInfo?: ParentType;
}

export const CartItemRow = ({
  product,
  selectedSize,
  quantity,
  onUpdateQuantity,
  onRemove,
  parentInfo,
}: CartItemRowProps) => {
  const currentStockItem = product.stock.find((s) => s.size === selectedSize);
  const maxStock = currentStockItem ? currentStockItem.stock : 10;
  const hasDiscount = product.discount > 0;

  return (
    <div className="group relative bg-white border border-zinc-200/80 p-4 md:p-5 flex gap-4 md:gap-6 transition-all duration-300 hover:border-zinc-900 hover:shadow-[0_8px_30px_rgb(0,0,0,0.03)] rounded-sm">
      <Link
        href={`/product/${product.slug}`}
        className="cursor-pointer relative w-24 h-32 md:w-28 md:h-36 bg-zinc-50 shrink-0 overflow-hidden border border-zinc-100"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          width={100}
          height={100}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        {hasDiscount && (
          <span className="absolute top-2 left-2 bg-zinc-900 text-white font-mono font-bold text-[9px] tracking-wider uppercase px-1.5 py-0.5 pointer-events-none">
            -{product.discount}%
          </span>
        )}
      </Link>

      {/* Core Content Layout */}
      <div className="flex flex-col flex-1 justify-between min-w-0">
        <div>
          <div className="flex justify-between items-start gap-4">
            <h3 className="text-xs md:text-sm font-bold tracking-tight text-zinc-900 truncate uppercase">
              {parentInfo?.name || product.name}
            </h3>
            <div className="text-right flex-shrink-0">
              <p className="text-xs md:text-sm font-bold text-zinc-900">
                ₹{product.salePrice}
              </p>
              {hasDiscount && (
                <p className="text-[10px] md:text-xs text-zinc-400 line-through font-medium mt-0.5">
                  ₹{product.basePrice}
                </p>
              )}
            </div>
          </div>

          {/* Subtitles & Meta details */}
          <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-medium mt-1">
            {parentInfo?.style} &middot; {parentInfo?.gender}
          </p>

          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-4 text-[11px] text-zinc-500 font-medium">
            <p className="flex items-center gap-2 bg-zinc-50 border border-zinc-100 px-2 py-0.5 rounded-sm">
              <span
                className="w-2.5 h-2.5 rounded-full border border-zinc-300 flex-shrink-0"
                style={{ backgroundColor: product.color }}
              />
              <span className="text-zinc-700">{product.colorName}</span>
            </p>
            <p className="bg-zinc-50 border border-zinc-100 px-2 py-0.5 rounded-sm">
              SIZE:{" "}
              <span className="font-bold text-zinc-900">{selectedSize}</span>
            </p>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex justify-between items-center mt-4 pt-3 border-t border-zinc-100/80">
          <div className="flex items-center border border-zinc-200 bg-white rounded-sm overflow-hidden shadow-sm transition-colors duration-200 focus-within:border-zinc-900">
            <button
              onClick={() => onUpdateQuantity(-1)}
              disabled={quantity <= 1}
              className="p-1.5 px-2.5 text-zinc-400 hover:text-zinc-900 disabled:opacity-30 disabled:hover:text-zinc-400 transition-colors"
            >
              <Minus className="w-3 h-3" strokeWidth={2.5} />
            </button>
            <span className="w-7 text-center font-mono text-xs font-bold text-zinc-900">
              {quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(1)}
              disabled={quantity >= maxStock}
              className="p-1.5 px-2.5 text-zinc-400 hover:text-zinc-900 disabled:opacity-30 disabled:hover:text-zinc-400 transition-colors"
            >
              <Plus className="w-3 h-3" strokeWidth={2.5} />
            </button>
          </div>

          <button
            onClick={onRemove}
            className="text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 p-2 rounded-sm transition-all duration-200"
            aria-label="Remove item"
          >
            <Trash2 className="w-3.5 h-3.5" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
};
