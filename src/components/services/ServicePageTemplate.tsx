import Link from 'next/link';
import type { ServiceDetail } from '@/data/services';
import { getOtherServices } from '@/data/services';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import CapabilityChip from './CapabilityChip';
import CTA from '@/components/ui/CTA';
import ServiceFaq from './ServiceFaq';

interface ServicePageTemplateProps {
  service: ServiceDetail;
}

/**
 * Splits a service name so the final word carries the serif emphasis.
 * A single-word name is rendered plain rather than emphasised in full.
 */
function splitName(name: string): { head: string; emphasis: string | null } {
  const words = name.trim().split(/\s+/);
  if (words.length < 2) return { head: name, emphasis: null };
  const emphasis = words.pop() as string;
  return { head: words.join(' '), emphasis };
}

/**
 * Shared layout for all four service pages: hero, outcomes, capabilities,
 * deliverables, stack, FAQ, cross-links and the closing CTA. The page files
 * stay thin and only own metadata and structured data.
 */
export default function ServicePageTemplate({ service }: ServicePageTemplateProps) {
  const others = getOtherServices(service.slug);
  const { head, emphasis } = splitName(service.name);

  return (
    <>
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
          <h1 className="max-w-4xl text-[2.5rem] font-semibold leading-[1.06] tracking-[-0.045em] text-foreground sm:text-6xl lg:text-[4.4rem]">
            {head}
            {emphasis ? (
              <>
                {' '}
                <span className="serif">{emphasis}</span>
              </>
            ) : null}
          </h1>
          <p className="mt-7 max-w-3xl text-[1.05rem] leading-[1.66] text-muted sm:text-[1.0625rem]">
            {service.heroDescription}
          </p>

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
        <SectionHeading
          title={
            <>
              What you get <span className="serif">out of it</span>
            </>
          }
        />
        <ul className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2">
          {service.outcomes.map((outcome, index) => (
            <li key={outcome} className="flex gap-4 border-t border-line pt-5">
              <span aria-hidden="true" className="font-mono text-[11px] tabular-nums leading-6 text-primary">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-base leading-[1.66] text-muted">{outcome}</span>
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
        <div className="mt-14 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {service.capabilities.map((capability, index) => (
            <article key={capability.title} className="surface surface-hover p-6 sm:p-7">
              <CapabilityChip index={index} />
              <h3 className="mt-4 text-lg font-semibold tracking-[-0.025em] text-foreground">
                {capability.title}
              </h3>
              <p className="mt-2.5 text-sm leading-[1.62] text-muted">{capability.description}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* Deliverables + stack */}
      <Section bordered muted>
        <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Deliverables"
              title={
                <>
                  What lands in <span className="serif">your repository</span>
                </>
              }
              description="Everything we produce is yours, in your accounts, documented well enough for your own engineers to carry forward."
            />
            <ul className="mt-10 space-y-4">
              {service.deliverables.map((deliverable) => (
                <li key={deliverable} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-[1px] bg-primary"
                  />
                  <span className="text-base leading-[1.66] text-muted">{deliverable}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold tracking-[-0.025em] text-foreground sm:text-xl">
              Technology we reach for
            </h2>
            <p className="mt-4 max-w-xl text-base leading-[1.66] text-muted">
              Chosen per project against your constraints and what your team can maintain —
              never because it is new.
            </p>
            <ul className="mt-7 flex flex-wrap gap-2">
              {service.stack.map((tech) => (
                <li key={tech}>
                  <span className="pill">{tech}</span>
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
          title={
            <>
              {service.name}, <span className="serif">answered directly</span>
            </>
          }
        />
        <div className="mt-12">
          <ServiceFaq items={service.faqs} idPrefix={service.slug} />
        </div>
      </Section>

      {/* Other services */}
      <Section bordered compact>
        <h2 className="text-2xl font-semibold tracking-[-0.03em] text-foreground sm:text-3xl">
          The other three things <span className="serif">we do</span>
        </h2>
        <div className="mt-10 grid gap-3.5 sm:grid-cols-3">
          {others.map((other) => (
            <Link
              key={other.slug}
              href={other.href}
              className="surface surface-hover group flex flex-col p-6"
            >
              <h3 className="text-base font-semibold tracking-[-0.02em] text-foreground transition-colors group-hover:text-primary">
                {other.name}
              </h3>
              <p className="mt-2.5 text-sm leading-[1.62] text-muted">{other.tagline}</p>
              <span
                aria-hidden="true"
                className="mt-auto pt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-subtle transition-colors group-hover:text-primary"
              >
                View service →
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <CTA />
    </>
  );
}
