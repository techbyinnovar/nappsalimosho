// app/api/schools/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/src/server/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { schoolName, schoolAddress, portfolio, zone } = await req.json();

    if (!schoolName || !schoolAddress || !portfolio || !zone) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const school = await prisma.school.create({
      data: {
        schoolName,
        schoolAddress,
        portfolio,
        zone,
        owner: {
          connect: { id: Number(session.user.id) }, 
        },
      },
    });

    return NextResponse.json({ success: true, school }, { status: 201 });
  } catch (error) {
    console.error("Error creating school:", error);
    return NextResponse.json(
      { success: false, message: "Error registering school" },
      { status: 500 }
    );
  }
}
