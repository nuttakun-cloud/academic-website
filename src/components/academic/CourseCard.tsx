import { FileDown } from "lucide-react";
import { cn, courseLevelLabel } from "@/lib/utils";
import type { Course } from "@/types/content";

// =============================================================================
// COURSE CARD
// รับ type ใหม่จาก @/types/content
// ใช้ได้ทั้งหน้า Teaching และ widget หน้า Home (อนาคต)
// =============================================================================

interface CourseCardProps {
  course: Course;
  className?: string;
}

export default function CourseCard({ course, className }: CourseCardProps) {
  const {
    code,
    title,
    level,
    term,
    credits,
    enrollment,
    schedule,
    location,
    summary,
    materials,
  } = course;

  // meta ที่มีจริงเท่านั้น (กรอง undefined ออก)
  const meta = [
    courseLevelLabel[level],
    term,
    credits ? `${credits} credits` : null,
    enrollment ? `${enrollment} students` : null,
  ].filter(Boolean) as string[];

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
        {/* Code */}
        <p className="font-mono text-2xs font-bold tracking-widest uppercase text-primary-DEFAULT mb-2">
          {code}
        </p>

        {/* Title */}
        <h3 className="font-serif text-xl font-semibold leading-snug mb-3 text-[var(--text-primary)]">
          {title}
        </h3>

        {/* Meta */}
        <p className="text-2xs font-medium uppercase tracking-wide text-[var(--text-muted)] mb-3">
          {meta.join(" · ")}
        </p>

        {/* Summary */}
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 flex-1">
          {summary}
        </p>

        {/* Schedule / location */}
        {(schedule || location) && (
          <p className="text-xs text-[var(--text-muted)] mb-4">
            {[schedule, location].filter(Boolean).join(" · ")}
          </p>
        )}

        {/* Materials */}
        {materials.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto pt-2">
            {materials.map((m) => (
              <a
                key={m.file.url}
                href={m.file.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${m.title} (PDF, opens in new tab)`}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-base",
                  "text-xs font-medium font-sans no-underline",
                  "bg-[var(--bg-alt)] text-[var(--text-secondary)] border border-[var(--border)]",
                  "hover:bg-primary-subtle hover:text-primary-DEFAULT hover:border-primary-DEFAULT/30",
                  "transition-colors duration-[120ms]"
                )}
              >
                <FileDown size={13} aria-hidden="true" />
                {m.title}
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
