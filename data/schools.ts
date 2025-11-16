// data/schools.ts
import { School, Zone } from '@/types/school';

// Example schools data with string-based zones
export const schools: School[] = [
  {
    id: 1,
    schoolName: "Glatet School",
    zone: "Alimosho Central",
    founded: 2009,
    students: 850,
    staff: 250,
    tuitionRange: "₦400K - ₦800K",
    schoolAddress: "15 Victoria Street, Alimosho, Lagos",
    phone: "+234 901 234 5678",
    email: "info@glatetschools.com",
    website: "www.glatetschools.com",
    about: "Glatet School provides a nurturing environment where students thrive academically and socially. We balance rigorous academics with character development.",
    highlights: [
      { icon: "BookOpen", title: "Academic Excellence", text: "98% university admission rate." },
      { icon: "Users", title: "Small Classes", text: "Max 20 students per class." }
    ],
    programs: ["Nursery", "Primary", "Secondary"],
    facilities: ["Science Labs", "ICT Lab", "Library", "Sports Complex"],
    hours: "7:30 AM - 1:00 PM",
    owner: {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "+234 801 234 5678"
    },
    logoUrl: "https://example.com/logos/glatet.png",
    galleryUrls: [
      "https://example.com/gallery/glatet1.png",
      "https://example.com/gallery/glatet2.png"
    ]
  },
  {
    id: 2,
    schoolName: "Evergrowing School",
    zone: "Agbado/Oke-Odo",
    founded: 2010,
    students: 600,
    staff: 120,
    tuitionRange: "₦300K - ₦600K",
    schoolAddress: "22 Unity Road, Alimosho, Lagos",
    phone: "+234 902 345 6789",
    email: "info@evergrowingsch.com",
    website: "www.evergrowingsch.com",
    about: "Prepares students for leadership roles. Known for academic excellence and moral training.",
    highlights: [
      { icon: "Users", title: "Small Classes", text: "20 students per class." },
      { icon: "BookOpen", title: "STEM Focus", text: "Emphasis on science and tech." }
    ],
    programs: ["Nursery", "Primary", "Secondary"],
    facilities: ["Science Lab", "Library", "ICT Center", "Sports Field"],
    hours: "8:00 AM - 2:30 PM",
    owner: {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      phone: "+234 802 345 6789"
    },
    logoUrl: "https://example.com/logos/evergrowing.png",
    galleryUrls: [
      "https://example.com/gallery/evergrowing1.png",
      "https://example.com/gallery/evergrowing2.png"
    ]
  },
];

// Updated zones as strings
export const zones: Zone[] = [
  { id: "Alimosho Central", name: "Alimosho Central", schoolCount: schools.filter(s => s.zone === "Alimosho Central").length, schools: schools.filter(s => s.zone === "Alimosho Central") },
  { id: "Agbado/Oke-Odo", name: "Agbado/Oke-Odo", schoolCount: schools.filter(s => s.zone === "Agbado/Oke-Odo").length, schools: schools.filter(s => s.zone === "Agbado/Oke-Odo") },
  { id: "Ayobo/Ipaja", name: "Ayobo/Ipaja", schoolCount: schools.filter(s => s.zone === "Agbado/Oke-Odo").length, schools: schools.filter(s => s.zone === "Ayobo/Ipaja") },
  { id: "Egbe/Idimu", name: "Egbe/Idimu", schoolCount: schools.filter(s => s.zone === "Agbado/Oke-Odo").length, schools: schools.filter(s => s.zone === "Egbe/Idimu") },
  { id: "Ikotun/Igando", name: "Ikotun/Igando", schoolCount: schools.filter(s => s.zone === "Agbado/Oke-Odo").length, schools: schools.filter(s => s.zone === "Ikotun/Igando") },
  { id: "Mosan-Okunola", name: "Mosan-Okunola", schoolCount: schools.filter(s => s.zone === "Agbado/Oke-Odo").length, schools: schools.filter(s => s.zone === "Mosan-Okunola") },
  { id: "Egbeda", name: "Egbeda", schoolCount: schools.filter(s => s.zone === "Agbado/Oke-Odo").length, schools: schools.filter(s => s.zone === "Egbeda") },
];

// Utility functions
export const getSchoolById = (id: number): School | undefined => {
  return schools.find((school) => school.id === id);
};

export const getSchoolsByZone = (zoneId: string): School[] => {
  return schools.filter((school) => school.zone === zoneId);
};
