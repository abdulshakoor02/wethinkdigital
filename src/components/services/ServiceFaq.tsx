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
    <div className="surface overflow-hidden">
      <div className="divide-y divide-line">
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
                  className="group flex w-full items-start justify-between gap-6 px-5 py-5 text-left transition-colors hover:bg-background-muted sm:px-7"
                >
                  <span className="text-base font-semibold tracking-[-0.022em] text-foreground sm:text-[1.0625rem]">
                    {item.question}
                  </span>
                  <span
                    aria-hidden="true"
                    className={[
                      'mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border text-primary transition-colors',
                      isOpen
                        ? 'border-primary bg-primary-soft'
                        : 'border-line group-hover:border-line-strong',
                    ].join(' ')}
                  >
                    <span
                      className={[
                        'text-base leading-none transition-transform duration-200',
                        isOpen ? 'rotate-45' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      +
                    </span>
                  </span>
                </button>
              </h3>
              <div
                id={`${key}-panel`}
                role="region"
                aria-labelledby={`${key}-trigger`}
                hidden={!isOpen}
                className="px-5 pb-6 sm:px-7"
              >
                <p className="max-w-3xl text-base leading-[1.66] text-muted">{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
