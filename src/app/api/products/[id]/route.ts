import connectDB from "@/Libs/db/mongo";
import { ProductModel } from "@/models/Product.Model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";


// =====================================================
//  GET: GET PRODUCT BY ID (Dynamic Route Segment)
//  URL: /api/products/65a123456789...
// =====================================================

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    // 3. Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid Product ID format" },
        { status: 400 },
      );
    }

    // 4. Fetch Product
    const product = await ProductModel.findById(id);

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: product });

    // eslint-disable-next-line
  } catch (error: any) {
    console.error("GET Product Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch product" },
      { status: 500 },
    );
  }
}
