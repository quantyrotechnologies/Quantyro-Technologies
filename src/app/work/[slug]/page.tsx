import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectBySlug } from '@/lib/data/projects';
import { patternImageForSlug } from '@/lib/patternImage';
import { SITE_URL, DEFAULT_OG_IMAGE, organizationNode } from '@/lib/site';
import WorkDetailContent from '@/components/WorkDetailContent';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};

  const ogImageUrl = project.imageUrl || patternImageForSlug(slug) || DEFAULT_OG_IMAGE;
  const fullOgImage = ogImageUrl.startsWith('http') ? ogImageUrl : `${SITE_URL}${ogImageUrl}`;

  return {
    title: `${project.title} — Case Study | ${project.client}`,
    description: project.summary,
    alternates: { canonical: `/work/${slug}` },
    keywords: [
      project.client,
      project.title,
      ...(project.tags || []),
      ...(project.stack || []),
      'Next.js 15 case study',
      'enterprise software development',
      'Quantyro case study',
    ],
    openGraph: {
      title: `${project.title} — Case Study | ${project.client}`,
      description: project.summary,
      url: `/work/${slug}`,
      type: 'article',
      images: [
        {
          url: fullOgImage,
          width: 1200,
          height: 630,
          alt: `${project.client} — ${project.title}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} — ${project.client}`,
      description: project.summary,
      images: [fullOgImage],
    },
  };
}

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const ogImageUrl = project.imageUrl || patternImageForSlug(slug) || DEFAULT_OG_IMAGE;
  const fullOgImage = ogImageUrl.startsWith('http') ? ogImageUrl : `${SITE_URL}${ogImageUrl}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      organizationNode(),
      {
        '@type': 'CreativeWork',
        '@id': `${SITE_URL}/work/${slug}/#creativework`,
        name: project.title,
        headline: project.title,
        description: project.summary,
        about: project.client,
        image: fullOgImage,
        ...(project.url ? { url: project.url } : {}),
        ...(project.tags.length > 0 ? { keywords: project.tags.join(', ') } : {}),
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/work/${project.slug}` },
        creator: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Work', item: `${SITE_URL}/work` },
          { '@type': 'ListItem', position: 3, name: project.client, item: `${SITE_URL}/work/${slug}` },
        ],
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
