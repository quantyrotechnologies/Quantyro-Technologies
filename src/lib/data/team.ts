import { unstable_cache } from 'next/cache';
import { createPublicClient } from '@/lib/supabase/public';
import type { TeamMember } from '@/lib/types';

const DEFAULT_TEAM: TeamMember[] = [
  {
    id: 'chirag-kumar',
    name: 'Chirag Kumar',
    role: 'Founder & Lead Full-Stack Architect',
    bio: 'Full-Stack Software Engineer with 2.5+ years of production experience building high-scale distributed applications. Specialist in modern MERN stack, Python backend services, Next.js 15, and cloud DevOps systems.',
    photoUrl: '/images/team/chirag-kumar.jpg',
    linkedinUrl: null,
    skills: ['MERN Stack', 'Python', 'Next.js 15', 'React 19', 'Node.js', 'MongoDB', 'PostgreSQL', 'Tailwind CSS', 'Docker & Cloud'],
    experience: '2.5+ Years Exp',
  },
  {
    id: 'manohar-kumar-singh',
    name: 'Manohar Kumar Singh',
    role: 'Senior Full-Stack & Backend Engineer',
    bio: 'Senior Full-Stack Engineer with 3+ years of production experience building enterprise web platforms, robust REST/GraphQL APIs, and high-performance backend systems. Specialist in MERN stack, Node.js, Next.js 15, and database optimizations.',
    photoUrl: '/images/team/manohar-kumar-singh.jpg',
    linkedinUrl: null,
    skills: ['MERN Stack', 'Node.js & Express', 'Next.js 15 & React 19', 'PostgreSQL & MongoDB', 'REST & GraphQL APIs', 'TypeScript & Tailwind', 'Docker & Cloud CI/CD'],
    experience: '3+ Years Exp',
  },
];

async function fetchTeamMembers(): Promise<TeamMember[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return DEFAULT_TEAM;
    }

    const mapped: TeamMember[] = data.map((row) => {
      const name = (row.name as string) || '';
      const n = name.toLowerCase();
      let photoUrl = (row.photo_url as string | null) ?? null;
      let skills = (row.skills as string[] | null) ?? null;
      let experience = (row.experience as string | null) ?? null;

      if (n.includes('chirag')) {
        photoUrl = photoUrl || '/images/team/chirag-kumar.jpg';
        skills = (skills && skills.length > 0) ? skills : ['MERN Stack', 'Python', 'Next.js 15', 'React 19', 'Node.js', 'MongoDB', 'PostgreSQL'];
        experience = experience || '2.5+ Years Exp';
      } else if (n.includes('manohar')) {
        photoUrl = photoUrl || '/images/team/manohar-kumar-singh.jpg';
        skills = (skills && skills.length > 0) ? skills : ['MERN Stack', 'Node.js & Express', 'Next.js 15 & React 19', 'PostgreSQL & MongoDB', 'REST & GraphQL APIs', 'Docker & Cloud CI/CD'];
        experience = experience || '3+ Years Exp';
      }

      return {
        id: row.id as string,
        name,
        role: row.role as string,
        bio: (row.bio as string | null) ?? null,
        photoUrl,
        linkedinUrl: null,
        skills,
        experience,
      };
    });

    // Ensure core members are included
    const result = [...mapped];
    DEFAULT_TEAM.forEach((def) => {
      if (!result.some((m) => m.name.toLowerCase().includes(def.name.toLowerCase().split(' ')[0]))) {
        result.push(def);
      }
    });

    return result;
  } catch (err) {
    console.error('[getTeamMembers] fallback', err);
    return DEFAULT_TEAM;
  }
}

export const getTeamMembers = unstable_cache(fetchTeamMembers, ['team-members'], {
  tags: ['team-members'],
  revalidate: 60,
  });
