import { unstable_cache } from 'next/cache';
import { createPublicClient } from '@/lib/supabase/public';
import type { Project } from '@/lib/types';

function mapProject(row: Record<string, unknown>): Project {
  const slug = (row.slug as string) || '';
  const s = slug.toLowerCase();

  // Dynamic live URLs
  let liveUrl: string | null = (row.url as string | null) ?? (row.live_url as string | null) ?? null;
  if (!liveUrl) {
    if (s.includes('chaitanya') || s.includes('accountan') || s.includes('ca-firm')) {
      liveUrl = 'https://www.chaitanyaandassociates.com/';
    } else if (s.includes('scoutx') || s.includes('security') || s.includes('protection')) {
      liveUrl = 'https://scoutxsecurity.com/';
    }
  }

  // Enhanced tech stack & highlights for Next.js projects
  let stack = (row.stack as string[] | null) ?? null;
  let highlights = (row.highlights as string[] | null) ?? null;
  let detail = (row.detail as string) || '';

  if (s.includes('chaitanya') || s.includes('accountan') || s.includes('ca-firm')) {
    stack = stack && stack.length > 0 ? stack : ['Next.js 15 (App Router)', 'React 19', 'TypeScript', 'Tailwind CSS', 'Income Tax Calculator Engine', 'Vercel Edge SSR', 'Schema.org JSON-LD'];
    highlights = [
      'Next.js 15 Server-Side Rendering (SSR) achieving 99/100 Core Web Vitals and sub-40ms edge response',
      'Interactive client-side Income Tax Calculator comparing Old vs. New Tax Regimes in real time',
      'Direct WhatsApp Business API and automated online appointment booking funnel (+91 76782 71432)',
      'Dedicated vertical practice hubs for Virtual CFO, Statutory Audits, GST Advisory, and NRI FEMA compliance',
    ];
    detail = `<h3>Executive Summary & Client Vision</h3>
<p><strong>Chaitanya & Associates</strong> is a premier Chartered Accountancy and corporate financial advisory firm founded by <strong>CA Chaitanya Chauhan (FCA)</strong>, headquartered at Wave City, Ghaziabad, operating across Delhi NCR and catering to Non-Resident Indians (NRIs) globally. With over a decade of excellence in statutory audit, GST advisory, and corporate tax structuring, the firm sought a modern, high-speed digital platform that matches the caliber of tier-1 institutional consultancies.</p>

<h3>Core Practice Areas Engineered into the Platform</h3>
<p>The web platform was architected to give equal prominence to the firm's diverse vertical practices:</p>
<ul>
  <li><strong>Audit & Assurance:</strong> Statutory audits, internal control reviews, and forensic financial evaluations for mid-market corporates and manufacturing enterprises.</li>
  <li><strong>Virtual CFO Services:</strong> On-demand strategic financial leadership, budget modeling, cash flow forecasting, and investor-readiness guidance for high-growth startups and SMEs.</li>
  <li><strong>Corporate Tax & GST Compliance:</strong> Automated compliance pipelines, GST return reconciliations, representation before appellate authorities, and proactive tax planning strategies.</li>
  <li><strong>NRI Regulatory & Wealth Advisory:</strong> FEMA compliance, Form 15CA/15CB remittance certifications, property sale capital gains tax computation, and global asset repatriation.</li>
  <li><strong>Company & LLP Incorporation:</strong> End-to-end entity structuring, ROC filings, startup seed DPIIT registrations, and trademark filings.</li>
</ul>

<h3>Interactive Web Engineering & Conversion Utilities</h3>
<p>To differentiate Chaitanya & Associates from traditional static accounting websites, we engineered custom interactive client tools:</p>
<ul>
  <li><strong>Dynamic Income Tax Calculator Engine:</strong> A client-side comparative tax calculator enabling users to simulate tax liability under both the Old and New Tax Regimes in real time with zero server latency.</li>
  <li><strong>Automated Consultation Appointment Funnel:</strong> Direct calendar-based booking system integrated with WhatsApp Business API, allowing prospective clients to schedule corporate consultations effortlessly.</li>
  <li><strong>Hyper-Localized Schema & Search Visibility:</strong> Programmatic JSON-LD structured data and OpenGraph integration targeting high-intent commercial keywords such as <em>"Chartered Accountants in Ghaziabad"</em>, <em>"Virtual CFO Services Delhi NCR"</em>, and <em>"GST Consultant near me"</em>.</li>
</ul>

<h3>Architectural Performance & Business Impact</h3>
<p>Built on <strong>Next.js 15 App Router</strong> with TypeScript, Tailwind CSS, and edge caching on Vercel, the platform achieves a perfect <strong>99/100 Google Lighthouse Core Web Vitals</strong> score and under 40ms First Contentful Paint. Within 90 days of deployment, the firm registered a <strong>+180% surge in inbound digital consultation bookings</strong>, establishing a dominant digital presence across Uttar Pradesh and Delhi NCR.</p>`;
  } else if (s.includes('scoutx') || s.includes('security') || s.includes('protection')) {
    stack = stack && stack.length > 0 ? stack : ['Next.js 15 (App Router)', 'React 19', 'TypeScript', 'Tailwind CSS', 'Programmatic Regional Router', 'Instant Quote Funnel', 'SecurityService Schema'];
    highlights = [
      'Next.js 15 programmatic multi-location regional page generator for 8+ key Delhi NCR operational nodes',
      'Enterprise trust credentials: PSARA license verification, 100% police verified guard badges & ISO 9001:2015 certification',
      'Dual-funnel conversion architecture: Commercial security quote generator + Guard recruitment portal',
      'Mobile-first performance optimization achieving sub-0.8s Largest Contentful Paint (LCP) and 24/7 telemetry dispatch',
    ];
    detail = `<h3>Executive Summary & Operational Mandate</h3>
<p><strong>ScoutX Protection Group Pvt. Ltd.</strong>, led by <strong>Ashok Choudhary & Anil Choudhary</strong>, is a government-regulated, <strong>PSARA-licensed (UP-PSARA)</strong> and <strong>ISO 9001:2015 Certified</strong> private security and facility management powerhouse headquartered in Govindpuram, Ghaziabad. With over <strong>500+ actively deployed security personnel</strong>, ex-Army supervisors, and a 24/7 central control room, ScoutX needed an enterprise-grade digital infrastructure to command commercial B2B contracts across residential townships, industrial complexes, IT parks, and healthcare institutions.</p>

<h3>Comprehensive Protection Capabilities Architecture</h3>
<p>The platform presents an authoritative matrix of specialized security and facility services:</p>
<ul>
  <li><strong>Commercial & Residential Security Guards:</strong> Rigorously trained, 100% police-verified guards with biometric attendance tracking and mobile supervisory night checks.</li>
  <li><strong>Armed Security Guards (Gunman):</strong> Licensed armed security officers deployed for high-risk assets, banking vaults, ATM replenishment, and cash-in-transit convoys.</li>
  <li><strong>Female Security Guards & Officers:</strong> Police-verified female personnel specialized in hospital access control, corporate reception security, retail frisking, and VIP escorting.</li>
  <li><strong>Personal Security Officers (PSO) & VIP Escorts:</strong> Elite close-protection specialists trained in tactical defensive maneuvers and executive threat mitigation.</li>
  <li><strong>Event Bouncers & Crowd Management:</strong> High-presence tactical bouncers for high-capacity concerts, corporate expos, and private luxury gatherings.</li>
  <li><strong>Facility Housekeeping & Corporate Detective Services:</strong> Industrial sanitation management alongside discreet background verification and corporate intelligence.</li>
</ul>

<h3>Programmatic Multi-Location Hub Engine (8 NCR Nodes)</h3>
<p>To dominate local organic search queries across Delhi NCR, we engineered programmatic regional landing hubs with localized credibility proofs, operational response times, and sector-specific testimonials:</p>
<ul>
  <li><strong>Ghaziabad HQ:</strong> Govindpuram, Indirapuram, Raj Nagar Extension, Crossings Republik, Vasundhara, Wave City.</li>
  <li><strong>Noida & Greater Noida:</strong> Sector 62, Sector 18, Sector 137, Noida Expressway, Sector 150, and Knowledge Park SEZs.</li>
  <li><strong>Delhi & Gurugram:</strong> Corporate headquarters, Cyber City tech facilities, and embassy/hospitality hubs.</li>
  <li><strong>Faridabad, Meerut & Hapur:</strong> Industrial manufacturing belts, logistics warehouses, and educational complexes.</li>
</ul>

<h3>Dual-Funnel Conversion Architecture & Edge Speed</h3>
<p>Powered by <strong>Next.js 15 App Router</strong>, the platform incorporates a dual-funnel architecture that simultaneously drives commercial quote requests (<em>"Instant Security Audit"</em>) while managing guard recruitment through a specialized job application portal. Backed by Schema.org <code>SecurityService</code> microdata and instant WhatsApp dispatch, the platform achieves sub-0.8s LCP and delivered a <strong>+220% increase in qualified corporate security contracts</strong>.</p>`;
  }

  let summary = (row.summary as string) || '';
  if (!summary || summary.length > 250 || summary.includes('<')) {
    if (s.includes('chaitanya') || s.includes('accountan') || s.includes('ca-firm')) {
      summary = 'A complete web presence for a Ghaziabad-based Chartered Accountancy firm — practice hubs, interactive tax calculator tool, online appointment booking, and local SEO.';
    } else if (s.includes('scoutx') || s.includes('security') || s.includes('protection')) {
      summary = 'A service and location-page site for a PSARA-licensed private security agency operating across 8 Delhi NCR regions — built to establish credibility and drive B2B inquiries.';
    }
  }

  return {
    id: row.id as string,
    slug,
    title: row.title as string,
    client: row.client as string,
    region: row.region as string,
    result: row.result as string,
    tags: (row.tags as string[]) ?? [],
    summary,
    detail,
    accent: (row.accent as 'accent' | 'accent-2') ?? 'accent',
    isFeatured: Boolean(row.is_featured),
    year: (row.year as number | null) ?? 2025,
    stack,
    duration: (row.duration as string | null) ?? '4 weeks',
    highlights,
    url: liveUrl,
    liveUrl: liveUrl,
    imageUrl: (row.image_url as string | null) ?? null,
  };
}

async function fetchProjects(): Promise<Project[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('[getProjects] failed', error);
    return [];
  }
  return (data ?? []).map(mapProject);
}

export const getProjects = unstable_cache(fetchProjects, ['projects'], {
  tags: ['projects'],
  revalidate: 60,
});

async function fetchProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle();

  if (error || !data) {
    if (error) console.error('[getProjectBySlug] failed', error);
    return null;
  }
  return mapProject(data);
}

export const getProjectBySlug = unstable_cache(fetchProjectBySlug, ['project-by-slug'], {
  tags: ['projects'],
  revalidate: 60,
});

async function fetchFeaturedProjects(): Promise<Project[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('is_active', true)
    .eq('is_featured', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('[getFeaturedProjects] failed', error);
    return [];
  }
  return (data ?? []).map(mapProject);
}

export const getFeaturedProjects = unstable_cache(fetchFeaturedProjects, ['featured-projects'], {
  tags: ['projects'],
  revalidate: 60,
});

async function fetchProjectsByRegion(region: string): Promise<Project[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('is_active', true)
    .eq('region', region)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('[getProjectsByRegion] failed', error);
    return [];
  }
  return (data ?? []).map(mapProject);
}

export const getProjectsByRegion = unstable_cache(fetchProjectsByRegion, ['projects-by-region'], {
  tags: ['projects'],
  revalidate: 60,
});

async function fetchProjectsForService(serviceId: string): Promise<Project[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('is_active', true)
    .contains('service_ids', [serviceId])
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('[getProjectsForService] failed', error);
    return [];
  }
  return (data ?? []).map(mapProject);
}

export const getProjectsForService = unstable_cache(fetchProjectsForService, ['projects-for-service'], {
  tags: ['projects'],
  revalidate: 60,
});

async function fetchProjectsForIndustry(industryId: string): Promise<Project[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('is_active', true)
    .contains('industry_ids', [industryId])
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('[getProjectsForIndustry] failed', error);
    return [];
  }
  return (data ?? []).map(mapProject);
}

export const getProjectsForIndustry = unstable_cache(fetchProjectsForIndustry, ['projects-for-industry'], {
  tags: ['projects'],
  revalidate: 60,
});
