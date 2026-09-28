'use client';

import { useMemo, useState } from 'react';
import type { BlogCategory, PostSummary } from '@/types/blog';
import PostCard from './PostCard';

interface CategoryFilterProps {
  posts: PostSummary[];
  categories: BlogCategory[];
}

const ALL = 'All' as const;
type Filter = BlogCategory | typeof ALL;

/**
 * Client-side category filter over the post index. Receives summaries only —
 * the full post bodies never cross the server/client boundary.
 */
export default function CategoryFilter({ posts, categories }: CategoryFilterProps) {
  const [active, setActive] = useState<Filter>(ALL);

  const filters = useMemo<Filter[]>(() => [ALL, ...categories], [categories]);
  const visible = useMemo(
    () => (active === ALL ? posts : posts.filter((post) => post.category === active)),
    [posts, active],
  );

  return (
    <div>
      <div
        role="group"
        aria-label="Filter notes by category"
        className="flex flex-wrap gap-2 border-y border-line py-5"
      >
        {filters.map((filter) => {
          const selected = filter === active;
          const count = filter === ALL ? posts.length : posts.filter((p) => p.category === filter).length;

          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              aria-pressed={selected}
              className={[
                'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium tracking-tight transition-colors',
                selected
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-line text-muted hover:border-line-strong hover:text-foreground',
              ].join(' ')}
            >
              {filter}
              <span className="font-mono text-[0.6875rem] tabular-nums opacity-70">{count}</span>
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="sr-only">
        {visible.length} {visible.length === 1 ? 'note' : 'notes'} shown
        {active === ALL ? '' : ` in ${active}`}.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((post) => (
          <PostCard key={post.id} post={post} headingLevel="h3" />
        ))}
      </div>
    </div>
  );
}
