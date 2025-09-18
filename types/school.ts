export interface School {
  id: string;
  name: string;
  zone: number;
  description: string;
  founded: number;
  students: number;
  staff: number;
  tuitionRange: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  about: string[];
  highlights: {
    icon: string; // lucide icon name
    title: string;
    text: string;
  }[];
  programs: string[];
  facilities: string[];
  hours: {
    days: string;
    time: string;
  }[];
}

export interface Zone {
  id: number;
  name: string;
  schoolCount: number;
  schools: School[];
}