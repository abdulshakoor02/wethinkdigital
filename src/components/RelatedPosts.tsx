import Link from 'next/link';
import PostCard from '@/components/blog/PostCard';
import { getRelatedPosts, toSummary } from '@/data/posts';
import type { BlogPost } from '@/types/blog';

interface RelatedPostsProps {
  post: BlogPost;
  count?: number;
}

/** Three sibling notes: same category first, then shared tags. */
export default function RelatedPosts({ post, count = 3 }: RelatedPostsProps) {
  const related = getRelatedPosts(post, count);
  if (related.length === 0) return null;

  return (
    <section aria-labelledby="related-notes" className="border-t border-line bg-background-muted">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mono-label mb-4">Keep reading</p>
            <h2
              id="related-notes"
              className="text-2xl font-bold tracking-[-0.045em] text-foreground sm:text-3xl"
            >
              Related notes
            </h2>
          </div>
          <Link href="/blog" className="text-sm font-semibold text-primary hover:text-secondary">
            All notes <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((item) => (
            <PostCard key={item.id} post={toSummary(item)} headingLevel="h3" />
          ))}
        </div>
      </div>
    </section>
  );
}
