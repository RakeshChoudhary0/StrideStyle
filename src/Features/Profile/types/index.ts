import { LucideIcon } from "lucide-react";

export type ProfileTab = "profile" | "orders" | "favorites" | "settings";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  address: string;
  isTwoFactorEnabled: boolean;
}

export interface FavoriteItem {
  id: number;
  name: string;
  price: string;
  image: string;
}

export interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick: () => void;
}
