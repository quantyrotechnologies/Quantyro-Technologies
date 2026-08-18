interface TocItem {
  id: string;
  label: string;
}

export default function TableOfContents({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="rounded-[16px] border border-[var(--line)] bg-[var(--surface)] p-[16px] mb-[40px]">
      <h2 className="px-[8px] text-[11px] font-mono font-semibold uppercase tracking-wide text-[var(--muted)] mb-[8px]">
        On this page
      </h2>
      <ul className="flex flex-col gap-[2px]">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="group flex items-center justify-between gap-[10px] rounded-[10px] px-[8px] py-[8px] text-[14px] font-medium text-[var(--ink)] hover:bg-[rgba(23,104,214,0.06)] hover:text-[var(--accent)] transition-colors"
            >
              <span className="flex items-center gap-[8px]">
                <span className="w-[6px] h-[6px] rounded-full bg-[var(--line)] group-hover:bg-[var(--accent)] transition-colors shrink-0" />
                {item.label}
              </span>
              <svg
                width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                className="text-[var(--muted)] group-hover:text-[var(--accent)] group-hover:translate-x-[2px] transition-all shrink-0"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
