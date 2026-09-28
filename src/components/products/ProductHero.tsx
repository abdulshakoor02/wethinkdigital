import Link from 'next/link';
import type { ReactNode } from 'react';

interface ProductHeroProps {
  eyebrow: string;
  title: ReactNode;
  description: string;
  /** Live application URL — always opened in a new tab. */
  externalUrl: string;
  externalLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  /** Short supporting facts rendered under the buttons. */
  highlights?: string[];
  children?: ReactNode;
}

/** Shared hero band for the two product pages. Owns the single <h1>. */
export default function ProductHero({
  eyebrow,
  title,
  description,
  externalUrl,
  externalLabel,
  secondaryHref,
  secondaryLabel,
  highlights,
  children,
}: ProductHeroProps) {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pb-28">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="animate-fade-up">
            <p className="mono-label mb-5">{eyebrow}</p>
            <h1 className="text-4xl font-bold leading-[1.05] tracking-[-0.05em] text-foreground sm:text-6xl">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{description}</p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                {externalLabel}
                <span aria-hidden="true">↗</span>
              </a>
              <Link href={secondaryHref} className="btn-secondary">
                {secondaryLabel}
              </Link>
            </div>

            {highlights?.length ? (
              <ul className="mt-10 grid gap-3 sm:grid-cols-2">
                {highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-6 text-muted">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-[1px] bg-primary"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {children ? <div className="lg:justify-self-end lg:w-full">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
