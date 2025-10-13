// src/types/next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // always string
      role?: string; // ADMIN | SCHOOL_OWNER
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role?: string; // match your Prisma schema
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role?: string;
  }
}
