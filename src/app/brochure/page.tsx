import type { Metadata } from 'next';
import { getSiteSettings } from '@/lib/data/siteSettings';
import { getServices } from '@/lib/data/services';
import { getIndustries } from '@/lib/data/industries';
import { getRoadmapSteps } from '@/lib/data/roadmap';
import BrochureContent from '@/components/BrochureContent';

// Not a page anyone should land on from search — it's a print/PDF sales
// asset for internal and outbound use, not content meant to rank.
export const metadata: Metadata = {
  title: 'Company Brochure',
  robots: { index: false, follow: false },
};

export default async function BrochurePage() {
  const [settings, services, industries, roadmapSteps] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getIndustries(),
    getRoadmapSteps(),
  ]);

  return (
    <BrochureContent
      settings={settings}
      services={services}
      industries={industries}
      roadmapSteps={roadmapSteps}
    />
  );
}
