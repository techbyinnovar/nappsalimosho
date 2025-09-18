import { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  schoolName: string;
  schoolAddress: string;
  portfolio: string;
}

interface RegisterSchoolModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterSchoolModal: React.FC<RegisterSchoolModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    schoolName: '',
    schoolAddress: '',
    portfolio: 'School Proprietor'
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    onClose();
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
              <div className="space-y-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.example@gmail.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                    required
                  />
                </div>
                
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
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+234-111 222 3456"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="schoolAddress" className="block text-sm font-medium text-gray-700 mb-1">
                    School Address
                  </label>
                  <textarea
                    id="schoolAddress"
                    name="schoolAddress"
                    value={formData.schoolAddress}
                    onChange={handleChange}
                    placeholder="Enter your school address"
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-4 rounded-xl transition duration-200 cursor-pointer"
              >
                SEND MESSAGE
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterSchoolModal;