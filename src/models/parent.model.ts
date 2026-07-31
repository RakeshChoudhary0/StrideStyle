import mongoose, { Schema, Document, Model } from "mongoose";

export interface IParentColor {
  colorName: string;
  hex: string;
  productSlug: string;
  isAvailable?: boolean;
}

export interface IFabricDetail {
  composition: string; // e.g., "100% French Terry Cotton"
  weightGSM?: number; // e.g., 450
  weave?: string; // e.g., "Knit", "Loopback"
}

export interface IParent extends Document {
  // Admin & Identifiers
  articleName: string; // Admin name, e.g., "Heavyweight Hooded Sweatshirt V2"
  articleCode: string; // Unique Article ID, e.g., "ART-HD-450"
  name: string; // Customer-facing name, e.g., "Heavyweight Oversized Hoodie"
  parentSlug: string;

  // Categorization
  categorySlug: string;
  gender: "mens" | "womens" | "unisex";
  type: "Topwear" | "Bottomwear" | "Outerwear" | "Accessories";
  style: string; // e.g., "Oversized", "Boxy Fit", "Slim Fit"
  tags: string[]; // For search filters: ["hoodie", "winter", "streetwear"]

  // Apparel Specifications
  description: string;
  fabric: IFabricDetail;
  careInstructions: string[];  // e.g., ["Machine wash cold", "Do not tumble dry"]
  features: string[];  // e.g., ["Drop shoulder", "Double-lined hood", "Ribbed cuffs"]

  // Variants & Marketing Flags
  totalColors: IParentColor[];
  isFeatured: boolean;
  isNewArrival: boolean;
  isActive: boolean; // Admin toggle to show/hide entire style

  createdAt: Date;
  updatedAt: Date;
}

const ParentSchema = new Schema<IParent>(
  {
    articleName: { type: String, required: true, trim: true },
    articleCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    name: { type: String, required: true, trim: true },
    parentSlug: { type: String, required: true, unique: true, index: true },
    categorySlug: { type: String, required: true, index: true },
    gender: {
      type: String,
      enum: ["mens", "womens", "unisex"],
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["Topwear", "Bottomwear", "Outerwear", "Accessories"],
      required: true,
    },
    style: { type: String, required: true },
    tags: [{ type: String, index: true }],

    description: { type: String, required: true },
    fabric: {
      composition: { type: String, required: true },
      weightGSM: { type: Number },
      weave: { type: String },
    },
    careInstructions: [{ type: String }],
    features: [{ type: String }],

    totalColors: [
      {
        colorName: { type: String, required: true },
        hex: { type: String, required: true },
        productSlug: { type: String, required: true },
        isAvailable: { type: Boolean, default: true },
      },
    ],

    isFeatured: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

// Indexes for super-fast search queries
ParentSchema.index({ name: "text", articleName: "text", tags: "text" });

export const ParentModel: Model<IParent> =
  mongoose.models.Parent || mongoose.model<IParent>("Parent", ParentSchema);
