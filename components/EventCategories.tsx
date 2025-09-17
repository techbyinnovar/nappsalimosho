import { FaUsers, FaChalkboardTeacher, FaBookOpen, FaHandshake } from "react-icons/fa";

const categories = [
    {
        icon: <FaUsers size={40} className="text-green-700 text-center" />,
        title: "Conferences",
        description:
        "Large-scale gatherings with keynote speakers and networking opportunities.",
    },
    {
        icon: <FaChalkboardTeacher size={40} className="text-green-700 text-center" />,
        title: "Workshops",
        description:
        "Hands-on learning sessions focused on specific skills and topics.",
    },
    {
        icon: <FaBookOpen size={40} className="text-green-700 text-center" />,
        title: "Trainings",
        description:
        "Professional development programs for educators and administrators.",
    },
    {
        icon: <FaHandshake size={40} className="text-green-700" />,
        title: "Networking",
        description:
        "Connect with fellow educators and industry professionals.",
    },
];

export default function EventCategories() {
    return (
        <div className="text-center">
            <h2 className="text-2xl md:text-5xl font-medium text-center mb-2 text-green-800">
                Event Categories
            </h2>
            <p className="text-gray-600 mb-16 max-w-3xl md:text-xl text-lg mx-auto">
                Explore our diverse range of educational events and professional
                development opportunities.
            </p>

            <div className="grid md:grid-cols-4 gap-12">
                {categories.map((cat, index) => (
                <div key={index} className="flex flex-col items-center">
                    <div className="mb-4 bg-[#EDFBEE] p-1 rounded-full w-20 h-20 flex items-center justify-center">{cat.icon}</div>
                    <h3 className="font-semibold text-lg md:text-2xl mb-2">{cat.title}</h3>
                    <p className="text-gray-600 text-sm md:text-[16px]">{cat.description}</p>
                </div>
                ))}
            </div>
        </div>
    );
}
