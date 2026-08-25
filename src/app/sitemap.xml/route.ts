import { SITE_URL } from '@/lib/site';
import { generateSitemapIndexXml } from '@/lib/sitemapXml';

export const dynamic = 'force-dynamic';

export async function GET() {
  const now = new Date().toISOString();
  const sitemaps = [
    { loc: `${SITE_URL}/pages-sitemap.xml`, lastmod: now },
    { loc: `${SITE_URL}/services-sitemap.xml`, lastmod: now },
    { loc: `${SITE_URL}/industries-sitemap.xml`, lastmod: now },
    { loc: `${SITE_URL}/work-sitemap.xml`, lastmod: now },
    { loc: `${SITE_URL}/posts-sitemap.xml`, lastmod: now },
    { loc: `${SITE_URL}/locations-sitemap.xml`, lastmod: now },
  ];

  const xml = generateSitemapIndexXml(sitemaps);

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
