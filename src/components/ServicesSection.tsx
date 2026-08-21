"use client";
import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { tiltOnMouseMove, tiltOnMouseLeave } from '@/hooks/tilt';
import { serviceIllustration } from '@/lib/serviceIllustration';
import { stripHtml } from '@/lib/stripHtml';
import type { Service } from '@/lib/types';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ServicesSection({ services }: { services: Service[] }) {
  const container = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const track = trackRef.current;
    if (!track) return;

    gsap.fromTo('.services-heading > *',
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 80%',
        },
      }
    );

    const matchMedia = gsap.matchMedia();

    matchMedia.add('(min-width: 821px)', () => {
      const getDistance = () => track.scrollWidth - window.innerWidth + window.innerWidth * 0.06;

      gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: () => '+=' + (getDistance() + window.innerHeight * 0.6),
          scrub: 0.8,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => matchMedia.revert();
  }, { scope: container });

  return (
    <section ref={container} id="services-wrapper" className="relative h-auto md:h-[100vh] overflow-hidden z-10 flex flex-col justify-center">

      {/* Heading */}
      <div className="services-heading shrink-0 px-[6vw] pt-[110px] md:pt-[130px] pb-[16px] flex flex-col md:flex-row md:items-end justify-between gap-[16px]">
        <div>
          <div className="inline-flex items-center gap-[6px] px-[12px] py-[3.5px] rounded-full bg-[rgba(23,104,214,0.07)] border border-[rgba(23,104,214,0.2)] text-[var(--accent)] text-[11px] font-mono font-semibold uppercase mb-[8px]">
            <span className="w-[6px] h-[6px] rounded-full bg-[var(--accent)]" />
            <span className="before:content-['01_//_']">What we do</span>
          </div>
          <h2 className="text-[clamp(26px,3.6vw,44px)] font-[var(--font-display)] font-bold leading-[1.1] text-[var(--ink)]">
            Seven services,{' '}
            <span className="text-[var(--accent)]">one senior team</span>.
          </h2>
          <p className="mt-[10px] max-w-[52ch] text-[14.5px] text-[var(--muted)] leading-[1.6]">
            This is the order we actually run projects in — not a menu, a sequence. Each service links to what it includes.
          </p>
        </div>

        <Link
          href="/services"
          className="inline-flex items-center gap-[6px] text-[13.5px] font-semibold text-[var(--muted)] hover:text-[var(--accent)] transition-colors group shrink-0"
        >
          <span>See all services</span>
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </Link>
      </div>

      {/* Horizontal Cards Track */}
      <div
        ref={trackRef}
        id="services-track"
        className="flex items-stretch pl-[6vw] flex-1 min-h-0 will-change-transform max-md:overflow-x-auto max-md:pb-[60px] py-[20px]"
      >
        {services.map((s) => (
          <Link
            key={s.num}
            href={`/services/${s.slug}`}
            onMouseMove={(e) => tiltOnMouseMove(e, 5)}
            onMouseLeave={tiltOnMouseLeave}
            className="service-panel-card group flex-none w-[min(78vw,360px)] h-auto mr-[3vw] rounded-[22px] bg-white border border-[rgba(10,23,47,0.16)] shadow-[0_8px_30px_rgba(10,23,47,0.06)] hover:border-[rgba(23,104,214,0.4)] hover:shadow-[0_16px_50px_rgba(23,104,214,0.14)] p-[26px] md:p-[28px] flex flex-col overflow-hidden transition-shadow duration-300 ease-out"
            style={{ transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s, border-color 0.3s' }}
          >
            <div className="relative h-[150px] shrink-0 rounded-[14px] overflow-hidden bg-[var(--bg-alt)]">
              <Image
                src={serviceIllustration(s.slug)}
                alt={`${s.title} services by Quantyro Technologies`}
                title={s.title}
                fill
                sizes="360px"
                className="object-cover"
              />
            </div>

            <h3 className="mt-[16px] text-[21px] md:text-[22px] font-[var(--font-display)] font-bold text-[var(--ink)]">
              {s.title}
            </h3>
            <p className="mt-[8px] text-[14px] text-[var(--muted)] leading-[1.6] line-clamp-2">
              {stripHtml(s.desc)}
            </p>

            <div className="mt-auto pt-[20px] flex flex-col gap-[8px]">
              {s.capabilities.slice(0, 3).map((c) => (
                <div key={c} className="flex items-center gap-[8px] text-[11px] font-mono uppercase tracking-tight text-slate-500">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
