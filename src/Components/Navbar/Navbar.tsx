"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Home, Tag, Sparkles, ShoppingBag, Layers } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Deals", href: "/deals", icon: Tag },
    { name: "New Arrivals", href: "/new-arrivals", icon: Sparkles },
    { name: "Our Brands", href: "/brands", icon: Layers },
  ];

  const getShortName = (name: string) => {
    if (name === "Home") return "Home";
    if (name === "Deals") return "Deals";
    if (name === "New Arrivals") return "New";
    if (name === "Our Brands") return "Brands";
    return "";
  };

  return (
    <>
      {/* Desktop Header */}
      <header className="fixed top-0 left-0 w-full z-50 hidden md:grid grid-cols-3 items-center px-12 h-20 bg-white/70 backdrop-blur-md border-b border-zinc-200/60 select-none">
        {/* Left Side Links */}
        <nav className="flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs uppercase tracking-widest font-semibold transition-all duration-200 relative py-1 ${
                  isActive ? "text-primary" : "text-zinc-500 hover:text-primary"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Center Logotype — Clean Streetwear Aesthetic */}
        <div className="flex justify-center">
          <Link
            href="/"
            className="text-xl font-streethead font-extrabold tracking-tighter uppercase text-primary transition-opacity"
          >
            StrideStyle
          </Link>
        </div>

        {/* Right Side Utility Icons */}
        <div className="flex items-center justify-end gap-4">
          <Link
            href="/account"
            className="p-2 text-zinc-700 hover:text-primary hover:scale-105 transition-all duration-200"
          >
            <User className="w-5 h-5" strokeWidth={1.75} />
          </Link>
          <Link
            href="/cart"
            className="p-2 text-zinc-700 hover:text-primary hover:scale-105 transition-all duration-200 relative"
          >
            <ShoppingBag className="w-5 h-5" strokeWidth={1.75} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent animate-pulse" />
          </Link>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="fixed top-0 left-0 w-full z-40 md:hidden flex items-center justify-between px-6 h-16 bg-white/80 backdrop-blur-md border-b border-zinc-200/50">
        <Link
          href="/"
          className="text-lg font-streethead font-extrabold tracking-tighter uppercase text-primary"
        >
          StrideStyle
        </Link>

        <div className="flex items-center gap-3">
          <Link href="/account" className="p-2 text-zinc-700">
            <User className="w-[18px] h-[18px]" strokeWidth={2} />
          </Link>
          <Link href="/cart" className="p-2 text-zinc-700 relative">
            <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={2} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-accent" />
          </Link>
        </div>
      </header>

      {/* Mobile Bottom Float-Navigation (Snitch Style App-feel) */}
      <nav className="fixed bottom-6 left-6 right-6 z-50 md:hidden">
        <div className="relative bg-primary/95 rounded-2xl backdrop-blur-lg border border-white/5 shadow-xl">
          <div className="flex items-center justify-around px-2 py-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              const shortName = getShortName(link.name);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex flex-col items-center justify-center gap-1 py-1.5 rounded-xl transition-all duration-300 min-w-[60px] ${
                    isActive
                      ? "text-white"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isActive ? "scale-110 stroke-[2.5px]" : "stroke-[2px]"
                    }`}
                  />

                  {shortName && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider scale-90">
                      {shortName}
                    </span>
                  )}

                  {/* Tiny indicator bar underneath active item */}
                  {isActive && (
                    <span className="absolute -bottom-1 w-4 h-[3px] bg-white rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
