import React from 'react'
import Image from 'next/image';
import mike from '../public/images/executives/mike.jpg'
import esther from '../public/images/executives/esther.jpg'
import alfred from '../public/images/executives/alfred.jpg'
import sunday from '../public/images/executives/sunday.jpg'
import falohun from '../public/images/executives/falohun.jpg'
import agnes from '../public/images/executives/agnes.jpg'
import halima from '../public/images/executives/halima.jpg'
import kemi from '../public/images/executives/kemi.jpg'
import adebayo from '../public/images/executives/adebayo.jpg'
import uche from '../public/images/executives/uche.jpg'
import aloma from '../public/images/executives/aloma.jpg'
import segun from '../public/images/executives/segun.jpg'

export default function Executives() {
    const members = [
        { name: "Prince Mike Adesayo Adewoye", role: "Chairman", img: mike },
        { name: "Mrs Aliu Esther Shola", role: "Vice Chairman", img: esther },
        { name: "Pst. Babajide Sunday Olusola", role: "General Secretary", img: alfred },
        { name: "Mr. Igho Alfred Otomewo", role: "Asst. General Secretary", img: sunday },
        { name: "Mrs. Falohun Oludolapo", role: "Treasurer", img: falohun },
        { name: "(Dr.) Adedoyin Segun Samson", role: "Financial Secretary", img: segun },
        { name: "Aloma Doreen Ugochi", role: "Financial Secretary 2", img: aloma },
        { name: "Mrs. Adebayo Comfort Kemi", role: "Welfare 1", img: kemi },
        { name: "Maduekwe Uchenna", role: "Welfare 2", img: uche },
        { name: "Adebayo Olusegun Michael", role: "P.R.O 1", img: adebayo },
        { name: "Fatunbi Agnes Abosede", role: "P.R.O 2", img: agnes },
        { name: "Mrs. Namama Esther Halima", role: "Social Organizing Officer", img: halima },
    ];
    return (
        <div className="pb-0 px-6 md:px-24 relative -top-40 bottom-0">
            <div>
                <h2 className="text-2xl md:text-5xl font-medium text-center mb-2 text-green-800">Meet The Executives</h2>
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
