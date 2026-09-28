import Link from 'next/link';
import type { ServiceDetail } from '@/data/services';
import Pill from '@/components/ui/Pill';

interface ServiceCardProps {
  service: ServiceDetail;
  /** Index number shown in the corner, e.g. "01". */
  index: number;
  /** Renders a larger, full-width treatment for the lead service. */
  featured?: boolean;
  /** Heading level, so the card fits the surrounding document outline. */
  headingLevel?: 'h2' | 'h3';
}

export default function ServiceCard({
  service,
  index,
  featured = false,
  headingLevel: Heading = 'h3',
}: ServiceCardProps) {
  return (
    <Link
      href={service.href}
      className={[
        'surface surface-hover group relative flex flex-col overflow-hidden',
        featured ? 'glow p-8 sm:p-10' : 'p-7',
      ].join(' ')}
    >
      {featured ? (
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" aria-hidden="true" />
      ) : null}

      <div className="relative flex items-start justify-between gap-6">
        <div>
          <span className="font-mono text-xs tabular-nums uppercase tracking-[0.24em] text-primary">
            {String(index).padStart(2, '0')}
          </span>
          <Heading
            className={[
              'mt-4 font-bold tracking-[-0.035em] text-foreground group-hover:text-primary',
              featured ? 'text-2xl sm:text-4xl' : 'text-xl',
            ].join(' ')}
          >
            {service.name}
          </Heading>
        </div>
        {featured ? <Pill tone="primary">Where most teams start</Pill> : null}
      </div>

      <p
        className={[
          'relative mt-4 leading-7 text-muted',
          featured ? 'max-w-2xl text-base sm:text-lg sm:leading-8' : 'text-sm',
        ].join(' ')}
      >
        {featured ? service.summary : service.tagline}
      </p>

      {featured ? (
        <ul className="relative mt-7 flex flex-wrap gap-2">
          {service.stack.slice(0, 6).map((tech) => (
            <li key={tech}>
              <Pill>{tech}</Pill>
            </li>
          ))}
        </ul>
      ) : null}

      <span
        aria-hidden="true"
        className="relative mt-auto pt-7 font-mono text-xs uppercase tracking-[0.18em] text-muted transition-colors group-hover:text-primary"
      >
        Explore {service.name} →
      </span>
    </Link>
  );
}
