import { unstable_cache } from 'next/cache';
import { createPublicClient } from '@/lib/supabase/public';
import type { RoadmapStep } from '@/lib/types';

async function fetchRoadmapSteps(): Promise<RoadmapStep[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('roadmap_steps')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('[getRoadmapSteps] failed', error);
    return [];
  }
  return (data ?? []).map((row) => ({
    id: row.id,
    step: row.step,
    phaseTag: row.phase_tag,
    badge: row.badge,
    title: row.title,
    desc: row.description,
    deliverables: row.deliverables ?? [],
    status: row.status,
    terminalCmd: row.terminal_cmd,
    terminalOutput: row.terminal_output,
    iconKey: row.icon_key,
  }));
}

export const getRoadmapSteps = unstable_cache(fetchRoadmapSteps, ['roadmap-steps'], {
  tags: ['roadmap-steps'],
  revalidate: 60,
});
