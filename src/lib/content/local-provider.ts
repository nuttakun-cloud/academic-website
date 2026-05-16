// =============================================================================
// LOCAL PROVIDER — implementation ที่อ่านข้อมูลจากไฟล์ในเครื่อง
//
// ทำหน้าที่เหมือน "CMS จำลอง": เก็บ seed data + กรอง/เรียง/แบ่งหน้า
// เนื้อหาอยู่ที่นี่ (ไม่ใช่ใน component) → component ไม่มี hardcoded content
//
// วันหน้าต่อ CMS จริง: สร้าง cms-provider.ts ที่ implements ContentProvider
// แล้ว fetch จาก API — ไม่ต้องแตะ seed data หรือ component
// =============================================================================

import type {
  BaseEntity,
  Publication,
  Course,
  ResearchProject,
  BlogPost,
  Author,
  Resource,
  ListQuery,
  ContentCollection,
} from "@/types/content";
import type { ContentProvider, ContentRepository } from "./provider";

// ─────────────────────────────────────────────────────────────────────────────
// GENERIC IN-MEMORY REPOSITORY
// engine กลาง — ใช้ logic เดียวกันกับทุก content type
// ─────────────────────────────────────────────────────────────────────────────

// field เสริมที่บางชนิดมี (ใช้ตอน filter/sort แบบปลอดภัย)
type Queryable = BaseEntity & {
  featured?: boolean;
  year?: number;
  title?: string;
  tags?: { slug: string }[];
};

// export เพื่อให้ provider อื่น (เช่น markdown) ใช้ engine กรอง/เรียงตัวเดียวกัน
export function createRepository<T extends BaseEntity>(
  data: T[]
): ContentRepository<T> {
  return {
    async list(query: ListQuery = {}): Promise<ContentCollection<T>> {
      const {
        status = "published",
        locale,
        tag,
        featuredOnly = false,
        sortBy = "publishedAt",
        sortDir = "desc",
        limit,
        offset = 0,
      } = query;

      let rows = [...data] as unknown as Queryable[];

      // 1) กรองสถานะ (default: เฉพาะ published)
      if (status !== "any") {
        rows = rows.filter((r) => r.status === status);
      }

      // 2) กรองภาษา
      if (locale) {
        rows = rows.filter((r) => r.locale === locale);
      }

      // 3) กรอง featured
      if (featuredOnly) {
        rows = rows.filter((r) => r.featured === true);
      }

      // 4) กรอง tag
      if (tag) {
        rows = rows.filter((r) =>
          (r.tags ?? []).some((t) => t.slug === tag)
        );
      }

      // 5) เรียงลำดับ
      rows.sort((a, b) => {
        let av: string | number = "";
        let bv: string | number = "";
        switch (sortBy) {
          case "order":
            av = a.order ?? 0;
            bv = b.order ?? 0;
            break;
          case "year":
            av = a.year ?? 0;
            bv = b.year ?? 0;
            break;
          case "title":
            av = a.title ?? "";
            bv = b.title ?? "";
            break;
          default: // publishedAt
            av = a.publishedAt ?? a.createdAt;
            bv = b.publishedAt ?? b.createdAt;
        }
        if (av < bv) return sortDir === "asc" ? -1 : 1;
        if (av > bv) return sortDir === "asc" ? 1 : -1;
        return 0;
      });

      const total = rows.length;

      // 6) แบ่งหน้า
      const sliced =
        limit != null
          ? rows.slice(offset, offset + limit)
          : rows.slice(offset);

      return { items: sliced as unknown as T[], total };
    },

    async getBySlug(slug: string): Promise<T | null> {
      return data.find((r) => r.slug === slug) ?? null;
    },

    async getById(id: string): Promise<T | null> {
      return data.find((r) => r.id === id) ?? null;
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// SEED DATA — เนื้อหาจริงอยู่ที่นี่ (แก้ที่เดียว ทั้งเว็บอัปเดต)
// แทนที่/เพิ่มได้ตามต้องการ ทุกชิ้น type-checked ด้วย schema
// ─────────────────────────────────────────────────────────────────────────────

const now = "2025-01-01T00:00:00Z";

const authors: Author[] = [
  {
    id: "author-self",
    slug: "jane-smith",
    type: "author",
    status: "published",
    locale: "en",
    name: "Jane Smith",
    isSelf: true,
    affiliation: "University of Edinburgh",
    orcid: "0000-0000-0000-0000",
    createdAt: now,
    updatedAt: now,
  },
];

const selfRef = {
  id: "author-self",
  slug: "jane-smith",
  label: "Smith J",
};

// แท็กที่ใช้ซ้ำ — ประกาศครั้งเดียว (ไม่ทำซ้ำ object เดียวกัน)
const TAG = {
  ml:  { id: "t-ml",  slug: "machine-learning",     label: "Machine Learning" },
  cg:  { id: "t-cg",  slug: "cancer-genomics",      label: "Cancer Genomics" },
  dx:  { id: "t-dx",  slug: "diagnostics",          label: "Diagnostics" },
  pg:  { id: "t-pg",  slug: "population-genetics",   label: "Population Genetics" },
  gda: { id: "t-gda", slug: "genomic-data-analysis", label: "Genomic Data Analysis" },
  cp:  { id: "t-cp",  slug: "computational-pathology", label: "Computational Pathology" },
  bd:  { id: "t-bd",  slug: "biomarker-discovery",  label: "Biomarker Discovery" },
} as const;

// author refs ที่ใช้ซ้ำ
const A = {
  doe:      { id: "a-doe",      slug: "a-doe",      label: "Doe A" },
  johnson:  { id: "a-johnson",  slug: "b-johnson",  label: "Johnson B" },
  williams: { id: "a-williams", slug: "c-williams", label: "Williams C" },
  brown:    { id: "a-brown",    slug: "d-brown",    label: "Brown D" },
  taylor:   { id: "a-taylor",   slug: "e-taylor",   label: "Taylor E" },
  lee:      { id: "a-lee",      slug: "k-lee",      label: "Lee K" },
  garcia:   { id: "a-garcia",   slug: "m-garcia",   label: "Garcia M" },
} as const;

const publications: Publication[] = [
  {
    id: "pub-001",
    slug: "smith-2025-ml-cancer-detection",
    type: "publication",
    status: "published",
    locale: "en",
    title:
      "Machine Learning for Early Cancer Detection via Genomic Biomarker Profiling",
    publicationType: "journal-article",
    authors: [selfRef, A.doe, A.johnson, A.williams],
    year: 2025,
    venue: "Nature Medicine",
    volume: "31",
    pages: "412–425",
    doi: "10.1038/s41591-025-00000-0",
    abstract:
      "We present a deep learning framework that detects early-stage cancers " +
      "from circulating tumour DNA with 94% sensitivity. By combining genomic " +
      "biomarker profiling with a transformer architecture, our method " +
      "outperforms existing screening approaches across five cancer types.",
    tags: [TAG.ml, TAG.cg, TAG.dx],
    featured: true,
    openAccess: true,
    links: [
      { kind: "pdf", url: "/files/papers/smith-2025-ml-cancer.pdf" },
      { kind: "code", url: "https://github.com/janesmith/biomarker-ml" },
      { kind: "data", url: "https://zenodo.org/record/0000000" },
      { kind: "doi", url: "https://doi.org/10.1038/s41591-025-00000-0" },
    ],
    createdAt: now,
    updatedAt: now,
    publishedAt: "2025-03-15T00:00:00Z",
  },
  {
    id: "pub-002",
    slug: "smith-2024-population-genetics",
    type: "publication",
    status: "published",
    locale: "en",
    title:
      "Population-Scale Analysis of Rare Variant Architecture in Complex Disease",
    publicationType: "journal-article",
    authors: [selfRef, A.brown, A.taylor],
    year: 2024,
    venue: "Cell",
    volume: "187",
    pages: "1102–1118",
    doi: "10.1016/j.cell.2024.00000",
    abstract:
      "Using whole-genome sequencing data from 500,000 individuals, we " +
      "characterise the contribution of rare variants to ten common diseases, " +
      "revealing previously undetected gene–disease associations.",
    tags: [TAG.pg, TAG.gda],
    featured: true,
    openAccess: false,
    links: [
      { kind: "doi", url: "https://doi.org/10.1016/j.cell.2024.00000" },
      { kind: "code", url: "https://github.com/janesmith/rare-variants" },
    ],
    createdAt: now,
    updatedAt: now,
    publishedAt: "2024-06-01T00:00:00Z",
  },
  {
    id: "pub-003",
    slug: "smith-2024-computational-pathology",
    type: "publication",
    status: "published",
    locale: "en",
    title: "Interpretable Deep Learning for Computational Pathology at Scale",
    publicationType: "conference-paper",
    authors: [A.doe, selfRef, A.lee],
    year: 2024,
    venue: "NeurIPS 2024",
    abstract:
      "An interpretable attention-based model for histopathology image " +
      "classification that provides clinically meaningful explanations " +
      "alongside predictions.",
    tags: [TAG.ml, TAG.cp],
    featured: true,
    openAccess: true,
    links: [
      { kind: "pdf", url: "/files/papers/smith-2024-pathology.pdf" },
      { kind: "code", url: "https://github.com/janesmith/path-ai" },
    ],
    createdAt: now,
    updatedAt: now,
    publishedAt: "2024-12-01T00:00:00Z",
  },
  {
    id: "pub-004",
    slug: "smith-2023-biomarker-review",
    type: "publication",
    status: "published",
    locale: "en",
    title:
      "A Systematic Review of Genomic Biomarkers in Precision Oncology",
    publicationType: "journal-article",
    authors: [selfRef, A.garcia],
    year: 2023,
    venue: "Annual Review of Genomics",
    abstract:
      "A comprehensive review of the current landscape of genomic biomarkers " +
      "used in precision oncology, covering validation standards and clinical " +
      "translation challenges.",
    tags: [TAG.bd, TAG.cg],
    featured: false,
    openAccess: true,
    links: [{ kind: "pdf", url: "/files/papers/smith-2023-review.pdf" }],
    createdAt: now,
    updatedAt: now,
    publishedAt: "2023-04-01T00:00:00Z",
  },
];

const courses: Course[] = [
  {
    id: "course-001",
    slug: "bio101-intro-biology",
    type: "course",
    status: "published",
    locale: "en",
    code: "BIO101",
    title: "Introduction to Biology",
    level: "undergraduate",
    term: "Semester 2, 2025",
    isCurrent: true,
    credits: 20,
    enrollment: 120,
    schedule: "Mon/Wed 09:00–10:00",
    location: "Ashworth Lecture Theatre",
    summary: "Foundational concepts in cell biology, genetics, and evolution.",
    description: "This course introduces students to core biological principles.",
    learningOutcomes: [
      "Explain cell structure and function",
      "Describe the principles of heredity",
    ],
    materials: [
      {
        title: "Course Syllabus",
        kind: "syllabus",
        file: { url: "/files/syllabi/bio101.pdf", label: "BIO101 Syllabus" },
      },
      {
        title: "Reading List",
        kind: "reading-list",
        file: { url: "/files/syllabi/bio101-reading.pdf", label: "Reading List" },
      },
    ],
    tags: [{ id: "lvl-ug", slug: "undergraduate", label: "Undergraduate" }],
    createdAt: now,
    updatedAt: now,
    publishedAt: now,
  },
  {
    id: "course-002",
    slug: "comp401-bioinformatics",
    type: "course",
    status: "published",
    locale: "en",
    code: "COMP401",
    title: "Bioinformatics & Computational Genomics",
    level: "postgraduate",
    term: "Semester 2, 2025",
    isCurrent: true,
    credits: 20,
    enrollment: 34,
    schedule: "Tue/Thu 14:00–15:30",
    location: "Informatics Forum 1.10",
    summary:
      "Algorithms and statistical methods for analysing large-scale genomic data.",
    description:
      "A graduate course covering sequence analysis, variant calling, and " +
      "machine learning applied to genomics.",
    learningOutcomes: [
      "Implement core sequence-alignment algorithms",
      "Apply ML methods to genomic datasets",
      "Critically evaluate bioinformatics pipelines",
    ],
    materials: [
      {
        title: "Course Syllabus",
        kind: "syllabus",
        file: { url: "/files/syllabi/comp401.pdf", label: "COMP401 Syllabus" },
      },
      {
        title: "Lecture 1 Slides",
        kind: "slides",
        file: { url: "/files/slides/comp401-w1.pdf", label: "Week 1 Slides" },
      },
    ],
    tags: [{ id: "lvl-pg", slug: "postgraduate", label: "Postgraduate" }],
    createdAt: now,
    updatedAt: now,
    publishedAt: now,
  },
  {
    id: "course-003",
    slug: "bio210-genetics",
    type: "course",
    status: "published",
    locale: "en",
    code: "BIO210",
    title: "Principles of Genetics",
    level: "undergraduate",
    term: "Semester 1, 2024",
    isCurrent: false,
    credits: 20,
    enrollment: 95,
    summary:
      "Mendelian and molecular genetics, gene regulation, and genomic variation.",
    description:
      "A second-year course building on introductory biology toward modern " +
      "molecular genetics.",
    learningOutcomes: [
      "Explain mechanisms of inheritance",
      "Interpret genetic data and pedigrees",
    ],
    materials: [
      {
        title: "Course Syllabus",
        kind: "syllabus",
        file: { url: "/files/syllabi/bio210.pdf", label: "BIO210 Syllabus" },
      },
    ],
    tags: [{ id: "lvl-ug", slug: "undergraduate", label: "Undergraduate" }],
    createdAt: now,
    updatedAt: now,
    publishedAt: now,
  },
];

const projects: ResearchProject[] = [
  {
    id: "proj-001",
    slug: "genomic-cancer-detection",
    type: "project",
    status: "published",
    locale: "en",
    title: "Genomic Biomarkers for Early Cancer Detection",
    summary:
      "Developing machine learning methods to detect cancer at its earliest " +
      "stages from blood-based genomic signals.",
    description:
      "An ERC-funded programme to build clinically deployable models for " +
      "non-invasive early cancer screening.",
    projectStatus: "active",
    startDate: "2022-01-01",
    endDate: "2027-12-31",
    funding: { funder: "European Research Council", amount: "€2,000,000" },
    tags: [TAG.ml, TAG.cg, TAG.dx],
    relatedPublications: [
      { id: "pub-001", slug: "smith-2025-ml-cancer-detection", label: "Smith 2025" },
    ],
    links: [{ kind: "code", url: "https://github.com/janesmith/biomarker-ml" }],
    createdAt: now,
    updatedAt: now,
    publishedAt: now,
  },
  {
    id: "proj-002",
    slug: "rare-variant-architecture",
    type: "project",
    status: "published",
    locale: "en",
    title: "Rare Variant Architecture in Complex Disease",
    summary:
      "Population-scale analysis of how rare genetic variants contribute to " +
      "common, complex diseases.",
    description:
      "Using whole-genome sequencing from half a million individuals, this " +
      "project maps the genetic architecture of complex disease.",
    projectStatus: "active",
    startDate: "2021-06-01",
    funding: { funder: "Wellcome Trust", amount: "£1,200,000" },
    tags: [TAG.pg, TAG.gda],
    relatedPublications: [
      { id: "pub-002", slug: "smith-2024-population-genetics", label: "Smith 2024" },
    ],
    links: [],
    createdAt: now,
    updatedAt: now,
    publishedAt: now,
  },
  {
    id: "proj-003",
    slug: "interpretable-pathology",
    type: "project",
    status: "published",
    locale: "en",
    title: "Interpretable AI for Computational Pathology",
    summary:
      "Building deep learning models for histopathology that clinicians can " +
      "trust and understand.",
    description:
      "A completed project that produced an interpretable attention-based " +
      "framework for pathology image analysis.",
    projectStatus: "completed",
    startDate: "2019-01-01",
    endDate: "2023-12-31",
    funding: { funder: "UKRI" },
    tags: [TAG.ml, TAG.cp],
    relatedPublications: [
      { id: "pub-003", slug: "smith-2024-computational-pathology", label: "Smith 2024" },
    ],
    links: [{ kind: "code", url: "https://github.com/janesmith/path-ai" }],
    createdAt: now,
    updatedAt: now,
    publishedAt: now,
  },
];

const posts: BlogPost[] = [
  {
    id: "post-001",
    slug: "new-paper-nature-medicine",
    type: "post",
    status: "published",
    locale: "en",
    title: "New paper accepted in Nature Medicine",
    excerpt:
      "Our work on ML-based early cancer detection has been accepted for publication.",
    body: "We are delighted to announce that our paper has been accepted...",
    category: "paper-announcement",
    tags: [{ id: "t2", slug: "cancer-genomics", label: "Cancer Genomics" }],
    featured: true,
    author: selfRef,
    readingTimeMinutes: 4,
    relatedPublications: [
      { id: "pub-001", slug: "smith-2025-ml-cancer-detection", label: "Smith 2025" },
    ],
    createdAt: now,
    updatedAt: now,
    publishedAt: "2025-03-15T00:00:00Z",
  },
  {
    id: "post-002",
    slug: "keynote-ismb-2025",
    type: "post",
    status: "published",
    locale: "en",
    title: "Keynote talk at ISMB 2025",
    excerpt:
      "I will be giving a keynote on interpretable machine learning for " +
      "genomics at ISMB 2025 in Liverpool this July.",
    body: "I am honoured to have been invited to deliver a keynote...",
    category: "conference",
    tags: [{ id: "t-ml", slug: "machine-learning", label: "Machine Learning" }],
    featured: false,
    author: selfRef,
    readingTimeMinutes: 3,
    createdAt: now,
    updatedAt: now,
    publishedAt: "2025-02-10T00:00:00Z",
  },
  {
    id: "post-003",
    slug: "phd-positions-2025",
    type: "post",
    status: "published",
    locale: "en",
    title: "Two funded PhD positions available",
    excerpt:
      "The lab is recruiting two PhD students to start in autumn 2025. " +
      "See the contact page for application details.",
    body: "We have two fully funded PhD studentships available...",
    category: "student-info",
    tags: [{ id: "t-pg", slug: "population-genetics", label: "Population Genetics" }],
    featured: false,
    author: selfRef,
    readingTimeMinutes: 2,
    createdAt: now,
    updatedAt: now,
    publishedAt: "2025-01-20T00:00:00Z",
  },
];

const resources: Resource[] = [
  {
    id: "res-001",
    slug: "genomic-biomarker-dataset-2024",
    type: "resource",
    status: "published",
    locale: "en",
    title: "Genomic Biomarker Dataset (2024)",
    description:
      "Curated circulating tumour DNA biomarker dataset used in our Nature " +
      "Medicine study. Free for academic use.",
    category: "dataset",
    license: "CC BY 4.0",
    fileSize: "3.2 GB",
    format: "CSV + HDF5",
    tags: [TAG.cg, TAG.dx],
    links: [
      { kind: "data", url: "https://zenodo.org/record/0000000", label: "Download" },
      { kind: "doi", url: "https://doi.org/10.5281/zenodo.0000000", label: "DOI" },
    ],
    createdAt: now,
    updatedAt: now,
    publishedAt: now,
  },
  {
    id: "res-002",
    slug: "biomarkerml-toolkit",
    type: "resource",
    status: "published",
    locale: "en",
    title: "BioMarkerML (Python package)",
    description:
      "Open-source machine learning toolkit for genomic biomarker analysis.",
    category: "software",
    license: "MIT",
    tags: [TAG.ml],
    links: [
      { kind: "code", url: "https://github.com/janesmith/biomarker-ml", label: "GitHub" },
      { kind: "external", url: "https://pypi.org/project/biomarkerml", label: "PyPI" },
    ],
    createdAt: now,
    updatedAt: now,
    publishedAt: now,
  },
  {
    id: "res-003",
    slug: "ismb-2025-keynote-slides",
    type: "resource",
    status: "published",
    locale: "en",
    title: "ISMB 2025 Keynote Slides",
    description:
      "Slides from the keynote on interpretable machine learning for genomics.",
    category: "slides",
    license: "CC BY 4.0",
    format: "PDF",
    tags: [TAG.ml],
    links: [
      { kind: "pdf", url: "/files/slides/ismb-2025-keynote.pdf", label: "Download PDF" },
    ],
    createdAt: now,
    updatedAt: now,
    publishedAt: now,
  },
  {
    id: "res-004",
    slug: "writing-bioinformatics-paper",
    type: "resource",
    status: "published",
    locale: "en",
    title: "How to Write a Bioinformatics Paper",
    description:
      "A written guide for students in the lab on structuring and writing " +
      "computational biology papers.",
    category: "guide",
    license: "CC BY 4.0",
    format: "PDF",
    tags: [TAG.gda],
    links: [
      { kind: "pdf", url: "/files/guides/writing-guide.pdf", label: "Download PDF" },
    ],
    createdAt: now,
    updatedAt: now,
    publishedAt: now,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// EXPORT — local provider ที่ implements ContentProvider ครบ
// ─────────────────────────────────────────────────────────────────────────────

export const localProvider: ContentProvider = {
  publications: createRepository(publications),
  courses: createRepository(courses),
  projects: createRepository(projects),
  posts: createRepository(posts),
  authors: createRepository(authors),
  resources: createRepository(resources),
};
