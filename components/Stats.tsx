import { AcademicCapIcon } from "@heroicons/react/24/outline";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { LiaAwardSolid } from "react-icons/lia";

export default function Stats() {
    return (
        <section className="bg-green-700 text-white py-10 px-6 md:px-24">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 text-center gap-6">
            <div className="border-r border-dashed">
                <AcademicCapIcon className="w-14 h-14 mx-auto mb-4 text-white" />
                <div>
                    <h2 className="text-[#FEF200] text-6xl font-bold">266+</h2>
                    <p className="text-2xl">Member Schools</p>
                </div>
            </div>
            <div className="border-r border-dashed">
                <LiaAwardSolid className="w-14 h-14 mx-auto mb-4 text-white" />
                <div>
                    <h2 className="text-[#FEF200] text-6xl font-bold">20+</h2>
                    <p className="text-2xl">Years of Service</p>
                </div>
            </div>
            <div className="border-r border-dashed">
                <GlobeAltIcon className="w-14 h-14 mx-auto mb-4 text-white" />
                <div>
                    <h2 className="text-[#FEF200] text-6xl font-bold">7+</h2>
                    <p className="text-2xl">Educational Zones</p>
                </div>
            </div>
            <div className="">
                <CalendarDaysIcon className="w-14 h-14 mx-auto mb-4 text-white" />
                <div>
                    <h2 className="text-[#FEF200] text-6xl font-bold">6+</h2>
                    <p className="text-2xl">Conferences Held</p>
                </div>
            </div>
        </div>
        </section>
    );
}
