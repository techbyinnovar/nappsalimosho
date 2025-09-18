import Image from "next/image";
import AboutSchool from "@/components/AboutSchool";
import ContactInfo from "@/components/ContactInfo";
import FacilitiesPrograms from "@/components/Facilities";
import QuickStats from "@/components/QuickStats";
import SchoolHours from "@/components/SchoolHours";
import { getSchoolById } from "@/data/schools";
import hero2 from "@/public/images/hero2.png";

export default function SchoolDetails({ params }: { params: { id: string } }) {
    const school = getSchoolById(params.id);

    if (!school) return <div className="container py-24">School not found.</div>;

    return (
        <div className="bg-white pb-24">
            <HeroSchool {...school} />
            <div className="container">
                <div className="grid lg:grid-cols-3 gap-8 mt-12 md:px-24 px-6">
                    <div className="lg:col-span-2 space-y-8">
                        <AboutSchool school={school} />
                        <FacilitiesPrograms school={school} />
                    </div>
                    <div className="space-y-8">
                        <ContactInfo school={school} />
                        <QuickStats school={school} />
                        <SchoolHours school={school} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function HeroSchool({ name, students, staff, description }: any) {
    return (
        <section className="lg:flex items-center justify-between gap-10 md:pl-24 pl-6 bg-[#EDFBEE] py-10">
            <div className="flex-1">
                <span className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
                NAPPS Member
                </span>
                <h1 className="text-3xl md:text-6xl font-bold mb-3 text-green-800">{name}</h1>
                <p className="text-gray-600 mb-4">{description}</p>

                <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2 text-gray-700">
                    <span>👩‍🎓</span>
                    <p>{students} Students</p>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                    <span>👩‍🏫</span>
                    <p>{staff} Staff Members</p>
                </div>
                </div>

                <div className="flex gap-4">
                <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
                    Contact School
                </button>
                <button className="border border-green-600 text-green-600 px-6 py-2 rounded-lg hover:bg-green-600 hover:text-white">
                    Schedule a Visit
                </button>
                </div>
            </div>

            <div className="flex-1 mt-8 lg:mt-0">
                <Image
                src={hero2}
                alt={`${name} Students`}
                width={600}
                height={400}
                className="rounded-xl h-[400px] w-auto"
                />
            </div>
        </section>
    );
}
