import type { Metadata } from 'next';
import Link from 'next/link';

import JsonLd from '@/components/JsonLd';
import AgentRoleCards from '@/components/products/AgentRoleCards';
import AudienceGrid from '@/components/products/AudienceGrid';
import FeatureGrid from '@/components/products/FeatureGrid';
import PipelineDiagram from '@/components/products/PipelineDiagram';
import ProductFaq from '@/components/products/ProductFaq';
import ProductHero from '@/components/products/ProductHero';
import Reveal from '@/components/products/Reveal';
import TerminalTranscript from '@/components/products/TerminalTranscript';
import {
  breadcrumbSchema,
  faqPageSchema,
  softwareApplicationSchema,
} from '@/components/products/schema';
import CTA from '@/components/ui/CTA';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import { agentsProduct } from '@/data/products';
import { buildMetadata } from '@/lib/seo';

const product = agentsProduct;

export const metadata: Metadata = buildMetadata({
  title: product.metaTitle,
  description: product.metaDescription,
  path: product.href,
  keywords: product.keywords,
});

const fitPoints = [
  {
    title: 'Your repository',
    description:
      'Agents work on the repository you already have, using your branching model and your conventions. Nothing is copied into a separate system and nothing is rewritten to suit the tooling.',
  },
  {
    title: 'Your backlog',
    description:
      'Work items come from the tracker your team already writes tickets in. The description and acceptance criteria are the brief, so better tickets produce better output — as they always did.',
  },
  {
    title: 'Your CI',
    description:
      'Branches and pull requests flow through the checks you have configured. The agents add a testing pass and a review pass before your pipeline runs, not instead of it.',
  },
  {
    title: 'Your merge button',
    description:
      'The pipeline stops at review by design. An engineer reads the change, the test results and the comments, and decides. Nothing reaches your main line on an agent\u2019s say-so.',
  },
];

export default function AgentsPage() {
  return (
    <>
      <JsonLd id="agents-software" data={softwareApplicationSchema(product)} />
      <JsonLd id="agents-faq" data={faqPageSchema(product)} />
      <JsonLd
        id="agents-breadcrumbs"
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' },
          { name: product.shortName, path: product.href },
        ])}
      />

      <ProductHero
        eyebrow={product.heroEyebrow}
        title={
          <>
            An autonomous software delivery team that plugs into{' '}
            <span className="serif">your backlog</span>
          </>
        }
        description={product.heroDescription}
        externalUrl={product.externalUrl}
        externalLabel={product.primaryCtaLabel}
        secondaryHref="/contact"
        secondaryLabel="Talk to us about a rollout"
        highlights={[
          'SDE agent implements the work item',
          'QA agent tests it independently',
          'PR Review agent comments on pull requests',
          'A human still approves every merge',
        ]}
      >
        <TerminalTranscript />
      </ProductHero>

      {/* ---------------------------------------------------------------- */}
      {/* The three agents                                                  */}
      {/* ---------------------------------------------------------------- */}
      <Section id="agents" bordered muted>
        <SectionHeading
          eyebrow="The team"
          title={
            <>
              Three specialised agents, <span className="serif">one backlog</span>
            </>
          }
          description="Implementation, testing and review are different jobs with different failure modes. Splitting them across three agents means no agent ever signs off its own work."
        />
        <Reveal className="mt-14">
          <AgentRoleCards />
        </Reveal>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* How it works                                                      */}
      {/* ---------------------------------------------------------------- */}
      <Section id="how-it-works">
        <SectionHeading
          eyebrow="How it works"
          title={
            <>
              From work item <span className="serif">to merge</span>
            </>
          }
          description="One pass through the pipeline. Each stage hands something concrete to the next, and the last stage is a person."
        />
        <Reveal className="mt-14">
          <PipelineDiagram
            steps={product.workflow}
            agentSteps={[1, 2, 4]}
            summary="The pipeline runs in six stages, in order: a work item is picked up from the backlog; the SDE agent implements it on a branch; the QA agent tests that branch against the acceptance criteria; a pull request is raised; the PR Review agent reviews the diff and leaves comments and a verdict; finally a human engineer reviews everything and merges."
          />
        </Reveal>

        <Reveal className="mt-14" delay={0.05}>
          <div className="surface flex flex-col gap-5 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <p className="max-w-2xl text-sm leading-[1.65] text-muted">
              If the QA agent finds a defect, the branch goes back to the SDE agent rather than
              forward to review. A broken implementation costs you a loop inside the pipeline, not a
              rejected pull request on your team&rsquo;s desk.
            </p>
            <a
              href={product.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary shrink-0"
            >
              See it running
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </Reveal>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Where it fits                                                     */}
      {/* ---------------------------------------------------------------- */}
      <Section bordered muted>
        <SectionHeading
          eyebrow="Where it fits"
          title="It joins your setup. You do not rebuild around it."
          description="Adopting Agents should not require a migration, a new tracker or a change of process. It attaches to the four things you already have."
        />
        <div className="mt-14 grid gap-3.5 sm:grid-cols-2">
          {fitPoints.map((point) => (
            <div key={point.title} className="surface surface-hover p-7 sm:p-8">
              <h3 className="text-lg font-semibold tracking-[-0.025em] text-foreground">
                {point.title}
              </h3>
              <p className="mt-3 text-sm leading-[1.65] text-muted">{point.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Features                                                          */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <SectionHeading
          eyebrow="Capabilities"
          title="What the platform does"
          description="Built around how software actually gets delivered: scoped work, isolated branches, independent testing and a review a human can act on."
        />
        <Reveal className="mt-14">
          <FeatureGrid features={product.features} />
        </Reveal>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Who it is for                                                     */}
      {/* ---------------------------------------------------------------- */}
      <Section bordered muted>
        <SectionHeading
          eyebrow="Who it is for"
          title={
            <>
              Teams where <span className="serif">throughput</span> is the constraint
            </>
          }
          description="Agents earns its place when the bottleneck is volume of routine work, not shortage of ideas."
        />
        <div className="mt-14">
          <AudienceGrid items={product.audience} />
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* FAQ                                                               */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            eyebrow="Questions"
            title="Before you roll it out"
            description={
              <>
                Still unsure whether it fits your stack?{' '}
                <Link
                  href="/contact"
                  className="text-primary underline decoration-primary/40 underline-offset-4"
                >
                  Send us the details
                </Link>{' '}
                and we will give you a straight answer.
              </>
            }
          />
          <ProductFaq faqs={product.faqs} />
        </div>
      </Section>

      <CTA
        eyebrow="Try it"
        title="Point it at one repository and judge the pull requests."
        description="The fastest way to evaluate Agents is to let it work a narrow slice of your backlog and review what comes back. Open the app, or talk to us about a scoped rollout on your codebase."
        primaryLabel={product.primaryCtaLabel}
        primaryHref={product.externalUrl}
        primaryExternal
        secondaryLabel="Talk to us about a rollout"
        secondaryHref="/contact"
      />
    </>
  );
}
