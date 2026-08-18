export interface Service {
  id: string;
  num: string;
  slug: string;
  title: string;
  desc: string;
  capabilities: string[];
  stack: string[] | null;
  imageUrl: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  region: string;
  result: string;
  tags: string[];
  summary: string;
  detail: string;
  accent: 'accent' | 'accent-2';
  isFeatured: boolean;
  year: number | null;
  stack: string[] | null;
  duration: string | null;
  highlights: string[] | null;
}

export interface Industry {
  id: string;
  num: string;
  slug: string;
  title: string;
  desc: string;
  challenges: string[];
  capabilities: string[];
  marketStats: string[];
  relatedServiceSlugs: string[];
  statValue: string;
  statLabel: string;
  seoTitle: string | null;
  seoDescription: string | null;
}

export interface ServiceRegionPage {
  id: string;
  region: string;
  intro: string;
  seoTitle: string | null;
  seoDescription: string | null;
  service: {
    id: string;
    slug: string;
    title: string;
    desc: string;
    capabilities: string[];
  };
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  authorName: string;
  publishedAt: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  tags: string[];
  accent: 'accent' | 'accent-2';
}

export interface BlogComment {
  id: string;
  name: string;
  comment: string;
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  photoUrl: string | null;
  linkedinUrl: string | null;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string | null;
  credentialUrl: string | null;
}

export interface Value {
  id: string;
  title: string;
  desc: string;
}

export interface Office {
  id: string;
  city: string;
  region: string;
  photoUrl: string | null;
}

export interface Stat {
  id: string;
  count: number;
  suffix: string;
  label: string;
  tag: string;
  accent: 'accent' | 'accent-2';
}

export interface TickerMetric {
  id: string;
  label: string;
  value: string;
}

export interface SocialLink {
  id: string;
  label: string;
  href: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  avatarBg: string;
  avatarFg: string;
}

export interface RoadmapStep {
  id: string;
  step: string;
  phaseTag: string;
  badge: string;
  title: string;
  desc: string;
  deliverables: string[];
  status: string;
  terminalCmd: string;
  terminalOutput: string;
  iconKey: string;
}

export interface SiteSettings {
  orgName: string;
  tagline: string;
  description: string;
  url: string;
  contactEmail: string;
  contactPhone: string | null;
  responseTime: string;
  footerBlurb: string;
  copyrightText: string;
}
