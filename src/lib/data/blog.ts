import { unstable_cache } from 'next/cache';
import { createPublicClient } from '@/lib/supabase/public';
import type { BlogPost, BlogComment } from '@/lib/types';

function mapPost(row: Record<string, unknown>): BlogPost {
  return {
    id: row.id as string,
    slug: row.slug as string,
    title: row.title as string,
    excerpt: row.excerpt as string,
    content: row.content as string,
    authorName: row.author_name as string,
    publishedAt: (row.published_at as string) ?? null,
    seoTitle: (row.seo_title as string) ?? null,
    seoDescription: (row.seo_description as string) ?? null,
    tags: (row.tags as string[]) ?? [],
    accent: (row.accent as 'accent' | 'accent-2') ?? 'accent',
  };
}

async function fetchPublishedPosts(): Promise<BlogPost[]> {
  const supabase = createPublicClient();
  // RLS already restricts anon reads to published (or due-scheduled) posts,
  // but the explicit filter here keeps the app-level intent obvious too.
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .or(`status.eq.published,and(status.eq.scheduled,published_at.lte.${new Date().toISOString()})`)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('[getPublishedPosts] failed', error);
    return [];
  }
  return (data ?? []).map(mapPost);
}

export const getPublishedPosts = unstable_cache(fetchPublishedPosts, ['blog-posts'], {
  tags: ['blog-posts'],
  revalidate: 60,
});

async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error || !data) return null;
  return mapPost(data);
}

export const getPostBySlug = unstable_cache(fetchPostBySlug, ['blog-post-by-slug'], {
  tags: ['blog-posts'],
  revalidate: 60,
});

async function fetchApprovedComments(postId: string): Promise<BlogComment[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('blog_comments')
    .select('*')
    .eq('post_id', postId)
    .eq('status', 'approved')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('[getApprovedComments] failed', error);
    return [];
  }
  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    comment: row.comment,
    createdAt: row.created_at,
  }));
}

export const getApprovedComments = unstable_cache(fetchApprovedComments, ['blog-comments'], {
  tags: ['blog-comments'],
  revalidate: 60,
});
