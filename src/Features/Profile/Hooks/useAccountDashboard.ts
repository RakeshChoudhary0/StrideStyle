"use client";

import { useState } from "react";
import { ProfileTab, FavoriteItem, UserProfile } from "../types";

export function useAccountDashboard() {
  const [activeTab, setActiveTab] = useState<ProfileTab>("profile");

  const [user] = useState<UserProfile>({
    id: "user_101",
    name: "Julian Aethelgard",
    email: "julian.a@design.studio",
    address: "42 Minimalist Way, Suite 101, Copenhagen, Denmark 2100",
    isTwoFactorEnabled: true,
  });

  const [favorites, setFavorites] = useState<FavoriteItem[]>([
    {
      id: 1,
      name: "Heavy-Weight Cotton Tee",
      price: "₹1,199",
      image:
        "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=300&auto=format&fit=crop&q=80",
    },
    {
      id: 2,
      name: "Tailored Essential Joggers",
      price: "₹2,499",
      image:
        "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=300&auto=format&fit=crop&q=80",
    },
  ]);

  const handleRemoveFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  const handleLogout = async () => {
    // Perform auth session invalidation here
    console.log("Logging out user...");
  };

  return {
    activeTab,
    setActiveTab,
    user,
    favorites,
    handleRemoveFavorite,
    handleLogout,
  };
}
