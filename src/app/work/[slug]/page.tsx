import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectBySlug } from '@/lib/data/projects';
import { SITE_URL, DEFAULT_OG_IMAGE } from '@/lib/site';
import WorkDetailContent from '@/components/WorkDetailContent';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${slug}` },
    openGraph: { title: project.title, description: project.summary, url: `/work/${slug}`, type: 'website', images: [DEFAULT_OG_IMAGE] },
    twitter: { card: 'summary_large_image', title: project.title, description: project.summary, images: [DEFAULT_OG_IMAGE] },
  };
}

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.summary,
    about: project.client,
    ...(project.tags.length > 0 ? { keywords: project.tags.join(', ') } : {}),
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/work/${project.slug}` },
    creator: { '@type': 'Organization', name: 'Quantyro Technologies', url: SITE_URL },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WorkDetailContent project={project} />
    </>
  );
}
