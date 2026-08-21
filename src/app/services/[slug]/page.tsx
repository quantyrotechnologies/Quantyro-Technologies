import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServiceBySlug, getServices } from '@/lib/data/services';
import { getFaqs } from '@/lib/data/faqs';
import { getRoadmapSteps } from '@/lib/data/roadmap';
import { getActiveRegionsByService } from '@/lib/data/serviceRegionPages';
import { getActiveCitiesByService } from '@/lib/data/locationPages';
import { techStackSlugMapForService } from '@/lib/data/techStackPages';
import { getProjectsForService } from '@/lib/data/projects';
import { getIndustryApplicationsForService } from '@/lib/data/industryApplications';
import { SITE_URL, DEFAULT_OG_IMAGE, organizationNode } from '@/lib/site';
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
    alternates: { canonical: `/services/${slug}` },
    openGraph: { title, description, url: `/services/${slug}`, type: 'website', images: [DEFAULT_OG_IMAGE] },
    twitter: { card: 'summary_large_image', title, description, images: [DEFAULT_OG_IMAGE] },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const [faqs, roadmapSteps, regionsByService, citiesByService, techStackSlugs, relatedProjects, industryApplications] = await Promise.all([
    getFaqs(`service-${slug}`),
    getRoadmapSteps(),
    getActiveRegionsByService(),
    getActiveCitiesByService(),
    techStackSlugMapForService(slug),
    getProjectsForService(service.id),
    getIndustryApplicationsForService(service.id),
  ]);
  const regions = regionsByService[service.id] ?? [];
  const cities = citiesByService[service.id] ?? [];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      organizationNode(),
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/services/${slug}/#service`,
        name: service.title,
        serviceType: service.title,
        description: service.desc,
        provider: { '@id': `${SITE_URL}/#organization` },
        ...(regions.length + cities.length > 0 ? { areaServed: [...regions, ...cities] } : {}),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceDetailContent service={service} faqs={faqs} roadmapSteps={roadmapSteps} regions={regions} cities={cities} techStackSlugs={techStackSlugs} relatedProjects={relatedProjects} industryApplications={industryApplications} />
    </>
  );
}
