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
        <div className="mesh" aria-hidden="true">
          <span className="m-ember" />
          <span className="m-sage" />
          <span className="m-amber" />
          <span className="m-fade" />
        </div>
        <div className="dot-field" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="animate-fade-up max-w-3xl">
            <p className="mono-label mb-5">Products</p>
            <h1 className="text-[2.5rem] font-semibold leading-[1.06] tracking-[-0.045em] text-foreground sm:text-6xl lg:text-[4.4rem]">
              Products we <span className="serif">build and run</span>
            </h1>
            <p className="mt-6 max-w-2xl text-[1.05rem] leading-[1.66] text-muted sm:text-[1.0625rem]">
              We are an engineering company, so we ship our own software as well as our
              clients&apos;. Two applications are live today: one that does the mechanical half of
              software delivery, and one that redesigns the document your career is judged on.
            </p>
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
            <div key={item.title} className="surface surface-hover p-7 sm:p-8">
              <h3 className="text-lg font-semibold tracking-[-0.025em] text-foreground">
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
