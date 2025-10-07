// data/schools.ts
import { School, Zone } from '@/types/school';

export const schools: School[] = [
  // =========================
  // ZONE 1
  // =========================
  {
    id: "glatet",
    name: "Glatet School",
    zone: 1,
    description: "A cornerstone of quality education in Lagos for over 15 years.",
    founded: 2009,
    students: 850,
    staff: 250,
    tuitionRange: "₦400K - ₦800K",
    address: "15 Victoria Street, Alimosho, Lagos",
    phone: "+234 901 234 5678",
    email: "info@glatetschools.com",
    website: "www.glatetschools.com",
    about: [
      "Glatet School provides a nurturing environment where students thrive academically and socially.",
      "We balance rigorous academics with character development."
    ],
    highlights: [
      { icon: "BookOpen", title: "Academic Excellence", text: "98% university admission rate." },
      { icon: "Users", title: "Small Classes", text: "Max 20 students per class." }
    ],
    programs: ["Nursery", "Primary", "Secondary"],
    facilities: ["Science Labs", "ICT Lab", "Library", "Sports Complex"],
    hours: [
      { days: "Mon - Thu", time: "7:30 AM - 3:00 PM" },
      { days: "Fri", time: "7:30 AM - 1:00 PM" }
    ]
  },
  {
    id: "evergrowing",
    name: "Evergrowing School",
    zone: 1,
    description: "Known for academic excellence and moral training.",
    founded: 2010,
    students: 600,
    staff: 120,
    tuitionRange: "₦300K - ₦600K",
    address: "22 Unity Road, Alimosho, Lagos",
    phone: "+234 902 345 6789",
    email: "info@evergrowingsch.com",
    website: "www.evergrowingsch.com",
    about: ["Strong academics and character building.", "Prepares students for leadership roles."],
    highlights: [
      { icon: "Users", title: "Small Classes", text: "20 students per class." },
      { icon: "BookOpen", title: "STEM Focus", text: "Emphasis on science and tech." }
    ],
    programs: ["Nursery", "Primary", "Secondary"],
    facilities: ["Science Lab", "Library", "ICT Center", "Sports Field"],
    hours: [{ days: "Mon - Fri", time: "8:00 AM - 2:30 PM" }]
  },
  {
    id: "divinefavour",
    name: "Divine Favour School",
    zone: 1,
    description: "Faith-based and academically rigorous education.",
    founded: 2008,
    students: 450,
    staff: 90,
    tuitionRange: "₦250K - ₦500K",
    address: "8 Hope Avenue, Alimosho, Lagos",
    phone: "+234 903 456 7890",
    email: "info@divinefavoursch.com",
    website: "www.divinefavoursch.com",
    about: ["Combining faith with academics.", "Values discipline, respect, and lifelong learning."],
    highlights: [
      { icon: "Award", title: "Discipline & Values", text: "Strong spiritual and moral foundation." },
      { icon: "Laptop", title: "E-Learning", text: "Modern digital classrooms." }
    ],
    programs: ["Primary", "Secondary"],
    facilities: ["Library", "ICT Lab", "Chapel", "Sports Facilities"],
    hours: [{ days: "Mon - Fri", time: "7:45 AM - 2:45 PM" }]
  },
  {
    id: "liftedheads",
    name: "Lifted Heads School",
    zone: 1,
    description: "Encouraging creativity and innovation in education.",
    founded: 2012,
    students: 520,
    staff: 100,
    tuitionRange: "₦280K - ₦550K",
    address: "14 Grace Street, Alimosho, Lagos",
    phone: "+234 904 111 2222",
    email: "info@liftedheadssch.com",
    website: "www.liftedheadssch.com",
    about: ["Empowers students with confidence and creativity.", "Blends innovation with academics."],
    highlights: [
      { icon: "Users", title: "Creative Learning", text: "Arts, music, and drama programs." },
      { icon: "BookOpen", title: "Academic Support", text: "Extra coaching for students." }
    ],
    programs: ["Nursery", "Primary", "Secondary"],
    facilities: ["Art Studio", "Music Room", "Sports Complex"],
    hours: [{ days: "Mon - Fri", time: "8:00 AM - 3:00 PM" }]
  },

  // =========================
  // ZONE 2
  // =========================
  {
    id: "springfield",
    name: "Springfield Academy",
    zone: 2,
    description: "Raising leaders with global exposure.",
    founded: 2011,
    students: 700,
    staff: 140,
    tuitionRange: "₦350K - ₦750K",
    address: "5 Palm Avenue, Egbeda, Lagos",
    phone: "+234 910 111 2222",
    email: "info@springfieldacademy.com",
    website: "www.springfieldacademy.com",
    about: ["We focus on international standards of education.", "Our alumni are thriving globally."],
    highlights: [
      { icon: "Award", title: "International Curriculum", text: "Blended local and British curriculum." },
      { icon: "Laptop", title: "ICT Driven", text: "E-learning and coding classes." }
    ],
    programs: ["Nursery", "Primary", "Secondary"],
    facilities: ["ICT Lab", "Library", "Sports Center"],
    hours: [{ days: "Mon - Fri", time: "7:30 AM - 3:00 PM" }]
  },
  {
    id: "wisdomhill",
    name: "Wisdom Hill School",
    zone: 2,
    description: "Shaping minds through discipline and excellence.",
    founded: 2005,
    students: 650,
    staff: 120,
    tuitionRange: "₦300K - ₦600K",
    address: "13 Unity Estate, Egbeda, Lagos",
    phone: "+234 911 333 4444",
    email: "info@wisdomhill.com",
    website: "www.wisdomhill.com",
    about: ["Strong focus on academics.", "Developing leaders with integrity."],
    highlights: [
      { icon: "Users", title: "Balanced Learning", text: "Academics + extracurriculars." },
      { icon: "Award", title: "Excellence Awards", text: "Top performing school in WAEC." }
    ],
    programs: ["Primary", "Secondary"],
    facilities: ["Science Labs", "Sports Ground", "Library"],
    hours: [{ days: "Mon - Fri", time: "8:00 AM - 3:00 PM" }]
  },
  {
    id: "victoryland",
    name: "Victoryland School",
    zone: 2,
    description: "Dedicated to raising confident learners.",
    founded: 2007,
    students: 500,
    staff: 95,
    tuitionRange: "₦220K - ₦450K",
    address: "21 Glory Street, Egbeda, Lagos",
    phone: "+234 912 555 6666",
    email: "info@victorylandsch.com",
    website: "www.victorylandsch.com",
    about: ["We nurture students’ confidence and leadership.", "Our graduates excel in higher education."],
    highlights: [
      { icon: "Laptop", title: "ICT Focused", text: "Early introduction to coding and robotics." },
      { icon: "BookOpen", title: "Strong Literacy", text: "95% literacy rate in year 3." }
    ],
    programs: ["Nursery", "Primary", "Secondary"],
    facilities: ["ICT Lab", "Library", "Sports Court"],
    hours: [{ days: "Mon - Fri", time: "7:45 AM - 2:45 PM" }]
  },
  {
    id: "crownheritage",
    name: "Crown Heritage School",
    zone: 2,
    description: "Quality education with Christian values.",
    founded: 2010,
    students: 550,
    staff: 100,
    tuitionRange: "₦250K - ₦500K",
    address: "33 Faith Street, Egbeda, Lagos",
    phone: "+234 913 777 8888",
    email: "info@crownheritage.com",
    website: "www.crownheritage.com",
    about: ["Faith-based education with strong academics.", "Students excel in both academics and morals."],
    highlights: [
      { icon: "Award", title: "Christian Values", text: "Strong faith foundation." },
      { icon: "Users", title: "Holistic Growth", text: "Focus on mind and spirit." }
    ],
    programs: ["Nursery", "Primary", "Secondary"],
    facilities: ["Library", "Sports Field", "Music Room"],
    hours: [{ days: "Mon - Fri", time: "8:00 AM - 3:00 PM" }]
  },

  // =========================
  // ZONE 3
  // =========================
  {
    id: "brightfuture",
    name: "Bright Future Academy",
    zone: 3,
    description: "Preparing students for tomorrow’s opportunities.",
    founded: 2013,
    students: 720,
    staff: 130,
    tuitionRange: "₦300K - ₦650K",
    address: "9 Sunrise Avenue, Ikotun, Lagos",
    phone: "+234 914 111 9999",
    email: "info@brightfuture.com",
    website: "www.brightfuture.com",
    about: ["We prepare students for both local and global challenges.", "Hands-on teaching methods."],
    highlights: [
      { icon: "BookOpen", title: "STEM Focus", text: "Special labs for robotics and coding." },
      { icon: "Award", title: "Recognition", text: "Top in Lagos Spelling Bee." }
    ],
    programs: ["Nursery", "Primary", "Secondary"],
    facilities: ["Robotics Lab", "Library", "Sports Arena"],
    hours: [{ days: "Mon - Fri", time: "7:30 AM - 3:00 PM" }]
  },
  {
    id: "goldenapple",
    name: "Golden Apple School",
    zone: 3,
    description: "Where discipline meets academic brilliance.",
    founded: 2009,
    students: 640,
    staff: 110,
    tuitionRange: "₦280K - ₦520K",
    address: "15 Harmony Road, Ikotun, Lagos",
    phone: "+234 915 222 3333",
    email: "info@goldenapple.com",
    website: "www.goldenapple.com",
    about: ["Known for discipline and high academic performance.", "We instill resilience in learners."],
    highlights: [
      { icon: "Users", title: "Student Mentorship", text: "Guidance and career counseling." },
      { icon: "Laptop", title: "Digital Learning", text: "Smart classrooms in use." }
    ],
    programs: ["Nursery", "Primary", "Secondary"],
    facilities: ["ICT Lab", "Library", "Sports Field"],
    hours: [{ days: "Mon - Fri", time: "8:00 AM - 3:00 PM" }]
  },
  {
    id: "diamondcrest",
    name: "Diamond Crest School",
    zone: 3,
    description: "Excellence, leadership, and service.",
    founded: 2014,
    students: 580,
    staff: 105,
    tuitionRange: "₦260K - ₦480K",
    address: "27 Prosperity Road, Ikotun, Lagos",
    phone: "+234 916 444 5555",
    email: "info@diamondcrest.com",
    website: "www.diamondcrest.com",
    about: ["Developing responsible leaders.", "Focus on academics, service, and sports."],
    highlights: [
      { icon: "Award", title: "Leadership Focus", text: "Leadership training programs." },
      { icon: "Users", title: "Community Service", text: "Students participate in service projects." }
    ],
    programs: ["Nursery", "Primary", "Secondary"],
    facilities: ["Library", "Sports Hall", "Music Studio"],
    hours: [{ days: "Mon - Fri", time: "8:00 AM - 2:45 PM" }]
  },
  {
    id: "risingstars",
    name: "Rising Stars Academy",
    zone: 3,
    description: "A place for every child to shine.",
    founded: 2012,
    students: 480,
    staff: 90,
    tuitionRange: "₦200K - ₦400K",
    address: "18 Glory Street, Ikotun, Lagos",
    phone: "+234 917 666 7777",
    email: "info@risingstars.com",
    website: "www.risingstars.com",
    about: ["We believe every child has potential to shine.", "Develops confidence and creativity."],
    highlights: [
      { icon: "BookOpen", title: "Creative Arts", text: "Drama, dance, and arts programs." },
      { icon: "Laptop", title: "Tech Skills", text: "ICT literacy from early years." }
    ],
    programs: ["Nursery", "Primary", "Secondary"],
    facilities: ["Art Studio", "ICT Lab", "Sports Field"],
    hours: [{ days: "Mon - Fri", time: "7:45 AM - 2:30 PM" }]
  }
];

export const zones: Zone[] = [
    { id: 1, name: "ZONE 1", schoolCount: schools.filter(s => s.zone === 1).length, schools: schools.filter(s => s.zone === 1) },
    { id: 2, name: "ZONE 2", schoolCount: schools.filter(s => s.zone === 2).length, schools: schools.filter(s => s.zone === 2) },
    { id: 3, name: "ZONE 3", schoolCount: schools.filter(s => s.zone === 3).length, schools: schools.filter(s => s.zone === 3) },
    { id: 4, name: "ZONE 4", schoolCount: 0, schools: [] },
    { id: 5, name: "ZONE 5", schoolCount: 0, schools: [] },
    { id: 6, name: "ZONE 6", schoolCount: 0, schools: [] },
    { id: 7, name: "ZONE 7", schoolCount: 0, schools: [] },
]

export const getSchoolById = (id: string): School | undefined => {
  return schools.find(school => school.id === id);
};

export const getSchoolsByZone = (zoneId: number): School[] => {
  return schools.filter(school => school.zone === zoneId);
};