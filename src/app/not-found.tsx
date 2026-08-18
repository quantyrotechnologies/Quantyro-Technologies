import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

const QUICK_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function NotFound() {
  return (
    <section className="relative px-[6vw] pt-[180px] pb-[120px] z-10 text-center">
      <div className="mono text-[13px] text-[var(--accent)] font-semibold mb-[16px]">404</div>
      <h1 className="text-[clamp(30px,5vw,52px)] font-[var(--font-display)] font-bold leading-[1.1] text-[var(--ink)]">
        This page doesn&apos;t exist.
      </h1>
      <p className="mt-[16px] max-w-[440px] mx-auto text-[var(--muted)] text-[15px] leading-[1.7]">
        The link may be broken, or the page may have moved. Try one of these instead:
      </p>
      <nav aria-label="Quick links" className="mt-[32px] flex flex-wrap items-center justify-center gap-[10px]">
        {QUICK_LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="mono text-[12.5px] px-[16px] py-[8px] rounded-full border border-[var(--line)] text-[var(--ink)]/80 hover:text-[var(--accent)] hover:border-[rgba(23,104,214,0.4)] transition-colors"
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </section>
  );
}
