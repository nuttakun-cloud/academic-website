import type { Metadata } from "next";
import Image from "next/image";
import { Mail, MapPin, Clock, FileText, Building2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import { profile } from "@/content/profile";
import { siteConfig } from "@/config/site";

// =============================================================================
// ABOUT PAGE  (/about)
// ประวัติเต็ม: bio, การศึกษา, ตำแหน่ง, รางวัล, ดาวน์โหลด CV
// ทุกข้อมูลดึงจาก profile.ts — แก้ที่เดียว
// reusable: PageHeader / SectionHeading / Container ใช้ร่วมกับหน้าอื่น
// =============================================================================

export const metadata: Metadata = {
  title: "About",
  description:
    `${profile.name} — ${profile.title} at ${profile.institution}. ` +
    `Biography, education, professional experience, and academic awards.`,
  alternates: { canonical: "/about" },
};

// JSON-LD Person — หน้านี้คือโปรไฟล์หลัก ช่วย SEO เชิงวิชาการ
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
    url: `${siteConfig.url}/about`,
    sameAs: profile.social
      .filter((s) => !s.url.startsWith("mailto:"))
      .map((s) => s.url),
    knowsAbout: profile.researchInterests,
    alumniOf: profile.education.map((e) => ({
      "@type": "CollegeOrUniversity",
      name: e.institution,
    })),
    award: profile.awards.map((a) => a.title),
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

export default function AboutPage() {
  return (
    <>
      <PersonJsonLd />
      <Navbar />

      <main id="main-content" className="flex-1">
        <PageHeader
          eyebrow="About"
          title={profile.name}
          description={profile.title}
        />

        {/* ── Profile: photo + facts + bio ── */}
        <section
          aria-labelledby="bio-heading"
          className="bg-[var(--bg-page)] py-20"
        >
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

              {/* Left: photo + quick facts */}
              <div className="lg:col-span-1">
                <div className="relative w-40 h-40 mb-6">
                  <Image
                    src={profile.photo}
                    alt={`Photograph of ${profile.name}`}
                    fill
                    sizes="160px"
                    className="rounded-full object-cover border-4 border-[var(--bg-elevated)] shadow-lg"
                  />
                </div>

                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2.5 text-[var(--text-secondary)]">
                    <Building2 size={15} className="mt-0.5 text-accent-DEFAULT shrink-0" aria-hidden="true" />
                    <span>
                      {profile.institution}<br />
                      {profile.department}
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5 text-[var(--text-secondary)]">
                    <MapPin size={15} className="mt-0.5 text-accent-DEFAULT shrink-0" aria-hidden="true" />
                    {profile.officeLocation}
                  </li>
                  <li className="flex items-start gap-2.5 text-[var(--text-secondary)]">
                    <Clock size={15} className="mt-0.5 text-accent-DEFAULT shrink-0" aria-hidden="true" />
                    {profile.officeHours}
                  </li>
                  <li className="flex items-start gap-2.5 text-[var(--text-secondary)]">
                    <Mail size={15} className="mt-0.5 text-accent-DEFAULT shrink-0" aria-hidden="true" />
                    <a
                      href={`mailto:${profile.email}`}
                      className="hover:text-primary-DEFAULT transition-colors"
                    >
                      {profile.email}
                    </a>
                  </li>
                </ul>

                {profile.cv && (
                  <a
                    href={profile.cv}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-md
                      bg-primary-DEFAULT text-white text-sm font-medium font-sans
                      hover:bg-primary-light transition-colors no-underline
                      focus-visible:outline-2 focus-visible:outline-accent-DEFAULT focus-visible:outline-offset-2"
                  >
                    <FileText size={15} aria-hidden="true" />
                    Download CV (PDF)
                  </a>
                )}
              </div>

              {/* Right: bio */}
              <div className="lg:col-span-2">
                <SectionHeading eyebrow="Biography" title="About Me" as="h2" />
                {profile.bio.map((para, i) => (
                  <p
                    key={i}
                    className="text-[var(--text-secondary)] leading-relaxed mb-4 max-w-prose"
                  >
                    {para}
                  </p>
                ))}

                {/* Social */}
                <div className="flex flex-wrap gap-3 mt-6">
                  {profile.social.map(({ platform, url, label }) => (
                    <a
                      key={platform}
                      href={url}
                      {...(!url.startsWith("mailto:") && {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      })}
                      className="text-sm font-medium text-primary-DEFAULT hover:text-primary-light transition-colors"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ── Research Interests ── */}
        <section
          aria-labelledby="interests-heading"
          className="bg-[var(--bg-alt)] py-20"
        >
          <Container>
            <SectionHeading
              eyebrow="Research Interests"
              title="Topics"
              as="h2"
            />
            <ul className="flex flex-wrap gap-2.5">
              {profile.researchInterests.map((interest) => (
                <li
                  key={interest}
                  className="text-sm font-medium text-primary-DEFAULT bg-[var(--bg-elevated)]
                    border border-[var(--border)] px-4 py-2 rounded-full"
                >
                  {interest}
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {/* ── Education ── */}
        <section
          aria-labelledby="education-heading"
          className="bg-[var(--bg-page)] py-20"
        >
          <Container>
            <SectionHeading eyebrow="Education" title="Academic Background" as="h2" />
            <ul className="space-y-6">
              {profile.education.map((e) => (
                <li
                  key={`${e.degree}-${e.year}`}
                  className="flex flex-col sm:flex-row sm:gap-8 border-l-2 border-accent-DEFAULT pl-5"
                >
                  <span className="text-sm font-bold text-accent-dark sm:w-16 shrink-0">
                    {e.year}
                  </span>
                  <div>
                    <p className="font-serif text-lg font-semibold text-[var(--text-primary)]">
                      {e.degree}
                    </p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      {e.institution}
                    </p>
                    {e.thesis && (
                      <p className="text-sm italic text-[var(--text-muted)] mt-1">
                        Thesis: {e.thesis}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {/* ── Professional Experience ── */}
        <section
          aria-labelledby="experience-heading"
          className="bg-[var(--bg-alt)] py-20"
        >
          <Container>
            <SectionHeading eyebrow="Experience" title="Professional Appointments" as="h2" />
            <ul className="space-y-6">
              {profile.positions.map((p) => (
                <li
                  key={`${p.title}-${p.period}`}
                  className="flex flex-col sm:flex-row sm:gap-8 border-l-2 border-primary-DEFAULT pl-5"
                >
                  <span className="text-sm font-bold text-primary-DEFAULT sm:w-28 shrink-0">
                    {p.period}
                  </span>
                  <div>
                    <p className="font-serif text-lg font-semibold text-[var(--text-primary)]">
                      {p.title}
                    </p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      {p.institution}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {/* ── Awards (ซ่อนเมื่อยังไม่มีข้อมูล) ── */}
        {profile.awards.length > 0 && (
          <section
            aria-labelledby="awards-heading"
            className="bg-[var(--bg-page)] py-20"
          >
            <Container>
              <SectionHeading eyebrow="Honours" title="Awards & Distinctions" as="h2" />
              <ul className="space-y-4">
                {profile.awards.map((a) => (
                  <li
                    key={`${a.title}-${a.year}`}
                    className="flex items-baseline gap-4"
                  >
                    <span className="text-sm font-bold text-accent-dark w-12 shrink-0">
                      {a.year}
                    </span>
                    <span className="text-[var(--text-primary)]">{a.title}</span>
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        )}

        {/* ── CV strip (ซ่อนจนกว่าจะอัปโหลดไฟล์ CV) ── */}
        {profile.cv && (
          <section className="bg-primary-DEFAULT text-white py-16">
            <Container>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-white mb-1">
                    Full academic CV
                  </h2>
                  <p className="text-white/70 text-sm">
                    ประวัติและผลงานฉบับเต็ม
                  </p>
                </div>
                <a
                  href={profile.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-md shrink-0
                    bg-accent-DEFAULT text-white text-sm font-medium font-sans
                    hover:bg-accent-light transition-colors no-underline
                    focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                >
                  <FileText size={16} aria-hidden="true" />
                  Download CV (PDF)
                </a>
              </div>
            </Container>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
