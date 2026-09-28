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

const service = getService('ai-engineering');

export const metadata: Metadata = service
  ? buildMetadata({
      title: service.metaTitle,
      description: service.metaDescription,
      path: service.href,
      keywords: service.keywords,
    })
  : {};

export default function AiEngineeringPage() {
  if (!service) notFound();

  return (
    <>
      <JsonLd id="json-ld-service-ai-engineering" data={buildServiceSchema(service)} />
      <JsonLd id="json-ld-faq-ai-engineering" data={buildServiceFaqSchema(service)} />
      <JsonLd
        id="json-ld-breadcrumb-ai-engineering"
        data={buildServiceBreadcrumbSchema(service)}
      />
      <ServicePageTemplate service={service} />
    </>
  );
}
