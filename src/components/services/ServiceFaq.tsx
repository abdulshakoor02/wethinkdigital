'use client';

import { useState } from 'react';

export interface ServiceFaqItem {
  question: string;
  answer: string;
}

interface ServiceFaqProps {
  items: ServiceFaqItem[];
  /** Prefix for generated element ids so multiple accordions can coexist. */
  idPrefix?: string;
}

function slugify(value: string, index: number): string {
  const base = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);
  return base || `item-${index}`;
}

/**
 * Accessible accordion: each question is a button that toggles a labelled
 * region. Keyboard operable by default, single element in the tab order per
 * question, and state announced through aria-expanded.
 */
export default function ServiceFaq({ items, idPrefix = 'faq' }: ServiceFaqProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, index) => {
        const key = `${idPrefix}-${slugify(item.question, index)}`;
        const isOpen = openId === key;

        return (
          <div key={key}>
            <h3>
              <button
                type="button"
                id={`${key}-trigger`}
                aria-expanded={isOpen}
                aria-controls={`${key}-panel`}
                onClick={() => setOpenId(isOpen ? null : key)}
                className="flex w-full items-start justify-between gap-6 py-6 text-left"
              >
                <span className="text-base font-semibold tracking-[-0.02em] text-foreground sm:text-lg">
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className={[
                    'mt-1 shrink-0 text-xl leading-none text-primary transition-transform duration-200',
                    isOpen ? 'rotate-45' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={`${key}-panel`}
              role="region"
              aria-labelledby={`${key}-trigger`}
              hidden={!isOpen}
              className="pb-7 pr-10"
            >
              <p className="max-w-3xl text-base leading-7 text-muted">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
