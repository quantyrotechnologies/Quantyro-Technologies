import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { getPublishedPosts } from '@/lib/data/blog';
import { getServices } from '@/lib/data/services';
import { getIndustries } from '@/lib/data/industries';
import { getProjects } from '@/lib/data/projects';
import { getAllActiveServiceRegionSlugs } from '@/lib/data/serviceRegionPages';
import { getAllActiveLocationSlugs } from '@/lib/data/locationPages';
import { regionToSlug } from '@/lib/regions';
import { citySlug } from '@/lib/cities';
import { getTechStackPages } from '@/lib/data/techStackPages';
import { getIndustrySolutionPages } from '@/lib/data/industrySolutionPages';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/industries`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/work`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/team`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/certifications`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/terms-and-conditions`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  const services = await getServices();
  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  const industries = await getIndustries();
  const industryRoutes: MetadataRoute.Sitemap = industries.map((i) => ({
    url: `${SITE_URL}/industries/${i.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  const projects = await getProjects();
  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${SITE_URL}/work/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const posts = await getPublishedPosts();
  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: p.publishedAt ? new Date(p.publishedAt) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  const regionPages = await getAllActiveServiceRegionSlugs();
  const regionRoutes: MetadataRoute.Sitemap = regionPages.map(({ serviceSlug, region }) => ({
    url: `${SITE_URL}/services/${serviceSlug}/${regionToSlug(region)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  const techStackPages = await getTechStackPages();
  const techStackRoutes: MetadataRoute.Sitemap = techStackPages.map((p) => ({
    url: `${SITE_URL}/services/${p.serviceSlug}/stack/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const industrySolutionPages = await getIndustrySolutionPages();
  const industrySolutionRoutes: MetadataRoute.Sitemap = industrySolutionPages.map((p) => ({
    url: `${SITE_URL}/industries/${p.industrySlug}/solutions/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const locationPages = await getAllActiveLocationSlugs();
  const locationRoutes: MetadataRoute.Sitemap = locationPages.map(({ kind, slug, city }) => ({
    url: `${SITE_URL}/${kind === 'service' ? 'services' : 'industries'}/${slug}/${citySlug(city)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.55,
  }));

  return [...staticRoutes, ...serviceRoutes, ...industryRoutes, ...projectRoutes, ...postRoutes, ...regionRoutes, ...techStackRoutes, ...industrySolutionRoutes, ...locationRoutes];
}
