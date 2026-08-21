import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getServiceBySlug } from '@/lib/data/services';
import { findTechStackPage, techStackPagesForService, getAllTechStackParams } from '@/lib/data/techStackPages';
import { SITE_URL, DEFAULT_OG_IMAGE, organizationNode } from '@/lib/site';
import Breadcrumbs from '@/components/Breadcrumbs';
import InlineInquiryForm from '@/components/InlineInquiryForm';
import CtaSection from '@/components/CtaSection';

export async function generateStaticParams() {
  const params = await getAllTechStackParams();
  return params.map((p) => ({ slug: p.serviceSlug, capability: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; capability: string }>;
}): Promise<Metadata> {
  const { slug, capability } = await params;
  const page = await findTechStackPage(slug, capability);
  if (!page) return {};
  return {
    title: page.seoTitle,
    description: page.seoDescription,
    alternates: { canonical: `/services/${slug}/stack/${capability}` },
    openGraph: { title: page.seoTitle, description: page.seoDescription, url: `/services/${slug}/stack/${capability}`, type: 'website', images: [DEFAULT_OG_IMAGE] },
    twitter: { card: 'summary_large_image', title: page.seoTitle, description: page.seoDescription, images: [DEFAULT_OG_IMAGE] },
  };
}

export default async function TechStackDetailPage({
  params,
}: {
  params: Promise<{ slug: string; capability: string }>;
}) {
  const { slug, capability } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const page = await findTechStackPage(slug, capability);
  if (!page) notFound();

  const otherCapabilities = (await techStackPagesForService(slug)).filter((p) => p.slug !== capability);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      organizationNode(),
      {
        '@type': 'TechArticle',
        '@id': `${SITE_URL}/services/${slug}/stack/${capability}/#article`,
        headline: page.title,
        description: page.overview,
        about: page.primaryTech,
        isPartOf: {
          '@type': 'Service',
          name: service.title,
          url: `${SITE_URL}/services/${service.slug}`,
        },
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'FAQPage',
        mainEntity: page.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative px-[6vw] pt-[160px] pb-[60px] z-10">
        <Breadcrumbs
          items={[
            { label: 'Services', href: '/services' },
            { label: service.title, href: `/services/${service.slug}` },
            { label: page.title, href: `/services/${service.slug}/stack/${page.slug}` },
          ]}
        />
        <div className="mono text-[12px] text-[var(--muted)] mb-[20px]">
          {service.title} · Technology Deep Dive
        </div>
        <h1 className="text-[clamp(32px,5.4vw,56px)] max-w-[22ch] font-[var(--font-display)] font-bold leading-[1.05] text-[var(--ink)]">
          {page.title}
        </h1>
        <p className="mt-[18px] max-w-[640px] text-[17px] text-[var(--accent)] font-semibold leading-[1.5]">
          {page.tagline}
        </p>
        <p className="mt-[20px] max-w-[720px] text-[var(--muted)] text-[16px] leading-[1.75]">
          {page.overview}
        </p>
        <p className="mt-[16px] max-w-[720px] text-[var(--muted)] text-[16px] leading-[1.75]">
          {page.overviewExtra}
        </p>

        <div className="mt-[24px] flex flex-wrap gap-[8px]">
          {page.primaryTech.map((t) => (
            <span key={t} className="mono text-[12px] px-[12px] py-[6px] rounded-full border border-[var(--line)] bg-white text-[var(--ink)] font-medium">
              {t}
            </span>
          ))}
        </div>
      </section>

      <section className="relative px-[6vw] pb-[100px] z-10">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-x-[40px] items-start">
          <div>
            {/* How we build it */}
            <div className="mb-[56px]">
              <h2 className="text-[13px] font-mono font-semibold uppercase tracking-wide text-[var(--accent)] mb-[16px] before:content-['01_/_']">
                Implementation
              </h2>
              <h3 className="text-[24px] md:text-[28px] font-bold font-[var(--font-display)] text-[var(--ink)] mb-[24px] max-w-[40ch]">
                How We Actually Build This
              </h3>
              <div className="flex flex-col gap-[12px]">
                {page.implementation.map((step, i) => (
                  <div
                    key={step}
                    className="flex items-start gap-[16px] rounded-[16px] border border-[var(--line)] bg-[var(--surface)] p-[18px]"
                  >
                    <span className="shrink-0 w-[26px] h-[26px] rounded-full bg-[#0A1324] text-white flex items-center justify-center mono text-[11px] font-bold">
                      {i + 1}
                    </span>
                    <p className="text-[14.5px] text-[var(--ink)]/90 leading-[1.7]">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="mb-[56px]">
              <h2 className="text-[13px] font-mono font-semibold uppercase tracking-wide text-[var(--accent)] mb-[16px] before:content-['02_/_']">
                Key Benefits
              </h2>
              <h3 className="text-[24px] md:text-[28px] font-bold font-[var(--font-display)] text-[var(--ink)] mb-[24px] max-w-[36ch]">
                Why {page.title} Is the Right Choice
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px]">
                {page.benefits.map((b) => (
                  <div
                    key={b}
                    className="flex items-start gap-[14px] rounded-[18px] border border-[var(--line)] bg-[var(--surface)] p-[18px]"
                  >
                    <span className="shrink-0 w-[28px] h-[28px] rounded-full bg-[rgba(23,104,214,0.08)] border border-[rgba(23,104,214,0.18)] flex items-center justify-center text-[var(--accent)] mt-[2px]">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    </span>
                    <p className="text-[14.5px] text-[var(--ink)] leading-[1.6]">{b}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Companies using this */}
            <div className="mb-[56px]">
              <h2 className="text-[13px] font-mono font-semibold uppercase tracking-wide text-[var(--accent)] mb-[16px] before:content-['03_/_']">
                Proven at Scale
              </h2>
              <h3 className="text-[24px] md:text-[28px] font-bold font-[var(--font-display)] text-[var(--ink)] mb-[24px] max-w-[40ch]">
                Companies Building on This Technology
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
                {page.companies.map((c) => (
                  <div
                    key={c.name}
                    className="rounded-[20px] bg-[#0A1324] border border-white/[0.08] p-[24px] text-white"
                  >
                    <h4 className="text-[17px] font-bold text-white mb-[8px]">{c.name}</h4>
                    <p className="text-[13.5px] text-slate-300 leading-[1.65]">{c.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Use cases */}
            <div className="mb-[56px]">
              <h2 className="text-[13px] font-mono font-semibold uppercase tracking-wide text-[var(--accent)] mb-[16px] before:content-['04_/_']">
                Where This Applies
              </h2>
              <h3 className="text-[24px] md:text-[28px] font-bold font-[var(--font-display)] text-[var(--ink)] mb-[24px] max-w-[40ch]">
                Common Use Cases
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-[12px]">
                {page.useCases.map((u) => (
                  <li key={u} className="text-[14.5px] text-[var(--ink)] flex items-start gap-[10px] rounded-[14px] border border-[var(--line)] bg-[var(--surface)] p-[16px]">
                    <span className="mt-[7px] w-[5px] h-[5px] rounded-full bg-[var(--accent)] flex-none" />
                    {u}
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQ */}
            <div className="mb-[56px]">
              <h2 className="text-[13px] font-mono font-semibold uppercase tracking-wide text-[var(--accent)] mb-[16px] before:content-['05_/_']">
                Frequently Asked Questions
              </h2>
              <h3 className="text-[24px] md:text-[28px] font-bold font-[var(--font-display)] text-[var(--ink)] mb-[24px] max-w-[40ch]">
                Common Questions About {page.title}
              </h3>
              <div className="flex flex-col gap-[12px]">
                {page.faqs.map((f) => (
                  <details
                    key={f.q}
                    className="group rounded-[16px] border border-[var(--line)] bg-[var(--surface)] p-[20px] open:border-[rgba(23,104,214,0.3)] transition-colors"
                  >
                    <summary className="cursor-pointer list-none flex items-center justify-between gap-[12px] text-[15px] font-bold text-[var(--ink)]">
                      {f.q}
                      <span className="shrink-0 text-[var(--accent)] transition-transform duration-200 group-open:rotate-45 text-[20px] leading-none">+</span>
                    </summary>
                    <p className="mt-[12px] text-[14px] text-[var(--muted)] leading-[1.7]">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>

            {/* Other capabilities in this service */}
            {otherCapabilities.length > 0 && (
              <div>
                <h2 className="text-[13px] font-mono font-semibold uppercase tracking-wide text-[var(--muted)] mb-[16px]">
                  Also part of {service.title}
                </h2>
                <div className="flex flex-wrap gap-[10px]">
                  {otherCapabilities.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/services/${service.slug}/stack/${c.slug}`}
                      className="mono text-[12.5px] px-[16px] py-[9px] rounded-full border border-[rgba(23,104,214,0.25)] text-[var(--accent)] bg-[rgba(23,104,214,0.04)] hover:bg-[rgba(23,104,214,0.1)] transition-colors"
                    >
                      {c.title} →
                    </Link>
                  ))}
                </div>
                <Link
                  href={`/services/${service.slug}`}
                  className="mt-[24px] inline-flex items-center gap-[6px] text-[13.5px] font-semibold text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                >
                  ← Back to {service.title} overview
                </Link>
              </div>
            )}
          </div>

          <aside className="lg:sticky lg:top-[100px]">
            <InlineInquiryForm source={`Deep-dive: ${page.title}`} heading={`Get a quote for ${page.title}`} />
          </aside>
        </div>
      </section>

      <CtaSection />
    </div>
  );
}
