import Image from "next/image";
import { CalendarIcon } from "@heroicons/react/24/outline";
import img4 from "../public/images/img4.jpg"
import img6 from "../public/images/img6.jpg"

const posts = [
    {
        id: 1,
        title: "Teaching With Purpose Seminar",
        date: "September 2, 2025",
        category: "Seminar",
        image: img4,
    },
    {
        id: 2,
        title: "Teaching With Purpose Seminar",
        date: "September 2, 2025",
        category: "Seminar",
        image: img6,
    },
    {
        id: 3,
        title: "Teaching With Purpose Seminar",
        date: "September 2, 2025",
        category: "Seminar",
        image: img6,
    },
];

export default function RecentPosts() {
    return (
        <section className="mb-16 px-6 md:px-24">
            <h2 className="text-xl md:text-3xl text-green-700 font-medium mb-6">Recent Posts</h2>
            <div className="grid md:grid-cols-3 gap-6">
                {posts.map((post) => (
                <div key={post.id} className="bg-white shadow rounded-xl overflow-hidden">
                    <Image
                    src={post.image}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="w-full h-60 object-cover"
                    />
                    <div className="p-4">
                    <div className="flex items-center text-gray-500 text-sm mb-3">
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        <span>{post.date}</span>
                        <span className="mx-2">•</span>
                        <span className="text-green-600 font-medium">{post.category}</span>
                    </div>
                    <h3 className="text-lg md:text-2xl font-medium mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4">
                        Cross section of teachers at a seminar organized by NAPPS Alimosho Chapter.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua.
                    </p>
                    <a
                        href="#"
                        className="inline-flex items-center text-green-600 font-medium hover:underline"
                    >
                        Read More →
                    </a>
                    </div>
                </div>
                ))}
            </div>
        </section>
    );
}
