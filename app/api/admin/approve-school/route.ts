import { NextResponse } from "next/server";
import { prisma } from "@/src/server/prisma";

export async function POST(req: Request) {
  try {
    const { schoolId, approve } = await req.json();

    const school = await prisma.school.update({
      where: { id: Number(schoolId) },
      data: { status: approve ? "APPROVED" : "REJECTED" },
    });

    return NextResponse.json({ success: true, school });
  } catch (error) {
    console.error("❌ Error updating school:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update school" },
      { status: 500 }
    );
  }
}
