interface ZoneCardProps {
    zone: { id: number; schools: string[] };
    isOpen: boolean;
    onToggle: () => void;
}

export default function ZoneCard({ zone, isOpen, onToggle }: ZoneCardProps) {
    return (
        <div className="mb-4 border rounded-lg overflow-hidden cursor-pointer">
            <button
                className="w-full bg-green-700 text-white py-3 px-4 flex justify-between items-center font-semibold"
                onClick={onToggle}
            >
                <span>ZONE {zone.id}</span>
                <span>{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && (
                <div className="bg-white p-4">
                {zone.schools.length > 0 ? (
                    <ol className="grid sm:grid-cols-2 gap-2 list-decimal pl-5">
                    {zone.schools.map((school, index) => (
                        <li key={index} className="text-green-700 hover:underline">
                        {school}
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
