"use client";
import React, { useState } from 'react';
import RichText from './RichText';
import { stripHtml } from '@/lib/stripHtml';

export interface FaqItem {
  q: string;
  a: string;
}

export default function FaqSection({ items, heading = 'Frequently asked questions' }: { items: FaqItem[]; heading?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: stripHtml(item.a),
      },
    })),
  };

  return (
    <section className="relative px-[6vw] pb-[100px] z-10" aria-labelledby="faq-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h2 id="faq-heading" className="max-w-[900px] mx-auto mono text-[12px] text-[var(--muted)] mb-[24px]">
        {heading}
      </h2>
      <div className="max-w-[900px] mx-auto flex flex-col gap-[10px]">
        {items.map((item, i) => {
          const open = openIndex === i;
          return (
            <div
              key={item.q}
              className="rounded-[16px] border border-[var(--line)] bg-[var(--surface)] overflow-hidden"
            >
              <h3>
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  className="w-full flex items-center justify-between gap-[16px] text-left px-[20px] py-[16px] text-[15px] font-semibold text-[var(--ink)]"
                >
                  <span>{item.q}</span>
                  <span
                    className={`shrink-0 w-[20px] h-[20px] flex items-center justify-center text-[var(--muted)] transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
                    aria-hidden
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
              </h3>
              <div
                className="grid transition-[grid-template-rows] duration-300 ease-out"
                style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
              >
                <div className="overflow-hidden">
                  <div className="px-[20px] pb-[18px] text-[14px] text-[var(--muted)] leading-[1.65]">
                    <RichText html={item.a} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
