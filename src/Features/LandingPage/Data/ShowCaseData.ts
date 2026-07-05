export const Parent = [
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
];

export const Product = [
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
];
