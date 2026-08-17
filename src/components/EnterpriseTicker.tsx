"use client";
import React from 'react';

const METRICS = [
  { label: 'Global Edge Network', value: '48 Regions Active' },
  { label: 'Enterprise Uptime SLA', value: '99.999%' },
  { label: 'AI Neural Throughput', value: '14.2M req/sec' },
  { label: 'Zero-Trust Security', value: 'SOC 2 Type II' },
  { label: 'Latency P99', value: '< 18ms Worldwide' },
  { label: 'Distributed Systems', value: 'Multi-Cloud Native' },
];

export default function EnterpriseTicker() {
  return (
    <div className="relative z-10 w-full overflow-hidden border-y border-[rgba(10,23,47,0.07)] bg-white py-[13px]">
      <div className="flex w-max items-center gap-[48px] animate-ticker">
        {[...METRICS, ...METRICS].map((item, idx) => (
          <div key={idx} className="flex items-center gap-[12px] shrink-0 mono text-[12px]">
            <span className="flex h-[7px] w-[7px] relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-50"></span>
              <span className="relative inline-flex rounded-full h-[7px] w-[7px] bg-[var(--accent)]"></span>
            </span>
            <span className="text-[var(--muted)]">{item.label}:</span>
            <span className="font-semibold text-[var(--ink)] bg-[rgba(23,104,214,0.06)] px-[8px] py-[2px] rounded-md border border-[rgba(23,104,214,0.12)]">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
