import type { Metadata } from 'next';

import JsonLd from '@/components/JsonLd';
import ProductCard from '@/components/products/ProductCard';
import Reveal from '@/components/products/Reveal';
import { breadcrumbSchema, productItemListSchema } from '@/components/products/schema';
import CTA from '@/components/ui/CTA';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import { agentRoles, products } from '@/data/products';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Products — software we build and run',
  description:
    'Two applications built and operated by WeThinkDigital: Agents, a multi-agent platform that implements, tests and reviews software work items, and Resume, an AI app that redesigns an existing resume.',
  path: '/products',
  keywords: [
    'AI products',
    'AI coding agents',
    'autonomous software delivery',
    'AI resume redesign',
    'software engineering tools',
  ],
});

const cardPoints: Record<string, string[]> = {
  agents: [
    `${agentRoles[0].name} — ${agentRoles[0].role.toLowerCase()}`,
    `${agentRoles[1].name} — ${agentRoles[1].role.toLowerCase()}`,
    `${agentRoles[2].name} — ${agentRoles[2].role.toLowerCase()}`,
    'Works on your existing repository and backlog; a human still merges.',
  ],
  resume: [
    'Start from the resume you already have.',
    'Restructured, reformatted and rewritten for clarity.',
    'Outcome-led bullet points, built from your own material.',
    'Clean output that applicant tracking systems can read.',
  ],
};

export default function ProductsPage() {
  return (
    <>
      <JsonLd id="products-list" data={productItemListSchema(products)} />
      <JsonLd
        id="products-breadcrumbs"
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' },
        ])}
      />

      <section className="relative overflow-hidden pt-32 pb-16 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="animate-fade-up">
            <SectionHeading
              as="h1"
              eyebrow="Products"
              title="Products we build and run"
              description="We are an engineering company, so we ship our own software as well as our clients'. Two applications are live today: one that does the mechanical half of software delivery, and one that redesigns the document your career is judged on."
            />
          </div>
        </div>
      </section>

      <Section compact>
        <div className="grid gap-6 lg:grid-cols-2">
          {products.map((product, index) => (
            <Reveal key={product.id} delay={index * 0.06} className="h-full">
              <ProductCard
                product={product}
                featured={product.id === 'agents'}
                badge={product.id === 'agents' ? 'Flagship' : undefined}
                points={cardPoints[product.id] ?? []}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section bordered muted>
        <SectionHeading
          eyebrow="Why we publish them"
          title="Both started as internal tools"
          description="Agents came out of wanting our own backlog to move without adding people to it. Resume came out of rewriting the same structural problems in document after document. We kept using them, so we made them available."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {[
            {
              title: 'Built for our own work',
              body: 'Both products solve a problem we had first. That is the only reason either exists.',
            },
            {
              title: 'Run by the people who wrote them',
              body: 'The same engineers who built these apps are the ones you talk to about them.',
            },
            {
              title: 'The same approach we bring to clients',
              body: 'If you want something like this inside your own product, that is our services work.',
            },
          ].map((item) => (
            <div key={item.title} className="surface p-7">
              <h3 className="text-base font-bold tracking-[-0.02em] text-foreground">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTA
        eyebrow="Build with us"
        title="Want something like this inside your own product?"
        description="These two apps are what our engineering looks like when we are the client. Tell us what you are trying to build and we will come back with a technical approach and an honest view of what is achievable."
        primaryLabel="Start a conversation"
        primaryHref="/contact"
        secondaryLabel="Explore Agents"
        secondaryHref="/products/agents"
      />
    </>
  );
}
