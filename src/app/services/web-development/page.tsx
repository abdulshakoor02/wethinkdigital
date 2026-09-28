import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import ServicePageTemplate from '@/components/services/ServicePageTemplate';
import {
  buildServiceBreadcrumbSchema,
  buildServiceFaqSchema,
  buildServiceSchema,
} from '@/components/services/serviceSchema';
import { getService } from '@/data/services';
import { buildMetadata } from '@/lib/seo';

const service = getService('web-development');

export const metadata: Metadata = service
  ? buildMetadata({
      title: service.metaTitle,
      description: service.metaDescription,
      path: service.href,
      keywords: service.keywords,
    })
  : {};

export default function WebDevelopmentPage() {
  if (!service) notFound();

  return (
    <>
      <JsonLd id="json-ld-service-web-development" data={buildServiceSchema(service)} />
      <JsonLd id="json-ld-faq-web-development" data={buildServiceFaqSchema(service)} />
      <JsonLd
        id="json-ld-breadcrumb-web-development"
        data={buildServiceBreadcrumbSchema(service)}
      />
      <ServicePageTemplate service={service} />
    </>
  );
}
