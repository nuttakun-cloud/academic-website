import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import Container from "@/components/ui/Container";
import PostCard from "@/components/academic/PostCard";
import { content } from "@/lib/content";
import { profile } from "@/content/profile";

// =============================================================================
// BLOG PAGE  (/blog)
// ดึง posts ผ่าน content provider (async, เรียงใหม่ → เก่า)
// โพสต์ล่าสุด = การ์ดเด่น (เต็มความกว้าง) + ที่เหลือเป็น grid
// =============================================================================

export const metadata: Metadata = {
  title: "Blog",
  description:
    `News, announcements, and writing from ${profile.name} — ` +
    `paper announcements, conference talks, and information for students.`,
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const { items: posts } = await content.posts.list({
    sortBy: "publishedAt",
    sortDir: "desc",
  });

  const [latest, ...rest] = posts;

  return (
    <>
      <Navbar />

      <main id="main-content" className="flex-1">
        <PageHeader
          eyebrow="News & Writing"
          title="Updates from the Lab"
          description="Announcements about new papers, conference talks, and information for current and prospective students."
        />

        <section
          aria-label="Blog posts"
          className="bg-[var(--bg-page)] py-16"
        >
          <Container>
            {posts.length === 0 ? (
              <p className="text-[var(--text-muted)] py-12 text-center">
                No posts yet. Check back soon.
              </p>
            ) : (
              <div className="space-y-10">
                {/* Latest — featured */}
                {latest && <PostCard post={latest} featured />}

                {/* Rest — grid */}
                {rest.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rest.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
