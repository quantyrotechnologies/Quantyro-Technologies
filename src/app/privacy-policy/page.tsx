import type { Metadata } from 'next';
import LegalContent from '@/components/LegalContent';
import { getSiteSettings } from '@/lib/data/siteSettings';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Quantyro Technologies collects, uses, and protects your personal information.',
  alternates: { canonical: '/privacy-policy' },
};

const LAST_UPDATED = 'August 18, 2026';

export default async function PrivacyPolicyPage() {
  const settings = await getSiteSettings();

  const defaultContent = `
## Overview

${settings.orgName} ("we," "us," or "our") respects your privacy. This policy explains what information we collect when you visit ${settings.url} or work with us, how we use it, and the choices you have.

## Information We Collect

- **Contact form submissions**: name, email, company, and any message content you submit through our contact form.
- **Blog comments**: name, email, and comment content when you post a comment on our blog.
- **Usage data**: pages visited, referral source, device and browser type, and approximate location, collected automatically through standard web analytics.
- **Cookies**: small files stored in your browser to support core site functionality and, where enabled, analytics.

We do not collect payment information, government ID numbers, or sensitive personal data through this website.

## How We Use Your Information

- To respond to inquiries submitted through our contact form.
- To moderate and display blog comments.
- To understand site usage and improve content, performance, and navigation.
- To maintain the security and proper functioning of the site.

We do not sell your personal information to third parties.

## Cookies & Tracking Technologies

We use cookies and similar technologies for essential site functionality and, where configured, aggregated analytics. You can control or disable cookies through your browser settings; disabling them may affect some site features.

## Third-Party Services

We use third-party infrastructure providers to operate this site, including hosting and database services (Supabase) and, where applicable, analytics and search-console tooling. These providers process data on our behalf under their own privacy and security terms, and we select providers that maintain industry-standard security practices.

## Data Retention

We retain contact form submissions and blog comments for as long as reasonably necessary to respond to your inquiry, maintain business records, or comply with legal obligations, after which they may be deleted or anonymized.

## Your Rights

Depending on your location, you may have the right to request access to, correction of, or deletion of your personal information, or to object to certain processing. To exercise any of these rights, contact us using the details below.

## Data Security

We apply reasonable technical and organizational measures — including encrypted data transmission and access controls — to protect the information we hold. No method of transmission or storage is 100% secure, and we cannot guarantee absolute security.

## Children's Privacy

This site is not directed at children under 16, and we do not knowingly collect personal information from children.

## International Data Transfers

Our infrastructure providers may process and store data in countries other than your own. Where this occurs, we rely on providers that maintain appropriate safeguards for cross-border data transfer.

## Changes to This Policy

We may update this policy from time to time. Material changes will be reflected by an updated "Last updated" date at the top of this page.

## Contact Us

Questions about this policy or your data can be sent to **${settings.contactEmail}**.
`.trim();

  const content = settings.privacyPolicy && settings.privacyPolicy.trim().length > 50
    ? settings.privacyPolicy
    : defaultContent;

  return <LegalContent title="Privacy Policy" href="/privacy-policy" lastUpdated={LAST_UPDATED} content={content} />;
}
