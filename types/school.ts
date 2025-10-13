// types/school.ts
import { SchoolStatus } from "@prisma/client";
import { Prisma } from "@prisma/client";

export interface School {
  id: number;
  schoolName: string;
  schoolAddress: string;
  zone: number | null;
  portfolio?: string;
  founded?: number | null;
  students?: number | null;
  staff?: number | null;
  tuitionRange?: string | null;
  email?: string | null;
  phone?: string | null;
  website?: string | null;
  about?: string | null;
  programs?: string[];
  facilities?: string[];
  hours?: string | null;
  highlights?: {
    icon: string; // lucide icon name
    title: string;
    text: string;
  }[];
  status?: SchoolStatus;
  owner?: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string | null;
  } | null;
}

export type SafeOwner = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
};

export type SafeSchool = Omit<
  Prisma.SchoolGetPayload<{ include: { owner: true } }>,
  "owner"
> & {
  owner: SafeOwner;
};


export interface Zone {
  id: number;
  name: string;
  schoolCount: number;
  schools: School[];
}



// export interface School {
//   id: string;
//   name: string;
//   zone: number;
//   description: string;
//   founded: number;
//   students: number;
//   staff: number;
//   tuitionRange: string;
//   address: string;
//   phone: string;
//   email: string;
//   website: string;
//   about: string[];
//   highlights: {
//     icon: string; // lucide icon name
//     title: string;
//     text: string;
//   }[];
//   programs: string[];
//   facilities: string[];
//   hours: {
//     days: string;
//     time: string;
//   }[];
// }
