/**
 * Structured-data builders for the service routes only.
 *
 * These live beside the service components rather than in `src/app/schema.tsx`
 * (owned separately) and are composed from `ServiceDetail`, so schema can never
 * drift from the copy on the page. `provider` links by `@id` to the single
 * Organization node emitted in the root layout.
 */

import type { BreadcrumbList, FAQPage, ItemList, Service, WithContext } from 'schema-dts';
import { absoluteUrl } from '@/lib/seo';
import { siteConfig } from '@/lib/site';
import type { ServiceDetail } from '@/data/services';

const ORGANIZATION_ID = `${siteConfig.url}#organization`;

/** `Service` node describing one offering, linked to the Organization provider. */
export function buildServiceSchema(service: ServiceDetail): WithContext<Service> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${absoluteUrl(service.href)}#service`,
    name: service.name,
    serviceType: service.name,
    description: service.metaDescription,
    url: absoluteUrl(service.href),
    provider: { '@id': ORGANIZATION_ID },
    areaServed: { '@type': 'Place', name: 'Worldwide' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.name} capabilities`,
      itemListElement: service.capabilities.map((capability) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: capability.title,
          description: capability.description,
        },
      })),
    },
  };
}

/** `FAQPage` node from the service's own questions. */
export function buildServiceFaqSchema(service: ServiceDetail): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${absoluteUrl(service.href)}#faq`,
    mainEntity: service.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

/** Home → Services → <service> trail. */
export function buildServiceBreadcrumbSchema(service: ServiceDetail): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${absoluteUrl(service.href)}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
      { '@type': 'ListItem', position: 2, name: 'Services', item: absoluteUrl('/services') },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.name,
        item: absoluteUrl(service.href),
      },
    ],
  };
}

/** `ItemList` of every service, used on the services index. */
export function buildServiceListSchema(allServices: ServiceDetail[]): WithContext<ItemList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${absoluteUrl('/services')}#list`,
    name: 'WeThinkDigital services',
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: allServices.length,
    itemListElement: allServices.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: service.name,
      url: absoluteUrl(service.href),
    })),
  };
}

/** Home → Services trail for the index page. */
export function buildServicesIndexBreadcrumbSchema(): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${absoluteUrl('/services')}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
      { '@type': 'ListItem', position: 2, name: 'Services', item: absoluteUrl('/services') },
    ],
  };
}
