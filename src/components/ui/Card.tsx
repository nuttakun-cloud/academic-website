import { cn } from "@/lib/utils";

// =============================================================================
// CARD COMPONENT
// Base card — ทุก card ชนิดอื่น (PublicationCard, CourseCard ฯลฯ) ใช้ตัวนี้เป็นฐาน
// =============================================================================

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;       // เปิด/ปิด hover effect
  padding?: "none" | "sm" | "md" | "lg";
  as?: React.ElementType; // เปลี่ยน element: "article", "li", "div" ฯลฯ
}

const paddingStyles = {
  none: "",
  sm:   "p-4",
  md:   "p-6",
  lg:   "p-8",
};

export default function Card({
  children,
  className,
  hover = true,
  padding = "md",
  as: Component = "div",
}: CardProps) {
  return (
    <Component
      className={cn(
        // Base
        "bg-[var(--bg-elevated)] border border-[var(--border)]",
        "rounded-xl shadow-base overflow-hidden",
        "flex flex-col h-full",
        // Transition
        "transition-[box-shadow,transform,border-color] duration-[200ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
        // Hover (optional)
        hover && "hover:shadow-lg hover:-translate-y-0.5",
        // Padding
        paddingStyles[padding],
        className
      )}
    >
      {children}
    </Component>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS — Card.Header, Card.Body, Card.Footer
// ใช้แบบนี้: <Card><Card.Header>...</Card.Header></Card>
// ─────────────────────────────────────────────────────────────────────────────

Card.Header = function CardHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "pb-4 mb-4 border-b border-[var(--border-subtle)]",
        className
      )}
    >
      {children}
    </div>
  );
};

Card.Body = function CardBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex-1", className)}>
      {children}
    </div>
  );
};

Card.Footer = function CardFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "pt-4 mt-4 border-t border-[var(--border-subtle)]",
        "flex items-center flex-wrap gap-2",
        className
      )}
    >
      {children}
    </div>
  );
};
