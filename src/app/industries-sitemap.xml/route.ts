import { SITE_URL } from '@/lib/site';
import { generateUrlsetXml, type SitemapUrl } from '@/lib/sitemapXml';
import { getIndustries } from '@/lib/data/industries';
import { getIndustrySolutionPages } from '@/lib/data/industrySolutionPages';

export const dynamic = 'force-dynamic';

export async function GET() {
  const now = new Date().toISOString();
  const [industries, industrySolutionPages] = await Promise.all([
    getIndustries(),
    getIndustrySolutionPages(),
  ]);

  const urls: SitemapUrl[] = [];

  // Core Industry Pages
  industries.forEach((i) => {
    urls.push({
      loc: `${SITE_URL}/industries/${i.slug}`,
      lastmod: now,
      priority: 0.9,
      changefreq: 'monthly',
    });
  });

  // Industry Solution Deep-Dive Pages
  industrySolutionPages.forEach((p) => {
    urls.push({
      loc: `${SITE_URL}/industries/${p.industrySlug}/solutions/${p.slug}`,
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
