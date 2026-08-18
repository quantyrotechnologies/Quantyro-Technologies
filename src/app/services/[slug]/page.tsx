import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServiceBySlug } from '@/lib/data/services';
import { getFaqs } from '@/lib/data/faqs';
import { getRoadmapSteps } from '@/lib/data/roadmap';
import { getActiveRegionsByService } from '@/lib/data/serviceRegionPages';
import { SITE_URL } from '@/lib/site';
import ServiceDetailContent from '@/components/ServiceDetailContent';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.seoTitle || `${service.title} Services`,
    description: service.seoDescription || service.desc,
    alternates: { canonical: `/services/${slug}` },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const [faqs, roadmapSteps, regionsByService] = await Promise.all([
    getFaqs(`service-${slug}`),
    getRoadmapSteps(),
    getActiveRegionsByService(),
  ]);
  const regions = regionsByService[service.id] ?? [];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    serviceType: service.title,
    description: service.desc,
    provider: { '@type': 'Organization', name: 'Quantyro Technologies', url: SITE_URL },
    ...(regions.length > 0 ? { areaServed: regions } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceDetailContent service={service} faqs={faqs} roadmapSteps={roadmapSteps} regions={regions} />
    </>
  );
}
