import { otpRateLimiter, redis } from "@/Libs/db/redis";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { mobile } = await req.json();
    if (!mobile) return NextResponse.json({ error: "Mobile no is Required" });
    const { success } = await otpRateLimiter.limit(mobile);
    if (!success) {
      return NextResponse.json(
        { error: "Too many requests Please Try again Later" },
        { status: 429 },
      );
    }
    const generateOtp = Math.floor(100000 + Math.random() * 900000).toString();
    await redis.set(`otp:${mobile}`, generateOtp, { ex: 60 * 5 });

    // MESSAGING HANDLE TODO:

    
    return NextResponse.json({
      message: "OTP sent successfully",
      success: true,
    });

    // eslint-disable-next-line
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
