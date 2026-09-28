import Link from 'next/link';
import type { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  /** Extra emphasis for the flagship card. */
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
        'surface surface-hover relative flex h-full flex-col overflow-hidden p-8 sm:p-10',
        featured ? 'glow' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {featured ? (
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" aria-hidden="true" />
      ) : null}

      <div className="relative flex flex-1 flex-col">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`inline-flex items-center rounded-full border px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.18em] ${
              featured
                ? 'border-primary/40 bg-primary/10 text-primary'
                : 'border-secondary/40 bg-secondary/10 text-secondary'
            }`}
          >
            {badge ?? product.shortName}
          </span>
          <span className="text-xs text-muted">Built and run by us</span>
        </div>

        <h3
          className={`mt-6 font-bold tracking-[-0.04em] text-foreground ${
            featured ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'
          }`}
        >
          <Link href={product.href} className="after:absolute after:inset-0">
            {product.shortName}
          </Link>
        </h3>

        <p className="mt-3 text-base font-medium text-secondary">{product.tagline}</p>
        <p className="mt-4 max-w-xl text-sm leading-7 text-muted">{product.summary}</p>

        <ul className="mt-7 flex flex-col gap-3">
          {points.map((point) => (
            <li key={point} className="flex items-start gap-3 text-sm leading-6 text-muted">
              <span
                className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-[1px] ${
                  featured ? 'bg-primary' : 'bg-secondary'
                }`}
                aria-hidden="true"
              />
              {point}
            </li>
          ))}
        </ul>

        <p className="mt-auto pt-9 text-sm font-semibold text-primary">
          <span aria-hidden="true">Explore {product.shortName} →</span>
          <span className="sr-only">Explore {product.name}</span>
        </p>
      </div>
    </article>
  );
}
