import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getPublishedPosts } from '@/lib/data/blog';
import FaqSection from '@/components/FaqSection';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getFaqs } from '@/lib/data/faqs';
import { patternImageForSlug } from '@/lib/patternImage';

export const metadata: Metadata = {
  title: 'Engineering Blog',
  description: 'Notes on shipping software — architecture, delivery, and what actually moves the needle for our clients, written by the engineers doing the work.',
  // Always canonical to the base listing, regardless of any ?tag= filter —
  // tag views are thin/duplicate variants of this same page, not distinct content.
  alternates: { canonical: '/blog' },
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  const [allPosts, faqs] = await Promise.all([getPublishedPosts(), getFaqs('blog')]);
  const allTags = Array.from(new Set(allPosts.flatMap((p) => p.tags))).sort();
  const posts = tag ? allPosts.filter((p) => p.tags.includes(tag)) : allPosts;

  return (
    <div>
      <section className="relative px-[6vw] pt-[160px] pb-[60px] z-10">
        <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }]} />
        <div className="mono text-[12px] text-[var(--muted)] mb-[20px]">Blog</div>
        <h1 className="text-[clamp(36px,6vw,72px)] max-w-[18ch] font-[var(--font-display)] font-bold leading-[1]">
          Notes on shipping software.
        </h1>
        <p className="mt-[24px] max-w-[560px] text-[var(--muted)] text-[16px] leading-[1.7]">
          Architecture, delivery, and what actually moves the needle — written by the engineers doing the work.
        </p>
      </section>

      <section className="relative px-[6vw] pb-[100px] z-10">
        {allTags.length > 0 && (
          <nav aria-label="Filter posts by topic" className="mb-[28px] flex flex-wrap gap-[8px]">
            <Link
              href="/blog"
              className={`mono text-[11.5px] px-[12px] py-[6px] rounded-full border transition-colors ${
                !tag
                  ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                  : 'border-[var(--line)] text-[var(--muted)] hover:text-[var(--accent)] hover:border-[rgba(23,104,214,0.4)]'
              }`}
            >
              All
            </Link>
            {allTags.map((t) => (
              <Link
                key={t}
                href={`/blog?tag=${encodeURIComponent(t)}`}
                className={`mono text-[11.5px] px-[12px] py-[6px] rounded-full border transition-colors ${
                  tag === t
                    ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                    : 'border-[var(--line)] text-[var(--muted)] hover:text-[var(--accent)] hover:border-[rgba(23,104,214,0.4)]'
                }`}
              >
                {t}
              </Link>
            ))}
          </nav>
        )}

        {posts.length === 0 ? (
          <p className="text-[14px] text-[var(--muted)]">
            {tag ? `No posts tagged "${tag}" yet.` : 'No posts yet — check back soon.'}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
            {posts.map((p) => (
              <Link
                key={p.id}
                href={`/blog/${p.slug}`}
                className="rounded-[22px] bg-[var(--surface)] border border-[var(--line)] overflow-hidden hover:border-[rgba(23,104,214,0.4)] hover:shadow-[0_16px_40px_rgba(23,104,214,0.12)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative h-[140px] overflow-hidden bg-[var(--bg-alt)]">
                  <Image
                    src={patternImageForSlug(p.slug)}
                    alt={`${p.title} — cover illustration`}
                    title={p.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-[24px]">
                  <div className="flex items-center justify-between text-[12px] text-[var(--muted)] mono">
                    <span>{p.authorName}</span>
                    {p.publishedAt && <span>{new Date(p.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>}
                  </div>
                  <h2 className="mt-[10px] text-[19px] font-[var(--font-display)] font-bold text-[var(--ink)]">{p.title}</h2>
                  <p className="mt-[8px] text-[13.5px] text-[var(--muted)] leading-[1.6]">{p.excerpt}</p>
                  {p.tags.length > 0 && (
                    <div className="mt-[12px] flex flex-wrap gap-[6px]">
                      {p.tags.map((t) => (
                        <span key={t} className="mono text-[10.5px] px-[9px] py-[3px] rounded-full border border-[var(--line)] text-[var(--muted)]">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  <span className="mt-[14px] inline-flex items-center gap-[5px] text-[12.5px] font-semibold text-[var(--accent)]">
                    Read more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <FaqSection heading="Blog FAQ" items={faqs} />
    </div>
  );
}
