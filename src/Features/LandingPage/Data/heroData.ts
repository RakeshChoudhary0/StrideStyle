export const data = {
  product: {
    id: "prod_tshirt_101",
    handle: "classic-cotton-t-shirt",
    title: "Classic Organic Cotton T-Shirt",
    description:
      "Premium 100% ringspun cotton. Relaxed fit with a ribbed crew neck.",
    brand: "EcoWear",
    category: "Men > T-Shirts",
    tags: ["bestseller", "organic", "summer"],
    seo: {
      page_title: "Buy Classic Organic Cotton T-Shirt | EcoWear",
      meta_description:
        "Soft, sustainable, and stylish. Available in Red, Blue, and Black. Free shipping on orders over $50.",
    },
    images: ["", "", ""],
    price: 2000,
    sizes_available: ["S", "M", "L", "XL", "XXL"],
    color: "black",
    discount: "20",

    parent_info: {
      style: "neck",
      fit: "Relaxed",
      gender: "Men",
      type: "tshirt",
    },
    
    variants: [
      {
        variant_id: "var_red_m",
        sku: "ECO-TS-RED-M",
        color: {
          name: "Vibrant Red",
          hex: "#E03A3A",
          swatch_image: "https://cdn.store.com/swatches/red.png",
        },
        size: "M",
        price: 29.99,
        compare_at_price: 45.0,
        currency: "USD",
        stock_quantity: 45,
        is_available: true,
        weight_oz: 8.5,
        images: [
          {
            type: "front",
            url: "https://cdn.store.com/products/tshirt-red-front.jpg",
            alt: "Classic T-Shirt in Vibrant Red worn by a model",
          },
          {
            type: "back",
            url: "https://cdn.store.com/products/tshirt-red-back.jpg",
            alt: "Classic T-Shirt in Vibrant Red - Back view",
          },
          {
            type: "detail",
            url: "https://cdn.store.com/products/tshirt-red-collar.jpg",
            alt: "Close up of the ribbed crew neck in Red",
          },
        ],
      },
      {
        variant_id: "var_blue_l",
        sku: "ECO-TS-BLU-L",
        color: {
          name: "Ocean Blue",
          hex: "#2A5C8E",
          swatch_image: "https://cdn.store.com/swatches/blue.png",
        },
        size: "L",
        price: 29.99,
        compare_at_price: null,
        currency: "USD",
        stock_quantity: 12,
        is_available: true,
        weight_oz: 9.0,
        images: [
          {
            type: "front",
            url: "https://cdn.store.com/products/tshirt-blue-front.jpg",
            alt: "Classic T-Shirt in Ocean Blue",
          },
        ],
      },
      {
        variant_id: "var_black_xl",
        sku: "ECO-TS-BLK-XL",
        color: {
          name: "Jet Black",
          hex: "#1A1A1A",
          swatch_image: "https://cdn.store.com/swatches/black.png",
        },
        size: "XL",
        price: 29.99,
        compare_at_price: null,
        currency: "USD",
        stock_quantity: 0,
        is_available: false,
        weight_oz: 9.2,
        images: [
          {
            type: "front",
            url: "https://cdn.store.com/products/tshirt-black-front.jpg",
            alt: "Classic T-Shirt in Jet Black",
          },
        ],
      },
    ],

    media_gallery: {
      color_grouping: {
        red: [
          "https://cdn.store.com/products/tshirt-red-front.jpg",
          "https://cdn.store.com/products/tshirt-red-back.jpg",
          "https://cdn.store.com/products/tshirt-red-collar.jpg",
        ],
        blue: ["https://cdn.store.com/products/tshirt-blue-front.jpg"],
        black: ["https://cdn.store.com/products/tshirt-black-front.jpg"],
      },
    },
  },
};
