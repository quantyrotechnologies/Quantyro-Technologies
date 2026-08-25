import { SITE_URL } from '@/lib/site';
import { generateUrlsetXml, type SitemapUrl } from '@/lib/sitemapXml';
import { getServices } from '@/lib/data/services';
import { getAllActiveServiceRegionSlugs } from '@/lib/data/serviceRegionPages';
import { getTechStackPages } from '@/lib/data/techStackPages';
import { regionToSlug } from '@/lib/regions';

export const dynamic = 'force-dynamic';

export async function GET() {
  const now = new Date().toISOString();
  const [services, regionPages, techStackPages] = await Promise.all([
    getServices(),
    getAllActiveServiceRegionSlugs(),
    getTechStackPages(),
  ]);

  const urls: SitemapUrl[] = [];

  // Core Service Pages
  services.forEach((s) => {
    urls.push({
      loc: `${SITE_URL}/services/${s.slug}`,
      lastmod: now,
      priority: 0.9,
      changefreq: 'monthly',
    });
  });

  // Regional Service Pages
  regionPages.forEach(({ serviceSlug, region }) => {
    urls.push({
      loc: `${SITE_URL}/services/${serviceSlug}/${regionToSlug(region)}`,
      lastmod: now,
      priority: 0.7,
      changefreq: 'monthly',
    });
  });

  // Tech Stack Deep-Dive Pages
  techStackPages.forEach((p) => {
    urls.push({
      loc: `${SITE_URL}/services/${p.serviceSlug}/stack/${p.slug}`,
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
