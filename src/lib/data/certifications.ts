import { unstable_cache } from 'next/cache';
import { createPublicClient } from '@/lib/supabase/public';
import type { Certification } from '@/lib/types';

async function fetchCertifications(): Promise<Certification[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('certifications')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('[getCertifications] failed', error);
    return [];
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    issuer: row.issuer,
    issueDate: row.issue_date,
    credentialUrl: row.credential_url,
  }));
}

export const getCertifications = unstable_cache(fetchCertifications, ['certifications'], {
  tags: ['certifications'],
  revalidate: 60,
});
