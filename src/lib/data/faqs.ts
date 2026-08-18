import { unstable_cache } from 'next/cache';
import { createPublicClient } from '@/lib/supabase/public';
import type { FaqItem } from '@/components/FaqSection';

async function fetchFaqs(pageSlug: string): Promise<FaqItem[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .eq('page_slug', pageSlug)
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('[getFaqs] failed', error);
    return [];
  }
  return (data ?? []).map((row) => ({ q: row.question, a: row.answer }));
}

export const getFaqs = unstable_cache(fetchFaqs, ['faqs'], {
  tags: ['faqs'],
  revalidate: 60,
});
