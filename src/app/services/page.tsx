import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import Section from '@/components/ui/Section';
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
        <div className="mesh" aria-hidden="true">
          <span className="m-ember" />
          <span className="m-sage" />
          <span className="m-amber" />
          <span className="m-fade" />
        </div>
        <div className="dot-field" aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl px-6 pb-20 sm:px-10 sm:pb-24 lg:px-16">
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
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
          <h1 className="max-w-4xl text-[2.5rem] font-semibold leading-[1.06] tracking-[-0.045em] text-foreground sm:text-6xl lg:text-[4.4rem]">
            Four things, <span className="serif">done properly</span>
          </h1>
          <p className="mt-7 max-w-3xl text-[1.05rem] leading-[1.66] text-muted sm:text-[1.0625rem]">
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
        <ol className="grid gap-3.5">
          {services.map((service, index) => (
            <li key={service.slug}>
              <Link
                href={service.href}
                className="surface surface-hover group block p-6 sm:p-9"
              >
                <div className="grid gap-6 lg:grid-cols-[auto_1fr_auto] lg:items-start lg:gap-10">
                  <span className="font-mono text-[11px] tabular-nums uppercase tracking-[0.18em] text-subtle lg:pt-2">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div>
                    <h2 className="text-2xl font-semibold tracking-[-0.035em] text-foreground transition-colors group-hover:text-primary sm:text-3xl">
                      {service.name}
                    </h2>
                    <p className="mt-2.5 text-base leading-[1.62] text-secondary">
                      {service.tagline}
                    </p>
                    <p className="mt-4 max-w-3xl text-base leading-[1.66] text-muted">
                      {service.summary}
                    </p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {service.stack.slice(0, 7).map((tech) => (
                        <li key={tech}>
                          <span className="pill">{tech}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <span
                    aria-hidden="true"
                    className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle transition-colors group-hover:text-primary lg:pt-3"
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
            <h2 className="text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-foreground sm:text-5xl">
              Most projects use <span className="serif">more than one</span>
            </h2>
          </div>
          <div className="space-y-6 text-base leading-[1.66] text-muted">
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
