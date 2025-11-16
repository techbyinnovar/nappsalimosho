// app/admin/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaEdit, FaTrash, FaToggleOn, FaToggleOff } from "react-icons/fa";
import RegisterSchoolModal from "@/components/RegisterSchoolModal";

interface Owner {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

interface School {
  owner: Owner;
  
  id: number;
  schoolName: string;
  schoolAddress: string;
  zone: string;
  portfolio: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  email?: string;
  phone?: string;
  students?: string;
  staff?: string;
  founded?: string;
  tuitionRange?: string;
  website?: string;
  programs?: string[];
  facilities?: string[];
  logoUrl?: string | null;
  galleryUrls?: string[];
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

  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleDisable = async (schoolId: number) => {
    const confirmed = window.confirm("Are you sure you want to disable this school?");
    if (!confirmed) return;

    try {
      const res = await fetch("/api/admin/disable-school", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schoolId }),
      });

      const json = await res.json();
      if (!res.ok) {
        alert(json?.error || "Failed to disable school.");
        return;
      }

      alert("School disabled!");
      fetchSchools();
    } catch (err) {
      console.error(err);
      alert("Network error. Try again.");
    }
  };

  const handleDelete = async (schoolId: number) => {
    const confirmed = window.confirm("Are you sure you want to permanently delete this school?");
    if (!confirmed) return;

    try {
      const res = await fetch("/api/admin/delete-school", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schoolId }),
      });

      const json = await res.json();
      if (!res.ok) {
        alert(json?.error || "Failed to delete school.");
        return;
      }

      alert("School deleted!");
      fetchSchools();
    } catch (err) {
      console.error(err);
      alert("Network error. Try again.");
    }
  };

  const handleEdit = (schoolId: number) => {
    const school = schools.find((s) => s.id === schoolId);
    if (!school) return alert("School not found.");
    setSelectedSchool(school);
    setModalMode("edit");
    setIsModalOpen(true);
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
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-md">
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
              className="cursor-pointer border border-green-600 text-green-700 px-3 py-2 rounded-md focus:ring-2 focus:ring-green-600 focus:outline-none"
            >
              <option value="ALL">All</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>

            <button
              onClick={() => setView(view === "table" ? "grid" : "table")}
              className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition cursor-pointer"
            >
              Switch to {view === "table" ? "Grid" : "Table"} View
            </button>
          </div>
        </div>

        <p className="text-gray-600 mb-6">
          Review and manage school registrations below.
        </p>

        {/* ========================== TABLE VIEW ========================== */}
        {view === "table" && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-xl">
              <thead className="bg-green-700 text-white">
                <tr>
                  <th className="py-2 px-4 text-left">Logo</th>
                  <th className="py-2 px-4 text-left">School Name</th>
                  <th className="py-2 px-4 text-left">Address</th>
                  <th className="py-2 px-4 text-left">Zone</th>
                  <th className="py-2 px-4 text-left">School Email</th>
                  <th className="py-2 px-4 text-left">School Phone</th>
                  <th className="py-2 px-4 text-left">Status</th>
                  <th className="py-2 px-4 text-left">Owner Name</th>
                  <th className="py-2 px-4 text-left">Owner Email</th>
                  <th className="py-2 px-4 text-left">Owner Phone</th>
                  <th className="py-2 px-4 text-left">Portfolio</th>
                  <th className="py-2 px-4 text-left">Students</th>
                  <th className="py-2 px-4 text-left">Staff</th>
                  <th className="py-2 px-4 text-left">Year Founded</th>
                  <th className="py-2 px-4 text-left">Programs</th>
                  <th className="py-2 px-4 text-left">Facilities</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((school) => (
                  <tr key={school.id} className="border-t border-gray-300 hover:bg-green-50">
                    <td className="py-2 px-4">
                      {school.logoUrl ? (
                        <img
                          src={school.logoUrl}
                          alt="School Logo"
                          className="w-12 h-12 object-cover rounded-md border"
                        />
                      ) : (
                        <span className="text-gray-400">No Image</span>
                      )}
                    </td>
                    <td className="py-2 px-4">{school.schoolName}</td>
                    <td className="py-2 px-4">{school.schoolAddress}</td>
                    <td className="py-2 px-4">{school.zone}</td>
                    <td className="py-2 px-4">{school.email || "—"}</td>
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
                      {school.owner
                      ? `${school.owner.firstName} ${school.owner.lastName}`
                      : "—"}
                    </td>
                    <td className="py-2 px-4">{school.owner?.email || "—"}</td>
                    <td className="py-2 px-4">{school.owner?.phone || "—"}</td>
                    <td className="py-2 px-4">{school.portfolio}</td>
                    <td className="py-2 px-4">{school.students || "—"}</td>
                    <td className="py-2 px-4">{school.staff || "—"}</td>
                    <td className="py-2 px-4">{school.founded || "—"}</td>
                    <td className="py-2 px-4">{school.programs || "—"}</td>
                    <td className="py-2 px-4">{school.facilities || "—"}</td>
                    <td className="py-2 px-4">
                      {school.status === "PENDING" ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleApproval(school.id, true)}
                            className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 cursor-pointer"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleApproval(school.id, false)}
                            className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 cursor-pointer"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-3 text-green-700 text-xl">
                          <FaEdit
                            onClick={() => handleEdit(school.id)}
                            className="cursor-pointer hover:text-green-800"
                            title="Edit School"
                          />
                          <FaTrash
                            onClick={() => handleDelete(school.id)}
                            className="cursor-pointer hover:text-red-700"
                            title="Delete School"
                          />
                          {school.status === "APPROVED" ? (
                            <FaToggleOn
                              onClick={() => handleDisable(school.id)}
                              className="cursor-pointer hover:text-yellow-600"
                              title="Disable School"
                            />
                          ) : (
                            <FaToggleOff
                              onClick={() => handleApproval(school.id, true)}
                              className="cursor-pointer hover:text-green-700"
                              title="Enable School"
                            />
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ========================== GRID VIEW ========================== */}
        {view === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((school) => (
              <div
                key={school.id}
                className="border rounded-lg shadow-sm hover:shadow-md transition bg-white overflow-hidden"
              >
                {school.logoUrl && (
                  <img
                    src={school.logoUrl}
                    alt={school.schoolName}
                    className="w-full h-40 object-cover border-b"
                  />
                )}
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-green-700 mb-1">
                    {school.schoolName}
                  </h2>
                  <p className="text-gray-600 text-sm mb-2">{school.schoolAddress}</p>
                  <p className="text-gray-700 text-sm">
                    <strong>Zone:</strong> {school.zone}
                  </p>
                  <p className="text-gray-700 text-sm">
                    <strong>Portfolio:</strong> {school.portfolio}
                  </p>
                  <p className="text-gray-700 text-sm">
                    <strong>Owner:</strong> {school.owner.firstName} {school.owner.lastName}
                  </p>
                  <p className="text-gray-700 text-sm">
                    <strong>Email:</strong> {school.owner.email}
                  </p>
                  <p className="text-gray-700 text-sm">
                    <strong>Phone:</strong> {school.owner.phone || "—"}
                  </p>
                  <p className="text-gray-700 text-sm mt-1">
                    <strong>School Email:</strong> {school.email || "—"}
                  </p>
                  <p className="text-gray-700 text-sm mb-2">
                    <strong>School Phone:</strong> {school.phone || "—"}
                  </p>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      school.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : school.status === "APPROVED"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {school.status}
                  </span>

                  <div className="flex gap-3 mt-3 text-green-700 text-xl">
                    <FaEdit
                      onClick={() => handleEdit(school.id)}
                      className="cursor-pointer hover:text-green-800"
                      title="Edit School"
                    />
                    <FaTrash
                      onClick={() => handleDelete(school.id)}
                      className="cursor-pointer hover:text-red-700"
                      title="Delete School"
                    />
                    {school.status === "APPROVED" ? (
                      <FaToggleOn
                        onClick={() => handleDisable(school.id)}
                        className="cursor-pointer hover:text-yellow-600"
                        title="Disable School"
                      />
                    ) : (
                      <FaToggleOff
                        onClick={() => handleApproval(school.id, true)}
                        className="cursor-pointer hover:text-green-700"
                        title="Enable School"
                      />
                    )}
                  </div>
                </div>
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

      {/* Modal */}
      <RegisterSchoolModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        schoolToEdit={selectedSchool}
        mode={modalMode}
        onSaved={fetchSchools}
      />
    </div>
  );
}
