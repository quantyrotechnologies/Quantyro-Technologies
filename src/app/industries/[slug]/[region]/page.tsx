import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getIndustryLocationPage } from '@/lib/data/locationPages';
import { getFaqs } from '@/lib/data/faqs';
import { getRoadmapSteps } from '@/lib/data/roadmap';
import { industrySolutionPagesForIndustry } from '@/lib/data/industrySolutionPages';
import { slugToCity } from '@/lib/cities';
import { CITY_CONTEXT } from '@/lib/cityContext';
import { industryIllustration } from '@/lib/industryIllustration';
import { SITE_URL, DEFAULT_OG_IMAGE, organizationNode } from '@/lib/site';
import { stripHtml } from '@/lib/stripHtml';
import Breadcrumbs from '@/components/Breadcrumbs';
import CtaSection from '@/components/CtaSection';
import FaqSection from '@/components/FaqSection';
import TableOfContents from '@/components/TableOfContents';
import InlineInquiryForm from '@/components/InlineInquiryForm';

// Mirrors /services/[slug]/[region] — same URL shape (/industries/{slug}/{city}),
// but industries never had the old 4-region system, so this route only ever
// resolves against the city-based location_pages table.

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; region: string }>;
}): Promise<Metadata> {
  const { slug, region: locationSlug } = await params;
  const city = slugToCity(locationSlug);
  if (!city) return {};

  const page = await getIndustryLocationPage(slug, city);
  if (!page) return {};

  const title = page.seoTitle || `${page.entity.title} in ${page.city}`;
  // Falls back to a city+industry-prefixed description (not the bare
  // industry description) so cities sharing the same industry don't end up
  // with byte-identical meta descriptions in search results.
  const description = page.seoDescription || page.localNote?.slice(0, 160)
    || `${page.entity.title} in ${page.city} — ${stripHtml(page.entity.desc)}`.slice(0, 160);
  return {
    title,
    description,
    alternates: { canonical: `/industries/${slug}/${locationSlug}` },
    openGraph: { title, description, url: `/industries/${slug}/${locationSlug}`, type: 'website', images: [DEFAULT_OG_IMAGE] },
    twitter: { card: 'summary_large_image', title, description, images: [DEFAULT_OG_IMAGE] },
  };
}

export default async function IndustryLocationPage({
  params,
}: {
  params: Promise<{ slug: string; region: string }>;
}) {
  const { slug, region: locationSlug } = await params;
  const city = slugToCity(locationSlug);
  if (!city) notFound();

  const page = await getIndustryLocationPage(slug, city);
  if (!page) notFound();

  const [faqs, roadmapSteps, solutionPages] = await Promise.all([
    page.faqs.length > 0 ? Promise.resolve(page.faqs) : getFaqs(`industry-${slug}`),
    getRoadmapSteps(),
    industrySolutionPagesForIndustry(slug),
  ]);
  const cityContext = CITY_CONTEXT[page.city];
  const solutionByCapability = Object.fromEntries(solutionPages.map((p) => [p.capabilityLabel, p]));

  const tocItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'why-city', label: `Why ${page.city}` },
    { id: 'included', label: 'What we deliver' },
    ...(roadmapSteps.length > 0 ? [{ id: 'process', label: 'How we deliver' }] : []),
    { id: 'at-a-glance', label: 'Engagement at a glance' },
    ...(faqs.length > 0 ? [{ id: 'faq', label: 'FAQs' }] : []),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode(),
      {
        "@type": "Service",
        "@id": `${SITE_URL}/industries/${slug}/${locationSlug}/#service`,
        name: `${page.entity.title} in ${page.city}`,
        description: page.localNote || stripHtml(page.entity.desc),
        areaServed: page.city,
        provider: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative px-[6vw] pt-[160px] pb-[60px] z-10">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-[32px] items-center">
          <div>
            <Breadcrumbs
              items={[
                { label: 'Industries', href: '/industries' },
                { label: page.entity.title, href: `/industries/${page.entity.slug}` },
                { label: page.city, href: `/industries/${slug}/${locationSlug}` },
              ]}
            />
            <div className="mono text-[12px] text-[var(--muted)] mb-[20px]">
              {page.entity.title} · {page.city}
            </div>
            <h1 id="overview" className="text-[clamp(32px,5.4vw,56px)] max-w-[24ch] font-[var(--font-display)] font-bold leading-[1.05] scroll-mt-[100px]">
              {page.entity.title} in {page.city}
            </h1>
            <p className="mt-[24px] max-w-[640px] text-[var(--muted)] text-[16px] leading-[1.7]">
              {page.localNote || stripHtml(page.entity.desc)}
            </p>
            {page.nearbyAreas && (
              <p className="mt-[14px] max-w-[640px] text-[13.5px] text-[var(--muted)]">
                Also serving: {page.nearbyAreas}
              </p>
            )}
          </div>

          <div className="hidden md:block rounded-[24px] bg-white border border-[rgba(10,23,47,0.18)] shadow-[0_16px_50px_rgba(10,23,47,0.06)] p-[16px]">
            <Image
              src={industryIllustration(page.entity.slug)}
              alt={`${page.entity.title} software development in ${page.city} — Quantyro Technologies`}
              title={`${page.entity.title} solutions in ${page.city}`}
              width={480}
              height={320}
              className="w-full h-auto rounded-[12px]"
              priority
            />
          </div>
        </div>
      </section>

      <section className="relative px-[6vw] pb-[100px] z-10">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-x-[40px] items-start">
          <div>
            <TableOfContents items={tocItems} />

            {cityContext && (
              <div className="mb-[60px]">
                <h2 id="why-city" className="text-[13px] font-mono font-semibold uppercase tracking-wide text-[var(--muted)] mb-[16px] scroll-mt-[100px]">
                  Why {page.city}
                </h2>
                <p className="text-[15.5px] text-[var(--ink)]/85 leading-[1.8]">
                  {cityContext} That combination shapes what {page.entity.title.toLowerCase()} businesses here actually need from a software partner — not a generic build, but one that fits the local pace and compliance bar.
                </p>
                <p className="mt-[16px] text-[15px] text-[var(--muted)] leading-[1.8]">
                  {stripHtml(page.entity.desc)} We work with {page.entity.title.toLowerCase()} teams in {page.city} the same way we work with them everywhere: senior engineers who understand the domain, a clear scope before code gets written, and full ownership of what ships — no black-box vendor lock-in.
                </p>
              </div>
            )}

            <div className="mb-[60px]">
              <h2 id="included" className="text-[13px] font-mono font-semibold uppercase tracking-wide text-[var(--muted)] mb-[16px] scroll-mt-[100px]">
                What we deliver
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px]">
                {page.entity.capabilities.map((c) => {
                  const solution = solutionByCapability[c];
                  const cardBody = (
                    <>
                      <div className="flex items-start gap-[10px]">
                        <span className="mt-[3px] w-[6px] h-[6px] rounded-full bg-[var(--accent)] flex-none" />
                        <h3 className="text-[14.5px] font-bold text-[var(--ink)]">{c}</h3>
                      </div>
                      {solution?.tagline && (
                        <p className="mt-[8px] pl-[16px] text-[13px] text-[var(--muted)] leading-[1.6]">
                          {solution.tagline}
                          {solution.slug && <span className="ml-[6px] text-[var(--accent)] font-semibold whitespace-nowrap">View deep dive →</span>}
                        </p>
                      )}
                    </>
                  );
                  return solution?.slug ? (
                    <Link
                      key={c}
                      href={`/industries/${slug}/solutions/${solution.slug}`}
                      className="rounded-[16px] border border-[var(--line)] bg-[var(--surface)] p-[16px] hover:border-[rgba(23,104,214,0.4)] hover:shadow-sm transition-all"
                    >
                      {cardBody}
                    </Link>
                  ) : (
                    <div key={c} className="rounded-[16px] border border-[var(--line)] bg-[var(--surface)] p-[16px]">
                      {cardBody}
                    </div>
                  );
                })}
              </div>
            </div>

            {roadmapSteps.length > 0 && (
              <div className="mb-[60px]">
                <h2 id="process" className="text-[13px] font-mono font-semibold uppercase tracking-wide text-[var(--muted)] mb-[16px] scroll-mt-[100px]">
                  How we deliver this in {page.city}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px]">
                  {roadmapSteps.map((step) => (
                    <div key={step.id} className="rounded-[16px] border border-[var(--line)] bg-[var(--surface)] p-[18px]">
                      <div className="flex items-center gap-[10px] mb-[8px]">
                        <span className="w-[26px] h-[26px] rounded-full bg-white border-2 border-[var(--accent)] text-[var(--accent)] flex items-center justify-center mono font-bold text-[11px] flex-none">
                          {step.step}
                        </span>
                        <h3 className="text-[15px] font-bold text-[var(--ink)]">{step.title}</h3>
                      </div>
                      <p className="text-[13.5px] text-[var(--muted)] leading-[1.65]">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h2 id="at-a-glance" className="text-[13px] font-mono font-semibold uppercase tracking-wide text-[var(--muted)] mb-[16px] scroll-mt-[100px]">
                Engagement at a glance
              </h2>
              <div className="overflow-hidden rounded-[16px] border border-[var(--line)]">
                <table className="w-full text-[14px] border-collapse">
                  <tbody>
                    {[
                      ['Delivery timeline', 'Typically 6–16 weeks, depending on scope'],
                      ['Engagement model', 'Fixed-scope project or dedicated team — your choice'],
                      ['Team', 'Senior engineers only — no outsourced junior benches'],
                      ['Code & IP ownership', '100% transferred to you — source code, CI/CD, infra'],
                    ].map(([label, value], i) => (
                      <tr key={label} className={i > 0 ? 'border-t border-[var(--line)]' : ''}>
                        <th scope="row" className="text-left font-semibold text-[var(--ink)] bg-[var(--surface)] px-[18px] py-[13px] w-[220px] align-top">
                          {label}
                        </th>
                        <td className="px-[18px] py-[13px] text-[var(--muted)] align-top">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-[100px]">
            <InlineInquiryForm source={`Industry: ${page.entity.title} — ${page.city}`} heading={`Get a quote for ${page.city}`} />
          </aside>
        </div>
      </section>

      {faqs.length > 0 && (
        <div id="faq" className="scroll-mt-[100px]">
          <FaqSection items={faqs} heading={`FAQs — ${page.entity.title} in ${page.city}`} />
        </div>
      )}

      <CtaSection />
    </div>
  );
}
