// components/RegisterSchoolModal.tsx
"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { put } from "@vercel/blob";

interface FormData {
  ownerFirstName: string;
  ownerLastName: string;
  ownerEmail: string;
  ownerPhone: string;
  ownerPassword: string;

  id?: number;
  schoolName: string;
  schoolAddress: string;
  portfolio: string;
  zone: string;
  founded?: string | null;
  students?: string | null;
  staff?: string | null;
  tuitionRange?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  about?: string | null;
  programs?: string[] | null;
  facilities?: string[] | null;
  hours?: string | null;

  logoUrl?: string | null;
  galleryUrls?: string[] | null;
}

interface RegisterSchoolModalProps {
  isOpen: boolean;
  onClose: () => void;
  schoolToEdit?: Partial<FormData> | null;
  mode?: "create" | "edit";
  onSaved?: () => void;
}

const PROGRAM_OPTIONS = ["Kindergarten", "Nursery", "Primary", "Secondary"];
const FACILITY_OPTIONS = [
  "Library",
  "ICT Lab",
  "Science Labs",
  "Sports Complex",
  "Music Room",
  "Art Studio",
];

const RegisterSchoolModal: React.FC<RegisterSchoolModalProps> = ({
  isOpen,
  onClose,
  schoolToEdit,
  mode = "create",
  onSaved,
}) => {
  const [formData, setFormData] = useState<FormData>({
    ownerFirstName: "",
    ownerLastName: "",
    ownerEmail: "",
    ownerPhone: "",
    ownerPassword: "",
    schoolName: "",
    schoolAddress: "",
    portfolio: "School Proprietor",
    zone: "Alimosho Central",
    founded: "",
    students: "",
    staff: "",
    tuitionRange: "",
    phone: "",
    email: "",
    website: "",
    about: "",
    programs: [],
    facilities: [],
    hours: "",
    logoUrl: null,
    galleryUrls: [],
  });

  const [uploading, setUploading] = useState(false);
  const [facilitySelectValue, setFacilitySelectValue] = useState<string>("");

  useEffect(() => {
    if (schoolToEdit) {
      setFormData((prev) => ({
        ...prev,
        ...schoolToEdit,
        ownerFirstName: prev.ownerFirstName,
        ownerLastName: prev.ownerLastName,
        ownerEmail: prev.ownerEmail,
        ownerPhone: prev.ownerPhone,
        ownerPassword: prev.ownerPassword,
      }));
    }
  }, [schoolToEdit]);

  const handleChange = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;
  const numericFields = ["founded", "students", "staff"];
  setFormData((prev) => ({
    ...prev,
    [name]: numericFields.includes(name) ? (value === "" ? "" : Number(value)) : value,
  }));
};

  const handleFacilitySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!value) return;
    setFormData((prev) => {
      const current = prev.facilities ?? [];
      if (current.includes(value)) return prev;
      return { ...prev, facilities: [...current, value] };
    });
    setFacilitySelectValue("");
  };

  const removeFacility = (idx: number) => {
    setFormData((prev) => {
      const current = prev.facilities ?? [];
      const next = [...current];
      next.splice(idx, 1);
      return { ...prev, facilities: next };
    });
  };

  // ✅ Upload to Vercel Blob (logo)
  const handleLogoUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const blob = await put(`logos/${file.name}`, file, { 
        access: "public", 
        token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN,
        // allowOverwrite: true, 
      }, );
      setFormData((prev) => ({ ...prev, logoUrl: blob.url }));
    } catch (err) {
      console.error("Logo upload failed:", err);
      alert("Failed to upload logo");
    } finally {
      setUploading(false);
    }
  };

  // ✅ Upload to Vercel Blob (gallery)
  const handleGalleryUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    setUploading(true);
    try {
      const uploads = await Promise.all(
        Array.from(files).map(async (file) => {
          const blob = await put(`gallery/${file.name}`, file, { 
            access: "public", 
            token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN,
            // allowOverwrite: true, 
          });
          return blob.url;
        })
      );
      setFormData((prev) => ({
        ...prev,
        galleryUrls: [...(prev.galleryUrls || []), ...uploads],
      }));
    } catch (err) {
      console.error("Gallery upload failed:", err);
      alert("Failed to upload gallery images");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = { ...formData };
    let res;

    try {
      if (mode === "edit" && formData.id) {
        res = await fetch(`/api/admin/update-school`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/schools", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Failed to save school");
        return;
      }

      alert(mode === "edit" ? "School updated successfully!" : "School registered successfully!");
      onSaved?.();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/35 flex items-center justify-center p-6 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {mode === "edit"
                  ? "Edit School Details"
                  : "Register Your School"}
              </h2>
              <p className="text-gray-600 mb-6">
                {mode === "edit"
                  ? "Update your school’s information below."
                  : "Fill out the form below to begin your membership journey."}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ======================= SCHOOL OWNER SECTION ======================= */}
            {mode === "create" && (
              <div className="border rounded-lg p-4 bg-green-50">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">School Owner Details</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="ownerFirstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="ownerFirstName"
                      name="ownerFirstName"
                      value={formData.ownerFirstName}
                      onChange={handleChange}
                      placeholder="Owner's first name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="ownerLastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="ownerLastName"
                      name="ownerLastName"
                      value={formData.ownerLastName}
                      onChange={handleChange}
                      placeholder="Owner's last name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="ownerEmail" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="ownerEmail"
                      name="ownerEmail"
                      value={formData.ownerEmail}
                      onChange={handleChange}
                      placeholder="Owner's email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="ownerPhone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="ownerPhone"
                      name="ownerPhone"
                      value={formData.ownerPhone}
                      onChange={handleChange}
                      placeholder="e.g. +234 901 234 5678"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="ownerPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      id="ownerPassword"
                      name="ownerPassword"
                      value={formData.ownerPassword}
                      onChange={handleChange}
                      placeholder="Create a password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ======================= SCHOOL DETAILS (existing form) ======================= */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left side */}
              <div className="space-y-4">
                {/* School name */}
                <div>
                  <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700 mb-1">
                    School Name
                  </label>
                  <input
                    type="text"
                    id="schoolName"
                    name="schoolName"
                    value={formData.schoolName}
                    onChange={handleChange}
                    placeholder="Enter your school name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                    required
                  />
                </div>

                {/* Portfolio/Title */}
                <div>
                  <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 mb-1">
                    Portfolio/Title
                  </label>
                  <select
                    id="portfolio"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                    required
                  >
                    <option value="School Proprietor">School Proprietor</option>
                    <option value="School Administrator">School Administrator</option>
                    <option value="Principal">Principal</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Right side */}
              <div className="space-y-4">
                {/* School address */}
                <div>
                  <label htmlFor="schoolAddress" className="block text-sm font-medium text-gray-700 mb-1">
                    School Address
                  </label>
                  <input
                    type="text"
                    id="schoolAddress"
                    name="schoolAddress"
                    value={formData.schoolAddress}
                    onChange={handleChange}
                    placeholder="Enter your school address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                    required
                  />
                </div>

                {/* Zone field (string-based now) */}
                <div>
                  <label htmlFor="zone" className="block text-sm font-medium text-gray-700 mb-1">
                    Zone
                  </label>
                  <select
                    id="zone"
                    name="zone"
                    value={formData.zone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                    required
                  >
                    <option value="Alimosho Central">Alimosho Central</option>
                    <option value="Agbado/Oke-Odo">Agbado/Oke-Odo</option>
                    <option value="Ayobo/Ipaja">Ayobo/Ipaja</option>
                    <option value="Egbe/Idimu">Egbe/Idimu</option>
                    <option value="Ikotun/Igando">Ikotun/Igando</option>
                    <option value="Mosan-Okunola">Mosan-Okunola</option>
                    <option value="Egbeda">Egbeda</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="grid md:grid-cols-2 gap-6 pt-4">
              <div className="space-y-4">
                <div>
                  <label htmlFor="founded" className="block text-sm font-medium text-gray-700 mb-1">
                    Year Founded
                  </label>
                  <input
                    type="number"
                    id="founded"
                    name="founded"
                    value={formData.founded ?? ""}
                    onChange={handleChange}
                    placeholder="e.g. 2010"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label htmlFor="students" className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Students
                  </label>
                  <input
                    type="number"
                    id="students"
                    name="students"
                    value={formData.students ?? ""}
                    onChange={handleChange}
                    placeholder="e.g. 500"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label htmlFor="staff" className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Staff
                  </label>
                  <input
                    type="number"
                    id="staff"
                    name="staff"
                    value={formData.staff ?? ""}
                    onChange={handleChange}
                    placeholder="e.g. 100"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label htmlFor="hours" className="block text-sm font-medium text-gray-700 mb-1">
                    School Hours
                  </label>
                  <input
                    type="text"
                    id="hours"
                    name="hours"
                    value={formData.hours ?? ""}
                    onChange={handleChange}
                    placeholder="e.g. Mon - Fri: 7:30 AM - 3:00 PM"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>

                {/* Programs Offered - select + chips */}
                <div>
                  <label htmlFor="programs" className="block text-sm font-medium text-gray-700 mb-1">
                    Programs Offered
                  </label>

                  <div className="flex gap-2 mb-3">
                    <select
                      id="programs-select"
                      value=""
                      onChange={(e) => {
                        const value = e.target.value;
                        if (!value) return;
                        setFormData((prev) => {
                          const current = prev.programs ?? [];
                          if (current.includes(value)) return prev;
                          return { ...prev, programs: [...current, value] };
                        });
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                    >
                      <option value="">Select program...</option>
                      {PROGRAM_OPTIONS.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* chips */}
                  <div className="flex flex-wrap gap-2">
                    {(formData.programs ?? []).map((p, idx) => (
                      <div
                        key={p + idx}
                        className="flex items-center gap-2 bg-green-50 text-green-800 px-3 py-1 rounded-full text-sm"
                      >
                        <span>{p}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((prev) => {
                              const current = prev.programs ?? [];
                              const next = [...current];
                              next.splice(idx, 1);
                              return { ...prev, programs: next };
                            });
                          }}
                          className="text-green-700 hover:text-red-600"
                          aria-label={`Remove ${p}`}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {/* Tuition Range */}
                <div>
                  <label htmlFor="tuitionRange" className="block text-sm font-medium text-gray-700 mb-1">
                    Tuition Range
                  </label>
                  <input
                    type="text"
                    id="tuitionRange"
                    name="tuitionRange"
                    value={formData.tuitionRange ?? ""}
                    onChange={handleChange}
                    placeholder="e.g. ₦400K - ₦800K"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone ?? ""}
                    onChange={handleChange}
                    placeholder="e.g. +234 901 234 5678"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    School Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email ?? ""}
                    onChange={handleChange}
                    placeholder="e.g. info@school.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                    required
                  />
                </div>

                {/* Website */}
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                    Website
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website ?? ""}
                    onChange={handleChange}
                    placeholder="e.g. https://www.schoolwebsite.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>

                {/* Facilities - select + chips */}
                <div>
                  <label htmlFor="facilities" className="block text-sm font-medium text-gray-700 mb-1">
                    Facilities
                  </label>

                  <div className="flex gap-2 mb-3">
                    <select
                      id="facilities-select"
                      value={facilitySelectValue}
                      onChange={(e) => {
                        setFacilitySelectValue(e.target.value);
                        // after setting local control, call handler to add
                        if (e.target.value) {
                          handleFacilitySelect(e);
                        }
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                    >
                      <option value="">Select facility...</option>
                      {FACILITY_OPTIONS.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* chips */}
                  <div className="flex flex-wrap gap-2">
                    {(formData.facilities ?? []).map((f, idx) => (
                      <div key={f + idx} className="flex items-center gap-2 bg-green-50 text-green-800 px-3 py-1 rounded-full text-sm">
                        <span>{f}</span>
                        <button
                          type="button"
                          onClick={() => removeFacility(idx)}
                          className="text-green-700 hover:text-red-600"
                          aria-label={`Remove ${f}`}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* About */}
            <div>
              <label htmlFor="about" className="block text-sm font-medium text-gray-700 mb-1">
                About School
              </label>
              <textarea
                id="about"
                name="about"
                value={formData.about ?? ""}
                onChange={handleChange}
                placeholder="Tell us about your school"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>

            {/* Logo Upload */}
            <div>
              <label htmlFor="logoImage" className="block text-sm font-medium text-gray-700 mb-1">
                Upload School Logo
              </label>
              <input
                type="file"
                id="logoImage"
                name="logoImage"
                accept="image/*"
                onChange={handleLogoUpload}
                disabled={uploading}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              />
              {formData.logoUrl && (
                <img
                  src={formData.logoUrl}
                  alt="Logo preview"
                  className="mt-2 w-24 h-24 object-cover rounded-md border"
                />
              )}
            </div>

            {/* Gallery Upload */}
            <div>
              <label htmlFor="galleryImages" className="block text-sm font-medium text-gray-700 mb-1">
                Upload School Images
              </label>
              <input
                type="file"
                id="galleryImages"
                name="galleryImages"
                accept="image/*"
                multiple
                onChange={handleGalleryUpload}
                disabled={uploading}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              />
              {formData.galleryUrls && formData.galleryUrls.length > 0 && (
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {formData.galleryUrls.map((url, idx) => (
                    <img
                      key={idx}
                      src={url}
                      alt={`Gallery ${idx}`}
                      className="w-full h-24 object-cover rounded-md border"
                    />
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-4 rounded-xl transition duration-200 cursor-pointer"
            >
              {uploading
                ? "Uploading..."
                : mode === "edit"
                ? "Save Changes"
                : "Register School"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterSchoolModal;

