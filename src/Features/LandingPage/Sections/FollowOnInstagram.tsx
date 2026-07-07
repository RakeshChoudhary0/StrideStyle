"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { SiInstagram } from "@icons-pack/react-simple-icons";

const FollowOnInstagramSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

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

  // Dynamically calculate horizontal scroll percentage for the minimalist progress indicator
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const totalScrollable = scrollWidth - clientWidth;
    if (totalScrollable <= 0) return;
    setScrollProgress((scrollLeft / totalScrollable) * 100);
  };

  return (
    <section className="w-full bg-white text-zinc-950 py-20 select-none border-t border-zinc-100 overflow-hidden">
      <div className="w-full flex flex-col items-center">
        {/* Editorial Section Heading */}
        <div className="text-center mb-12 space-y-2.5 px-4">
          <span className="text-[10px] font-bold tracking-[0.25em] text-zinc-400 uppercase block">
            On the Grid
          </span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-zinc-900">
            WEAR THE LOOK
          </h2>
          <div className="h-px w-8 bg-zinc-950 mx-auto opacity-30 my-1"></div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-600 hover:text-zinc-950 transition-colors"
          >
            <SiInstagram size={14} />
            @YOURBRANDNAME
          </a>
        </div>

        {/* Carousel Wrapper: Touch Swipe Scroll on Mobile, Perfect Grid Grid on Desktop */}
        <div className="w-full relative px-4 md:px-0">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="w-full flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-none no-scrollbar pb-6 md:pb-0 md:gap-[2px] lg:grid lg:grid-cols-6 lg:overflow-x-visible lg:bg-zinc-100"
          >
            {instaFeed.map((post) => (
              <a
                key={post.id}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[75vw] sm:min-w-[45vw] md:min-w-[33vw] lg:min-w-0 group relative aspect-square overflow-hidden bg-zinc-50 block snap-center"
              >
                <Image
                  src={post.imgUrl}
                  alt="Instagram Streetwear Look"
                  fill
                  sizes="(max-w-640px) 75vw, (max-w-1024px) 33vw, 16vw"
                  className="object-cover object-center transform scale-100 transition-transform duration-700 ease-out group-hover:scale-104"
                />

                {/* Premium Glassmorphic Hover Mask */}
                <div className="absolute inset-0 bg-zinc-950/40 opacity-0 lg:group-hover:opacity-100 backdrop-blur-[2px] transition-all duration-300 flex items-center justify-center">
                  <div className="bg-white text-zinc-950 p-3 rounded-full transform translate-y-2 lg:group-hover:translate-y-0 transition-transform duration-300 shadow-xl">
                    <SiInstagram size={16} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Premium Minimalist Progress Timeline Bar (Visible ONLY on Mobile Viewports) */}
        <div className="w-24 h-[2px] bg-zinc-100 mt-4 rounded-full relative overflow-hidden lg:hidden">
          <div
            className="absolute top-0 left-0 h-full bg-zinc-950 transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>
    </section>
  );
};

export default FollowOnInstagramSection;
