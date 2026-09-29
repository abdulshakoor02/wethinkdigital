import Link from 'next/link';
import type { PostSummary } from '@/types/blog';
import { formatPostDate } from './format';

interface PostCardProps {
  post: PostSummary;
  /** Renders the card heading as h3 when the section already owns an h2. */
  headingLevel?: 'h2' | 'h3';
}

/**
 * Post card used on the blog index, related posts and the home page.
 *
 * Receives `PostSummary` only: the multi-kilobyte article bodies stay on the
 * server and never cross into the client bundle.
 */
export default function PostCard({ post, headingLevel: Heading = 'h2' }: PostCardProps) {
  return (
    <article className="surface surface-hover group relative flex h-full flex-col p-6 sm:p-7">
      <span className="pill self-start">{post.category}</span>

      <Heading className="mt-5 text-xl font-semibold leading-snug tracking-[-0.025em] text-foreground transition-colors group-hover:text-primary">
        <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 after:content-['']">
          {post.title}
        </Link>
      </Heading>

      <p className="mb-6 mt-3 text-base leading-[1.65] text-muted">{post.excerpt}</p>

      <div className="mt-auto flex items-center gap-3 border-t border-line pt-4 text-xs text-subtle">
        <time dateTime={post.date}>{formatPostDate(post.date)}</time>
        <span aria-hidden="true" className="text-line-strong">
          /
        </span>
        <span>{post.readTime}</span>
      </div>
    </article>
  );
}
