"use client";
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StatsSection from './StatsSection';
import CtaSection from './CtaSection';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// TODO: replace with real office locations before launch.
const OFFICES = [
  { city: 'Toronto', region: 'North America' },
  { city: 'Lisbon', region: 'Europe' },
  { city: 'Bengaluru', region: 'South Asia' },
  { city: 'Singapore', region: 'APAC' },
];

const VALUES = [
  { title: 'Senior by default', desc: 'Every engagement is staffed with engineers who have shipped this kind of work before.' },
  { title: 'Outcomes over output', desc: 'We measure success in business results, not story points closed.' },
  { title: 'Radical transparency', desc: 'Weekly demos and open access to the backlog — no black box until launch day.' },
  { title: 'Built to last', desc: 'Code we would be comfortable maintaining ourselves, five years from now.' },
];

export default function AboutContent() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>('.value-card, .office-chip').forEach((el, i) => {
      gsap.from(el, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: i * 0.03,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
        },
      });
    });
  }, { scope: container });

  return (
    <div ref={container}>
      <section className="relative px-[6vw] pt-[160px] pb-[60px] z-10">
        <div className="mono text-[12px] text-[var(--muted)] mb-[20px]">About</div>
        <h1 className="text-[clamp(36px,6vw,72px)] max-w-[18ch] font-[var(--font-display)] font-bold leading-[1]">
          Engineering the future, one idea at a time.
        </h1>
        <p className="mt-[24px] max-w-[620px] text-[var(--muted)] text-[16px] leading-[1.7]">
          Quantyro Technologies started with a simple frustration: too many software partners ship features without understanding the business behind them. We do not ship for the sake of a roadmap — every sprint ties back to a business outcome, built by senior engineers who have shipped this before, not learned it on your product.
        </p>
      </section>

      <section className="relative px-[6vw] pb-[100px] z-10">
        <div className="mono text-[12px] text-[var(--muted)] mb-[24px]">Our values</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
          {VALUES.map((v) => (
            <div key={v.title} className="value-card rounded-[22px] bg-[var(--surface)] border border-[var(--line)] p-[32px]">
              <h3 className="text-[20px] font-[var(--font-display)] font-bold">{v.title}</h3>
              <p className="mt-[10px] text-[var(--muted)] text-[15px] leading-[1.6]">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative px-[6vw] pb-[100px] z-10">
        <div className="mono text-[12px] text-[var(--muted)] mb-[24px]">Where we work from</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[16px]">
          {OFFICES.map((o) => (
            <div key={o.city} className="office-chip rounded-[14px] border border-[var(--line)] bg-[var(--surface)] px-[18px] py-[20px] text-center">
              <div className="text-[16px] font-[var(--font-display)] font-bold text-[var(--ink)]">{o.city}</div>
              <div className="mt-[4px] text-[12px] text-[var(--muted)] mono">{o.region}</div>
            </div>
          ))}
        </div>
      </section>

      <StatsSection />
      <CtaSection />
    </div>
  );
}
