"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";

export const EmptyCart = () => {
  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center px-6 pt-20 pb-32">
      <div className="flex flex-col items-center max-w-md text-center">
        <div className="w-16 h-16 bg-zinc-200/60 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-6 h-6 text-zinc-500" strokeWidth={1.5} />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-zinc-900 uppercase">
          Your cart is empty
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Looks like you haven&apos;t added anything to your wardrobe yet.
          Explore our latest arrivals to get started.
        </p>
        <Link
          href="/shop"
          className="mt-8 w-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs uppercase tracking-widest font-semibold py-4 px-8 rounded-none transition-colors duration-200 flex items-center justify-center gap-2"
        >
          Explore Shop <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
