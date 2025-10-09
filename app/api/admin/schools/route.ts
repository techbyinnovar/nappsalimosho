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
            phone: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(schools, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching schools:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching schools" },
      { status: 500 }
    );
  }
}
