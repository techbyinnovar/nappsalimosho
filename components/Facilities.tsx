import { School } from "@/types/school";

export default function FacilitiesPrograms({ school }: { school: School }) {
  return (
    <section className="bg-white shadow rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">Facilities & Programs</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h4 className="font-semibold mb-2">Academic Programs</h4>
          <ul className="space-y-1 text-gray-700">
            {school.programs.map((prog, idx) => (
              <li key={idx}>✔ {prog}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Facilities</h4>
          <ul className="space-y-1 text-gray-700">
            {school.facilities.map((fac, idx) => (
              <li key={idx}>✔ {fac}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
