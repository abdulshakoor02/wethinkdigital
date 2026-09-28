/**
 * Structured data (JSON-LD) for the whole site.
 *
 * Every node is built from `siteConfig` / `absoluteUrl()` so there is exactly
 * one place that knows the production origin. Nodes are linked by `@id` rather
 * than duplicated, which lets consumers (and answer engines) resolve
 * `publisher` / `provider` back to the single Organization node emitted in the
 * root layout.
 *
 * Deliberate omissions — invented values are a structured-data violation:
 *  - no `sameAs` (we cannot verify any social profile),
 *  - no `aggregateRating` and no priced `offers` on the products,
 *  - no `priceRange`, `openingHoursSpecification` or `geo` guesses.
 */

import type {
  BreadcrumbList,
  Organization,
  ProfessionalService,
  SoftwareApplication,
  WebSite,
  WithContext,
} from 'schema-dts';
import { absoluteUrl } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

const ORGANIZATION_ID = `${siteConfig.url}#organization`;
const WEBSITE_ID = `${siteConfig.url}#website`;

/** What we actually do — mirrors `siteConfig.services` one-to-one. */
const serviceCatalog: { name: string; path: string; description: string }[] = [
  {
    name: 'AI Automation',
    path: '/services/ai-automation',
    description:
      'Agentic workflows that take repetitive operational work off human hands: document and data pipelines, internal copilots, and process automation wired into the tools a team already uses.',
  },
  {
    name: 'AI Engineering',
    path: '/services/ai-engineering',
    description:
      'LLM and agent systems built into a product: retrieval-augmented generation, evaluation harnesses, multi-agent orchestration, tool calling, guardrails and cost control.',
  },
  {
    name: 'Custom Software Development',
    path: '/services/software-development',
    description:
      'Product engineering end to end — APIs, data models, platform services, cloud infrastructure, CI/CD and test automation — delivered as maintainable code your team can own.',
  },
  {
    name: 'Web Development',
    path: '/services/web-development',
    description:
      'Fast, accessible web applications and marketing sites built on modern React and TypeScript, measured against Core Web Vitals rather than opinion.',
  },
];

/**
 * The primary entity for the site. Referenced everywhere else by `@id`.
 */
export const organizationSchema: WithContext<Organization> = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: siteConfig.name,
  alternateName: siteConfig.legalName,
  legalName: siteConfig.legalName,
  url: siteConfig.url,
  description: siteConfig.description,
  foundingDate: siteConfig.foundingDate,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  logo: {
    '@type': 'ImageObject',
    '@id': `${siteConfig.url}#logo`,
    url: absoluteUrl('/wethinkdigital.svg'),
    contentUrl: absoluteUrl('/wethinkdigital.svg'),
    caption: siteConfig.name,
  },
  image: {
    '@type': 'ImageObject',
    url: absoluteUrl(siteConfig.ogImage),
    width: '1200',
    height: '630',
    caption: siteConfig.name,
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: siteConfig.email,
      telephone: siteConfig.phone,
      availableLanguage: ['English', 'Arabic'],
      areaServed: 'Worldwide',
      url: absoluteUrl('/contact'),
    },
    {
      '@type': 'ContactPoint',
      contactType: 'technical support',
      email: siteConfig.email,
      availableLanguage: ['English'],
      areaServed: 'Worldwide',
    },
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: siteConfig.addressLocality,
    addressRegion: siteConfig.addressRegion,
    addressCountry: siteConfig.addressCountry,
  },
  areaServed: 'Worldwide',
  knowsAbout: [
    'AI automation',
    'Agentic AI systems',
    'LLM application development',
    'Retrieval-augmented generation',
    'Multi-agent orchestration',
    'Custom software development',
    'Web application development',
    'Cloud architecture',
    'CI/CD',
    'Test automation',
  ],
};

/**
 * The site itself, published by the Organization above.
 */
export const websiteSchema: WithContext<WebSite> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: siteConfig.name,
  alternateName: siteConfig.legalName,
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: 'en',
  publisher: { '@id': ORGANIZATION_ID },
};

/**
 * What we sell, as an OfferCatalog of the four real services. No prices — we
 * do not publish any, and inventing them would be false structured data.
 */
export const professionalServiceSchema: WithContext<ProfessionalService> = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${siteConfig.url}#services`,
  name: `${siteConfig.name} — AI and software engineering`,
  url: absoluteUrl('/services'),
  description:
    'AI and software engineering services: AI automation, AI product engineering, custom software development and web development, delivered by a single senior team.',
  // ProfessionalService is an Organization subtype, not a Service, so it links
  // back to the primary entity via parentOrganization rather than `provider`.
  parentOrganization: { '@id': ORGANIZATION_ID },
  areaServed: 'Worldwide',
  // The four service types are declared on the OfferCatalog items below rather
  // than a top-level `serviceType` — this node is an Organization subtype.
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'AI and software engineering services',
    itemListElement: serviceCatalog.map((service) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        '@id': `${absoluteUrl(service.path)}#service`,
        name: service.name,
        url: absoluteUrl(service.path),
        description: service.description,
        serviceType: service.name,
        provider: { '@id': ORGANIZATION_ID },
        areaServed: 'Worldwide',
      },
    })),
  },
};

/**
 * Our two products. Exported for the product pages to render — intentionally
 * NOT emitted from the root layout, so each node appears on exactly one page.
 */
export const softwareApplicationSchemas: WithContext<SoftwareApplication>[] = [
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${absoluteUrl(siteConfig.apps.agents.href)}#software`,
    name: siteConfig.apps.agents.name,
    alternateName: siteConfig.apps.agents.shortName,
    url: siteConfig.apps.agents.url,
    sameAs: siteConfig.apps.agents.url,
    description: siteConfig.apps.agents.description,
    applicationCategory: 'DeveloperApplication',
    applicationSubCategory: siteConfig.apps.agents.category,
    operatingSystem: 'Web browser',
    softwareRequirements: 'A modern web browser with JavaScript enabled.',
    publisher: { '@id': ORGANIZATION_ID },
    provider: { '@id': ORGANIZATION_ID },
    featureList: [
      'SDE agent that implements work items end to end',
      'QA agent that generates and runs tests',
      'PR review agent that comments on pull requests',
      'Shared backlog across all agents',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${absoluteUrl(siteConfig.apps.resume.href)}#software`,
    name: siteConfig.apps.resume.name,
    alternateName: siteConfig.apps.resume.shortName,
    url: siteConfig.apps.resume.url,
    sameAs: siteConfig.apps.resume.url,
    description: siteConfig.apps.resume.description,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: siteConfig.apps.resume.category,
    operatingSystem: 'Web browser',
    softwareRequirements: 'A modern web browser with JavaScript enabled.',
    publisher: { '@id': ORGANIZATION_ID },
    provider: { '@id': ORGANIZATION_ID },
    featureList: [
      'Upload an existing resume in common document formats',
      'AI rewrite for clarity and structure',
      'Clean, recruiter-ready formatting',
      'Tailoring to a target role',
    ],
  },
];

/** Convenience lookups so pages do not index into the array by number. */
export const agentsApplicationSchema = softwareApplicationSchemas[0];
export const resumeApplicationSchema = softwareApplicationSchemas[1];

export interface BreadcrumbItem {
  name: string;
  /** Site-relative path or absolute URL. */
  url: string;
}

/**
 * Build a BreadcrumbList for a page. Pass the trail in order, including the
 * current page as the last item.
 */
export function breadcrumbSchema(items: BreadcrumbItem[]): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}
