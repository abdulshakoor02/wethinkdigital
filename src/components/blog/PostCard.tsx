import Link from 'next/link';
import type { PostSummary } from '@/types/blog';
import { formatPostDate } from './format';

interface PostCardProps {
  post: PostSummary;
  /** Renders the card heading as h3 when the section already owns an h2. */
  headingLevel?: 'h2' | 'h3';
}

/** Post card used on the blog index, related posts and the home page. */
export default function PostCard({ post, headingLevel: Heading = 'h2' }: PostCardProps) {
  return (
    <article className="surface surface-hover group relative flex h-full flex-col p-6 sm:p-7">
      <div className="flex items-center gap-3">
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-primary">
          {post.category}
        </span>
      </div>

      <Heading className="mt-4 text-xl font-bold leading-snug tracking-[-0.03em] text-foreground transition-colors group-hover:text-primary">
        <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 after:content-['']">
          {post.title}
        </Link>
      </Heading>

      <p className="mt-3 text-[0.9375rem] leading-7 text-muted">{post.excerpt}</p>

      <div className="mt-6 flex items-center gap-3 border-t border-line pt-4 text-xs text-muted">
        <time dateTime={post.date}>{formatPostDate(post.date)}</time>
        <span aria-hidden="true" className="text-line-strong">
          /
        </span>
        <span>{post.readTime}</span>
      </div>
    </article>
  );
}
