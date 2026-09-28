import type { Metadata } from 'next';
import Link from 'next/link';

import JsonLd from '@/components/JsonLd';
import AudienceGrid from '@/components/products/AudienceGrid';
import FeatureGrid from '@/components/products/FeatureGrid';
import ProductFaq from '@/components/products/ProductFaq';
import ProductHero from '@/components/products/ProductHero';
import ResumeComparison from '@/components/products/ResumeComparison';
import Reveal from '@/components/products/Reveal';
import {
  breadcrumbSchema,
  faqPageSchema,
  softwareApplicationSchema,
} from '@/components/products/schema';
import CTA from '@/components/ui/CTA';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import { resumeProduct } from '@/data/products';
import { buildMetadata } from '@/lib/seo';

const product = resumeProduct;

export const metadata: Metadata = buildMetadata({
  title: product.metaTitle,
  description: product.metaDescription,
  path: product.href,
  keywords: product.keywords,
});

const fixes = [
  {
    title: 'Structure and hierarchy',
    description:
      'Sections reordered so the most relevant experience is read first, with headings that make the shape of your career obvious at a glance.',
  },
  {
    title: 'Inconsistent formatting',
    description:
      'One type scale, one date format, one bullet style, even spacing. The small inconsistencies that quietly read as carelessness are removed.',
  },
  {
    title: 'Vague bullet points',
    description:
      'Lines that describe duties are rewritten as outcome-led statements — what you did and what changed — using only the material already in your resume.',
  },
  {
    title: 'Length and density',
    description:
      'Repeated phrasing is collapsed and filler is cut, so a reader gets the substance without wading through three pages to find it.',
  },
  {
    title: 'Machine-readability',
    description:
      'A clean single-flow layout with real text, so applicant tracking systems parse your history correctly instead of dropping it.',
  },
  {
    title: 'Tailoring to a target role',
    description:
      'Point it at the job you are applying for and the emphasis, ordering and vocabulary shift to match what that role is asking for.',
  },
];

export default function ResumeAiPage() {
  return (
    <>
      <JsonLd id="resume-software" data={softwareApplicationSchema(product)} />
      <JsonLd id="resume-faq" data={faqPageSchema(product)} />
      <JsonLd
        id="resume-breadcrumbs"
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
            Your resume, <span className="gradient-text">redesigned by AI</span>
          </>
        }
        description={product.heroDescription}
        externalUrl={product.externalUrl}
        externalLabel={product.primaryCtaLabel}
        secondaryHref="/products"
        secondaryLabel="See our other product"
        highlights={[
          'Start from the document you already have',
          'Restructured, reformatted and rewritten for clarity',
          'Nothing invented — your facts stay your facts',
          'Clean output that parses correctly',
        ]}
      >
        <div className="surface glow relative overflow-hidden p-7 sm:p-8">
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" aria-hidden="true" />
          <div className="relative">
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-primary">
              What changes
            </p>
            <ul className="mt-5 flex flex-col gap-4">
              {[
                ['Structure', 'Buried → leading with the point'],
                ['Formatting', 'Mixed styles → one consistent system'],
                ['Bullet points', 'Duties → outcomes'],
                ['Parsing', 'Fragile layout → clean text flow'],
              ].map(([label, change]) => (
                <li key={label} className="border-b border-line pb-4 last:border-0 last:pb-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                    {label}
                  </p>
                  <p className="mt-1.5 text-sm leading-6 text-foreground">{change}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ProductHero>

      {/* ---------------------------------------------------------------- */}
      {/* Before → after                                                    */}
      {/* ---------------------------------------------------------------- */}
      <Section bordered muted>
        <SectionHeading
          eyebrow="Before → after"
          title="Same career. Read properly this time."
          description="An illustrative comparison of what changes: not the facts, but the structure, the formatting and the way the work is described."
        />
        <Reveal className="mt-14">
          <ResumeComparison />
        </Reveal>
        <p className="mt-8 text-sm leading-6 text-muted">
          Both panels above are illustrative examples created for this page, not real applicant
          documents.
        </p>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* What it fixes                                                     */}
      {/* ---------------------------------------------------------------- */}
      <Section id="what-it-fixes">
        <SectionHeading
          eyebrow="What it fixes"
          title="The six things that hold most resumes back"
          description="None of them are about your experience. All of them are about how that experience is presented."
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {fixes.map((fix) => (
            <div key={fix.title} className="bg-surface p-7 sm:p-8">
              <h3 className="text-lg font-bold tracking-[-0.03em] text-foreground">{fix.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{fix.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Workflow                                                          */}
      {/* ---------------------------------------------------------------- */}
      <Section bordered muted>
        <SectionHeading
          eyebrow="How it works"
          title="Three steps, one document"
          description="No forms to refill and no rebuilding your history from scratch."
        />
        <ol className="mt-14 grid gap-6 lg:grid-cols-3">
          {product.workflow.map((step) => (
            <li key={step.step} className="surface surface-hover relative overflow-hidden p-7 sm:p-8">
              <span className="absolute inset-x-0 top-0 h-px bg-primary" aria-hidden="true" />
              <p className="font-mono text-xs tracking-[0.2em] text-primary">{step.step}</p>
              <h3 className="mt-4 text-xl font-bold tracking-[-0.03em] text-foreground">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Features                                                          */}
      {/* ---------------------------------------------------------------- */}
      <Section>
        <SectionHeading
          eyebrow="Capabilities"
          title="What the app does to your document"
          description="Everything below operates on the material you upload. The redesign changes presentation and wording, never the underlying record."
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
          title="Anyone whose resume undersells them"
          description="Strong experience presented badly loses to average experience presented well. This closes that gap."
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
            title="Before you upload"
            description={
              <>
                Anything else you want to check first?{' '}
                <Link href="/contact" className="text-secondary underline underline-offset-4">
                  Ask us directly
                </Link>
                .
              </>
            }
          />
          <ProductFaq faqs={product.faqs} />
        </div>
      </Section>

      <CTA
        eyebrow="Next step"
        title="Upload the resume you already have."
        description="It takes one document and a few minutes to see what a proper structure does for the same career. Open the app and try it on the version you are sending out today."
        primaryLabel={product.primaryCtaLabel}
        primaryHref={product.externalUrl}
        primaryExternal
        secondaryLabel="See all our products"
        secondaryHref="/products"
      />
    </>
  );
}
