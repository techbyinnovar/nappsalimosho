import Image from 'next/image';
import hero from '../public/images/hero.png';
import { CheckIcon } from '@heroicons/react/24/outline';

export default function WhatWeDo() {
    return (
        <section className="container mx-auto pb-28 pt-12 px-6 md:px-24">
            <h2 className="text-2xl md:text-5xl font-medium text-center mb-2 text-green-800">
                What We Do
            </h2>
            <p className="text-center text-gray-600 text-xl max-w-3xl mx-auto mb-18">Our activities that make us relevant.</p>
            <div className='flex justify-center items-center flex-col md:flex-row gap-10 md:gap-0'>
                <ul className="space-y-4 text-gray-700 w-full text-lg md:w-[40%]">
                    <li className='flex items-center justify-start gap-3'><CheckIcon className='w-5 text-green-800' />Organizing training sessions for school proprietors.</li>
                    <li className='flex items-center justify-start gap-3'><CheckIcon className='w-5 text-green-800' />Advocating quality education in Alimosho.</li>
                    <li className='flex items-center justify-start gap-3'><CheckIcon className='w-5 text-green-800' />Promoting unity among private school owners.</li>
                    <li className='flex items-center justify-start gap-3'><CheckIcon className='w-5 text-green-800' />Encouraging innovation in private school teaching.</li>
                </ul>
                <Image
                    src={hero}
                    alt="What We Do" 
                    className="w-full h-56 md:h-auto rounded-xl shadow-sm md:w-[40%]"
                />
            </div>
        </section>
    );
}
