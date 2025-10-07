"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface School {
  id: number;
  schoolName: string;
  schoolAddress: string;
  zone: string;
  portfolio: string;
  founded?: number | null;
  students?: number | null;
  staff?: number | null;
  tuitionRange?: string | null;
  email?: string | null;
  phone?: string | null;
  website?: string | null;
  about?: string | null;
  programs?: string[];
  facilities?: string[];
  createdAt: string;
  owner: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [schools, setSchools] = useState<School[]>([]);
  const [view, setView] = useState<"table" | "grid">("table");

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (status === "authenticated") fetchSchools();
  }, [status]);

  const fetchSchools = async () => {
    const res = await fetch("/api/admin/schools");
    if (res.ok) {
      const data = await res.json();
      setSchools(data);
    }
  };

  if (status === "loading")
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  return (
    <div className="min-h-screen bg-green-50 py-10 px-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-green-700">
            Welcome, {session?.user?.name || "Admin"}
          </h1>
          <button
            onClick={() => setView(view === "table" ? "grid" : "table")}
            className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition"
          >
            Switch to {view === "table" ? "Grid" : "Table"} View
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Here’s an overview of all registered schools and their owners.
        </p>

        {view === "table" ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-md">
              <thead className="bg-green-700 text-white">
                <tr>
                  <th className="py-2 px-4 text-left">School Name</th>
                  <th className="py-2 px-4 text-left">Zone</th>
                  <th className="py-2 px-4 text-left">Portfolio</th>
                  <th className="py-2 px-4 text-left">Owner</th>
                  <th className="py-2 px-4 text-left">Email</th>
                  <th className="py-2 px-4 text-left">Phone</th>
                  <th className="py-2 px-4 text-left">Programs</th>
                  <th className="py-2 px-4 text-left">Facilities</th>
                </tr>
              </thead>
              <tbody>
                {schools.map((school) => (
                  <tr key={school.id} className="border-t hover:bg-green-50">
                    <td className="py-2 px-4">{school.schoolName}</td>
                    <td className="py-2 px-4">{school.zone}</td>
                    <td className="py-2 px-4">{school.portfolio}</td>
                    <td className="py-2 px-4">
                      {school.owner.firstName} {school.owner.lastName}
                    </td>
                    <td className="py-2 px-4">{school.owner.email}</td>
                    <td className="py-2 px-4">{school.phone || "—"}</td>
                    <td className="py-2 px-4 text-sm">
                      {school.programs?.join(", ") || "—"}
                    </td>
                    <td className="py-2 px-4 text-sm">
                      {school.facilities?.join(", ") || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schools.map((school) => (
              <div
                key={school.id}
                className="border rounded-lg p-5 bg-green-50 hover:bg-green-100 transition"
              >
                <h2 className="text-lg font-semibold text-green-800 mb-1">
                  {school.schoolName}
                </h2>
                <p className="text-sm text-gray-700 mb-2">{school.schoolAddress}</p>
                <p className="text-sm text-gray-700">
                  <strong>Zone:</strong> {school.zone}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Owner:</strong> {school.owner.firstName} {school.owner.lastName}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Email:</strong> {school.owner.email}
                </p>

                <div className="mt-3">
                  <strong className="block text-sm text-gray-700">Programs:</strong>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {school.programs?.length ? (
                      school.programs.map((p) => (
                        <span
                          key={p}
                          className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                        >
                          {p}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm">—</span>
                    )}
                  </div>
                </div>

                <div className="mt-3">
                  <strong className="block text-sm text-gray-700">Facilities:</strong>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {school.facilities?.length ? (
                      school.facilities.map((f) => (
                        <span
                          key={f}
                          className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                        >
                          {f}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm">—</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {schools.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            No schools registered yet.
          </p>
        )}
      </div>
    </div>
  );
}
