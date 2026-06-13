"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag, User } from "lucide-react";

const NAV_LINKS = [
  { label: "Our Brands", href: "/brands" },
  { label: "New Arrival", href: "/arrivals" },
  { label: "Our Story", href: "/story" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState<string>("Home");

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className="bg-surface sticky top-0 z-50 border-b border-outline-variant/30 backdrop-blur-md ">
      <nav className="flex justify-between items-center px-4 md:px-16 py-4 md:py-5 w-full max-w-[1440px] mx-auto">
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden p-2 -ml-2 text-text-main hover:text-secondary rounded-lg"
          aria-label="Open Menu"
          aria-expanded={isOpen}
        >
          <Menu className="w-6 h-6 stroke-[1.5]" />
        </button>

        <Link
          href="/"
          onClick={() => setActive("")}
          className="text-xl md:text-2xl font-bold tracking-tighter text-secondary select-none"
        >
          STRIDE STYLE
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              onClick={() => setActive(link.label)}
              key={link.href}
              className={`text-sm font-medium text-text-muted hover:text-secondary transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-secondary hover:after:w-full after:transition-all after:duration-300 ${active == link.label ? `text-secondary after:bg-secondary after:w-full` : ``}  `}
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3 md:gap-5 text-secondary">
          <Link
            href="/cart"
            className="hover:opacity-80 p-2 -mr-1 relative"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 md:w-[22px] md:h-[22px] stroke-[1.5]" />
          </Link>
          <Link
            href="/account"
            className="hover:opacity-80 p-2"
            aria-label="User Account"
          >
            <User className="w-5 h-5 md:w-[22px] md:h-[22px] stroke-[1.5]" />
          </Link>
        </div>
      </nav>

      {/* mibile View */}

      <div
        className={`absolute top-0 left-0 h-screen inset-0 z-50 bg-surface-dim/90 backdrop-blur-3xl p-6 flex flex-col transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex justify-between  items-center mb-12">
          <span className="text-xl font-bold  tracking-tighter text-secondary">
            STRIDE STYLE
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 -mr-2 "
            aria-label="Close Menu"
          >
            <X className="w-6 h-6 stroke-[1.5]" />
          </button>
        </div>

        <div className="flex flex-col gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              onClick={() => setIsOpen(false)}
              className="text-xl font-normal tracking-tight  hover:text-secondary transition-colors"
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
