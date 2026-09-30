import Link from 'next/link';
import Section from '@/components/ui/Section';

/**
 * Home promo band for the two free offers.
 *
 * The terms here are duplicated from `/offers` on purpose — this band is the
 * only place most visitors will see them, so it states the price rather than
 * promising "free" and leaving the cost to a click. If the offer changes,
 * `/offers` and this file both need updating.
 */
const offers = [
  {
    title: 'A website, built free',
    lines: ['Design and build at no cost', 'Hosting free for 3 months', 'Then AED 50 / month'],
    href: '/offers#website',
  },
  {
    title: 'Our CRM, free forever',
    lines: ['Unlimited users', 'Unlimited contacts', 'Not a trial — no expiry'],
    href: '/offers#crm',
  },
];

export default function OffersPromo() {
  return (
    <Section id="offers" bordered muted compact>
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-14">
        <div>
          <p className="mono-label mb-5">Offers</p>
          <h2 className="text-3xl font-semibold leading-[1.1] tracking-[-0.04em] text-foreground sm:text-4xl">
            Two things we do for <span className="serif">free</span>
          </h2>
          <p className="mt-5 max-w-md text-[0.9375rem] leading-7 text-muted">
            We build your site at no cost, and our own CRM is free with unlimited
            users and contacts. The hosting price after the free period is stated
            here rather than saved for a later conversation.
          </p>
          <Link href="/offers" className="btn-primary mt-7">
            See exactly what is free
          </Link>
        </div>

        <div className="grid gap-3.5 sm:grid-cols-2">
          {offers.map((offer) => (
            <Link
              key={offer.title}
              href={offer.href}
              className="surface surface-hover flex flex-col p-6 sm:p-7"
            >
              <h3 className="text-lg font-semibold tracking-[-0.025em] text-foreground">
                {offer.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {offer.lines.map((line) => (
                  <li key={line} className="flex gap-3 text-[0.875rem] leading-6 text-muted">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 flex-none rounded-[1px] bg-primary"
                    />
                    {line}
                  </li>
                ))}
              </ul>
              <span className="mt-auto pt-6 text-[0.875rem] font-medium text-primary">
                Details →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
}
