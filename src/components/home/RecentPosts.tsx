import Link from 'next/link';
import PostCard from '@/components/blog/PostCard';
import Section from '@/components/ui/Section';
import { getRecentPosts, toSummary } from '@/data/posts';

/** Home section: the three most recent engineering notes. */
export default function RecentPosts() {
  const posts = getRecentPosts(3).map(toSummary);
  if (posts.length === 0) return null;

  return (
    <Section id="insights" bordered>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <p className="mono-label mb-5">Insights</p>
          <h2 className="text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-foreground sm:text-5xl">
            Engineering <span className="serif">notes</span>
          </h2>
          <p className="mt-6 text-[1.05rem] leading-[1.66] text-muted sm:text-[1.0625rem]">
            How we build AI agents, retrieval systems and production software — written by the
            engineers doing the work.
          </p>
        </div>

        <Link href="/blog" className="btn-secondary">
          Read all notes
        </Link>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} headingLevel="h3" />
        ))}
      </div>
    </Section>
  );
}
