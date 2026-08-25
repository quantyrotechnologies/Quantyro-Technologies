import { SITE_URL } from '@/lib/site';
import { generateUrlsetXml, type SitemapUrl } from '@/lib/sitemapXml';
import { getAllActiveLocationSlugs } from '@/lib/data/locationPages';
import { citySlug } from '@/lib/cities';

export const dynamic = 'force-dynamic';

export async function GET() {
  const now = new Date().toISOString();
  const locationPages = await getAllActiveLocationSlugs();

  const urls: SitemapUrl[] = [];

  locationPages.forEach(({ kind, slug, city }) => {
    urls.push({
      loc: `${SITE_URL}/${kind === 'service' ? 'services' : 'industries'}/${slug}/${citySlug(city)}`,
      lastmod: now,
      priority: 0.6,
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
