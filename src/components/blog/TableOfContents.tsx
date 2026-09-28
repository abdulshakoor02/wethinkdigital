'use client';

import { useEffect, useState } from 'react';
import type { TocEntry } from '@/types/blog';

interface TableOfContentsProps {
  entries: TocEntry[];
}

/**
 * Sticky contents rail with scroll spy. Desktop only — on narrow screens the
 * headings are close enough together that a rail costs more than it gives.
 */
export default function TableOfContents({ entries }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(entries[0]?.id ?? '');

  useEffect(() => {
    if (entries.length === 0) return;
    if (typeof IntersectionObserver === 'undefined') return;

    const headings = entries
      .map((entry) => document.getElementById(entry.id))
      .filter((el): el is HTMLElement => el !== null);

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (records) => {
        const onScreen = records
          .filter((record) => record.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (onScreen[0]?.target.id) {
          setActiveId(onScreen[0].target.id);
        }
      },
      // Bias the active band to the upper third so the highlight tracks what
      // the reader is actually looking at rather than what is entering below.
      { rootMargin: '-96px 0px -66% 0px', threshold: 0 },
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [entries]);

  if (entries.length < 3) return null;

  return (
    <nav aria-label="On this page" className="sticky top-28 hidden lg:block">
      <p className="mono-label mb-4">On this page</p>
      <ol className="space-y-1 border-l border-line">
        {entries.map((entry) => {
          const active = entry.id === activeId;
          return (
            <li key={entry.id}>
              <a
                href={`#${entry.id}`}
                aria-current={active ? 'true' : undefined}
                className={[
                  '-ml-px block border-l py-1.5 pl-4 text-sm leading-6 transition-colors',
                  active
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted hover:border-line-strong hover:text-foreground',
                ].join(' ')}
              >
                {entry.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
