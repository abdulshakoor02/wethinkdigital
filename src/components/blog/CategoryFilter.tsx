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
        className="flex flex-wrap items-center gap-2 border-t border-line pt-8"
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
                'pill cursor-pointer transition-transform',
                selected ? 'pill-ember' : 'hover:-translate-y-px',
              ].join(' ')}
            >
              {filter}
              <span className="tabular-nums opacity-60">{count}</span>
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
