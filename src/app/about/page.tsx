import type { Metadata } from 'next';
import AboutContent from '@/components/AboutContent';

export const metadata: Metadata = {
  title: 'About',
  description: 'Quantyro Technologies is a global software engineering partner with senior teams across North America, Europe, South Asia and APAC.',
};

export default function AboutPage() {
  return <AboutContent />;
}
