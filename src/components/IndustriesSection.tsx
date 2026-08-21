"use client";
import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { tiltOnMouseMove, tiltOnMouseLeave } from '@/hooks/tilt';
import { stripHtml } from '@/lib/stripHtml';
import type { Industry } from '@/lib/types';

gsap.registerPlugin(ScrollTrigger, useGSAP);
gsap.config({ nullTargetWarn: false });

export default function IndustriesSection({ industries }: { industries: Industry[] }) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!container.current || !industries || industries.length === 0) return;
    const headingTargets = gsap.utils.toArray<HTMLElement>('.industries-heading > *', container.current);
    if (headingTargets.length > 0) {
      gsap.fromTo(headingTargets,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: container.current, start: 'top 80%' },
        }
      );
    }
    const pills = gsap.utils.toArray<HTMLElement>('.industries-pill', container.current);
    pills.forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: i * 0.05,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
        }
      );
    });
  }, { scope: container, dependencies: [industries] });

  return (
    <section ref={container} id="industries" className="relative px-[6vw] py-[90px] z-10">
      <div className="industries-heading flex flex-col md:flex-row md:items-end justify-between gap-[16px] mb-[36px]">
        <div>
          <div className="inline-flex items-center gap-[6px] px-[12px] py-[3.5px] rounded-full bg-[rgba(23,104,214,0.07)] border border-[rgba(23,104,214,0.2)] text-[var(--accent)] text-[11px] font-mono font-semibold uppercase mb-[8px]">
            <span className="w-[6px] h-[6px] rounded-full bg-[var(--accent)]" />
            <span className="before:content-['03_//_']">Who we build for</span>
          </div>
          <h2 className="text-[clamp(26px,3.6vw,44px)] font-[var(--font-display)] font-bold leading-[1.1] text-[var(--ink)]">
            Industries we <span className="text-[var(--accent)]">build for</span>.
          </h2>
          <p className="mt-[10px] max-w-[52ch] text-[14.5px] text-[var(--muted)] leading-[1.6]">
            Sectors where compliance, scale, and integration constraints are different from a generic web app — and where we already know the patterns.
          </p>
        </div>

        <Link
          href="/industries"
          className="inline-flex items-center gap-[6px] text-[13.5px] font-semibold text-[var(--muted)] hover:text-[var(--accent)] transition-colors group shrink-0"
        >
          <span>See all industries</span>
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px]">
        {industries.map((i) => (
          <Link
            key={i.slug}
            href={`/industries/${i.slug}`}
            onMouseMove={(e) => tiltOnMouseMove(e, 3)}
            onMouseLeave={tiltOnMouseLeave}
            className="industries-pill group relative rounded-[20px] bg-white border border-[rgba(10,23,47,0.18)] shadow-[0_8px_24px_rgba(10,23,47,0.05)] hover:border-[rgba(23,104,214,0.4)] hover:shadow-[0_14px_40px_rgba(23,104,214,0.12)] p-[24px] transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-[10px]">
              <span className="mono text-[12px] text-[var(--accent)] font-bold">{i.num}</span>
              <span className="mono text-[10.5px] px-[9px] py-[3px] rounded-full bg-[rgba(23,104,214,0.08)] text-[var(--accent)] border border-[rgba(23,104,214,0.18)]">
                {i.statValue}
              </span>
            </div>
            <h3 className="text-[18px] font-[var(--font-display)] font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
              {i.title}
            </h3>
            <p className="mt-[8px] text-[13.5px] text-[var(--muted)] leading-[1.6] line-clamp-2">
              {stripHtml(i.desc)}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
