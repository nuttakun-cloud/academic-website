import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/academic/ProjectCard";
import { content } from "@/lib/content";
import { profile } from "@/content/profile";

// =============================================================================
// RESEARCH PAGE  (/research)
// แสดงงานวิจัย: active projects, completed projects, ทุนวิจัย
// reusable: ใช้ PageHeader, SectionHeading, ProjectCard ร่วมกับหน้าอื่น
// =============================================================================

export const metadata: Metadata = {
  title: "Research",
  description:
    `Research programmes led by ${profile.name} in ` +
    `${profile.researchInterests.slice(0, 3).join(", ")}.`,
  alternates: { canonical: "/research" },
};

// แปลง ISO date → ปี: "2022-01-01" → "2022"
const year = (iso: string) => iso.slice(0, 4);

export default async function ResearchPage() {
  const { items: allProjects } = await content.projects.list();

  const activeProjects = allProjects.filter(
    (p) => p.projectStatus === "active"
  );
  const completedProjects = allProjects.filter(
    (p) => p.projectStatus === "completed"
  );

  // สรุปทุนวิจัย — ดึงจากโครงการที่มี funding (เดิมเป็น getFundingList())
  const funding = allProjects
    .filter((p) => p.funding)
    .map((p) => ({
      funder: p.funding!.funder,
      project: p.title,
      amount: p.funding!.amount,
      period: p.endDate
        ? `${year(p.startDate)} – ${year(p.endDate)}`
        : `${year(p.startDate)} – present`,
    }));

  return (
    <>
      <Navbar />

      <main id="main-content" className="flex-1">
        <PageHeader
          eyebrow="Research"
          title="Our Work"
          description="We develop computational and machine learning methods for genomics, with a focus on translating research into clinically meaningful tools."
        />

        {/* ── Active Projects ── */}
        {activeProjects.length > 0 && (
          <section
            aria-labelledby="active-projects-heading"
            className="bg-[var(--bg-page)] py-20 px-4 sm:px-6 lg:px-8"
          >
            <div className="max-w-site mx-auto">
              <SectionHeading
                eyebrow="Active Projects"
                title="Current Research"
                as="h2"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeProjects.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Completed Projects ── */}
        {completedProjects.length > 0 && (
          <section
            aria-labelledby="completed-projects-heading"
            className="bg-[var(--bg-alt)] py-20 px-4 sm:px-6 lg:px-8"
          >
            <div className="max-w-site mx-auto">
              <SectionHeading
                eyebrow="Completed Projects"
                title="Past Research"
                as="h2"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedProjects.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Funding & Grants ── */}
        {funding.length > 0 && (
          <section
            aria-labelledby="funding-heading"
            className="bg-[var(--bg-page)] py-20 px-4 sm:px-6 lg:px-8"
          >
            <div className="max-w-site mx-auto">
              <SectionHeading
                eyebrow="Funding"
                title="Grants & Support"
                description="Research in the laboratory is supported by the following funding bodies."
                as="h2"
              />

              <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
                <table className="w-full border-collapse text-sm">
                  <caption className="sr-only">
                    List of research grants and funding
                  </caption>
                  <thead>
                    <tr>
                      {["Funder", "Project", "Amount", "Period"].map((h) => (
                        <th
                          key={h}
                          scope="col"
                          className="bg-[var(--bg-alt)] text-[var(--text-secondary)]
                            font-sans text-2xs font-bold tracking-wide uppercase
                            text-left px-4 py-3 border-b-2 border-[var(--border)]"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {funding.map((f, i) => (
                      <tr
                        key={i}
                        className="hover:bg-primary-subtle transition-colors"
                      >
                        <td className="px-4 py-3 border-b border-[var(--border-subtle)] font-medium text-[var(--text-primary)]">
                          {f.funder}
                        </td>
                        <td className="px-4 py-3 border-b border-[var(--border-subtle)] text-[var(--text-secondary)]">
                          {f.project}
                        </td>
                        <td className="px-4 py-3 border-b border-[var(--border-subtle)] text-[var(--text-secondary)] whitespace-nowrap">
                          {f.amount ?? "—"}
                        </td>
                        <td className="px-4 py-3 border-b border-[var(--border-subtle)] text-[var(--text-muted)] whitespace-nowrap">
                          {f.period}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
