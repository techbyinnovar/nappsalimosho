import Image from 'next/image';
import bulb from '../public/images/icons/bulb.png';
import bank from '../public/images/icons/bank.png';
import globe from '../public/images/icons/globe.png';
import graduation from '../public/images/icons/graduation.png';
import handshake from '../public/images/icons/handshake.png';
import divider from '../public/images/divider.png';

export default function Purpose() {
    const purposes = [
        {
            title: "Ensure Quality & Standards",
            text: "We monitor and support schools to maintain excellence.",
        },
        {
            title: "Training & Development",
            text: "We organize workshops to empower educators.",
        },
        {
            title: "Welfare Protection",
            text: "We safeguard members’ interests and wellbeing.",
        },
        {
            title: "Collaboration for Impact",
            text: "We foster partnerships for educational growth.",
        },
    ];

    return (
        <div className="py-12 bg-green-700 px-6 md:px-20 bg-[url('../public/images/circles.png')] bg-no-repeat bg-center bg-contain">
            <div className="">
                <div className="text-center mb-16">
                    <h2 className="text-2xl md:text-5xl font-medium text-[#FEF547] mb-4">Our Purpose</h2>
                    <p className="text-white font-normal">Driving excellence in private education through unity, advocacy and professional development.</p>
                </div>
                <div className="flex flex-col md:flex-row gap-20 items-center justify-center">
                    <div className='md:w-[35%] relative top-5'>
                        <div className="flex flex-col md:items-end md:text-right mb-20">
                            <Image src={graduation} alt="graduation" className="mb-4 w-12 h-12"/>
                            <h3 className="font-normal text-lg md:text-3xl mb-2 text-white">Ensure Quality & Standards</h3>
                            <p className="text-sm md:text-lg text-white">To ensure quality and standard in private education delivery across all member schools.</p>
                        </div>
                        <div className="flex flex-col md:items-end md:text-right mb-20">
                            <Image src={bulb} alt="bulb" className="mb-4 w-12 h-12"/>
                            <h3 className="font-normal text-lg md:text-3xl mb-2 text-white">Training & Professional Development</h3>
                            <p className="text-sm md:text-lg text-white">To represent members’ interests before government agencies (e.g., Lagos State Ministry of Education, Quality Assurance).</p>
                        </div>
                    </div>
                    <div className='w-auto'>
                        <Image src={divider} alt="divider" className="h-full hidden md:block"/>
                    </div>
                    <div className='md:w-[35%] relative top-7'>
                        <div className="flex flex-col md:items-start md:text-left mb-20">
                            <Image src={handshake} alt="handshake" className="mb-4 w-12 h-12"/>
                            <h3 className="font-normal text-lg md:text-3xl mb-2 text-white">Unite Proprietors</h3>
                            <p className="text-sm md:text-lg text-white">To unite proprietors of private schools in Alimosho for collective strength and shared vision.</p>
                        </div>
                        <div className="flex flex-col md:items-start md:text-left mb-20">
                            <Image src={bank} alt="bank" className="mb-4 w-12 h-12"/>
                            <h3 className="font-normal text-lg md:text-3xl mb-2 text-white">Advocacy & Representation</h3>
                            <p className="text-sm md:text-lg text-white">To serve as a platform for advocacy, training, and professional development initiatives.</p>
                        </div>
                        <div className="flex flex-col md:items-start md:text-left mb-20">
                            <Image src={globe} alt="globe" className="mb-4 w-12 h-12"/>
                            <h3 className="font-normal text-lg md:text-3xl mb-2 text-white">Collaboration for Impact</h3>
                            <p className="text-sm md:text-lg text-white">To foster collaboration between schools and improve educational outcomes collectively.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}