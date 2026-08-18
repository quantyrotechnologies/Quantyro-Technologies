import { unstable_cache } from 'next/cache';
import { createPublicClient } from '@/lib/supabase/public';
import type { Testimonial } from '@/lib/types';

async function fetchTestimonials(): Promise<Testimonial[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('[getTestimonials] failed', error);
    return [];
  }
  return (data ?? []).map((row) => ({
    id: row.id,
    quote: row.quote,
    name: row.name,
    role: row.role,
    company: row.company,
    initials: row.initials,
    avatarBg: row.avatar_bg,
    avatarFg: row.avatar_fg,
  }));
}

export const getTestimonials = unstable_cache(fetchTestimonials, ['testimonials'], {
  tags: ['testimonials'],
  revalidate: 60,
});
