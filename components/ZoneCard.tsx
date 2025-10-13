// components/ZoneCard.tsx
"use client";

import Link from "next/link";

interface ApiSchool {
  id: number;
  slug: string;
  schoolName: string;
  zone: number | null;
  schoolAddress?: string | null;
  phone?: string | null;
  email?: string | null;
}

interface Zone {
  id: number;
  name: string;
  schools: ApiSchool[];
}

interface ZoneCardProps {
  zone: Zone;
  isOpen: boolean;
  onToggle: () => void;
}

export default function ZoneCard({ zone, isOpen, onToggle }: ZoneCardProps) {
  return (
    <div className="mb-4 border rounded-lg overflow-hidden">
      <button
        className="w-full bg-green-700 text-white py-3 px-4 flex justify-between items-center font-semibold cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center gap-2">
          <span>{zone.name}</span>
          <span className="bg-white text-green-700 px-2 py-0.5 rounded-md text-sm font-semibold">
            {zone.schools.length}
          </span>
        </div>
        <span>{isOpen ? "−" : "+"}</span>
      </button>

      {isOpen && (
        <div className="bg-white p-4">
          {zone.schools.length > 0 ? (
            <ol className="grid sm:grid-cols-2 gap-2 list-decimal pl-5">
              {zone.schools.map((school) => (
                <li key={school.id} className="text-green-700 hover:underline">
                  <Link href={`/zones/${school.slug}`}>{school.schoolName}</Link>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-gray-500 italic">No schools listed yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
