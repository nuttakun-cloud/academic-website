import { cn } from "@/lib/utils";
import type { BadgeVariant } from "@/types";

// =============================================================================
// BADGE COMPONENT
// ป้ายเล็กๆ สำหรับ: publication type, status, tags, categories
// =============================================================================

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: "bg-primary-subtle text-primary-DEFAULT border-primary-DEFAULT/20",
  accent:  "bg-accent-subtle  text-accent-dark   border-accent-DEFAULT/20",
  success: "bg-green-50       text-green-700      border-green-200",
  warning: "bg-amber-50       text-amber-700      border-amber-200",
  muted:   "bg-[var(--bg-alt)] text-[var(--text-secondary)] border-[var(--border)]",
};

export default function Badge({
  variant = "muted",
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center",
        "font-sans text-2xs font-bold tracking-widest uppercase",
        "px-2.5 py-1 rounded-full border",
        "leading-none whitespace-nowrap",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
