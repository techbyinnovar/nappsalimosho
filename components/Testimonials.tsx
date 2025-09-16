import Image from 'next/image';
import user1 from '../public/images/avatars/user1.png';
import user2 from '../public/images/avatars/user2.png';
import user3 from '../public/images/avatars/user3.png';

export default function Testimonials() {
    const testimonials = [
        {
            member: "Stella Maris",
            school: "Life Fountain Academy",
            feedback: "Since I've joined this chapter, I've had access to more resources, platforms and educational insights that has helped the growth of staff members and students in general.",
            location: "Ikeja, Lagos.",
            image: user1,
        },
        {
            member: "John Smith",
            school: "Sunshine International School",
            feedback: "Being part of NAPPS Alimosho Chapter has connected me with other private school owners, allowing us to share best practices and collaborate on initiatives that benefit our schools.",
            location: "Alimosho, Lagos.",
            image: user2,
        },
        {
            member: "Mary Johnson",
            school: "Bright Future Academy",
            feedback: "The training sessions and workshops organized by the chapter have been invaluable in keeping me updated with the latest educational trends and improving my school's administration.",
            location: "Agege, Lagos.",
            image: user3,
        }
    ]

    return (
    <section className="bg-[#EDFBEE] py-24 px-6 md:px-24">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-5xl font-medium text-center mb-2 text-green-800">
                Hear What Our Members Say
            </h2>
            <p className="text-center text-gray-600 text-xl max-w-3xl mx-auto mb-16">Testimonials from members.</p>
        <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((story, id) => (
            <div
                key={id}
                className="bg-white shadow rounded-2xl p-6 text-left"
            >
                <div className="flex items-start gap-4 mb-3">
                    <Image src={story.image} alt='member' className='w-12' />
                    <div>
                        <h3 className="text-xl font-semibold text-green-800">{story.member}</h3>
                        <p className="text-gray-500 italic text-sm mb-2">{story.school} - {story.location}</p>
                    </div>
                </div>
                <p className="text-gray-700">{story.feedback}</p>
            </div>
            ))}
        </div>
        </div>
    </section>
    );
}
