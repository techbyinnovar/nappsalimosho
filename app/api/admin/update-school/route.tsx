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
      include: {
        owner: true, // ✅ include owner for update and prefill
      },
    });

    if (!school) {
      return NextResponse.json({ error: "School not found" }, { status: 404 });
    }

    // ✅ Safely handle numeric fields (still valid for number types)
    const toNumber = (val: any) =>
      val !== undefined && val !== null && val !== "" ? Number(val) : null;

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

    // ✅ Update school (zone as string)
    const updatedSchool = await prisma.school.update({
      where: { id: Number(id) },
      data: {
        schoolName: body.schoolName ?? school.schoolName,
        schoolAddress: body.schoolAddress ?? school.schoolAddress,
        portfolio: body.portfolio ?? school.portfolio,
        zone: body.zone || null, // ✅ now string-based
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
      include: {
        owner: true, // ✅ return updated owner with response
      },
    });

    // ✅ Optionally update owner details if provided
    if (
      body.ownerFirstName ||
      body.ownerLastName ||
      body.ownerEmail ||
      body.ownerPhone
    ) {
      await prisma.user.update({
        where: { id: school.ownerId },
        data: {
          firstName: body.ownerFirstName ?? school.owner.firstName,
          lastName: body.ownerLastName ?? school.owner.lastName,
          email: body.ownerEmail ?? school.owner.email,
          phone: body.ownerPhone ?? school.owner.phone,
        },
      });
    }

    // ✅ Re-fetch updated data to include fresh owner info
    const refreshedSchool = await prisma.school.findUnique({
      where: { id: Number(id) },
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
    });

    return NextResponse.json({ success: true, school: refreshedSchool });
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

//     const school = await prisma.school.findUnique({
//       where: { id: Number(id) },
//     });
//     if (!school) {
//       return NextResponse.json({ error: "School not found" }, { status: 404 });
//     }

//     // ✅ Safely handle numeric fields
//     const toNumber = (val: any) =>
//       val !== undefined && val !== null && val !== "" ? Number(val) : null;

//     const zone = toNumber(body.zone);
//     const founded = toNumber(body.founded);
//     const students = toNumber(body.students);
//     const staff = toNumber(body.staff);

//     // ✅ Safely parse arrays
//     const parseArray = (val: any) => {
//       if (Array.isArray(val)) return val;
//       if (typeof val === "string") {
//         try {
//           const parsed = JSON.parse(val);
//           return Array.isArray(parsed) ? parsed : [];
//         } catch {
//           return [];
//         }
//       }
//       return [];
//     };

//     const updatedSchool = await prisma.school.update({
//       where: { id: Number(id) },
//       data: {
//         schoolName: body.schoolName ?? school.schoolName,
//         schoolAddress: body.schoolAddress ?? school.schoolAddress,
//         portfolio: body.portfolio ?? school.portfolio,
//         zone,
//         founded,
//         students,
//         staff,
//         tuitionRange: body.tuitionRange ?? school.tuitionRange,
//         phone: body.phone ?? school.phone,
//         email: body.email ?? school.email,
//         website: body.website ?? school.website,
//         about: body.about ?? school.about,
//         programs: parseArray(body.programs),
//         facilities: parseArray(body.facilities),
//         hours: body.hours ?? school.hours,
//       },
//     });

//     return NextResponse.json({ success: true, school: updatedSchool });
//   } catch (err: any) {
//     console.error("Update school error:", err);
//     return NextResponse.json(
//       { error: err?.message || "Server error" },
//       { status: 500 }
//     );
//   }
// }
