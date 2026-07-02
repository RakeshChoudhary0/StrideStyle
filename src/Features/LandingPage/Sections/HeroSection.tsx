import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HeroSection = () => {
  const trendingProducts = [
    {
      id: 1,
      title: "Boxy Tee",
      tag: "BESTSELLER",
      linkUrl: "/product/1",
      imgUrl:
        "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: 2,
      title: "Trackpants",
      tag: "NEW DROP",
      linkUrl: "/product/2",
      imgUrl:
        "https://images.unsplash.com/photo-1551854838-212c50b4c184?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: 3,
      title: "Graphic Tee",
      tag: "TRENDING",
      linkUrl: "/product/3",
      imgUrl:
        "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&auto=format&fit=crop&q=80",
    },
    {
      id: 4,
      title: "Cargo Joggers",
      tag: "MINC PRICE",
      linkUrl: "/product/4",
      imgUrl:
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <section className="relative w-full min-h-screen bg-white text-black overflow-hidden pt-24 pb-16">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
        <div className="w-full text-center py-10 md:py-14 flex flex-col items-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-streethead font-extrabold tracking-tight uppercase leading-none mb-4 text-primary">
            DROP 01 || THE STREETS ARE CALLING
          </h1>
          <p className="text-zinc-500 text-xs md:text-sm tracking-widest uppercase font-semibold mb-6">
            Premium Heavyweight Tees & Tailored Trackpants
          </p>
          <Link
            href="/shop"
            className="px-7 py-5 bg-primary rounded-2xl text-white text-xs font-bold tracking-widest uppercase transition-all duration-200 hover:bg-zinc-800 active:scale-95"
          >
            SHOP THE DROPS
          </Link>
        </div>

        <div className="w-full flex items-center justify-between border-b border-zinc-200 pb-4 mb-6">
          <h2 className="text-lg md:text-xl font-bold tracking-tight uppercase font-streethead">
            TRENDING STYLES
          </h2>
          <Link
            href="/shop"
            className="text-xs font-bold underline tracking-wide text-zinc-600 hover:text-black"
          >
            VIEW ALL
          </Link>
        </div>

        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-12 pt-4 scrollbar-none no-scrollbar snap-x snap-mandatory lg:justify-between">
          {trendingProducts.map((product, index) => (
            <Link
              key={product.id}
              href={product.linkUrl}
              className={`group relative min-w-[200px] md:min-w-[270px] flex-1 h-[380px] md:h-[500px] rounded-[24px] overflow-hidden shadow-sm snap-start transition-all duration-500 hover:-translate-y-2 block border border-zinc-200/60 ${
                index % 2 === 1 ? "md:mt-8" : ""
              }`}
            >
              <div className="absolute inset-0 w-full h-full bg-zinc-100">
                <span className="absolute top-4 left-4 z-20 bg-black text-white text-[9px] font-bold tracking-wider px-2 py-1 uppercase rounded-sm">
                  {product.tag}
                </span>

                <Image
                  src={product.imgUrl}
                  alt={product.title}
                  fill
                  sizes="(max-w-768px) 50vw, 25vw"
                  className="w-full h-full object-cover transition-all duration-500"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/10" />
              </div>

              <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2 pointer-events-none">
                <div className="w-8 h-8 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 transform group-hover:rotate-45 transition-transform" />
                </div>

                <h3 className="text-lg md:text-xl font-bold tracking-tight text-white uppercase origin-left font-streethead">
                  {product.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
