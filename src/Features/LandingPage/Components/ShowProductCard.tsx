import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import calculateDiscount from "@/Extras/Utils/DiscountCalculator";

// Updated type interface matching your strict collection data format
export interface ProductType {
  _id: string;
  parent: string;
  name: string;
  slug: string;
  color: string;
  price: string;
  discount: string; // Simple number string like "10" or "20"
  images: string[];
  sizes: string[];
  stock: { size: string; stock: number }[];
}

interface ProductCardProps {
  product: ProductType;
  index: number;
}

const ShowProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  if (!product || !product.images || !product.images[0]) return null;

  return (
    <Link
      href={`/product/${product.slug}`}
      className={`group relative min-w-[210px] md:min-w-[270px] flex-1 h-[380px] md:h-[500px] rounded-[24px] overflow-hidden shadow-sm snap-start transition-all duration-500 hover:-translate-y-2 block border border-zinc-200/60 ${
        index % 2 === 1 ? "md:mt-8" : ""
      }`}
    >
      <div className="absolute inset-0 w-full h-full bg-zinc-100 z-0">
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-1 items-start">
          <span className="bg-black text-white text-[9px] font-bold tracking-wider px-2 py-1 uppercase rounded-sm">
            NEW DROP
          </span>
          {/* Only render discount if it's greater than 0 */}
          {product.discount !== "0" && (
            <span className="bg-white/95 backdrop-blur-xs border border-zinc-200 text-black text-[9px] font-black tracking-wider px-2 py-0.5 rounded-sm shadow-xs">
              {product.discount}% OFF
            </span>
          )}
        </div>

        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-w-[768px]) 50vw, 25vw"
          className="w-full h-full object-cover transition-all duration-500"
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 z-20 backdrop-blur-sm bg-black/50 gap-3 flex items-center justify-between pointer-events-none">
        <div className="flex flex-col gap-0.5 text-left">
          <h3 className="text-sm md:text-base font-bold tracking-tight text-white uppercase font-streethead line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-sm font-black text-white">
              ₹
              {Number(
                calculateDiscount(product.price, product.discount),
              ).toLocaleString("en-IN")}
            </span>
            {product.discount !== "0" && (
              <span className="text-sm font-black line-through text-zinc-400">
                {`₹${product.price}`}
              </span>
            )}
          </div>
        </div>

        <div className="w-9 h-9 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-300 shrink-0">
          <ArrowUpRight className="w-4 h-4 transform group-hover:rotate-45 transition-transform" />
        </div>
      </div>
    </Link>
  );
};

export default ShowProductCard;
