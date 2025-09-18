import Link from "next/link";
import { Zone } from "@/types/school";

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
            <span>{zone.name}</span>
            <span>{isOpen ? "−" : "+"}</span>
        </button>

        {isOpen && (
            <div className="bg-white p-4">
            {zone.schools.length > 0 ? (
                <ol className="grid sm:grid-cols-2 gap-2 list-decimal pl-5">
                {zone.schools.map((school) => (
                    <li key={school.id} className="text-green-700 hover:underline">
                    <Link href={`/zones/${school.id}`}>{school.name}</Link>
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

