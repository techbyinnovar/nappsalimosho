import { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  schoolName: string;
  schoolAddress: string;
  portfolio: string;
  zone: string;
}

interface RegisterSchoolModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterSchoolModal: React.FC<RegisterSchoolModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState<FormData>({
    schoolName: "",
    schoolAddress: "",
    portfolio: "School Proprietor",
    zone: "Zone 1",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/schools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("School registered:", data.school);

        alert("School registered successfully!");
        onClose();
      } else {
        const err = await res.json();
        alert(err.message || "Failed to register school");
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
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Register Your School</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>

          <p className="text-gray-600 mb-6">
            Fill out the form below to begin your membership journey.
          </p>

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

            {/* Submit */}
            <div className="pt-4">
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
