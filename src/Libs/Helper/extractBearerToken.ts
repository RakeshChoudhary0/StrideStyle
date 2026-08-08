import { NextResponse } from "next/server";

/**
 * Extracts the Bearer token from the request Authorization header.
 * Returns the token string if valid, or a NextResponse error if missing/malformed.
 */

export function extractBearerToken(req: Request): string | NextResponse {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Authorization header missing or malformed" },
      { status: 400 },
    );
  }

  return authHeader.split(" ")[1];
}
