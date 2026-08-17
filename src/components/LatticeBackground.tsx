"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function LatticeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W: number, H: number, DPR: number;
    let animationFrameId: number;
    
    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth * DPR;
      H = window.innerHeight * DPR;
      if (canvas) {
        canvas.width = W;
        canvas.height = H;
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
      }
    }
    resize();
    window.addEventListener('resize', resize);

    const N = reduceMotion ? 0 : (window.innerWidth < 700 ? 40 : 90);
    const nodes = Array.from({ length: N }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0003, vy: (Math.random() - 0.5) * 0.0003
    }));

    let scrollProgress = 0;
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: self => scrollProgress = self.progress
    });

    let mx = 0.5, my = 0.5;
    const handleMouseMove = (e: MouseEvent) => {
      mx = e.clientX / window.innerWidth;
      my = e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const rootStyle = getComputedStyle(document.documentElement);
    const accent = rootStyle.getPropertyValue('--accent').trim() || '#1768D6';
    const accent2 = rootStyle.getPropertyValue('--accent-2').trim() || '#0EBCD4';
    const ink = rootStyle.getPropertyValue('--ink').trim() || '#0A172F';

    function hexToRgb(hex: string) {
      hex = hex.replace('#', '');
      if (hex.length === 3) hex = hex.split('').map(x => x + x).join('');
      const num = parseInt(hex, 16);
      return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
    }
    const accentRGB = hexToRgb(accent);
    const accent2RGB = hexToRgb(accent2);
    const inkRGB = hexToRgb(ink);

    function draw() {
      if(!ctx) return;
      ctx.clearRect(0, 0, W, H);
      const rotation = scrollProgress * Math.PI * 0.6;
      const spread = 0.34 + scrollProgress * 0.12;
      const cx = W * (0.72 + (mx - 0.5) * 0.02);
      const cy = H * (0.42 + (my - 0.5) * 0.02);
      
      const pts = nodes.map((n, i) => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > 1) n.vx *= -1;
        if (n.y < 0 || n.y > 1) n.vy *= -1;
        const angle = i * (Math.PI * 2 / nodes.length) + rotation;
        const radius = (0.15 + (n.x) * spread) * Math.min(W, H);
        const px = cx + Math.cos(angle) * radius + (n.y - 0.5) * 80 * DPR;
        const py = cy + Math.sin(angle) * radius * 0.72 + (n.x - 0.5) * 80 * DPR;
        return { px, py };
      });

      // connections
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].px - pts[j].px, dy = pts[i].py - pts[j].py;
          const d = Math.hypot(dx, dy);
          const maxD = 140 * DPR;
          if (d < maxD) {
            const alpha = (1 - d / maxD) * 0.10;
            ctx.strokeStyle = `rgba(${inkRGB.join(',')},${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(pts[i].px, pts[i].py);
            ctx.lineTo(pts[j].px, pts[j].py);
            ctx.stroke();
          }
        }
      }

      // nodes
      pts.forEach((p, i) => {
        const lit = i % 5 === 0;
        const c = lit ? (i % 10 === 0 ? accentRGB : accent2RGB) : inkRGB;
        const a = lit ? 0.55 : 0.16;
        ctx.fillStyle = `rgba(${c.join(',')},${a})`;
        ctx.beginPath();
        ctx.arc(p.px, p.py, (lit ? 2.6 : 1.6) * DPR, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    }

    if (N > 0) draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      st.kill();
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} id="lattice" className="fixed inset-0 w-full h-full z-0 pointer-events-none" />
      <div className="grain" />
    </>
  );
}
