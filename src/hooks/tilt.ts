import type { MouseEvent } from 'react';

/**
 * Subtle mouse-driven 3D tilt — pure CSS transform on the hovered element
 * itself (via e.currentTarget), no rAF loop, no library, no refs needed.
 * Cheap enough to spread across a whole card grid.
 */
let rafId: number | null = null;

export function tiltOnMouseMove<T extends HTMLElement>(e: MouseEvent<T>, strength = 6) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;

  if (rafId) cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(() => {
    el.style.transform = `perspective(800px) rotateX(${(-y * strength).toFixed(2)}deg) rotateY(${(x * strength).toFixed(2)}deg) translate3d(0, -4px, 0)`;
  });
}

export function tiltOnMouseLeave<T extends HTMLElement>(e: MouseEvent<T>) {
  const el = e.currentTarget;
  if (rafId) cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(() => {
    el.style.transform = '';
  });
}
