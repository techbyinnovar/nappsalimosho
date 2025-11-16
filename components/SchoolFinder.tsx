"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import logo from '../public/images/logo.png';
// import { School } from "@/types/school";

type School = {
    id: string;
    name: string;
    level: "Primary" | "Junior Secondary" | "Senior Secondary" | "All";
    type: "Day" | "Boarding" | "Montessori" | "Mixed";
    location: string;
    zone: string;
    rating: number;
    fee: number;
    img: any;
    description: string;
    distanceKm?: number;
    phone?: string;
    email?: string;
};

const SCHOOLS: School[] = [
  {
    id: "s1",
    name: "Glatet International School",
    level: "Primary",
    type: "Day",
    location: "Alimosho - Egbeda",
    zone: "Egbeda",
    rating: 4.6,
    fee: 45000,
    img: logo,
    description: "Holistic primary education, strong literacy program.",
    distanceKm: 1.2,
    phone: "+2348012345678",
    email: "info@glatet.edu.ng",
  },
  {
    id: "s2",
    name: "Evergrowing Academy",
    level: "All",
    type: "Mixed",
    location: "Alimosho - Iyana-Ipaja",
    zone: "Iyana-Ipaja",
    rating: 4.3,
    fee: 65000,
    img: logo,
    description: "Large campus, experienced staff, extracurriculars.",
    distanceKm: 2.8,
    phone: "+2348098765432",
    email: "hello@evergrowing.edu.ng",
  },
  {
    id: "s3",
    name: "Pharos Montessori",
    level: "Primary",
    type: "Montessori",
    location: "Alimosho - Idimu",
    zone: "Idimu",
    rating: 4.9,
    fee: 85000,
    img: logo,
    description: "Montessori pedagogy with child-centred learning spaces.",
    distanceKm: 0.9,
    phone: "+2348022223344",
    email: "admissions@pharos.edu.ng",
  },
  {
    id: "s4",
    name: "Highrise College",
    level: "Junior Secondary",
    type: "Boarding",
    location: "Alimosho - Ipaja",
    zone: "Ipaja",
    rating: 4.2,
    fee: 120000,
    img: logo,
    description: "Strong STEM program and boarding facilities.",
    distanceKm: 4.5,
    phone: "+2348081112233",
    email: "contact@highrise.edu.ng",
  },
  {
    id: "s5",
    name: "Divine Favour School",
    level: "All",
    type: "Day",
    location: "Alimosho - Idera",
    zone: "Idera",
    rating: 4.0,
    fee: 38000,
    img: logo,
    description: "Community-focused school with affordable fees.",
    distanceKm: 3.4,
    phone: "+2348073334455",
    email: "info@divinefavour.edu.ng",
  },
  {
    id: "s6",
    name: "Michael Ajibade Montessori",
    level: "Primary",
    type: "Montessori",
    location: "Alimosho - Iyana-Ipaja",
    zone: "Iyana-Ipaja",
    rating: 4.7,
    fee: 72000,
    img: logo,
    description: "Montessori methods with outdoor play spaces.",
    distanceKm: 2.1,
    phone: "+2348064445566",
    email: "admissions@ma-montessori.edu.ng",
  },
];

const ZONES = ["All", "Egbeda", "Iyana-Ipaja", "Idimu", "Ipaja", "Idera"];

export default function SchoolFinder() {
    const [keyword, setKeyword] = useState("");
    const [location, setLocation] = useState("");
    const [zone, setZone] = useState<string>("All");
    const [level, setLevel] = useState<string>("All");
    const [type, setType] = useState<string>("All");
    const [visibleCount, setVisibleCount] = useState(4);

    const filtered = useMemo(() => {
        const k = keyword.trim().toLowerCase();
        return SCHOOLS.filter((s) => {
        if (zone !== "All" && s.zone !== zone) return false;
        if (level !== "All" && level !== "All" && s.level !== level) return false;
        if (type !== "All" && type !== "All" && s.type !== type) return false;
        if (location && !s.location.toLowerCase().includes(location.toLowerCase()))
            return false;
        if (
            k &&
            !(
            s.name.toLowerCase().includes(k) ||
            s.description.toLowerCase().includes(k) ||
            s.location.toLowerCase().includes(k)
            )
        )
            return false;
        return true;
        });
    }, [keyword, location, zone, level, type]);

    function clearFilters() {
        setKeyword("");
        setLocation("");
        setZone("All");
        setLevel("All");
        setType("All");
        setVisibleCount(4);
    }

    return (
        <section aria-labelledby="school-finder-heading" className="container mx-auto py-24 px-6 md:px-24">
            <h2 id="school-finder-heading" className="text-2xl md:text-5xl font-medium text-center mb-2 text-green-800">
                NAPPS School Finder
            </h2>
            <p className="text-center text-gray-600 text-xl max-w-3xl mx-auto mb-10">Search and filter member schools. Try entering an area, school name or select filters below.</p>

            {/* Search & Filters */}
            <div className="bg-white shadow rounded-xl p-4 md:p-10 max-w-5xl mx-auto flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
                    <label className="flex items-center col-span-1">
                        <span className="sr-only">Search keyword</span>
                        <div className="relative w-full">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" aria-hidden>
                                <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <input
                                type="search"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                placeholder="Search schools, programmes, keywords..."
                                className="w-full pl-10 pr-3 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-200"
                                aria-label="Search schools"
                            />
                        </div>
                    </label>

                    <label className="flex items-center gap-2 col-span-1">
                        <span className="sr-only">Location</span>
                        <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Location (eg. Egbeda)"
                        className="w-full px-3 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-200"
                        aria-label="Location"
                        />
                    </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
                    <select value={level} onChange={(e) => setLevel(e.target.value)} className="col-span-1 px-3 py-3 border rounded-full focus:outline-none">
                        <option value="All">All Levels</option>
                        <option value="Primary">Primary</option>
                        <option value="junior">Junior Secondary</option>
                        <option value="senior">Senior Secondary</option>
                    </select>

                    <select value={type} onChange={(e) => setType(e.target.value)} className="col-span-1 px-3 py-3 border rounded-full focus:outline-none">
                        <option value="All">All Types</option>
                        <option value="Day">Day</option>
                        <option value="Boarding">Boarding</option>
                        <option value="Montessori">Montessori</option>
                        <option value="Mixed">Mixed</option>
                    </select>

                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => { setVisibleCount(4); }}
                        className="flex-6 bg-green-700 text-white py-3 rounded-full hover:bg-green-800 text-lg cursor-pointer"
                        aria-label="Search"
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        Search
                    </button>
                    <button
                        onClick={clearFilters}
                        className="flex-1 px-3 py-3 border rounded-full cursor-pointer hover:bg-green-100"
                        aria-label="Clear filters"
                    >
                        Clear
                    </button>
                </div>
                {/* </div> */}

                {/* Zone chips */}
                <div className="mt-4 flex flex-wrap gap-2">
                {ZONES.map((z) => (
                    <button
                    key={z}
                    onClick={() => { setZone(z); setVisibleCount(4); }}
                    className={`px-3 py-1 text-sm rounded-full border cursor-pointer ${zone === z ? "bg-green-700 text-white border-green-700" : "bg-white text-gray-700"}`}
                    aria-pressed={zone === z}
                    >
                    {z}
                    </button>
                ))}
                </div>
            </div>

            {/* Results + Map */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-[1fr_420px] gap-6">
                {/* Results column */}
                <div>
                <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-gray-600">
                    Showing <strong>{Math.min(filtered.length, visibleCount)}</strong> of <strong>{filtered.length}</strong> result{filtered.length !== 1 ? "s" : ""}.
                    </p>
                    <div className="text-sm text-gray-500">Refine filters to narrow results</div>
                </div>

                <div className="space-y-4">
                    {filtered.length === 0 && (
                    <div className="bg-white border rounded-lg p-6 text-center text-gray-600">
                        No schools match your search. Try clearing filters or broaden your keyword.
                    </div>
                    )}

                    {filtered.slice(0, visibleCount).map((s) => (
                    <article key={s.id} className="bg-white border rounded-lg p-4 flex flex-col md:flex-row gap-4 items-start">
                        <div className="w-full md:w-40 h-28 relative flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                        <Image src={s.img} alt={s.name} fill sizes="(max-width: 768px) 100vw, 160px" className="object-cover" />
                        </div>

                        <div className="flex-1">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                            <h3 className="text-lg font-semibold text-green-800">{s.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                <span>{s.location}</span>
                                <span aria-hidden>•</span>
                                <span>{s.level}</span>
                                <span aria-hidden>•</span>
                                <span>{s.type}</span>
                            </div>
                            </div>

                            <div className="text-right">
                            <div className="flex items-center justify-end gap-1">
                                <StarRating rating={s.rating} />
                                <span className="text-sm text-gray-600">{s.rating.toFixed(1)}</span>
                            </div>
                            <div className="text-sm text-gray-600 mt-1">{s.distanceKm ? `${s.distanceKm} km` : "—"}</div>
                            </div>
                        </div>

                        <p className="text-gray-700 mt-3 text-sm">{s.description}</p>

                        <div className="mt-3 flex items-center gap-3 flex-wrap">
                            <span className="px-2 py-1 bg-green-50 text-green-800 text-sm rounded-full">₦{s.fee.toLocaleString()}</span>
                            <a href={`tel:${s.phone}`} className="text-sm underline text-green-700">Call</a>
                            <a href={`mailto:${s.email}`} className="text-sm underline text-green-700">Email</a>
                            <button className="ml-auto bg-white border px-3 py-1 rounded-lg text-sm hover:bg-gray-50">View</button>
                            <button className="bg-green-700 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-800">Contact</button>
                        </div>
                        </div>
                    </article>
                    ))}
                </div>

                {/* Load more */}
                {visibleCount < filtered.length && filtered.length > 0 && (
                    <div className="mt-4 text-center">
                    <button
                        onClick={() => setVisibleCount((v) => v + 4)}
                        className="px-4 py-2 rounded-lg border bg-white"
                    >
                        Load more results
                    </button>
                    </div>
                )}
                </div>

                {/* Map column */}
                <aside className="hidden md:block">
                <div className="sticky top-24">
                    <div className="h-80 md:h-[36rem] bg-gray-100 rounded-xl border flex items-center justify-center text-gray-500">
                    {/* Map placeholder - replace with a real map integration later */}
                    <div className="text-center">
                        <svg width="72" height="72" viewBox="0 0 24 24" fill="none" className="mx-auto mb-3" aria-hidden>
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="9" r="2.2" stroke="currentColor" strokeWidth="1.5"/>
                        </svg>
                        <div className="font-medium">Map preview</div>
                        <div className="text-sm text-gray-500">Map area (replace with Google Maps / Mapbox)</div>
                    </div>
                    </div>

                    {/* Mini top schools */}
                    <div className="mt-4 bg-white border rounded-xl p-3">
                    <h4 className="text-sm font-semibold mb-2">Top picks near you</h4>
                    <ul className="space-y-2">
                        {SCHOOLS.slice(0, 3).map((s) => (
                        <li key={s.id} className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded overflow-hidden relative">
                            <Image src={s.img} alt={s.name} fill className="object-cover" />
                            </div>
                            <div className="text-sm">
                            <div className="font-medium text-green-800">{s.name}</div>
                            <div className="text-gray-500">{s.zone} • ₦{s.fee.toLocaleString()}</div>
                            </div>
                        </li>
                        ))}
                    </ul>
                    </div>
                </div>
                </aside>
            </div>
        </section>
    );
}

/* Small star rating component */
function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const stars = Array.from({ length: 5 }).map((_, i) => {
    const idx = i + 1;
    if (idx <= full) return "full";
    if (idx === full + 1 && half) return "half";
    return "empty";
  });

  return (
    <div className="flex items-center gap-0.5" aria-hidden>
      {stars.map((s, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={s === "full" ? "currentColor" : "none"} className={`w-3.5 h-3.5 ${s === "full" ? "text-yellow-400" : "text-gray-300"}`}>
          <path d="M12 .587l3.668 7.431 8.2.857-6.014 5.676 1.814 8.109L12 18.896l-7.668 4.764 1.814-8.109L.132 8.875l8.2-.857L12 .587z" stroke="none" />
        </svg>
      ))}
    </div>
  );
}
