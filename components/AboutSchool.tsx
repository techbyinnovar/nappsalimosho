// components/AboutSchool.tsx
import * as Icons from "lucide-react";
import { SafeSchool } from "@/types/school";

export default function AboutSchool({ school }: { school: SafeSchool }) {
  const highlights = Array.isArray(school.highlights) ? school.highlights : [];

  return (
    <section className="bg-white shadow rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">About {school.schoolName}</h2>
      {school.about && <p className="text-gray-600 mb-6">{school.about}</p>}

      {highlights.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6">
          {highlights.map((item: any, idx: number) => {
            const Icon = (Icons as any)[item.icon];
            return (
              <div key={idx} className="flex gap-3">
                {Icon && <Icon className="w-6 h-6 text-green-600" />}
                <div>
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
