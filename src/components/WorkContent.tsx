"use client";
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CtaSection from './CtaSection';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// TODO: replace with real case studies (with real client names, once cleared for publication) before launch.
const PROJECTS = [
  { title: 'Fintech operations dashboard', client: 'Northwind', region: 'North America', result: '40% faster reconciliation', tags: ['Custom Software', 'Cloud & DevOps'], alt: false },
  { title: 'Retail recommendation engine', client: 'Ferro & Co', region: 'Europe', result: '18% lift in AOV', tags: ['AI & Machine Learning'], alt: true },
  { title: 'Cross-border checkout rebuild', client: 'Brightline', region: 'APAC', result: '2.1x conversion rate', tags: ['E-Commerce'], alt: false },
  { title: 'Field logistics mobile app', client: 'Vantage Point', region: 'South Asia', result: '99.9% crash-free sessions', tags: ['Mobile Apps'], alt: true },
  { title: 'Patient intake automation', client: 'Halcyon Labs', region: 'North America', result: '3 days saved per week, per clinic', tags: ['AI & Machine Learning', 'Custom Software'], alt: false },
  { title: 'Marketplace infra migration', client: 'Kernway', region: 'Europe', result: 'Zero-downtime cutover', tags: ['Cloud & DevOps'], alt: true },
];

export default function WorkContent() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>('.work-card').forEach((card) => {
      gsap.from(card, {
        opacity: 0,
        y: 28,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
        },
      });
    });
  }, { scope: container });

  return (
    <div ref={container}>
      <section className="relative px-[6vw] pt-[160px] pb-[60px] z-10">
        <div className="mono text-[12px] text-[var(--muted)] mb-[20px]">Work</div>
        <h1 className="text-[clamp(36px,6vw,72px)] max-w-[18ch] font-[var(--font-display)] font-bold leading-[1]">
          Real outcomes, across regions.
        </h1>
        <p className="mt-[24px] max-w-[560px] text-[var(--muted)] text-[16px] leading-[1.7]">
          A sample of engagements across our practice areas. Full write-ups available on request.
        </p>
      </section>

      <section className="relative px-[6vw] pb-[100px] z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
          {PROJECTS.map((p) => (
            <article
              key={p.title}
              className="work-card group rounded-[22px] bg-[var(--surface)] border border-[var(--line)] overflow-hidden transition-transform duration-300 hover:-translate-y-[4px]"
            >
              <div className="relative h-[180px] overflow-hidden">
                <div
                  className="absolute inset-0 opacity-[0.55] transition-transform duration-500 group-hover:scale-110"
                  style={{ background: `radial-gradient(circle at 30% 30%, var(${p.alt ? '--accent-2' : '--accent'}) 0%, var(--bg-alt) 70%)` }}
                />
              </div>
              <div className="p-[28px]">
                <div className="flex items-center justify-between text-[12px] text-[var(--muted)] mono">
                  <span>{p.client}</span>
                  <span>{p.region}</span>
                </div>
                <h3 className="mt-[12px] text-[21px] font-[var(--font-display)] font-bold">{p.title}</h3>
                <div className="mt-[10px] text-[14px] text-[var(--accent)] font-semibold">{p.result}</div>
                <div className="mt-[18px] flex flex-wrap gap-[8px]">
                  {p.tags.map((t) => (
                    <span key={t} className="mono text-[11px] px-[10px] py-[5px] rounded-full border border-[var(--line)] text-[var(--muted)]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaSection />
    </div>
  );
}
