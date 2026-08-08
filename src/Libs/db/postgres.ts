import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient;
};

// 1. Create pg Pool instance using process.env.DIRECT_URL
const pool = new Pool({
  connectionString: process.env.DIRECT_URL,
});

// 2. Pass the pool instance into PrismaPg
const adapter = new PrismaPg(pool);

// 3. Instantiate PrismaClient with driver adapter
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
