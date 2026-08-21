"use client";
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CtaSection from './CtaSection';
import FaqSection, { type FaqItem } from './FaqSection';
import Breadcrumbs from './Breadcrumbs';
import RichText from './RichText';
import type { TeamMember } from '@/lib/types';

gsap.registerPlugin(ScrollTrigger, useGSAP);
gsap.config({ nullTargetWarn: false });

function initials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('');
}

export default function TeamContent({
  team,
  faqs,
}: {
  team: TeamMember[];
  faqs: FaqItem[];
}) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!container.current) return;
    const cards = gsap.utils.toArray<HTMLElement>('.team-card', container.current);
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
  }, { scope: container, dependencies: [team] });

  return (
    <div ref={container}>
      <section className="relative px-[6vw] pt-[160px] pb-[60px] z-10">
        <Breadcrumbs items={[{ label: 'Team', href: '/team' }]} />
        <div className="mono text-[12px] text-[var(--muted)] mb-[20px]">Team</div>
        <h1 className="text-[clamp(36px,6vw,72px)] max-w-[20ch] font-[var(--font-display)] font-bold leading-[1]">
          The people building it.
        </h1>
        <p className="mt-[24px] max-w-[560px] text-[var(--muted)] text-[16px] leading-[1.7]">
          No bench of juniors you never meet — the engineers on this page are the ones actually writing your code.
        </p>
      </section>

      <section className="relative px-[6vw] pb-[100px] z-10">
        {team.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[20px]">
            {team.map((m) => (
              <div
                key={m.id}
                className="team-card rounded-[20px] border border-[var(--line)] bg-[var(--surface)] p-[24px] flex flex-col items-center text-center hover:border-[rgba(23,104,214,0.4)] hover:shadow-md transition-all"
              >
                {m.photoUrl ? (
                  <div className="relative w-[84px] h-[84px] rounded-full overflow-hidden border border-[var(--line)]">
                    {/* eslint-disable-next-line @next/next/no-img-element -- admin-supplied arbitrary URL, host unknown ahead of time */}
                    <img
                      src={m.photoUrl}
                      alt={m.name}
                      title={m.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="w-[84px] h-[84px] rounded-full bg-[var(--ink)] text-white flex items-center justify-center text-[22px] font-bold font-[var(--font-display)]">
                    {initials(m.name)}
                  </div>
                )}
                <div className="mt-[16px] text-[17px] font-bold text-[var(--ink)]">{m.name}</div>
                <div className="mt-[3px] text-[13px] text-[var(--accent)] font-semibold">{m.role}</div>
                {m.bio && (
                  <RichText html={m.bio} className="mt-[10px] text-[13.5px] text-[var(--muted)] leading-[1.6]" />
                )}
                {m.linkedinUrl && (
                  <a
                    href={m.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-[14px] inline-flex items-center gap-[6px] text-[12.5px] font-semibold text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                  >
                    LinkedIn →
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-[18px] border border-[var(--line)] bg-[var(--surface)] p-[32px] text-center text-[14px] text-[var(--muted)]">
            Team profiles are being added — check back shortly, or meet us directly on the contact page.
          </div>
        )}
      </section>

      <FaqSection heading="Team FAQ" items={faqs} />

      <CtaSection />
    </div>
  );
}
