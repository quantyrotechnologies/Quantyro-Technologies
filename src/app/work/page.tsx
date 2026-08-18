import type { Metadata } from 'next';
import WorkContent from '@/components/WorkContent';
import { getProjects } from '@/lib/data/projects';
import { getFaqs } from '@/lib/data/faqs';

export const metadata: Metadata = {
  title: 'Case Studies & Client Work',
  description: 'Case studies from Quantyro Technologies engagements across North America, Europe, APAC and South Asia — real clients, results and the stack behind each build.',
  alternates: { canonical: '/work' },
};

export default async function WorkPage() {
  const [projects, faqs] = await Promise.all([getProjects(), getFaqs('work')]);
  return <WorkContent projects={projects} faqs={faqs} />;
}
