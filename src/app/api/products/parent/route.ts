import connectDB from "@/Libs/db/mongo";
import { ParentModel } from "@/models/parent.model";
import { NextRequest, NextResponse } from "next/server";

// =====================================================
//  POST : POSTING PARENT DATA
//   {
//     articleName: { type: String, required: true, trim: true },
//     articleCode: {
//       type: String,
//       required: true,
//       unique: true,
//       uppercase: true,
//       trim: true,
//       index: true,
//     },
//     name: { type: String, required: true, trim: true },
//     parentSlug: {
//       type: String,
//       required: true,
//       unique: true,
//       index: true,
//       trim: true,
//     },
//     categorySlug: { type: String, required: true, index: true, trim: true },
//     gender: {
//       type: String,
//       enum: ["mens", "womens", "unisex"],
//       required: true,
//       index: true,
//     },
//     type: {
//       type: String,
//       enum: ["Topwear", "Bottomwear", "Outerwear", "Accessories"],
//       required: true,
//     },
//     style: { type: String, required: true, trim: true },
//     tags: [{ type: String, index: true }],

//     description: { type: String, required: true },
//     fabric: {
//       composition: { type: String, required: true },
//       weightGSM: { type: Number },
//       weave: { type: String },
//     },
//     careInstructions: [{ type: String }],
//     features: [{ type: String }],

//     totalColors: [
//       {
//         colorName: { type: String, required: true, trim: true },
//         hex: { type: String, required: true, trim: true },
//         productSlug: { type: String, required: true, trim: true },
//         isAvailable: { type: Boolean, default: true },
//       },
//     ],

//     sizeChart: {
//       type: String,
//       trim: true,
//     },

//     isFeatured: { type: Boolean, default: false },
//     isNewArrival: { type: Boolean, default: false },
//     isActive: { type: Boolean, default: true },
//   },
// =====================================================



export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    // 2. Validate top-level required fields based on schema constraints
    const requiredFields = [
      "articleName",
      "articleCode",
      "name",
      "parentSlug",
      "categorySlug",
      "gender",
      "type",
      "style",
      "description",
    ];

    const missingFields = requiredFields.filter((field) => !body[field]);

    if (!body.fabric?.composition) {
      missingFields.push("fabric.composition");
    }

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Missing required fields: ${missingFields.join(", ")}`,
        },
        { status: 400 },
      );
    }

    // 3. Create document in MongoDB
    const parent = await ParentModel.create(body);

    return NextResponse.json(
      {
        success: true,
        message: "Parent article created successfully",
        parentId: parent._id,
        data: parent,
      },
      { status: 201 },
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("POST Parent Error:", error);

    // Handle Mongoose duplicate key errors (code 11000)
    if (error.code === 11000) {
      const field =
        Object.keys(error.keyPattern || error.keyValue || {})[0] || "field";
      return NextResponse.json(
        {
          success: false,
          error: `A parent item with this ${field} already exists.`,
        },
        { status: 409 },
      );
    }

    // Handle Mongoose Validation Error (if schema rules fail)
    if (error.name === "ValidationError") {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 422 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to create parent article",
      },
      { status: 500 },
    );
  }
}



// =====================================================
//  GET : FETCHING PARENTS
//
// const response = await fetch(`/api/products/parent?id=${parentId}`);
// const response = await fetch(`/api/products/parent?slug=${productSlug}`);
// const response = await fetch(`/api/products/parent`)
// =====================================================



export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const slug = searchParams.get("slug");

    if (id) {
      const parent = await ParentModel.findById(id);
      if (!parent) {
        return NextResponse.json(
          { success: false, error: "Parent article not found" },
          { status: 404 },
        );
      }
      return NextResponse.json({ success: true, data: parent });
    }

    if (slug) {
      const parent = await ParentModel.findOne({ parentSlug: slug });
      if (!parent) {
        return NextResponse.json(
          { success: false, error: "Parent article not found" },
          { status: 404 },
        );
      }

      return NextResponse.json({ success: true, data: parent });
    }

    // 3. Fallback: Fetch ALL products sorted by latest first
    const parents = await ParentModel.find({}).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: parents.length,
      data: parents,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("GET Parents Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch parents" },
      { status: 500 },
    );
  }
}