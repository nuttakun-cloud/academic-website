// gray-matter ไม่ได้แถม TypeScript types — ประกาศแบบย่อให้พอใช้
declare module "gray-matter" {
  interface GrayMatterFile {
    data: Record<string, unknown>;
    content: string;
  }
  function matter(input: string): GrayMatterFile;
  export default matter;
}
