"use client";
import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  radius: number;
  alpha: number;
  baseAlpha: number;
  pulseSpeed: number;
  pulseOffset: number;
  color: string;
}

interface DataPacket {
  gridX: number;
  gridY: number;
  targetX: number;
  targetY: number;
  progress: number;
  speed: number;
  direction: 'h' | 'v';
  color: string;
  size: number;
}

export default function GlobalTechBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let isVisible = true;

    // Mouse coordinates
    let mouseX = -1000;
    let mouseY = -1000;
    let targetMouseX = -1000;
    let targetMouseY = -1000;
    let scrollY = 0;
    let targetScrollY = 0;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Responsive setup
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Track scroll
    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Track mouse
    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };
    const handleMouseLeave = () => {
      targetMouseX = -1000;
      targetMouseY = -1000;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Visibility change handler (pause when tab hidden)
    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Color Palette
    const COLOR_ACCENT = 'rgba(23, 104, 214, ';   // #1768D6
    const COLOR_CYAN = 'rgba(14, 188, 212, ';     // #0EBCD4
    const COLOR_INDIGO = 'rgba(10, 23, 47, ';     // #0A172F
    const COLOR_PURPLE = 'rgba(112, 0, 255, ';    // Cyber Purple

    // --- 1. NEURAL PARTICLES ---
    const particleCount = prefersReducedMotion ? 25 : (window.innerWidth < 768 ? 40 : 80);
    const particles: Particle[] = [];

    const colors = [
      COLOR_ACCENT,
      COLOR_CYAN,
      COLOR_ACCENT,
      COLOR_CYAN,
      COLOR_INDIGO,
      COLOR_PURPLE
    ];

    for (let i = 0; i < particleCount; i++) {
      const col = colors[i % colors.length];
      const baseAlpha = 0.25 + Math.random() * 0.45;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        baseRadius: 1.5 + Math.random() * 2.2,
        radius: 1.5 + Math.random() * 2.2,
        alpha: baseAlpha,
        baseAlpha: baseAlpha,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        pulseOffset: Math.random() * Math.PI * 2,
        color: col
      });
    }

    // --- 2. CYBER GRID DATA PACKETS ---
    const gridSize = 64;
    const packetCount = prefersReducedMotion ? 6 : (window.innerWidth < 768 ? 10 : 22);
    const packets: DataPacket[] = [];

    const initPacket = (): DataPacket => {
      const isHorizontal = Math.random() > 0.5;
      const gx = Math.floor((Math.random() * width) / gridSize) * gridSize;
      const gy = Math.floor((Math.random() * height) / gridSize) * gridSize;
      const span = (1 + Math.floor(Math.random() * 3)) * gridSize;

      return {
        gridX: gx,
        gridY: gy,
        targetX: isHorizontal ? gx + (Math.random() > 0.5 ? span : -span) : gx,
        targetY: !isHorizontal ? gy + (Math.random() > 0.5 ? span : -span) : gy,
        progress: Math.random(),
        speed: 0.004 + Math.random() * 0.008,
        direction: isHorizontal ? 'h' : 'v',
        color: Math.random() > 0.4 ? COLOR_CYAN : COLOR_ACCENT,
        size: 2.2 + Math.random() * 1.8
      };
    };

    for (let i = 0; i < packetCount; i++) {
      packets.push(initPacket());
    }

    // --- 3. AMBIENT ANIMATION LOOP ---
    let tick = 0;

    const render = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      tick += 0.015;

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;
      scrollY += (targetScrollY - scrollY) * 0.1;

      // Clear frame
      ctx.clearRect(0, 0, width, height);

      // --- LAYER 1: AMBIENT RADIAL LIGHT BEACON (Mouse Spotlight) ---
      if (mouseX > -500 && mouseY > -500) {
        const spotGrad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 380);
        spotGrad.addColorStop(0, 'rgba(14, 188, 212, 0.08)');
        spotGrad.addColorStop(0.4, 'rgba(23, 104, 214, 0.04)');
        spotGrad.addColorStop(1, 'rgba(247, 251, 254, 0)');
        ctx.fillStyle = spotGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // --- LAYER 2: HIGH-TECH CYBER GRID ---
      ctx.lineWidth = 1;
      const gridOffset = (scrollY * 0.15) % gridSize;

      // Vertical Grid Lines
      for (let x = 0; x <= width; x += gridSize) {
        const distToMouse = Math.abs(x - mouseX);
        const mouseFactor = Math.max(0, 1 - distToMouse / 280);
        const lineAlpha = 0.032 + mouseFactor * 0.065;

        ctx.strokeStyle = `rgba(10, 23, 47, ${lineAlpha})`;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal Grid Lines with scroll parallax
      for (let y = -gridOffset; y <= height + gridSize; y += gridSize) {
        if (y < 0) continue;
        const distToMouse = Math.abs(y - mouseY);
        const mouseFactor = Math.max(0, 1 - distToMouse / 280);
        const lineAlpha = 0.032 + mouseFactor * 0.065;

        ctx.strokeStyle = `rgba(10, 23, 47, ${lineAlpha})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Grid Intersection Crosshairs (subtle tech markers)
      const crossStep = gridSize * 2;
      ctx.lineWidth = 1;
      for (let cx = 0; cx <= width; cx += crossStep) {
        for (let cy = (-(scrollY * 0.15) % crossStep); cy <= height + crossStep; cy += crossStep) {
          if (cy < 0) continue;
          const distToMouse = Math.hypot(cx - mouseX, cy - mouseY);
          const active = distToMouse < 180;
          const alpha = active ? 0.28 : 0.06;

          ctx.strokeStyle = active ? 'rgba(14, 188, 212, ' + alpha + ')' : 'rgba(10, 23, 47, ' + alpha + ')';
          const size = active ? 4 : 2.5;

          ctx.beginPath();
          ctx.moveTo(cx - size, cy);
          ctx.lineTo(cx + size, cy);
          ctx.moveTo(cx, cy - size);
          ctx.lineTo(cx, cy + size);
          ctx.stroke();
        }
      }

      // --- LAYER 3: TRAVELING CYBER DATA CONDUITS (Data Packets) ---
      for (let i = 0; i < packets.length; i++) {
        const p = packets[i];
        p.progress += p.speed;

        if (p.progress >= 1) {
          packets[i] = initPacket();
          continue;
        }

        const currX = p.gridX + (p.targetX - p.gridX) * p.progress;
        const currY = ((p.gridY + (p.targetY - p.gridY) * p.progress) - (scrollY * 0.15)) % height;
        const finalY = currY < 0 ? currY + height : currY;

        // Draw luminous trail
        const trailLength = 28;
        const tailX = p.direction === 'h' ? currX - Math.sign(p.targetX - p.gridX) * trailLength : currX;
        const tailY = p.direction === 'v' ? finalY - Math.sign(p.targetY - p.gridY) * trailLength : finalY;

        const grad = ctx.createLinearGradient(tailX, tailY, currX, finalY);
        grad.addColorStop(0, `${p.color}0)`);
        grad.addColorStop(1, `${p.color}0.85)`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(currX, finalY);
        ctx.stroke();

        // Packet Head Glow
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(currX, finalY, p.size * 0.7, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `${p.color}0.9)`;
        ctx.beginPath();
        ctx.arc(currX, finalY, p.size * 1.3, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- LAYER 4: NEURAL PARTICLES & LASER CONNECTIONS ---
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Pulse alpha
        p.alpha = p.baseAlpha + Math.sin(tick * 2 + p.pulseOffset) * 0.15;

        // Mouse proximity reaction
        if (mouseX > -500 && mouseY > -500) {
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 180 && dist > 1) {
            const force = (1 - dist / 180) * 0.4;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
            p.radius = p.baseRadius * 1.5;
            p.alpha = Math.min(1, p.alpha + 0.35);
          } else {
            p.radius = p.baseRadius;
          }
        }
      }

      // Draw Proximity Connections (Constellation Network)
      const maxDistance = 140;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Connect to mouse if close
        if (mouseX > -500 && mouseY > -500) {
          const mDist = Math.hypot(p1.x - mouseX, p1.y - mouseY);
          if (mDist < 160) {
            const mAlpha = (1 - mDist / 160) * 0.45;
            ctx.strokeStyle = `rgba(14, 188, 212, ${mAlpha})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.stroke();
          }
        }

        // Connect to neighbouring particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDistance) {
            const linkAlpha = (1 - dist / maxDistance) * 0.18;
            ctx.strokeStyle = `rgba(23, 104, 214, ${linkAlpha})`;
            ctx.lineWidth = 0.9;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw Particle Nodes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        if (i % 4 === 0) {
          ctx.fillStyle = `${p.color}${p.alpha * 0.35})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none -z-20 overflow-hidden"
      aria-hidden="true"
    >
      {/* Dynamic Ambient Glowing Gradient Orbs (Smooth CSS GPU Blur) */}
      <div 
        className="absolute -top-[15%] -left-[10%] w-[65vw] h-[65vw] max-w-[850px] max-h-[850px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(14,188,212,0.12)_0%,rgba(23,104,214,0.06)_45%,transparent_75%)] blur-[90px] animate-pulse duration-[12000ms] pointer-events-none"
      />
      <div 
        className="absolute top-[40%] -right-[15%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(23,104,214,0.10)_0%,rgba(112,0,255,0.05)_45%,transparent_75%)] blur-[100px] pointer-events-none"
      />
      <div 
        className="absolute -bottom-[20%] left-[20%] w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(14,188,212,0.09)_0%,rgba(23,104,214,0.04)_45%,transparent_75%)] blur-[110px] pointer-events-none"
      />

      {/* Main High-Tech Canvas Engine */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Micro-Turbulence Film Grain for Rich Cinema Tech Finish */}
      <div className="grain" />
    </div>
  );
}
