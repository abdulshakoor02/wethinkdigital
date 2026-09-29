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

/**
 * Closing call-to-action band. Reused at the bottom of every inner page.
 *
 * Ember treats dark as an accent object rather than the page canvas, so the
 * band is a single `.surface-dark` card on the muted bone section — the same
 * device the reference uses for its closing block.
 */
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
      <div className="surface-dark overflow-hidden px-7 py-12 text-center sm:px-14 sm:py-16">
        <p className="mono-label mb-5">{eyebrow}</p>
        <h2 className="mx-auto max-w-2xl text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl">
          {title}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-[1.05rem] leading-[1.66] text-white/60 sm:text-[1.0625rem]">
          {description}
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
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
    </Section>
  );
}
