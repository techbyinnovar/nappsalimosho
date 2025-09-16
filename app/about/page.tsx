import CoreValues from '@/components/CoreValues'
import HeroAbout from '@/components/HeroAbout'
import Image from 'next/image'
import napps from '../../public/images/3.jpg'
import { FaMapPin } from "react-icons/fa";
import Purpose from '@/components/Purpose';
import Activities from '@/components/Activities';
import Executives from '@/components/Executives';
import PastExecutives from '@/components/PastExecutives';
import Sponsors from '@/components/Sponsors';

export default function About() {
  const scopes = ["Agbado/Oke-Odo", "Egbe/Idimu", "Igando/Ikotun", "Ipaja/Ayobo", "Mosan/Okunola", "Alimosho LCDA"]
  return (
    <div className='m-0 p-0'>
        <HeroAbout />

        {/* Who We Are */}
        <div className='text-center py-24 px-6 md:px-24 mx-auto max-w-6xl'>
          <h2 className="text-2xl md:text-5xl font-medium text-center mb-2 text-green-800">Who We Are</h2>
          <p className='text-gray-600 text-2xl md:text-3xl leading-snug'>The National Association of Proprietors of Private Schools (NAPPS), Alimosho Chapter is the umbrella body that brings together all registered private school owners within Alimosho Local Government Area of Lagos State, with the purpose of ensuring quality and standard in private education delivery.</p>
        </div>

        {/* Parent Body */}
        <div className="py-16 px-6 md:px-24">
          <div className='bg-[#EDFBEE] rounded-3xl p-6 md:p-12 flex flex-col md:flex-row items-center justify-between gap-24 mx-auto'>
            <div className="text-left w-1/2">
              <h2 className="text-2xl md:text-5xl font-medium mb-6 text-green-800">About The Parent Body</h2>
              <p className="text-gray-600 text-lg">
              The National Association of Proprietors of Private Schools (NAPPS) is the apex association of private school owners in Nigeria. <br/>
              NAPPS was created to promote the welfare and interaction of proprietors of private schools and the advancement of quality educational services in the country. <br/>
              NAPPS is a nationwide association that represents the interests of private school owners across Nigeria.
              </p>
            </div>
            <Image src={napps} alt='napps' className='rounded-2xl w-1/2' />
          </div>
        </div>

        {/* Scope */}
        <div className="py-20 px-6 md:px-24 flex flex-col md:flex-row gap-12 justify-between items-start">
          <div className='md:w-[40%]'>
            <h2 className="text-2xl md:text-5xl font-medium mb-6 text-green-800">Our Scope</h2>
            <p className='text-3xl text-gray-600'>The Alimosho Chapter covers all private schools in the six LCDAs within Alimosho LGA.</p>
          </div>
          <div className="grid grid-cols-2 gap-6 text-center">
            {scopes.map((scope, idx) => (
            <div key={idx} className="bg-[#FDFCC8] rounded-xl p-6 relative flex flex-col items-center gap-4">
              <FaMapPin className="mx-auto text-2xl text-green-800 absolute -top-3"/>
              <p className='font-normal text-gray-800 text-2xl'>{scope}</p>
            </div>
            ))}
          </div>   
        </div>

        <Purpose />
        <CoreValues />
        <Activities />
        <Executives />
        <PastExecutives />
        <Sponsors />
    </div>
  )
}
