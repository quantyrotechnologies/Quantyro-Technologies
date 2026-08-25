import type { Metadata } from 'next';
import AboutContent from '@/components/AboutContent';
import { getCertifications } from '@/lib/data/certifications';
import { getFaqs } from '@/lib/data/faqs';
import { getValues } from '@/lib/data/values';
import { getOffices } from '@/lib/data/offices';
import { getStats } from '@/lib/data/stats';

import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About Quantyro Technologies | Senior Software Engineering & AI Firm',
  description: 'Learn about Quantyro Technologies — an elite global software engineering firm. Discover our founding story, senior-only engineering squads, 100% IP ownership guarantee, and zero-downtime SLA delivery standards.',
  alternates: { canonical: '/about' },
  keywords: [
    'about Quantyro Technologies',
    'enterprise software development company',
    'senior software engineering team',
    'custom software agency',
    'Next.js development firm',
    'AI engineering consultancy',
    'custom software company in India',
    'dedicated software development team',
  ],
  openGraph: {
    title: 'About Quantyro Technologies | Senior Software Engineering & AI Firm',
    description: 'Learn about Quantyro Technologies — an elite global software engineering firm. Discover our founding story, senior-only engineering squads, and 100% IP ownership guarantee.',
    url: `${SITE_URL}/about`,
    siteName: 'Quantyro Technologies',
    type: 'website',
  },
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
    name: 'About Quantyro Technologies — Senior Software Engineering & AI Firm',
    description: 'Quantyro Technologies is a global software engineering and AI consultancy partnering with startups and enterprises to build scalable digital platforms.',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Quantyro Technologies',
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo.png`,
      knowsAbout: [
        'Website Development',
        'Custom Software Engineering',
        'Headless E-Commerce',
        'Mobile App Development',
        'Artificial Intelligence & Machine Learning',
        'Cloud DevOps & Kubernetes',
        'Technical SEO & Core Web Vitals',
      ],
    },
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
