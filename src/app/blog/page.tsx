import type { Metadata } from 'next';
import { getPublishedPosts } from '@/lib/data/blog';
import FaqSection from '@/components/FaqSection';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getFaqs } from '@/lib/data/faqs';
import BlogListingClient from '@/components/BlogListingClient';

export const metadata: Metadata = {
  title: 'Engineering Blog & Software Insights',
  description: 'Technical breakdowns on software architecture, AI systems, cloud scalability, and fullstack performance by Quantyro Technologies engineers.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Engineering Blog & Software Insights — Quantyro Technologies',
    description: 'Technical breakdowns on software architecture, AI systems, and cloud scalability.',
    url: '/blog',
    type: 'website',
  },
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  const [allPosts, faqs] = await Promise.all([getPublishedPosts(), getFaqs('blog')]);
  const allTags = Array.from(new Set(allPosts.flatMap((p) => p.tags || []))).sort();

  return (
    <div className="relative min-h-screen">
      {/* Background radial accent glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-[var(--accent)]/10 via-[var(--accent-2)]/5 to-transparent blur-3xl -z-10"
        aria-hidden="true"
      />

      {/* Hero Header Section */}
      <section className="relative px-[6vw] pt-[140px] md:pt-[170px] pb-[30px] z-10">
        <div className="max-w-[1240px] mx-auto">
          <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }]} />
          
          <div className="inline-flex items-center gap-[8px] mono text-[12px] uppercase font-semibold text-[var(--accent)] px-[12px] py-[5px] rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 mb-[22px]">
            <span className="w-[6px] h-[6px] rounded-full bg-[var(--accent)] animate-pulse" />
            Engineering & Technology News
          </div>

          <h1 className="text-[clamp(34px,5.5vw,68px)] max-w-[22ch] font-[var(--font-display)] font-bold leading-[1.04] text-[var(--ink)] tracking-tight">
            News & Insights on Website &amp; Software Development
          </h1>

          <p className="mt-[20px] max-w-[620px] text-[var(--muted)] text-[16px] md:text-[17.5px] leading-[1.65]">
            Architectural blueprints, production post-mortems, and technical strategies — written by the engineers building the software.
          </p>
        </div>
      </section>

      {/* Main Blog Listing Section */}
      <section className="relative px-[6vw] pb-[80px] z-10">
        <div className="max-w-[1240px] mx-auto">
          <BlogListingClient
            initialPosts={allPosts}
            allTags={allTags}
            initialTag={tag}
          />
        </div>
      </section>

      {/* FAQ Section (3+ FAQs for SEO and AI Search engines) */}
      <FaqSection heading="Frequently Asked Questions about our Engineering Blog" items={faqs} />
    </div>
  );
}

