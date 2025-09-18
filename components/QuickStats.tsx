import { School } from "@/types/school";

export default function QuickStats({ school }: { school: School }) {
  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
      <ul className="space-y-2 text-gray-700">
        <li><strong>Founded:</strong> {school.founded}</li>
        <li><strong>Total Students:</strong> {school.students}</li>
        <li><strong>Total Staff:</strong> {school.staff}</li>
        <li><strong>Tuition Range:</strong> {school.tuitionRange}</li>
      </ul>
    </div>
  );
}
