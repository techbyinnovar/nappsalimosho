
export default function ZoneStatistics() {
    const zones = [
        { id: 1, schools: 56 },
        { id: 2, schools: 39 },
        { id: 3, schools: 36 },
        { id: 4, schools: 70 },
        { id: 5, schools: 70 },
        { id: 6, schools: 70 },
        { id: 7, schools: 70 },
    ];
    return (
        <div className="text-center pt-12">
            <div>
                <h2 className="text-2xl md:text-5xl font-medium text-center mb-2 text-green-800">Zone Statistics</h2>
                <p className="text-center text-gray-600 text-xl max-w-3xl mx-auto mb-12">Overview of registered schools across all zones.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-4">
                {zones.map((zone) => (
                <div
                    key={zone.id}
                    className="bg-white hover:bg-[#EDFBEE] border border-gray-200 shadow-sm rounded-lg py-6"
                >
                    <h3 className="text-lg font-semibold text-green-800">
                    ZONE {zone.id}
                    </h3>
                    <p className="mt-2 text-gray-800 font-bold text-xl">
                    {zone.schools}
                    </p>
                    <p className="text-sm text-gray-500">Schools</p>
                </div>
                ))}
            </div>
        </div>
    );
}
