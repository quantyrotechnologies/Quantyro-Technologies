"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CtaSection from './CtaSection';
import FaqSection, { type FaqItem } from './FaqSection';
import Breadcrumbs from './Breadcrumbs';
import type { Certification } from '@/lib/types';

gsap.registerPlugin(ScrollTrigger);
gsap.config({ nullTargetWarn: false });

export default function CertificationsContent({
  certifications,
  faqs,
}: {
  certifications: Certification[];
  faqs: FaqItem[];
}) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.cert-card');
      cards.forEach((card) => {
        gsap.fromTo(card,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 90%' },
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, [certifications]);

  return (
    <div ref={container}>
      <section className="relative px-[6vw] pt-[160px] pb-[60px] z-10">
        <Breadcrumbs items={[{ label: 'Certifications', href: '/certifications' }]} />
        <div className="mono text-[12px] text-[var(--muted)] mb-[20px]">Certifications</div>
        <h1 className="text-[clamp(36px,6vw,72px)] max-w-[20ch] font-[var(--font-display)] font-bold leading-[1]">
          Verifiable credentials, not just claims.
        </h1>
        <p className="mt-[24px] max-w-[560px] text-[var(--muted)] text-[16px] leading-[1.7]">
          Every certification here is independently verifiable — click through to the issuer to confirm it. We list these so you don&apos;t have to take our word for it.
        </p>
      </section>

      <section className="relative px-[6vw] pb-[100px] z-10">
        {certifications.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px]">
            {certifications.map((c) => {
              const Card = c.credentialUrl ? 'a' : 'div';
              return (
                <Card
                  key={c.id}
                  {...(c.credentialUrl ? { href: c.credentialUrl, target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="cert-card rounded-[18px] border border-[var(--line)] bg-[var(--surface)] p-[22px] hover:border-[rgba(23,104,214,0.4)] hover:shadow-md transition-all"
                >
                  <div className="text-[16px] font-bold text-[var(--ink)]">{c.title}</div>
                  <div className="mt-[6px] text-[13px] text-[var(--muted)] mono">{c.issuer}</div>
                  {c.issueDate && (
                    <div className="mt-[4px] text-[11.5px] text-slate-400 mono">
                      Issued {new Date(c.issueDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </div>
                  )}
                  {c.credentialUrl && (
                    <span className="mt-[14px] inline-flex items-center gap-[6px] text-[12.5px] font-semibold text-[var(--accent)]">
                      Verify credential →
                    </span>
                  )}
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="rounded-[18px] border border-[var(--line)] bg-[var(--surface)] p-[32px] text-center text-[14px] text-[var(--muted)]">
            Certifications are being added — check back shortly, or ask us directly on the contact page.
          </div>
        )}
      </section>

      <FaqSection heading="Certifications FAQ" items={faqs} />

      <CtaSection />
    </div>
  );
}
