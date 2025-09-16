import schoolwave from "../public/images/sponsors/schoolwave.png"
import Image from "next/image";
export default function Sponsors() {
    return (
    <div className="pt-16 pb-32 px-6 md:px-20 text-center">
        <div>
            <h2 className="text-2xl md:text-5xl font-medium text-center mb-2 text-green-800">Our Sponsors</h2>
            <p className="text-center text-gray-600 text-xl max-w-3xl mx-auto mb-12">Dedicated partners committed to advancing private education in Alimosho.</p>
        </div>
        <div className="flex justify-center gap-10">
            <Image width={900} height={900} src={schoolwave} alt="Schoolwave" className="h-auto w-80 bg-white shadow py-4 px-8 rounded-xl" />
            <Image width={900} height={900} src={schoolwave} alt="Schoolwave" className="h-auto w-80 bg-white shadow py-4 px-8 rounded-xl" />
        </div>
    </div>
    );
}