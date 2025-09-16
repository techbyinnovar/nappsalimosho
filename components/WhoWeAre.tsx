// components/WhoWeAre.tsx
import Image from "next/image";
import img1 from "../public/images/img1.jpg"
import img2 from "../public/images/img2.jpg"
import img3 from "../public/images/img3.jpg"

const SECTIONS = [
  {
    title: "We promote the welfare and interests of private school owners.",
    desc: `We advocate for policies, training and resources that help school proprietors run sustainable, safe
          and high-quality institutions. Through representation and capacity building we protect and advance
          the interests of member schools.`,
    img: img1,
    alt: "School proprietors meeting",
  },
  {
    title: "We help parents find better schools for their wards.",
    desc: `Our school finder and counseling services make it easy for parents to discover reputable private
          schools that match their child's needs — academically, financially and geographically.`,
    img: img2,
    alt: "Parent discussing school options",
  },
  {
    title: "We encourage collaboration and interaction among private school proprietors.",
    desc: `We create forums, seminars and local networks where owners and headteachers share best practises,
          pool resources, and collaborate on community education projects.`,
    img: img3,
    alt: "Workshop with private school owners",
  },
  {
    title: "We work towards improving the quality of education across private schools in Alimosho.",
    desc: `We run training programs, inspections and improvement initiatives to raise teaching standards,
          student welfare and learning outcomes across our member schools.`,
    img: img1,
    alt: "Classroom teaching improvement program",
  },
];

export default function WhoWeAre() {
    return (
        <section
        aria-labelledby="who-we-are-heading"
        className="container mx-auto py-16 px-6 md:px-24"
        >
        <h2
            id="who-we-are-heading"
            className="text-2xl md:text-5xl font-medium text-center mb-4 text-green-800"
        >
            Who We Are
        </h2>

        <p className="text-center text-gray-600 text-xl max-w-3xl mx-auto mb-18">
            We are an association of private school proprietors in Alimosho. Our work
            covers advocacy, capacity-building, parent support, and quality
            improvement across member schools.
        </p>

        <div className="space-y-20">
            {SECTIONS.map((s, idx) => (
            <article
                key={s.title}
                className={`flex flex-col md:flex-row items-center gap-24 ${
                idx % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
            >
                <div className="md:w-1/2 w-full">
                <Image
                    src={s.img}
                    alt={s.alt}
                    width={1200}
                    height={800}
                    className="w-full h-56 md:h-auto object-cover rounded-xl shadow-sm"
                    priority={idx === 0}
                />
                </div>

                <div className="md:w-1/2 w-full">
                <h3 className="text-lg md:text-4xl font-normal text-gray-800 mb-4">
                    {s.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">{s.desc}</p>
                </div>
            </article>
            ))}
        </div>
        </section>
    );
}
