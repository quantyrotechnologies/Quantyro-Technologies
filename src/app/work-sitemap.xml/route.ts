import { SITE_URL } from '@/lib/site';
import { generateUrlsetXml, type SitemapUrl } from '@/lib/sitemapXml';
import { getProjects } from '@/lib/data/projects';

export const dynamic = 'force-dynamic';

export async function GET() {
  const now = new Date().toISOString();
  const projects = await getProjects();

  const urls: SitemapUrl[] = [
    { loc: `${SITE_URL}/work`, lastmod: now, priority: 0.9, changefreq: 'monthly' },
  ];

  projects.forEach((p) => {
    urls.push({
      loc: `${SITE_URL}/work/${p.slug}`,
      lastmod: now,
      priority: 0.8,
      changefreq: 'monthly',
    });
  });

  const xml = generateUrlsetXml(urls);

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
