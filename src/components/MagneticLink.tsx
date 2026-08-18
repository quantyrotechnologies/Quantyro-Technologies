"use client";
import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

export default function MagneticLink({
  href,
  className,
  children,
  strength = 0.35,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    gsap.to(el, { x: x * strength, y: y * strength, duration: 0.4, ease: 'power3.out' });
  };

  const handleLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
  };

  return (
    <Link
      ref={ref}
      href={href}
      className={`cursor-hover ${className ?? ''}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </Link>
  );
}
