import React from 'react';
import type { Metadata } from 'next';
import ThankYouContent from '@/components/ThankYouContent';

export const metadata: Metadata = {
  title: 'Thank You — Quantyro Technologies',
  description: 'Thank you for contacting Quantyro Technologies. Our engineering squad will review your requirements and respond within 24 hours.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return <ThankYouContent />;
}

