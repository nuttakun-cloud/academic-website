import type { Metadata } from "next";
import { Mail, MapPin, Clock } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import { profile } from "@/content/profile";

// =============================================================================
// CONTACT PAGE  (/contact)
//
// ── Netlify Forms ──
// ฟอร์มนี้ใช้งานได้จริง "ตอน deploy บน Netlify เท่านั้น"
// Netlify จะสแกน HTML ตอน build แล้วเปิดระบบรับฟอร์มให้อัตโนมัติ
// สิ่งจำเป็น 3 อย่าง (มีครบในฟอร์มด้านล่าง):
//   1. data-netlify="true"            → บอก Netlify ว่านี่คือฟอร์ม
//   2. <input hidden name="form-name"> → ระบุชื่อฟอร์มตอนส่ง
//   3. netlify-honeypot="bot-field"    → กันสแปมบอท
// เป็น server component (static) → Netlify ตรวจเจอ + ทำงานแม้ปิด JS
// =============================================================================

export const metadata: Metadata = {
  title: "Contact",
  description:
    `Contact ${profile.name} at ${profile.institution}. ` +
    `Enquiries from students, researchers, and potential collaborators are welcome.`,
  alternates: { canonical: "/contact" },
};

// แนวทางก่อนติดต่อ — ช่วยคัดกรองอีเมล
const routing = [
  { for: "PhD enquiries", note: "Include your CV and a brief research statement." },
  { for: "Collaboration", note: "Outline the proposed work and timeline." },
  { for: "Media / press", note: "Please contact the university press office." },
  { for: "Current students", note: "Use the course forum for module questions." },
];

const subjects = [
  "PhD enquiry",
  "Research collaboration",
  "Media / press",
  "Student question",
  "Other",
];

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main id="main-content" className="flex-1">
        <PageHeader
          eyebrow="Contact"
          title="Get in Touch"
          description="I welcome enquiries from prospective students, researchers, and potential collaborators."
        />

        {/* ── Routing guidance ── */}
        <section
          aria-labelledby="routing-heading"
          className="bg-[var(--bg-alt)] py-16"
        >
          <Container>
            <SectionHeading
              eyebrow="Before you write"
              title="Where to direct your message"
              as="h2"
            />
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {routing.map((r) => (
                <li
                  key={r.for}
                  className="bg-[var(--bg-elevated)] border border-[var(--border)]
                    rounded-lg p-4 text-sm"
                >
                  <span className="font-semibold text-primary-DEFAULT">
                    {r.for}
                  </span>
                  <span className="block text-[var(--text-secondary)] mt-1">
                    {r.note}
                  </span>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {/* ── Details + Form ── */}
        <section
          aria-labelledby="contact-form-heading"
          className="bg-[var(--bg-page)] py-20"
        >
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

              {/* Left: contact details */}
              <div className="lg:col-span-1">
                <SectionHeading eyebrow="Details" title="Reach Me" as="h2" />

                <ul className="space-y-4 text-sm">
                  <li className="flex items-start gap-3">
                    <Mail size={16} className="mt-0.5 text-accent-DEFAULT shrink-0" aria-hidden="true" />
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-primary-DEFAULT hover:text-primary-light transition-colors"
                    >
                      {profile.email}
                    </a>
                  </li>
                  <li className="flex items-start gap-3 text-[var(--text-secondary)]">
                    <MapPin size={16} className="mt-0.5 text-accent-DEFAULT shrink-0" aria-hidden="true" />
                    {profile.officeLocation}
                  </li>
                  <li className="flex items-start gap-3 text-[var(--text-secondary)]">
                    <Clock size={16} className="mt-0.5 text-accent-DEFAULT shrink-0" aria-hidden="true" />
                    {profile.officeHours}
                  </li>
                </ul>

                <div className="flex flex-wrap gap-3 mt-6">
                  {profile.social
                    .filter((s) => !s.url.startsWith("mailto:"))
                    .map((s) => (
                      <a
                        key={s.platform}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-primary-DEFAULT hover:text-primary-light transition-colors"
                      >
                        {s.label}
                      </a>
                    ))}
                </div>
              </div>

              {/* Right: Netlify form */}
              <div className="lg:col-span-2">
                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  action="/contact?success=1"
                  className="space-y-5"
                >
                  {/* จำเป็นสำหรับ Netlify — ระบุชื่อฟอร์ม */}
                  <input type="hidden" name="form-name" value="contact" />

                  {/* honeypot — ซ่อนจากคน บอทจะกรอก → ถูกตัดทิ้ง */}
                  <p className="hidden">
                    <label>
                      Do not fill this out:{" "}
                      <input name="bot-field" />
                    </label>
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1.5">
                        Name <span className="text-[var(--color-error,#991B1B)]" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        className="w-full px-3 py-2 rounded-md text-sm
                          bg-[var(--bg-elevated)] border border-[var(--border)]
                          text-[var(--text-primary)]
                          focus-visible:outline-2 focus-visible:outline-accent-DEFAULT"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1.5">
                        Email <span className="text-[var(--color-error,#991B1B)]" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className="w-full px-3 py-2 rounded-md text-sm
                          bg-[var(--bg-elevated)] border border-[var(--border)]
                          text-[var(--text-primary)]
                          focus-visible:outline-2 focus-visible:outline-accent-DEFAULT"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1.5">
                      Subject <span className="text-[var(--color-error,#991B1B)]" aria-hidden="true">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      defaultValue=""
                      className="w-full px-3 py-2 rounded-md text-sm
                        bg-[var(--bg-elevated)] border border-[var(--border)]
                        text-[var(--text-primary)]
                        focus-visible:outline-2 focus-visible:outline-accent-DEFAULT"
                    >
                      <option value="" disabled>
                        Select a topic…
                      </option>
                      {subjects.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1.5">
                      Message <span className="text-[var(--color-error,#991B1B)]" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      className="w-full px-3 py-2 rounded-md text-sm resize-y
                        bg-[var(--bg-elevated)] border border-[var(--border)]
                        text-[var(--text-primary)]
                        focus-visible:outline-2 focus-visible:outline-accent-DEFAULT"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-md
                      bg-primary-DEFAULT text-white text-sm font-medium font-sans
                      hover:bg-primary-light transition-colors
                      focus-visible:outline-2 focus-visible:outline-accent-DEFAULT focus-visible:outline-offset-2"
                  >
                    <Mail size={15} aria-hidden="true" />
                    Send message
                  </button>

                  <p className="text-xs text-[var(--text-muted)]">
                    Your message is sent securely via Netlify. Fields marked
                    <span aria-hidden="true"> *</span> are required.
                  </p>
                </form>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
