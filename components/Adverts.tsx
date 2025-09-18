import Image from "next/image";
import ad1 from "../public/images/adverts/catalog.jpg"
import ad2 from "../public/images/adverts/nappsapp.jpg"
import ad3 from "../public/images/adverts/nappsapp.jpg"
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const ads = [
    { img: ad1, alt: "Ad 1" },
    { img: ad2, alt: "Ad 2" },
    { img: ad3, alt: "Ad 3" },
    { img: ad2, alt: "Ad 4" },
    { img: ad3, alt: "Ad 5" },
    { img: ad1, alt: "Ad 6" },
];

export default function Adverts() {
    return (
        <div className="container mx-auto py-20 px-6 md:px-24 bg-[#EDFBEE] mb-0">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end items-start gap-4 md:mb-18 mb-8">
                <div>
                    <h2 className="text-2xl md:text-5xl font-medium mb-2 text-green-800">Advertisement</h2>
                    {/* <p className="text-gray-600 text-xl mx-auto">Follow up on our latest activities and trends.</p> */}
                </div>
                <button className="flex items-center border border-green-700 text-green-700 font-medium text-md px-4 py-3 rounded-lg hover:bg-green-100 cursor-pointer">
                    Explore More
                    <ArrowRightIcon className="w-5 h-5 inline-block ml-6" />
                </button>
            </div>

            <div className="flex flex-col md:flex-row md:gap-24 gap-10 items-start justify-between">
                <div className="md:w-[30%]">
                    <p className="font-normal text-3xl text-gray-800 mb-12">Follow us for latest updates from various schools. Let’s help you reach a wider audience.</p>
                    <button className="bg-green-700 text-white px-6 py-3 rounded-lg shadow hover:bg-green-800 cursor-pointer">
                        Register Your School
                    </button>
                </div>

                <div className="grid md:grid-cols-3 grid-cols-2 gap-6 md:w-[70%]">
                    {ads.map((ad) => (
                    <div
                        key={ad.alt}
                        className="bg-white shadow rounded-xl overflow-hidden"
                    >
                        <Image
                        src={ad.img}
                        alt={ad.alt}
                        width={300}
                        height={200}
                        className="w-full h-full object-cover"
                        />
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
