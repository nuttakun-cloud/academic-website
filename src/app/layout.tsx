import type { Metadata, Viewport } from "next";
import { EB_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { siteConfig } from "@/config/site";
import "./globals.css";

// ─────────────────────────────────────────────────────────────────────────────
// FONTS
// next/font โหลด font จาก Google ตอน build time — ไม่มี request ไป Google
// เมื่อ user เปิดเว็บ เพิ่มความเร็วและ privacy
// ─────────────────────────────────────────────────────────────────────────────

const garamond = EB_Garamond({
  variable: "--font-garamond",   // ชื่อ CSS variable ที่เราใช้ใน globals.css
  subsets: ["latin"],
  display: "swap",               // แสดง fallback font ก่อน แล้วค่อย swap
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

// ─────────────────────────────────────────────────────────────────────────────
// METADATA — SEO
// Next.js ส่งข้อมูลนี้ไปใน <head> อัตโนมัติ — Google อ่านข้อมูลนี้
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  // ชื่อที่แสดงใน browser tab และ Google results
  title: {
    default:  siteConfig.title,
    template: `%s | ${siteConfig.shortName}`,  // "Research" → "Research | Prof. Jane Smith"
  },

  description: siteConfig.description,

  keywords: [
    "ชีววิทยา",
    "biodiversity",
    "science education",
    "teaching materials",
    "มหาวิทยาลัยราชภัฏรำไพพรรณี",
    siteConfig.name,
  ],

  // Open Graph — แสดงผลเมื่อแชร์ลิงก์ใน Facebook, LinkedIn
  openGraph: {
    type:        "website",
    locale:      siteConfig.locale,
    url:         siteConfig.url,
    siteName:    siteConfig.name,
    title:       siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url:    siteConfig.ogImage,   // รูป 1200×630px สำหรับ social preview
        width:  1200,
        height: 630,
        alt:    siteConfig.name,
      },
    ],
  },

  // Twitter Card
  twitter: {
    card:        "summary_large_image",
    site:        siteConfig.twitter,
    creator:     siteConfig.twitter,
    title:       siteConfig.title,
    description: siteConfig.description,
    images:      [siteConfig.ogImage],
  },

  // Canonical URL — บอก Google ว่า URL ต้นฉบับคืออะไร
  metadataBase: new URL(siteConfig.url),
  alternates: { canonical: "/" },

  // Robots — บอก Google ให้ index เว็บ
  robots: {
    index:          true,
    follow:         true,
    googleBot: {
      index:             true,
      follow:            true,
      "max-image-preview": "large",
    },
  },

  // ข้อมูลผู้เขียน
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
};

// ─────────────────────────────────────────────────────────────────────────────
// VIEWPORT — mobile optimization
// ─────────────────────────────────────────────────────────────────────────────

export const viewport: Viewport = {
  width:        "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8F7F4" },
    { media: "(prefers-color-scheme: dark)",  color: "#0F1117" },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// ROOT LAYOUT
// ทุกหน้าใน app/ จะถูกครอบด้วย layout นี้
// ─────────────────────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      // suppressHydrationWarning ป้องกัน warning ที่เกิดจาก next-themes
      // เพราะ server ไม่รู้ theme ของ user จนกว่า JavaScript จะ load
      suppressHydrationWarning
      className={`
        ${garamond.variable}
        ${inter.variable}
        ${jetbrainsMono.variable}
        h-full
      `}
    >
      <body className="min-h-full flex flex-col font-sans antialiased">
        {/*
          ThemeProvider จาก next-themes:
          - attribute="class"  → เพิ่ม class="dark" บน <html>
          - defaultTheme="system" → ใช้ system preference เป็น default
          - enableSystem → อ่านค่า prefers-color-scheme จาก OS
        */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
