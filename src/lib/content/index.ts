// =============================================================================
// CONTENT — จุด import เดียวของทั้งเว็บ
//
// component / page เรียกใช้แบบนี้:
//   import { content } from "@/lib/content";
//   const { items } = await content.publications.list({ featuredOnly: true });
//
// ── วันหน้าจะต่อ CMS ──
//   1. สร้างไฟล์ src/lib/content/cms-provider.ts
//      export const cmsProvider: ContentProvider = { ... fetch จาก API ... }
//   2. แก้ 2 บรรทัดด้านล่าง:
//        import { cmsProvider } from "./cms-provider";
//        const active = source === "cms" ? cmsProvider : localProvider;
//   3. ตั้ง env CONTENT_SOURCE=cms
//   เสร็จ — ไม่ต้องแตะ component แม้แต่ไฟล์เดียว
// =============================================================================

import type { ContentProvider } from "./provider";
import { localProvider } from "./local-provider";
import { markdownProvider } from "./markdown-provider";

// อ่านจาก environment variable (ถ้าไม่ตั้ง = markdown — เนื้อหาจริงอยู่ใน content-md/)
const source = process.env.CONTENT_SOURCE ?? "markdown";

function selectProvider(): ContentProvider {
  switch (source) {
    case "local":
      return localProvider;
    // case "cms":
    //   return cmsProvider;
    case "markdown":
    default:
      return markdownProvider;
  }
}

/** ตัวกลางเข้าถึงเนื้อหาทั้งหมด — import ตัวนี้ตัวเดียว */
export const content: ContentProvider = selectProvider();

// re-export types เพื่อความสะดวก (import จากที่เดียว)
export type {
  Publication,
  Course,
  ResearchProject,
  BlogPost,
  Author,
  Resource,
  ListQuery,
  ContentCollection,
} from "@/types/content";
