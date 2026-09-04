"use client";
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
gsap.config({ nullTargetWarn: false });

let lenisSingleton: Lenis | null = null;

/** Lets other client components (e.g. a modal) pause/resume smooth scroll. */
export function getLenis() {
  return lenisSingleton;
}

export default function SmoothScroll() {
  const pathname = usePathname();

  // Initialize Lenis
  useEffect(() => {
    // Disable browser default scroll restoration so it never jumps to previous page positions
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
    });
    lenisSingleton = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      lenisSingleton = null;
    };
  }, []);

  // Scroll to top immediately on every page navigation
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hash = window.location.hash;
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        if (lenisSingleton) {
          lenisSingleton.scrollTo(target as HTMLElement, { immediate: true });
        } else {
          target.scrollIntoView();
        }
        return;
      }
    }

    // Reset window and Lenis scroll offset to top
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (lenisSingleton) {
      lenisSingleton.scrollTo(0, { immediate: true });
    }

    // Refresh GSAP ScrollTrigger after route transition
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 60);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}
