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
 *
 * Below-the-fold images (next/image lazy-loads by default) keep shifting
 * page height well after the `load` event too, since lazy images are
 * intentionally excluded from it — so a one-time refresh isn't enough on its
 * own. A ResizeObserver on the document height catches those (and any other
 * later layout shift, e.g. variable-length admin-edited content) and
 * re-syncs ScrollTrigger's cached positions whenever it actually changes.
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

    let lastHeight = document.documentElement.scrollHeight;
    let debounceId: ReturnType<typeof setTimeout> | undefined;
    const observer = new ResizeObserver(() => {
      const height = document.documentElement.scrollHeight;
      if (height === lastHeight) return;
      lastHeight = height;
      clearTimeout(debounceId);
      debounceId = setTimeout(refresh, 150);
    });
    observer.observe(document.body);

    return () => {
      cancelled = true;
      window.removeEventListener('load', refresh);
      clearTimeout(debounceId);
      observer.disconnect();
    };
  }, []);

  return null;
}
