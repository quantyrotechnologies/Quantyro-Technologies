import HeroSection from '@/components/HeroSection';
import EnterpriseTicker from '@/components/EnterpriseTicker';
import ManifestoSection from '@/components/ManifestoSection';
import ServicesSection from '@/components/ServicesSection';
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

export default async function Home() {
  const [services, featuredProjects, homeFaqs, testimonials, stats, roadmapSteps, tickerMetrics] = await Promise.all([
    getServices(),
    getFeaturedProjects(),
    getFaqs('home'),
    getTestimonials(),
    getStats(),
    getRoadmapSteps(),
    getTickerMetrics(),
  ]);

  return (
    <>
      <ScrollProgress />
      <HeroSection />
      <EnterpriseTicker metrics={tickerMetrics} />
      <ManifestoSection steps={roadmapSteps} />
      <ServicesSection services={services} />
      <FeaturedWorkSection projects={featuredProjects} />
      <TestimonialsSection testimonials={testimonials} />
      <StatsSection stats={stats} />
      <FaqSection heading="Homepage FAQ" items={homeFaqs} />
      <CtaSection />
    </>
  );
}

