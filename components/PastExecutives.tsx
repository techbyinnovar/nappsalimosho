import React from 'react'
import Image from 'next/image';
import mike from '../public/images/executives/mike.jpg'
import esther from '../public/images/executives/esther.jpg'
import alfred from '../public/images/executives/alfred.jpg'
import sunday from '../public/images/executives/sunday.jpg'
import falohun from '../public/images/executives/falohun.jpg'
import kemi from '../public/images/executives/kemi.jpg'
import aloma from '../public/images/executives/aloma.jpg'
import segun from '../public/images/executives/segun.jpg'

export default function PastExecutives() {
    const members = [
        { name: "Pa. J.O Ojetunde", role: "Pionner Chairman", school: "Glory International School", img: mike },
        { name: "Mrs Taiwo Ajayi", role: "Second Chairperson", school: "Lycett School", img: esther },
        { name: "Pa. S. O. O Sosami", role: "Third Chairman", school: "Anchor Mirror School", img: alfred },
        { name: "Princess Helen Adesina", role: "Fourth Chairperson", school: "Marallen School", img: sunday },
        { name: "Mrs. Oretuga Roseline", role: "Fifth Chairperson", school: "Roseville School", img: falohun },
        { name: "Dr. Mrs E. A Oriola", role: "Sixth Chairperson", school: "Cosmos School", img: segun },
        { name: "Late Chief E. Abiodun-Edena", role: "Seventh Chairman", school: "Edena School", img: aloma },
        { name: "Mrs Ogbonna Ngozi A.", role: "Eight Chairperson", school: "Masterguide School", img: kemi },
    ];
    return (
        <div className="pb-16 px-6 md:px-24 relative">
            <div>
                <h2 className="text-2xl md:text-5xl font-medium text-center mb-2 text-green-800">Past Chairmen</h2>
                <p className="text-center text-gray-600 text-xl max-w-3xl mx-auto mb-18">Dedicated leaders committed to advancing private education in Alimosho.</p>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-2 max-w-6xl mx-auto">
                {members.map((m, idx) => (
                    <div key={idx} className="w-72 rounded-3xl bg-white shadow-lg shadow-gray-300 ring-1 ring-gray-200 overflow-hidden p-2 flex flex-col items-start">
                        <Image
                        src={m.img}
                        alt={m.name}
                        className="w-full h-64 object-cover rounded-2xl object-top shadow inset-24"
                        width={500}
                        height={500}
                        />
                        <div className='mt-4 text-left w-full flex flex-col gap-2 pb-3 px-2'>
                            <h3 className="font-semibold text-xl text-green-700">{m.name}</h3>
                            <hr className='border border-gray-200 w-full' />
                            <p className="text-sm text-gray-600 uppercase">{m.role}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
