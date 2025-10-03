import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const schoolRouter = router({
  getAll: publicProcedure.query(() => prisma.school.findMany()),

  add: publicProcedure
    .input(
      z.object({
        name: z.string(),
        address: z.string().optional(),
        proprietor: z.string().optional(),
      })
    )
    .mutation(({ input }) => prisma.school.create({ data: input })),
});
