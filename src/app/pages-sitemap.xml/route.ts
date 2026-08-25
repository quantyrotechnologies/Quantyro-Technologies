import { SITE_URL } from '@/lib/site';
import { generateUrlsetXml, type SitemapUrl } from '@/lib/sitemapXml';

export const dynamic = 'force-dynamic';

export async function GET() {
  const now = new Date().toISOString();
  const urls: SitemapUrl[] = [
    { loc: `${SITE_URL}/`, lastmod: now, priority: 1.0, changefreq: 'monthly' },
    { loc: `${SITE_URL}/services`, lastmod: now, priority: 0.9, changefreq: 'monthly' },
    { loc: `${SITE_URL}/industries`, lastmod: now, priority: 0.9, changefreq: 'monthly' },
    { loc: `${SITE_URL}/work`, lastmod: now, priority: 0.9, changefreq: 'monthly' },
    { loc: `${SITE_URL}/blog`, lastmod: now, priority: 0.8, changefreq: 'weekly' },
    { loc: `${SITE_URL}/about`, lastmod: now, priority: 0.8, changefreq: 'monthly' },
    { loc: `${SITE_URL}/team`, lastmod: now, priority: 0.8, changefreq: 'monthly' },
    { loc: `${SITE_URL}/contact`, lastmod: now, priority: 0.8, changefreq: 'monthly' },
    { loc: `${SITE_URL}/certifications`, lastmod: now, priority: 0.6, changefreq: 'monthly' },
    { loc: `${SITE_URL}/privacy-policy`, lastmod: now, priority: 0.4, changefreq: 'yearly' },
    { loc: `${SITE_URL}/terms-and-conditions`, lastmod: now, priority: 0.4, changefreq: 'yearly' },
  ];

  const xml = generateUrlsetXml(urls);

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
