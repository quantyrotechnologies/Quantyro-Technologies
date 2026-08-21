import type { Metadata } from 'next';
import IndustriesContent from '@/components/IndustriesContent';
import { getIndustries } from '@/lib/data/industries';
import { getActiveCitiesByIndustry } from '@/lib/data/locationPages';
import { getFaqs } from '@/lib/data/faqs';

import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Industries We Serve',
  description: 'FinTech, healthcare, enterprise SaaS, e-commerce, and logistics — software engineering built around each sector\'s real compliance and integration requirements.',
  alternates: { canonical: '/industries' },
};

export default async function IndustriesPage() {
  const [industries, citiesByIndustry, faqs] = await Promise.all([
    getIndustries(),
    getActiveCitiesByIndustry(),
    getFaqs('industries'),
  ]);

  const industriesJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/industries/#collection`,
    url: `${SITE_URL}/industries`,
    name: 'Industries We Serve — Quantyro Technologies',
    description: 'Custom software engineering for FinTech, healthcare, enterprise SaaS, e-commerce, and logistics.',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: industries.map((ind) => ({
      '@type': 'Thing',
      name: ind.title,
      url: `${SITE_URL}/industries/${ind.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(industriesJsonLd) }}
      />
      <IndustriesContent industries={industries} citiesByIndustry={citiesByIndustry} faqs={faqs} />
    </>
  );
}
