"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  Home,
  Sparkles,
  ShoppingBag,
  Layers,
  LucideIcon,
} from "lucide-react";

// 1. Shared Configuration Types
interface NavLinkItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

const NAV_LINKS: NavLinkItem[] = [
  { name: "Home", href: "/", icon: Home },
  { name: "Store", href: "/store", icon: ShoppingBag },
  { name: "New Arrivals", href: "/new-arrivals", icon: Sparkles },
  { name: "Our Brands", href: "/brands", icon: Layers },
];

const getShortName = (name: string) => {
  if (name === "Home") return "Home";
  if (name === "Store") return "Shop";
  if (name === "New Arrivals") return "New";
  if (name === "Our Brands") return "Brands";
  return "";
};

// ==========================================
// Main Orchestrator Component
// ==========================================
const Navbar = () => {
  const pathname = usePathname();
  const checkActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <DesktopHeader checkActive={checkActive} />
      <MobileTopHeader checkActive={checkActive} />
      <MobileBottomBar checkActive={checkActive} />
    </>
  );
};

export default Navbar;

interface HeaderProps {
  checkActive: (href: string) => boolean;
}

const DesktopHeader = ({ checkActive }: HeaderProps) => (
  <header className="fixed top-0 left-0 w-full z-50 hidden md:grid grid-cols-3 items-center px-12 h-20 bg-white/70 backdrop-blur-md border-b border-zinc-200/60 select-none">
    <nav className="flex items-center gap-6">
      {NAV_LINKS.map((link) => {
        const isActive = checkActive(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`text-xs uppercase tracking-widest font-semibold transition-all duration-200 relative py-1 ${
              isActive ? "text-zinc-900" : "text-zinc-500 hover:text-zinc-900"
            }`}
          >
            {link.name}
            {isActive && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-zinc-900 rounded-full" />
            )}
          </Link>
        );
      })}
    </nav>

    <div className="flex justify-center">
      <Link
        href="/"
        className="text-xl font-streethead font-extrabold tracking-tighter uppercase text-zinc-900"
      >
        StrideStyle
      </Link>
    </div>

    <div className="flex items-center justify-end gap-4">
      <Link
        href="/account"
        className={`p-2 transition-all duration-200 hover:scale-105 ${checkActive("/account") ? "text-zinc-900" : "text-zinc-700 hover:text-zinc-900"}`}
      >
        <User className="w-5 h-5" strokeWidth={1.75} />
      </Link>
      <Link
        href="/cart"
        className={`p-2 transition-all duration-200 relative hover:scale-105 ${checkActive("/cart") ? "text-zinc-900" : "text-zinc-700 hover:text-zinc-900"}`}
      >
        <ShoppingBag className="w-5 h-5" strokeWidth={1.75} />
        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-zinc-900" />
      </Link>
    </div>
  </header>
);

const MobileTopHeader = ({ checkActive }: HeaderProps) => (
  /* 
    Stripped full width panel wrapper to create a transparent layout pocket.
    Positioned at top right using a slight inset layout alignment.
  */
  <div className="fixed top-2 right-4 z-50 md:hidden flex items-center gap-1 select-none pointer-events-auto">
    <Link
      href="/account"
      className={`p-4 rounded-full transition-all duration-200 active:scale-95 ${
        checkActive("/account")
          ? "text-zinc-900 bg-zinc-100"
          : "text-zinc-700 hover:text-zinc-900 bg-white/40 backdrop-blur-sm border border-zinc-200/40 shadow-sm"
      }`}
    >
      <User
        className="w-[18px] h-[18px]"
        strokeWidth={checkActive("/account") ? 2.5 : 1.75}
      />
    </Link>

    <Link
      href="/cart"
      className={`p-4 rounded-full transition-all duration-200 relative active:scale-95 ${
        checkActive("/cart")
          ? "text-zinc-900 bg-zinc-100"
          : "text-zinc-700 hover:text-zinc-900 bg-white/40 backdrop-blur-sm border border-zinc-200/40 shadow-sm"
      }`}
    >
      <ShoppingBag
        className="w-[18px] h-[18px]"
        strokeWidth={checkActive("/cart") ? 2.5 : 1.75}
      />
      <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-zinc-900 animate-pulse" />
    </Link>
  </div>
);

const MobileBottomBar = ({ checkActive }: HeaderProps) => (
  <nav className="fixed bottom-0 left-0 w-full z-40 md:hidden bg-white border-t border-zinc-200/50 pb-[max(env(safe-area-inset-bottom),14px)] pt-2 select-none">
    <div className="flex items-center justify-around h-14 px-2">
      {NAV_LINKS.map((link) => {
        const isActive = checkActive(link.href);
        const Icon = link.icon;
        const shortName = getShortName(link.name);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`relative flex flex-col items-center justify-center gap-0.5 h-full min-w-[64px] transition-all duration-200 ${
              isActive ? "text-zinc-900 scale-105" : "text-zinc-400"
            }`}
          >
            <Icon
              className="w-[18px] h-[18px] transition-all duration-200"
              strokeWidth={isActive ? 2.5 : 1.75}
            />
            {shortName && (
              <span
                className={`text-[10px] uppercase tracking-wider transition-all duration-200 ${isActive ? "font-bold" : "font-medium scale-95"}`}
              >
                {shortName}
              </span>
            )}
            {isActive && (
              <span className="absolute top-0 left-1/4 w-1/2 h-[2px] bg-zinc-900 rounded-full" />
            )}
          </Link>
        );
      })}
    </div>
  </nav>
);
