"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

const LOOKBOOK_IMAGES = [
  "https://images.unsplash.com/photo-1578681994506-b8f463449011?q=80&w=3390&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=1311&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export default function HeroGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % LOOKBOOK_IMAGES.length);
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full md:w-1/2 relative h-[50vh] md:h-full bg-surface-container-lowest overflow-hidden">
      {LOOKBOOK_IMAGES.map((src, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-all duration-[1500ms] ease-in-out ${
              isActive
                ? "opacity-100 z-10 scale-100 visible"
                : "opacity-0 z-0 scale-105 invisible"
            }`}
          >
            <Image
              alt={`Stride Style Editorial Collection Frame ${index + 1}`}
              className="object-cover object-center"
              src={src}
              fill
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="eager"
            />
          </div>
        );
      })}

      <div className="absolute inset-0 bg-black/10 z-20 pointer-events-none" />

      <div className="absolute bottom-12 left-12 z-30 flex gap-2">
        {LOOKBOOK_IMAGES.map((_, index) => (
          <div
            key={index}
            className={`h-[6px] rounded-full transition-all duration-700 ${
              index === currentIndex ? "w-15  bg-white" : "w-5 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
