import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import PublicationCard from "@/components/academic/PublicationCard";
import { content } from "@/lib/content";

// =============================================================================
// FEATURED PUBLICATIONS SECTION
// ดึงข้อมูลผ่าน content provider (async) — ไม่ผูกกับไฟล์โดยตรงอีกต่อไป
// วันหน้าสลับเป็น CMS: section นี้ไม่ต้องแก้เลย
//
// async server component — Next.js await ให้เองตอน render
// =============================================================================

export default async function FeaturedPublications() {
  const { items: publications } = await content.publications.list({
    featuredOnly: true,
    limit: 3,
    sortBy: "year",
    sortDir: "desc",
  });

  if (publications.length === 0) return null;

  return (
    <section
      aria-labelledby="publications-heading"
      className="bg-[var(--bg-page)] py-20"
    >
      <Container>
        <SectionHeading
          eyebrow="Selected Work"
          title="Featured Publications"
          description="Recent peer-reviewed articles and conference papers."
          link={{ href: "/publications", label: "All publications" }}
          as="h2"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {publications.map((pub) => (
            <PublicationCard key={pub.id} publication={pub} />
          ))}
        </div>
      </Container>
    </section>
  );
}
