import type { Metadata } from 'next';
import IndustriesContent from '@/components/IndustriesContent';
import { getIndustries } from '@/lib/data/industries';
import { getActiveCitiesByIndustry } from '@/lib/data/locationPages';
import { getFaqs } from '@/lib/data/faqs';

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
  return <IndustriesContent industries={industries} citiesByIndustry={citiesByIndustry} faqs={faqs} />;
}
