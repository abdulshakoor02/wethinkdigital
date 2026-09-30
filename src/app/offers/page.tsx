import type { Metadata } from 'next';
import Link from 'next/link';

import JsonLd from '@/components/JsonLd';
import CTA from '@/components/ui/CTA';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import { getPostBySlug } from '@/data/posts';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = buildMetadata({
  title: 'Free website design and a free CRM — what is actually free',
  description:
    'We design and build your website or landing page at no cost, and our CRM is free forever with unlimited users and contacts. Here is exactly what is free, what is not, and how to get started.',
  path: '/offers',
  keywords: [
    'free website design',
    'free landing page design',
    'free website with hosting',
    'free crm software',
    'free crm with unlimited users',
    'free crm unlimited contacts',
    'free crm forever',
    'website design free build',
  ],
});

/** The two offers, stated once so the page and the FAQ cannot drift apart. */
const offers = [
  {
    id: 'website',
    eyebrow: 'Offer 01 · Web development',
    title: 'A free website or landing page, built for you',
    summary:
      'We design and build the page. You pay nothing for the build — the only ongoing cost is hosting, and the first three months of that are on us.',
    includes: [
      'Design and build at no cost',
      'Responsive from 320px up, not a mobile afterthought',
      'Accessible by default — contrast, keyboard paths, semantics',
      'Deployed and live on your domain',
      'One round of structure changes after launch',
    ],
    costs: [
      { label: 'The build', value: 'Free' },
      { label: 'Hosting, first 3 months', value: 'Free' },
      { label: 'Hosting after that', value: 'AED 50 / month' },
      { label: 'Domain', value: 'At your cost — you own it' },
    ],
    condition:
      'The one condition: the site is hosted with us. That is not a hidden charge — it is the whole reason we can build it free, and it is priced above.',
    ctaLabel: 'Start a project',
    ctaHref: '/contact',
    postSlug: 'free-website-and-landing-page-design',
  },
  {
    id: 'crm',
    eyebrow: 'Offer 02 · Software',
    title: 'Our CRM, free forever — unlimited users, unlimited contacts',
    summary:
      'Not a trial and not a capped tier. Every person who touches a customer can be in the system, and the contact list does not stop at an arbitrary number.',
    includes: [
      'Unlimited users — no per-seat cap',
      'Unlimited contacts',
      'One record per customer, not one per spreadsheet',
      'A pipeline with stages that mean something',
      'Activity history in a single place',
    ],
    costs: [
      { label: 'Users', value: 'Unlimited' },
      { label: 'Contacts', value: 'Unlimited' },
      { label: 'Term', value: 'Free forever, not a trial' },
      { label: 'Access', value: 'By request' },
    ],
    condition:
      'It is our own product, which is why we can price it this way. Access is by request rather than instant self-serve signup — email us and we will set you up.',
    ctaLabel: `Email ${siteConfig.email}`,
    ctaHref: `mailto:${siteConfig.email}?subject=Free%20CRM%20access`,
    postSlug: 'free-crm-software-unlimited-users',
  },
] as const;

const faqs = [
  {
    question: 'Is the website build really free?',
    answer:
      'Yes. We do not invoice for design or build. What you pay for is hosting — free for the first three months, then AED 50 per month — and your domain, which you buy and own yourself. There is no build fee waiting to appear later.',
  },
  {
    question: 'Why would you build a website for free?',
    answer:
      'Because we host and support it afterwards, so the relationship continues past launch. That is the honest answer: the free build is how we start working with a business we expect to keep working with. It is not a loss-leader with a hidden invoice attached.',
  },
  {
    question: 'What is the catch?',
    answer:
      'You host with us. That is the condition, and it is stated up front rather than discovered later. Everything else is yours: the domain is registered in your name, and the content we produce for you is yours.',
  },
  {
    question: 'Is the CRM a free trial that expires?',
    answer:
      'No. It is free forever, with unlimited users and unlimited contacts. There is no card to enter and no expiry date. It is our own product, so the cost to us of another account is small enough that we would rather have the relationship.',
  },
  {
    question: 'How do I get access to the CRM?',
    answer: `Email ${siteConfig.email} and we will set up your account. There is no instant self-serve signup yet — access is by request so we can help with the initial structure rather than leaving you with an empty system.`,
  },
  {
    question: 'What do you need from me to build the site?',
    answer:
      'A domain, your content and images, and timely feedback at the review points. The most common reason a free build stalls is waiting on copy, so having the words ready matters more than having them perfect.',
  },
  {
    question: 'Who is this not right for?',
    answer:
      'Complex e-commerce with inventory and fulfilment, systems that must integrate deeply with an existing platform, and organisations that already run a design system we would be working against. We will say so early rather than take the work and do it badly.',
  },
];

const offerSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Free offers from WeThinkDigital',
  itemListElement: offers.map((offer, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Offer',
      name: offer.title,
      description: offer.summary,
      url: `${siteConfig.url}/offers#${offer.id}`,
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${siteConfig.url}#organization` },
    },
  })),
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
    { '@type': 'ListItem', position: 2, name: 'Offers', item: `${siteConfig.url}/offers` },
  ],
};

export default function OffersPage() {
  return (
    <>
      <JsonLd id="offers-itemlist" data={offerSchema} />
      <JsonLd id="offers-faq" data={faqSchema} />
      <JsonLd id="offers-breadcrumbs" data={breadcrumbSchema} />

      {/* Hero */}
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
            <p className="mono-label mb-5">Offers</p>
            <h1 className="text-[2.5rem] font-semibold leading-[1.06] tracking-[-0.045em] text-foreground sm:text-6xl lg:text-[4.4rem]">
              A free website, and a CRM that stays <span className="serif">free forever</span>
            </h1>
            <p className="mt-6 max-w-2xl text-[1.05rem] leading-[1.66] text-muted sm:text-[1.0625rem]">
              Two things we genuinely do at no charge: we design and build your website or
              landing page, and our own CRM is free with unlimited users and unlimited
              contacts. Below is exactly what is free, what is not, and what it costs you
              over time.
            </p>
          </div>
        </div>
      </section>

      {/* The two offers */}
      <Section compact>
        <div className="grid gap-3.5 lg:grid-cols-2">
          {offers.map((offer) => {
            const post = getPostBySlug(offer.postSlug);
            return (
              <article key={offer.id} id={offer.id} className="surface surface-hover flex flex-col p-7 sm:p-9">
                <p className="mono-label">{offer.eyebrow}</p>
                <h2 className="mt-5 text-2xl font-semibold leading-[1.15] tracking-[-0.03em] text-foreground sm:text-3xl">
                  {offer.title}
                </h2>
                <p className="mt-4 text-[0.9375rem] leading-7 text-muted">{offer.summary}</p>

                <h3 className="mt-8 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-subtle">
                  What you get
                </h3>
                <ul className="mt-3 flex flex-col gap-2.5">
                  {offer.includes.map((line) => (
                    <li key={line} className="flex gap-3 text-[0.9375rem] leading-6 text-muted">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-none rounded-[1px] bg-primary" />
                      {line}
                    </li>
                  ))}
                </ul>

                <h3 className="mt-8 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-subtle">
                  What it costs
                </h3>
                <dl className="mt-3 divide-y divide-line border-y border-line">
                  {offer.costs.map((cost) => (
                    <div key={cost.label} className="flex items-baseline justify-between gap-4 py-2.5">
                      <dt className="text-[0.875rem] text-muted">{cost.label}</dt>
                      <dd className="text-right text-[0.875rem] font-medium text-foreground">{cost.value}</dd>
                    </div>
                  ))}
                </dl>

                <p className="mt-5 text-[0.875rem] leading-6 text-subtle">{offer.condition}</p>

                <div className="mt-auto flex flex-col gap-3 pt-7 sm:flex-row sm:items-center">
                  <Link
                    href={offer.ctaHref}
                    className={offer.id === 'crm' ? 'btn-ember' : 'btn-primary'}
                  >
                    {offer.ctaLabel}
                  </Link>
                  {post ? (
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-[0.875rem] font-medium text-primary transition-colors hover:text-primary-strong"
                    >
                      Read the full breakdown →
                    </Link>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      {/* Transparency */}
      <Section bordered muted>
        <SectionHeading
          eyebrow="No small print"
          title="What free means on this page"
          description="A word like free is worth nothing without the numbers next to it. This is the whole arrangement, written the way we would want to read it if we were the customer."
        />

        <div className="mt-12 grid gap-3.5 sm:grid-cols-3">
          {[
            {
              title: 'The build is free, and stays free',
              body: 'There is no deferred build fee. What you are quoted at the start is what exists at the end: nothing owed for the design or the code.',
            },
            {
              title: 'The hosting is priced, not hidden',
              body: 'Free for three months so you can judge the site under real traffic, then AED 50 per month. You can see the number before you say yes.',
            },
            {
              title: 'The CRM is not a trial',
              body: 'Free forever, unlimited users, unlimited contacts. If that ever changes for new customers, it will be stated on this page rather than discovered on an invoice.',
            },
          ].map((item) => (
            <div key={item.title} className="surface p-7 sm:p-8">
              <h3 className="text-lg font-semibold tracking-[-0.025em] text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="surface mt-3.5 overflow-hidden">
          <table className="w-full text-left text-[0.875rem]">
            <caption className="sr-only">
              What is free and what is paid, for the website and CRM offers
            </caption>
            <thead>
              <tr className="border-b border-line bg-background-muted">
                <th scope="col" className="px-5 py-3 font-semibold text-foreground">Item</th>
                <th scope="col" className="px-5 py-3 font-semibold text-foreground">Free</th>
                <th scope="col" className="px-5 py-3 font-semibold text-foreground">Paid</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              <tr>
                <th scope="row" className="px-5 py-3 font-normal text-muted">Website or landing page design and build</th>
                <td className="px-5 py-3 font-medium text-foreground">Yes, entirely</td>
                <td className="px-5 py-3 text-subtle">—</td>
              </tr>
              <tr>
                <th scope="row" className="px-5 py-3 font-normal text-muted">Hosting, first three months</th>
                <td className="px-5 py-3 font-medium text-foreground">Yes</td>
                <td className="px-5 py-3 text-subtle">—</td>
              </tr>
              <tr>
                <th scope="row" className="px-5 py-3 font-normal text-muted">Hosting thereafter</th>
                <td className="px-5 py-3 text-subtle">—</td>
                <td className="px-5 py-3 font-medium text-foreground">AED 50 / month</td>
              </tr>
              <tr>
                <th scope="row" className="px-5 py-3 font-normal text-muted">Domain name</th>
                <td className="px-5 py-3 text-subtle">—</td>
                <td className="px-5 py-3 text-muted">Your cost, registered in your name</td>
              </tr>
              <tr>
                <th scope="row" className="px-5 py-3 font-normal text-muted">CRM — users, contacts, term</th>
                <td className="px-5 py-3 font-medium text-foreground">Unlimited, forever</td>
                <td className="px-5 py-3 text-subtle">—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <SectionHeading
          eyebrow="Questions"
          title="The things people ask before saying yes"
        />
        <div className="mt-12 max-w-3xl divide-y divide-line border-y border-line">
          {faqs.map((faq) => (
            <details key={faq.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left">
                <span className="text-[1.0625rem] font-semibold tracking-[-0.02em] text-foreground">
                  {faq.question}
                </span>
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex-none text-lg leading-none text-primary transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-[0.9375rem] leading-7 text-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Section>

      <CTA
        eyebrow="Get started"
        title="Tell us what you need and we will tell you what it costs"
        description="For a site, send the domain and what the page has to do. For the CRM, email us and we will set up your account and help with the first structure. Either way you get a straight answer about what is free."
        primaryLabel="Start a project"
        primaryHref="/contact"
        secondaryLabel={`Email ${siteConfig.email}`}
        secondaryHref={`mailto:${siteConfig.email}`}
        secondaryExternal
      />
    </>
  );
}
