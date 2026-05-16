import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import AcademicIntro from "@/components/sections/AcademicIntro";
import FeaturedResearch from "@/components/sections/FeaturedResearch";
import FeaturedPublications from "@/components/sections/FeaturedPublications";
import ContactCTA from "@/components/sections/ContactCTA";
import { profile } from "@/content/profile";
import { siteConfig } from "@/config/site";

// =============================================================================
// HOME PAGE
// ประกอบ 5 sections + Navbar/Footer + SEO
// =============================================================================

// Page-specific metadata (รวมกับค่า default ใน layout.tsx)
export const metadata: Metadata = {
  title: "Home",
  description:
    `${profile.name}, ${profile.title} at ${profile.institution}. ` +
    `Research in ${profile.researchInterests.slice(0, 3).join(", ")}.`,
  alternates: { canonical: "/" },
};

// ─────────────────────────────────────────────────────────────────────────────
// JSON-LD — Structured data (schema.org Person)
// ช่วยให้ Google / Google Scholar เข้าใจว่าหน้านี้คือโปรไฟล์นักวิชาการ
// แปลง < เป็น < เพื่อป้องกัน XSS (ตามคำแนะนำเอกสาร Next.js)
// ─────────────────────────────────────────────────────────────────────────────
function PersonJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    affiliation: {
      "@type": "Organization",
      name: profile.institution,
      department: profile.department,
    },
    email: `mailto:${profile.email}`,
    url: siteConfig.url,
    sameAs: profile.social
      .filter((s) => !s.url.startsWith("mailto:"))
      .map((s) => s.url),
    knowsAbout: profile.researchInterests,
    alumniOf: profile.education.map((e) => ({
      "@type": "CollegeOrUniversity",
      name: e.institution,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export default function HomePage() {
  return (
    <>
      <PersonJsonLd />
      <Navbar />

      <main id="main-content" className="flex-1">
        <Hero />
        <AcademicIntro />
        <FeaturedResearch />
        <FeaturedPublications />
        <ContactCTA />
      </main>

      <Footer />
    </>
  );
}
