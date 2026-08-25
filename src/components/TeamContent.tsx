"use client";
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CtaSection from './CtaSection';
import FaqSection, { type FaqItem } from './FaqSection';
import Breadcrumbs from './Breadcrumbs';
import RichText from './RichText';
import type { TeamMember } from '@/lib/types';

gsap.registerPlugin(ScrollTrigger);
gsap.config({ nullTargetWarn: false });

export default function TeamContent({
  team,
  faqs,
}: {
  team: TeamMember[];
  faqs: FaqItem[];
}) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.team-card');
      cards.forEach((card) => {
        gsap.fromTo(card,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 96%', once: true },
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, [team]);

  return (
    <div ref={container} className="bg-white">
      {/* Hero Header */}
      <section className="relative px-[6vw] pt-[150px] pb-[50px] z-10 max-w-[1280px] mx-auto">
        <Breadcrumbs items={[{ label: 'Team', href: '/team' }]} />
        <div className="inline-flex items-center gap-[6px] px-[12px] py-[3.5px] rounded-full bg-[rgba(23,104,214,0.08)] border border-[rgba(23,104,214,0.2)] text-[var(--accent)] text-[11px] font-mono font-semibold uppercase mb-[12px]">
          <span className="w-[5px] h-[5px] rounded-full bg-[var(--accent)]" />
          <span>Senior Engineers &amp; Technical Architects</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-[24px]">
          <div>
            <h1 className="text-[clamp(32px,5vw,60px)] font-[var(--font-display)] font-extrabold leading-[1.08] text-[var(--ink)] tracking-tight">
              The engineers building your systems.
            </h1>
          </div>
          <p className="max-w-[460px] text-[var(--muted)] text-[15.5px] leading-[1.65]">
            No middle managers or outsourced junior benches. You collaborate directly with principal architects and full-stack engineers who own your product from day one.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="relative px-[6vw] pb-[100px] z-10 max-w-[1280px] mx-auto">
        {team.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[28px]">
            {team.map((m) => (
              <div
                key={m.id}
                className="team-card group flex flex-col justify-between rounded-[26px] bg-[var(--surface)] border border-[rgba(10,23,47,0.12)] p-[28px] hover:border-[rgba(23,104,214,0.4)] hover:shadow-[0_24px_50px_rgba(23,104,214,0.12)] hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden"
              >
                <div>
                  {/* Top Profile Header */}
                  <div className="flex items-start gap-[18px]">
                    <div className="relative w-[84px] h-[84px] rounded-[20px] overflow-hidden bg-slate-900 border-2 border-white shadow-md shrink-0">
                      {m.photoUrl ? (
                        <Image
                          src={m.photoUrl}
                          alt={m.name}
                          title={m.name}
                          fill
                          sizes="84px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#0A1324] text-white font-bold text-[22px] font-mono">
                          {m.name.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-[6px]">
                        <span className="w-[6px] h-[6px] rounded-full bg-emerald-500 animate-pulse" />
                        <span className="mono text-[10.5px] font-bold uppercase tracking-wider text-emerald-600">
                          {m.experience || 'Production Squad'}
                        </span>
                      </div>
                      <h3 className="text-[20px] font-[var(--font-display)] font-bold text-[var(--ink)] leading-[1.2] mt-[3px]">
                        {m.name}
                      </h3>
                      <div className="text-[13px] font-semibold text-[var(--accent)] mt-[2px]">
                        {m.role}
                      </div>
                    </div>
                  </div>

                  {/* Bio Paragraph (Uniform Height) */}
                  {m.bio && (
                    <div className="mt-[18px] text-[13.5px] text-[var(--muted)] leading-[1.65] min-h-[75px]">
                      <RichText html={m.bio} />
                    </div>
                  )}

                  {/* Tech Stack / Skill Badges (Uniform Height) */}
                  {m.skills && m.skills.length > 0 && (
                    <div className="mt-[20px] min-h-[85px]">
                      <div className="mono text-[10.5px] font-semibold text-[var(--muted)] uppercase tracking-wider mb-[8px]">
                        Core Proficiencies
                      </div>
                      <div className="flex flex-wrap gap-[6px]">
                        {m.skills.map((s) => (
                          <span
                            key={s}
                            className="mono text-[11px] font-medium px-[10px] py-[3.5px] rounded-lg bg-white border border-[var(--line)] text-slate-700 shadow-xs"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Footer Actions */}
                <div className="mt-[24px] pt-[16px] border-t border-[var(--line)] flex items-center justify-between">
                  <span className="mono text-[11px] font-semibold text-slate-500 flex items-center gap-[5px]">
                    <span className="w-[5px] h-[5px] rounded-full bg-[var(--accent)]" />
                    <span>Quantyro Core Squad</span>
                  </span>

                  <Link
                    href="/contact"
                    className="mono text-[11.5px] font-bold px-[14px] py-[5.5px] rounded-full bg-blue-50 text-[var(--accent)] border border-blue-100/90 hover:bg-[var(--accent)] hover:text-white transition-all shadow-xs"
                  >
                    Start Sprint →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-[18px] border border-[var(--line)] bg-[var(--surface)] p-[32px] text-center text-[14px] text-[var(--muted)]">
            Team profiles are being synchronized with production registry.
          </div>
        )}
      </section>

      <FaqSection heading="Team &amp; Delivery FAQ" items={faqs} />
      <CtaSection />
    </div>
  );
}
