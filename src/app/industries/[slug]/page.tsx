import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getIndustryBySlug, getIndustries } from '@/lib/data/industries';
import { getServices } from '@/lib/data/services';
import { getFaqs } from '@/lib/data/faqs';
import { getActiveCitiesByIndustry } from '@/lib/data/locationPages';
import { industrySolutionSlugMapForIndustry } from '@/lib/data/industrySolutionPages';
import { SITE_URL, DEFAULT_OG_IMAGE } from '@/lib/site';
import IndustryDetailContent from '@/components/IndustryDetailContent';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const industry = await getIndustryBySlug(slug);
  if (!industry) return {};
  const title = industry.seoTitle || `${industry.title} Software Development`;
  const description = industry.seoDescription || industry.desc;
  return {
    title,
    description,
    alternates: { canonical: `/industries/${slug}` },
    openGraph: { title, description, url: `/industries/${slug}`, type: 'website', images: [DEFAULT_OG_IMAGE] },
    twitter: { card: 'summary_large_image', title, description, images: [DEFAULT_OG_IMAGE] },
  };
}

export default async function IndustryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = await getIndustryBySlug(slug);
  if (!industry) notFound();

  const [faqs, allServices, citiesByIndustry, industrySolutionSlugs] = await Promise.all([
    getFaqs(`industry-${slug}`),
    getServices(),
    getActiveCitiesByIndustry(),
    industrySolutionSlugMapForIndustry(slug),
  ]);

  const relatedServices = allServices.filter((s) => industry.relatedServiceSlugs.includes(s.slug));
  const cities = citiesByIndustry[industry.id] ?? [];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${industry.title} Software Development`,
    serviceType: `${industry.title} Software Development`,
    description: industry.desc,
    provider: { '@id': `${SITE_URL}/#organization` },
    ...(cities.length > 0 ? { areaServed: cities } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <IndustryDetailContent industry={industry} relatedServices={relatedServices} faqs={faqs} cities={cities} industrySolutionSlugs={industrySolutionSlugs} />
    </>
  );
}

export async function generateStaticParams() {
  const industries = await getIndustries();
  return industries.map((i) => ({ slug: i.slug }));
}
