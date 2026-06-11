import MinimalProductCard from "@/SharedComponent/ProductCard/minimalProductCard";
import React from "react";

const PRODUCTS_DATA = [
  {
    id: "prod-1",
    category: "MEN TEE",
    title: "Marlow Tee",
    price: "$49",
    colorTags: ["bg-[#5E2B13]", "bg-black", "bg-white"],
    imageProduct:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000",
    isNew: true,
  },
  {
    id: "prod-2",
    category: "MEN TRACK",
    title: "Over-Sized Tracksuit",
    price: "$120",
    colorTags: ["bg-[#3c3d37]", "bg-[#1a1a1a]"],
    imageProduct:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000",
    isNew: true,
  },
  {
    id: "prod-3",
    category: "WOMEN TEE",
    title: "Classic Crop Base",
    price: "$39",
    colorTags: ["bg-[#d4af37]", "bg-white", "bg-neutral-400"],
    imageProduct:
      "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?q=80&w=1000",
    isNew: true,
  },
  {
    id: "prod-4",
    category: "WOMEN TRACK",
    title: "Relaxed Lounge Pant",
    price: "$95",
    colorTags: ["bg-[#5E2B13]", "bg-black"],
    imageProduct:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000",
    isNew: true,
  },
];

const TrendingSection = () => {
  return (
    <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 bg-primary-fixed-dim py-16 md:py-28">
      <section className="max-w-7xl mx-auto">
        <div className="text-left mb-12 md:mb-20 max-w-xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter text-on-tertiary-fixed-variant mb-4">
            Trending Now
          </h2>
          <p className="text-sm sm:text-base md:text-lg font-light text-inverse-surface leading-relaxed">
            Selected by our community, curated for your wardrobe. Discover the{" "}
            <br className="hidden sm:block" />
            season’s most-wanted silhouettes.
          </p>
        </div>

        <div className="w-full flex flex-wrap justify-center gap-6">
          {PRODUCTS_DATA.map((product) => (
            <MinimalProductCard
              key={product.id}
              title={product.title}
              category={product.category}
              price={product.price}
              imageProduct={product.imageProduct}
              colorTags={product.colorTags}
              isNew={product.isNew}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default TrendingSection;
