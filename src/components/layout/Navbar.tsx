"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

// =============================================================================
// NAVBAR
// - Sticky top navigation
// - Active link highlight
// - Mobile hamburger menu
// - Dark mode toggle
//
// เมนูดึงจาก siteConfig.nav (เดิม hardcode ที่นี่)
// =============================================================================

// class ของ nav link — รวมไว้ที่เดียว (เดิมเขียนซ้ำ desktop + mobile)
function navLinkClass(active: boolean, block = false) {
  return cn(
    "rounded-md text-sm font-medium font-sans tracking-wide",
    "transition-colors duration-[120ms] no-underline",
    block ? "block px-3 py-2.5" : "px-3 py-2",
    active
      ? "text-primary-DEFAULT bg-primary-subtle"
      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-alt)]"
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // ตรวจสอบว่า link ปัจจุบัน active หรือไม่
  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-[200]",
        "bg-[var(--bg-elevated)]/95 backdrop-blur-sm",
        "border-b border-[var(--border)]",
        "shadow-sm"
      )}
    >
      <Container as="nav" className="" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo / Name ── */}
          <Link
            href="/"
            className={cn(
              "font-serif text-lg font-semibold tracking-tight",
              "text-primary-DEFAULT hover:text-primary-light",
              "transition-colors duration-[120ms]",
              "no-underline"
            )}
          >
            {siteConfig.shortName}
          </Link>

          {/* ── Desktop Links ── */}
          <div className="hidden md:flex items-center gap-1">
            {siteConfig.nav.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={navLinkClass(isActive(href))}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* ── Right Controls ── */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className={cn(
                "md:hidden w-9 h-9 flex items-center justify-center",
                "rounded-lg border border-[var(--border)]",
                "text-[var(--text-secondary)] hover:bg-[var(--bg-alt)]",
                "transition-colors duration-[120ms]"
              )}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        {mobileOpen && (
          <div className="md:hidden py-3 pb-4 border-t border-[var(--border-subtle)]">
            {siteConfig.nav.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={navLinkClass(isActive(href), true)}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </Container>
    </header>
  );
}
