// components/ZoneList.tsx
"use client";

import { useEffect, useState } from "react";
import ZoneCard from "./ZoneCard";
import { zones as centralZones } from "@/data/schools";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type ApiSchool = {
  id: number;
  slug: string;
  schoolName: string;
  zone: number | null;
  schoolAddress?: string | null;
  phone?: string | null;
  email?: string | null;
};

type ZoneWithSchools = {
  id: number;
  name: string;
  schools: ApiSchool[];
};

export default function ZoneList() {
  const [openZone, setOpenZone] = useState<number | null>(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [zones, setZones] = useState<ZoneWithSchools[]>(
    centralZones.map((z) => ({ ...z, schools: [] }))
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async (term?: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/zones${term ? `?search=${term}` : ""}`);
      if (!res.ok) throw new Error("Failed to fetch schools");
      const apiSchools: ApiSchool[] = await res.json();

      // Group schools by their numeric zone
      const merged: ZoneWithSchools[] = centralZones.map((z) => {
        const matching = apiSchools.filter((s) => s.zone === z.id);
        return { ...z, schools: matching };
      });

      // Add "Unzoned" bucket for schools without zone
      const unzoned = apiSchools.filter((s) => s.zone === null);
      if (unzoned.length > 0) {
        merged.push({ id: 999, name: "Unzoned", schools: unzoned });
      }

      setZones(merged);
    } catch (err) {
      console.error("Error loading zone schools:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => fetchSchools(searchTerm);

  return (
    <div>
      <div className="flex items-center justify-between mb-2 w-full flex-col md:flex-row gap-4">
        <h2 className="font-medium text-2xl text-gray-800 mb-6">
          View All Zones
        </h2>
        <div className="flex items-center justify-end mb-6">
          <input
            type="text"
            placeholder="Search zones or schools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-[300px] focus:outline-none focus:ring-1 focus:ring-green-700"
          />
          <button
            onClick={handleSearch}
            className="flex items-center justify-between ml-2 bg-green-700 text-white px-4 py-2 rounded-lg shadow hover:bg-green-800 transition cursor-pointer"
          >
            Search <MagnifyingGlassIcon className="w-5 h-5 ml-1" />
          </button>
        </div>
      </div>

      {loading && <p className="text-sm text-gray-500 mb-4">Loading schools…</p>}

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

