import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getIndustryBySlug, getIndustries } from '@/lib/data/industries';
import { getServices } from '@/lib/data/services';
import { getFaqs } from '@/lib/data/faqs';
import IndustryDetailContent from '@/components/IndustryDetailContent';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const industry = await getIndustryBySlug(slug);
  if (!industry) return {};
  return {
    title: industry.seoTitle || `${industry.title} Software Development`,
    description: industry.seoDescription || industry.desc,
    alternates: { canonical: `/industries/${slug}` },
  };
}

export default async function IndustryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = await getIndustryBySlug(slug);
  if (!industry) notFound();

  const [faqs, allServices] = await Promise.all([
    getFaqs(`industry-${slug}`),
    getServices(),
  ]);

  const relatedServices = allServices.filter((s) => industry.relatedServiceSlugs.includes(s.slug));

  return <IndustryDetailContent industry={industry} relatedServices={relatedServices} faqs={faqs} />;
}

export async function generateStaticParams() {
  const industries = await getIndustries();
  return industries.map((i) => ({ slug: i.slug }));
}
