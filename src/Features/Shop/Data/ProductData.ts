export interface ProductType {
  _id: string;
  parent: string;
  name: string;
  slug: string;
  color: string;
  price: string;
  for: string;
  discount: string;
  images: string[];
  sizes: string[];
  stock: { size: string; stock: number }[];
}

export interface ParentType {
  _id: string;
  name: string;
  description: string;
  type: string;
  style: string;
  totalColors: {
    colorName: string;
    hex: string;
  }[];
}

export const Parent: ParentType[] = [
  {
    _id: "6686bfb1c12a3d4e5f6a0001",
    name: "Heavyweight Oversized Hoodie",
    description:
      "Crafted from 450GSM premium French terry cotton. Drop shoulder silhouette with a double-lined hood.",
    type: "Topwear",
    style: "Oversized",
    totalColors: [
      { colorName: "Pitch Black", hex: "#000000" },
      { colorName: "Off-White", hex: "#F7F5F0" },
      { colorName: "Sage Green", hex: "#708238" },
      { colorName: "Chocolate Brown", hex: "#3E2723" },
    ],
  },
  {
    _id: "6686bfb1c12a3d4e5f6a0002",
    name: "Classic Drop-Tail Tee",
    description:
      "100% combed cotton luxury basic. Features a split-hem curved drop-tail back profile.",
    type: "Topwear",
    style: "Regular Fit",
    totalColors: [
      { colorName: "Vintage Grey", hex: "#8E8E93" },
      { colorName: "Navy Blue", hex: "#0A192F" },
      { colorName: "Burgundy", hex: "#800020" },
      { colorName: "Sand Beige", hex: "#E1C699" },
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
    price: "2999",
    for: "Mens Wear",
    discount: "10",
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
  },
  {
    _id: "6686c1a2c12a3d4e5f6a0012",
    parent: "6686bfb1c12a3d4e5f6a0001",
    name: "Heavyweight Oversized Hoodie - Off-White",
    slug: "heavyweight-oversized-hoodie-off-white",
    color: "#F7F5F0",
    price: "2999",
    for: "Mens Wear",
    discount: "15",
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=600&auto=format&fit=crop&q=80",
    ],
    sizes: ["M", "L", "XL"],
    stock: [
      { size: "M", stock: 14 },
      { size: "L", stock: 22 },
      { size: "XL", stock: 0 },
    ],
  },

  {
    _id: "6686c1a2c12a3d4e5f6a0014",
    parent: "6686bfb1c12a3d4e5f6a0001",
    name: "Heavyweight Oversized Hoodie - Chocolate Brown",
    slug: "heavyweight-oversized-hoodie-chocolate-brown",
    color: "#3E2723",
    price: "2999",
    for: "Mens Wear",
    discount: "0",
    images: [
      "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80",
    ],
    sizes: ["S", "M", "L", "XL"],
    stock: [
      { size: "S", stock: 15 },
      { size: "M", stock: 15 },
      { size: "L", stock: 9 },
      { size: "XL", stock: 4 },
    ],
  },

  {
    _id: "6686c1a2c12a3d4e5f6a0023",
    parent: "6686bfb1c12a3d4e5f6a0002",
    name: "Classic Drop-Tail Tee - Burgundy",
    slug: "classic-drop-tail-tee-burgundy",
    color: "#800020",
    price: "1199",
    for: "Mens Wear",
    discount: "25",
    images: [
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1503343394128-c104d54dba01?w=600&auto=format&fit=crop&q=80",
    ],
    sizes: ["S", "M", "L", "XL"],
    stock: [
      { size: "S", stock: 10 },
      { size: "M", stock: 0 },
      { size: "L", stock: 15 },
      { size: "XL", stock: 22 },
    ],
  },
];
