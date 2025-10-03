import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const memberRouter = router({
  getAll: publicProcedure.query(() => prisma.member.findMany()),

  add: publicProcedure
    .input(
      z.object({
        name: z.string(),
        role: z.string(),
        email: z.string().email(),
        schoolId: z.number().optional(),
      })
    )
    .mutation(({ input }) => prisma.member.create({ data: input })),
});
