import Image from "next/image";
import img3 from "../public/images/img3.jpg"
import hero from "../public/images/hero.png"
import img5 from "../public/images/img5.jpg" 

const pastEvents = [
    {
        date: "April 24, 2025",
        title: "2025 NAPPS Alimosho Elections",
        description:
        "The contestants at electioneering hall at Frontliners school.",
        image: img3,
    },
    {
        date: "April 24, 2025",
        title: "2025 NAPPS Summit",
        description:
        "The executive members and Educators at NAPPS 2025 Summit at Ascon Badagry, Lagos.",
        image: hero,
    },
    {
        date: "September 2, 2024",
        title: "Teaching With Purpose Seminar",
        description:
        "Cross section of teachers at a seminar organized by NAPPS Alimosho Chapter.",
        image: img5,
    },
];

export default function PastEvents() {
    return (
        <div className="text-center">
            <h2 className="text-2xl md:text-5xl font-medium text-center mb-2 text-green-800">Past Events</h2>
            <p className="text-gray-600 mb-16 max-w-3xl md:text-xl text-lg mx-auto">
                Highlights from our previous successful events and conferences.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
                {pastEvents.map((event, index) => (
                <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
                >
                    <Image
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                    width={1200}
                    height={800}
                    />
                    <div className="p-6 text-left">
                    <p className="text-gray-500 text-sm mb-1">{event.date}</p>
                    <h3 className="text-lg md:text-xl font-semibold mb-2">{event.title}</h3>
                    <p className="text-gray-600 text-sm md:text-lg leading-snug mb-4">{event.description}</p>
                    <button className="text-green-700 font-medium border-2 border-green-700 rounded-3xl px-6 py-2 cursor-pointer">
                        →
                    </button>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
}


