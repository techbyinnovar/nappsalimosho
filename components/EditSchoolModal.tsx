"use client";

import { useState } from "react";

interface SchoolFormModalProps {
  mode: "create" | "edit";
  school?: any;
  onClose: () => void;
//   isOpen?: boolean;x
  onSuccess: () => void;
}

export default function EditSchoolModal({ mode, school, onClose, onSuccess }: SchoolFormModalProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      schoolId: school?.id,
      schoolName: formData.get("schoolName"),
      schoolAddress: formData.get("schoolAddress"),
      zone: formData.get("zone"),
      portfolio: formData.get("portfolio"),
      phone: formData.get("phone"),
    };

    const endpoint = mode === "edit" ? "/api/admin/update-school" : "/api/admin/register-school";
    const method = mode === "edit" ? "PUT" : "POST";

    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);
    const json = await res.json();

    if (!res.ok) {
      alert(json?.error || "Action failed");
      return;
    }

    alert(mode === "edit" ? "School updated successfully!" : "School registered successfully!");
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-green-700">
          {mode === "edit" ? "Edit School" : "Register New School"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">School Name</label>
            <input
              name="schoolName"
              defaultValue={school?.schoolName || ""}
              required
              className="border border-gray-300 w-full px-3 py-2 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Address</label>
            <input
              name="schoolAddress"
              defaultValue={school?.schoolAddress || ""}
              required
              className="border border-gray-300 w-full px-3 py-2 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Zone</label>
            <input
              name="zone"
              defaultValue={school?.zone || ""}
              required
              className="border border-gray-300 w-full px-3 py-2 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Portfolio</label>
            <input
              name="portfolio"
              defaultValue={school?.portfolio || ""}
              required
              className="border border-gray-300 w-full px-3 py-2 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              name="phone"
              defaultValue={school?.phone || ""}
              className="border border-gray-300 w-full px-3 py-2 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : mode === "edit" ? "Save Changes" : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
