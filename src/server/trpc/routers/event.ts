// src/server/routers/event.ts
import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const eventRouter = router({
  getAll: publicProcedure.query(() =>
    prisma.event.findMany({
      include: {
        school: true, // include related school details
      },
    })
  ),

  add: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z.string(),
        schoolId: z.number(), // link to a school
      })
    )
    .mutation(({ input }) =>
      prisma.event.create({
        data: {
          title: input.title,
          description: input.description,
          date: new Date(input.date),
          schoolId: input.schoolId,
        },
      })
    ),
});
