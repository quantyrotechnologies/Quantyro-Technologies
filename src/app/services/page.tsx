import type { Metadata } from 'next';
import ServicesContent from '@/components/ServicesContent';
import { getServices } from '@/lib/data/services';
import { getActiveRegionsByService } from '@/lib/data/serviceRegionPages';
import { getActiveCitiesByService } from '@/lib/data/locationPages';
import { getFaqs } from '@/lib/data/faqs';

import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Software Development Services',
  description: 'Website development, e-commerce, mobile apps, custom software, AI & machine learning, SEO & marketing, and cloud & DevOps — full-stack engineering delivered by senior teams end to end.',
  alternates: { canonical: '/services' },
};

export default async function ServicesPage() {
  const [services, regionsByService, citiesByService, faqs] = await Promise.all([
    getServices(),
    getActiveRegionsByService(),
    getActiveCitiesByService(),
    getFaqs('services'),
  ]);

  const servicesJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/services/#collection`,
    url: `${SITE_URL}/services`,
    name: 'Software Development Services — Quantyro Technologies',
    description: 'Website development, e-commerce, mobile apps, custom software, AI & machine learning, SEO & marketing, and cloud & DevOps.',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Engineering Services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.title,
          url: `${SITE_URL}/services/${s.slug}`,
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      <ServicesContent services={services} regionsByService={regionsByService} citiesByService={citiesByService} faqs={faqs} />
    </>
  );
}
