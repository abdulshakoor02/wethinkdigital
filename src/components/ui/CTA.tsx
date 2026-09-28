import Link from 'next/link';
import Section from './Section';

interface CTAProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  /**
   * Render the primary action as an external link (new tab, rel-protected)
   * instead of a client-side route. Used by the product pages, whose main
   * action opens a live app on another subdomain.
   */
  primaryExternal?: boolean;
  secondaryLabel?: string;
  secondaryHref?: string;
  secondaryExternal?: boolean;
}

/** Closing call-to-action band. Reused at the bottom of every inner page. */
export default function CTA({
  eyebrow = 'Next step',
  title = 'Tell us what you are trying to build.',
  description = 'Send us the problem, the constraints and the deadline. We will come back with a technical approach, a shape for the team, and an honest view of what is achievable.',
  primaryLabel = 'Start a conversation',
  primaryHref = '/contact',
  primaryExternal = false,
  secondaryLabel = 'See our products',
  secondaryHref = '/products',
  secondaryExternal = false,
}: CTAProps) {
  return (
    <Section bordered muted>
      <div className="surface glow relative overflow-hidden p-8 sm:p-14">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" aria-hidden="true" />
        <div className="relative max-w-3xl">
          <p className="mono-label mb-5">{eyebrow}</p>
          <h2 className="text-3xl font-bold leading-[1.1] tracking-[-0.045em] text-foreground sm:text-5xl">
            {title}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{description}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            {primaryExternal ? (
              <a href={primaryHref} target="_blank" rel="noopener noreferrer" className="btn-primary">
                {primaryLabel}
                <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <Link href={primaryHref} className="btn-primary">
                {primaryLabel}
              </Link>
            )}

            {secondaryExternal ? (
              <a href={secondaryHref} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                {secondaryLabel}
                <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <Link href={secondaryHref} className="btn-secondary">
                {secondaryLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
