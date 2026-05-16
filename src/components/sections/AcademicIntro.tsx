import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { profile } from "@/content/profile";

// =============================================================================
// ACADEMIC INTRODUCTION SECTION
// บทแนะนำตัวแบบสั้น + รายการความสนใจวิจัย
// responsive: bio เต็มความกว้างบน mobile, 2/3 + 1/3 บน desktop
// =============================================================================

export default function AcademicIntro() {
  return (
    <section
      aria-labelledby="about-heading"
      className="bg-[var(--bg-page)] py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-site mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* ── Bio ── */}
        <div className="lg:col-span-2">
          <SectionHeading
            eyebrow="About"
            title="Academic Profile"
            as="h2"
          />

          {profile.bio.map((para, i) => (
            <p
              key={i}
              className="text-[var(--text-secondary)] leading-relaxed mb-4 max-w-prose"
            >
              {para}
            </p>
          ))}

          <Link
            href="/about"
            className="group inline-flex items-center gap-1.5 mt-2
              text-sm font-medium font-sans text-primary-DEFAULT
              hover:text-primary-light transition-colors no-underline"
          >
            Read full profile
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform duration-[200ms]"
            />
          </Link>
        </div>

        {/* ── Research Interests ── */}
        <aside aria-label="Research interests">
          <span className="eyebrow">Research Interests</span>
          <h3 className="font-serif text-xl font-semibold text-primary-DEFAULT mb-5">
            Topics
          </h3>
          <ul className="space-y-3">
            {profile.researchInterests.map((interest) => (
              <li
                key={interest}
                className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]"
              >
                <span
                  aria-hidden="true"
                  className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-DEFAULT shrink-0"
                />
                {interest}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
