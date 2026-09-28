import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Page not found',
  description:
    'That page does not exist. Jump to our services, products, engineering notes or contact page.',
  path: '/404',
  noIndex: true,
});

const destinations: { name: string; href: string; description: string }[] = [
  {
    name: 'Home',
    href: '/',
    description: 'What we build and how we work.',
  },
  {
    name: 'Services',
    href: '/services',
    description: 'AI automation, AI engineering, software and web development.',
  },
  {
    name: 'Products',
    href: '/products',
    description: 'Agents for software delivery, and AI resume redesign.',
  },
  {
    name: 'Blog',
    href: '/blog',
    description: 'Engineering notes on agents, LLM systems and delivery.',
  },
  {
    name: 'Contact',
    href: '/contact',
    description: 'Tell us what you are trying to ship.',
  },
];

export default function NotFound() {
  return (
    <main id="main" className="pt-32">
      <section className="grid-bg">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
          <p className="mono-label">Error 404</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-[-0.045em] text-foreground sm:text-5xl lg:text-6xl">
            This page isn&apos;t here.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            The URL may be mistyped, or the page may have been removed when we rebuilt this
            site. Everything we publish is reachable from the links below.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/" className="btn-primary">
              Back to home
            </Link>
            <Link href="/contact" className="btn-secondary">
              Talk to an engineer
            </Link>
          </div>

          <nav aria-label="Helpful links" className="mt-16 border-t border-line pt-10">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
              Try one of these
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {destinations.map((destination) => (
                <li key={destination.href}>
                  <Link
                    href={destination.href}
                    className="surface surface-hover block h-full rounded-xl border border-line p-6 transition-colors"
                  >
                    <span className="text-base font-semibold text-foreground">
                      {destination.name}
                    </span>
                    <span className="mt-2 block text-sm text-muted">
                      {destination.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </main>
  );
}
