// app/zones/[slug]/page.tsx
import { prisma } from "@/src/server/prisma";
import HeroSchool from "@/components/HeroSchool";
import AboutSchool from "@/components/AboutSchool";
import FacilitiesPrograms from "@/components/Facilities";
import SchoolHours from "@/components/SchoolHours";
import ContactInfo from "@/components/ContactInfo";
import QuickStats from "@/components/QuickStats";
import SchoolOwnerContact from "@/components/SchoolOwnerContact";
import { SafeSchool } from "@/types/school";

export default async function ZoneSchoolPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  const schoolData = await prisma.school.findUnique({
    where: { slug },
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

  if (!schoolData) {
    return <div className="p-8 text-center text-gray-500">School not found.</div>;
  }

  const parseJSON = (val: unknown) => {
    try {
      if (Array.isArray(val)) return val;
      if (typeof val === "string") return JSON.parse(val);
      return [];
    } catch {
      return [];
    }
  };

  const school: SafeSchool = {
    ...schoolData,
    owner: {
      firstName: schoolData.owner?.firstName || "",
      lastName: schoolData.owner?.lastName || "",
      email: schoolData.owner?.email || "",
      phone: schoolData.owner?.phone || null,
    },
    programs: parseJSON(schoolData.programs),
    facilities: parseJSON(schoolData.facilities),
    hours: parseJSON(schoolData.hours),
  };

  return (
    <div className="bg-white pb-24">
      <HeroSchool
        schoolName={school.schoolName}
        staff={school.staff || 0}
        students={school.students || 0}
        about={school.about || ""}
        logoUrl={school.logoUrl || null}
      />
      <div className="container">
        <div className="grid lg:grid-cols-3 gap-8 mt-12 md:px-24 px-6">
          <div className="lg:col-span-2 space-y-8">
            <AboutSchool school={school} />
            <FacilitiesPrograms school={school} />
          </div>
          <div className="space-y-8">
            <ContactInfo school={school} />
            <SchoolOwnerContact 
              portfolio={school.portfolio}
              name={`${school.owner.firstName} ${school.owner.lastName}`} 
              email={school.owner.email} 
              phone={school.owner.phone} 
            />
            <QuickStats school={school} />
            <SchoolHours school={school} />
          </div>
        </div>
      </div>
    </div>
  );
}

