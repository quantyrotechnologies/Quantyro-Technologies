"use client";
import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { tiltOnMouseMove, tiltOnMouseLeave } from '@/hooks/tilt';
import { industryIllustration } from '@/lib/industryIllustration';
import { citySlug } from '@/lib/cities';
import Breadcrumbs from './Breadcrumbs';
import TableOfContents from './TableOfContents';
import FaqSection, { type FaqItem } from './FaqSection';
import InlineInquiryForm from './InlineInquiryForm';
import CtaSection from './CtaSection';
import RichText from './RichText';
import type { Industry, Service, Project } from '@/lib/types';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function IndustryDetailContent({
  industry,
  relatedServices,
  faqs,
  cities = [],
  industrySolutionSlugs = {},
  relatedProjects = [],
}: {
  industry: Industry;
  relatedServices: Service[];
  faqs: FaqItem[];
  cities?: string[];
  /** capabilityLabel -> deep-dive page slug, pre-fetched by the page so this client component doesn't call async data functions per capability. */
  industrySolutionSlugs?: Record<string, string>;
  relatedProjects?: Project[];
}) {
  const container = useRef<HTMLDivElement>(null);
  const accent = Number(industry.num) % 2 === 0 ? 'accent-2' : 'accent';

  const tocItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'challenges', label: 'Common Challenges' },
    { id: 'capabilities', label: 'What We Deliver' },
    ...(industry.marketStats.length > 0 ? [{ id: 'market-context', label: 'Market Context' }] : []),
    ...(relatedServices.length > 0 ? [{ id: 'related-services', label: 'Related Services' }] : []),
    { id: 'engagement', label: 'Engagement at a Glance' },
    ...(relatedProjects.length > 0 ? [{ id: 'related-work', label: 'Related Work' }] : []),
    ...(cities.length > 0 ? [{ id: 'locations', label: 'Global Availability' }] : []),
    ...(faqs.length > 0 ? [{ id: 'faq', label: 'Frequently Asked Questions' }] : []),
  ];

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>('.ind-reveal').forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        }
      );
    });
  }, { scope: container });

  return (
    <div ref={container}>
      {/* Hero Header Section */}
      <section className="relative px-[6vw] pt-[160px] pb-[70px] z-10 overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[60vw] h-[420px] opacity-[0.5] pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 70% 20%, var(--${accent}) 0%, transparent 65%)` }}
        />

        <div className="relative max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-[32px] items-center">
          <div>
            <Breadcrumbs items={[{ label: 'Industries', href: '/industries' }, { label: industry.title, href: `/industries/${industry.slug}` }]} />
            <div className="mono text-[12px] text-[var(--muted)] mb-[20px]">Industries · {industry.title}</div>

            <h1 className="ind-reveal text-[clamp(32px,5.4vw,56px)] max-w-[20ch] font-[var(--font-display)] font-bold leading-[1.05] text-[var(--ink)]">
              {industry.title}
            </h1>

            <div className="ind-reveal mt-[22px] flex flex-wrap gap-[10px]">
              <div className="inline-flex items-center gap-[7px] px-[13px] py-[7px] rounded-full bg-white border border-[rgba(10,23,47,0.18)] shadow-[0_2px_10px_rgba(10,23,47,0.04)] text-[12.5px] font-medium text-[var(--ink)]">
                <span
                  className="w-[16px] h-[16px] rounded-full flex items-center justify-center"
                  style={{ background: `color-mix(in srgb, var(--${accent}) 12%, transparent)`, color: `var(--${accent})` }}
                >
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </span>
                {industry.statValue} {industry.statLabel}
              </div>
              <div className="inline-flex items-center gap-[7px] px-[13px] py-[7px] rounded-full bg-white border border-[rgba(10,23,47,0.18)] shadow-[0_2px_10px_rgba(10,23,47,0.04)] text-[12.5px] font-medium text-[var(--ink)]">
                <span
                  className="w-[16px] h-[16px] rounded-full flex items-center justify-center"
                  style={{ background: `color-mix(in srgb, var(--${accent}) 12%, transparent)`, color: `var(--${accent})` }}
                >
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" /></svg>
                </span>
                {industry.capabilities.length} delivery capabilities
              </div>
            </div>
          </div>

          <div className="ind-reveal hidden md:block rounded-[24px] bg-white border border-[rgba(10,23,47,0.18)] shadow-[0_16px_50px_rgba(10,23,47,0.06)] p-[16px]">
            <Image
              src={industryIllustration(industry.slug)}
              alt={`${industry.title} — Quantyro Technologies industry solutions`}
              title={`${industry.title} Solutions`}
              width={480}
              height={320}
              className="w-full h-auto rounded-[12px]"
              priority
            />
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="relative px-[6vw] pb-[60px] z-10">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-x-[40px] items-start">
      <div>
        <div className="ind-reveal">
          <TableOfContents items={tocItems} />
        </div>

        {/* 1. Overview */}
        <div className="mb-[64px]">
          <h2 id="overview" className="ind-reveal text-[13px] font-mono font-semibold uppercase tracking-wide text-[var(--accent)] mb-[16px] scroll-mt-[100px] before:content-['01_/_']">
            Overview
          </h2>
          <h3 className="ind-reveal text-[24px] md:text-[28px] font-bold font-[var(--font-display)] text-[var(--ink)] mb-[14px]">
            {industry.title} Software Built for the Constraints That Actually Matter
          </h3>
          <RichText
            html={industry.desc}
            className="ind-reveal text-[16.5px] text-[var(--ink)]/85 leading-[1.8]"
          />
        </div>

        {/* 2. Common Challenges */}
        <div className="mb-[64px]">
          <h2 id="challenges" className="ind-reveal text-[13px] font-mono font-semibold uppercase tracking-wide text-[var(--accent)] mb-[16px] scroll-mt-[100px] before:content-['02_/_']">
            Common Challenges
          </h2>
          <h3 className="ind-reveal text-[24px] md:text-[28px] font-bold font-[var(--font-display)] text-[var(--ink)] mb-[20px]">
            What Usually Blocks Teams in {industry.title}
          </h3>

          <div className="ind-reveal grid grid-cols-1 md:grid-cols-2 gap-[14px]">
            {industry.challenges.map((c) => (
              <div
                key={c}
                onMouseMove={(e) => tiltOnMouseMove(e, 3)}
                onMouseLeave={tiltOnMouseLeave}
                className="group relative flex items-start gap-[14px] rounded-[18px] border border-[var(--line)] bg-[var(--surface)] p-[18px] overflow-hidden hover:border-[rgba(23,104,214,0.4)] hover:shadow-md transition-all"
              >
                <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-[var(--accent)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <span className="shrink-0 w-[28px] h-[28px] rounded-full bg-[rgba(23,104,214,0.08)] border border-[rgba(23,104,214,0.18)] flex items-center justify-center text-[var(--accent)] mt-[2px]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 9v4M12 17h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /></svg>
                </span>
                <h4 className="text-[15px] text-[var(--ink)] font-bold leading-[1.4]">{c}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* 3. What We Deliver */}
        <div className="mb-[64px]">
          <h2 id="capabilities" className="ind-reveal text-[13px] font-mono font-semibold uppercase tracking-wide text-[var(--accent)] mb-[16px] scroll-mt-[100px] before:content-['03_/_']">
            What We Deliver
          </h2>
          <h3 className="ind-reveal text-[24px] md:text-[28px] font-bold font-[var(--font-display)] text-[var(--ink)] mb-[20px]">
            Capabilities We Bring to {industry.title} Projects
          </h3>

          <div className="ind-reveal grid grid-cols-1 md:grid-cols-2 gap-[14px]">
            {industry.capabilities.map((c) => {
              const solutionSlug = industrySolutionSlugs[c] ?? null;
              const Card = (
                <>
                  <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-[var(--accent)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <span className="shrink-0 w-[28px] h-[28px] rounded-full bg-[rgba(23,104,214,0.08)] border border-[rgba(23,104,214,0.18)] flex items-center justify-center text-[var(--accent)] mt-[2px]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  <div className="flex-1">
                    <h4 className="text-[15px] text-[var(--ink)] font-bold leading-[1.4]">{c}</h4>
                    {solutionSlug && (
                      <h5 className="text-[12px] mono text-[var(--accent)] mt-[4px] uppercase font-semibold">
                        View deep dive →
                      </h5>
                    )}
                  </div>
                </>
              );

              const className = "group relative flex items-start gap-[14px] rounded-[18px] border border-[var(--line)] bg-[var(--surface)] p-[18px] overflow-hidden hover:border-[rgba(23,104,214,0.4)] hover:shadow-md transition-all";

              return solutionSlug ? (
                <Link
                  key={c}
                  href={`/industries/${industry.slug}/solutions/${solutionSlug}`}
                  onMouseMove={(e) => tiltOnMouseMove(e, 3)}
                  onMouseLeave={tiltOnMouseLeave}
                  className={className}
                >
                  {Card}
                </Link>
              ) : (
                <div
                  key={c}
                  onMouseMove={(e) => tiltOnMouseMove(e, 3)}
                  onMouseLeave={tiltOnMouseLeave}
                  className={className}
                >
                  {Card}
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Market Context */}
        {industry.marketStats.length > 0 && (
          <div className="mb-[64px]">
            <h2 id="market-context" className="ind-reveal text-[13px] font-mono font-semibold uppercase tracking-wide text-[var(--accent)] mb-[16px] scroll-mt-[100px] before:content-['04_/_']">
              Market Context
            </h2>
            <h3 className="ind-reveal text-[24px] md:text-[28px] font-bold font-[var(--font-display)] text-[var(--ink)] mb-[20px]">
              Why {industry.title} Is Investing in Software Right Now
            </h3>

            <div className="ind-reveal grid grid-cols-1 md:grid-cols-3 gap-[16px]">
              {industry.marketStats.map((stat) => (
                <div
                  key={stat}
                  className="rounded-[18px] border border-[var(--line)] bg-[var(--surface)] p-[20px]"
                >
                  <div className="w-[8px] h-[8px] rounded-full bg-[var(--accent)] mb-[12px]" />
                  <p className="text-[14px] text-[var(--ink)] leading-[1.6] font-medium">{stat}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. Related Services */}
        {relatedServices.length > 0 && (
          <div className="mb-[64px]">
            <h2 id="related-services" className="ind-reveal text-[13px] font-mono font-semibold uppercase tracking-wide text-[var(--accent)] mb-[16px] scroll-mt-[100px] before:content-['05_/_']">
              Related Services
            </h2>
            <h3 className="ind-reveal text-[24px] md:text-[28px] font-bold font-[var(--font-display)] text-[var(--ink)] mb-[20px]">
              Practice Areas We Apply Here
            </h3>

            <div className="ind-reveal grid grid-cols-1 md:grid-cols-3 gap-[16px]">
              {relatedServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group rounded-[18px] border border-[var(--line)] bg-[var(--surface)] p-[22px] hover:border-[rgba(23,104,214,0.4)] hover:shadow-md transition-all"
                >
                  <h4 className="text-[16px] font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">{s.title}</h4>
                  <p className="mt-[8px] text-[13.5px] text-[var(--muted)] leading-[1.6]">{s.desc}</p>
                  <span className="mt-[14px] inline-flex items-center gap-[6px] text-[13px] font-semibold text-[var(--accent)] group-hover:gap-[9px] transition-all">
                    View service →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 6. Engagement at a Glance */}
        <div className="mb-[64px]">
          <h2 id="engagement" className="ind-reveal text-[13px] font-mono font-semibold uppercase tracking-wide text-[var(--accent)] mb-[16px] scroll-mt-[100px] before:content-['06_/_']">
            Engagement at a Glance
          </h2>
          <h3 className="ind-reveal text-[24px] md:text-[28px] font-bold font-[var(--font-display)] text-[var(--ink)] mb-[20px]">
            How Working Together Actually Looks
          </h3>
          <div className="ind-reveal overflow-hidden rounded-[16px] border border-[var(--line)]">
            <table className="w-full text-[14px] border-collapse">
              <tbody>
                {[
                  ['Delivery timeline', 'Typically 6–16 weeks, depending on scope'],
                  ['Engagement model', 'Fixed-scope project or dedicated team — your choice'],
                  ['Team', 'Senior engineers only — no outsourced junior benches'],
                  ['Code & IP ownership', '100% transferred to you — source code, CI/CD, infra'],
                  ['Pricing', 'Scoped to your project during discovery — request a custom quote below'],
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

        {/* 7. Related Work */}
        {relatedProjects.length > 0 && (
          <div className="mb-[64px]">
            <h2 id="related-work" className="ind-reveal text-[13px] font-mono font-semibold uppercase tracking-wide text-[var(--accent)] mb-[16px] scroll-mt-[100px] before:content-['07_/_']">
              Related Work
            </h2>
            <div className="ind-reveal grid grid-cols-1 md:grid-cols-2 gap-[14px]">
              {relatedProjects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/work/${p.slug}`}
                  className="group relative flex flex-col gap-[6px] rounded-[18px] border border-[var(--line)] bg-[var(--surface)] p-[18px] hover:border-[rgba(23,104,214,0.4)] hover:shadow-md transition-all"
                >
                  <span className="mono text-[11px] text-[var(--muted)]">{p.client} · {p.region}</span>
                  <h4 className="text-[15px] text-[var(--ink)] font-bold">{p.title}</h4>
                  <span className="text-[13px] text-[var(--muted)]">{p.result}</span>
                  <span className="mt-[4px] text-[12px] mono text-[var(--accent)] font-semibold">View case study →</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 8. Global Availability */}
        {cities.length > 0 && (
          <div className="mb-[64px]">
            <h2 id="locations" className="ind-reveal text-[13px] font-mono font-semibold uppercase tracking-wide text-[var(--accent)] mb-[16px] scroll-mt-[100px] before:content-['08_/_']">
              Global Availability
            </h2>
            <div className="ind-reveal flex flex-wrap gap-[10px]">
              {cities.map((city) => (
                <Link
                  key={city}
                  href={`/industries/${industry.slug}/${citySlug(city)}`}
                  className="inline-flex items-center gap-[6px] mono text-[12.5px] px-[16px] py-[9px] rounded-full border border-[rgba(23,104,214,0.25)] text-[var(--accent)] bg-[rgba(23,104,214,0.04)] hover:bg-[rgba(23,104,214,0.1)] transition-colors"
                >
                  {industry.title} in {city} →
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <aside className="ind-reveal lg:sticky lg:top-[100px]">
        <InlineInquiryForm source={`Industry: ${industry.title}`} heading={`Get a quote for ${industry.title}`} />
      </aside>
      </div>
      </section>

      {/* 5. FAQs */}
      {faqs.length > 0 && (
        <div id="faq" className="ind-reveal scroll-mt-[100px]">
          <FaqSection heading={`${industry.title} FAQ`} items={faqs} />
        </div>
      )}

      <CtaSection />
    </div>
  );
}
