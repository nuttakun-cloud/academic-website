import {
  FileDown,
  Code2,
  Database,
  ExternalLink,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import type { Resource, ResourceCategory, ResourceLink } from "@/types/content";

// =============================================================================
// RESOURCE CARD
// รับ type ใหม่จาก @/types/content
// แสดง: หมวด · ชื่อ · รายละเอียด · license/format/size · ปุ่มลิงก์
// =============================================================================

const categoryLabel: Record<ResourceCategory, string> = {
  dataset:  "Dataset",
  software: "Software",
  slides:   "Slides",
  guide:    "Guide",
  link:     "Link",
};

// เลือกไอคอนตามชนิดลิงก์
function linkIcon(kind: ResourceLink["kind"]) {
  switch (kind) {
    case "pdf":
    case "slides":
      return <FileDown size={13} aria-hidden="true" />;
    case "code":
      return <Code2 size={13} aria-hidden="true" />;
    case "data":
      return <Database size={13} aria-hidden="true" />;
    default:
      return <ExternalLink size={13} aria-hidden="true" />;
  }
}

interface ResourceCardProps {
  resource: Resource;
  className?: string;
}

export default function ResourceCard({ resource, className }: ResourceCardProps) {
  const { title, description, category, license, fileSize, format, links } =
    resource;

  const meta = [format, fileSize, license].filter(Boolean) as string[];

  return (
    <article
      className={cn(
        "bg-[var(--bg-elevated)] border border-[var(--border)]",
        "rounded-xl shadow-base p-6 flex flex-col h-full",
        "transition-[box-shadow] duration-[200ms] hover:shadow-md",
        className
      )}
    >
      <div className="mb-3">
        <Badge variant="primary">{categoryLabel[category]}</Badge>
      </div>

      <h3 className="font-serif text-lg font-semibold leading-snug mb-2 text-[var(--text-primary)]">
        {title}
      </h3>

      <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 flex-1">
        {description}
      </p>

      {meta.length > 0 && (
        <p className="text-2xs font-medium uppercase tracking-wide text-[var(--text-muted)] mb-4">
          {meta.join(" · ")}
        </p>
      )}

      {links.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-auto pt-2">
          {links.map((l) => {
            const external = /^https?:\/\//.test(l.url);
            return (
              <a
                key={l.url}
                href={l.url}
                {...(external && {
                  target: "_blank",
                  rel: "noopener noreferrer",
                })}
                aria-label={`${l.label ?? l.kind}${
                  external ? " (opens in new tab)" : ""
                }`}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-base",
                  "text-xs font-medium font-sans no-underline",
                  "bg-[var(--bg-alt)] text-[var(--text-secondary)] border border-[var(--border)]",
                  "hover:bg-primary-subtle hover:text-primary-DEFAULT hover:border-primary-DEFAULT/30",
                  "transition-colors duration-[120ms]"
                )}
              >
                {linkIcon(l.kind)}
                {l.label ?? l.kind}
              </a>
            );
          })}
        </div>
      )}
    </article>
  );
}
