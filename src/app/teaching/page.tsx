import type { Metadata } from "next";
import { Clock, MapPin, Mail } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import CourseCard from "@/components/academic/CourseCard";
import { content } from "@/lib/content";
import { profile } from "@/content/profile";

// =============================================================================
// TEACHING PAGE  (/teaching)
// ดึง courses ผ่าน content provider (async)
// แยก: เทอมปัจจุบัน (isCurrent) / เทอมก่อนหน้า
// =============================================================================

export const metadata: Metadata = {
  title: "Teaching",
  description:
    `Courses taught by ${profile.name} at ${profile.institution}, ` +
    `including syllabi and course materials.`,
  alternates: { canonical: "/teaching" },
};

export default async function TeachingPage() {
  const { items: courses } = await content.courses.list();

  const current = courses.filter((c) => c.isCurrent);
  const previous = courses.filter((c) => !c.isCurrent);

  return (
    <>
      <Navbar />

      <main id="main-content" className="flex-1">
        <PageHeader
          eyebrow="Teaching"
          title="Courses & Materials"
          description="I teach across undergraduate and postgraduate levels, with an emphasis on computational thinking and hands-on data analysis."
        />

        {/* ── Office hours strip ── */}
        <section className="bg-[var(--bg-alt)] py-6">
          <Container>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm text-[var(--text-secondary)]">
              <span className="flex items-center gap-2">
                <Clock size={15} className="text-accent-DEFAULT" aria-hidden="true" />
                Office hours: {profile.officeHours}
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={15} className="text-accent-DEFAULT" aria-hidden="true" />
                {profile.officeLocation}
              </span>
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 text-primary-DEFAULT hover:text-primary-light transition-colors"
              >
                <Mail size={15} aria-hidden="true" />
                {profile.email}
              </a>
            </div>
          </Container>
        </section>

        {/* ── Current courses ── */}
        {current.length > 0 && (
          <section
            aria-labelledby="current-courses"
            className="bg-[var(--bg-page)] py-20"
          >
            <Container>
              <SectionHeading
                eyebrow="This Semester"
                title="Current Courses"
                as="h2"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {current.map((c) => (
                  <CourseCard key={c.id} course={c} />
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* ── Previous courses ── */}
        {previous.length > 0 && (
          <section
            aria-labelledby="previous-courses"
            className="bg-[var(--bg-alt)] py-20"
          >
            <Container>
              <SectionHeading
                eyebrow="Archive"
                title="Previous Courses"
                as="h2"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {previous.map((c) => (
                  <CourseCard key={c.id} course={c} />
                ))}
              </div>
            </Container>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
