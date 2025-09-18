import * as Icons from "lucide-react";
import { School } from "@/types/school";

export default function AboutSchool({ school }: { school: School }) {
  return (
    <section className="bg-white shadow rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">About {school.name}</h2>
      {school.about.map((para, idx) => (
        <p key={idx} className="text-gray-600 mb-6">{para}</p>
      ))}

      <div className="grid md:grid-cols-2 gap-6">
        {school.highlights.map((item, idx) => {
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
    </section>
  );
}
