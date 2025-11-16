// app/api/schools/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/src/server/prisma";
import { generateSlug } from "@/src/utils/generateSlug";
import bcrypt from "bcryptjs";

const hashedPassword = await bcrypt.hash("password123", 10);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      ownerFirstName,
      ownerLastName,
      ownerEmail,
      ownerPhone,
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
    } = body;

    // ✅ 1. Check if an owner with this email exists
    let owner = await prisma.user.findUnique({
      where: { email: ownerEmail },
    });

    // ✅ 2. If not, create a new owner
    if (!owner) {
      owner = await prisma.user.create({
        data: {
          firstName: ownerFirstName,
          lastName: ownerLastName,
          email: ownerEmail,
          phone: ownerPhone,
          role: "SCHOOL_OWNER", // assuming your schema has this enum
          password: hashedPassword, 
        },
      });
    }

    // ✅ 3. Create the school linked to the owner
    const school = await prisma.school.create({
      data: {
        schoolName,
        schoolAddress,
        // slug: generateSlug(schoolName),
        zone: zone || null,
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
        ownerId: owner.id,
      },
    });

    return NextResponse.json(school);
  } catch (error) {
    console.error("Error creating school:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
