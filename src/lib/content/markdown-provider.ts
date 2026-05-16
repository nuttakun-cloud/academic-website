// =============================================================================
// MARKDOWN PROVIDER (เฟส 2)
//
// อ่านเนื้อหาจากไฟล์ .md ในโฟลเดอร์ content-md/
// แก้ไขเนื้อหา = แก้ไฟล์ .md (ไม่ต้องรู้ TypeScript)
//
// implements ContentProvider เหมือน localProvider เป๊ะ
// → component ไม่ต้องแก้อะไรเลย แค่สลับ provider ใน index.ts
//
// publications + posts อ่านจาก .md
// courses/projects/resources/authors ยัง delegate ให้ localProvider
//   (ค่อยทยอยย้ายเป็น .md ทีหลังได้ — contract ครบ ไม่พัง)
// =============================================================================

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import type {
  Publication,
  BlogPost,
  Course,
  CourseMaterial,
  ResearchProject,
  Resource,
  Taxonomy,
  EntityRef,
  ResourceLink,
} from "@/types/content";
import type { ContentProvider } from "./provider";
import { createRepository, localProvider } from "./local-provider";

// ── โฟลเดอร์เนื้อหา ──
const ROOT = join(process.cwd(), "content-md");

// ── helper: อ่านทุกไฟล์ .md ในโฟลเดอร์ย่อย ──
function readMarkdownDir(sub: string): { slug: string; data: Record<string, unknown>; body: string }[] {
  const dir = join(ROOT, sub);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = readFileSync(join(dir, file), "utf8");
      const parsed = matter(raw);
      return {
        slug: file.replace(/\.md$/, ""),
        data: parsed.data,
        body: parsed.content.trim(),
      };
    });
}

// ── helper: slug → ป้ายอ่านง่าย ("machine-learning" → "Machine Learning") ──
function titleCase(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function toTaxonomy(slugs: string[] = []): Taxonomy[] {
  return slugs.map((s) => ({ id: s, slug: s, label: titleCase(s) }));
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function toAuthorRefs(names: string[] = []): EntityRef[] {
  return names.map((n) => ({ id: slugify(n), slug: slugify(n), label: n }));
}

// links: { pdf: "...", code: "..." } → ResourceLink[]
function toLinks(obj: Record<string, string> = {}): ResourceLink[] {
  const valid: ResourceLink["kind"][] = [
    "pdf", "code", "data", "slides", "video", "doi", "website", "external",
  ];
  return Object.entries(obj)
    .filter(([k]) => (valid as string[]).includes(k))
    .map(([k, url]) => ({ kind: k as ResourceLink["kind"], url }));
}

// วันที่ → ISO string (รับ "2025-03-15" หรือ Date)
function iso(v: unknown): string {
  if (!v) return new Date().toISOString();
  return new Date(v as string).toISOString();
}

// ── map frontmatter → Publication ──
function toPublication(slug: string, d: Record<string, unknown>, body: string): Publication {
  const published = iso(d.publishedAt);
  return {
    id: (d.id as string) ?? slug,
    slug,
    type: "publication",
    status: (d.status as Publication["status"]) ?? "published",
    locale: "en",
    title: d.title as string,
    publicationType:
      (d.publicationType as Publication["publicationType"]) ?? "journal-article",
    authors: toAuthorRefs(d.authors as string[]),
    year: Number(d.year),
    venue: d.venue as string | undefined,
    doi: d.doi as string | undefined,
    abstract: body,
    tags: toTaxonomy(d.tags as string[]),
    featured: Boolean(d.featured),
    openAccess: Boolean(d.openAccess),
    links: toLinks(d.links as Record<string, string>),
    createdAt: published,
    updatedAt: published,
    publishedAt: published,
  };
}

// ── map frontmatter → BlogPost ──
function toPost(slug: string, d: Record<string, unknown>, body: string): BlogPost {
  const published = iso(d.publishedAt);
  return {
    id: (d.id as string) ?? slug,
    slug,
    type: "post",
    status: (d.status as BlogPost["status"]) ?? "published",
    locale: "en",
    title: d.title as string,
    excerpt: d.excerpt as string,
    body,
    category: (d.category as BlogPost["category"]) ?? "news",
    tags: toTaxonomy(d.tags as string[]),
    featured: Boolean(d.featured),
    author: { id: "author-self", slug: "jane-smith", label: "Smith J" },
    readingTimeMinutes: d.readingTimeMinutes as number | undefined,
    createdAt: published,
    updatedAt: published,
    publishedAt: published,
  };
}

// ── map frontmatter → Course ──
interface MdMaterial {
  title: string;
  kind: CourseMaterial["kind"];
  url: string;
  label: string;
}
function toCourse(slug: string, d: Record<string, unknown>, body: string): Course {
  const published = iso(d.publishedAt);
  const materials: CourseMaterial[] = ((d.materials as MdMaterial[]) ?? []).map(
    (m) => ({
      title: m.title,
      kind: m.kind,
      file: { url: m.url, label: m.label },
    })
  );
  return {
    id: (d.id as string) ?? slug,
    slug,
    type: "course",
    status: (d.status as Course["status"]) ?? "published",
    locale: "en",
    code: d.code as string,
    title: d.title as string,
    level: (d.level as Course["level"]) ?? "undergraduate",
    term: d.term as string,
    isCurrent: Boolean(d.isCurrent),
    credits: d.credits as number | undefined,
    enrollment: d.enrollment as number | undefined,
    schedule: d.schedule as string | undefined,
    location: d.location as string | undefined,
    summary: d.summary as string,
    description: body,
    learningOutcomes: (d.learningOutcomes as string[]) ?? [],
    materials,
    tags: toTaxonomy(d.tags as string[]),
    createdAt: published,
    updatedAt: published,
    publishedAt: published,
  };
}

// ── map frontmatter → ResearchProject ──
function toProject(
  slug: string,
  d: Record<string, unknown>,
  body: string
): ResearchProject {
  const published = iso(d.publishedAt);
  return {
    id: (d.id as string) ?? slug,
    slug,
    type: "project",
    status: (d.status as ResearchProject["status"]) ?? "published",
    locale: "en",
    title: d.title as string,
    summary: d.summary as string,
    description: body,
    projectStatus:
      (d.projectStatus as ResearchProject["projectStatus"]) ?? "active",
    startDate: iso(d.startDate),
    endDate: d.endDate ? iso(d.endDate) : undefined,
    funding: d.funder
      ? { funder: d.funder as string, amount: d.fundingAmount as string | undefined }
      : undefined,
    tags: toTaxonomy(d.tags as string[]),
    links: toLinks(d.links as Record<string, string>),
    createdAt: published,
    updatedAt: published,
    publishedAt: published,
  };
}

// ── map frontmatter → Resource ──
function toResource(
  slug: string,
  d: Record<string, unknown>,
  body: string
): Resource {
  const published = iso(d.publishedAt);
  return {
    id: (d.id as string) ?? slug,
    slug,
    type: "resource",
    status: (d.status as Resource["status"]) ?? "published",
    locale: "en",
    title: d.title as string,
    description: body,
    category: (d.category as Resource["category"]) ?? "link",
    license: d.license as string | undefined,
    fileSize: d.fileSize as string | undefined,
    format: d.format as string | undefined,
    tags: toTaxonomy(d.tags as string[]),
    links: toLinks(d.links as Record<string, string>),
    createdAt: published,
    updatedAt: published,
    publishedAt: published,
  };
}

// ── โหลด + แปลง ──
const publications: Publication[] = readMarkdownDir("publications").map((f) =>
  toPublication(f.slug, f.data, f.body)
);
const posts: BlogPost[] = readMarkdownDir("posts").map((f) =>
  toPost(f.slug, f.data, f.body)
);
const courses: Course[] = readMarkdownDir("courses").map((f) =>
  toCourse(f.slug, f.data, f.body)
);
const projects: ResearchProject[] = readMarkdownDir("projects").map((f) =>
  toProject(f.slug, f.data, f.body)
);
const resources: Resource[] = readMarkdownDir("resources").map((f) =>
  toResource(f.slug, f.data, f.body)
);

// ── export: markdown สำหรับ pub/post, ที่เหลือใช้ของเดิม ──
export const markdownProvider: ContentProvider = {
  publications: createRepository(publications),
  posts: createRepository(posts),
  courses: createRepository(courses),
  projects: createRepository(projects),
  resources: createRepository(resources),
  // authors ยังไม่ย้ายเป็น .md — ใช้ localProvider ไปก่อน (contract ครบ ไม่พัง)
  authors: localProvider.authors,
};
