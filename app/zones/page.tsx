// app/zones/page.tsx
"use client";

import HeroZones from '@/components/HeroZones'
import ZoneStatistics from '@/components/ZoneStatistics'
import ZoneList from '@/components/ZoneList'
import SchoolFinder from '@/components/SchoolFinder'

export default function Zones() {
  return (
    <main className="bg-white text-gray-900">
      <HeroZones />
      <div className="max-w-6xl mx-auto px-4 pt-12 pb-8">
        <ZoneStatistics />
      </div>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <ZoneList />
      </div>
      <div className="max-w-6xl mx-auto px-4 py-16">
        <SchoolFinder />
      </div>
    </main>
  )
}
