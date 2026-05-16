import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import ResourceCard from "@/components/academic/ResourceCard";
import { content } from "@/lib/content";
import { profile } from "@/content/profile";
import type { ResourceCategory } from "@/types/content";

// =============================================================================
// RESOURCES PAGE  (/resources)
// ดึง resources ผ่าน content provider (async) แล้วจัดกลุ่มตามหมวด
// =============================================================================

export const metadata: Metadata = {
  title: "Resources",
  description:
    `Open datasets, software, slides, and guides shared by ${profile.name}.`,
  alternates: { canonical: "/resources" },
};

// ลำดับหมวด + ชื่อหัวข้อ
const SECTIONS: { category: ResourceCategory; eyebrow: string; title: string }[] = [
  { category: "dataset",  eyebrow: "Data",     title: "Datasets" },
  { category: "software", eyebrow: "Code",     title: "Software & Tools" },
  { category: "slides",   eyebrow: "Talks",    title: "Lecture Slides" },
  { category: "guide",    eyebrow: "Writing",  title: "Guides" },
  { category: "link",     eyebrow: "External", title: "Useful Links" },
];

export default async function ResourcesPage() {
  const { items: resources } = await content.resources.list({
    sortBy: "title",
    sortDir: "asc",
  });

  // หมวดที่มีข้อมูลจริงเท่านั้น
  const sections = SECTIONS.map((s) => ({
    ...s,
    items: resources.filter((r) => r.category === s.category),
  })).filter((s) => s.items.length > 0);

  return (
    <>
      <Navbar />

      <main id="main-content" className="flex-1">
        <PageHeader
          eyebrow="Resources"
          title="Open Materials"
          description="Datasets, software, and teaching materials are shared openly. Most are released under a Creative Commons or open-source licence."
        />

        {sections.length === 0 ? (
          <section className="bg-[var(--bg-page)] py-20">
            <Container>
              <p className="text-[var(--text-muted)] text-center">
                No resources available yet.
              </p>
            </Container>
          </section>
        ) : (
          sections.map((s, i) => (
            <section
              key={s.category}
              aria-label={s.title}
              className={
                i % 2 === 0
                  ? "bg-[var(--bg-page)] py-20"
                  : "bg-[var(--bg-alt)] py-20"
              }
            >
              <Container>
                <SectionHeading eyebrow={s.eyebrow} title={s.title} as="h2" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {s.items.map((r) => (
                    <ResourceCard key={r.id} resource={r} />
                  ))}
                </div>
              </Container>
            </section>
          ))
        )}
      </main>

      <Footer />
    </>
  );
}
