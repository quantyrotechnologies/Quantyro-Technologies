import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServiceBySlug, getServices } from '@/lib/data/services';
import { getFaqs } from '@/lib/data/faqs';
import { getRoadmapSteps } from '@/lib/data/roadmap';
import { getActiveRegionsByService } from '@/lib/data/serviceRegionPages';
import { getActiveCitiesByService } from '@/lib/data/locationPages';
import { techStackSlugMapForService } from '@/lib/data/techStackPages';
import { getProjects } from '@/lib/data/projects';
import { serviceSlugForTag } from '@/lib/serviceTagMap';
import { SITE_URL, DEFAULT_OG_IMAGE } from '@/lib/site';
import ServiceDetailContent from '@/components/ServiceDetailContent';

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  const title = service.seoTitle || `${service.title} Services`;
  const description = service.seoDescription || service.desc;
  return {
    title,
    description,
    keywords: service.targetKeywords?.length ? service.targetKeywords : undefined,
    alternates: { canonical: `/services/${slug}` },
    openGraph: { title, description, url: `/services/${slug}`, type: 'website', images: [DEFAULT_OG_IMAGE] },
    twitter: { card: 'summary_large_image', title, description, images: [DEFAULT_OG_IMAGE] },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const [faqs, roadmapSteps, regionsByService, citiesByService, techStackSlugs, projects] = await Promise.all([
    getFaqs(`service-${slug}`),
    getRoadmapSteps(),
    getActiveRegionsByService(),
    getActiveCitiesByService(),
    techStackSlugMapForService(slug),
    getProjects(),
  ]);
  const regions = regionsByService[service.id] ?? [];
  const cities = citiesByService[service.id] ?? [];
  const relatedProjects = projects.filter((p) => p.tags.some((t) => serviceSlugForTag(t) === slug)).slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    serviceType: service.title,
    description: service.desc,
    provider: { '@type': 'Organization', name: 'Quantyro Technologies', url: SITE_URL },
    ...(regions.length + cities.length > 0 ? { areaServed: [...regions, ...cities] } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceDetailContent service={service} faqs={faqs} roadmapSteps={roadmapSteps} regions={regions} cities={cities} techStackSlugs={techStackSlugs} relatedProjects={relatedProjects} />
    </>
  );
}
