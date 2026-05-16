import Link from "next/link";
import { GraduationCap, Mail } from "lucide-react";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { profile } from "@/content/profile";

// =============================================================================
// FOOTER
// ทุกข้อมูลดึงจาก profile.ts + siteConfig — ไม่มี array hardcode ซ้ำอีกต่อไป
// (เดิม socialLinks/footerLinks/ชื่อ/สถาบัน hardcode ซ้ำในไฟล์นี้ → เสี่ยงเพี้ยน)
// =============================================================================

// เมนู footer = subset ของ nav หลัก (อ้างอิง href จาก siteConfig)
const footerNav = siteConfig.nav.filter((n) =>
  (siteConfig.footerNavHrefs as readonly string[]).includes(n.href)
);

// social ทั้งหมดดึงจาก profile.social (แหล่งเดียวกับ Hero)
const socialLinks = profile.social;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-DEFAULT text-white border-t-[3px] border-accent-DEFAULT mt-auto">
      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* ── Col 1: Identity ── */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap size={20} className="text-accent-DEFAULT" />
              <span className="font-serif text-lg font-semibold">
                {siteConfig.shortName}
              </span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed mb-4">
              {profile.title}<br />
              {profile.institution}<br />
              {profile.department}
            </p>
            <div className="flex items-center gap-1 text-sm text-white/60">
              <Mail size={13} />
              <a
                href={`mailto:${profile.email}`}
                className="hover:text-accent-light transition-colors no-underline"
              >
                {profile.email}
              </a>
            </div>
          </div>

          {/* ── Col 2: Quick Links ── */}
          <div>
            <h3 className="text-xs font-bold tracking-widest uppercase text-white/50 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {footerNav.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/70 hover:text-accent-light transition-colors no-underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Profiles ── */}
          <div>
            <h3 className="text-xs font-bold tracking-widest uppercase text-white/50 mb-4">
              Academic Profiles
            </h3>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map(({ platform, url, label }) => (
                <a
                  key={platform}
                  href={url}
                  {...(!url.startsWith("mailto:") && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                  aria-label={label}
                  title={label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold
                    bg-white/10 text-white/80 border border-white/15
                    hover:bg-white/20 hover:text-white transition-all no-underline"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-10 pt-6 border-t border-white/15 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/40">
          <p>© {currentYear} {siteConfig.name}. All rights reserved.</p>
          <p>{siteConfig.builtWith}</p>
        </div>
      </Container>
    </footer>
  );
}
