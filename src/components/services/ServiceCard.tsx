import Link from 'next/link';
import type { ServiceDetail } from '@/data/services';

interface ServiceCardProps {
  service: ServiceDetail;
  /** Index number shown in the corner, e.g. "01". */
  index: number;
  /** Renders a larger, full-width treatment for the lead service. */
  featured?: boolean;
  /** Heading level, so the card fits the surrounding document outline. */
  headingLevel?: 'h2' | 'h3';
  /** Grid placement when the card sits inside the home bento. */
  className?: string;
}

export default function ServiceCard({
  service,
  index,
  featured = false,
  headingLevel: Heading = 'h3',
  className = '',
}: ServiceCardProps) {
  return (
    <Link
      href={service.href}
      className={[
        'surface surface-hover group relative flex h-full flex-col overflow-hidden',
        featured ? 'glow p-7 sm:p-9' : 'p-6',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="flex items-start justify-between gap-5">
        <span className="font-mono text-[11px] tabular-nums uppercase tracking-[0.18em] text-subtle">
          {String(index).padStart(2, '0')}
        </span>
        {featured ? <span className="pill pill-ember">Where most teams start</span> : null}
      </div>

      <Heading
        className={[
          'font-semibold text-foreground transition-colors group-hover:text-primary',
          featured
            ? 'mt-6 text-2xl tracking-[-0.035em] sm:text-3xl'
            : 'mt-5 text-lg tracking-[-0.025em] sm:text-xl',
        ].join(' ')}
      >
        {service.name}
      </Heading>

      <p
        className={[
          'text-muted',
          featured
            ? 'mt-4 max-w-2xl text-[1.0625rem] leading-[1.66]'
            : 'mt-2.5 text-sm leading-[1.62]',
        ].join(' ')}
      >
        {featured ? service.summary : service.tagline}
      </p>

      {featured ? (
        <ul className="mt-7 flex flex-wrap gap-2">
          {service.stack.slice(0, 6).map((tech) => (
            <li key={tech}>
              <span className="pill">{tech}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <span
        aria-hidden="true"
        className="mt-auto pt-7 font-mono text-[11px] uppercase tracking-[0.16em] text-subtle transition-colors group-hover:text-primary"
      >
        Explore {service.name} →
      </span>
    </Link>
  );
}
