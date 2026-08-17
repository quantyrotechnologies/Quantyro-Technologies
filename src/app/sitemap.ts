import type { MetadataRoute } from 'next';

// TODO: replace with the real production domain before launch.
const siteUrl = 'https://www.quantyro.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/services', '/work', '/about', '/contact'];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
}
