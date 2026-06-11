import MinimalProductCard from "@/SharedComponent/ProductCard/minimalProductCard";
import Image from "next/image";
import React from "react";

interface FeaturesCardTypes {
  activeTab: string;
}

const PRODUCTS_DATA = [
  {
    id: "prod-1",
    category: "MEN TEE",
    title: "Marlow Tee",
    price: "$49",
    colorTags: ["bg-[#5E2B13]", "bg-black", "bg-white"],
    imageMain:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000",
    imageProduct:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000",
    description:
      "Our essentials are crafted from heavy-weight organic cotton and recycled fibers, ensuring every piece feels as premium as it looks.",
    isNew: true,
  },
  {
    id: "prod-2",
    category: "MEN TRACK",
    title: "Over-Sized Tracksuit",
    price: "$120",
    colorTags: ["bg-[#3c3d37]", "bg-[#1a1a1a]"],
    imageMain:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000",
    imageProduct:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000",
    description:
      "Premium heavy-fleece tailoring meets modern luxury street styling standards. Experience supreme loungewear structural layout loops.",
    isNew: true,
  },
  {
    id: "prod-3",
    category: "WOMEN TEE",
    title: "Classic Crop Base",
    price: "$39",
    colorTags: ["bg-[#d4af37]", "bg-white", "bg-neutral-400"],
    imageMain:
      "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?q=80&w=1000",
    imageProduct:
      "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?q=80&w=1000",
    description:
      "Breathable ultra-soft ribbed jersey weave optimized for effortless capsule wardrobe layer foundations across any casual setting.",
    isNew: true,
  },
  {
    id: "prod-4",
    category: "WOMEN TRACK",
    title: "Relaxed Lounge Pant",
    price: "$95",
    colorTags: ["bg-[#5E2B13]", "bg-black"],
    imageMain:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000",
    imageProduct:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000",
    description:
      "Designed with a high-waisted fluid drape frame tailored to perfection from sustainable eucalyptus modal French Terry structures.",
    isNew: true,
  },
  {
    id: "prod-5",
    category: "KIDS SET",
    title: "Mini Organic Set",
    price: "$65",
    colorTags: ["bg-[#a3b18a]", "bg-[#e9edc9]"],
    imageMain:
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1000",
    imageProduct:
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1000",
    description:
      "Hypoallergenic ultra-soft durability intended for high-motion day cycles. Styled cleanly in classic minimal earth-tone hues.",
    isNew: true,
  },
];

export default function FeaturesCard({ activeTab }: FeaturesCardTypes) {
  const currentItem =
    PRODUCTS_DATA.find((item) => item.category === activeTab) ||
    PRODUCTS_DATA[0];

  return (
    <div className="w-full bg-neutral-50 py-6 md:py-10 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-5">
        <div
          key={activeTab}
          className="grid grid-cols-12 gap-8 lg:gap-16 items-center animate-slide-in"
        >
          <div className="col-span-12 lg:col-span-7 flex flex-col justify-center order-1 lg:order-0">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black mb-4">
              Designed for Living
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-xl mb-10 leading-relaxed">
              {currentItem.description}
            </p>

            <div className="w-full bg-gray-200 rounded-2xl overflow-hidden group shadow-sm">
              <Image
                className="w-full h-auto aspect-square object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Lookbook focus"
                src={currentItem.imageMain}
                width={600}
                height={600}
                loading="eager"
              />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 flex flex-col items-center justify-center">
            <MinimalProductCard
              title={currentItem.title}
              price={currentItem.price}
              category={currentItem.category}
              imageProduct={currentItem.imageProduct}
              colorTags={currentItem.colorTags}
              isNew={currentItem.isNew}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
