import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'SEO Services in Dubai | Revenue-Focused SEO Company | WeThinkDigital',
  description: 'SEO services in Dubai that drive qualified revenue, not vanity rankings. Technical SEO, commercial keyword strategy, conversion-focused content and local search systems for UAE businesses. Free growth audit.',
  keywords: 'seo services in dubai, seo services dubai, best seo services in dubai, seo company dubai, seo service dubai, seo services uae, local seo dubai, technical seo dubai, seo agency dubai, seo consultant dubai',
  alternates: {
    canonical: 'https://www.wethinkdigital.solutions/seo-services',
  },
  openGraph: {
    title: 'SEO Services in Dubai | Revenue-Focused SEO Company | WeThinkDigital',
    description: 'SEO services in Dubai that drive qualified revenue, not vanity rankings. Technical SEO, commercial keyword strategy, conversion-focused content and local search systems for UAE businesses.',
    type: 'website',
    url: 'https://www.wethinkdigital.solutions/seo-services',
    siteName: 'WeThinkDigital',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO Services in Dubai | WeThinkDigital',
    description: 'SEO services in Dubai that drive qualified revenue, not vanity rankings.',
  },
};

const seoFaqs = [
  {
    question: 'What SEO services in Dubai actually drive revenue?',
    answer: 'The SEO services that move a business forward are commercial keyword strategy, conversion-optimized content, technical SEO with clear ROI, local search systems, and link building with business value. We connect each service to a measurable business outcome.',
  },
  {
    question: 'How much do SEO services cost in Dubai?',
    answer: 'The right scope depends on your baseline, market, and opportunity. We use the first conversation to understand the commercial target before recommending a retainer or project shape. Typical engagements start with a growth audit to define scope and expected impact.',
  },
  {
    question: 'How long before SEO results show in Dubai?',
    answer: 'Technical and conversion improvements can show signals quickly, while search demand compounds over a longer period. We set a first measurement window and a longer learning horizon so progress is read in context.',
  },
  {
    question: 'Do you offer local SEO for Dubai businesses?',
    answer: 'Yes. Local search systems are a core part of our SEO services — Google Business Profile optimization, local citations, review management, and location-specific content for Dubai and the wider UAE.',
  },
  {
    question: 'How do you measure SEO success?',
    answer: 'We agree on the meaningful movement first: qualified enquiries, conversion rate, revenue, retention, or another metric close to the business decision. Rankings and traffic are inputs, not the finish line.',
  },
];

const seoServices = [
  {
    title: 'Commercial keyword strategy',
    description: 'We find the search terms with buying intent behind them — not vanity keywords. Every target maps to a service, page, and offer.',
  },
  {
    title: 'Technical SEO',
    description: 'Crawlability, site speed, Core Web Vitals, schema, internal linking, and indexation — fixed in priority order of revenue impact.',
  },
  {
    title: 'Conversion-focused content',
    description: 'Pages written for the customer decision, not the word count. Each piece supports a page and a commercial goal.',
  },
  {
    title: 'Local search systems',
    description: 'Google Business Profile, local citations, review generation, and location pages that capture Dubai and UAE search demand.',
  },
  {
    title: 'Link building with business value',
    description: 'Authority links that generate referral traffic and position you as a thought leader — not link farms or PBNs.',
  },
  {
    title: 'Measurement that compounds',
    description: 'Revenue from organic search, acquisition cost, and lifetime value — tracked and reported against business metrics.',
  },
];

export default function SEOServicesPage() {
  return (
    <main className="bg-background">
      {/* SEO Service schema */}
      <Script
        id="json-ld-service-seo"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'SEO Services Dubai',
            provider: {
              '@type': 'ProfessionalService',
              name: 'WeThinkDigital',
              url: 'https://www.wethinkdigital.solutions',
            },
            areaServed: { '@type': 'City', name: 'Dubai', addressCountry: 'AE' },
            url: 'https://www.wethinkdigital.solutions/seo-services',
          }),
        }}
      />
      {/* FAQ schema */}
      <Script
        id="json-ld-faq-seo"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: seoFaqs.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: f.answer },
            })),
          }),
        }}
      />

      <Navigation />

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-20 pt-40 sm:px-10 lg:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgb(107_70_193_/_0.25),transparent_55%)]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.24em] text-accent">SEO services in Dubai</p>
          <h1 className="max-w-4xl text-5xl font-bold leading-[0.98] tracking-[-0.055em] text-foreground sm:text-6xl lg:text-7xl">
            SEO that turns search demand into <span className="gradient-text">qualified revenue</span>.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted sm:text-xl">
            We build the search system behind your next stage: commercial keyword strategy, conversion-focused content, and technical SEO your team can measure. Built for Dubai businesses that want revenue, not rankings.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="#contact" className="btn-primary">
              Plan a growth audit
            </Link>
            <Link href="#services" className="btn-secondary">
              See what&apos;s included
            </Link>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section id="services" className="border-y border-line bg-background-muted py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.24em] text-primary">What&apos;s included</p>
          <h2 className="max-w-3xl text-4xl font-bold leading-tight tracking-[-0.05em] text-foreground sm:text-6xl">
            The SEO services in Dubai that actually move a business forward.
          </h2>
          <div className="mt-14 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {seoServices.map((s) => (
              <div key={s.title} className="bg-background p-8">
                <h3 className="text-xl font-bold tracking-[-0.02em] text-foreground">{s.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why revenue-focused */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="mb-5 font-mono text-xs uppercase tracking-[0.24em] text-primary">Why revenue-focused</p>
              <h2 className="text-4xl font-bold leading-tight tracking-[-0.05em] text-foreground sm:text-5xl">
                Most SEO agencies report rankings. We report revenue.
              </h2>
            </div>
            <div className="space-y-6 text-lg leading-8 text-muted">
              <p>
                The SEO industry in Dubai is crowded with agencies that promise #1 rankings for keywords nobody searches for. They deliver monthly reports full of vanity metrics, and the business sees no change in enquiries.
              </p>
              <p>
                We start with the commercial problem. The keyword strategy, content, and technical work all connect to the money decision: qualified enquiries, conversion rate, and revenue. That is why our clients see an average ROI of 300%+ on SEO.
              </p>
              <p>
                <Link href="/blog/best-seo-services-in-dubai" className="text-primary hover:text-accent">
                  Read: The SEO services that actually move a business forward →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-y border-line bg-background-muted py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6 sm:px-10 lg:px-16">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.24em] text-primary">SEO in Dubai — the useful questions</p>
          <h2 className="text-4xl font-bold leading-tight tracking-[-0.05em] text-foreground sm:text-6xl">Asked plainly, answered honestly.</h2>
          <div className="mt-14 divide-y divide-line border-y border-line">
            {seoFaqs.map((f) => (
              <div key={f.question} className="py-6">
                <h3 className="text-lg font-semibold text-foreground">{f.question}</h3>
                <p className="mt-3 max-w-3xl leading-7 text-muted">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="mb-5 font-mono text-xs uppercase tracking-[0.24em] text-primary">Start with a growth audit</p>
              <h2 className="text-4xl font-bold leading-tight tracking-[-0.05em] text-foreground sm:text-6xl">
                See where the search opportunity is — free.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
                Tell us about your business and we will map the highest-value search gaps, the technical issues costing you traffic, and the pages that should be converting.
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
