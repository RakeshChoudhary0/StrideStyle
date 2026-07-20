"use client";

import React from "react";
import Image from "next/image";
import { SiInstagram } from "@icons-pack/react-simple-icons";

const FollowOnInstagramSection = () => {
  const instaFeed = [
    {
      id: 1,
      imgUrl:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80",
      link: "https://instagram.com",
    },
    {
      id: 2,
      imgUrl:
        "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=600&auto=format&fit=crop&q=80",
      link: "https://instagram.com",
    },
    {
      id: 3,
      imgUrl:
        "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&auto=format&fit=crop&q=80",
      link: "https://instagram.com",
    },
    {
      id: 4,
      imgUrl:
        "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600&auto=format&fit=crop&q=80",
      link: "https://instagram.com",
    },
    {
      id: 5,
      imgUrl:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80",
      link: "https://instagram.com",
    },
    {
      id: 6,
      imgUrl:
        "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&auto=format&fit=crop&q=80",
      link: "https://instagram.com",
    },
  ];

  return (
    <section className="w-full bg-white text-zinc-950 py-16 md:py-24 select-none border-t border-zinc-100 overflow-hidden antialiased">
      <div className="w-full max-w-7xl mx-auto">
        {/* Editorial Section Heading */}
        <div className="text-center mb-10 md:mb-16 space-y-2 px-4">
          <span className="text-[10px] font-bold tracking-[0.25em] text-zinc-400 uppercase block">
            ON THE GRID
          </span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-zinc-900 font-streethead">
            WEAR THE LOOK
          </h2>
          <div className="pt-1">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-zinc-500 hover:text-zinc-950 transition-colors uppercase"
            >
              <SiInstagram
                size={12}
                className="text-zinc-400 group-hover:text-zinc-950"
              />
              @YOURBRANDNAME
            </a>
          </div>
        </div>

        {/* Responsive Layout Display Track */}
        <div className="w-full px-4 md:px-8">
          {/* Mobile Viewport: Fluid Carousel with Native Padding Peek */}
          <div className="flex md:hidden gap-3.5 overflow-x-auto pb-4 scrollbar-none no-scrollbar snap-x snap-mandatory -mx-4 px-4">
            {instaFeed.map((post) => (
              <a
                key={`mb-insta-${post.id}`}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[72vw] aspect-square relative rounded-2xl overflow-hidden bg-zinc-50 border border-zinc-100 block snap-center active:scale-[0.98] transition-transform duration-150"
              >
                <Image
                  src={post.imgUrl}
                  alt="Instagram Lookbook"
                  fill
                  sizes="75vw"
                  className="object-cover object-center"
                />
                {/* Clean, Non-obtrusive Mobile branding link identifier */}
                <div className="absolute bottom-3 right-3 bg-black/40 backdrop-blur-md p-1.5 rounded-full text-white">
                  <SiInstagram size={12} />
                </div>
              </a>
            ))}
          </div>

          {/* Desktop Viewport: Premium Minimalist Grid Layout */}
          <div className="hidden md:grid grid-cols-6 gap-1.5 w-full bg-white">
            {instaFeed.map((post) => (
              <a
                key={`dt-insta-${post.id}`}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden bg-zinc-50 block border border-zinc-100"
              >
                <Image
                  src={post.imgUrl}
                  alt="Instagram Lookbook"
                  fill
                  sizes="(max-w-1024px) 33vw, 16vw"
                  className="object-cover object-center transform scale-100 transition-transform duration-700 ease-out group-hover:scale-104"
                />

                {/* Micro Glassmorphic Hover Overlay */}
                <div className="absolute inset-0 bg-zinc-950/20 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-all duration-300 flex items-center justify-center">
                  <div className="bg-white text-zinc-950 p-3 rounded-full transform translate-y-3 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                    <SiInstagram size={14} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FollowOnInstagramSection;
