import { CheckIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import award from '../public/images/icons/award.png'
import balance from '../public/images/icons/balance.png'
import teamwork from '../public/images/icons/teamwork.png'
import training from '../public/images/icons/training.png'
import React from 'react'

export default function Activities() {
    const activities = [
        { 
            icon: training,
            title: "Training & Development", 
            text: "Organizing comprehensive training programs, seminars & workshops for both teachers and proprietors to enhance educational delivery and management skills.",
            list: ['Teacher development workshops', 'School management seminars', 'Educational technology training.',]
        },
        { 
            icon: balance,
            title: "Government Engagement", 
            text: "Actively engaging with government agencies on policy matters affecting private schools and representing member interests at all levels of government.",
            list: ['Policy advocacy', 'Regulatory compliance', 'Government relations.',]
        },
        { 
            icon: teamwork,
            title: "Networking & Collaboration", 
            text: "Encouraging networking opportunities and fostering collaboration among member schools to share best practices and resources.",
            list: ['Regular networking events', 'Resource sharing platforms', 'Collaborative projects.',]
        },
        { 
            icon: award,
            title: "Standards Compliance", 
            text: "Promoting adherence to Lagos State education standards and regulations while ensuring quality education delivery across all member schools.",
            list: ['Quality assurance programs', 'Standards monitoring', 'Best practices implementation.',]
        },
    ];
    return (
        <div>
            <div className="bg-[url('../public/images/whitebg.png')] bg-no-repeat bg-bottom bg-cover relative top-0 h-28 w-full z-10"></div>
            <div className="pt-40 pb-40 px-6 md:px-24 bg-[#EDFBEE] relative -top-28 z-0">
                <div>
                    <h2 className="text-2xl md:text-5xl font-medium text-center mb-2 text-green-800">Our Activities</h2>
                    <p className="text-center text-gray-600 text-xl max-w-3xl mx-auto mb-12">Comprehensive programs designed to elevate private education standards.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
                    {activities.map((a, idx) => (
                        <div key={idx} className='bg-white p-8 rounded-2xl shadow-xs hover:shadow-lg transition-shadow duration-300'>
                            <Image src={a.icon} alt='title' className="mb-4 w-14 h-14"/>
                            <h3 className="font-medium text-lg md:text-3xl mb-2 text-green-700">{a.title}</h3>
                            <p className="text-gray-600 text-sm md:text-lg">{a.text}</p>
                            <ul className="list-none mt-4 text-gray-600 text-sm md:text-lg">
                                {a.list.map((item, index) => (
                                    <li key={index} className="mb-1 flex items-center justify-start"><CheckIcon className='mr-2 w-4 h-4' /> {item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-[url('../public/images/whitebg.png')] bg-no-repeat bg-bottom bg-cover relative bottom-54 h-28 w-full z-20 rotate-180"></div>
        </div>
    )
}
