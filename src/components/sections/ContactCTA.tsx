import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";
import { profile } from "@/content/profile";

// =============================================================================
// CONTACT CTA SECTION
// แถบเรียกร้องให้ติดต่อ — ปิดท้ายหน้า Home
// เน้นว่ารับนักศึกษา PhD และความร่วมมือ
// =============================================================================

export default function ContactCTA() {
  return (
    <section
      aria-labelledby="contact-cta-heading"
      className="bg-primary-DEFAULT text-white py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-site mx-auto">
        <div
          className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <span className="eyebrow text-accent-light">Get in Touch</span>
            <h2
              id="contact-cta-heading"
              className="font-serif text-2xl md:text-3xl font-bold text-white mb-3"
            >
              Open to collaboration and PhD enquiries
            </h2>
            <p className="text-white/75 max-w-2xl leading-relaxed">
              I welcome enquiries from prospective students, researchers, and
              potential collaborators. Please review the contact guidance before
              reaching out.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-md
                bg-accent-DEFAULT text-white font-medium font-sans text-sm
                hover:bg-accent-light transition-colors no-underline
                focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Contact page
              <ArrowRight
                size={15}
                className="group-hover:translate-x-1 transition-transform duration-[200ms]"
              />
            </Link>

            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md
                bg-white/10 text-white border border-white/20 font-medium font-sans text-sm
                hover:bg-white/20 transition-colors no-underline
                focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              <Mail size={15} aria-hidden="true" />
              Email directly
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
