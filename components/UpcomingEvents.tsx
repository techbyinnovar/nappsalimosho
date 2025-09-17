import { MapPinIcon } from "@heroicons/react/24/solid";

const upcomingEvents = [
    {
        date: "October 15, 2025",
        title: "Annual NAPPS Conference 2025",
        description:
        "Join hundreds of private school leaders for our flagship annual conference featuring keynote speakers and workshops.",
        location: "Abuja, Nigeria.",
    },
    {
        date: "November 4, 2025",
        title: "Digital Learning Workshop",
        description:
        "Explore the latest trends in educational technology and digital learning methodologies for private schools.",
        location: "Lagos, Nigeria.",
    },
    {
        date: "December 10, 2025",
        title: "Leadership Excellence Summit",
        description:
        "Develop your leadership skills and learn best practices for managing private educational institutions.",
        location: "Lagos, Nigeria.",
    },
];

export default function UpcomingEvents() {
    return (
        <div className="text-center">
        <h2 className="text-2xl md:text-5xl font-medium text-center mb-2 text-green-800">
            Upcoming Events
        </h2>
        <p className="text-gray-600 mb-10 md:text-xl">
            Don’t miss these exciting opportunities to connect, learn, and grow with
            fellow educators.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
            <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 text-left flex flex-col justify-between"
            >
                <p className="text-green-600 font-medium mb-2">{event.date}</p>
                <h3 className="text-lg md:text-2xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-600 text-md mb-4">{event.description}</p>
                <p className="text-gray-500 text-md mb-6 flex items-center gap-2"><MapPinIcon className="w-4" /> {event.location}</p>
                <button className="bg-green-700 text-white px-5 py-2 rounded-lg hover:bg-green-800 transition">
                Register Now
                </button>
            </div>
            ))}
        </div>
        </div>
    );
}
