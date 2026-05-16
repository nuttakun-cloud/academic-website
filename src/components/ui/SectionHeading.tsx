import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// =============================================================================
// SECTION HEADING
// หัวข้อมาตรฐานของทุก section: eyebrow + title + เส้นทอง + ลิงก์ "ดูทั้งหมด"
// ใช้ซ้ำได้ทุกหน้า — แก้ดีไซน์ที่นี่ที่เดียวเปลี่ยนทั้งเว็บ
//
// `as` prop = เลือกระดับ heading (h1/h2/h3) เพื่อ accessibility ที่ถูกต้อง
// =============================================================================

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  /** ลิงก์ "ดูทั้งหมด" — optional */
  link?: { href: string; label: string };
  /** ระดับ heading ที่ถูกต้องตามโครงสร้างหน้า (default h2) */
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  link,
  as: Heading = "h2",
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10",
        align === "center" && "text-center",
        className
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        )}
      >
        <div>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}

          <Heading
            className={cn(
              "relative inline-block font-serif font-bold text-primary-DEFAULT",
              Heading === "h1" ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl"
            )}
          >
            {title}
            {/* เส้นทองใต้หัวข้อ */}
            <span
              aria-hidden="true"
              className={cn(
                "absolute -bottom-2 h-[3px] w-10 rounded-full bg-accent-DEFAULT",
                align === "center" ? "left-1/2 -translate-x-1/2" : "left-0"
              )}
            />
          </Heading>
        </div>

        {/* ลิงก์ "ดูทั้งหมด" */}
        {link && (
          <Link
            href={link.href}
            className="group inline-flex items-center gap-1.5 text-sm font-medium font-sans
              text-primary-DEFAULT hover:text-primary-light transition-colors no-underline
              whitespace-nowrap"
          >
            {link.label}
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform duration-[200ms]"
            />
          </Link>
        )}
      </div>

      {description && (
        <p
          className={cn(
            "mt-6 text-[var(--text-secondary)] max-w-prose leading-relaxed",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
