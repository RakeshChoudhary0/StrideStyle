import mongoose, { Schema, Document, Model } from "mongoose";
import "./parent.model"; // Guarantees Parent model registration

export type TSize =
  | "XS"
  | "S"
  | "M"
  | "L"
  | "XL"
  | "XXL"
  | "3XL"
  | "4XL"
  | "5XL";

export interface ISizeStock {
  size: TSize;
  stock: number;
  sku?: string; // Optional per-size SKU (e.g., ART-HD-450-BLK-M)
}

export interface IProduct extends Document {
  parent: mongoose.Types.ObjectId;

  // Variant Admin Identifiers
  variantSku: string; // Unique SKU for this color, e.g., "HD-450-BLK"
  name: string; // "Heavyweight Oversized Hoodie - Pitch Black"
  slug: string; // "heavyweight-oversized-hoodie-pitch-black"

  // Color Details
  color: string; // Hex code "#000000"
  colorName: string; // "Pitch Black"

  // Pricing
  basePrice: number;
  salePrice: number;
  discount: number; // Automatically calculated percentage

  // Media
  images: string[];

  // Inventory & Sizing
  sizes: TSize[];
  stock: ISizeStock[];

  // Logistics & Flags
  weightGrams?: number; // Helps with shipping calculators
  isFreeDelivery: boolean;
  isActive: boolean; // Draft mode for specific color variant

  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Parent",
      required: true,
      index: true,
    },
    variantSku: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    name: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    color: { type: String, required: true, trim: true },
    colorName: { type: String, required: true, trim: true },
    basePrice: { type: Number, required: true },
    salePrice: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    images: [{ type: String, required: true }],
    sizes: [{ type: String }],
    stock: [
      {
        size: {
          type: String,
          enum: ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL"],
          required: true,
        },
        stock: { type: Number, required: true, default: 0 },
        sku: { type: String, uppercase: true, trim: true },
      },
    ],

    weightGrams: { type: Number },
    isFreeDelivery: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

// Modern Mongoose pre-save middleware (No `next()` callback)
ProductSchema.pre("save", function () {
  // 1. Automatically extract available sizes from stock array
  if (this.stock && this.stock.length > 0) {
    this.sizes = this.stock.map((item) => item.size);
  }

  // 2. Automatically calculate discount percentage
  if (this.basePrice > 0 && this.salePrice < this.basePrice) {
    this.discount = Math.round(
      ((this.basePrice - this.salePrice) / this.basePrice) * 100,
    );
  } else {
    this.discount = 0;
  }
});

export const ProductModel: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
