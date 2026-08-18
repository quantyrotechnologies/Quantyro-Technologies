import type { Metadata } from 'next';
import ServicesContent from '@/components/ServicesContent';
import { getServices } from '@/lib/data/services';
import { getActiveRegionsByService } from '@/lib/data/serviceRegionPages';
import { getFaqs } from '@/lib/data/faqs';

export const metadata: Metadata = {
  title: 'Software Development Services',
  description: 'Website development, e-commerce, mobile apps, custom software, AI & machine learning, SEO & marketing, and cloud & DevOps — full-stack engineering delivered by senior teams end to end.',
  alternates: { canonical: '/services' },
};

export default async function ServicesPage() {
  const [services, regionsByService, faqs] = await Promise.all([
    getServices(),
    getActiveRegionsByService(),
    getFaqs('services'),
  ]);
  return <ServicesContent services={services} regionsByService={regionsByService} faqs={faqs} />;
}
