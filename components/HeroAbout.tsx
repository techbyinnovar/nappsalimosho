import Image from "next/image";
import members from "../public/images/hero2.png";

export default function HeroAbout() {
    return (
    <section className="bg-[url('../public/images/tealbg.png')] bg-no-repeat bg-top bg-contain">
        <div className="py-12 relative">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-24 px-6 md:pr-0 md:pl-24 pb-6">
                <div className="flex-1">
                    <p className="font-semibold text-3xl mb-6">About Us</p>
                    <h1 className="text-3xl md:text-7xl font-bold text-green-800 mb-4">
                    Uniting Private Schools, Raising Standards in Private Education
                    </h1>
                    <p className="text-gray-700 mb-6 text-lg">We encourage collaboration and interaction among private school proprietors.</p>
                    <div className="flex gap-4">
                        <button className="bg-green-700 text-white px-6 py-3 rounded-lg shadow hover:bg-green-800 cursor-pointer">
                            Become a Member
                        </button>
                        <button className="border border-green-700 text-green-700 px-6 py-3 rounded-lg hover:bg-green-100 cursor-pointer">
                            Learn More
                        </button>
                    </div>
                </div>
                <div className="flex-1">
                    <Image
                    src={members}
                    alt="NAPPS Members"
                    width={600}
                    height={400}
                    className="rounded-3xl w-auto"
                    />
                </div>
            </div>
        </div>
    </section>
    );
}
