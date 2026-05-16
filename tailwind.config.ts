import type { Config } from "tailwindcss";

// ─────────────────────────────────────────────────────────────────────────────
// TAILWIND CONFIG
// Design tokens from our design system mapped into Tailwind's utility classes.
// Every color, font, spacing value here matches the tokens we defined.
// ─────────────────────────────────────────────────────────────────────────────

const config: Config = {
  // darkMode: "class" → Tailwind switches dark styles when html has class="dark"
  // next-themes adds/removes that class automatically
  darkMode: "class",

  // Tell Tailwind which files to scan for class names (removes unused CSS)
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      // ── COLORS ──────────────────────────────────────────────────────────────
      colors: {
        // Primary — Deep institutional navy
        primary: {
          DEFAULT: "#1B2B5E",
          light:   "#2D4E8C",
          dark:    "#0F1A3D",
          subtle:  "#EEF1F8",
        },
        // Accent — University gold
        accent: {
          DEFAULT: "#C8973F",
          light:   "#E4B96A",
          dark:    "#A07830",
          subtle:  "#FDF5E8",
        },
        // alias แบบ flat — ทำให้ class ที่ใช้ทั่วโค้ด เช่น
        // bg-primary-DEFAULT / text-accent-DEFAULT ใช้งานได้
        "primary-DEFAULT": "#1B2B5E",
        "accent-DEFAULT":  "#C8973F",
        // Surfaces
        surface: {
          DEFAULT: "#F8F7F4",
          alt:     "#EEECEA",
          elevated:"#FFFFFF",
        },
        // Borders
        border: {
          DEFAULT: "#DDD9D4",
          subtle:  "#EEECEA",
        },
      },

      // ── FONTS ────────────────────────────────────────────────────────────────
      fontFamily: {
        // Serif for headings — academic gravitas
        serif: ["var(--font-garamond)", "Georgia", "serif"],
        // Sans for body — modern readability
        sans:  ["var(--font-inter)", "Helvetica Neue", "sans-serif"],
        // Mono for code and citations
        mono:  ["var(--font-mono)", "Courier New", "monospace"],
      },

      // ── TYPE SCALE (Major Third × 1.25) ─────────────────────────────────────
      fontSize: {
        "2xs": ["0.64rem",  { lineHeight: "1rem" }],
        xs:    ["0.8rem",   { lineHeight: "1.2rem" }],
        sm:    ["0.875rem", { lineHeight: "1.4rem" }],
        base:  ["1rem",     { lineHeight: "1.6rem" }],
        md:    ["1.25rem",  { lineHeight: "1.75rem" }],
        lg:    ["1.563rem", { lineHeight: "2rem" }],
        xl:    ["1.953rem", { lineHeight: "2.25rem" }],
        "2xl": ["2.441rem", { lineHeight: "2.75rem" }],
        "3xl": ["3.052rem", { lineHeight: "3.25rem" }],
        "4xl": ["3.815rem", { lineHeight: "4rem" }],
      },

      // ── SPACING (4px base grid) ──────────────────────────────────────────────
      spacing: {
        "18": "4.5rem",   // 72px — useful for section gaps
        "22": "5.5rem",   // 88px
        "30": "7.5rem",   // 120px
        "128": "32rem",   // 512px — max content width
      },

      // ── MAX WIDTHS ───────────────────────────────────────────────────────────
      maxWidth: {
        prose:      "72ch",   // Optimal reading line length
        content:    "760px",  // Blog / paper pages
        site:       "1280px", // Site max width
      },

      // ── SHADOWS ──────────────────────────────────────────────────────────────
      boxShadow: {
        sm:      "0 1px 2px rgba(0,0,0,0.05)",
        base:    "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)",
        md:      "0 4px 8px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.05)",
        lg:      "0 10px 20px rgba(0,0,0,0.08), 0 4px 8px rgba(0,0,0,0.04)",
        xl:      "0 20px 40px rgba(0,0,0,0.10), 0 8px 16px rgba(0,0,0,0.05)",
        primary: "0 4px 14px rgba(27,43,94,0.22)",
        accent:  "0 4px 14px rgba(200,151,63,0.28)",
      },

      // ── BORDER RADIUS ────────────────────────────────────────────────────────
      borderRadius: {
        sm:   "2px",
        base: "4px",
        md:   "6px",
        lg:   "8px",
        xl:   "12px",
        "2xl":"16px",
      },

      // ── TRANSITIONS ──────────────────────────────────────────────────────────
      transitionDuration: {
        fast:   "120",
        base:   "200",
        slow:   "350",
      },

      // ── ANIMATION ────────────────────────────────────────────────────────────
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        slideUpFade: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.97)" },
          to:   { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-in":    "fadeIn 350ms ease-out both",
        "slide-up":   "slideUpFade 350ms ease-out both",
        "scale-in":   "scaleIn 350ms ease-out both",
      },
    },
  },

  plugins: [],
};

export default config;
