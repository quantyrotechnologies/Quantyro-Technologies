"use client";
import React from 'react';
import type { TickerMetric } from '@/lib/types';

export default function EnterpriseTicker({ metrics }: { metrics: TickerMetric[] }) {
  if (metrics.length === 0) return null;

  return (
    <div className="relative z-10 w-full overflow-hidden border-y border-[rgba(10,23,47,0.07)] bg-white py-[13px]">
      <div className="flex w-max items-center gap-[48px] animate-ticker">
        {[...metrics, ...metrics].map((item, idx) => (
          <div key={`${item.id}-${idx}`} className="flex items-center gap-[12px] shrink-0 mono text-[12px]">
            <span className="flex h-[7px] w-[7px] relative">
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
