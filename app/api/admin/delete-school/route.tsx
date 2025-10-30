// app/api/admin/delete-school/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { prisma } from "@/src/server/prisma";

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role?.toLowerCase() !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { schoolId } = body;
    if (!schoolId) return NextResponse.json({ error: "Missing schoolId" }, { status: 400 });

    // Optionally you might cascade-delete or check constraints; modify as needed.
    await prisma.school.delete({
      where: { id: Number(schoolId) },
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Delete school error:", err);
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}
