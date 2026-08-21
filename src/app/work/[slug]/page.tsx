import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectBySlug } from '@/lib/data/projects';
import { SITE_URL, DEFAULT_OG_IMAGE, organizationNode } from '@/lib/site';
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
    '@graph': [
      organizationNode(),
      {
        '@type': 'CreativeWork',
        '@id': `${SITE_URL}/work/${slug}/#creativework`,
        name: project.title,
        description: project.summary,
        about: project.client,
        ...(project.tags.length > 0 ? { keywords: project.tags.join(', ') } : {}),
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/work/${project.slug}` },
        creator: { '@id': `${SITE_URL}/#organization` },
      },
    ],
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
