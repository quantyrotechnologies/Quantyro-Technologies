"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.body.classList.add('has-custom-cursor');

    const ringX = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3.out' });
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3.out' });

    // Both elements start hidden at 0,0 — reveal them only once we know
    // where the pointer actually is, so no blob sits in the corner on load.
    let revealed = false;
    const handleMove = (e: MouseEvent) => {
      if (!revealed) {
        revealed = true;
        gsap.set([ring, dot], { x: e.clientX, y: e.clientY });
        gsap.to(ring, { autoAlpha: 0.6, duration: 0.3 });
        gsap.to(dot, { autoAlpha: 1, duration: 0.3 });
      }
      ringX(e.clientX);
      ringY(e.clientY);
      dotX(e.clientX);
      dotY(e.clientY);
    };

    const isInteractive = (el: EventTarget | null) =>
      el instanceof HTMLElement && el.closest('a, button, .cursor-hover');

    const handleOver = (e: MouseEvent) => {
      if (isInteractive(e.target)) {
        gsap.to(ring, { scale: 1.8, duration: 0.35, ease: 'power2.out' });
        gsap.to(dot, { scale: 0, duration: 0.25 });
      }
    };
    const handleOut = (e: MouseEvent) => {
      if (isInteractive(e.target)) {
        gsap.to(ring, { scale: 1, duration: 0.35, ease: 'power2.out' });
        gsap.to(dot, { scale: 1, duration: 0.25 });
      }
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-[30px] h-[30px] -ml-[15px] -mt-[15px] rounded-full border border-[var(--accent)] pointer-events-none z-[100] hidden md:block"
        style={{ willChange: 'transform', opacity: 0, visibility: 'hidden' }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-[6px] h-[6px] -ml-[3px] -mt-[3px] rounded-full bg-[var(--accent)] pointer-events-none z-[100] hidden md:block"
        style={{ willChange: 'transform', opacity: 0, visibility: 'hidden' }}
      />
    </>
  );
}
