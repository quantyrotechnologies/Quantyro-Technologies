import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getApprovedComments, getRelatedPosts } from '@/lib/data/blog';
import { getFaqs } from '@/lib/data/faqs';
import BlogCommentForm from '@/components/BlogCommentForm';
import Breadcrumbs from '@/components/Breadcrumbs';
import TableOfContents from '@/components/TableOfContents';
import FaqSection from '@/components/FaqSection';
import BlogCard from '@/components/BlogCard';
import ArticleBody, { extractHeadings } from '@/components/ArticleBody';
import { SITE_URL } from '@/lib/site';
import { patternImageForSlug } from '@/lib/patternImage';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      url: `/blog/${slug}`,
      type: 'article',
      publishedTime: post.publishedAt || undefined,
      authors: [post.authorName],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const [comments, faqs, relatedPosts] = await Promise.all([
    getApprovedComments(post.id),
    getFaqs('blog-post'),
    getRelatedPosts(post.slug, post.tags, 3),
  ]);

  const coverImage = `${SITE_URL}${patternImageForSlug(post.slug)}`;
  const tocHeadings = extractHeadings(post.content);
  
  // Calculate reading time
  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'Recent Publication';

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    articleBody: post.content,
    image: coverImage,
    author: {
      "@type": "Organization",
      name: post.authorName || "Quantyro Technologies",
      url: SITE_URL,
    },
    datePublished: post.publishedAt ?? undefined,
    dateModified: post.publishedAt ?? undefined,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
    publisher: {
      "@type": "Organization",
      name: "Quantyro Technologies",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo.jpeg`,
      },
    },
  };

  return (
    <div className="relative min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Header Section */}
      <section className="relative px-[6vw] pt-[140px] md:pt-[170px] pb-[40px] z-10">
        <div className="max-w-[1240px] mx-auto">
          <Breadcrumbs
            items={[
              { label: 'Blog', href: '/blog' },
              { label: post.title, href: `/blog/${post.slug}` },
            ]}
          />

          {/* Date Badge and Metadata Bar */}
          <div className="flex flex-wrap items-center gap-[12px] mt-[16px] mb-[20px]">
            <span className="mono text-[12px] font-semibold px-[14px] py-[5px] rounded-full bg-[#0A1324] text-[#0EBCD4] border border-[#0EBCD4]/30 uppercase tracking-wider">
              {formattedDate}
            </span>
            <span className="mono text-[12px] text-[var(--muted)] flex items-center gap-[6px]">
              <span className="w-[4px] h-[4px] rounded-full bg-[var(--muted)]" />
              {readingTime} min read
            </span>
            <span className="mono text-[12px] text-[var(--muted)] flex items-center gap-[6px]">
              <span className="w-[4px] h-[4px] rounded-full bg-[var(--muted)]" />
              By {post.authorName}
            </span>
          </div>

          {/* H1 Headline */}
          <h1 className="text-[clamp(32px,5vw,56px)] max-w-[24ch] font-[var(--font-display)] font-bold leading-[1.08] text-[var(--ink)] tracking-tight">
            {post.title}
          </h1>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-[20px] flex flex-wrap gap-[8px]">
              {post.tags.map((t) => (
                <Link
                  key={t}
                  href={`/blog?tag=${encodeURIComponent(t)}`}
                  className="mono text-[11.5px] px-[12px] py-[5px] rounded-full bg-[var(--surface)] border border-[var(--line)] text-[var(--muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
                >
                  {t}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Main 2-Column Grid (Digital Marmalade layout) */}
      <section className="relative px-[6vw] pb-[80px] z-10">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-[48px] items-start">
          
          {/* LEFT MAIN ARTICLE COLUMN */}
          <article className="w-full">
            {/* Featured Cover Graphic */}
            <div className="relative h-[280px] md:h-[380px] rounded-[24px] overflow-hidden border border-[var(--line)] bg-[var(--bg-alt)] mb-[36px] shadow-sm">
              <Image
                src={patternImageForSlug(post.slug)}
                alt={`${post.title} — Quantyro Engineering Technical Case Study`}
                title={`${post.title} — Technical Architecture Illustration`}
                fill
                sizes="(min-width: 1024px) 800px, 100vw"
                className="object-cover"
                priority
              />
            </div>

            {/* Quick Answer / Key Takeaways Box for AI & Search Engine Rich Snippets */}
            <div className="mb-[36px] rounded-[18px] border border-[rgba(23,104,214,0.3)] bg-gradient-to-br from-[var(--surface)] to-[var(--bg-alt)] p-[24px] shadow-sm">
              <div className="flex items-center gap-[8px] mono text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] mb-[10px]">
                <span className="w-[6px] h-[6px] rounded-full bg-[var(--accent)]" />
                Executive Summary / Quick Answer
              </div>
              <p className="text-[15.5px] text-[var(--ink)]/90 leading-[1.65] font-medium">
                {post.excerpt}
              </p>
            </div>

            {/* On-Page SEO Table of Contents */}
            {tocHeadings.length > 0 && (
              <TableOfContents items={tocHeadings} />
            )}

            {/* Rich Article Body with Semantic H2 -> H5 Hierarchy */}
            <ArticleBody content={post.content} />

            {/* Comments Section */}
            <div className="mt-[56px] pt-[40px] border-t border-[var(--line)]">
              <h2 className="text-[18px] font-bold font-[var(--font-display)] text-[var(--ink)] mb-[20px]">
                {comments.length > 0 ? `Discussion & Comments (${comments.length})` : 'Join the Discussion'}
              </h2>

              {comments.length > 0 && (
                <div className="mb-[32px] flex flex-col gap-[16px]">
                  {comments.map((c) => (
                    <div
                      key={c.id}
                      className="rounded-[16px] border border-[var(--line)] bg-[var(--surface)] p-[20px]"
                    >
                      <div className="flex items-center justify-between text-[12.5px]">
                        <span className="font-semibold text-[var(--ink)]">{c.name}</span>
                        <span className="mono text-[var(--muted)]">
                          {new Date(c.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                      <p className="mt-[10px] text-[14.5px] text-[var(--muted)] leading-[1.6]">
                        {c.comment}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <BlogCommentForm postId={post.id} />
            </div>
          </article>

          {/* RIGHT STICKY SIDEBAR (Digital Marmalade style) */}
          <aside className="w-full lg:sticky lg:top-[100px] flex flex-col gap-[32px]">
            {/* Back to News Pill Button */}
            <Link
              href="/blog"
              className="group flex items-center justify-center gap-[10px] w-full py-[14px] px-[20px] rounded-full border border-[var(--line)] bg-[var(--surface)] text-[14px] font-semibold text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:shadow-md transition-all duration-300"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:-translate-x-1"
              >
                <path d="M19 12H5" />
                <path d="m12 19-7-7 7-7" />
              </svg>
              <span>Back to all insights</span>
            </Link>

            {/* Related Articles Box */}
            {relatedPosts.length > 0 && (
              <div className="rounded-[24px] border border-[var(--line)] bg-[var(--surface)] p-[24px]">
                <h3 className="mono text-[12px] font-bold uppercase tracking-wider text-[var(--muted)] mb-[18px]">
                  Related Insights
                </h3>
                <div className="flex flex-col gap-[16px]">
                  {relatedPosts.map((related) => (
                    <BlogCard key={related.id} post={related} compact={true} />
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>

      {/* FAQ Section (3+ FAQs on every page) */}
      <FaqSection
        heading="Frequently Asked Questions about this Topic"
        items={faqs}
      />
    </div>
  );
}

