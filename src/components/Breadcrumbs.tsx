import Link from 'next/link';
import { SITE_URL } from '@/lib/site';

interface Crumb {
  label: string;
  href: string;
}

/** Pass the trail after Home — Home is prepended automatically. */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const allItems: Crumb[] = [{ label: 'Home', href: '/' }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: `${SITE_URL}${item.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="flex items-center gap-[6px] text-[12px] text-[var(--muted)] mb-[14px]">
        {allItems.map((item, i) => {
          const isLast = i === allItems.length - 1;
          return (
            <span key={item.href} className="flex items-center gap-[6px]">
              {i > 0 && <span aria-hidden>/</span>}
              {isLast ? (
                <span className="text-[var(--ink)] font-medium" aria-current="page">{item.label}</span>
              ) : (
                <Link href={item.href} className="hover:text-[var(--accent)] transition-colors">{item.label}</Link>
              )}
            </span>
          );
        })}
      </nav>
    </>
  );
}
