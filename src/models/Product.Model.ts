import mongoose, { Schema, Document, Model } from "mongoose";
import "./parent.model"; // Guarantees Parent model registration

export interface ISizeStock {
  size: "XS" | "S" | "M" | "L" | "XL" | "XXL" | "3XL";
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
  discount: number; // Automatically calculated or manually set percentage

  // Media
  images: string[];
  sizeChartUrl?: string; // Size guide image URL

  // Inventory & Sizing
  sizes: string[];
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
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },

    color: { type: String, required: true },
    colorName: { type: String, required: true },

    basePrice: { type: Number, required: true },
    salePrice: { type: Number, required: true },
    discount: { type: Number, default: 0 },

    images: [{ type: String, required: true }],
    sizeChartUrl: { type: String },

    sizes: [{ type: String, required: true }],
    stock: [
      {
        size: {
          type: String,
          enum: ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL"],
          required: true,
        },
        stock: { type: Number, required: true, default: 0 },
        sku: { type: String, uppercase: true },
      },
    ],

    weightGrams: { type: Number },
    isFreeDelivery: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

// Pre-save middleware to calculate discount percentage dynamically

ProductSchema.pre("save", function () {
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
