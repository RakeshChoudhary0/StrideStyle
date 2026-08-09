import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/Libs/db/postgres";
import { signAccessToken, signRefreshToken } from "@/Libs/Helper/jwt";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  // Fix 1: Change NextResponse to Request
  try {
    const { email, password } = await req.json();

    // Basic Input Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      // Prisma models are usually lowercase e.g., prisma.user
      where: { email },
    });

    // Fix 3: Unified security error message (Prevents user enumeration)
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    if (!user.isVerified) {
      return NextResponse.json(
        { error: "User is not verified" },
        { status: 401 },
      );
    }

    // Generate JWT Tokens
    const tokenPayload = {
      userId: user.id,
      email: user.email,
    };

    const accessToken = await signAccessToken(tokenPayload);
    const refreshToken = await signRefreshToken(tokenPayload);

    const cookieStore = await cookies();

    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({
      message: "Logged in successfully",
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
      },
      accessToken,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
