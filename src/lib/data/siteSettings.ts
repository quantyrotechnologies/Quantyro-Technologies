import { unstable_cache } from 'next/cache';
import { createPublicClient } from '@/lib/supabase/public';
import type { SiteSettings } from '@/lib/types';

const FALLBACK: SiteSettings = {
  orgName: 'Quantyro Technologies',
  tagline: 'Engineering the future, one idea at a time.',
  description: 'Global software engineering partner designing, building and scaling web, mobile and AI products.',
  url: 'https://quantyrotechnologies.com',
  contactEmail: 'hello@quantyro.studio',
  contactPhone: null,
  responseTime: 'Within 1 business day',
  footerBlurb: 'Engineering the future, one idea at a time — a senior team for web, mobile, cloud and AI products.',
  copyrightText: '© 2026 Quantyro Technologies. All rights reserved.',
};

async function fetchSiteSettings(): Promise<SiteSettings> {
  const supabase = createPublicClient();
  const { data, error } = await supabase.from('site_settings').select('*').eq('id', 1).maybeSingle();

  if (error || !data) {
    if (error) console.error('[getSiteSettings] failed, using fallback', error);
    return FALLBACK;
  }

  return {
    orgName: data.org_name,
    tagline: data.tagline,
    description: data.description,
    url: data.url,
    contactEmail: data.contact_email,
    contactPhone: data.contact_phone ?? null,
    responseTime: data.response_time,
    footerBlurb: data.footer_blurb,
    copyrightText: data.copyright_text,
    announcementBadge: data.announcement_badge ?? null,
    aboutStory: data.about_story ?? null,
    aboutMission: data.about_mission ?? null,
    privacyPolicy: data.privacy_policy ?? null,
    termsConditions: data.terms_conditions ?? null,
  };
}

export const getSiteSettings = unstable_cache(fetchSiteSettings, ['site-settings'], {
  tags: ['site-settings'],
  revalidate: 60,
});
