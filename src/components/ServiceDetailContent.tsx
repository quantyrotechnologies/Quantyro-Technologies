"use client";
import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { tiltOnMouseMove, tiltOnMouseLeave } from '@/hooks/tilt';
import { regionToSlug } from '@/lib/regions';
import { serviceIllustration } from '@/lib/serviceIllustration';
import Breadcrumbs from './Breadcrumbs';
import TableOfContents from './TableOfContents';
import FaqSection, { type FaqItem } from './FaqSection';
import CtaSection from './CtaSection';
import type { Service, RoadmapStep } from '@/lib/types';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ServiceDetailContent({
  service,
  faqs,
  roadmapSteps,
  regions,
}: {
  service: Service;
  faqs: FaqItem[];
  roadmapSteps: RoadmapStep[];
  regions: string[];
}) {
  const container = useRef<HTMLDivElement>(null);
  const accent = Number(service.num) % 2 === 0 ? 'accent-2' : 'accent';

  const tocItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'included', label: "What's included" },
    { id: 'process', label: 'How we deliver this' },
    ...(regions.length > 0 ? [{ id: 'regions', label: 'Available in your region' }] : []),
    ...(faqs.length > 0 ? [{ id: 'faq', label: 'Frequently asked questions' }] : []),
  ];

  const highlights = [
    { icon: 'check', label: `${service.capabilities.length} core capabilities` },
    { icon: 'bolt', label: `${roadmapSteps.length}-step delivery process` },
    { icon: 'shield', label: 'Senior engineers only' },
  ];

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>('.svc-reveal').forEach((el) => {
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
      <section className="relative px-[6vw] pt-[160px] pb-[70px] z-10 overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[60vw] h-[420px] opacity-[0.5] pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 70% 20%, var(--${accent}) 0%, transparent 65%)` }}
        />

        <div className="relative max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-[32px] items-center">
          <div>
            <Breadcrumbs items={[{ label: 'Services', href: '/services' }, { label: service.title, href: `/services/${service.slug}` }]} />
            <div className="mono text-[12px] text-[var(--muted)] mb-[20px]">Services · {service.title}</div>
            <h1 className="svc-reveal text-[clamp(32px,5.4vw,56px)] max-w-[20ch] font-[var(--font-display)] font-bold leading-[1.05]">
              {service.title}
            </h1>

            <div className="svc-reveal mt-[22px] flex flex-wrap gap-[10px]">
              {highlights.map((h) => (
                <div
                  key={h.label}
                  className="inline-flex items-center gap-[7px] px-[13px] py-[7px] rounded-full bg-white border border-[rgba(10,23,47,0.1)] shadow-[0_2px_10px_rgba(10,23,47,0.04)] text-[12.5px] font-medium text-[var(--ink)]"
                >
                  <span
                    className="w-[16px] h-[16px] rounded-full flex items-center justify-center"
                    style={{ background: `color-mix(in srgb, var(--${accent}) 12%, transparent)`, color: `var(--${accent})` }}
                  >
                    {h.icon === 'check' && (
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    )}
                    {h.icon === 'bolt' && (
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" /></svg>
                    )}
                    {h.icon === 'shield' && (
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                    )}
                  </span>
                  {h.label}
                </div>
              ))}
            </div>
          </div>

          <div className="svc-reveal hidden md:block rounded-[24px] bg-white border border-[rgba(10,23,47,0.08)] shadow-[0_16px_50px_rgba(10,23,47,0.06)] p-[16px]">
            <Image
              src={serviceIllustration(service.slug)}
              alt={`${service.title} — illustration of the delivery approach`}
              title={`${service.title} at Quantyro Technologies`}
              width={480}
              height={320}
              className="w-full h-auto rounded-[12px]"
              priority
            />
          </div>
        </div>
      </section>

      <section className="relative px-[6vw] pb-[60px] z-10 max-w-[1100px] mx-auto">
        <div className="svc-reveal">
          <TableOfContents items={tocItems} />
        </div>

        <h2 id="overview" className="svc-reveal text-[13px] font-mono font-semibold uppercase tracking-wide text-[var(--muted)] mb-[16px] scroll-mt-[100px]">
          Overview
        </h2>
        <p className="svc-reveal text-[16px] text-[var(--ink)]/85 leading-[1.75] mb-[56px]">
          {service.desc}
        </p>

        <h2 id="included" className="svc-reveal text-[13px] font-mono font-semibold uppercase tracking-wide text-[var(--muted)] mb-[16px] scroll-mt-[100px]">
          What&apos;s included
        </h2>
        <h3 className="svc-reveal text-[15px] font-semibold text-[var(--ink)] mb-[14px]">Core capabilities</h3>
        <div className="svc-reveal grid grid-cols-1 md:grid-cols-2 gap-[12px] mb-[32px]">
          {service.capabilities.map((c) => (
            <div
              key={c}
              onMouseMove={(e) => tiltOnMouseMove(e, 3)}
              onMouseLeave={tiltOnMouseLeave}
              className="group relative flex items-center gap-[12px] rounded-[14px] border border-[var(--line)] bg-[var(--surface)] px-[16px] py-[14px] overflow-hidden hover:border-[rgba(23,104,214,0.3)] transition-colors"
              style={{ transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.3s' }}
            >
              <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-[var(--accent)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              <span className="shrink-0 w-[26px] h-[26px] rounded-full bg-[rgba(23,104,214,0.08)] border border-[rgba(23,104,214,0.18)] flex items-center justify-center text-[var(--accent)]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </span>
              <span className="text-[14px] text-[var(--ink)] font-medium">{c}</span>
            </div>
          ))}
        </div>

        {service.stack && service.stack.length > 0 && (
          <div className="svc-reveal mb-[56px]">
            <h3 className="text-[15px] font-semibold text-[var(--ink)] mb-[14px]">Tech stack</h3>
            <div className="rounded-[14px] border border-[var(--line)] bg-[var(--surface)] p-[16px] flex flex-wrap gap-[8px]">
              {service.stack.map((t) => (
                <span key={t} className="inline-flex items-center gap-[6px] mono text-[11px] px-[10px] py-[5px] rounded-full border border-[var(--line)] bg-white text-[var(--muted)]">
                  <span className="w-[5px] h-[5px] rounded-full bg-[var(--accent)]" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {roadmapSteps.length > 0 && (
          <>
            <h2 id="process" className="svc-reveal text-[13px] font-mono font-semibold uppercase tracking-wide text-[var(--muted)] mb-[24px] scroll-mt-[100px]">
              How we deliver this
            </h2>
            <div className="relative mb-[56px]">
              <div className="absolute left-[19px] top-[8px] bottom-[8px] w-[2px] bg-[var(--line)]" aria-hidden />
              <div className="flex flex-col gap-[20px]">
                {roadmapSteps.map((step) => (
                  <div key={step.id} className="svc-reveal relative pl-[52px]">
                    <div className="absolute left-0 top-0 w-[40px] h-[40px] rounded-full bg-white border-2 border-[var(--accent)] text-[var(--accent)] shadow-sm flex items-center justify-center mono font-bold text-[13px] z-10">
                      {step.step}
                    </div>
                    <div className="rounded-[16px] border border-[var(--line)] bg-[var(--surface)] p-[20px] hover:border-[rgba(23,104,214,0.3)] hover:shadow-[0_8px_24px_rgba(23,104,214,0.08)] transition-all duration-300">
                      <h3 className="text-[17px] font-[var(--font-display)] font-bold text-[var(--ink)]">
                        {step.title}
                      </h3>
                      <p className="mt-[6px] text-[13.5px] text-[var(--muted)] leading-[1.6]">{step.desc}</p>
                      {step.deliverables.length > 0 && (
                        <>
                          <h4 className="mt-[14px] text-[10.5px] font-mono font-semibold uppercase tracking-wide text-[var(--muted)]">
                            Key deliverables
                          </h4>
                          <ul className="mt-[8px] flex flex-wrap gap-[8px]">
                            {step.deliverables.map((d) => (
                              <li key={d} className="mono text-[11px] px-[9px] py-[3px] rounded-full border border-[var(--line)] bg-white text-[var(--muted)]">
                                {d}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {regions.length > 0 && (
          <>
            <h2 id="regions" className="svc-reveal text-[13px] font-mono font-semibold uppercase tracking-wide text-[var(--muted)] mb-[16px] scroll-mt-[100px]">
              Available in your region
            </h2>
            <div className="svc-reveal flex flex-wrap gap-[10px] mb-[56px]">
              {regions.map((region) => (
                <a
                  key={region}
                  href={`/services/${service.slug}/${regionToSlug(region)}`}
                  className="inline-flex items-center gap-[6px] mono text-[12px] px-[14px] py-[8px] rounded-full border border-[rgba(23,104,214,0.25)] text-[var(--accent)] bg-[rgba(23,104,214,0.04)] hover:bg-[rgba(23,104,214,0.09)] transition-colors"
                >
                  {service.title} in {region} →
                </a>
              ))}
            </div>
          </>
        )}
      </section>

      {faqs.length > 0 && (
        <div id="faq" className="svc-reveal scroll-mt-[100px]">
          <FaqSection heading={`${service.title} FAQ`} items={faqs} />
        </div>
      )}

      <CtaSection />
    </div>
  );
}
