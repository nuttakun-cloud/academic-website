// =============================================================================
// CONTENT PROVIDER — "สัญญา" (interface) ของแหล่งข้อมูล
//
// จุดสำคัญ: ทุก method เป็น async (คืน Promise)
// → ตอนนี้ local provider resolve ทันที
// → วันหน้า CMS provider ไป fetch API — component ไม่ต้องแก้เลย
//
// component จะเรียกแค่: const { items } = await content.publications.list()
// component ไม่รู้และไม่สนว่าข้อมูลมาจากไฟล์หรือ CMS
// =============================================================================

import type {
  Publication,
  Course,
  ResearchProject,
  BlogPost,
  Author,
  Resource,
  ListQuery,
  ContentCollection,
} from "@/types/content";

/**
 * Repository มาตรฐานของ content type หนึ่งๆ
 * ทุก content type มี 3 วิธีเข้าถึงข้อมูลเหมือนกัน
 */
export interface ContentRepository<T> {
  /** ดึงรายการ (กรอง/เรียง/จำกัดจำนวนได้) */
  list(query?: ListQuery): Promise<ContentCollection<T>>;
  /** ดึง 1 รายการด้วย slug (สำหรับหน้า detail) — ไม่เจอคืน null */
  getBySlug(slug: string): Promise<T | null>;
  /** ดึง 1 รายการด้วย id */
  getById(id: string): Promise<T | null>;
}

/**
 * ContentProvider = ชุด repository ครบทุก content type
 * นี่คือสิ่งที่ทั้งเว็บ import ไปใช้ (ผ่าน lib/content/index.ts)
 *
 * วันหน้าทำ CMS:
 *   สร้าง class ใหม่ที่ implements ContentProvider แล้ว fetch จาก CMS
 *   เปลี่ยน 1 บรรทัดใน index.ts — จบ
 */
export interface ContentProvider {
  publications: ContentRepository<Publication>;
  courses: ContentRepository<Course>;
  projects: ContentRepository<ResearchProject>;
  posts: ContentRepository<BlogPost>;
  authors: ContentRepository<Author>;
  resources: ContentRepository<Resource>;
}
