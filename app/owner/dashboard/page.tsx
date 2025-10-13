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
}

export default function OwnerDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [schools, setSchools] = useState<School[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (status === "authenticated") fetchOwnerSchools();
  }, [status]);

  const fetchOwnerSchools = async () => {
    const res = await fetch("/api/owner/schools");
    if (res.ok) {
      const data = await res.json();
      setSchools(data);
    }
  };

  if (status === "loading")
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  return (
    <div className="min-h-screen bg-green-50 py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-green-700 mb-4">
          Welcome, {session?.user?.name || "School Owner"}
        </h1>
        <p className="text-gray-600 mb-6">
          Here are your registered schools and their details.
        </p>

        {schools.length === 0 ? (
          <p className="text-center text-gray-500">
            You haven’t added any schools yet.
          </p>
        ) : (
          <div className="space-y-6">
            {schools.map((school) => (
              <div
                key={school.id}
                className="border rounded-lg p-5 bg-green-50 hover:bg-green-100 transition"
              >
                <h2 className="text-lg font-semibold text-green-800 mb-2">
                  {school.schoolName}
                </h2>
                <p className="text-sm text-gray-700">
                  <strong>Address:</strong> {school.schoolAddress}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Zone:</strong> {school.zone}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Portfolio:</strong> {school.portfolio}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Founded:</strong> {school.founded ?? "—"}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Students:</strong> {school.students ?? "—"}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Staff:</strong> {school.staff ?? "—"}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Tuition Range:</strong> {school.tuitionRange ?? "—"}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Email:</strong> {school.email ?? "—"}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Phone:</strong> {school.phone ?? "—"}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Website:</strong> {school.website ?? "—"}
                </p>
                <p className="text-sm text-gray-700 mt-2">
                  <strong>About:</strong>{" "}
                  {school.about || "No description provided."}
                </p>

                {/* Programs */}
                <div className="mt-3">
                  <strong className="text-gray-700 text-sm block mb-1">
                    Programs Offered:
                  </strong>
                  <div className="flex flex-wrap gap-2">
                    {school.programs?.length ? (
                      school.programs.map((p) => (
                        <span
                          key={p}
                          className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full"
                        >
                          {p}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm">—</span>
                    )}
                  </div>
                </div>

                {/* Facilities */}
                <div className="mt-3">
                  <strong className="text-gray-700 text-sm block mb-1">
                    Facilities:
                  </strong>
                  <div className="flex flex-wrap gap-2">
                    {school.facilities?.length ? (
                      school.facilities.map((f) => (
                        <span
                          key={f}
                          className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
                        >
                          {f}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm">—</span>
                    )}
                  </div>
                </div>

                <p className="text-sm text-gray-700 mt-3">
                  <strong>Created:</strong>{" "}
                  {new Date(school.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
