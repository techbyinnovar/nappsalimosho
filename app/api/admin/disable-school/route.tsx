// app/api/admin/disable-school/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { prisma } from "@/src/server/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role?.toLowerCase() !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { schoolId } = body;
    if (!schoolId) return NextResponse.json({ error: "Missing schoolId" }, { status: 400 });

    // Change status to DISABLED (or REJECTED depending on your design)
    const updated = await prisma.school.update({
      where: { id: Number(schoolId) },
      data: { status: "REJECTED" }, // or "DISABLED"
    });

    return NextResponse.json({ success: true, school: updated });
  } catch (err: any) {
    console.error("Disable school error:", err);
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}
