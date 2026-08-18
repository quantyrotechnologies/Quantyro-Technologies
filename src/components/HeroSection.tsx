"use client";
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticLink from './MagneticLink';
import TechIntegrationHub from './TechIntegrationHub';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function HeroSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const heroWords = gsap.utils.toArray('.hero-title .word span');
    gsap.set(heroWords, { yPercent: 110 });

    gsap.timeline({ delay: 0.15 })
      .to(heroWords, { yPercent: 0, duration: 1.0, stagger: 0.04, ease: 'power4.out' })
      .from(['.eyebrow', '.hero-sub', '.hero-actions', '.hero-trust', '.hero-visual'], {
        opacity: 0, y: 20, duration: 0.7, stagger: 0.08, ease: 'power2.out'
      }, '-=0.6');

    // Stay crisp for the first quarter of the scroll, then fade out smoothly
    gsap.to(container.current, {
      scrollTrigger: {
        trigger: container.current,
        start: '35% top',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true
      },
      opacity: 0,
      y: -30
    });
  }, { scope: container });

  const title = "Fuel growth with unified systems";
  const renderTitle = () => {
    return title.split(' ').map((word, index, arr) => (
      <span key={index} className="word">
        <span className="inline-block will-change-transform">
          {word === 'unified' ? (
            <span className="text-[var(--accent)] font-bold drop-shadow-[0_0_24px_rgba(23,104,214,0.25)]">
              {word}
            </span>
          ) : (
            word
          )}
          {index < arr.length - 1 ? ' ' : ''}
        </span>
      </span>
    ));
  };

  return (
    <section 
      ref={container} 
      id="hero" 
      className="relative min-h-[92vh] lg:min-h-[100vh] flex flex-col justify-center px-[5vw] lg:px-[6vw] pt-[100px] pb-[40px] overflow-hidden z-10"
    >
      {/* Subtle soft gradient scrim */}
      <div 
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_70%_at_20%_45%,rgba(247,251,254,0.75)_0%,rgba(247,251,254,0.25)_65%,transparent_100%)]" 
        aria-hidden="true" 
      />

      {/* 2-Column Responsive Grid matching Reference Design */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[32px] lg:gap-[28px] items-center w-full max-w-[1360px] mx-auto">
        
        {/* LEFT COLUMN: Headline, copy, CTAs, and trust guarantees */}
        <div className="lg:col-span-6 flex flex-col justify-center max-w-[580px]">
          
          {/* Eyebrow Badge with 4-petal Quantum Icon */}
          <div className="eyebrow inline-flex items-center gap-[8px] text-[12.5px] text-[var(--muted)] mb-[14px] bg-white/90 px-[13px] py-[5px] rounded-full border border-[rgba(10,23,47,0.12)] w-fit shadow-xs">
            <svg width="15" height="15" viewBox="0 0 32 32" fill="none" className="shrink-0">
              <path d="M16 4C16 4 13 8 13 11C13 13.5 14.5 15 16 15C17.5 15 19 13.5 19 11C19 8 16 4 16 4Z" fill="#00B377" />
              <path d="M16 28C16 28 19 24 19 21C19 18.5 17.5 17 16 17C14.5 17 13 18.5 13 21C13 24 16 28 16 28Z" fill="#00B377" />
              <path d="M4 16C4 16 8 19 11 19C13.5 19 15 17.5 15 16C15 14.5 13.5 13 11 13C8 13 4 16 4 16Z" fill="#00B377" />
              <path d="M28 16C28 16 24 13 21 13C18.5 13 17 14.5 17 16C17 17.5 18.5 19 21 19C24 19 28 16 28 16Z" fill="#00B377" />
            </svg>
            <span className="font-medium text-[var(--ink)]">Data & integrations</span>
          </div>

          {/* Main Display Headline */}
          <h1 className="hero-title text-[clamp(32px,3.8vw,56px)] leading-[1.05] font-[var(--font-display)] font-bold tracking-[-0.025em] text-[var(--ink)]">
            {renderTitle()}
          </h1>

          {/* Subtitle */}
          <p className="hero-sub mt-[16px] text-[15px] md:text-[16px] text-[var(--muted)] leading-[1.6] max-w-[520px]">
            Great engineering starts with unified architecture. Quantyro helps you unify, build, and scale customer data, powering AI-driven automation and robust digital products across every channel.
          </p>

          {/* Dual Action Buttons */}
          <div className="hero-actions mt-[24px] flex gap-[14px] items-center flex-wrap">
            {/* [PHASE-3] Get Started CTA with Radiant Border-Beam Laser */}
            <div className="border-beam-container">
              <div className="border-beam-laser" />
              <MagneticLink 
                href="/contact" 
                className="relative z-10 bg-[#0B2922] text-[#00FFB2] hover:bg-[#041410] hover:text-[#FFFFFF] py-[12px] px-[26px] rounded-full text-[14px] font-semibold transition-all duration-300 flex items-center gap-[7px]"
              >
                <span>Get started</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </MagneticLink>
            </div>

            <MagneticLink 
              href="/services" 
              className="bg-transparent text-[var(--ink)] hover:text-[var(--accent)] py-[12px] px-[22px] rounded-full text-[14px] font-semibold border-2 border-[var(--ink)] hover:border-[var(--accent)] transition-all duration-300"
            >
              Book a demo
            </MagneticLink>
          </div>

          {/* [PHASE-5] Enterprise Social Proof & Rating Badge */}
          <div className="hero-trust mt-[20px] flex flex-col sm:flex-row sm:items-center gap-[12px] sm:gap-[16px] text-[12px] text-[var(--muted)]">
            {/* Avatar Stack + Rating */}
            <div className="flex items-center gap-[8px]">
              <div className="flex -space-x-[7px] items-center">
                <div className="w-[24px] h-[24px] rounded-full bg-[#FF671F] text-white border-2 border-white flex items-center justify-center text-[9px] font-bold shadow-xs">
                  IN
                </div>
                <div className="w-[24px] h-[24px] rounded-full bg-[#0B2922] text-[#00FFB2] border-2 border-white flex items-center justify-center text-[9px] font-bold shadow-xs">
                  US
                </div>
                <div className="w-[24px] h-[24px] rounded-full bg-[#1768D6] text-white border-2 border-white flex items-center justify-center text-[9px] font-bold shadow-xs">
                  EU
                </div>
                <div className="w-[24px] h-[24px] rounded-full bg-[#0A172F] text-[#00FFB2] border-2 border-white flex items-center justify-center text-[9px] font-bold shadow-xs">
                  UK
                </div>
                <div className="w-[24px] h-[24px] rounded-full bg-[#00B377] text-white border-2 border-white flex items-center justify-center text-[8.5px] font-bold shadow-xs">
                  +80
                </div>
              </div>

              <div className="flex items-center gap-[4px]">
                <span className="text-[#FFB800] text-[11px] tracking-tighter">★★★★★</span>
                <span className="font-semibold text-[var(--ink)] text-[12px]">4.9/5</span>
                <span className="text-slate-300">·</span>
                <span className="text-[11.5px] text-slate-500">80+ Global Enterprises</span>
              </div>
            </div>

            <span className="hidden sm:inline text-slate-300">|</span>

            {/* Quick Trust Checks */}
            <div className="flex items-center gap-[14px] text-[11.5px]">
              <div className="flex items-center gap-[4px]">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00B377" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <span>No lock-in</span>
              </div>
              <div className="flex items-center gap-[4px]">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00B377" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <span>99.999% SLA</span>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Interactive 3D Concentric Integration Hub Visual */}
        <div className="hero-visual lg:col-span-6 flex items-center justify-center relative">
          <TechIntegrationHub />
        </div>

      </div>

      {/* Centered subtle scroll cue */}
      <div className="scroll-cue absolute bottom-[14px] left-0 right-0 flex flex-col items-center gap-[4px] text-[10.5px] text-[var(--muted)] pointer-events-none z-10">
        <span className="line"></span> Scroll
      </div>
    </section>
  );
}
