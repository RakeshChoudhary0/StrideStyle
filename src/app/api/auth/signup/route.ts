import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { signAccessToken, signRefreshToken } from "@/Libs/Helper/jwt";
import { cookies } from "next/headers";
import prisma from "@/Libs/db/postgres";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, password } = await req.json();

    // 1. Basic Input Validation
    if (!name || !email || !phone || !password) {
      return NextResponse.json(
        { error: "Name, email, phone, and password are required" },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 },
      );
    }

    // 2. Check if user already exists (by email or phone)
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { phone }],
      },
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return NextResponse.json(
          { error: "User with this email already exists" },
          { status: 409 },
        );
      }
      if (existingUser.phone === phone) {
        return NextResponse.json(
          { error: "User with this phone number already exists" },
          { status: 409 },
        );
      }
    }

    // 3. Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // 4. Create new user in PostgreSQL via Prisma
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        createdAt: true,
      },
    });

    // 5. Generate JWT Tokens
    const tokenPayload = {
      userId: user.id,
      email: user.email,
    };

    const accessToken = await signAccessToken(tokenPayload);
    const refreshToken = await signRefreshToken(tokenPayload);

    // 6. Set Refresh Token in HTTP-only Cookie
    const cookieStore = await cookies();

    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    });

    // 7. Return success response with user data and access token
    return NextResponse.json(
      {
        message: "User registered successfully",
        success: true,
        data: user,
        accessToken,
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
