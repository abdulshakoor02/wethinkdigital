import Link from 'next/link';
import type { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  /** Extra emphasis for the flagship card — rendered as a dark product surface. */
  featured?: boolean;
  /** Short supporting lines rendered under the summary. */
  points: string[];
  /** Optional label above the heading, e.g. "Flagship". */
  badge?: string;
}

/** Large product card. Always links to the internal product page. */
export default function ProductCard({
  product,
  featured = false,
  points,
  badge,
}: ProductCardProps) {
  return (
    <article
      className={[
        'relative flex h-full flex-col overflow-hidden p-8 sm:p-10',
        featured
          ? 'surface-dark transition-transform duration-200 ease-out hover:-translate-y-[3px]'
          : 'surface surface-hover',
      ].join(' ')}
    >
      <div className="relative flex flex-1 flex-col">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={[
              'inline-flex items-center rounded-full border px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.16em]',
              featured
                ? 'border-white/15 bg-white/[0.06] text-white/70'
                : 'border-secondary/40 bg-secondary-soft text-secondary',
            ].join(' ')}
          >
            {badge ?? product.shortName}
          </span>
          <span className={`text-xs ${featured ? 'text-white/45' : 'text-subtle'}`}>
            Built and run by us
          </span>
        </div>

        <h3
          className={[
            'mt-6 font-semibold tracking-[-0.04em]',
            featured ? 'text-3xl text-white sm:text-4xl' : 'text-2xl text-foreground sm:text-3xl',
          ].join(' ')}
        >
          <Link href={product.href} className="after:absolute after:inset-0">
            {product.shortName}
          </Link>
        </h3>

        <p
          className={[
            'mt-3 text-base font-medium',
            featured ? 'text-white/75' : 'text-secondary',
          ].join(' ')}
        >
          {product.tagline}
        </p>
        <p
          className={[
            'mt-4 max-w-xl text-sm leading-[1.65]',
            featured ? 'text-white/60' : 'text-muted',
          ].join(' ')}
        >
          {product.summary}
        </p>

        <ul className="mt-7 flex flex-col gap-3">
          {points.map((point) => (
            <li
              key={point}
              className={[
                'flex items-start gap-3 text-sm leading-[1.6]',
                featured ? 'text-white/60' : 'text-muted',
              ].join(' ')}
            >
              <span
                className={[
                  'mt-[0.5rem] h-1.5 w-1.5 shrink-0 rounded-[1px]',
                  featured ? 'bg-primary' : 'bg-secondary',
                ].join(' ')}
                aria-hidden="true"
              />
              {point}
            </li>
          ))}
        </ul>

        <p
          className={[
            'mt-auto pt-9 text-sm font-semibold',
            featured ? 'text-primary-soft' : 'text-primary',
          ].join(' ')}
        >
          <span aria-hidden="true">Explore {product.shortName} →</span>
          <span className="sr-only">Explore {product.name}</span>
        </p>
      </div>
    </article>
  );
}
