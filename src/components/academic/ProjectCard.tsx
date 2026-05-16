import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Badge from "@/components/ui/Badge";
import {
  cn,
  projectStatusLabel,
  projectUrl,
} from "@/lib/utils";
import type { ResearchProject } from "@/types/content";
import type { BadgeVariant } from "@/types";

// =============================================================================
// PROJECT CARD
// รับ type ใหม่จาก @/types/content
// ใช้ได้ทั้งหน้า Home (featured) และหน้า Research
// =============================================================================

interface ProjectCardProps {
  project: ResearchProject;
  className?: string;
}

// map สถานะ → สี badge
const statusBadgeVariant: Record<ResearchProject["projectStatus"], BadgeVariant> = {
  active:    "success",
  completed: "muted",
  upcoming:  "accent",
};

export default function ProjectCard({ project, className }: ProjectCardProps) {
  const { slug, title, summary, projectStatus, funding, tags } = project;
  const funder = funding?.funder;

  return (
    <article
      className={cn(
        "group bg-[var(--bg-elevated)] border border-[var(--border)]",
        "rounded-xl overflow-hidden shadow-base flex flex-col h-full",
        "transition-[box-shadow,transform] duration-[200ms]",
        "hover:shadow-lg hover:-translate-y-0.5",
        className
      )}
    >
      {/* Top accent band */}
      <div
        className="h-1.5 bg-gradient-to-r from-primary-DEFAULT to-primary-light
          group-hover:from-accent-DEFAULT group-hover:to-accent-light
          transition-colors duration-[200ms]"
      />

      <div className="p-6 flex flex-col flex-1">
        {/* Status */}
        <div className="mb-3">
          <Badge variant={statusBadgeVariant[projectStatus]}>
            {projectStatusLabel[projectStatus]}
          </Badge>
        </div>

        {/* Title */}
        <h3 className="font-serif text-xl font-semibold leading-snug mb-3">
          <Link
            href={projectUrl(slug)}
            className="text-[var(--text-primary)] hover:text-primary-light transition-colors no-underline"
          >
            {title}
          </Link>
        </h3>

        {/* Summary */}
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 flex-1">
          {summary}
        </p>

        {/* Funder */}
        {funder && (
          <p className="text-xs text-[var(--text-muted)] mb-4">
            Funded by <span className="font-medium">{funder}</span>
          </p>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tags.map((tag) => (
              <span
                key={tag.id}
                className="text-2xs font-medium text-primary-DEFAULT bg-primary-subtle px-2 py-1 rounded-full"
              >
                {tag.label}
              </span>
            ))}
          </div>
        )}

        {/* Learn more */}
        <Link
          href={projectUrl(slug)}
          className="inline-flex items-center gap-1.5 text-sm font-medium font-sans
            text-primary-DEFAULT hover:text-primary-light transition-colors no-underline mt-auto"
        >
          Learn more
          <ArrowRight
            size={14}
            className="group-hover:translate-x-1 transition-transform duration-[200ms]"
          />
        </Link>
      </div>
    </article>
  );
}
