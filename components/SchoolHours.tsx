import { School } from "@/types/school";

export default function SchoolHours({ school }: { school: School }) {
  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">School Hours</h3>
      <ul className="space-y-2 text-gray-700">
        {school.hours.map((h, idx) => (
          <li key={idx}>
            <strong>{h.days}:</strong> {h.time}
          </li>
        ))}
      </ul>
    </div>
  );
}
