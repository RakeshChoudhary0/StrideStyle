export interface CategoryCardType {
  id: string;
  title: string;
  categorySlug: string; // Dynamic path param used for subfolder matching
  gender: "mens" | "womens" | "unisex";
  type: "Topwear" | "Bottomwear" | "Footwear" | "Accessories";
  style: string;
  count: string;
  linkUrl: string; // Clean SEO routing path
  imgUrl: string;
}

export const categories: CategoryCardType[] = [
  {
    id: "heavyweight-tees",
    title: "Heavyweight Tees",
    categorySlug: "tshirts",
    gender: "mens",
    type: "Topwear",
    style: "Regular Fit",
    count: "18 Items",
    linkUrl: "/shop/tshirts",
    imgUrl:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "trackpants-cargos",
    title: "Trackpants & Cargos",
    categorySlug: "pants",
    gender: "mens",
    type: "Bottomwear",
    style: "Cargo",
    count: "12 Items",
    linkUrl: "/shop/pants",
    imgUrl:
      "https://images.unsplash.com/photo-1551854838-212c50b4c184?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "graphic-drops",
    title: "Graphic Drops",
    categorySlug: "graphic-tees",
    gender: "unisex",
    type: "Topwear",
    style: "Graphic",
    count: "24 Items",
    linkUrl: "/shop/graphic-tees",
    imgUrl:
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "outerwear-hoodies",
    title: "Hoodies & Jackets",
    categorySlug: "hoodies",
    gender: "mens",
    type: "Topwear",
    style: "Oversized",
    count: "9 Items",
    linkUrl: "/shop/hoodies",
    imgUrl:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop&q=80",
  },
];
