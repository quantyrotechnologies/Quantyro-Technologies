import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import HeroSection from '@/components/HeroSection';
import EnterpriseTicker from '@/components/EnterpriseTicker';
import ScrollProgress from '@/components/ScrollProgress';

// Code-split below-the-fold components: preserves 100% SSR HTML for SEO while radically reducing initial mobile JS payload
const DeviceShowcaseSection = dynamic(() => import('@/components/DeviceShowcaseSection'), { ssr: true });
const ServicesSection = dynamic(() => import('@/components/ServicesSection'), { ssr: true });
const TechStackHub = dynamic(() => import('@/components/TechStackHub'), { ssr: true });
const IndustriesSection = dynamic(() => import('@/components/IndustriesSection'), { ssr: true });
const ManifestoSection = dynamic(() => import('@/components/ManifestoSection'), { ssr: true });
const FeaturedWorkSection = dynamic(() => import('@/components/FeaturedWorkSection'), { ssr: true });
const TestimonialsSection = dynamic(() => import('@/components/TestimonialsSection'), { ssr: true });
const StatsSection = dynamic(() => import('@/components/StatsSection'), { ssr: true });
const FaqSection = dynamic(() => import('@/components/FaqSection'), { ssr: true });
const CtaSection = dynamic(() => import('@/components/CtaSection'), { ssr: true });
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

export const metadata: Metadata = {
  title: "Quantyro Technologies — Enterprise Custom Software, Cloud & AI Engineering",
  description: "Quantyro is a premier software engineering company. We design, build, and scale high-performance web applications, composable commerce, mobile apps, and enterprise AI solutions with guaranteed SLAs and 100% IP ownership.",
  keywords: [
    "custom software development company",
    "enterprise web development services",
    "cloud devops consulting",
    "AI and machine learning development",
    "mobile app development company",
    "headless ecommerce development",
    "Next.js web development agency",
    "Quantyro Technologies",
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: "Quantyro Technologies — Enterprise Software & AI Engineering",
    description: "Design, build, and scale high-performance digital products, cloud platforms, and enterprise AI with senior software engineers.",
    url: SITE_URL,
    siteName: "Quantyro Technologies",
    type: "website",
  },
};

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


