import Image from "next/image";
import { CalendarIcon } from "@heroicons/react/24/outline";
import img5 from "../public/images/img5.jpg"

export default function FeaturedArticle() {
    return (
        <section className="mb-12 px-6 md:px-24 py-10">
            <h2 className="text-xl md:text-3xl text-green-700 font-medium mb-4">Featured Article</h2>
            <div className="bg-white rounded-xl shadow-md p-4 md:flex items-center gap-2 border border-gray-200">
                <div className="w-full md:w-1/2">
                    <Image
                        src={img5}
                        alt="Teaching Seminar"
                        width={600}
                        height={400}
                        className="rounded-lg"
                    />
                </div>
                <div className="flex-1 mt-4 md:mt-0">
                    <div className="flex items-center text-gray-500 text-sm mb-2">
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        <span>September 2, 2024</span>
                        <span className="mx-2">•</span>
                        <span className="text-green-600 font-medium">Seminar</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-medium mb-2">
                        Teaching With Purpose Seminar
                    </h3>
                    <p className="text-gray-600 mb-4 mr-8">
                        Cross section of teachers at a seminar organized by NAPPS Alimosho Chapter.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <a
                        href="#"
                        className="inline-flex items-center text-green-600 font-medium hover:underline"
                    >
                        Read More →
                    </a>
                </div>
            </div>
        </section>
    );
}
