export interface ParentType {
  _id: string;
  name: string;
  description: string;
  parentSlug: string;
  categorySlug: string;
  gender: "mens" | "womens" | "unisex";
  type: "Topwear" | "Bottomwear";
  style: string;
  totalColors: {
    colorName: string;
    hex: string;
    productSlug: string;
  }[];
  isFeatured: boolean;
  createdAt: Date;
}

export interface ProductType {
  _id: string;
  parent: string;
  name: string;
  slug: string;
  color: string;
  colorName: string;
  basePrice: number;
  salePrice: number;
  discount: number;
  images: string[];
  sizes: string[];
  stock: {
    size: string;
    stock: number;
  }[];
  isFreeDelivery: boolean;
}

export const Parent: ParentType[] = [
  {
    _id: "6686bfb1c12a3d4e5f6a0001",
    name: "Heavyweight Oversized Hoodie",
    description:
      "Crafted from 450GSM premium French terry cotton. Drop shoulder silhouette with a double-lined hood.",
    parentSlug: "heavyweight-oversized-hoodie",
    categorySlug: "hoodies",
    gender: "mens",
    type: "Topwear",
    style: "Oversized",
    isFeatured: true,
    createdAt: new Date("2026-01-15"),
    totalColors: [
      {
        colorName: "Pitch Black",
        hex: "#000000",
        productSlug: "heavyweight-oversized-hoodie-pitch-black",
      },
      {
        colorName: "Off-White",
        hex: "#F7F5F0",
        productSlug: "heavyweight-oversized-hoodie-off-white",
      },
      {
        colorName: "Chocolate Brown",
        hex: "#3E2723",
        productSlug: "heavyweight-oversized-hoodie-chocolate-brown",
      },
    ],
  },
  {
    _id: "6686bfb1c12a3d4e5f6a0002",
    name: "Classic Drop-Tail Tee",
    description:
      "100% combed cotton luxury basic. Features a split-hem curved drop-tail back profile.",
    parentSlug: "classic-drop-tail-tee",
    categorySlug: "tshirts",
    gender: "mens",
    type: "Topwear",
    style: "Regular Fit",
    isFeatured: false,
    createdAt: new Date("2026-02-10"),
    totalColors: [
      {
        colorName: "Vintage Grey",
        hex: "#8E8E93",
        productSlug: "classic-drop-tail-tee-vintage-grey",
      },
      {
        colorName: "Navy Blue",
        hex: "#0A192F",
        productSlug: "classic-drop-tail-tee-navy-blue",
      },
      {
        colorName: "Burgundy",
        hex: "#800020",
        productSlug: "classic-drop-tail-tee-burgundy",
      },
    ],
  },
];

export const Product: ProductType[] = [
  {
    _id: "6686c1a2c12a3d4e5f6a0011",
    parent: "6686bfb1c12a3d4e5f6a0001",
    name: "Heavyweight Oversized Hoodie - Pitch Black",
    slug: "heavyweight-oversized-hoodie-pitch-black",
    color: "#000000",
    colorName: "Pitch Black",
    basePrice: 2999,
    salePrice: 2699,
    discount: 10,
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1511105612320-2e62a04dd044?w=600&auto=format&fit=crop&q=80",
    ],
    sizes: ["S", "M", "L", "XL"],
    stock: [
      { size: "S", stock: 12 },
      { size: "M", stock: 25 },
      { size: "L", stock: 18 },
      { size: "XL", stock: 5 },
    ],
    isFreeDelivery: true,
  },
  {
    _id: "6686c1a2c12a3d4e5f6a0012",
    parent: "6686bfb1c12a3d4e5f6a0001",
    name: "Heavyweight Oversized Hoodie - Off-White",
    slug: "heavyweight-oversized-hoodie-off-white",
    color: "#F7F5F0",
    colorName: "Off-White",
    basePrice: 2999,
    salePrice: 2549,
    discount: 15,
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop&q=80",
    ],
    sizes: ["S", "M", "L"],
    stock: [
      { size: "S", stock: 8 },
      { size: "M", stock: 14 },
      { size: "L", stock: 22 },
    ],
    isFreeDelivery: false,
  },
  {
    _id: "6686c1a2c12a3d4e5f6a0014",
    parent: "6686bfb1c12a3d4e5f6a0001",
    name: "Heavyweight Oversized Hoodie - Chocolate Brown",
    slug: "heavyweight-oversized-hoodie-chocolate-brown",
    color: "#3E2723",
    colorName: "Chocolate Brown",
    basePrice: 2999,
    salePrice: 2999,
    discount: 0,
    images: [
      "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?w=600&auto=format&fit=crop&q=80",
    ],
    sizes: ["S", "M", "L", "XL"],
    stock: [
      { size: "S", stock: 15 },
      { size: "M", stock: 15 },
      { size: "L", stock: 9 },
      { size: "XL", stock: 4 },
    ],
    isFreeDelivery: true,
  },

  {
    _id: "6686c1a2c12a3d4e5f6a0021",
    parent: "6686bfb1c12a3d4e5f6a0002",
    name: "Classic Drop-Tail Tee - Vintage Grey",
    slug: "classic-drop-tail-tee-vintage-grey",
    color: "#8E8E93",
    colorName: "Vintage Grey",
    basePrice: 1199,
    salePrice: 1139,
    discount: 5,
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80",
    ],
    sizes: ["S", "M", "L", "XL"],
    stock: [
      { size: "S", stock: 20 },
      { size: "M", stock: 40 },
      { size: "L", stock: 35 },
      { size: "XL", stock: 12 },
    ],
    isFreeDelivery: false,
  },
  {
    _id: "6686c1a2c12a3d4e5f6a0022",
    parent: "6686bfb1c12a3d4e5f6a0002",
    name: "Classic Drop-Tail Tee - Navy Blue",
    slug: "classic-drop-tail-tee-navy-blue",
    color: "#0A192F",
    colorName: "Navy Blue",
    basePrice: 1199,
    salePrice: 1199,
    discount: 0,
    images: [
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&auto=format&fit=crop&q=80",
    ],
    sizes: ["M", "L", "XL"],
    stock: [
      { size: "M", stock: 19 },
      { size: "L", stock: 3 },
      { size: "XL", stock: 8 },
    ],
    isFreeDelivery: true,
  },
  {
    _id: "6686c1a2c12a3d4e5f6a0023",
    parent: "6686bfb1c12a3d4e5f6a0002",
    name: "Classic Drop-Tail Tee - Burgundy",
    slug: "classic-drop-tail-tee-burgundy",
    color: "#800020",
    colorName: "Burgundy",
    basePrice: 1199,
    salePrice: 899,
    discount: 25,
    images: [
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&auto=format&fit=crop&q=80",
    ],
    sizes: ["S", "L", "XL"],
    stock: [
      { size: "S", stock: 10 },
      { size: "L", stock: 15 },
      { size: "XL", stock: 22 },
    ],
    isFreeDelivery: true,
  },
];
