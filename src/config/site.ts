import { profile } from "@/content/profile";

// =============================================================================
// SITE CONFIG — แหล่งความจริงเดียวของข้อมูลระดับเว็บ
//
// ก่อน refactor: ชื่อ/URL/เมนู กระจัดกระจาย hardcode ใน 5+ ไฟล์
// หลัง refactor: แก้ที่นี่ที่เดียว ทุกที่อัปเดตตาม
//
// ข้อมูลตัวบุคคล (ชื่อ/สถาบัน/social) ดึงต่อจาก profile.ts — ไม่ทำซ้ำ
// =============================================================================

export const siteConfig = {
  // ── Identity (ดึงจาก profile — ไม่ hardcode ซ้ำ) ──
  name: profile.name,
  /** ชื่อย่อสำหรับ Navbar/Footer brand */
  shortName: "Prof. Jane Smith",
  title: `${profile.name} · ${profile.title}`,
  description:
    `${profile.title} at ${profile.institution}. ` +
    `Research in ${profile.researchInterests.slice(0, 3).join(", ").toLowerCase()}.`,

  // ── Deployment ──
  /** URL จริงตอน deploy — เปลี่ยนที่นี่ที่เดียว (เดิม hardcode 3 ที่) */
  url: "https://profsmith.university.ac.uk",
  locale: "en_GB",
  twitter: "@profsmith",
  ogImage: "/images/og-image.png",

  // ── Footer ──
  builtWith: "Built with Next.js · Hosted on Vercel",

  // ── Contact form (Formspree) ──
  // Formspree endpoint จริง (รับข้อความจากฟอร์ม Contact)
  contactFormEndpoint: "https://formspree.io/f/mbdbrgkj",

  // ── Navigation (เดิมอยู่ใน Navbar; footer มี subset แยก) ──
  nav: [
    { href: "/",             label: "Home" },
    { href: "/about",        label: "About" },
    { href: "/research",     label: "Research" },
    { href: "/publications", label: "Publications" },
    { href: "/teaching",     label: "Teaching" },
    { href: "/resources",    label: "Resources" },
    { href: "/blog",         label: "Blog" },
    { href: "/contact",      label: "Contact" },
  ],

  /** เมนูย่อยที่แสดงใน Footer (อ้างอิงจาก nav ด้านบน) */
  footerNavHrefs: ["/about", "/publications", "/teaching", "/contact"],
} as const;

export type SiteConfig = typeof siteConfig;
