// app/api/owner/schools/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { prisma } from "@/src/server/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const schools = await prisma.school.findMany({
      where: { ownerId: Number(session.user.id) },
      select: {
        id: true,
        schoolName: true,
        schoolAddress: true,
        zone: true,
        portfolio: true,
        email: true,
        phone: true,
        website: true,
        founded: true,
        students: true,
        staff: true,
        tuitionRange: true,
        about: true,
        programs: true,
        facilities: true,
        hours: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(schools);
  } catch (error) {
    console.error("Error fetching owner schools:", error);
    return NextResponse.json(
      { error: "Failed to load schools" },
      { status: 500 }
    );
  }
}
