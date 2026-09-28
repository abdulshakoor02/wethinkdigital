import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import Section from '@/components/ui/Section';
import Pill from '@/components/ui/Pill';
import CTA from '@/components/ui/CTA';
import {
  buildServiceListSchema,
  buildServicesIndexBreadcrumbSchema,
} from '@/components/services/serviceSchema';
import { services } from '@/data/services';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Services — AI Automation, AI Engineering, Software & Web',
  description:
    'We do four things: agentic AI automation, production LLM and agent engineering, custom software development, and fast accessible web applications. Here is what each involves.',
  path: '/services',
  keywords: [
    'ai automation services',
    'ai engineering services',
    'custom software development',
    'web development services',
    'llm application development',
    'agentic workflows',
  ],
});

export default function ServicesIndexPage() {
  return (
    <>
      <JsonLd id="json-ld-services-list" data={buildServiceListSchema(services)} />
      <JsonLd id="json-ld-services-breadcrumb" data={buildServicesIndexBreadcrumbSchema()} />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-6 pb-20 sm:px-10 sm:pb-24 lg:px-16">
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted">
              <li>
                <Link href="/" className="transition-colors hover:text-primary">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground">Services</li>
            </ol>
          </nav>

          <p className="mono-label mb-5">Services</p>
          <h1 className="max-w-4xl text-4xl font-bold leading-[1.05] tracking-[-0.05em] text-foreground sm:text-6xl">
            Four things, done properly
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-muted">
            We are an AI and software engineering company. We take on work where the hard part is
            technical: automating operations that resist automation, building AI features that hold
            up on real data, designing systems that stay maintainable, and shipping web
            applications that are fast on the devices people actually own.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="btn-primary">
              Start a conversation
            </Link>
            <Link href="/products" className="btn-secondary">
              See our products
            </Link>
          </div>
        </div>
      </section>

      {/* Service list */}
      <Section bordered muted>
        <ol className="space-y-5">
          {services.map((service, index) => (
            <li key={service.slug}>
              <Link
                href={service.href}
                className="surface surface-hover group block p-7 sm:p-10"
              >
                <div className="grid gap-6 lg:grid-cols-[auto_1fr_auto] lg:items-start lg:gap-10">
                  <span className="font-mono text-xs tabular-nums uppercase tracking-[0.24em] text-primary lg:pt-2">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div>
                    <h2 className="text-2xl font-bold tracking-[-0.04em] text-foreground group-hover:text-primary sm:text-3xl">
                      {service.name}
                    </h2>
                    <p className="mt-2 text-base text-secondary">{service.tagline}</p>
                    <p className="mt-4 max-w-3xl text-base leading-7 text-muted">
                      {service.summary}
                    </p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {service.stack.slice(0, 7).map((tech) => (
                        <li key={tech}>
                          <Pill>{tech}</Pill>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <span
                    aria-hidden="true"
                    className="font-mono text-xs uppercase tracking-[0.18em] text-muted transition-colors group-hover:text-primary lg:pt-3"
                  >
                    Read more →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </Section>

      {/* How the four fit together */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <p className="mono-label mb-5">How they fit together</p>
            <h2 className="text-3xl font-bold leading-[1.1] tracking-[-0.045em] text-foreground sm:text-4xl">
              Most projects use more than one
            </h2>
          </div>
          <div className="space-y-6 text-base leading-7 text-muted">
            <p>
              An automation project usually needs an interface, so web work follows. An AI feature
              needs a backend that can serve it under load, so software engineering follows. We
              staff a single team across whatever the problem needs rather than handing you between
              departments.
            </p>
            <p>
              If you are not sure which of the four you need, describe the problem instead of the
              solution. We will tell you what it actually requires — including when the honest
              answer is that you do not need a model at all.
            </p>
          </div>
        </div>
      </Section>

      <CTA />
    </>
  );
}
