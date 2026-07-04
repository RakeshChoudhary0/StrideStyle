import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export interface ProductType {
  id: number;
  parentId: number | null;
  title: string;
  price: string;
  discount: string;
  imgUrl: string[];
  sizes: string[];
  color?: string;
}

interface ProductCardProps {
  product: ProductType;
  index: number;
}

const ShowProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  return (
    <Link
      href={`/product/${product.id}`}
      className={`group relative min-w-[210px] md:min-w-[270px] flex-1 h-[380px] md:h-[500px] rounded-[24px] overflow-hidden shadow-sm snap-start transition-all duration-500 hover:-translate-y-2 block border border-zinc-200/60 ${
        index % 2 === 1 ? "md:mt-8" : ""
      }`}
    >
      <div className="absolute inset-0 w-full h-full bg-zinc-100 z-0">
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-1 items-start">
          <span className="bg-black text-white text-[9px] font-bold tracking-wider px-2 py-1 uppercase rounded-sm">
            NEW DROP
          </span>
          <span className="bg-white/95 backdrop-blur-xs border border-zinc-200 text-black text-[9px] font-black tracking-wider px-2 py-0.5 rounded-sm shadow-xs">
            {product.discount}
          </span>
        </div>

        <Image
          src={product.imgUrl[0]}
          alt={product.title}
          fill
          sizes="(max-w-768px) 50vw, 25vw"
          className="w-full h-full object-cover transition-all duration-500"
        />

        {/* Shadow Overlay for Typography Safety */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />
      </div>

      {/* Product Meta Info Display */}
      <div className="absolute bottom-6 left-6 right-6 z-20 flex items-end justify-between pointer-events-none">
        <div className="flex flex-col gap-0.5 text-left">
          <h3 className="text-sm md:text-base font-bold tracking-tight text-white uppercase font-streethead line-clamp-1">
            {product.title}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-sm font-black text-white">
              {product.price}
            </span>
          </div>
        </div>

        {/* Action Node Icon */}
        <div className="w-8 h-8 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-300 shrink-0">
          <ArrowUpRight className="w-4 h-4 transform group-hover:rotate-45 transition-transform" />
        </div>
      </div>
    </Link>
  );
};

export default ShowProductCard;
