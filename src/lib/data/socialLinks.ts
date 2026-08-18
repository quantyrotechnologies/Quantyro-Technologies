import { unstable_cache } from 'next/cache';
import { createPublicClient } from '@/lib/supabase/public';
import type { SocialLink } from '@/lib/types';

async function fetchSocialLinks(): Promise<SocialLink[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('social_links')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('[getSocialLinks] failed', error);
    return [];
  }
  return (data ?? []).map((row) => ({ id: row.id, label: row.label, href: row.href }));
}

export const getSocialLinks = unstable_cache(fetchSocialLinks, ['social-links'], {
  tags: ['social-links'],
  revalidate: 60,
});
