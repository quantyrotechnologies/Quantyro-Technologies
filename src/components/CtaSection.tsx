"use client";
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticLink from './MagneticLink';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function CtaSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ctaWords = gsap.utils.toArray('.cta-title .word span');
    gsap.set(ctaWords, { yPercent: 100 });
    
    gsap.to(ctaWords, {
      yPercent: 0,
      duration: 1,
      stagger: 0.06,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: container.current,
        start: 'top 75%',
        invalidateOnRefresh: true
      }
    });

    gsap.from('.cta-sub, .cta-actions', {
      opacity: 0,
      y: 20,
      duration: 0.7,
      stagger: 0.1,
      scrollTrigger: {
        trigger: container.current,
        start: 'top 60%',
        invalidateOnRefresh: true
      }
    });
  }, { scope: container });

  const renderTitle = (text: string) => {
    return text.split(' ').map((word, index, arr) => (
      <span key={index} className="word">
        <span className="inline-block will-change-transform">
          {word}{index < arr.length - 1 ? '\u00A0' : ''}
        </span>
      </span>
    ));
  };

  return (
    <section ref={container} id="cta" className="relative py-[80px] md:py-[100px] flex flex-col justify-center items-center text-center px-[6vw] z-10">
      
      {/* Clean white card with blue accent */}
      <div className="max-w-[900px] w-full bg-[var(--accent)] py-[64px] px-[24px] md:px-[72px] rounded-3xl relative overflow-hidden shadow-[0_24px_80px_rgba(23,104,214,0.35)]">
        
        {/* Background pattern — subtle dots */}
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1.5px, transparent 1.5px)',
            backgroundSize: '28px 28px',
          }}
        />
        {/* Radial glow overlay */}
        <div className="absolute -top-[80px] left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.18),transparent_70%)] pointer-events-none blur-[40px]" />

        {/* Badge */}
        <div className="relative z-10 mono text-[11.5px] text-white/75 font-semibold mb-[20px] bg-white/10 px-[14px] py-[5px] rounded-full inline-block border border-white/20">
          05 / Next Steps · Direct Access to Senior Engineers
        </div>

        {/* Heading */}
        <h2 className="relative z-10 cta-title text-[clamp(38px,7vw,96px)] font-[var(--font-display)] font-bold leading-[0.98] text-white">
          {renderTitle("Let's build")}
          <br />
          {renderTitle("something great.")}
        </h2>

        {/* Subtext */}
        <p className="cta-sub relative z-10 mt-[24px] max-w-[480px] mx-auto text-white/75 text-[16px] leading-[1.6]">
          Tell us about your technical roadmap — we reply with architecture insights within one business day, every time.
        </p>

        {/* Actions */}
        <div className="cta-actions relative z-10 mt-[38px] flex gap-[16px] justify-center items-center flex-wrap">
          <MagneticLink
            href="/contact"
            className="bg-white text-[var(--accent)] py-[14px] px-[32px] rounded-full text-[14px] font-bold hover:bg-white/90 transition-all duration-300 shadow-md hover:shadow-xl"
          >
            Start a project
          </MagneticLink>
          <MagneticLink
            href="/work"
            className="py-[14px] px-[28px] text-[14px] font-semibold text-white border-2 border-white/30 hover:border-white/70 rounded-full hover:bg-white/10 transition-all duration-300"
          >
            See case studies →
          </MagneticLink>
        </div>
      </div>
    </section>
  );
}
