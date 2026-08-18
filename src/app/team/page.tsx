import type { Metadata } from 'next';
import TeamContent from '@/components/TeamContent';
import { getTeamMembers } from '@/lib/data/team';
import { getFaqs } from '@/lib/data/faqs';

export const metadata: Metadata = {
  title: 'Our Team',
  description: 'Meet the senior engineers, architects, and specialists behind Quantyro Technologies.',
  alternates: { canonical: '/team' },
};

export default async function TeamPage() {
  const [team, faqs] = await Promise.all([
    getTeamMembers(),
    getFaqs('team'),
  ]);
  return <TeamContent team={team} faqs={faqs} />;
}
