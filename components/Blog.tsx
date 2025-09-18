import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import img1 from '../public/images/img1.jpg';
import img4 from '../public/images/img4.jpg';
import hero from '../public/images/hero.png';

const posts = [
    {
        title: "Executive Members, Elder Helen Adesina, visit to Alimosho NAPPS Secretariat Site.",
        img: img1,
        date: "Sept 10, 2025",
    },
    {
        title: "Executive Members & Educators at NAPPS 2025 Summit at Ascon Badagry, Lagos.",
        img: hero,
        date: "Aug 25, 2025",
    },
    {
        title: "Teaching with purpose, leading with impact Seminar.",
        img: img4,
        date: "July 15, 2025",
    },
];

export default function Blog() {
    return (
        <section className="container mx-auto py-16 px-6 md:px-24">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end items-start gap-4 md:mb-18 mb-8">
                <div>
                    <h2 className="text-2xl md:text-5xl font-medium mb-2 text-green-800">Our Blog</h2>
                    <p className="text-gray-600 text-xl mx-auto">Follow up on our latest activities.</p>
                </div>
                <button className="flex items-center border border-green-700 text-green-700 font-medium text-md px-4 py-3 rounded-lg hover:bg-green-100 cursor-pointer">
                    Explore More
                    <ArrowRightIcon className="w-5 h-5 inline-block ml-6" />
                </button>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {posts.map((post) => (
                <div
                    key={post.title}
                    className="bg-white shadow rounded-xl overflow-hidden"
                >
                    <Image
                    src={post.img}
                    alt={post.title}
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">
                        {post.title}
                    </h3>
                    <p className="text-gray-500 text-sm">{post.date}</p>
                    </div>
                </div>
                ))}
            </div>
        </section>
    );
}
