import Container from "@/components/ui/Container";
import DiagonalTexture from "@/components/ui/DiagonalTexture";

// =============================================================================
// PAGE HEADER
// แถบหัวหน้าสีเข้ม (primary) — ใช้บนสุดของทุกหน้าภายใน
// reusable: หน้า Research / About / Publications / Teaching ใช้ component เดียวกัน
// accessibility: ใช้ <h1> เดียวต่อหน้า อยู่ที่นี่
// (texture/กรอบ ใช้ component กลางร่วมกับ Hero — ไม่ copy-paste แล้ว)
// =============================================================================

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export default function PageHeader({
  eyebrow,
  title,
  description,
}: PageHeaderProps) {
  return (
    <section className="relative bg-primary-DEFAULT text-white overflow-hidden">
      <DiagonalTexture />

      <Container className="relative py-16 lg:py-20">
        {eyebrow && <p className="eyebrow text-accent-light mb-4">{eyebrow}</p>}

        <h1 className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight">
          {title}
        </h1>

        {description && (
          <p className="mt-5 text-lg text-white/80 max-w-3xl leading-relaxed">
            {description}
          </p>
        )}
      </Container>
    </section>
  );
}
