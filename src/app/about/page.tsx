import type { Metadata } from 'next';
import AboutContent from '@/components/AboutContent';
import { getCertifications } from '@/lib/data/certifications';
import { getFaqs } from '@/lib/data/faqs';
import { getValues } from '@/lib/data/values';
import { getOffices } from '@/lib/data/offices';
import { getStats } from '@/lib/data/stats';

import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About Our Engineering Team',
  description: 'Quantyro Technologies is a global software engineering partner with senior teams across North America, Europe, South Asia and APAC.',
  alternates: { canonical: '/about' },
};

export default async function AboutPage() {
  const [certifications, faqs, values, offices, stats] = await Promise.all([
    getCertifications(),
    getFaqs('about'),
    getValues(),
    getOffices(),
    getStats(),
  ]);

  const aboutJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${SITE_URL}/about/#aboutpage`,
    url: `${SITE_URL}/about`,
    name: 'About Our Engineering Team — Quantyro Technologies',
    description: 'Quantyro Technologies is a global software engineering partner with senior teams across North America, Europe, South Asia and APAC.',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <AboutContent certifications={certifications} faqs={faqs} values={values} offices={offices} stats={stats} />
    </>
  );
}
