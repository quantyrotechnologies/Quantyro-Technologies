export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export function generateSitemapIndexXml(sitemaps: { loc: string; lastmod?: string }[]): string {
  const sitemapNodes = sitemaps
    .map((s) => {
      const lastmod = s.lastmod || new Date().toISOString();
      return `  <sitemap>
    <loc>${s.loc}</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/main-sitemap.xsl"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapNodes}
</sitemapindex>`;
}

export function generateUrlsetXml(urls: SitemapUrl[]): string {
  const urlNodes = urls
    .map((u) => {
      const lastmod = u.lastmod || new Date().toISOString();
      const priority = u.priority !== undefined ? u.priority.toFixed(1) : '0.6';
      const changefreq = u.changefreq || 'monthly';
      return `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/main-sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlNodes}
</urlset>`;
}
