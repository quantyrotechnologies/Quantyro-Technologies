import type { Metadata } from 'next';
import LegalContent from '@/components/LegalContent';
import { getSiteSettings } from '@/lib/data/siteSettings';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'The terms governing your use of the Quantyro Technologies website and engagement of our services.',
  alternates: { canonical: '/terms-and-conditions' },
};

const LAST_UPDATED = 'August 18, 2026';

export default async function TermsAndConditionsPage() {
  const settings = await getSiteSettings();

  const content = `
## Acceptance of Terms

By accessing ${settings.url} or engaging ${settings.orgName} for services, you agree to these Terms & Conditions. If you do not agree, please do not use this site or engage our services.

## Services Description

${settings.orgName} provides custom software, website, mobile app, AI/ML, cloud infrastructure, e-commerce, and SEO/marketing engineering services. The specific scope, deliverables, timeline, and cost of any engagement are defined in a separate written agreement or statement of work between ${settings.orgName} and the client — this website describes our general capabilities and does not itself constitute a service contract.

## Client Responsibilities

- Providing accurate, timely information, feedback, and access needed to complete the engaged work.
- Ensuring you have the necessary rights to any content, brand assets, or third-party accounts provided to us for a project.
- Reviewing and approving deliverables within the timeframes agreed in the applicable statement of work.

## Intellectual Property

Unless otherwise agreed in a signed statement of work, ownership of custom code, designs, and other deliverables created specifically for a client transfers to that client upon full payment. ${settings.orgName} retains the right to reuse general methodologies, frameworks, and non-client-specific components developed during an engagement, and may reference completed public-facing work in its own portfolio unless a client agreement states otherwise.

## Payment Terms

Payment terms, milestones, and schedules are set out in the applicable proposal, invoice, or statement of work agreed with each client. Late payment may result in a pause of active work until outstanding amounts are resolved.

## Confidentiality

Both parties agree to keep confidential any non-public business, technical, or financial information shared during an engagement, except where disclosure is required by law or separately authorized in writing.

## Limitation of Liability

To the maximum extent permitted by law, ${settings.orgName} is not liable for indirect, incidental, or consequential damages arising from use of this website or from services rendered, beyond the fees paid for the specific engagement giving rise to the claim.

## Warranties & Disclaimers

This website and its content are provided "as is" without warranties of any kind, express or implied. Specific service warranties, if any, are defined in the applicable client agreement rather than on this website.

## Termination

Either party may terminate an active engagement in accordance with the terms set out in the applicable statement of work. Work completed and accepted prior to termination remains payable.

## Governing Law

These terms are governed by the laws of the jurisdiction in which ${settings.orgName} is registered, without regard to conflict-of-law principles, unless otherwise specified in a signed client agreement.

## Changes to These Terms

We may update these terms from time to time. Material changes will be reflected by an updated "Last updated" date at the top of this page. Continued use of the site after changes constitutes acceptance of the revised terms.

## Contact Us

Questions about these terms can be sent to **${settings.contactEmail}**.
`.trim();

  return <LegalContent title="Terms & Conditions" href="/terms-and-conditions" lastUpdated={LAST_UPDATED} content={content} />;
}
