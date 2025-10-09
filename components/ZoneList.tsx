import { useState } from "react";
import ZoneCard from "./ZoneCard";
import { zones } from "@/data/schools"; // use central data
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function ZoneList() {
  const [openZone, setOpenZone] = useState<number | null>(1);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <div className="flex items-center justify-between mb-2 w-full flex-col md:flex-row gap-4">
        <h2 className="font-medium text-2xl text-gray-800 mb-6">View All Zones</h2>
        <div className="flex items-center justify-end mb-6">
          <input
            type="text"
            placeholder="Search zones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-[300px] focus:outline-none focus:ring-1 focus:ring-green-700"
          />
          <button className="flex items-center justify-between ml-2 bg-green-700 text-white px-4 py-2 w-1/3 rounded-lg shadow hover:bg-green-800 transition cursor-pointer">
            Search <MagnifyingGlassIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {zones.map((zone) => (
        <ZoneCard
          key={zone.id}
          zone={zone}
          isOpen={openZone === zone.id}
          onToggle={() => setOpenZone(openZone === zone.id ? null : zone.id)}
        />
      ))}
    </div>
  );
}
