"use client";
import React, { useState } from 'react';

interface TocItem {
  id: string;
  label: string;
}

export default function TableOfContents({ items }: { items: TocItem[] }) {
  const [open, setOpen] = useState(true);
  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="rounded-[18px] border border-[var(--line)] bg-[var(--surface)] p-[14px] md:p-[18px] mb-[40px] transition-all duration-300 shadow-xs">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-[4px] py-[2px] cursor-pointer group select-none text-left"
        aria-expanded={open}
      >
        <span className="flex items-center gap-[8px] text-[11.5px] font-mono font-semibold uppercase tracking-wide text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">
          <span className="w-[6px] h-[6px] rounded-full bg-[var(--accent)]" />
          On this page ({items.length} sections)
        </span>
        <div className="w-[26px] h-[26px] rounded-full bg-[rgba(10,23,47,0.04)] border border-[rgba(10,23,47,0.08)] flex items-center justify-center group-hover:bg-[var(--accent)]/10 group-hover:border-[var(--accent)]/30 transition-all">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`text-[var(--muted)] group-hover:text-[var(--accent)] transition-transform duration-300 ${open ? 'rotate-180' : 'rotate-0'}`}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </button>

      {open && (
        <ul className="flex flex-col gap-[2px] mt-[12px] pt-[10px] border-t border-[var(--line)] animate-in fade-in duration-200">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="group flex items-center justify-between gap-[10px] rounded-[10px] px-[10px] py-[8px] text-[14px] font-medium text-[var(--ink)] hover:bg-[rgba(23,104,214,0.06)] hover:text-[var(--accent)] transition-colors"
              >
                <span className="flex items-center gap-[8px]">
                  <span className="w-[6px] h-[6px] rounded-full bg-[var(--line)] group-hover:bg-[var(--accent)] transition-colors shrink-0" />
                  {item.label}
                </span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[var(--muted)] group-hover:text-[var(--accent)] group-hover:translate-x-[2px] transition-all shrink-0"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
