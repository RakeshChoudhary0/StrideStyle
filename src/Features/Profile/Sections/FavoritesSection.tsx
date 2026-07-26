import React from "react";
import { Trash2, ShoppingBag } from "lucide-react";
import { FavoriteItem } from "../types";

interface FavoritesSectionProps {
  items: FavoriteItem[];
  onRemove: (id: number) => void;
}

export function FavoritesSection({ items, onRemove }: FavoritesSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-medium text-stone-900">
          Favorites
        </h1>
        <p className="text-sm text-stone-500 mt-1">
          Products saved to your wishlist.
        </p>
      </div>

      {items.length === 0 ? (
        <p className="text-stone-400 text-sm">No saved items found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-stone-200/80 p-4 relative group shadow-xs"
            >
              <button
                onClick={() => onRemove(item.id)}
                className="absolute top-6 right-6 p-2 bg-white/80 backdrop-blur-xs rounded-full text-stone-400 hover:text-red-500 transition-colors z-10 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="aspect-square rounded-xl bg-stone-100 overflow-hidden mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-sm font-medium text-stone-800">
                {item.name}
              </h3>
              <p className="text-xs font-semibold text-[#8b4513] mt-1">
                {item.price}
              </p>
              <button className="w-full mt-4 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer">
                <ShoppingBag className="w-3.5 h-3.5" /> Move to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
