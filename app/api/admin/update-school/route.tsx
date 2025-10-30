// app/api/admin/update-school/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { prisma } from "@/src/server/prisma";

export async function PUT(req: Request) {
  try {
    // ✅ Ensure Admin Authentication
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role?.toLowerCase() !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ Expect JSON body
    const body = await req.json();

    const { id } = body;
    if (!id) {
      return NextResponse.json({ error: "Missing school ID" }, { status: 400 });
    }

    const school = await prisma.school.findUnique({
      where: { id: Number(id) },
    });
    if (!school) {
      return NextResponse.json({ error: "School not found" }, { status: 404 });
    }

    // ✅ Safely handle numeric fields
    const toNumber = (val: any) =>
      val !== undefined && val !== null && val !== "" ? Number(val) : null;

    const zone = toNumber(body.zone);
    const founded = toNumber(body.founded);
    const students = toNumber(body.students);
    const staff = toNumber(body.staff);

    // ✅ Safely parse arrays
    const parseArray = (val: any) => {
      if (Array.isArray(val)) return val;
      if (typeof val === "string") {
        try {
          const parsed = JSON.parse(val);
          return Array.isArray(parsed) ? parsed : [];
        } catch {
          return [];
        }
      }
      return [];
    };

    // ✅ Perform update (ignore images)
    const updatedSchool = await prisma.school.update({
      where: { id: Number(id) },
      data: {
        schoolName: body.schoolName ?? school.schoolName,
        schoolAddress: body.schoolAddress ?? school.schoolAddress,
        portfolio: body.portfolio ?? school.portfolio,
        zone,
        founded,
        students,
        staff,
        tuitionRange: body.tuitionRange ?? school.tuitionRange,
        phone: body.phone ?? school.phone,
        email: body.email ?? school.email,
        website: body.website ?? school.website,
        about: body.about ?? school.about,
        programs: parseArray(body.programs),
        facilities: parseArray(body.facilities),
        hours: body.hours ?? school.hours,
      },
    });

    return NextResponse.json({ success: true, school: updatedSchool });
  } catch (err: any) {
    console.error("Update school error:", err);
    return NextResponse.json(
      { error: err?.message || "Server error" },
      { status: 500 }
    );
  }
}





// // app/api/admin/update-school/route.ts
// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/src/lib/auth";
// import { prisma } from "@/src/server/prisma";

// export async function PUT(req: Request) {
//   try {
//     // ✅ Ensure Admin Authentication
//     const session = await getServerSession(authOptions);
//     if (!session || session.user?.role?.toLowerCase() !== "admin") {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // ✅ Expect JSON body
//     const body = await req.json();

//     const { id } = body;
//     if (!id) {
//       return NextResponse.json({ error: "Missing school ID" }, { status: 400 });
//     }

//     const school = await prisma.school.findUnique({ where: { id: Number(id) } });
//     if (!school) {
//       return NextResponse.json({ error: "School not found" }, { status: 404 });
//     }

//     // ✅ Parse numeric fields safely
//     const zone = body.zone ? Number(body.zone) : null;
//     const founded = body.founded ? Number(body.founded) : null;
//     const students = body.students ? Number(body.students) : null;
//     const staff = body.staff ? Number(body.staff) : null;

//     // ✅ Parse JSON-like fields safely
//     const parseIfArray = (val: any) =>
//       Array.isArray(val) ? val : typeof val === "string" ? JSON.parse(val) : [];

//     // ✅ Update School (ignore images)
//     const updated = await prisma.school.update({
//       where: { id: Number(id) },
//       data: {
//         schoolName: body.schoolName,
//         schoolAddress: body.schoolAddress,
//         portfolio: body.portfolio,
//         zone,
//         founded,
//         students,
//         staff,
//         tuitionRange: body.tuitionRange,
//         phone: body.phone,
//         email: body.email,
//         website: body.website,
//         about: body.about,
//         programs: parseIfArray(body.programs),
//         facilities: parseIfArray(body.facilities),
//         hours: body.hours ?? null,
//         // ❌ no image field here — we’re intentionally ignoring image uploads
//       },
//     });

//     return NextResponse.json({ success: true, school: updated });
//   } catch (err: any) {
//     console.error("Update school error:", err);
//     return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
//   }
// }
