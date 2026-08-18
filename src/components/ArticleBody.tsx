import React from 'react';

interface ArticleBodyProps {
  content: string;
}

export interface TocHeading {
  id: string;
  label: string;
  level: number;
}

export function extractHeadings(markdown: string): TocHeading[] {
  const lines = markdown.split('\n');
  const headings: TocHeading[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('## ')) {
      const label = trimmed.replace(/^##\s+/, '');
      const id = label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      headings.push({ id, label, level: 2 });
    } else if (trimmed.startsWith('### ')) {
      const label = trimmed.replace(/^###\s+/, '');
      const id = label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      headings.push({ id, label, level: 3 });
    } else if (trimmed.startsWith('#### ')) {
      const label = trimmed.replace(/^####\s+/, '');
      const id = label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      headings.push({ id, label, level: 4 });
    } else if (trimmed.startsWith('##### ')) {
      const label = trimmed.replace(/^#####\s+/, '');
      const id = label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      headings.push({ id, label, level: 5 });
    }
  }

  return headings;
}

export default function ArticleBody({ content }: ArticleBodyProps) {
  const blocks = content.split(/\n\s*\n/).filter(Boolean);

  return (
    <div className="article-body flex flex-col gap-[20px] text-[16.5px] text-[var(--ink)]/90 leading-[1.8]">
      {blocks.map((block, index) => {
        const trimmed = block.trim();

        // H2 Heading
        if (trimmed.startsWith('## ')) {
          const text = trimmed.replace(/^##\s+/, '');
          const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          return (
            <h2
              key={index}
              id={id}
              className="mt-[32px] pt-[12px] text-[26px] md:text-[30px] font-[var(--font-display)] font-bold text-[var(--ink)] tracking-tight scroll-mt-28 border-b border-[var(--line)] pb-[12px]"
            >
              {text}
            </h2>
          );
        }

        // H3 Heading
        if (trimmed.startsWith('### ')) {
          const text = trimmed.replace(/^###\s+/, '');
          const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          return (
            <h3
              key={index}
              id={id}
              className="mt-[24px] text-[21px] md:text-[23px] font-[var(--font-display)] font-bold text-[var(--ink)] scroll-mt-28"
            >
              {text}
            </h3>
          );
        }

        // H4 Heading
        if (trimmed.startsWith('#### ')) {
          const text = trimmed.replace(/^####\s+/, '');
          const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          return (
            <h4
              key={index}
              id={id}
              className="mt-[18px] text-[18px] md:text-[19px] font-bold text-[var(--ink)] scroll-mt-28"
            >
              {text}
            </h4>
          );
        }

        // H5 Heading (Ensuring depth up to H5 as requested)
        if (trimmed.startsWith('##### ')) {
          const text = trimmed.replace(/^#####\s+/, '');
          const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          return (
            <h5
              key={index}
              id={id}
              className="mt-[14px] text-[15px] font-mono font-semibold uppercase tracking-wider text-[var(--accent)] scroll-mt-28"
            >
              {text}
            </h5>
          );
        }

        // Bullet list
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const items = trimmed.split('\n').filter((l) => l.trim().startsWith('- ') || l.trim().startsWith('* '));
          return (
            <ul key={index} className="my-[8px] flex flex-col gap-[10px] pl-[6px]">
              {items.map((item, i) => {
                const raw = item.replace(/^[-*]\s+/, '');
                // Handle bold prefix e.g. **Bold**: text
                const boldMatch = raw.match(/^\*\*(.+?)\*\*:\s*(.+)$/);
                if (boldMatch) {
                  return (
                    <li key={i} className="flex items-start gap-[10px] text-[15.5px] leading-[1.65]">
                      <span className="mt-[8px] w-[6px] h-[6px] rounded-full bg-[var(--accent)] shrink-0" />
                      <span>
                        <strong className="font-semibold text-[var(--ink)]">{boldMatch[1]}:</strong>{' '}
                        {boldMatch[2]}
                      </span>
                    </li>
                  );
                }
                return (
                  <li key={i} className="flex items-start gap-[10px] text-[15.5px] leading-[1.65]">
                    <span className="mt-[8px] w-[6px] h-[6px] rounded-full bg-[var(--accent)] shrink-0" />
                    <span>{raw}</span>
                  </li>
                );
              })}
            </ul>
          );
        }

        // Regular paragraph
        return (
          <p key={index} className="text-[16px] md:text-[17px] text-[var(--ink)]/85 leading-[1.75]">
            {trimmed}
          </p>
        );
      })}
    </div>
  );
}
