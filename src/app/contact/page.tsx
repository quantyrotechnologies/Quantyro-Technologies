import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import FaqSection from '@/components/FaqSection';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getFaqs } from '@/lib/data/faqs';
import { getSiteSettings } from '@/lib/data/siteSettings';

export const metadata: Metadata = {
  title: 'Contact Our Team',
  description: 'Tell Quantyro Technologies about your project — we reply within one business day, every time. Reach our senior engineering team directly, no account managers.',
  alternates: { canonical: '/contact' },
};

export default async function ContactPage() {
  const [faqs, settings] = await Promise.all([getFaqs('contact'), getSiteSettings()]);

  const contactDetails = [
    { label: 'Email', value: settings.contactEmail },
    ...(settings.contactPhone ? [{ label: 'Phone', value: settings.contactPhone }] : []),
    { label: 'Response time', value: settings.responseTime },
  ];

  return (
    <div>
      <section className="relative px-[6vw] pt-[160px] pb-[80px] z-10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-[60px]">
          <div>
            <Breadcrumbs items={[{ label: 'Contact', href: '/contact' }]} />
            <div className="mono text-[12px] text-[var(--muted)] mb-[20px]">Contact</div>
            <h1 className="text-[clamp(36px,5.4vw,60px)] max-w-[14ch] font-[var(--font-display)] font-bold leading-[1]">
              Let&apos;s build something great.
            </h1>
            <p className="mt-[24px] max-w-[440px] text-[var(--muted)] text-[16px] leading-[1.7]">
              Tell us about your project — we reply within one business day, every time.
            </p>
            <div className="mt-[40px] space-y-[16px]">
              {contactDetails.map((d) => (
                <div key={d.label}>
                  <div className="text-[12px] text-[var(--muted)] mono">{d.label}</div>
                  <div className="mt-[4px] text-[15px] text-[var(--ink)] font-medium">{d.value}</div>
                </div>
              ))}
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      <FaqSection heading="Contact FAQ" items={faqs} />
    </div>
  );
}
