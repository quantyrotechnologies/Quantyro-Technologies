"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticLink from './MagneticLink';
import TechIntegrationHub from './TechIntegrationHub';

gsap.registerPlugin(ScrollTrigger);
gsap.config({ nullTargetWarn: false });

export default function HeroSection() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    const ctx = gsap.context(() => {
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

      // On mobile devices, do not hide the H1 headline words offscreen with yPercent: 110.
      // This allows the browser to paint the LCP text immediately during initial render (<1s).
      if (!isMobile) {
        const heroWords = gsap.utils.toArray<HTMLElement>('.hero-title .word span');
        if (heroWords.length > 0) {
          gsap.set(heroWords, { yPercent: 110 });
        }

        const subTargets = gsap.utils.toArray<HTMLElement>('.eyebrow, .hero-actions, .hero-visual');

        if (heroWords.length > 0 || subTargets.length > 0) {
          const tl = gsap.timeline({ delay: 0.1 });
          if (heroWords.length > 0) {
            tl.to(heroWords, { yPercent: 0, duration: 0.9, stagger: 0.03, ease: 'power4.out' });
          }
          if (subTargets.length > 0) {
            tl.from(subTargets, {
              opacity: 0, y: 16, duration: 0.6, stagger: 0.06, ease: 'power2.out'
            }, '-=0.5');
          }
        }
      }

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
    }, container);

    return () => ctx.revert();
  }, []);

  const title = "Engineering scalable software, cloud & AI systems";
  const renderTitle = () => {
    return title.split(' ').map((word, index, arr) => (
      <span key={index} className="word">
        <span className="inline-block will-change-transform">
          {word.toLowerCase() === 'scalable' || word.toLowerCase() === 'software,' ? (
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
      className="relative min-h-[92vh] lg:min-h-[100vh] flex flex-col justify-center px-[5vw] lg:px-[6vw] pt-[120px] md:pt-[130px] pb-[48px] overflow-hidden z-10"
    >
      {/* Subtle soft gradient scrim */}
      <div 
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_70%_at_20%_45%,rgba(247,251,254,0.75)_0%,rgba(247,251,254,0.25)_65%,transparent_100%)]" 
        aria-hidden="true" 
      />

      {/* 2-Column Responsive Grid matching Reference Design */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[40px] lg:gap-[28px] items-center w-full max-w-[1360px] mx-auto">
        
        {/* LEFT COLUMN: Headline, copy, CTAs, and trust guarantees */}
        <div className="lg:col-span-6 flex flex-col justify-center max-w-[600px]">
          
          {/* Eyebrow Badge with Active Pulse */}
          <div className="eyebrow inline-flex items-center gap-[8px] text-[12px] md:text-[12.5px] text-slate-700 mb-[16px] bg-white/90 px-[13px] py-[5px] rounded-full border border-[rgba(10,23,47,0.12)] w-fit shadow-xs">
            <span className="w-[7px] h-[7px] rounded-full bg-[#00E599] animate-pulse" />
            <span className="font-semibold text-[var(--ink)]">Enterprise Software, Cloud & AI Engineering</span>
          </div>

          {/* Main Display Headline */}
          <h1 className="hero-title text-[clamp(32px,4vw,56px)] leading-[1.08] font-[var(--font-display)] font-bold tracking-[-0.025em] text-[var(--ink)]">
            {renderTitle()}
          </h1>

          {/* Subtitle */}
          <p className="hero-sub mt-[16px] text-[15px] md:text-[16.5px] text-slate-700 leading-[1.65] max-w-[540px]">
            Quantyro partners with ambitious founders and enterprise engineering teams to design, build, and scale mission-critical web platforms, mobile apps, and autonomous AI systems — backed by dedicated senior engineers, guaranteed SLAs, and 100% IP ownership.
          </p>

          {/* Dual Action Buttons */}
          <div className="hero-actions mt-[24px] flex gap-[14px] items-center flex-wrap">
            {/* Get Started CTA with Radiant Border-Beam */}
            <div className="border-beam-container">
              <div className="border-beam-laser" />
              <MagneticLink 
                href="/contact" 
                className="relative z-10 bg-[#0B2922] text-[#00FFB2] hover:bg-[#041410] hover:text-[#FFFFFF] py-[12px] px-[26px] rounded-full text-[14px] font-semibold transition-all duration-300 inline-flex items-center gap-[7px] shadow-sm"
              >
                <span>Start a Project</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </MagneticLink>
            </div>

            <MagneticLink 
              href="/services" 
              className="inline-block bg-transparent text-[var(--ink)] hover:text-[var(--accent)] py-[12px] px-[22px] rounded-full text-[14px] font-semibold border-2 border-[var(--ink)] hover:border-[var(--accent)] transition-all duration-300"
            >
              Explore Capabilities
            </MagneticLink>
          </div>

          {/* Enterprise Trust Guarantees */}
          <div className="hero-trust mt-[28px] pt-[20px] border-t border-[rgba(10,23,47,0.08)] flex flex-wrap items-center gap-x-[18px] gap-y-[8px] text-[12px] md:text-[12.5px] font-medium text-slate-700">
            <div className="flex items-center gap-[6px]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00B377" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              <span>100% IP Ownership</span>
            </div>
            <div className="flex items-center gap-[6px]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00B377" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              <span>Dedicated Senior Engineers</span>
            </div>
            <div className="flex items-center gap-[6px]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00B377" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              <span>99.99% Availability SLAs</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Interactive 3D Concentric Integration Hub Visual */}
        <div className="hero-visual lg:col-span-6 flex items-center justify-center relative">
          <TechIntegrationHub />
        </div>

      </div>

      {/* Centered subtle scroll cue */}
      <div className="scroll-cue absolute bottom-[14px] left-0 right-0 flex flex-col items-center gap-[4px] text-[10.5px] text-slate-600 pointer-events-none z-10">
        <span className="line"></span> Scroll
      </div>
    </section>
  );
}
