import React from "react";
import { Truck } from "lucide-react";

export function OrdersSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-medium text-stone-900">Order History</h1>
        <p className="text-sm text-stone-500 mt-1">Track current orders and review previous purchases.</p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between border-b pb-3 border-stone-100">
          <div>
            <span className="text-xs text-stone-400 block">Order #STR-99421</span>
            <span className="text-sm font-semibold text-stone-800">Oct 24, 2026</span>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-700 rounded-full border border-amber-200">
            In Transit
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-stone-600">
          <Truck className="w-4 h-4 text-[#8b4513]" /> Estimated Delivery in 2 Days
        </div>
      </div>
    </div>
  );
}