"use client";

import HeroEvents from '@/components/HeroEvents'
import EventCategories from '@/components/EventCategories'
import UpcomingEvents from '@/components/UpcomingEvents'
import PastEvents from '@/components/PastEvents'

export default function Events() {
  return (
    <main className="bg-white text-gray-900">
      <HeroEvents />
      <section className="max-w-6xl mx-auto px-4 py-16">
        <UpcomingEvents />
      </section>
      <section className="max-w-7xl mx-auto px-4 py-16">
        <EventCategories />
      </section>
      <section className="max-w-6xl mx-auto px-4 py-16">
        <PastEvents />
      </section>
      <section className="bg-green-50 py-16">
        <div className="text-center max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-5xl font-medium text-center mb-2 text-green-800">
            Ready to Join Our Next Event?
          </h2>
          <p className="text-gray-600 mb-10 max-w-3xl md:text-xl text-lg mx-auto">
            Stay updated with our latest events and never miss an opportunity to
            grow your educational network.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-green-700 cursor-pointer text-white px-6 py-3 rounded-lg shadow hover:bg-green-800 transition">
              Become a Member
            </button>
            <button className="bg-transparent cursor-pointer border border-green-700 text-green-700 px-6 py-3 rounded-lg shadow hover:bg-green-50 transition">
              Subscribe to Updates
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
