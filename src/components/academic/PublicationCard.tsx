import Link from "next/link";
import { FileDown, Code2, Database, ExternalLink } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { cn, formatAuthors, pubTypeLabel, truncate, pubUrl } from "@/lib/utils";
import type { Publication } from "@/types/content";

// =============================================================================
// PUBLICATION CARD
// รับ type ใหม่จาก @/types/content (CMS-ready schema)
// - authors / tags / links เป็น object มีโครงสร้าง → map ออกมาแสดง
// - semantic <article> เพื่อ accessibility + SEO
// - แสดง action link เฉพาะที่มีจริง
// =============================================================================

interface PublicationCardProps {
  publication: Publication;
  className?: string;
}

export default function PublicationCard({
  publication,
  className,
}: PublicationCardProps) {
  const {
    slug,
    title,
    authors,
    year,
    venue,
    publicationType,
    abstract,
    tags,
    links,
  } = publication;

  // หา link แต่ละชนิดจาก array (โครงสร้างใหม่)
  const pdf = links.find((l) => l.kind === "pdf");
  const code = links.find((l) => l.kind === "code");
  const data = links.find((l) => l.kind === "data");
  const doi = links.find((l) => l.kind === "doi");

  return (
    <article
      className={cn(
        "bg-[var(--bg-elevated)] border border-[var(--border)]",
        "border-l-4 border-l-primary-DEFAULT rounded-xl",
        "px-6 py-6 sm:px-8 shadow-base",
        "transition-[box-shadow,border-color] duration-[200ms]",
        "hover:shadow-md hover:border-l-accent-DEFAULT",
        "flex flex-col h-full",
        className
      )}
    >
      {/* Type + Year */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <Badge variant="primary">{pubTypeLabel[publicationType]}</Badge>
        <span className="text-xs font-bold tracking-wide text-[var(--text-muted)]">
          {year}
        </span>
      </div>

      {/* Title — links to detail page */}
      <h3 className="font-serif text-lg font-semibold leading-snug mb-2">
        <Link
          href={pubUrl(slug)}
          className="text-[var(--text-primary)] hover:text-primary-light transition-colors no-underline"
        >
          {title}
        </Link>
      </h3>

      {/* Authors — map EntityRef[] → ชื่อ */}
      <p className="text-sm text-[var(--text-secondary)] mb-1">
        {formatAuthors(authors.map((a) => a.label))}
      </p>

      {/* Venue */}
      {venue && (
        <p className="font-serif italic text-sm text-[var(--text-muted)] mb-4">
          {venue} · {year}
        </p>
      )}

      {/* Abstract preview */}
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 flex-1">
        {truncate(abstract, 180)}
      </p>

      {/* Tags — map Taxonomy[] */}
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

      {/* Action links — เฉพาะที่มี */}
      <div className="flex flex-wrap gap-2 mt-auto pt-2">
        {pdf && (
          <ActionLink href={pdf.url} icon={<FileDown size={13} />} label="PDF" />
        )}
        {code && (
          <ActionLink href={code.url} icon={<Code2 size={13} />} label="Code" external />
        )}
        {data && (
          <ActionLink href={data.url} icon={<Database size={13} />} label="Data" external />
        )}
        {doi && (
          <ActionLink href={doi.url} icon={<ExternalLink size={13} />} label="DOI" external />
        )}
      </div>
    </article>
  );
}

// Small reusable action link inside the card
function ActionLink({
  href,
  icon,
  label,
  external = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      aria-label={`${label}${external ? " (opens in new tab)" : ""}`}
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-base",
        "text-xs font-medium font-sans no-underline",
        "bg-[var(--bg-alt)] text-[var(--text-secondary)] border border-[var(--border)]",
        "hover:bg-primary-subtle hover:text-primary-DEFAULT hover:border-primary-DEFAULT/30",
        "transition-colors duration-[120ms]"
      )}
    >
      {icon}
      {label}
    </a>
  );
}
