import type { Metadata } from 'next';
import ServicesContent from '@/components/ServicesContent';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Custom software, AI & machine learning, cloud & DevOps, mobile apps and e-commerce — full-stack engineering delivered by senior teams.',
};

export default function ServicesPage() {
  return <ServicesContent />;
}
