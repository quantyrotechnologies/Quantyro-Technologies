import type { Metadata } from 'next';
import CertificationsContent from '@/components/CertificationsContent';
import { getCertifications } from '@/lib/data/certifications';
import { getFaqs } from '@/lib/data/faqs';

export const metadata: Metadata = {
  title: 'Certifications',
  description: 'The certifications backing Quantyro Technologies’ engineering, cloud, and security practice — verifiable credentials, not just claims.',
  alternates: { canonical: '/certifications' },
};

export default async function CertificationsPage() {
  const [certifications, faqs] = await Promise.all([
    getCertifications(),
    getFaqs('certifications'),
  ]);
  return <CertificationsContent certifications={certifications} faqs={faqs} />;
}
