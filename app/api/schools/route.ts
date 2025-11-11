// app/api/schools/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/src/server/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { generateSlug } from "@/src/utils/generateSlug";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const owner = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!owner) {
      return NextResponse.json({ error: "Owner not found" }, { status: 404 });
    }

    const {
      schoolName,
      schoolAddress,
      zone,
      portfolio,
      founded,
      students,
      staff,
      tuitionRange,
      phone,
      email,
      website,
      about,
      programs,
      facilities,
      logoUrl,
      galleryUrls,
    } = await req.json();

    const school = await prisma.school.create({
      data: {
        schoolName,
        schoolAddress,
        slug: generateSlug(schoolName),
        zone: zone ? parseInt(zone) : null,
        portfolio,
        founded: founded ? parseInt(founded) : null,
        students: students ? parseInt(students) : null,
        staff: staff ? parseInt(staff) : null,
        tuitionRange,
        phone,
        email,
        website,
        about,
        programs,
        facilities,
        logoUrl,
        galleryUrls,
        ownerId: owner.id, // ✅ link school to logged-in owner
      },
    });

    return NextResponse.json(school);
  } catch (error) {
    console.error("Error creating school:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}






// // app/api/schools/route.ts
// import { NextResponse } from "next/server";
// import { prisma } from "@/src/server/prisma";
// import { generateSlug } from "@/src/utils/generateSlug";
// import bcrypt from "bcryptjs";

// export async function POST(req: Request) {
//   try {
//     const {
//       ownerFirstName,
//       ownerLastName,
//       ownerEmail,
//       ownerPhone,
//       ownerPassword,
//       schoolName,
//       schoolAddress,
//       portfolio,
//       zone,
//       email,
//       phone,
//       website,
//       founded,
//       students,
//       staff,
//       tuitionRange,
//       about,
//       programs,
//       facilities,
//       hours,
//     } = await req.json();

//     if (!schoolName || !schoolAddress || !portfolio || !zone || !ownerEmail || !ownerPassword) {
//       return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
//     }

//     // ✅ Hash password
//     const hashedPassword = await bcrypt.hash(ownerPassword, 10);

//     const slug = generateSlug(schoolName);

//     // ✅ Create both user and school at once
//     const school = await prisma.school.create({
//       data: {
//         slug,
//         schoolName,
//         schoolAddress,
//         portfolio,
//         zone,
//         email: email || null,
//         phone: phone || null,
//         website: website || null,
//         founded: founded ? Number(founded) : null,
//         students: students ? Number(students) : null,
//         staff: staff ? Number(staff) : null,
//         tuitionRange: tuitionRange || null,
//         about: about || null,
//         programs: Array.isArray(programs) ? programs : [],
//         facilities: Array.isArray(facilities) ? facilities : [],
//         hours: hours ? JSON.parse(JSON.stringify(hours)) : null,
//         status: "PENDING",
//         owner: {
//           create: {
//             firstName: ownerFirstName,
//             lastName: ownerLastName,
//             email: ownerEmail,
//             phone: ownerPhone,
//             password: hashedPassword,
//             role: "SCHOOL_OWNER",
//           },
//         },
//       },
//       include: { owner: true },
//     });

//     return NextResponse.json({ success: true, school }, { status: 201 });
//   } catch (error) {
//     console.error("❌ Error creating school:", error);
//     return NextResponse.json(
//       { success: false, message: "Error registering school" },
//       { status: 500 }
//     );
//   }
// }

