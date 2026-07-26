"use client";

import React from "react";

import {
  useAccountDashboard,
  ProfileSection,
  OrdersSection,
  FavoritesSection,
  SettingsSection,
} from "@/Features/Profile";
import { Sidebar } from "@/Features/Profile/Components/Sidebar";

export default function ProfilePage() {
  const {
    activeTab,
    setActiveTab,
    user,
    favorites,
    handleRemoveFavorite,
    handleLogout,
  } = useAccountDashboard();

  return (
    <div className=" bg-white text-zinc-950 font-sans antialiased">
      {/* Main Content Container with Proper Spacing Offsets */}
      <main className="max-w-6xl mx-auto px-4 sm:px-4 md:px-8 md:pt-24 md:pt-28 pb-28 md:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
          {/* Navigation Sidebar */}
          <Sidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onLogout={handleLogout}
          />

          {/* Active Tab Content Section */}
          <div className="md:col-span-9 w-full">
            {activeTab === "profile" && <ProfileSection user={user} />}
            {activeTab === "orders" && <OrdersSection />}
            {activeTab === "favorites" && (
              <FavoritesSection
                items={favorites}
                onRemove={handleRemoveFavorite}
              />
            )}
            {activeTab === "settings" && <SettingsSection />}
          </div>
        </div>
      </main>
    </div>
  );
}
