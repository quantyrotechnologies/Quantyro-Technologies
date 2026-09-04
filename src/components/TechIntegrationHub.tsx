"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

// --- SERVICE SETS FOR THE 4 DYNAMIC FLOATING CODE BADGES ---
interface ServiceBadgeData {
  title: string;
  ext: string;
  iconType: 'software' | 'ai' | 'cloud' | 'mobile' | 'commerce' | 'database' | 'security' | 'api';
}

const BADGE_STREAMS: ServiceBadgeData[][] = [
  // Position 1: Top Left Stream
  [
    { title: 'Custom Software', ext: 'tsx', iconType: 'software' },
    { title: 'Full-Stack Web', ext: 'app', iconType: 'api' },
    { title: 'Backend Systems', ext: 'go', iconType: 'software' },
    { title: 'GraphQL & APIs', ext: 'gql', iconType: 'api' },
  ],
  // Position 2: Mid Left Stream
  [
    { title: 'AI & ML Models', ext: 'py', iconType: 'ai' },
    { title: 'LLM Automation', ext: 'ai', iconType: 'ai' },
    { title: 'Vector & RAG', ext: 'vec', iconType: 'database' },
    { title: 'Autonomous Bots', ext: 'rs', iconType: 'ai' },
  ],
  // Position 3: Top Right Stream
  [
    { title: 'Cloud & DevOps', ext: 'k8s', iconType: 'cloud' },
    { title: 'Multi-Cloud Scale', ext: 'aws', iconType: 'cloud' },
    { title: 'CI/CD Pipelines', ext: 'yml', iconType: 'cloud' },
    { title: 'High Availability', ext: 'sla', iconType: 'cloud' },
  ],
  // Position 4: Mid Right Stream
  [
    { title: 'Mobile Apps', ext: 'ios', iconType: 'mobile' },
    { title: 'E-Commerce', ext: 'shop', iconType: 'commerce' },
    { title: 'Data Pipelines', ext: 'sql', iconType: 'database' },
    { title: 'Zero-Trust Sec', ext: 'jwt', iconType: 'security' },
  ],
];

// --- TOP BADGE CONFIGURATIONS (Exact Alignment with Rings) ---
const BADGE_CONFIGS = [
  { id: 'pos-1', x: '5%', y: '6%', d: 'M 130 85 C 130 180, 290 190, 300 280' },
  { id: 'pos-2', x: '16%', y: '19%', d: 'M 215 135 C 215 195, 296 220, 300 280' },
  { id: 'pos-3', x: 'auto', right: '16%', y: '6%', d: 'M 385 85 C 385 160, 308 190, 300 280' },
  { id: 'pos-4', x: 'auto', right: '5%', y: '18%', d: 'M 470 135 C 470 200, 310 210, 300 280' },
];

// --- ROW 1 APPS (Scrolls Left) ---
const ROW1_APPS = [
  { id: 'aws', label: 'AWS', iconType: 'aws' },
  { id: 'openai', label: 'OpenAI', iconType: 'openai' },
  { id: 'nextjs', label: 'Next.js', iconType: 'nextjs' },
  { id: 'slack', label: 'Slack', iconType: 'slack' },
  { id: 'meta', label: 'Analytics', iconType: 'meta' },
  { id: 'salesforce', label: 'Salesforce', iconType: 'salesforce' },
  { id: 'hubspot', label: 'HubSpot', iconType: 'hubspot' },
  { id: 'redis', label: 'Redis', iconType: 'redis' },
  { id: 'figma', label: 'Figma', iconType: 'figma' },
  { id: 'graphql', label: 'GraphQL', iconType: 'graphql' },
];

// --- ROW 2 APPS (Scrolls Right) ---
const ROW2_APPS = [
  { id: 'docker', label: 'Docker', iconType: 'docker' },
  { id: 'python', label: 'Python', iconType: 'python' },
  { id: 'stripe', label: 'Stripe', iconType: 'stripe' },
  { id: 'postgres', label: 'PostgreSQL', iconType: 'postgres' },
  { id: 'k8s', label: 'Kubernetes', iconType: 'k8s' },
  { id: 'adobe', label: 'Adobe Cloud', iconType: 'adobe' },
  { id: 'gcp', label: 'Google Cloud', iconType: 'gcp' },
  { id: 'react', label: 'React', iconType: 'react' },
  { id: 'datadog', label: 'Datadog', iconType: 'datadog' },
  { id: 'terraform', label: 'Terraform', iconType: 'terraform' },
];

// --- SERVICE TEXT LABEL (static swap, no per-frame scramble) ---
function CodingServiceText({ targetText }: { targetText: string }) {
  return <span className="font-semibold tracking-tight">{targetText}</span>;
}

export default function TechIntegrationHub() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  // Current active index for rotating services (cycles every 3.2 seconds)
  const [cycleIndex, setCycleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCycleIndex((prev) => (prev + 1) % 4);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  // 3D Parallax Tilt Effect on Mouse Move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rx = -(y / (rect.height / 2)) * 4.5;
    const ry = (x / (rect.width / 2)) * 4.5;
    setTilt({ rx, ry });
  };

  // [PHASE-4] Interactive Core Click Cyber Shockwaves
  const [ripples, setRipples] = useState<{ id: number }[]>([]);

  const handleCoreClick = () => {
    const newId = Date.now();
    setRipples((prev) => [...prev, { id: newId }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newId));
    }, 900);
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
    setHoveredNode(null);
  };

  // Outgoing laser streams radiating downward
  const bottomConduits = [
    { id: 'b1', d: 'M 300 320 C 290 380, 150 420, 110 465' },
    { id: 'b2', d: 'M 300 320 C 295 385, 210 425, 180 465' },
    { id: 'b3', d: 'M 300 320 C 298 385, 260 430, 245 465' },
    { id: 'b4', d: 'M 300 320 C 300 385, 300 430, 300 465' },
    { id: 'b5', d: 'M 300 320 C 302 385, 340 430, 355 465' },
    { id: 'b6', d: 'M 300 320 C 305 385, 390 425, 420 465' },
    { id: 'b7', d: 'M 300 320 C 310 380, 450 420, 490 465' },
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[340px] sm:max-w-[440px] lg:max-w-[540px] aspect-square mx-auto select-none flex items-center justify-center mt-[10px] lg:mt-0"
      style={{
        perspective: '1200px',
      }}
    >
      {/* 3D Tilted Wrapper */}
      <div
        className="relative w-full h-full transition-transform duration-200 ease-out flex items-center justify-center"
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* ========================================================= */}
        {/* 1. CONCENTRIC 3D ORBITAL DISCS (Layered depth background) */}
        {/* ========================================================= */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Outer Layer Disc 4 */}
          <div
            className="w-[88%] h-[88%] rounded-full relative"
            style={{
              background: 'radial-gradient(circle, rgba(28, 45, 72, 0.95) 0%, rgba(22, 36, 58, 0.98) 70%, rgba(16, 28, 46, 1) 100%)',
              boxShadow: '0 25px 60px -15px rgba(8, 18, 35, 0.45), inset 0 2px 5px rgba(255, 255, 255, 0.12), inset 0 -3px 8px rgba(0, 0, 0, 0.5)',
            }}
          >
            <div className="absolute inset-[6%] rounded-full border border-[rgba(70,110,170,0.18)]" />
            <div className="absolute inset-[13%] rounded-full border border-[rgba(70,110,170,0.15)]" />
          </div>

          {/* Middle Layer Disc 3 */}
          <div
            className="absolute w-[70%] h-[70%] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(20, 35, 60, 1) 0%, rgba(15, 28, 48, 1) 75%, rgba(11, 20, 36, 1) 100%)',
              boxShadow: '0 16px 36px rgba(0, 0, 0, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.15), inset 0 -4px 10px rgba(0, 0, 0, 0.6)',
            }}
          />

          {/* Inner Layer Disc 2 */}
          <div
            className="absolute w-[50%] h-[50%] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(13, 24, 44, 1) 0%, rgba(10, 19, 35, 1) 85%, rgba(7, 14, 27, 1) 100%)',
              boxShadow: '0 10px 24px rgba(0, 0, 0, 0.6), inset 0 2px 3px rgba(255, 255, 255, 0.18)',
            }}
          />

          {/* Deep Core Well Disc 1 */}
          <div
            className="absolute w-[30%] h-[30%] rounded-full flex items-center justify-center"
            style={{
              background: 'radial-gradient(circle, rgba(6, 14, 28, 1) 0%, rgba(3, 9, 20, 1) 100%)',
              boxShadow: 'inset 0 4px 14px rgba(0, 0, 0, 0.9), 0 0 30px rgba(47, 143, 255, 0.15)',
            }}
          >
            <div className="absolute w-[140%] h-[140%] rounded-full bg-[radial-gradient(circle,rgba(47,143,255,0.22)_0%,rgba(14,188,212,0.12)_45%,transparent_70%)] pointer-events-none" />
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. SVG LASER DATA CONDUITS & ANIMATED ENERGY PULSES       */}
        {/* ========================================================= */}
        <svg
          viewBox="0 0 600 600"
          className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
        >
          <defs>
            <linearGradient id="streamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2F8FFF" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#1E88FF" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#1768D6" stopOpacity="0.7" />
            </linearGradient>

            <linearGradient id="streamGradHover" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="50%" stopColor="#4FB6FF" stopOpacity="1" />
              <stop offset="100%" stopColor="#0EBCD4" stopOpacity="0.95" />
            </linearGradient>

            <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* --- TOP INPUT CONDUITS --- */}
          {BADGE_CONFIGS.map((cfg) => {
            const isHovered = hoveredNode === cfg.id;
            return (
              <g key={cfg.id}>
                <path
                  d={cfg.d}
                  fill="none"
                  stroke="rgba(0, 15, 35, 0.6)"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />
                <path
                  d={cfg.d}
                  fill="none"
                  stroke={isHovered ? 'url(#streamGradHover)' : 'url(#streamGrad)'}
                  strokeWidth={isHovered ? '2.4' : '1.5'}
                  strokeOpacity={isHovered ? 1 : 0.8}
                  strokeLinecap="round"
                  filter={isHovered ? 'url(#glowFilter)' : undefined}
                />
              </g>
            );
          })}

          {/* --- BOTTOM OUTGOING CONDUITS --- */}
          {bottomConduits.map((bp) => {
            const isHovered = hoveredNode !== null && !hoveredNode.startsWith('pos-');
            return (
              <g key={bp.id}>
                <path
                  d={bp.d}
                  fill="none"
                  stroke="rgba(0, 15, 35, 0.5)"
                  strokeWidth="2.2"
                />
                <path
                  d={bp.d}
                  fill="none"
                  stroke={isHovered ? '#2F8FFF' : 'rgba(47, 143, 255, 0.45)'}
                  strokeWidth={isHovered ? '2.0' : '1.2'}
                  strokeOpacity={isHovered ? 0.9 : 0.45}
                  strokeLinecap="round"
                  filter={isHovered ? 'url(#glowFilter)' : undefined}
                />
              </g>
            );
          })}
        </svg>

        {/* ========================================================= */}
        {/* 3. CENTRAL GLOWING QUANTYRO CYBER CORE                    */}
        {/* ========================================================= */}
        <button
          type="button"
          onClick={handleCoreClick}
          onMouseEnter={() => setHoveredNode('core')}
          aria-label="Pulse energy shockwave from core"
          className="absolute z-20 w-[74px] h-[74px] rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 group shadow-xl focus:outline-none"
          style={{
            background: 'radial-gradient(circle, #0B1F35 0%, #041020 100%)',
            border: '2px solid #2F8FFF',
            boxShadow: '0 0 28px rgba(47, 143, 255, 0.45), inset 0 0 14px rgba(47, 143, 255, 0.35)',
          }}
          title="Click to pulse energy shockwave"
        >
          {/* [PHASE-4] Expanding Shockwave Energy Rings */}
          {ripples.map((ripple) => (
            <div
              key={ripple.id}
              className="absolute inset-0 rounded-full border-2 border-[#2F8FFF] animate-shockwave pointer-events-none"
            />
          ))}

          {/* Soft Ambient Core Ring */}
          <div className="absolute inset-[2px] rounded-full border border-[rgba(47,143,255,0.45)] opacity-40 pointer-events-none" />

          {/* Embedded Brand Logo in Quantum Core */}
          <div className="relative w-[46px] h-[46px] rounded-full overflow-hidden flex items-center justify-center p-[2px] bg-transparent">
            <Image
              src="/images/quantyro-technologies.png"
              alt="Quantyro Cyber Core Logo"
              width={46}
              height={46}
              className="object-contain w-full h-full filter drop-shadow-[0_0_8px_rgba(47,143,255,0.6)] transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
          </div>
        </button>

        {/* ========================================================================= */}
        {/* 4. DYNAMIC SINGLE-LINE CODING BADGES (Level & Compact with Rings)         */}
        {/* ========================================================================= */}
        {BADGE_CONFIGS.map((cfg, bIdx) => {
          const currentService = BADGE_STREAMS[bIdx][cycleIndex];

          return (
            <div
              key={cfg.id}
              onMouseEnter={() => setHoveredNode(cfg.id)}
              onMouseLeave={() => setHoveredNode(null)}
              className="absolute z-30 bg-white/95 px-[10px] py-[4.5px] rounded-full border border-[rgba(47,143,255,0.55)] shadow-[0_4px_14px_rgba(0,0,0,0.08)] flex items-center gap-[6px] cursor-pointer transition-all duration-300 hover:scale-105 hover:border-[#2F8FFF] text-[11.5px] font-semibold text-[var(--ink)] whitespace-nowrap"
              style={{
                top: cfg.y,
                left: cfg.x !== 'auto' ? cfg.x : undefined,
                right: cfg.right || undefined,
              }}
            >
              <span className="text-[#1768D6] shrink-0">
                <ServiceIcon type={currentService.iconType} />
              </span>
              <CodingServiceText targetText={currentService.title} />
              <span className="mono text-[9px] text-[#1768D6] bg-[#2F8FFF]/12 px-[5px] py-[1px] rounded-full font-medium">
                .{currentService.ext}
              </span>
            </div>
          );
        })}

        {/* ========================================================================= */}
        {/* 5. INFINITE AUTO-SCROLLING TECH INTEGRATIONS (2 Alternating Marquee Rows) */}
        {/* ========================================================================= */}
        <div
          className="absolute bottom-[2%] inset-x-[2%] z-30 flex flex-col gap-[7px] overflow-hidden select-none"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          }}
        >
          {/* Row 1 — scrolls left to right */}
          <div className="flex gap-[7px] w-max animate-marquee-ltr">
            {[...ROW1_APPS, ...ROW1_APPS].map((app, idx) => (
              <div
                key={`r1-${idx}`}
                role="img"
                aria-label={app.label}
                onMouseEnter={() => setHoveredNode(app.id)}
                onMouseLeave={() => setHoveredNode(null)}
                title={app.label}
                className={`w-[36px] h-[36px] rounded-xl bg-white/95 border flex items-center justify-center cursor-pointer transition-all duration-200 shadow-xs shrink-0 ${
                  hoveredNode === app.id
                    ? 'scale-115 border-[#2F8FFF] shadow-[0_6px_16px_rgba(47,143,255,0.4)] -translate-y-1'
                    : 'border-[rgba(10,23,47,0.12)] hover:border-[#2F8FFF] hover:shadow-sm'
                }`}
              >
                <AppIcon type={app.iconType} />
              </div>
            ))}
          </div>

          {/* Row 2 — scrolls right to left */}
          <div className="flex gap-[7px] w-max animate-marquee-rtl">
            {[...ROW2_APPS, ...ROW2_APPS].map((app, idx) => (
              <div
                key={`r2-${idx}`}
                role="img"
                aria-label={app.label}
                onMouseEnter={() => setHoveredNode(app.id)}
                onMouseLeave={() => setHoveredNode(null)}
                title={app.label}
                className={`w-[36px] h-[36px] rounded-xl bg-white/95 border flex items-center justify-center cursor-pointer transition-all duration-200 shadow-xs shrink-0 ${
                  hoveredNode === app.id
                    ? 'scale-115 border-[#2F8FFF] shadow-[0_6px_16px_rgba(47,143,255,0.4)] -translate-y-1'
                    : 'border-[rgba(10,23,47,0.12)] hover:border-[#2F8FFF] hover:shadow-sm'
                }`}
              >
                <AppIcon type={app.iconType} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// --- SERVICE CATEGORY ICON ---
function ServiceIcon({ type }: { type: string }) {
  switch (type) {
    case 'software':
      return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1768D6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case 'ai':
      return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1768D6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
          <path d="m4.93 4.93 2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      );
    case 'cloud':
      return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1768D6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        </svg>
      );
    case 'mobile':
      return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1768D6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
          <path d="M12 18h.01" />
        </svg>
      );
    case 'commerce':
      return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1768D6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="8" cy="21" r="1" />
          <circle cx="19" cy="21" r="1" />
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </svg>
      );
    case 'database':
      return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1768D6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5V19A9 3 0 0 0 21 19V5" />
          <path d="M3 12A9 3 0 0 0 21 12" />
        </svg>
      );
    case 'security':
      return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1768D6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case 'api':
      return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1768D6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 14a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4Z" />
          <path d="M6 6h.01M6 10h.01M10 6h.01M10 10h.01M14 6h.01M14 10h.01M18 6h.01M18 10h.01" />
        </svg>
      );
    default:
      return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1768D6" strokeWidth="2.2">
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}

// --- APP ICONS COMPONENT ---
function AppIcon({ type }: { type: string }) {
  switch (type) {
    case 'aws':
      return <span className="font-extrabold text-[11px] text-[#FF9900] tracking-tight">aws</span>;
    case 'openai':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10A37F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
          <path d="m5.6 5.6 2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
        </svg>
      );
    case 'nextjs':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-black">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm-1 14.5V8.5h2v6.5l3.5-6.5h2L13 16.5h-2Z" />
        </svg>
      );
    case 'slack':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
          <path d="M6 15a2 2 0 1 1-2-2h2v2zM7 15a2 2 0 0 1 2-2 2 2 0 0 1 2 2v5a2 2 0 1 1-4 0v-5z" fill="#E01E5A" />
          <path d="M9 6a2 2 0 1 1 2-2v2H9zM9 7a2 2 0 0 1 2 2 2 2 0 0 1-2 2H4a2 2 0 0 1 0-4h5z" fill="#36C5F0" />
          <path d="M18 9a2 2 0 1 1 2 2h-2V9zM17 9a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 1 1 4 0v5z" fill="#2EB67D" />
          <path d="M15 18a2 2 0 1 1-2 2v-2h2zM15 17a2 2 0 0 1-2-2 2 2 0 0 1 2-2h5a2 2 0 1 1 0 4h-5z" fill="#ECB22E" />
        </svg>
      );
    case 'meta':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#0081FB">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
      );
    case 'salesforce':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#00A1E0">
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
        </svg>
      );
    case 'hubspot':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="#FF7A59">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 2v5M12 17v5M2 12h5M17 12h5" stroke="#FF7A59" strokeWidth="2.5" />
        </svg>
      );
    case 'docker':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#2496ED">
          <path d="M13 8h2v2h-2zm-3 0h2v2h-2zm-3 0h2v2H7zm6-3h2v2h-2zm-3 0h2v2h-2zm-3 0h2v2H7zm14.5 7.5c-.3-.2-1.6-.9-2.5-.2-.1-.9-.6-1.7-1.4-2.2-.4-.2-.8-.4-1.3-.4-.2 0-.4 0-.6.1-.5-.8-1.4-1.3-2.4-1.3H1v4c0 3.5 2.5 6.5 6 7 4.5.6 9-.2 12-3.5 1.5-1.5 2.5-3 2.5-3.5z" />
        </svg>
      );
    case 'python':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
          <path d="M11.9 2C6.9 2 7.2 4.2 7.2 4.2V6.4H12.1V7.1H5.2S2 6.7 2 11.7c0 4.9 2.8 4.8 2.8 4.8h1.7V14s-.1-2.5 2.4-2.5h4.9s2.3.1 2.3-2.3V4.3s.4-2.3-4.2-2.3zm-2.2 1.5c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9z" fill="#3776AB" />
          <path d="M12.1 22c5 0 4.7-2.2 4.7-2.2V17.6H11.9V16.9H18.8s3.2.4 3.2-4.6c0-4.9-2.8-4.8-2.8-4.8H17.5V10s.1 2.5-2.4 2.5h-4.9s-2.3-.1-2.3 2.3V19.7s-.4 2.3 4.2 2.3zm2.2-1.5c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z" fill="#FFD43B" />
        </svg>
      );
    case 'stripe':
      return <span className="font-extrabold text-[14px] text-[#635BFF]">S</span>;
    case 'postgres':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="#336791">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-2h2v2zm0-4h-2V7h2v5.5z" />
        </svg>
      );
    case 'k8s':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="#326CE5">
          <circle cx="12" cy="12" r="9" stroke="#326CE5" strokeWidth="2" fill="none" />
          <path d="m12 6 5 3v6l-5 3-5-3V9l5-3Z" fill="#326CE5" />
        </svg>
      );
    case 'adobe':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF0000">
          <path d="M14.5 3H22v18h-4.5L14.5 13H11l3.5-10zm-5 0H2v18h4.5L9.5 3z" />
        </svg>
      );
    case 'gcp':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#4285F4" />
        </svg>
      );
    case 'redis':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="#D82C20">
          <path d="M2 12l10 5 10-5-10-5-10 5zm10 8l-8-4 1.5-1.5L12 18l6.5-3.5L20 16l-8 4z" />
        </svg>
      );
    case 'figma':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M8 12a4 4 0 1 1 8 0 4 4 0 0 1-8 0z" fill="#1ABCFE" />
          <path d="M4 12a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4z" fill="#0ACF83" />
          <path d="M4 4a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4z" fill="#F24E1E" />
          <path d="M12 0h4a4 4 0 1 1 0 8h-4V0z" fill="#FF7262" />
          <path d="M4 20a4 4 0 0 1 4-4h4v4a4 4 0 0 1-8 0z" fill="#A259FF" />
        </svg>
      );
    case 'graphql':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="#E10098">
          <circle cx="12" cy="4" r="2.5" />
          <circle cx="4" cy="18" r="2.5" />
          <circle cx="20" cy="18" r="2.5" />
          <path d="M12 4L4 18M12 4l8 14M4 18h16" stroke="#E10098" strokeWidth="1.8" fill="none" />
        </svg>
      );
    case 'react':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#61DAFB" strokeWidth="2">
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)" />
          <circle cx="12" cy="12" r="2" fill="#61DAFB" />
        </svg>
      );
    case 'datadog':
      return <span className="font-extrabold text-[11px] text-[#632CA6]">DD</span>;
    case 'terraform':
      return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="#844FBA">
          <path d="M14 6.5v7l-6-3.5v-7l6 3.5zm7 4v7l-6-3.5v-7l6 3.5zm-14 0v7l-6-3.5v-7l6 3.5z" />
        </svg>
      );
    default:
      return <span className="font-bold text-[12px] text-[var(--accent)]">●</span>;
  }
}
