// components/SchoolHours.tsx
import { Prisma } from "@prisma/client";
import { School } from "@/types/school";
import { SafeSchool } from "@/types/school";

export default function SchoolHours({ school }: { school: SafeSchool }) {
  let hours: { days: string; time: string }[] = [];

  try {
    if (Array.isArray(school.hours)) {
      hours = school.hours as any[];
    } else if (typeof school.hours === "string") {
      hours = JSON.parse(school.hours);
    }
  } catch {
    hours = [];
  }

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">School Hours</h3>
      {hours.length > 0 ? (
        <ul className="space-y-2 text-gray-700">
          {hours.map((h, idx) => (
            <li key={idx}>
              <strong>{h.days}:</strong> {h.time}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-sm">School hours not available.</p>
      )}
    </div>
  );
}
