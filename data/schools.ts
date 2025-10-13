// data/schools.ts
import { School, Zone } from '@/types/school';

export const schools: School[] = [
  {
    id: 1,
    schoolName: "Glatet School",
    zone: 1,
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
    hours: "7:30 AM - 1:00 PM"
  },
  {
    id: 2,
    schoolName: "Evergrowing School",
    zone: 2,
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
    hours: "8:00 AM - 2:30 PM"
  },
];

export const zones: Zone[] = [
  { id: 1, name: "ZONE 1", schoolCount: schools.filter(s => s.zone === 1).length, schools: schools.filter(s => s.zone === 1) },
  { id: 2, name: "ZONE 2", schoolCount: schools.filter(s => s.zone === 2).length, schools: schools.filter(s => s.zone === 2) },
  { id: 3, name: "ZONE 3", schoolCount: 0, schools: [] },
  { id: 4, name: "ZONE 4", schoolCount: 0, schools: [] },
  { id: 5, name: "ZONE 5", schoolCount: 0, schools: [] },
  { id: 6, name: "ZONE 6", schoolCount: 0, schools: [] },
  { id: 7, name: "ZONE 7", schoolCount: 0, schools: [] },
];

export const getSchoolById = (id: number): School | undefined => {
  return schools.find((school) => school.id === id);
};

export const getSchoolsByZone = (zoneId: number): School[] => {
  return schools.filter((school) => school.zone === zoneId);
};






// import { School, Zone } from '@/types/school';

// export const schools: School[] = [
//   // =========================
//   // ZONE 1
//   // =========================
//   {
//     id: 1,
//     schoolName: "Glatet School",
//     zone: 1,
//     founded: 2009,
//     students: 850,
//     staff: 250,
//     tuitionRange: "₦400K - ₦800K",
//     schoolAddress: "15 Victoria Street, Alimosho, Lagos",
//     phone: "+234 901 234 5678",
//     email: "info@glatetschools.com",
//     website: "www.glatetschools.com",
//     about: "Glatet School provides a nurturing environment where students thrive academically and socially. We balance rigorous academics with character development.",
//     highlights: [
//       { icon: "BookOpen", title: "Academic Excellence", text: "98% university admission rate." },
//       { icon: "Users", title: "Small Classes", text: "Max 20 students per class." }
//     ],
//     programs: ["Nursery", "Primary", "Secondary"],
//     facilities: ["Science Labs", "ICT Lab", "Library", "Sports Complex"],
//     hours: "7:30 AM - 1:00 PM"
//   },
//   {
//     id: 2,
//     schoolName: "Evergrowing School",
//     zone: 2,
//     founded: 2010,
//     students: 600,
//     staff: 120,
//     tuitionRange: "₦300K - ₦600K",
//     schoolAddress: "22 Unity Road, Alimosho, Lagos",
//     phone: "+234 902 345 6789",
//     email: "info@evergrowingsch.com",
//     website: "www.evergrowingsch.com",
//     about: "Prepares students for leadership roles. Known for academic excellence and moral training.",
//     highlights: [
//       { icon: "Users", title: "Small Classes", text: "20 students per class." },
//       { icon: "BookOpen", title: "STEM Focus", text: "Emphasis on science and tech." }
//     ],
//     programs: ["Nursery", "Primary", "Secondary"],
//     facilities: ["Science Lab", "Library", "ICT Center", "Sports Field"],
//     hours: "8:00 AM - 2:30 PM"
//   },
// ];

// export const zones: Zone[] = [
//     { id: 1, name: "ZONE 1", schoolCount: schools.filter(s => s.zone === 1).length, schools: schools.filter(s => s.zone === 1) },
//     { id: 2, name: "ZONE 2", schoolCount: schools.filter(s => s.zone === 2).length, schools: schools.filter(s => s.zone === 2) },
//     { id: 3, name: "ZONE 3", schoolCount: schools.filter(s => s.zone === 3).length, schools: schools.filter(s => s.zone === 3) },
//     { id: 4, name: "ZONE 4", schoolCount: 0, schools: [] },
//     { id: 5, name: "ZONE 5", schoolCount: 0, schools: [] },
//     { id: 6, name: "ZONE 6", schoolCount: 0, schools: [] },
//     { id: 7, name: "ZONE 7", schoolCount: 0, schools: [] },
// ]

// export const getSchoolById = (id: string): School | undefined => {
//   return schools.find(school => school.id === id);
// };

// export const getSchoolsByZone = (zoneId: number): School[] => {
//   return schools.filter(school => school.zone === zoneId);
// };