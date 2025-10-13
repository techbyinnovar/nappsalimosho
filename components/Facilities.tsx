// components/Facilities.tsx
import { SafeSchool } from "@/types/school";

export default function FacilitiesPrograms({ school }: { school: SafeSchool }) {
  const programs = Array.isArray(school.programs) ? school.programs : [];
  const facilities = Array.isArray(school.facilities) ? school.facilities : [];

  return (
    <section className="bg-white shadow rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">Facilities & Programs</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-semibold mb-2">Academic Programs</h4>
          {programs.length > 0 ? (
            <ul className="space-y-1 text-gray-700">
              {programs.map((prog, idx) => (
                <li key={idx}>✔ {prog}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No programs listed.</p>
          )}
        </div>
        <div>
          <h4 className="font-semibold mb-2">Facilities</h4>
          {facilities.length > 0 ? (
            <ul className="space-y-1 text-gray-700">
              {facilities.map((fac, idx) => (
                <li key={idx}>✔ {fac}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No facilities listed.</p>
          )}
        </div>
      </div>
    </section>
  );
}
