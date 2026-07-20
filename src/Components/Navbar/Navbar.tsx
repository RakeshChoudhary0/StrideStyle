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
  const checkActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <DesktopHeader checkActive={checkActive} />
      <MobileBottomBar checkActive={checkActive} />
    </>
  );
};

export default Navbar;

interface HeaderProps {
  checkActive: (href: string) => boolean;
}

const DesktopHeader = ({ checkActive }: HeaderProps) => (
  <header className="fixed top-0 left-0 w-full z-50 hidden md:grid grid-cols-3 items-center px-12 h-24 select-none pointer-events-none">
    <div className="flex justify-start pointer-events-auto">
      <Link
        href="/"
        className="text-xl font-streethead font-extrabold tracking-tighter uppercase text-zinc-900"
      >
        Stride Style
      </Link>
    </div>

    {/* Middle Section: Links with Floating White Glass Capsule */}
    <div className="flex justify-center w-full pointer-events-auto">
      <nav className="flex items-center gap-2 px-6 py-5 rounded-full bg-white/10 backdrop-blur-md border border-zinc-200 shadow-[0_8px_32px_0_rgba(0,0,0,0.04)]">
        {DESKTOP_LINKS.map((link) => {
          const isActive = checkActive(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs uppercase tracking-widest font-semibold transition-all duration-200 relative py-1 px-2 ${
                isActive ? "text-zinc-900" : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              {link.name}
              {isActive && (
                <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-zinc-900 rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>

    {/* Account Section: Cart and User Profile */}
    <div className="flex items-center justify-end gap-4 pointer-events-auto">
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

const MobileBottomBar = ({ checkActive }: HeaderProps) => (
  <nav className="fixed bottom-0 left-0 w-full z-40 md:hidden bg-white border-t border-zinc-200/50 pb-[max(env(safe-area-inset-bottom),14px)] pt-2 select-none">
    <div className="flex items-center justify-around h-14 px-2">
      {MOBILE_LINKS.map((link) => {
        const isActive = checkActive(link.href);
        const Icon = link.icon;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`relative flex flex-col items-center justify-center gap-0.5 h-full min-w-[64px] transition-all duration-200 ${
              isActive ? "text-zinc-900 scale-105" : "text-zinc-400"
            }`}
          >
            {link.shortName === "Cart" ? (
              <div className="relative">
                <Icon
                  className="w-[18px] h-[18px] transition-all duration-200"
                  strokeWidth={isActive ? 2.5 : 1.75}
                />
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-zinc-900 animate-pulse" />
              </div>
            ) : (
              <Icon
                className="w-[18px] h-[18px] transition-all duration-200"
                strokeWidth={isActive ? 2.5 : 1.75}
              />
            )}

            <span
              className={`text-[10px] uppercase tracking-wider transition-all duration-200 ${
                isActive ? "font-bold text-zinc-900" : "font-medium scale-95"
              }`}
            >
              {link.shortName}
            </span>

            {isActive && (
              <span className="absolute top-0 left-1/4 w-1/2 h-[2px] bg-zinc-900 rounded-full" />
            )}
          </Link>
        );
      })}
    </div>
  </nav>
);
