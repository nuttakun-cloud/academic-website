import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { PublicationType, PostCategory, ProjectStatus, CourseLevel } from "@/types";

// =============================================================================
// cn() — CLASS NAME HELPER
// ใช้งานบ่อยที่สุดใน codebase
//
// ทำไมต้องมี?
// ปัญหา: Tailwind classes บางตัวชนกัน เช่น "p-4" กับ "p-8" — ถ้าใส่ทั้งคู่
//        browser จะใช้ตัวที่ load ทีหลัง ผลลัพธ์ไม่แน่นอน
// วิธีแก้: twMerge() จัดการให้ class ล่าสุดชนะ เสมอ
// clsx() ช่วยให้ใส่ conditions ได้: cn("base", isActive && "text-blue-500")
// =============================================================================

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// =============================================================================
// DATE HELPERS
// =============================================================================

/**
 * แสดงวันที่แบบอ่านง่าย: "2025-03-15" → "15 March 2025"
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * แสดงเฉพาะปี: "2025-03-15" → "2025"
 */
export function formatYear(dateString: string): string {
  return new Date(dateString).getFullYear().toString();
}

/**
 * คำนวณ reading time จาก word count
 */
export function calcReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / 200); // เฉลี่ยอ่าน 200 คำ/นาที
}

// =============================================================================
// PUBLICATION HELPERS
// =============================================================================

/**
 * แปลง publication type เป็น label สวยงาม
 */
export const pubTypeLabel: Record<PublicationType, string> = {
  "journal-article":  "Journal Article",
  "conference-paper": "Conference Paper",
  "book-chapter":     "Book Chapter",
  "book":             "Book",
  "preprint":         "Preprint",
  "thesis":           "Thesis",
  "report":           "Report",
};

/**
 * สี badge ของแต่ละ publication type
 */
export const pubTypeColor: Record<PublicationType, string> = {
  "journal-article":  "bg-primary-subtle text-primary-DEFAULT border-primary-DEFAULT/15",
  "conference-paper": "bg-accent-subtle text-accent-dark border-accent-DEFAULT/15",
  "book-chapter":     "bg-purple-50 text-purple-700 border-purple-200",
  "book":             "bg-purple-50 text-purple-700 border-purple-200",
  "preprint":         "bg-amber-50 text-amber-700 border-amber-200",
  "thesis":           "bg-surface-alt text-text-secondary border-border",
  "report":           "bg-surface-alt text-text-secondary border-border",
};

// =============================================================================
// POST CATEGORY HELPERS
// =============================================================================

export const postCategoryLabel: Record<PostCategory, string> = {
  "news":               "News",
  "paper-announcement": "New Paper",
  "student-info":       "Student Info",
  "conference":         "Conference",
  "opinion":            "Opinion",
};

export const postCategoryColor: Record<PostCategory, string> = {
  "news":               "bg-primary-subtle text-primary-DEFAULT",
  "paper-announcement": "bg-accent-subtle text-accent-dark",
  "student-info":       "bg-green-50 text-green-700",
  "conference":         "bg-blue-50 text-blue-700",
  "opinion":            "bg-surface-alt text-text-secondary",
};

// =============================================================================
// PROJECT STATUS HELPERS
// =============================================================================

export const projectStatusLabel: Record<ProjectStatus, string> = {
  active:    "Active",
  completed: "Completed",
  upcoming:  "Upcoming",
};

export const projectStatusColor: Record<ProjectStatus, string> = {
  active:    "bg-green-50 text-green-700 border-green-200",
  completed: "bg-surface-alt text-text-muted border-border",
  upcoming:  "bg-accent-subtle text-accent-dark border-accent-DEFAULT/15",
};

// =============================================================================
// COURSE LEVEL HELPERS
// =============================================================================

export const courseLevelLabel: Record<CourseLevel, string> = {
  undergraduate: "Undergraduate",
  postgraduate:  "Postgraduate",
  phd:           "PhD",
};

// =============================================================================
// STRING HELPERS
// =============================================================================

/**
 * ตัดข้อความยาวให้เหลือ N ตัวอักษร
 * "This is a long text" → "This is a..."
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}

/**
 * แปลง author array เป็น string
 * ["Smith J", "Doe A", "Jones B"] → "Smith J, Doe A, Jones B"
 * ถ้ามากกว่า 5 คน → "Smith J, Doe A, et al."
 */
export function formatAuthors(authors: string[], maxAuthors = 5): string {
  if (authors.length <= maxAuthors) return authors.join(", ");
  return authors.slice(0, maxAuthors).join(", ") + ", et al.";
}

/**
 * แปลง slug เป็น URL path
 * "smith-2025-genomics" → "/publication/smith-2025-genomics"
 */
export function pubUrl(slug: string): string {
  return `/publication/${slug}`;
}

export function projectUrl(slug: string): string {
  return `/research/${slug}`;
}

export function courseUrl(slug: string): string {
  return `/teaching/${slug}`;
}

export function postUrl(slug: string): string {
  return `/blog/${slug}`;
}
