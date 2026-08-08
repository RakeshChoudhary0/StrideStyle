import { NextRequest, NextResponse } from "next/server";
import prisma from "@/Libs/db/postgres";
import { verifyAccessToken } from "@/Libs/Helper/jwt";
import { extractBearerToken } from "@/Libs/Helper/extractBearerToken";
// Adjust path to your helper file

export async function GET(req: NextRequest) {
  try {
    // 1. Extract Bearer token from headers
    const tokenOrError = extractBearerToken(req);
    if (tokenOrError instanceof NextResponse) {
      return tokenOrError; // Returns 400 error response if header is missing/malformed
    }

    const accessToken = tokenOrError;

    // 2. Verify Access Token signature and expiration
    const payload = await verifyAccessToken(accessToken);
    if (!payload || !payload.userId) {
      return NextResponse.json(
        { error: "Invalid or expired access token" },
        { status: 401 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId as string },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 4. Return user profile
    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
