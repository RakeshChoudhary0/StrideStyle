"use client";

import React, { useState } from "react";
import { User, Package, Heart, Settings, LogOut, Menu, X } from "lucide-react";

export type ProfileTab = "profile" | "orders" | "favorites" | "settings";

export interface SidebarItemProps {
  icon: React.ElementType; // Fixes the "type error" when passing Lucide components
  label: string;
  active?: boolean;
  onClick: () => void;
}

interface SidebarProps {
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
  onLogout: () => void;
}

const NAVIGATION_ITEMS: {
  id: ProfileTab;
  label: string;
  icon: React.ElementType;
}[] = [
  { id: "profile", label: "My Profile", icon: User },
  { id: "orders", label: "Order History", icon: Package },
  { id: "favorites", label: "Favorites", icon: Heart },
  { id: "settings", label: "Settings", icon: Settings },
];

export function Sidebar({ activeTab, onTabChange, onLogout }: SidebarProps) {
  const [isFabOpen, setIsFabOpen] = useState(false);

  const handleTabClick = (tab: ProfileTab) => {
    onTabChange(tab);
    setIsFabOpen(false);
  };

  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden md:block md:col-span-3 space-y-4">
        <div className="pb-3 border-b border-black">
          <h2 className="text-xl font-mono font-black uppercase tracking-tight text-black">
            My Account
          </h2>
        </div>

        <nav className="space-y-1">
          {NAVIGATION_ITEMS.map((item) => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              active={activeTab === item.id}
              onClick={() => handleTabClick(item.id)}
            />
          ))}
        </nav>

        <div className="pt-4 border-t border-zinc-200">
          <button
            type="button"
            onClick={onLogout}
            className="flex items-center gap-3 px-4 py-2.5 text-xs font-mono uppercase font-bold text-zinc-500 hover:text-white hover:bg-black transition-colors w-full rounded-lg cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* ================= MOBILE CIRCULAR FAB ================= */}
      <div className="md:hidden">
        {/* Backdrop Overlay */}
        {isFabOpen && (
          <div
            onClick={() => setIsFabOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 transition-opacity"
          />
        )}

        {/* Floating Action Menu Container */}
        <div className="fixed bottom-20 right-5 z-50 flex flex-col items-end gap-3">
          {isFabOpen && (
            <div className="flex flex-col items-end gap-3 animate-in slide-in-from-bottom-5 fade-in duration-200">
              {NAVIGATION_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <div key={item.id} className="flex items-center gap-2">
                    <span className="bg-black text-white text-[10px] font-mono uppercase font-bold px-2.5 py-1 rounded-md shadow-md">
                      {item.label}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleTabClick(item.id)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center border shadow-lg transition-all active:scale-95 cursor-pointer ${
                        isActive
                          ? "bg-black text-white border-black"
                          : "bg-white text-black border-zinc-200 hover:border-black"
                      }`}
                    >
                      <Icon
                        className="w-5 h-5"
                        strokeWidth={isActive ? 2.5 : 2}
                      />
                    </button>
                  </div>
                );
              })}

              <div className="flex items-center gap-2">
                <span className="bg-black text-white text-[10px] font-mono uppercase font-bold px-2.5 py-1 rounded-md shadow-md">
                  Log Out
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setIsFabOpen(false);
                    onLogout();
                  }}
                  className="w-12 h-12 rounded-full bg-white text-red-600 border border-zinc-200 shadow-lg flex items-center justify-center active:scale-95 cursor-pointer"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Main FAB Toggle Button */}
          <button
            type="button"
            onClick={() => setIsFabOpen((prev) => !prev)}
            aria-label="Toggle profile menu"
            className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center shadow-2xl border border-zinc-800 transition-transform active:scale-90 cursor-pointer"
          >
            {isFabOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
    </>
  );
}

function SidebarItem({
  icon: Icon,
  label,
  active = false,
  onClick,
}: SidebarItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-2.5 text-xs font-mono uppercase font-bold rounded-lg transition-all w-full text-left cursor-pointer border ${
        active
          ? "bg-black text-white border-black"
          : "bg-white text-zinc-600 border-transparent hover:border-black hover:text-black"
      }`}
    >
      <Icon className="w-4 h-4" strokeWidth={active ? 2.5 : 2} />
      <span>{label}</span>
    </button>
  );
}
