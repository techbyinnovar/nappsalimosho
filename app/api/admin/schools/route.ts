// app/api/admin/schools/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/src/server/prisma";

export async function GET() {
  try {
    const schools = await prisma.school.findMany({
      include: {
        owner: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(schools);
  } catch (error) {
    console.error("Error fetching schools:", error);
    return NextResponse.json(
      { error: "Failed to load schools" },
      { status: 500 }
    );
  }
}
