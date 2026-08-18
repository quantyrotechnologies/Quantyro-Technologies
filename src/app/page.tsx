import HeroSection from '@/components/HeroSection';
import EnterpriseTicker from '@/components/EnterpriseTicker';
import DeviceShowcaseSection from '@/components/DeviceShowcaseSection';
import ManifestoSection from '@/components/ManifestoSection';
import ServicesSection from '@/components/ServicesSection';
import TechStackHub from '@/components/TechStackHub';
import FeaturedWorkSection from '@/components/FeaturedWorkSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import StatsSection from '@/components/StatsSection';
import CtaSection from '@/components/CtaSection';
import ScrollProgress from '@/components/ScrollProgress';
import FaqSection from '@/components/FaqSection';
import { getServices } from '@/lib/data/services';
import { getFeaturedProjects } from '@/lib/data/projects';
import { getFaqs } from '@/lib/data/faqs';
import { getTestimonials } from '@/lib/data/testimonials';
import { getStats } from '@/lib/data/stats';
import { getRoadmapSteps } from '@/lib/data/roadmap';
import { getTickerMetrics } from '@/lib/data/tickerMetrics';

import { getShowcaseItems } from '@/lib/data/showcase';

export default async function Home() {
  const [services, featuredProjects, homeFaqs, testimonials, stats, roadmapSteps, tickerMetrics, showcaseItems] = await Promise.all([
    getServices(),
    getFeaturedProjects(),
    getFaqs('home'),
    getTestimonials(),
    getStats(),
    getRoadmapSteps(),
    getTickerMetrics(),
    getShowcaseItems(),
  ]);

  return (
    <>
      <ScrollProgress />
      <HeroSection />
      <EnterpriseTicker metrics={tickerMetrics} />
      <DeviceShowcaseSection items={showcaseItems} />
      <ManifestoSection steps={roadmapSteps} />
      <ServicesSection services={services} />
      <TechStackHub />
      <FeaturedWorkSection projects={featuredProjects} />
      <TestimonialsSection testimonials={testimonials} />
      <StatsSection stats={stats} />
      <FaqSection heading="Frequently Asked Questions" items={homeFaqs} />
      <CtaSection />
    </>
  );
}


