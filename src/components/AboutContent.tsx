"use client";
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StatsSection from './StatsSection';
import CtaSection from './CtaSection';
import FaqSection, { type FaqItem } from './FaqSection';
import { tiltOnMouseMove, tiltOnMouseLeave } from '@/hooks/tilt';
import type { Certification, Value, Office, Stat } from '@/lib/types';
import Breadcrumbs from './Breadcrumbs';

gsap.registerPlugin(ScrollTrigger, useGSAP);
gsap.config({ nullTargetWarn: false });

export default function AboutContent({
  certifications,
  faqs,
  values,
  offices,
  stats,
}: {
  certifications: Certification[];
  faqs: FaqItem[];
  values: Value[];
  offices: Office[];
  stats: Stat[];
}) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!container.current) return;
    const cards = gsap.utils.toArray<HTMLElement>('.value-card, .office-chip', container.current);
    cards.forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: i * 0.03,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
          },
        }
      );
    });
  }, { scope: container, dependencies: [values, offices] });

  return (
    <div ref={container}>
      <section className="relative px-[6vw] pt-[160px] pb-[60px] z-10">
        <Breadcrumbs items={[{ label: 'About', href: '/about' }]} />
        <div className="mono text-[12px] text-[var(--muted)] mb-[20px]">About</div>
        <h1 className="text-[clamp(36px,6vw,72px)] max-w-[18ch] font-[var(--font-display)] font-bold leading-[1]">
          Engineering the future, one idea at a time.
        </h1>
        <p className="mt-[24px] max-w-[620px] text-[var(--muted)] text-[16px] leading-[1.7]">
          Quantyro Technologies started with a simple frustration: too many software partners ship features without understanding the business behind them. We do not ship for the sake of a roadmap — every sprint ties back to a business outcome, built by senior engineers who have shipped this before, not learned it on your product.
        </p>
      </section>

      <section className="relative px-[6vw] pb-[100px] z-10">
        <h2 className="text-[13px] font-mono font-semibold uppercase tracking-wide text-[var(--muted)] mb-[24px]">Our values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
          {values.map((v) => (
            <div
              key={v.id}
              onMouseMove={(e) => tiltOnMouseMove(e, 4)}
              onMouseLeave={tiltOnMouseLeave}
              className="value-card rounded-[22px] bg-[var(--surface)] border border-[var(--line)] p-[32px] hover:border-[rgba(23,104,214,0.3)]"
              style={{ transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.3s' }}
            >
              <h3 className="text-[20px] font-[var(--font-display)] font-bold">{v.title}</h3>
              <p className="mt-[10px] text-[var(--muted)] text-[15px] leading-[1.6]">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative px-[6vw] pb-[100px] z-10">
        <h2 className="text-[13px] font-mono font-semibold uppercase tracking-wide text-[var(--muted)] mb-[24px]">Where we work from</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[16px]">
          {offices.map((o) => (
            <div key={o.id} className="office-chip rounded-[14px] border border-[var(--line)] bg-[var(--surface)] overflow-hidden text-center">
              {o.photoUrl && (
                // eslint-disable-next-line @next/next/no-img-element -- admin-supplied arbitrary URL, host unknown ahead of time
                <img
                  src={o.photoUrl}
                  alt={`Quantyro Technologies office in ${o.city}`}
                  title={`${o.city} office`}
                  className="h-[90px] w-full object-cover"
                  loading="lazy"
                />
              )}
              <div className="px-[18px] py-[20px]">
                <h3 className="text-[16px] font-[var(--font-display)] font-bold text-[var(--ink)]">{o.city}</h3>
                <div className="mt-[4px] text-[12px] text-[var(--muted)] mono">{o.region}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {certifications.length > 0 && (
        <section className="relative px-[6vw] pb-[100px] z-10">
          <h2 className="text-[13px] font-mono font-semibold uppercase tracking-wide text-[var(--muted)] mb-[24px]">
            Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px]">
            {certifications.map((c) => {
              const Card = c.credentialUrl ? 'a' : 'div';
              return (
                <Card
                  key={c.id}
                  {...(c.credentialUrl ? { href: c.credentialUrl, target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="rounded-[14px] border border-[var(--line)] bg-[var(--surface)] p-[18px] hover:border-[rgba(23,104,214,0.3)] transition-colors"
                >
                  <div className="text-[14.5px] font-semibold text-[var(--ink)]">{c.title}</div>
                  <div className="mt-[4px] text-[12px] text-[var(--muted)] mono">{c.issuer}</div>
                  {c.issueDate && (
                    <div className="mt-[2px] text-[11px] text-slate-400 mono">
                      {new Date(c.issueDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </section>
      )}

      <FaqSection heading="About FAQ" items={faqs} />

      <StatsSection stats={stats} />
      <CtaSection />
    </div>
  );
}
