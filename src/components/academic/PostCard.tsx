import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  cn,
  formatDate,
  postCategoryLabel,
  postCategoryColor,
  postUrl,
} from "@/lib/utils";
import type { BlogPost } from "@/types/content";

// =============================================================================
// POST CARD
// รับ type ใหม่จาก @/types/content
// featured = true → การ์ดใหญ่ (โพสต์เด่น), false → การ์ดปกติใน grid
// =============================================================================

interface PostCardProps {
  post: BlogPost;
  featured?: boolean;
  className?: string;
}

export default function PostCard({
  post,
  featured = false,
  className,
}: PostCardProps) {
  const { slug, title, excerpt, category, publishedAt, readingTimeMinutes } =
    post;

  return (
    <article
      className={cn(
        "group bg-[var(--bg-elevated)] border border-[var(--border)]",
        "rounded-xl shadow-base flex flex-col h-full p-6",
        "transition-[box-shadow,transform] duration-[200ms]",
        "hover:shadow-lg hover:-translate-y-0.5",
        featured && "md:p-8",
        className
      )}
    >
      {/* Category + date */}
      <div className="flex items-center gap-3 mb-3 flex-wrap">
        <span
          className={cn(
            "text-2xs font-bold tracking-widest uppercase px-2.5 py-1 rounded-full",
            postCategoryColor[category]
          )}
        >
          {postCategoryLabel[category]}
        </span>
        {publishedAt && (
          <time
            dateTime={publishedAt}
            className="text-xs text-[var(--text-muted)]"
          >
            {formatDate(publishedAt)}
          </time>
        )}
        {readingTimeMinutes && (
          <span className="text-xs text-[var(--text-muted)]">
            · {readingTimeMinutes} min read
          </span>
        )}
      </div>

      {/* Title */}
      <h3
        className={cn(
          "font-serif font-semibold leading-snug mb-2",
          featured ? "text-2xl" : "text-lg"
        )}
      >
        <Link
          href={postUrl(slug)}
          className="text-[var(--text-primary)] hover:text-primary-light transition-colors no-underline"
        >
          {title}
        </Link>
      </h3>

      {/* Excerpt */}
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 flex-1">
        {excerpt}
      </p>

      {/* Read more */}
      <Link
        href={postUrl(slug)}
        className="inline-flex items-center gap-1.5 text-sm font-medium font-sans
          text-primary-DEFAULT hover:text-primary-light transition-colors no-underline mt-auto"
      >
        Read more
        <ArrowRight
          size={14}
          className="group-hover:translate-x-1 transition-transform duration-[200ms]"
          aria-hidden="true"
        />
      </Link>
    </article>
  );
}
