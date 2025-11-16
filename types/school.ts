// types/school.ts
import { SchoolStatus } from "@prisma/client";
import { Prisma } from "@prisma/client";

export interface School {
  id: number;
  schoolName: string;
  schoolAddress: string;
  zone: string | null;
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
  logoUrl: string;
  galleryUrls: string[];
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
  id: string;
  name: string;
  schoolCount: number;
  schools: School[];
}
