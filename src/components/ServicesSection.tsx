"use client";
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ServiceVisual, { type ServiceVisualKind } from './ServiceVisual';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ServiceCardItem {
  num: string;
  tag: string;
  title: string;
  desc: string;
  alt: boolean;
  visual: ServiceVisualKind;
}

const SERVICES_LIST: ServiceCardItem[] = [
  { 
    num: '01', 
    tag: 'Custom Software',
    title: 'Custom Software', 
    desc: 'Applications engineered around how your business actually works, not around a generic template.',
    alt: false, 
    visual: 'software' 
  },
  { 
    num: '02', 
    tag: 'AI & Machine Learning',
    title: 'AI & Machine Learning', 
    desc: 'Production-grade AI features — retrieval, autonomous agents and automation — not proof-of-concept demos.',
    alt: true, 
    visual: 'ai' 
  },
  { 
    num: '03', 
    tag: 'Cloud & DevOps',
    title: 'Cloud & DevOps', 
    desc: 'Scalable infrastructure, CI/CD pipelines and 24/7 reliability built to survive real enterprise traffic.',
    alt: false, 
    visual: 'cloud' 
  },
  { 
    num: '04', 
    tag: 'Mobile Apps',
    title: 'Mobile Apps', 
    desc: 'Native and cross-platform apps for iOS and Android that feel fluid, responsive, and fast from day one.',
    alt: true, 
    visual: 'mobile' 
  },
  { 
    num: '05', 
    tag: 'E-Commerce',
    title: 'E-Commerce', 
    desc: 'High-converting storefronts and headless commerce architectures built for scale and sub-second speed.',
    alt: false, 
    visual: 'commerce' 
  },
];

export default function ServicesSection() {
  const container = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const track = trackRef.current;
    if (!track) return;

    gsap.from('.services-heading > *', {
      opacity: 0,
      y: 24,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container.current,
        start: 'top 80%',
      },
    });

    const panels = gsap.utils.toArray<HTMLElement>('.service-panel-card', track);
    const matchMedia = gsap.matchMedia();
    
    matchMedia.add("(min-width: 821px)", () => {
      const getDistance = () => track.scrollWidth - window.innerWidth + window.innerWidth * 0.06;
      
      gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: () => '+=' + (getDistance() + window.innerHeight * 0.8),
          scrub: 0.8,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate: () => {
            const centerX = window.innerWidth / 2;
            panels.forEach((p) => {
              const r = p.getBoundingClientRect();
              const dist = Math.abs((r.left + r.width / 2) - centerX);
              if (dist < r.width * 0.55) {
                p.classList.add('is-center-active');
              } else {
                p.classList.remove('is-center-active');
              }
            });
          }
        }
      });
    });

    return () => matchMedia.revert();
  }, { scope: container });

  return (
    <section ref={container} id="services-wrapper" className="relative h-auto md:h-[100vh] overflow-hidden z-10 flex flex-col justify-center">
      
      {/* Heading */}
      <div className="services-heading shrink-0 px-[6vw] pt-[60px] md:pt-[30px] pb-[16px] flex flex-col md:flex-row md:items-end justify-between gap-[16px]">
        <div>
          <div className="inline-flex items-center gap-[6px] px-[12px] py-[3.5px] rounded-full bg-[rgba(23,104,214,0.07)] border border-[rgba(23,104,214,0.2)] text-[var(--accent)] text-[11px] font-mono font-semibold uppercase mb-[8px]">
            <span className="w-[6px] h-[6px] rounded-full bg-[var(--accent)] animate-pulse" />
            <span>02 // What we build</span>
          </div>
          <h2 className="text-[clamp(26px,3.6vw,44px)] font-[var(--font-display)] font-bold leading-[1.1] text-[var(--ink)]">
            Full-stack expertise,{' '}
            <span className="text-[var(--accent)]">end to end</span>.
          </h2>
        </div>

        <a 
          href="/services" 
          className="inline-flex items-center gap-[6px] text-[13.5px] font-semibold text-[var(--muted)] hover:text-[var(--accent)] transition-colors group"
        >
          <span>See all services</span>
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </a>
      </div>

      {/* Horizontal Cards Track */}
      <div 
        ref={trackRef} 
        id="h-track" 
        className="flex items-center pl-[6vw] flex-1 min-h-0 will-change-transform max-md:overflow-x-auto max-md:pb-[60px] py-[20px]"
      >
        {SERVICES_LIST.map((s, i) => (
          <div
            key={i}
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
              e.currentTarget.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
            }}
            className="service-panel-card panel-glow flex-none w-[min(76vw,540px)] h-[min(62vh,480px)] mr-[3vw] rounded-[28px] bg-white border border-[rgba(10,23,47,0.07)] shadow-[0_8px_30px_rgba(10,23,47,0.07)] hover:border-[rgba(23,104,214,0.4)] hover:shadow-[0_16px_50px_rgba(23,104,214,0.14)] hover:-translate-y-2 p-[32px] md:p-[40px] flex flex-col justify-between relative overflow-hidden transition-all duration-400 ease-out group"
          >
            {/* Ambient blue radial glow behind visual */}
            <div 
              className="absolute w-[260px] h-[260px] rounded-full opacity-[0.18] top-[20%] left-[50%] -translate-x-1/2 blur-[45px] pointer-events-none transition-opacity duration-500 group-hover:opacity-35"
              style={{ background: `radial-gradient(circle, rgba(23,104,214,0.9) 0%, rgba(14,188,212,0.4) 50%, transparent 70%)` }}
            />

            {/* Top Header */}
            <div className="flex items-center justify-between relative z-10">
              <span className="text-[13px] font-mono font-bold text-[var(--accent)]">
                {s.num} // {s.tag}
              </span>
              <span className="w-[8px] h-[8px] rounded-full bg-[var(--accent)] opacity-40 group-hover:opacity-100 group-hover:animate-ping transition-opacity" />
            </div>

            {/* 3D Visual */}
            <div className="relative flex-1 min-h-0 flex items-center justify-center py-[10px] z-10 transition-transform duration-500 group-hover:scale-105">
              <ServiceVisual kind={s.visual} />
            </div>

            {/* Text Footer */}
            <div className="relative z-10 pt-[10px]">
              <h3 className="text-[clamp(22px,2.4vw,28px)] mb-[8px] font-[var(--font-display)] font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
                {s.title}
              </h3>
              <p className="text-[var(--muted)] text-[14.5px] leading-[1.6] max-w-[42ch]">
                {s.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
