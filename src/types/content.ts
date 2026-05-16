// =============================================================================
// CONTENT SCHEMA — โมเดลข้อมูลกลางของทั้งเว็บไซต์
//
// ออกแบบให้พร้อมต่อ CMS ในอนาคต (Sanity / Contentful / Strapi / Notion):
//  - ทุก entity สืบทอด BaseEntity (id, slug, status, timestamps)
//  - ใช้ MediaAsset แทน string รูป (CMS คืนค่าแบบมีโครงสร้าง)
//  - ใช้ EntityRef อ้างถึงกันแบบ "อ้างอิง" ไม่ฝังทั้ง object (= CMS relations)
//  - RichText เป็น type แยก เผื่อเปลี่ยนเป็น structured rich-text ภายหลัง
// =============================================================================

// ─────────────────────────────────────────────────────────────────────────────
// PRIMITIVES — ชนิดข้อมูลพื้นฐานที่ใช้ร่วมกัน
// ─────────────────────────────────────────────────────────────────────────────

/** วันที่รูปแบบ ISO เช่น "2025-03-15" หรือ "2025-03-15T10:00:00Z" */
export type ISODateString = string;

/** ภาษา — เผื่อรองรับหลายภาษาในอนาคต */
export type Locale = "en" | "th";

/** สถานะเนื้อหา — ตรงกับ workflow ของ CMS ทั่วไป */
export type ContentStatus = "draft" | "published" | "archived";

/**
 * เนื้อหาแบบยาว (เนื้อ paper, รายละเอียด project ฯลฯ)
 * ตอนนี้เป็น Markdown string — วันหน้าเปลี่ยนเป็น rich-text AST ได้
 * โดยแก้ที่ type นี้ที่เดียว
 */
export type RichText = string;

// ─────────────────────────────────────────────────────────────────────────────
// SHARED OBJECTS
// ─────────────────────────────────────────────────────────────────────────────

/** รูป/ไฟล์สื่อ — CMS คืนค่าเป็น object ไม่ใช่แค่ URL */
export interface MediaAsset {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
}

/** ไฟล์ดาวน์โหลด (PDF, dataset ฯลฯ) */
export interface FileAsset {
  url: string;
  label: string;
  mimeType?: string;       // "application/pdf"
  sizeBytes?: number;
}

/** ข้อมูล SEO ต่อหน้า — ทุก entity แนบได้ */
export interface SeoMeta {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: MediaAsset;
  noindex?: boolean;
  keywords?: string[];
}

/**
 * การอ้างอิงเนื้อหาอื่นแบบ "soft reference"
 * แทนการฝังทั้ง object — ตรงกับ relation ของ CMS
 * เช่น blog post อ้างถึง publication ด้วย EntityRef ไม่ใช่ Publication เต็มๆ
 */
export interface EntityRef {
  id: string;
  slug: string;
  label: string;
}

/** หมวด/แท็ก — โครงสร้างเดียวใช้ได้ทุก content type */
export interface Taxonomy {
  id: string;
  slug: string;
  label: string;
}

/** ลิงก์ภายนอก (มีหลายแบบ: pdf/code/data...) */
export interface ResourceLink {
  kind: "pdf" | "code" | "data" | "slides" | "video" | "doi" | "website" | "external";
  url: string;
  label?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// BASE ENTITY — ทุก content type สืบทอดตัวนี้
// คือ field มาตรฐานที่ CMS ทุกเจ้าสร้างให้อัตโนมัติ
// ─────────────────────────────────────────────────────────────────────────────

export interface BaseEntity {
  /** ID ถาวร (วันหน้า CMS เป็นผู้สร้าง) */
  id: string;
  /** ส่วนของ URL เช่น "smith-2025-genomics" */
  slug: string;
  /** draft = ยังไม่เผยแพร่ (ไม่ถูก query บนเว็บจริง) */
  status: ContentStatus;
  /** ภาษาของเนื้อหานี้ */
  locale: Locale;
  /** ลำดับการแสดง (น้อย = มาก่อน) optional */
  order?: number;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  publishedAt?: ISODateString;
  /** SEO เฉพาะหน้า (ถ้าไม่ใส่ ใช้ค่า default ของเว็บ) */
  seo?: SeoMeta;
}

// ─────────────────────────────────────────────────────────────────────────────
// AUTHOR — ใช้ร่วมกันระหว่าง publications และ blog posts
// ─────────────────────────────────────────────────────────────────────────────

export interface Author extends BaseEntity {
  type: "author";
  name: string;
  /** true = เจ้าของเว็บ (ไฮไลต์ชื่อใน author list) */
  isSelf: boolean;
  affiliation?: string;
  orcid?: string;
  avatar?: MediaAsset;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1) PUBLICATION
// ─────────────────────────────────────────────────────────────────────────────

export type PublicationType =
  | "journal-article"
  | "conference-paper"
  | "book-chapter"
  | "book"
  | "preprint"
  | "thesis"
  | "report";

export interface Publication extends BaseEntity {
  type: "publication";
  title: string;
  publicationType: PublicationType;
  /** อ้างถึง Author entities (ไม่ฝัง object เต็ม) */
  authors: EntityRef[];
  year: number;
  venue?: string;            // ชื่อ journal / conference
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  abstract: RichText;
  body?: RichText;           // เนื้อหาเต็ม (ถ้ามีหน้า detail)
  tags: Taxonomy[];
  featured: boolean;
  openAccess: boolean;
  links: ResourceLink[];
  citationBibtex?: string;
  relatedProjects?: EntityRef[];
}

// ─────────────────────────────────────────────────────────────────────────────
// 2) COURSE
// ─────────────────────────────────────────────────────────────────────────────

export type CourseLevel = "undergraduate" | "postgraduate" | "phd";

export interface CourseMaterial {
  title: string;
  kind: "syllabus" | "slides" | "reading-list" | "assignment" | "other";
  file: FileAsset;
}

export interface Course extends BaseEntity {
  type: "course";
  code: string;              // "BIO101"
  title: string;
  level: CourseLevel;
  term: string;              // "Semester 2, 2025"
  isCurrent: boolean;        // true = เปิดสอนเทอมปัจจุบัน
  credits?: number;
  enrollment?: number;
  schedule?: string;
  location?: string;
  summary: string;
  description: RichText;
  learningOutcomes: string[];
  materials: CourseMaterial[];
  tags: Taxonomy[];
}

// ─────────────────────────────────────────────────────────────────────────────
// 3) RESEARCH PROJECT
// ─────────────────────────────────────────────────────────────────────────────

export type ProjectStatus = "active" | "completed" | "upcoming";

export interface Funding {
  funder: string;
  amount?: string;
  grantRef?: string;
}

export interface ResearchProject extends BaseEntity {
  type: "project";
  title: string;
  summary: string;
  description: RichText;
  projectStatus: ProjectStatus;
  startDate: ISODateString;
  endDate?: ISODateString;   // ไม่มี = ยังดำเนินอยู่
  funding?: Funding;
  tags: Taxonomy[];
  cover?: MediaAsset;
  team?: EntityRef[];
  relatedPublications?: EntityRef[];
  links: ResourceLink[];
}

// ─────────────────────────────────────────────────────────────────────────────
// 4) BLOG POST
// ─────────────────────────────────────────────────────────────────────────────

export type PostCategory =
  | "news"
  | "paper-announcement"
  | "student-info"
  | "conference"
  | "opinion";

export interface BlogPost extends BaseEntity {
  type: "post";
  title: string;
  excerpt: string;
  body: RichText;
  category: PostCategory;
  tags: Taxonomy[];
  featured: boolean;
  cover?: MediaAsset;
  author: EntityRef;
  readingTimeMinutes?: number;
  relatedPublications?: EntityRef[];
}

// ─────────────────────────────────────────────────────────────────────────────
// 5) RESOURCE — datasets / software / slides / guides / links
// ─────────────────────────────────────────────────────────────────────────────

export type ResourceCategory =
  | "dataset"
  | "software"
  | "slides"
  | "guide"
  | "link";

export interface Resource extends BaseEntity {
  type: "resource";
  title: string;
  description: string;
  category: ResourceCategory;
  license?: string;       // "CC BY 4.0", "MIT"
  fileSize?: string;      // "3.2 GB"
  format?: string;        // "CSV + HDF5"
  tags: Taxonomy[];
  links: ResourceLink[];
}

// ─────────────────────────────────────────────────────────────────────────────
// UNION + QUERY TYPES — ใช้ในชั้น Provider
// ─────────────────────────────────────────────────────────────────────────────

/** เนื้อหาทุกชนิด */
export type ContentEntity =
  | Author
  | Publication
  | Course
  | ResearchProject
  | BlogPost
  | Resource;

/** ตัวเลือกตอน query รายการ — provider ทุกตัวต้องรองรับ */
export interface ListQuery {
  /** default: เฉพาะ "published" */
  status?: ContentStatus | "any";
  locale?: Locale;
  limit?: number;
  offset?: number;
  /** กรองด้วย slug ของ tag */
  tag?: string;
  /** true = เฉพาะ featured */
  featuredOnly?: boolean;
  /** ฟิลด์ที่ใช้เรียง + ทิศทาง */
  sortBy?: "publishedAt" | "order" | "year" | "title";
  sortDir?: "asc" | "desc";
}

/** ผลลัพธ์รายการ (มี total เผื่อทำ pagination กับ CMS) */
export interface ContentCollection<T> {
  items: T[];
  total: number;
}
