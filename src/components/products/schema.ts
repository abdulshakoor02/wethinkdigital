/**
 * Structured-data builders for the product pages.
 *
 * Deliberately no `aggregateRating` and no `offers`: we have no review corpus
 * and no published price, and fabricating either is a structured-data violation.
 */

import type { Product } from '@/data/products';
import { absoluteUrl } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

const ORGANIZATION_ID = `${siteConfig.url}#organization`;

export function softwareApplicationSchema(product: Product): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${absoluteUrl(product.href)}#software`,
    name: product.name,
    alternateName: product.shortName,
    url: product.externalUrl,
    applicationCategory: product.applicationCategory,
    operatingSystem: 'Web',
    description: product.metaDescription,
    softwareHelp: absoluteUrl(product.href),
    publisher: { '@id': ORGANIZATION_ID },
    creator: { '@id': ORGANIZATION_ID },
    provider: { '@id': ORGANIZATION_ID },
  };
}

export function faqPageSchema(product: Product): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${absoluteUrl(product.href)}#faq`,
    mainEntity: product.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function breadcrumbSchema(
  trail: { name: string; path: string }[],
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function productItemListSchema(items: Product[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${absoluteUrl('/products')}#products`,
    name: 'Products built and run by WeThinkDigital',
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: items.length,
    itemListElement: items.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: absoluteUrl(product.href),
      item: {
        '@type': 'SoftwareApplication',
        '@id': `${absoluteUrl(product.href)}#software`,
        name: product.name,
        url: product.externalUrl,
        applicationCategory: product.applicationCategory,
        operatingSystem: 'Web',
        description: product.metaDescription,
        publisher: { '@id': ORGANIZATION_ID },
      },
    })),
  };
}
