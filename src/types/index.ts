// =============================================================================
// TYPESCRIPT TYPES
// กำหนดรูปแบบของข้อมูลทุกชนิดในเว็บไซต์
// ถ้าเพิ่ม field ใหม่ที่นี่ → TypeScript จะแจ้ง error ทุกที่ที่ใช้ข้อมูลนั้น
// ป้องกัน bug ก่อนที่จะเกิดขึ้น
// =============================================================================

// ─────────────────────────────────────────────────────────────────────────────
// PROFILE
// ─────────────────────────────────────────────────────────────────────────────

export interface SocialLink {
  platform: "email" | "google-scholar" | "orcid" | "github" | "twitter" | "linkedin" | "researchgate";
  url: string;
  label: string;
}

export interface Education {
  degree: string;       // "PhD Bioinformatics"
  institution: string;  // "MIT"
  year: string;         // "2010"
  thesis?: string;
}

export interface Position {
  title: string;        // "Professor"
  institution: string;  // "University of Edinburgh"
  period: string;       // "2018–present"
}

export interface Profile {
  name: string;
  title: string;
  institution: string;
  department: string;
  bio: string[];              // Array of paragraphs
  researchInterests: string[];
  education: Education[];
  positions: Position[];
  awards: { year: string; title: string }[];
  photo: string;              // path to image in /public
  cv: string;                 // path to CV PDF in /public
  social: SocialLink[];
  officeHours: string;
  officeLocation: string;
  email: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// PUBLICATIONS
// ─────────────────────────────────────────────────────────────────────────────

export type PublicationType =
  | "journal-article"
  | "conference-paper"
  | "book-chapter"
  | "book"
  | "preprint"
  | "thesis"
  | "report";

export interface Publication {
  slug: string;               // URL: /publication/smith-2025-genomics
  title: string;
  authors: string[];          // ["Smith J", "Doe A"] — your name first
  year: number;
  type: PublicationType;
  journal?: string;           // Journal / Conference name
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  abstract: string;
  tags: string[];             // Research topics
  featured: boolean;          // Show on homepage
  openAccess: boolean;
  urls: {
    pdf?: string;
    code?: string;
    data?: string;
    slides?: string;
    video?: string;
    doi?: string;
  };
  citation?: string;          // BibTeX string
}

// ─────────────────────────────────────────────────────────────────────────────
// RESEARCH PROJECTS
// ─────────────────────────────────────────────────────────────────────────────

export type ProjectStatus = "active" | "completed" | "upcoming";

export interface Project {
  slug: string;
  title: string;
  summary: string;
  description: string[];      // Array of paragraphs
  status: ProjectStatus;
  startDate: string;          // "2022-01"
  endDate?: string;           // undefined = ongoing
  funder?: string;
  grantAmount?: string;
  tags: string[];
  image?: string;
  team?: string[];
  relatedPublications?: string[]; // slugs
  urls: {
    website?: string;
    github?: string;
    data?: string;
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// TEACHING
// ─────────────────────────────────────────────────────────────────────────────

export type CourseLevel = "undergraduate" | "postgraduate" | "phd";

export interface CourseMaterial {
  title: string;
  type: "syllabus" | "slides" | "reading-list" | "assignment" | "other";
  url: string;               // path to file in /public
}

export interface Course {
  slug: string;
  code: string;              // "BIO101"
  title: string;
  level: CourseLevel;
  semester: string;          // "Semester 2, 2025"
  credits?: number;
  enrollment?: number;
  schedule?: string;         // "Mon/Wed 09:00–10:00"
  location?: string;
  description: string;
  learningOutcomes?: string[];
  materials: CourseMaterial[];
  active: boolean;           // true = current semester
}

export interface PhDStudent {
  name: string;
  thesis: string;
  yearStart: number;
  yearEnd?: number;
  status: "current" | "graduated";
  currentPosition?: string;  // where they are now
}

// ─────────────────────────────────────────────────────────────────────────────
// RESOURCES
// ─────────────────────────────────────────────────────────────────────────────

export type ResourceCategory = "dataset" | "software" | "slides" | "guide" | "link";

export interface Resource {
  title: string;
  description: string;
  category: ResourceCategory;
  license?: string;           // "CC BY 4.0", "MIT"
  size?: string;              // "3.2 GB"
  format?: string;            // "CSV + HDF5"
  urls: {
    download?: string;
    github?: string;
    doi?: string;
    docs?: string;
    external?: string;
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// BLOG / NEWS
// ─────────────────────────────────────────────────────────────────────────────

export type PostCategory =
  | "news"
  | "paper-announcement"
  | "student-info"
  | "conference"
  | "opinion";

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;               // "2025-03-15"
  category: PostCategory;
  tags: string[];
  featured: boolean;
  image?: string;
  readingTime?: number;       // minutes
  relatedPublications?: string[]; // slugs
}

// ─────────────────────────────────────────────────────────────────────────────
// UI COMPONENT PROP TYPES
// ─────────────────────────────────────────────────────────────────────────────

export type ButtonVariant =
  | "primary"
  | "accent"
  | "outline"
  | "ghost"
  | "download"
  | "link";

export type ButtonSize = "sm" | "md" | "lg";

export type BadgeVariant =
  | "primary"
  | "accent"
  | "success"
  | "warning"
  | "muted";
