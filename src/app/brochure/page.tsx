import type { Metadata } from 'next';
import { getSiteSettings } from '@/lib/data/siteSettings';
import { getServices } from '@/lib/data/services';
import { getIndustries } from '@/lib/data/industries';
import { getRoadmapSteps } from '@/lib/data/roadmap';
import BrochureContent from '@/components/BrochureContent';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Quantyro Technologies Company Brochure & Engineering Deck (2026)',
  description: 'Download the official Quantyro Technologies Capabilities Deck and Company Brochure. Explore our practice areas, senior engineering squads, autonomous AI systems, 100% IP ownership guarantee, and client case studies.',
  alternates: { canonical: '/brochure' },
  keywords: [
    'Quantyro Technologies brochure',
    'software engineering capabilities deck',
    'enterprise Next.js agency brochure',
    'AI consultancy capability deck',
    'custom software company portfolio PDF',
    'Quantyro Technologies media kit',
  ],
  openGraph: {
    title: 'Quantyro Technologies Company Brochure & Engineering Deck (2026)',
    description: 'Download the official Quantyro Technologies Capabilities Deck and Company Brochure. Explore practice areas, AI systems, and 100% IP ownership standards.',
    url: `${SITE_URL}/brochure`,
    siteName: 'Quantyro Technologies',
    type: 'website',
  },
};

export default async function BrochurePage() {
  const [settings, services, industries, roadmapSteps] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getIndustries(),
    getRoadmapSteps(),
  ]);

  const brochureJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DigitalDocument',
    '@id': `${SITE_URL}/brochure/#document`,
    url: `${SITE_URL}/brochure`,
    name: 'Quantyro Technologies Company Capabilities Deck (2026)',
    description: 'Official corporate overview, practice areas, engineering delivery standards, and service offerings for Quantyro Technologies.',
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Quantyro Technologies',
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo.png`,
    },
    inLanguage: 'en-US',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(brochureJsonLd) }}
      />
      <BrochureContent
        settings={settings}
        services={services}
        industries={industries}
        roadmapSteps={roadmapSteps}
      />
    </>
  );
}
