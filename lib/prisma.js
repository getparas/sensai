import { PrismaClient } from "@prisma/client";

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}

// globalThis.prisma: Leveraging a global variable to persist the Prisma Client instance across hot reloads in development.
// This prevents the instantiation of multiple Prisma clients—which could otherwise lead to connection exhaustion and
// unpredictable behavior with the database. In production, a new instance is created per run to maintain statelessness.
