import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPostBySlug, getApprovedComments } from '@/lib/data/blog';
import BlogCommentForm from '@/components/BlogCommentForm';
import Breadcrumbs from '@/components/Breadcrumbs';
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
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const comments = await getApprovedComments(post.id);
  const paragraphs = post.content.split(/\n\s*\n/).filter(Boolean);
  const coverImage = `${SITE_URL}${patternImageForSlug(post.slug)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    articleBody: post.content,
    image: coverImage,
    author: { "@type": "Organization", name: post.authorName },
    datePublished: post.publishedAt ?? undefined,
    dateModified: post.publishedAt ?? undefined,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
    publisher: { "@type": "Organization", name: "Quantyro Technologies" },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="relative h-[220px] md:h-[280px] mt-[80px] overflow-hidden bg-[var(--bg-alt)]">
        <Image
          src={patternImageForSlug(post.slug)}
          alt={`${post.title} — cover illustration`}
          title={post.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      <article className="relative px-[6vw] pt-[40px] pb-[60px] z-10 max-w-[720px] mx-auto">
        <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }, { label: post.title, href: `/blog/${post.slug}` }]} />
        <div className="flex items-center gap-[10px] text-[12px] text-[var(--muted)] mono">
          <span>{post.authorName}</span>
          {post.publishedAt && (
            <>
              <span>·</span>
              <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </>
          )}
        </div>
        <h1 className="mt-[16px] text-[clamp(30px,5vw,48px)] font-[var(--font-display)] font-bold leading-[1.1] text-[var(--ink)]">
          {post.title}
        </h1>

        {post.tags.length > 0 && (
          <div className="mt-[16px] flex flex-wrap gap-[8px]">
            {post.tags.map((t) => (
              <a
                key={t}
                href={`/blog?tag=${encodeURIComponent(t)}`}
                className="mono text-[11px] px-[10px] py-[4px] rounded-full border border-[var(--line)] text-[var(--muted)] hover:text-[var(--accent)] hover:border-[rgba(23,104,214,0.4)] transition-colors"
              >
                {t}
              </a>
            ))}
          </div>
        )}

        <div className="mt-[24px] rounded-[14px] border border-[var(--line)] bg-[var(--surface)] p-[18px]">
          <h2 className="text-[10.5px] font-mono font-semibold uppercase tracking-wide text-[var(--muted)] mb-[8px]">
            Quick answer
          </h2>
          <p className="text-[14.5px] text-[var(--ink)]/85 leading-[1.6]">{post.excerpt}</p>
        </div>

        <div className="mt-[32px] flex flex-col gap-[18px] text-[16px] text-[var(--ink)]/85 leading-[1.75]">
          {paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </article>

      <section className="relative px-[6vw] pb-[100px] z-10 max-w-[720px] mx-auto">
        <div className="border-t border-[var(--line)] pt-[36px]">
          <h2 className="text-[13px] font-mono font-semibold uppercase tracking-wide text-[var(--muted)] mb-[20px]">
            {comments.length > 0 ? `Comments (${comments.length})` : 'Comments'}
          </h2>

          {comments.length > 0 && (
            <div className="mb-[28px] flex flex-col gap-[16px]">
              {comments.map((c) => (
                <div key={c.id} className="rounded-[14px] border border-[var(--line)] bg-[var(--surface)] p-[16px]">
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="font-semibold text-[var(--ink)]">{c.name}</span>
                    <span className="mono text-[var(--muted)]">
                      {new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <p className="mt-[8px] text-[14px] text-[var(--muted)] leading-[1.6]">{c.comment}</p>
                </div>
              ))}
            </div>
          )}

          <BlogCommentForm postId={post.id} />
        </div>
      </section>
    </div>
  );
}
