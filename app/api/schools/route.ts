import { NextResponse } from "next/server";
import { prisma } from "@/src/server/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";

// 🟢 Create a new school
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      schoolName,
      schoolAddress,
      portfolio,
      zone,
      email,
      phone,
      website,
      founded,
      students,
      staff,
      tuitionRange,
      about,
      programs,
      facilities,
      hours,
    } = await req.json();

    // ✅ Validate required fields
    if (!schoolName || !schoolAddress || !portfolio || !zone) {
      return NextResponse.json(
        { error: "Required fields are missing" },
        { status: 400 }
      );
    }

    // ✅ Create school
    const school = await prisma.school.create({
      data: {
        schoolName,
        schoolAddress,
        portfolio,
        zone,
        email: email || null,
        phone: phone || null,
        website: website || null,
        founded: founded ? Number(founded) : null,
        students: students ? Number(students) : null,
        staff: staff ? Number(staff) : null,
        tuitionRange: tuitionRange || null,
        about: about || null,
        programs: Array.isArray(programs) ? programs : [],
        facilities: Array.isArray(facilities) ? facilities : [],
        hours: hours ? JSON.parse(JSON.stringify(hours)) : null,
        owner: { connect: { id: Number(session.user.id) } },
      },
    });

    return NextResponse.json({ success: true, school }, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating school:", error);
    return NextResponse.json(
      { success: false, message: "Error registering school" },
      { status: 500 }
    );
  }
}

// 🟣 Fetch schools (admin/owner view)
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // If user is ADMIN, return all schools
    // If SCHOOL_OWNER, return only their schools
    const user = await prisma.user.findUnique({
      where: { id: Number(session.user.id) },
      select: { role: true },
    });

    const isAdmin = user?.role === "ADMIN";

    const schools = await prisma.school.findMany({
      where: isAdmin
        ? {} // Admin sees all
        : { ownerId: Number(session.user.id) }, // Owner sees their own
      select: {
        id: true,
        schoolName: true,
        schoolAddress: true,
        portfolio: true,
        zone: true,
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
