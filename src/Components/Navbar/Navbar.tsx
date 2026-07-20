"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  Home,
  Sparkles,
  ShoppingBag,
  Layers,
  Percent,
  Search,
  LucideIcon,
} from "lucide-react";

interface NavLinkItem {
  name: string;
  href: string;
  icon: LucideIcon;
  shortName: string;
}

const DESKTOP_LINKS: NavLinkItem[] = [
  { name: "Shop All", href: "/shop", icon: ShoppingBag, shortName: "Shop" },
  {
    name: "New Arrivals",
    href: "/new-arrivals",
    icon: Sparkles,
    shortName: "New",
  },
  { name: "Sale & Deals", href: "/sale", icon: Percent, shortName: "Sale" },
  { name: "Our Brands", href: "/brands", icon: Layers, shortName: "Brands" },
];

const MOBILE_LINKS: NavLinkItem[] = [
  { name: "Home", href: "/", icon: Home, shortName: "Home" },
  { name: "Shop", href: "/shop", icon: Search, shortName: "Shop" },
  { name: "Cart", href: "/cart", icon: ShoppingBag, shortName: "Cart" },
  { name: "Profile", href: "/account", icon: User, shortName: "Profile" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const checkActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <DesktopHeader checkActive={checkActive} isScrolled={isScrolled} />
      <MobileBottomBar checkActive={checkActive} />
    </>
  );
};

export default Navbar;

interface HeaderProps {
  checkActive: (href: string) => boolean;
  isScrolled?: boolean;
}

const DesktopHeader = ({ checkActive, isScrolled }: HeaderProps) => (
  <header
    className={`fixed top-0 left-0 w-full z-50 hidden md:flex items-center justify-between px-6 lg:px-12 h-20 select-none transition-all duration-300 antialiased ${
      isScrolled
        ? "bg-white/90 backdrop-blur-md border-b border-zinc-100 shadow-[0_2px_20px_rgba(0,0,0,0.01)]"
        : "bg-transparent"
    }`}
  >
    {/* Left Logo - Fixed dimension footprint prevents squishing */}
    <div className="shrink-0 min-w-[140px]">
      <Link
        href="/"
        className="text-lg lg:text-xl font-streethead font-black tracking-tight uppercase text-zinc-950"
      >
        Stride Style
      </Link>
    </div>

    {/* Middle Section Navigation Capsule - Keeps items stable across all screens */}
    <div className="grow flex justify-center px-4 max-w-2xl mx-auto">
      <nav className="flex items-center gap-1 p-1.5 rounded-full border border-zinc-200/60 bg-white/80 shadow-xs backdrop-blur-xs">
        {DESKTOP_LINKS.map((link) => {
          const isActive = checkActive(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[11px] lg:text-xs uppercase tracking-wider font-bold transition-all duration-200 rounded-full px-4 py-2 whitespace-nowrap ${
                isActive
                  ? "bg-zinc-950 text-white shadow-sm"
                  : "text-zinc-500 hover:text-zinc-950 hover:bg-zinc-50"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>
    </div>

    {/* Account Section: Cart and User Profile */}
    <div className="flex items-center justify-end gap-1.5 shrink-0 min-w-[140px]">
      <Link
        href="/account"
        className={`p-2.5 rounded-full transition-all duration-200 ${
          checkActive("/account")
            ? "text-zinc-950 bg-zinc-100"
            : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50"
        }`}
      >
        <User className="w-[18px] h-[18px]" strokeWidth={2} />
      </Link>
      <Link
        href="/cart"
        className={`p-2.5 rounded-full relative transition-all duration-200 ${
          checkActive("/cart")
            ? "text-zinc-950 bg-zinc-100"
            : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50"
        }`}
      >
        <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={2} />
        <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-zinc-950" />
      </Link>
    </div>
  </header>
);

const MobileBottomBar = ({ checkActive }: Omit<HeaderProps, "isScrolled">) => (
  <nav className="fixed bottom-0 left-0 w-full z-50 md:hidden bg-white/95 backdrop-blur-md border-t border-zinc-100 pb-[max(env(safe-area-inset-bottom),12px)] pt-2 select-none antialiased shadow-[0_-4px_24px_rgba(0,0,0,0.02)]">
    <div className="flex items-center justify-around h-12 px-4">
      {MOBILE_LINKS.map((link) => {
        const isActive = checkActive(link.href);
        const Icon = link.icon;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`relative flex flex-col items-center justify-center gap-1 h-full min-w-[56px] transition-colors ${
              isActive ? "text-zinc-950" : "text-zinc-400 active:text-zinc-600"
            }`}
          >
            <div className="relative">
              <Icon
                className="w-[19px] h-[19px]"
                strokeWidth={isActive ? 2.5 : 2}
              />
              {link.shortName === "Cart" && (
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-zinc-950" />
              )}
            </div>

            <span
              className={`text-[9px] uppercase tracking-widest font-bold transition-all ${
                isActive ? "opacity-100 scale-100" : "opacity-80 scale-95"
              }`}
            >
              {link.shortName}
            </span>
          </Link>
        );
      })}
    </div>
  </nav>
);
