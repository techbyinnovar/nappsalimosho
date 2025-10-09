// src/server/trpc/context.ts
import { authOptions } from "@/src/lib/auth";
import { prisma } from "../prisma";
import { getServerSession } from "next-auth";

export async function createContext() {
  // In App Router, just call getServerSession without req/res
  const session = await getServerSession(authOptions);
  return {
    prisma,
    session,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
