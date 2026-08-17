"use client";
import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ProcessSection() {
  const container = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { tag: 'Discover', title: 'We map the real problem first.', desc: 'Goals, users and constraints, understood before a single line of code gets written.' },
    { tag: 'Design', title: 'Prototypes, validated with real users.', desc: 'Wireframes and flows tested against actual behaviour, not just stakeholder opinion.' },
    { tag: 'Build', title: 'Iterative sprints, weekly demos.', desc: 'You see real, working progress every week — never a black box until launch day.' },
    { tag: 'Launch', title: 'Staged rollouts, real monitoring.', desc: 'A launch runbook your team can actually use, with monitoring from day one.' },
    { tag: 'Grow', title: 'Iteration driven by real usage.', desc: 'Post-launch decisions made from data, not guesswork about what users want next.' },
  ];

  useGSAP(() => {
    const matchMedia = gsap.matchMedia();
    
    matchMedia.add("(min-width: 601px)", () => {
      ScrollTrigger.create({
        trigger: container.current,
        start: 'top top',
        end: '+=250%',
        pin: true,
        scrub: 0.4,
        onUpdate: self => {
          const idx = Math.min(steps.length - 1, Math.floor(self.progress * steps.length));
          setActiveStep(idx);
          const barFill = document.getElementById('process-bar-fill');
          if (barFill) barFill.style.width = (self.progress * 100) + '%';
        }
      });
    });
    
    return () => matchMedia.revert();
  }, { scope: container });

  return (
    <section ref={container} id="process" className="relative min-h-[100vh] flex flex-col justify-center px-[6vw] overflow-hidden z-10 bg-transparent">
      <div className="process-inner grid grid-cols-1 md:grid-cols-2 gap-[60px] items-center w-[100%]">
        <div>
          <div className="mono text-[12px] text-[var(--muted)] mb-[20px]">03 / How we work</div>
          <div className="text-[clamp(90px,14vw,220px)] font-[var(--font-display)] text-[var(--line)] leading-[1]">
            {String(activeStep + 1).padStart(2, '0')}
          </div>
          <div className="process-bar"><span id="process-bar-fill"></span></div>
        </div>
        <div className="relative h-[240px] md:h-[300px] glass-panel p-[36px] rounded-3xl">
          {steps.map((s, i) => (
            <div 
              key={i} 
              className={`absolute inset-0 p-[36px] flex flex-col justify-center transition-all duration-400 ${i === activeStep ? 'opacity-100 translate-y-0 z-10' : 'opacity-0 translate-y-[20px] z-0 pointer-events-none'}`}
            >
              <div className="text-[12px] text-[var(--accent)] mb-[12px] mono font-semibold flex items-center gap-[6px]">
                <span className="w-[6px] h-[6px] rounded-full bg-[var(--accent)] animate-pulse" />
                Phase {String(i + 1).padStart(2, '0')} · {s.tag}
              </div>
              <h3 className="text-[clamp(24px,3.2vw,38px)] mb-[14px] font-[var(--font-display)] font-bold text-[var(--ink)]">{s.title}</h3>
              <p className="text-[var(--muted)] max-w-[44ch] leading-[1.6] text-[15.5px]">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
