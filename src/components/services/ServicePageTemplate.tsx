import Link from 'next/link';
import type { ServiceDetail } from '@/data/services';
import { getOtherServices } from '@/data/services';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Pill from '@/components/ui/Pill';
import CTA from '@/components/ui/CTA';
import ServiceFaq from './ServiceFaq';

interface ServicePageTemplateProps {
  service: ServiceDetail;
}

/**
 * Shared layout for all four service pages: hero, outcomes, capabilities,
 * deliverables, stack, FAQ, cross-links and the closing CTA. The page files
 * stay thin and only own metadata and structured data.
 */
export default function ServicePageTemplate({ service }: ServicePageTemplateProps) {
  const others = getOtherServices(service.slug);

  return (
    <>
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
              <li>
                <Link href="/services" className="transition-colors hover:text-primary">
                  Services
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground">{service.name}</li>
            </ol>
          </nav>

          <p className="mono-label mb-5">{service.tagline}</p>
          <h1 className="max-w-4xl text-4xl font-bold leading-[1.05] tracking-[-0.05em] text-foreground sm:text-6xl">
            {service.name}
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-muted">{service.heroDescription}</p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="btn-primary">
              Discuss a {service.name.toLowerCase()} project
            </Link>
            <Link href="/services" className="btn-secondary">
              All services
            </Link>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <Section bordered muted compact>
        <h2 className="text-2xl font-bold tracking-[-0.045em] text-foreground sm:text-3xl">
          What you get out of it
        </h2>
        <ul className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2">
          {service.outcomes.map((outcome, index) => (
            <li key={outcome} className="flex gap-4 border-t border-line pt-5">
              <span
                aria-hidden="true"
                className="font-mono text-xs tabular-nums leading-6 text-primary"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-base leading-7 text-muted">{outcome}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Capabilities */}
      <Section id="capabilities">
        <SectionHeading
          eyebrow="Capabilities"
          title="What the work involves"
          description={`The concrete engineering that makes up a ${service.name.toLowerCase()} engagement.`}
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {service.capabilities.map((capability) => (
            <article key={capability.title} className="bg-background p-7">
              <h3 className="text-lg font-semibold tracking-[-0.025em] text-foreground">
                {capability.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">{capability.description}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* Deliverables + stack */}
      <Section bordered muted>
        <div className="grid gap-16 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <SectionHeading
              eyebrow="Deliverables"
              title="What lands in your repository"
              description="Everything we produce is yours, in your accounts, documented well enough for your own engineers to carry forward."
            />
            <ul className="mt-10 space-y-4">
              {service.deliverables.map((deliverable) => (
                <li key={deliverable} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-[1px] bg-primary"
                  />
                  <span className="text-base leading-7 text-muted">{deliverable}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:pt-2">
            <h2 className="text-2xl font-bold tracking-[-0.045em] text-foreground sm:text-3xl">
              Technology we reach for
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted">
              Chosen per project against your constraints and what your team can maintain —
              never because it is new.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {service.stack.map((tech) => (
                <li key={tech}>
                  <Pill>{tech}</Pill>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq">
        <SectionHeading
          eyebrow="Questions"
          title={`${service.name}, answered directly`}
        />
        <div className="mt-12">
          <ServiceFaq items={service.faqs} idPrefix={service.slug} />
        </div>
      </Section>

      {/* Other services */}
      <Section bordered muted compact>
        <h2 className="text-2xl font-bold tracking-[-0.045em] text-foreground sm:text-3xl">
          The other three things we do
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {others.map((other) => (
            <Link
              key={other.slug}
              href={other.href}
              className="surface surface-hover group block p-6"
            >
              <h3 className="text-base font-semibold tracking-[-0.02em] text-foreground group-hover:text-primary">
                {other.name}
              </h3>
              <p className="mt-2.5 text-sm leading-6 text-muted">{other.tagline}</p>
            </Link>
          ))}
        </div>
      </Section>

      <CTA />
    </>
  );
}
