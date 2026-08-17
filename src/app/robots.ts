import type { MetadataRoute } from 'next';

// TODO: replace with the real production domain before launch.
const siteUrl = 'https://www.quantyro.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
