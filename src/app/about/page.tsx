import type { Metadata } from 'next';
import AboutContent from '@/components/AboutContent';
import { getCertifications } from '@/lib/data/certifications';
import { getFaqs } from '@/lib/data/faqs';
import { getValues } from '@/lib/data/values';
import { getOffices } from '@/lib/data/offices';
import { getStats } from '@/lib/data/stats';

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
  return <AboutContent certifications={certifications} faqs={faqs} values={values} offices={offices} stats={stats} />;
}
