// src/server/trpc/routers/school.ts
import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const schoolRouter = router({
  // 🟢 Fetch all schools (Admin use only)
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user?.id;
    if (!userId) throw new Error("Unauthorized");

    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      select: { role: true },
    });

    if (user?.role !== "ADMIN") {
      throw new Error("Access denied");
    }

    return prisma.school.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        owner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
          },
        },
      },
    });
  }),

  // 🟣 Fetch schools owned by a logged-in user
  getByOwner: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user?.id;
    if (!userId) throw new Error("Unauthorized");

    return prisma.school.findMany({
      where: { ownerId: Number(userId) },
      orderBy: { createdAt: "desc" },
      include: {
        owner: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
  }),

  // 🟩 Add a new school
  add: protectedProcedure
    .input(
      z.object({
        schoolName: z.string(),
        schoolAddress: z.string(),
        portfolio: z.string(),
        zone: z.string(),
        email: z.string().optional(),
        phone: z.string().optional(),
        website: z.string().optional(),
        founded: z.union([z.string(), z.number()]).optional(),
        students: z.union([z.string(), z.number()]).optional(),
        staff: z.union([z.string(), z.number()]).optional(),
        tuitionRange: z.string().optional(),
        about: z.string().optional(),
        programs: z.array(z.string()).optional(),
        facilities: z.array(z.string()).optional(),
        hours: z.record(z.string(), z.string()).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session?.user?.id;
      if (!userId) throw new Error("Unauthorized");

      return prisma.school.create({
        data: {
          schoolName: input.schoolName,
          schoolAddress: input.schoolAddress,
          portfolio: input.portfolio,
          zone: input.zone,
          email: input.email || null,
          phone: input.phone || null,
          website: input.website || null,
          founded: input.founded ? Number(input.founded) : null,
          students: input.students ? Number(input.students) : null,
          staff: input.staff ? Number(input.staff) : null,
          tuitionRange: input.tuitionRange || null,
          about: input.about || null,
          programs: input.programs ?? [],
          facilities: input.facilities ?? [],
          hours: input.hours ?? {},
          owner: { connect: { id: Number(userId) } },
        },
      });
    }),
});
