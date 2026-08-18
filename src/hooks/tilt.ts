import type { MouseEvent } from 'react';

/**
 * Subtle mouse-driven 3D tilt — pure CSS transform on the hovered element
 * itself (via e.currentTarget), no rAF loop, no library, no refs needed.
 * Cheap enough to spread across a whole card grid.
 */
export function tiltOnMouseMove<T extends HTMLElement>(e: MouseEvent<T>, strength = 6) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  el.style.transform = `perspective(800px) rotateX(${(-y * strength).toFixed(2)}deg) rotateY(${(x * strength).toFixed(2)}deg) translateY(-4px)`;
}

export function tiltOnMouseLeave<T extends HTMLElement>(e: MouseEvent<T>) {
  e.currentTarget.style.transform = '';
}
