import { SITE_URL } from '@/lib/site';
import { generateUrlsetXml, type SitemapUrl } from '@/lib/sitemapXml';
import { getPublishedPosts } from '@/lib/data/blog';

export const dynamic = 'force-dynamic';

export async function GET() {
  const now = new Date().toISOString();
  const posts = await getPublishedPosts();

  const urls: SitemapUrl[] = [
    { loc: `${SITE_URL}/blog`, lastmod: now, priority: 0.8, changefreq: 'weekly' },
  ];

  posts.forEach((p) => {
    urls.push({
      loc: `${SITE_URL}/blog/${p.slug}`,
      lastmod: p.publishedAt ? new Date(p.publishedAt).toISOString() : now,
      priority: 0.7,
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
