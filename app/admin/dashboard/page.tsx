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
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  email?: string;
  phone?: string;
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
  const [filteredSchools, setFilteredSchools] = useState<School[]>([]);
  const [filter, setFilter] = useState<"ALL" | "PENDING" | "APPROVED" | "REJECTED">("ALL");
  const [view, setView] = useState<"table" | "grid">("table");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (status === "authenticated") fetchSchools();
  }, [status]);

  const fetchSchools = async () => {
    const res = await fetch("/api/admin/schools");
    if (res.ok) {
      const data = await res.json();
      setSchools(data);
      setFilteredSchools(data);
    }
  };

  const handleApproval = async (schoolId: number, approve: boolean) => {
    const res = await fetch("/api/admin/approve-school", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ schoolId, approve }),
    });

    if (res.ok) {
      alert(approve ? "School approved!" : "School rejected!");
      fetchSchools();
    } else {
      alert("Action failed. Try again.");
    }
  };

  const handleFilterChange = (value: "ALL" | "PENDING" | "APPROVED" | "REJECTED") => {
    setFilter(value);
    setCurrentPage(1);
    if (value === "ALL") setFilteredSchools(schools);
    else setFilteredSchools(schools.filter((s) => s.status === value));
  };

  const startIdx = (currentPage - 1) * perPage;
  const endIdx = startIdx + perPage;
  const paginated = filteredSchools.slice(startIdx, endIdx);

  if (status === "loading")
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  return (
    <div className="min-h-screen bg-green-50 py-10 px-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-green-700">
            Welcome, {session?.user?.name || "Admin"}
          </h1>

          <div className="flex items-center gap-4">
            <select
              value={filter}
              onChange={(e) =>
                handleFilterChange(e.target.value as "ALL" | "PENDING" | "APPROVED" | "REJECTED")
              }
              className="border border-green-600 text-green-700 px-3 py-2 rounded-md focus:ring-2 focus:ring-green-600 focus:outline-none"
            >
              <option value="ALL">All</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>

            <button
              onClick={() => setView(view === "table" ? "grid" : "table")}
              className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition"
            >
              Switch to {view === "table" ? "Grid" : "Table"} View
            </button>
          </div>
        </div>

        <p className="text-gray-600 mb-6">
          Review and manage school registrations below.
        </p>

        {/* Table View */}
        {view === "table" && (
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
                  <th className="py-2 px-4 text-left">Status</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((school) => (
                  <tr key={school.id} className="border-t hover:bg-green-50">
                    <td className="py-2 px-4">{school.schoolName}</td>
                    <td className="py-2 px-4">{school.zone}</td>
                    <td className="py-2 px-4">{school.portfolio}</td>
                    <td className="py-2 px-4">
                      {school.owner.firstName} {school.owner.lastName}
                    </td>
                    <td className="py-2 px-4">{school.owner.email}</td>
                    <td className="py-2 px-4">{school.phone || "—"}</td>
                    <td className="py-2 px-4 font-medium">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          school.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-700"
                            : school.status === "APPROVED"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {school.status}
                      </span>
                    </td>
                    <td className="py-2 px-4">
                      {school.status === "PENDING" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleApproval(school.id, true)}
                            className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleApproval(school.id, false)}
                            className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Grid View */}
        {view === "grid" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((school) => (
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
                <p className="text-sm text-gray-700">
                  <strong>Phone:</strong> {school.phone || "—"}
                </p>
                <p className="mt-2 text-sm font-medium">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      school.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : school.status === "APPROVED"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {school.status}
                  </span>
                </p>

                {school.status === "PENDING" && (
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleApproval(school.id, true)}
                      className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleApproval(school.id, false)}
                      className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {filteredSchools.length > perPage && (
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-green-700 text-green-700 rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <p className="text-gray-600">
              Page {currentPage} of {Math.ceil(filteredSchools.length / perPage)}
            </p>
            <button
              onClick={() =>
                setCurrentPage((p) =>
                  p < Math.ceil(filteredSchools.length / perPage) ? p + 1 : p
                )
              }
              disabled={currentPage === Math.ceil(filteredSchools.length / perPage)}
              className="px-4 py-2 border border-green-700 text-green-700 rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

        {filteredSchools.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No schools found.</p>
        )}
      </div>
    </div>
  );
}
