import { unstable_cache } from 'next/cache';
import { createPublicClient } from '@/lib/supabase/public';
import type { TeamMember } from '@/lib/types';

async function fetchTeamMembers(): Promise<TeamMember[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('[getTeamMembers] failed', error);
      return [];
    }

    return (data ?? []).map((row) => ({
      id: row.id,
      name: row.name,
      role: row.role,
      bio: row.bio ?? null,
      photoUrl: row.photo_url ?? null,
      linkedinUrl: row.linkedin_url ?? null,
    }));
  } catch (err) {
    console.error('[getTeamMembers] failed', err);
    return [];
  }
}

export const getTeamMembers = unstable_cache(fetchTeamMembers, ['team-members'], {
  tags: ['team-members'],
  revalidate: 60,
});
