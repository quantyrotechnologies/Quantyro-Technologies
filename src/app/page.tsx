import HeroSection from '@/components/HeroSection';
import EnterpriseTicker from '@/components/EnterpriseTicker';
import DeviceShowcaseSection from '@/components/DeviceShowcaseSection';
import ManifestoSection from '@/components/ManifestoSection';
import ServicesSection from '@/components/ServicesSection';
import IndustriesSection from '@/components/IndustriesSection';
import TechStackHub from '@/components/TechStackHub';
import FeaturedWorkSection from '@/components/FeaturedWorkSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import StatsSection from '@/components/StatsSection';
import CtaSection from '@/components/CtaSection';
import ScrollProgress from '@/components/ScrollProgress';
import FaqSection from '@/components/FaqSection';
import { getServices } from '@/lib/data/services';
import { getIndustries } from '@/lib/data/industries';
import { getFeaturedProjects } from '@/lib/data/projects';
import { getFaqs } from '@/lib/data/faqs';
import { getTestimonials } from '@/lib/data/testimonials';
import { getStats } from '@/lib/data/stats';
import { getRoadmapSteps } from '@/lib/data/roadmap';
import { getTickerMetrics } from '@/lib/data/tickerMetrics';

import { getShowcaseItems } from '@/lib/data/showcase';

import { SITE_URL } from '@/lib/site';

export default async function Home() {
  const [services, industries, featuredProjects, homeFaqs, testimonials, stats, roadmapSteps, tickerMetrics, showcaseItems] = await Promise.all([
    getServices(),
    getIndustries(),
    getFeaturedProjects(),
    getFaqs('home'),
    getTestimonials(),
    getStats(),
    getRoadmapSteps(),
    getTickerMetrics(),
    getShowcaseItems(),
  ]);

  const homeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: 'Quantyro Technologies — Engineering the Future',
    description: 'Global software engineering partner designing, building and scaling web, mobile and AI products for ambitious companies.',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Software Engineering Services',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <ScrollProgress />
      <HeroSection />
      <EnterpriseTicker metrics={tickerMetrics} />
      <DeviceShowcaseSection items={showcaseItems} />
      <ServicesSection services={services} />
      <TechStackHub />
      <IndustriesSection industries={industries} />
      <ManifestoSection steps={roadmapSteps} />
      <FeaturedWorkSection projects={featuredProjects} />
      <TestimonialsSection testimonials={testimonials} />
      <StatsSection stats={stats} />
      <FaqSection heading="Frequently Asked Questions" items={homeFaqs} />
      <CtaSection />
    </>
  );
}


