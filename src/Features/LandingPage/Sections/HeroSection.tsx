"use client";

import React from "react";
import Link from "next/link";
import ShowProductCard from "../Components/ShowProductCard";

const productsData = {
  products: [
    {
      id: 1,
      parentId: null,
      title: "Essential Cotton Tee",
      category: "",
      price: "₹899",
      discount: "20% OFF",
      imgUrl: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&auto=format&fit=crop&q=80",
      ],
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: 4,
      parentId: null,
      title: "Classic Denim Jacket",
      category: "",
      price: "₹3,499",
      discount: "15% OFF",
      imgUrl: [
        "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=600&auto=format&fit=crop&q=80",
      ],
      sizes: ["M", "L", "XL", "XXL"],
    },
    {
      id: 7,
      parentId: null,
      title: "Signature Street Trackpants",
      category: "",
      price: "₹1,399",
      discount: "30% OFF",
      imgUrl: [
        "https://images.unsplash.com/photo-1551854838-212c50b4c184?w=600&auto=format&fit=crop&q=80",
      ],
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: 13,
      parentId: null,
      title: "Cargo Joggers",
      category: "",
      price: "₹1,799",
      discount: "25% OFF",
      imgUrl: [
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&auto=format&fit=crop&q=80",
      ],
      sizes: ["S", "M", "L", "XL", "XXL"],
    },
  ],
};

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen bg-white text-black overflow-hidden pt-10 md:pt-24 pb-16 select-none">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
        <div className="w-full text-center py-10 md:py-14 flex flex-col items-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-streethead font-extrabold tracking-tight uppercase leading-none mb-4 text-primary">
            DROP 01 || THE STREETS ARE CALLING
          </h1>
          <p className="text-zinc-500 text-xs md:text-sm tracking-widest uppercase font-semibold mb-6">
            Premium Heavyweight Tees &amp; Tailored Trackpants
          </p>
          <Link
            href="/shop"
            className="px-7 py-5 bg-primary rounded-2xl text-white text-xs font-bold tracking-widest uppercase transition-all duration-200 hover:bg-zinc-800 active:scale-95"
          >
            SHOP THE DROPS
          </Link>
        </div>

        {/* Interactive Secondary Navigation Element Node */}
        <div className="w-full flex items-center justify-between border-b border-zinc-200 pb-4 mb-6">
          <h2 className="text-lg md:text-xl font-bold tracking-tight uppercase font-streethead">
            NEW PRODUCTS
          </h2>
          <Link
            href="/shop"
            className="text-xs font-bold underline tracking-wide text-zinc-600 hover:text-black"
          >
            VIEW ALL
          </Link>
        </div>

        {/* Horizontal Card Sliders Mapping Modulated Children Items */}
        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-12 pt-4 scrollbar-none no-scrollbar snap-x snap-mandatory lg:justify-between">
          {productsData.products.map((product, index) => (
            <ShowProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
