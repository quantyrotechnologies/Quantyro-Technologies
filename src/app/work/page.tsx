import type { Metadata } from 'next';
import WorkContent from '@/components/WorkContent';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Case studies from Quantyro Technologies engagements across North America, Europe, APAC and South Asia.',
};

export default function WorkPage() {
  return <WorkContent />;
}
