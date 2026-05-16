import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import ProjectCard from "@/components/academic/ProjectCard";
import { content } from "@/lib/content";

// =============================================================================
// FEATURED RESEARCH SECTION
// ดึงข้อมูลผ่าน content provider (async)
// provider กรองด้วย publish-status — สถานะโครงการ (active) กรองที่นี่
// =============================================================================

export default async function FeaturedResearch() {
  const { items } = await content.projects.list();
  const projects = items
    .filter((p) => p.projectStatus === "active")
    .slice(0, 2);

  if (projects.length === 0) return null;

  return (
    <section
      aria-labelledby="research-heading"
      className="bg-[var(--bg-alt)] py-20"
    >
      <Container>
        <SectionHeading
          eyebrow="Research"
          title="Featured Projects"
          description="Current research programmes exploring computational approaches to genomics and diagnostics."
          link={{ href: "/research", label: "All projects" }}
          as="h2"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
