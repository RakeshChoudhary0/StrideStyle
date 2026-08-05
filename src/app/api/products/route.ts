import connectDB from "@/Libs/db/mongo";
import { ProductModel } from "@/models/Product.Model";
import { NextRequest, NextResponse } from "next/server";
import { success } from "zod";

// =====================================================
// POST : POSTING PRODUCT
// const response = await fetch('/api/products',{
//   method:"POST",
//   headers:{
//     "Content-Type":"application/json",
//   },
//   body:data,
// })
// =====================================================

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    // 1. Basic validation
    if (!body.parentId || !body.productSlug || !body.colorName) {
      return NextResponse.json(
        { success: false, error: "Missing required product fields" },
        { status: 400 },
      );
    }

    // 2. Ensure images array is provided
    if (
      !body.images ||
      !Array.isArray(body.images) ||
      body.images.length === 0
    ) {
      return NextResponse.json(
        { success: false, error: "At least one product image is required" },
        { status: 400 },
      );
    }

    const product = await ProductModel.create(body);

    return NextResponse.json(
      {
        success: true,
        message: "Product created successfully",
        productId: product._id,
        data: product,
      },
      { status: 201 },
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("POST Product Error:", error);

    // Handle MongoDB duplicate key error
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern || {})[0] || "field";
      return NextResponse.json(
        {
          success: false,
          error: `A product with this ${field} already exists.`,
        },
        { status: 409 },
      );
    }

    if (error.name === "ValidationError") {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 422 },
      );
    }

    return NextResponse.json(
      { success: false, error: error.message || "Failed to create product" },
      { status: 500 },
    );
  }
}

// =====================================================
// GET : FETCHING Products
// const response = await fetch('/api/products',{
//   method:"GET",
//   headers:{
//     "Content-Type":"application/json",
//   }
// })
// =====================================================

export async function GET() {
  try {
    await connectDB();

    const totalActiveCount = await ProductModel.countDocuments({
      isActive: true,
    });

    if (totalActiveCount === 0) {
      return NextResponse.json({ success: true, count: 0, data: [] });
    }

    // Use requested limit if provided, otherwise fetch ALL active products dynamically
    const sampleSize = totalActiveCount;

    const products = await ProductModel.aggregate([
      { $match: { isActive: true } },
      { $sample: { size: sampleSize } },
    ]);

    return NextResponse.json({
      success: true,
      count: products.length,
      data: products,
    });

    // eslint-disable-next-line
  } catch (error: any) {
    console.error("GET Random Products Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch products" },
      { status: 500 },
    );
  }
}

// =====================================================
// PATCH : PATCH Products
// const response = await fetch(`/api/products/?id=${id}`,{
//   method:"PATCH",
//   headers:{
//     "Content-Type":"application/json",
//   },
//   body:data,
// })
// =====================================================

export async function PATCH(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing Product ID" },
        { status: 400 },
      );
    }

    const body = await req.json();

    const product = await ProductModel.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
      productId: product?._id,
      data: product,
    });
    // eslint-disable-next-line
  } catch (error: any) {
    console.error("PATCH Product Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to patch product" },
      { status: 500 },
    );
  }
}

// =====================================================
// DELETE : DELETE Products
// const response = await fetch(`/api/products/?id=${id}`,{
//   method:"DELETE",
//   headers:{
//     "Content-Type":"application/json",
//   },
// })
// =====================================================

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing Product ID" },
        { status: 400 },
      );
    }

    const product = await ProductModel.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
      productId: product?._id,
      data: product,
    });
    // eslint-disable-next-line
  } catch (error: any) {
    console.error("DELETE Product Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete product" },
      { status: 500 },
    );
  }
}
