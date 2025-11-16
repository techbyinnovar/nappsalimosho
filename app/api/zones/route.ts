// app/api/zones/route.ts
import { prisma } from "@/src/server/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";

    const whereClause: any = {
      status: "APPROVED",
      ...(search
        ? {
            OR: [
              {
                schoolName: {
                  contains: search,
                  mode: "insensitive" as const,
                },
              },
              {
                zone: {
                  contains: search,
                  mode: "insensitive" as const,
                },
              },
            ],
          }
        : {}),
    };

    const schools = await prisma.school.findMany({
      where: whereClause,
      include: {
        owner: {
          select: { firstName: true, lastName: true, email: true, phone: true },
        },
      },
      orderBy: { schoolName: "asc" },
    });

    return NextResponse.json(schools);
  } catch (error) {
    console.error("Error fetching zones:", error);
    return NextResponse.json(
      { error: "Failed to fetch zones" },
      { status: 500 }
    );
  }
}
