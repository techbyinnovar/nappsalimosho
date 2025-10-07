// components/RegisterSchoolModal.tsx
import { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
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
}

interface RegisterSchoolModalProps {
  isOpen: boolean;
  onClose: () => void;
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
}) => {
  const [formData, setFormData] = useState<FormData>({
    schoolName: "",
    schoolAddress: "",
    portfolio: "School Proprietor",
    zone: "Zone 1",
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
  });

  // local control for faculty select (to reset after add)
  const [facilitySelectValue, setFacilitySelectValue] = useState<string>("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name } = e.target;

    // Programs multi-select handling
    if (name === "programs" && e.target instanceof HTMLSelectElement) {
      const values = Array.from(e.target.selectedOptions).map((o) => o.value);
      setFormData((prev) => ({ ...prev, programs: values }));
      return;
    }

    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      // @ts-ignore - index signature
      [name]: value,
    }));
  };

  // Facilities: when user chooses from the select
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

  // Add custom facility by pressing Enter in the input
  const handleFacilityInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const val = (e.target as HTMLInputElement).value.trim();
    if (e.key === "Enter" && val) {
      e.preventDefault();
      setFormData((prev) => {
        const current = prev.facilities ?? [];
        if (current.includes(val)) return prev;
        return { ...prev, facilities: [...current, val] };
      });
      (e.target as HTMLInputElement).value = "";
    }
  };

  const removeFacility = (idx: number) => {
    setFormData((prev) => {
      const current = prev.facilities ?? [];
      const next = [...current];
      next.splice(idx, 1);
      return { ...prev, facilities: next };
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Build payload and convert empty strings/empty arrays to null
    const payload: any = { ...formData };

    Object.keys(payload).forEach((k) => {
      const v = payload[k];
      if (typeof v === "string") {
        payload[k] = v.trim() === "" ? null : v.trim();
      } else if (Array.isArray(v)) {
        payload[k] = v.length === 0 ? null : v;
      }
    });

    try {
      const res = await fetch("/api/schools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("School registered:", data.school);
        alert("School registered successfully!");
        onClose();
      } else {
        const err = await res.json();
        alert(err.error || err.message || "Failed to register school");
      }
    } catch (error) {
      console.error("Error:", error);
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
              <h2 className="text-2xl font-bold text-gray-800">Register Your School</h2>
              <p className="text-gray-600 mb-6">
                Fill out the form below to begin your membership journey.
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

                {/* Zone */}
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
                    <option value="Zone 1">Zone 1</option>
                    <option value="Zone 2">Zone 2</option>
                    <option value="Zone 3">Zone 3</option>
                    <option value="Zone 4">Zone 4</option>
                    <option value="Zone 5">Zone 5</option>
                    <option value="Zone 6">Zone 6</option>
                    <option value="Zone 7">Zone 7</option>
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
                    placeholder="e.g. www.schoolwebsite.com"
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

            {/* Submit */}
            <div className="">
              <button
                type="submit"
                className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-4 rounded-xl transition duration-200 cursor-pointer"
              >
                Register School
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterSchoolModal;
