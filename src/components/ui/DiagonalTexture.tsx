// =============================================================================
// DIAGONAL TEXTURE — เส้นทแยงจางๆ บนพื้นสีเข้ม
// เดิม markup ชุดนี้ copy-paste เหมือนกันเป๊ะใน Hero.tsx และ PageHeader.tsx
// รวมเป็น component เดียว — แก้ลวดลายที่นี่ที่เดียว
// decorative ล้วน → aria-hidden
// =============================================================================

export default function DiagonalTexture() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 40px)",
      }}
    />
  );
}
