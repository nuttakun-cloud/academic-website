import { cn } from "@/lib/utils";

// =============================================================================
// CONTAINER — กรอบความกว้าง + padding มาตรฐาน
// เดิม class "max-w-site mx-auto px-4 sm:px-6 lg:px-8" เขียนซ้ำ 5+ ที่
// แก้ระยะขอบทั้งเว็บ → แก้ที่นี่ที่เดียว
// =============================================================================

interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export default function Container({
  children,
  className,
  as: Tag = "div",
  ...rest
}: ContainerProps) {
  return (
    <Tag
      className={cn("max-w-site mx-auto px-4 sm:px-6 lg:px-8", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
