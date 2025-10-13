import { MapPin, Phone, Mail, Globe } from "lucide-react";
import { SafeSchool } from "@/types/school";

export default function ContactInfo({ school }: { school: SafeSchool }) {
  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
      <ul className="space-y-3 text-gray-700">
        <li className="flex items-start gap-2"><MapPin className="w-5 h-5 text-green-600" /> <span>{school.schoolAddress}</span></li>
        <li className="flex items-start gap-2"><Phone className="w-5 h-5 text-green-600" /> <span>{school.phone}</span></li>
        <li className="flex items-start gap-2"><Mail className="w-5 h-5 text-green-600" /> <span>{school.email}</span></li>
        <li className="flex items-start gap-2"><Globe className="w-5 h-5 text-green-600" /> <span>{school.website}</span></li>
      </ul>
    </div>
  );
}
