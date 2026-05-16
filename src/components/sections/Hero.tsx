import Link from "next/link";
import Image from "next/image";
import { FlaskConical, FileText } from "lucide-react";
import Container from "@/components/ui/Container";
import DiagonalTexture from "@/components/ui/DiagonalTexture";
import { profile } from "@/content/profile";

// =============================================================================
// HERO SECTION
// ส่วนแรกสุดของหน้า — ตอบ 3 คำถามใน 10 วินาที:
// คุณเป็นใคร? วิจัยอะไร? หาผลงานได้ที่ไหน?
//
// accessibility: ใช้ <h1> เดียวต่อหน้า (อยู่ที่นี่)
// responsive: รูปซ้อนบน mobile, เคียงข้างบน desktop
// =============================================================================

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative bg-primary-DEFAULT text-white overflow-hidden"
    >
      <DiagonalTexture />

      <Container className="relative py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-center">

          {/* ── Text ── */}
          <div>
            <p className="eyebrow text-accent-light mb-4">
              {profile.institution} · {profile.department}
            </p>

            <h1
              id="hero-heading"
              className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight mb-4"
            >
              {profile.name}
            </h1>

            <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-8">
              {profile.title}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/research"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md
                  bg-accent-DEFAULT text-white font-medium font-sans text-sm
                  hover:bg-accent-light transition-colors no-underline
                  focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                <FlaskConical size={16} aria-hidden="true" />
                View Research
              </Link>

              <a
                href={profile.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md
                  bg-white/10 text-white border border-white/20 font-medium font-sans text-sm
                  hover:bg-white/20 transition-colors no-underline
                  focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                <FileText size={16} aria-hidden="true" />
                Download CV
              </a>
            </div>

            {/* Social links */}
            <div className="flex flex-wrap gap-4 mt-8">
              {profile.social.map(({ platform, url, label }) => (
                <a
                  key={platform}
                  href={url}
                  {...(!url.startsWith("mailto:") && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                  className="text-sm text-white/60 hover:text-accent-light transition-colors no-underline"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* ── Photo ── */}
          <div className="hidden lg:block">
            <div className="relative w-56 h-56 xl:w-64 xl:h-64">
              <Image
                src={profile.photo}
                alt={`Photograph of ${profile.name}`}
                fill
                priority
                sizes="256px"
                className="rounded-full object-cover border-4 border-white/15 shadow-xl"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
