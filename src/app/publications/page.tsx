import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import PublicationsExplorer from "@/components/academic/PublicationsExplorer";
import { content } from "@/lib/content";
import { profile } from "@/content/profile";

// =============================================================================
// PUBLICATIONS PAGE  (/publications)
// server component: ดึงข้อมูลผ่าน provider + คำนวณสถิติ
// แล้วส่งให้ PublicationsExplorer (client) ทำ filter ในเบราว์เซอร์
// → หน้ายังเป็น static (ข้อมูลฝังตอน build) แต่ filter ได้แบบ interactive
// =============================================================================

export const metadata: Metadata = {
  title: "Publications",
  description:
    `Peer-reviewed publications by ${profile.name} — journal articles, ` +
    `conference papers, and preprints in computational biology and genomics.`,
  alternates: { canonical: "/publications" },
};

export default async function PublicationsPage() {
  const { items: publications, total } = await content.publications.list({
    sortBy: "year",
    sortDir: "desc",
  });

  // สถิติแบบง่าย (ไม่มีข้อมูล citation จึงนับจากที่มี)
  const peerReviewed = publications.filter(
    (p) =>
      p.publicationType === "journal-article" ||
      p.publicationType === "conference-paper"
  ).length;
  const openAccess = publications.filter((p) => p.openAccess).length;

  const scholar = profile.social.find((s) => s.platform === "google-scholar");

  return (
    <>
      <Navbar />

      <main id="main-content" className="flex-1">
        <PageHeader
          eyebrow="Publications"
          title="Research Output"
          description={`${total} publications · ${peerReviewed} peer-reviewed · ${openAccess} open access`}
        />

        {/* External profile links */}
        {scholar && (
          <section className="bg-[var(--bg-alt)] py-6">
            <Container>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <span className="text-[var(--text-secondary)]">
                  Full citation metrics:
                </span>
                {profile.social
                  .filter((s) => !s.url.startsWith("mailto:"))
                  .map((s) => (
                    <a
                      key={s.platform}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-primary-DEFAULT hover:text-primary-light transition-colors"
                    >
                      {s.label} ↗
                    </a>
                  ))}
              </div>
            </Container>
          </section>
        )}

        {/* Explorer (client filter) */}
        <section
          aria-label="Publications list"
          className="bg-[var(--bg-page)] py-16"
        >
          <Container>
            <PublicationsExplorer publications={publications} />
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
