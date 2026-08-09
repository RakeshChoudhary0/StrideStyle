import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { tr } from "zod/locales";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
});

export const otpRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1m"),
  analytics: true,
  prefix: "ratelimit:otp",
});
