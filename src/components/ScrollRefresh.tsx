"use client";
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Web fonts load after first layout, which changes every text height on the
 * page. Pinned ScrollTriggers measure their start/end on creation, so without
 * a refresh afterwards those positions stay stale and triggers fire at the
 * wrong scroll offset (or never).
 */
export default function ScrollRefresh() {
  useEffect(() => {
    let cancelled = false;

    const refresh = () => {
      if (!cancelled) ScrollTrigger.refresh();
    };

    if (document.fonts?.status === 'loaded') {
      refresh();
    } else {
      document.fonts?.ready.then(refresh);
    }

    window.addEventListener('load', refresh);
    return () => {
      cancelled = true;
      window.removeEventListener('load', refresh);
    };
  }, []);

  return null;
}
