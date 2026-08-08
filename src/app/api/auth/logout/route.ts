import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("refreshToken");

    return NextResponse.json({ message: "Logged out successfully" });
    // eslint-disable-next-line
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to log out" },
      { status: 500 },
    );
  }
}
