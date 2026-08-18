"use client";
import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CtaSection from './CtaSection';
import FaqSection, { type FaqItem } from './FaqSection';
import Breadcrumbs from './Breadcrumbs';
import { industryIllustration } from '@/lib/industryIllustration';
import type { Industry } from '@/lib/types';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function IndustriesContent({
  industries,
  faqs,
}: {
  industries: Industry[];
  faqs: FaqItem[];
}) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>('.industry-card').forEach((card) => {
      gsap.fromTo(card,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 85%' },
        }
      );
    });
  }, { scope: container });

  return (
    <div ref={container}>
      <section className="relative px-[6vw] pt-[160px] pb-[60px] z-10">
        <Breadcrumbs items={[{ label: 'Industries', href: '/industries' }]} />
        <div className="mono text-[12px] text-[var(--muted)] mb-[20px]">Industries</div>
        <h1 className="text-[clamp(36px,6vw,72px)] max-w-[20ch] font-[var(--font-display)] font-bold leading-[1]">
          Domain expertise, not a generic template.
        </h1>
        <p className="mt-[24px] max-w-[560px] text-[var(--muted)] text-[16px] leading-[1.7]">
          We&apos;ve shipped production systems in these sectors — each with its own compliance requirements, integration patterns, and failure modes we already know to design around.
        </p>
      </section>

      <section className="relative px-[6vw] pb-[100px] z-10">
        <h2 className="text-[13px] font-mono font-semibold uppercase tracking-wide text-[var(--muted)] mb-[16px]">
          Sectors we build for
        </h2>

        <nav aria-label="Industries on this page" className="mb-[36px] flex flex-wrap gap-[8px]">
          {industries.map((i) => (
            <a
              key={i.slug}
              href={`#${i.slug}`}
              className="mono text-[11.5px] px-[12px] py-[6px] rounded-full border border-[var(--line)] text-[var(--muted)] hover:text-[var(--accent)] hover:border-[rgba(23,104,214,0.4)] transition-colors"
            >
              {i.num} {i.title}
            </a>
          ))}
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
          {industries.map((i) => (
            <div
              key={i.num}
              id={i.slug}
              className="industry-card rounded-[22px] bg-[var(--surface)] border border-[var(--line)] overflow-hidden flex flex-col scroll-mt-[100px]"
            >
              <div className="relative h-[130px] bg-[var(--bg-alt)]">
                <Image
                  src={industryIllustration(i.slug)}
                  alt={`${i.title} — industry solutions illustration`}
                  title={i.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-[36px] flex flex-col flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-[var(--muted)] mono">{i.num}</span>
                  <span className="mono text-[11px] px-[10px] py-[4px] rounded-full bg-[rgba(23,104,214,0.08)] text-[var(--accent)] border border-[rgba(23,104,214,0.2)]">
                    {i.statValue} {i.statLabel}
                  </span>
                </div>
                <h3 className="mt-[14px] text-[26px] font-[var(--font-display)] font-bold">{i.title}</h3>
                <p className="mt-[12px] text-[var(--muted)] text-[15px] leading-[1.6]">{i.desc}</p>

                <h4 className="mt-[20px] text-[11px] font-mono font-semibold uppercase tracking-wide text-[var(--muted)]">
                  What we deliver
                </h4>
                <ul className="mt-[10px] space-y-[8px]">
                  {i.capabilities.slice(0, 4).map((c) => (
                    <li key={c} className="text-[14px] text-[var(--ink)] flex items-start gap-[8px]">
                      <span className="mt-[7px] w-[5px] h-[5px] rounded-full bg-[var(--accent)] flex-none" />
                      {c}
                    </li>
                  ))}
                </ul>

                <a
                  href={`/industries/${i.slug}`}
                  className="mt-[24px] inline-flex items-center gap-[6px] text-[13.5px] font-semibold text-[var(--accent)] hover:gap-[9px] transition-all"
                >
                  View full details →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <FaqSection heading="Industries FAQ" items={faqs} />

      <CtaSection />
    </div>
  );
}
