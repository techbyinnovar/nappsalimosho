import { StarIcon } from '@heroicons/react/24/outline'
import { ScaleIcon } from '@heroicons/react/24/outline'
import { BookOpenIcon } from '@heroicons/react/24/outline'
import { UserGroupIcon } from '@heroicons/react/24/outline'
import { ShieldCheckIcon } from '@heroicons/react/24/outline'
import { HeartIcon } from '@heroicons/react/24/outline'

export default function CoreValues() {
    const values = [
        { title: "Professionalism", desc: " Upholding high standards in education and administration.", icon: <StarIcon className='w-16 text-[#00923f]' /> },
        { title: "Equity", desc: "Ensuring fairness and equal opportunities for all learners.", icon: <ScaleIcon className='w-16 text-[#00923f]' /> },
        { title: "Discipline", desc: "Promoting order, responsibility, and respect in schools.", icon: <BookOpenIcon className='w-16 text-[#00923f]' /> },
        { title: "Religious Tolerance", desc: "Embracing diversity and respecting all faiths from diverse backgrounds.", icon: <UserGroupIcon className='w-16 text-[#00923f]' /> },
        { title: "Patriotism", desc: "Fostering love and commitment to Nigeria's growth.", icon: <HeartIcon className='w-16 text-[#00923f]' /> },
        { title: "Integrity", desc: "Acting with honesty, transparency, and accountability.", icon: <ShieldCheckIcon className='w-16 text-[#00923f]' /> },
    ];

    return (
        <section className="bg-white py-16">
        <div className="container mx-auto px-6 md:px-24">
            <div>
                <h2 className="text-2xl md:text-5xl font-medium text-center mb-2 text-green-800">Our Core Values</h2>
                <p className="text-center text-gray-600 text-xl max-w-3xl mx-auto mb-18">What we do that makes us stand out.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 md:px-24">
            {values.map((val) => (
                <div
                key={val.title}
                className="bg-white hover:bg-[#EDFBEE] shadow-xs border-[#F1F1F1] border-1 rounded-2xl p-6 text-left flex flex-col justify-between gap-10">
                    <div>{val.icon}</div>
                    <div>
                        <h3 className="text-3xl font-medium text-[#404040] mb-2">
                            {val.title}
                        </h3>
                        <p className="text-gray-600 text-lg">{val.desc}</p>
                    </div>
                </div>
            ))}
            </div>
        </div>
        </section>
    );
}
