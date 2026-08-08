import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/Libs/db/postgres";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "@/Libs/Helper/jwt";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { error: "No refresh token provided" },
        { status: 401 },
      );
    }

    // 1. Verify token signature & expiration
    const payload = await verifyRefreshToken(refreshToken);
    if (!payload || !payload.userId) {
      return NextResponse.json(
        { error: "Invalid or expired refresh token" },
        { status: 401 },
      );
    }

    // 2. Fetch fresh user data from DB (handles banned/deleted users or updated emails)
    const user = await prisma.user.findUnique({
      where: { id: payload.userId as string },
      select: { id: true, email: true },
    });

    if (!user) {
      // User was deleted or doesn't exist anymore -> clear cookie
      cookieStore.delete("refreshToken");
      return NextResponse.json(
        { error: "User no longer exists" },
        { status: 401 },
      );
    }

    const tokenPayload = {
      userId: user.id,
      email: user.email,
    };

    // 3. Issue new tokens
    const newAccessToken = await signAccessToken(tokenPayload);
    const newRefreshToken = await signRefreshToken(tokenPayload);

    // 4. Update the HTTP-only cookie
    cookieStore.set("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      path: "/",
    });

    return NextResponse.json({
      success: true,
      accessToken: newAccessToken,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to refresh token";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
