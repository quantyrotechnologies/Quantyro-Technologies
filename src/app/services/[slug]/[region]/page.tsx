import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServiceRegionPage } from '@/lib/data/serviceRegionPages';
import { getProjectsByRegion } from '@/lib/data/projects';
import { slugToRegion } from '@/lib/regions';
import { SITE_URL } from '@/lib/site';
import Breadcrumbs from '@/components/Breadcrumbs';
import CtaSection from '@/components/CtaSection';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; region: string }>;
}): Promise<Metadata> {
  const { slug, region: regionSlug } = await params;
  const region = slugToRegion(regionSlug);
  if (!region) return {};
  const page = await getServiceRegionPage(slug, region);
  if (!page) return {};
  return {
    title: page.seoTitle || `${page.service.title} in ${page.region}`,
    description: page.seoDescription || page.intro.slice(0, 160),
    alternates: { canonical: `/services/${slug}/${regionSlug}` },
  };
}

export default async function ServiceRegionPage({
  params,
}: {
  params: Promise<{ slug: string; region: string }>;
}) {
  const { slug, region: regionSlug } = await params;
  const region = slugToRegion(regionSlug);
  if (!region) notFound();

  const page = await getServiceRegionPage(slug, region);
  if (!page) notFound();

  const regionalProjects = await getProjectsByRegion(page.region);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${page.service.title} in ${page.region}`,
    description: page.intro,
    areaServed: page.region,
    provider: { "@type": "Organization", name: "Quantyro Technologies", url: SITE_URL },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative px-[6vw] pt-[160px] pb-[60px] z-10">
        <Breadcrumbs
          items={[
            { label: 'Services', href: '/services' },
            { label: page.service.title, href: `/services/${page.service.slug}` },
            { label: page.region, href: `/services/${slug}/${regionSlug}` },
          ]}
        />
        <div className="mono text-[12px] text-[var(--muted)] mb-[20px]">
          {page.service.title} · {page.region}
        </div>
        <h1 className="text-[clamp(32px,5.4vw,56px)] max-w-[20ch] font-[var(--font-display)] font-bold leading-[1.05]">
          {page.service.title} in {page.region}
        </h1>
        <p className="mt-[24px] max-w-[640px] text-[var(--muted)] text-[16px] leading-[1.7]">
          {page.intro}
        </p>
      </section>

      <section className="relative px-[6vw] pb-[80px] z-10">
        <h2 className="text-[13px] font-mono font-semibold uppercase tracking-wide text-[var(--muted)] mb-[16px]">
          What&apos;s included
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-[10px] max-w-[720px]">
          {page.service.capabilities.map((c) => (
            <li key={c} className="text-[14px] text-[var(--ink)] flex items-start gap-[8px]">
              <span className="mt-[7px] w-[5px] h-[5px] rounded-full bg-[var(--accent)] flex-none" />
              {c}
            </li>
          ))}
        </ul>
      </section>

      {regionalProjects.length > 0 && (
        <section className="relative px-[6vw] pb-[100px] z-10">
          <h2 className="text-[13px] font-mono font-semibold uppercase tracking-wide text-[var(--muted)] mb-[16px]">
            Recent work in {page.region}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
            {regionalProjects.map((p) => (
              <div key={p.id} className="rounded-[22px] bg-[var(--surface)] border border-[var(--line)] p-[28px]">
                <div className="flex items-center justify-between text-[12px] text-[var(--muted)] mono">
                  <span>{p.client}</span>
                  <span>{p.region}</span>
                </div>
                <h3 className="mt-[12px] text-[19px] font-[var(--font-display)] font-bold">{p.title}</h3>
                <div className="mt-[8px] text-[13.5px] text-[var(--accent)] font-semibold">{p.result}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      <CtaSection />
    </div>
  );
}
