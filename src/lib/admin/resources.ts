import { CITIES } from '@/lib/cities';

export type FieldType = 'text' | 'textarea' | 'richtext' | 'number' | 'boolean' | 'string-array' | 'select' | 'datetime' | 'relation' | 'relation-multi' | 'json';

export interface FieldOption {
  value: string;
  label: string;
}

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  /** Static choices for type 'select'. For type 'relation'/'relation-multi' this is populated dynamically at request time — see relationTable/etc. */
  options?: FieldOption[];
  /** type 'relation'/'relation-multi' only: which table to pull dropdown choices from. */
  relationTable?: string;
  /** type 'relation'/'relation-multi' only: column used as the option's visible label (defaults to 'title'). */
  relationLabelField?: string;
  /** Shown in the edit form but not submittable — e.g. created_at. */
  readOnly?: boolean;
  placeholder?: string;
}

export interface ResourceConfig {
  /** URL-safe key, e.g. 'roadmap-steps'. Used in /admin/[resource] and /api/admin/[resource]. */
  key: string;
  /** Actual Postgres table name (may differ from `key`, e.g. 'values_content'). */
  table: string;
  label: string;
  pluralLabel: string;
  fields: FieldConfig[];
  orderBy: string;
  orderDirection?: 'asc' | 'desc';
  /** Field names shown as table columns in the list view (defaults to first 3 fields). */
  listColumns?: string[];
  /** No list view — routes straight to a single edit form (site-settings). */
  singleton?: boolean;
  /** No "new" button / create route (contact-submissions). */
  allowCreate?: boolean;
  /** No delete action (contact-submissions still allows delete, so this defaults true). */
  allowDelete?: boolean;
  /** Cache tag invalidated on every write, matching the tag used by the matching src/lib/data/*.ts reader. */
  revalidateTag: string;
  /**
   * Field-name mapping that turns on a live on-page SEO checklist in the
   * form (title/description length, content word count) — Yoast/Rank Math
   * style, computed client-side, no external service. Omit to skip it.
   */
  seoFields?: {
    title: string;
    titleFallback?: string;
    /** Falls back to reading this field if the primary is empty (e.g. seo_description -> excerpt). */
    description: string;
    descriptionFallback?: string;
    body?: string;
  };
}

const CAPABILITIES_FIELD: FieldConfig = { name: 'capabilities', label: 'Capabilities List (One point per line)', type: 'string-array', required: true };
const TAGS_FIELD: FieldConfig = { name: 'tags', label: 'Tags & Badges (One tag per line)', type: 'string-array', required: true };

export const RESOURCES: Record<string, ResourceConfig> = {
  services: {
    key: 'services',
    table: 'services',
    label: 'Service',
    pluralLabel: 'Services',
    orderBy: 'sort_order',
    listColumns: ['title', 'slug', 'is_active'],
    revalidateTag: 'services',
    seoFields: { title: 'seo_title', titleFallback: 'title', description: 'seo_description', descriptionFallback: 'description' },
    fields: [
      { name: 'slug', label: 'URL Slug (e.g. website-development)', type: 'text', required: true, placeholder: 'website-development' },
      { name: 'title', label: 'Main Headline (H1 on Page / Card Title)', type: 'text', required: true, placeholder: 'e.g. Website Development & High-Scale SaaS' },
      { name: 'description', label: 'Hero Summary (P Tag / Rich Text Paragraph)', type: 'richtext', required: true },
      { name: 'executive_headline', label: 'Section 01 Headline (H2 Subheading)', type: 'text', placeholder: 'e.g. High-Performance Web Architecture & Edge Delivery' },
      { name: 'executive_narrative', label: 'Section 01 Paragraphs (One paragraph per item)', type: 'string-array' },
      CAPABILITIES_FIELD,
      { name: 'stack', label: 'Tech Stack Pills (e.g. Next.js, React, Node.js)', type: 'string-array' },
      { name: 'image_url', label: 'Cover Image URL (Recommended 16:9 / Leave blank for default art)', type: 'text', placeholder: 'https://... or /images/...' },
      { name: 'target_keywords', label: 'Target SEO Keywords (One phrase per line)', type: 'string-array' },
      { name: 'seo_title', label: 'SEO Meta Title (Browser tab title)', type: 'text' },
      { name: 'seo_description', label: 'SEO Meta Description (Google snippet)', type: 'textarea' },
      { name: 'sort_order', label: 'Display Order (1, 2, 3...)', type: 'number', required: true },
      { name: 'is_active', label: 'Active (Visible on Website)', type: 'boolean' },
    ],
  },
  industries: {
    key: 'industries',
    table: 'industries',
    label: 'Industry',
    pluralLabel: 'Industries',
    orderBy: 'sort_order',
    listColumns: ['title', 'slug', 'is_active'],
    revalidateTag: 'industries',
    seoFields: { title: 'seo_title', titleFallback: 'title', description: 'seo_description', descriptionFallback: 'description' },
    fields: [
      { name: 'slug', label: 'URL Slug (e.g. banking-fintech)', type: 'text', required: true, placeholder: 'banking-fintech' },
      { name: 'title', label: 'Industry Name (H1 / Card Headline)', type: 'text', required: true, placeholder: 'e.g. Banking & FinTech' },
      { name: 'description', label: 'Industry Description (P Tag / Rich Text Paragraph)', type: 'richtext', required: true },
      { name: 'challenges', label: 'Industry Challenges (One per line)', type: 'string-array', required: true },
      CAPABILITIES_FIELD,
      { name: 'market_stats', label: 'Market Context Stats (Sentences, e.g. "39% of users use banking apps")', type: 'string-array' },
      { name: 'related_service_slugs', label: 'Related Service Slugs (e.g. custom-software)', type: 'string-array' },
      { name: 'stat_value', label: 'Standout Metric Value (e.g. 99.999%)', type: 'text', required: true },
      { name: 'stat_label', label: 'Standout Metric Label (e.g. Transaction Reliability SLA)', type: 'text', required: true },
      { name: 'target_keywords', label: 'Target SEO Keywords (One per line)', type: 'string-array' },
      { name: 'seo_title', label: 'SEO Meta Title (Optional)', type: 'text' },
      { name: 'seo_description', label: 'SEO Meta Description (Optional)', type: 'textarea' },
      { name: 'sort_order', label: 'Display Order (1, 2, 3...)', type: 'number', required: true },
      { name: 'is_active', label: 'Active (Visible on Website)', type: 'boolean' },
    ],
  },
  'industry-applications': {
    key: 'industry-applications',
    table: 'industry_applications',
    label: 'Industry Application',
    pluralLabel: 'Industry Applications',
    orderBy: 'sort_order',
    listColumns: ['sector', 'metric', 'is_active'],
    revalidateTag: 'industry-applications',
    fields: [
      { name: 'service_id', label: 'Service Page (Where this card appears)', type: 'relation', required: true, relationTable: 'services', relationLabelField: 'title' },
      { name: 'sector', label: 'Industry / Sector Name (H3 Card Title)', type: 'text', required: true, placeholder: 'e.g. FinTech & Banking' },
      { name: 'use_case', label: 'Use Case Narrative (P Tag / Body Content)', type: 'richtext', required: true },
      { name: 'metric', label: 'Highlight Badge (Pill tag at top right)', type: 'text', required: true, placeholder: 'e.g. Built for High Reliability' },
      { name: 'sort_order', label: 'Display Order', type: 'number', required: true },
      { name: 'is_active', label: 'Active (Visible on Website)', type: 'boolean' },
    ],
  },
  projects: {
    key: 'projects',
    table: 'projects',
    label: 'Project',
    pluralLabel: 'Projects',
    orderBy: 'sort_order',
    listColumns: ['title', 'client', 'is_featured', 'is_active'],
    revalidateTag: 'projects',
    seoFields: { title: 'title', description: 'summary', body: 'detail' },
    fields: [
      { name: 'slug', label: 'URL Slug (e.g. chaitanya-associates)', type: 'text', required: true },
      { name: 'title', label: 'Project Name / Main Headline (H1)', type: 'text', required: true, placeholder: 'e.g. Chaitanya & Associates — Legal Tech Platform' },
      { name: 'client', label: 'Client / Company Name', type: 'text', required: true, placeholder: 'e.g. Chaitanya & Associates' },
      { name: 'region', label: 'Region / Location Badge', type: 'text', required: true, placeholder: 'e.g. India & Global' },
      { name: 'result', label: 'Key Outcome Highlight (Green Badge)', type: 'text', required: true, placeholder: 'e.g. 10x Lead Ingestion & Sub-300ms SLA' },
      { name: 'year', label: 'Year Completed (Optional)', type: 'number', placeholder: 'e.g. 2026' },
      TAGS_FIELD,
      { name: 'service_ids', label: 'Show on these Services (Related Work)', type: 'relation-multi', relationTable: 'services', relationLabelField: 'title' },
      { name: 'industry_ids', label: 'Show on these Industries (Related Work)', type: 'relation-multi', relationTable: 'industries', relationLabelField: 'title' },
      { name: 'url', label: 'Live Website URL (Direct External Link)', type: 'text', placeholder: 'https://...' },
      { name: 'image_url', label: 'Project Cover Photo URL', type: 'text', placeholder: '/images/projects/... or https://...' },
      { name: 'summary', label: 'Short Card Summary (P Tag / Homepage Preview)', type: 'richtext', required: true },
      { name: 'detail', label: 'Full Case Study Detail (H2/H3/P Rich Text)', type: 'richtext', required: true },
      { name: 'stack', label: 'Tech Stack Tags (e.g. Next.js 15, Supabase, Tailwind)', type: 'string-array' },
      { name: 'duration', label: 'Delivery Timeframe (e.g. 6 weeks)', type: 'text', placeholder: 'e.g. 6 weeks' },
      { name: 'highlights', label: 'Notable Features (One per line)', type: 'string-array' },
      { name: 'accent', label: 'Glow Accent Color', type: 'select', options: [{ value: 'accent', label: 'Blue Glow' }, { value: 'accent-2', label: 'Cyan Glow' }], required: true },
      { name: 'is_featured', label: 'Featured on Homepage (Show in Top Grid)', type: 'boolean' },
      { name: 'sort_order', label: 'Display Order', type: 'number', required: true },
      { name: 'is_active', label: 'Active (Visible on Website)', type: 'boolean' },
    ],
  },
  team: {
    key: 'team',
    table: 'team_members',
    label: 'Team member',
    pluralLabel: 'Team',
    orderBy: 'sort_order',
    listColumns: ['name', 'role', 'experience', 'is_active'],
    revalidateTag: 'team-members',
    fields: [
      { name: 'name', label: 'Full Name (H3 Card Title)', type: 'text', required: true, placeholder: 'e.g. Chirag Kumar' },
      { name: 'role', label: 'Designation / Role (H4 Subtitle)', type: 'text', required: true, placeholder: 'e.g. Founder & Principal Full-Stack Architect' },
      { name: 'experience', label: 'Experience Badge (Green Pill Top Right)', type: 'text', placeholder: 'e.g. 3+ Years Exp' },
      { name: 'skills', label: 'Core Proficiencies & Skills (One badge per line)', type: 'string-array' },
      { name: 'bio', label: 'Bio Narrative (P Tag / Rich Text Description)', type: 'richtext' },
      { name: 'photo_url', label: 'Profile Photo URL (Square ratio recommended)', type: 'text', placeholder: '/images/team/chirag-kumar.jpg or https://...' },
      { name: 'sort_order', label: 'Display Order', type: 'number', required: true },
      { name: 'is_active', label: 'Active (Visible on Website)', type: 'boolean' },
    ],
  },
  testimonials: {
    key: 'testimonials',
    table: 'testimonials',
    label: 'Testimonial',
    pluralLabel: 'Testimonials',
    orderBy: 'sort_order',
    listColumns: ['name', 'company', 'is_active'],
    revalidateTag: 'testimonials',
    fields: [
      { name: 'quote', label: 'Client Quote (Main Big Text / Rich Text)', type: 'richtext', required: true },
      { name: 'name', label: 'Client Full Name (H4)', type: 'text', required: true, placeholder: 'e.g. Rajesh Chaitanya' },
      { name: 'role', label: 'Client Role / Title', type: 'text', required: true, placeholder: 'e.g. Managing Partner' },
      { name: 'company', label: 'Company / Organization Name', type: 'text', required: true, placeholder: 'e.g. Chaitanya & Associates' },
      { name: 'initials', label: 'Avatar Initials (e.g. RC)', type: 'text', required: true, placeholder: 'RC' },
      { name: 'avatar_bg', label: 'Avatar Background Hex (e.g. #0EBCD4)', type: 'text', required: true, placeholder: '#0EBCD4' },
      { name: 'avatar_fg', label: 'Avatar Text Color Hex (e.g. #FFFFFF)', type: 'text', required: true, placeholder: '#FFFFFF' },
      { name: 'sort_order', label: 'Display Order', type: 'number', required: true },
      { name: 'is_active', label: 'Active (Visible on Website)', type: 'boolean' },
    ],
  },
  faqs: {
    key: 'faqs',
    table: 'faqs',
    label: 'FAQ',
    pluralLabel: 'FAQs',
    orderBy: 'sort_order',
    listColumns: ['page_slug', 'question', 'is_active'],
    revalidateTag: 'faqs',
    fields: [
      {
        name: 'page_slug', label: 'Target Page (Where this FAQ Accordion shows)', type: 'select', required: true,
        options: [
          { value: 'home', label: 'Homepage' },
          { value: 'services', label: 'Services Main Page' },
          { value: 'work', label: 'Case Studies / Work Page' },
          { value: 'about', label: 'About Us Page' },
          { value: 'contact', label: 'Contact Page' },
          { value: 'blog', label: 'Blog Main Page' },
          { value: 'certifications', label: 'Certifications Page' },
          { value: 'team', label: 'Team Page' },
          { value: 'service-website-development', label: 'Service: Website Development' },
          { value: 'service-custom-software', label: 'Service: Custom Software' },
          { value: 'service-ai-machine-learning', label: 'Service: AI & Machine Learning' },
          { value: 'service-seo-marketing', label: 'Service: SEO & Marketing' },
          { value: 'service-cloud-devops', label: 'Service: Cloud & DevOps' },
          { value: 'service-mobile-apps', label: 'Service: Mobile Apps' },
          { value: 'service-e-commerce', label: 'Service: E-Commerce' },
          { value: 'industries', label: 'Industries Main Page' },
          { value: 'industry-banking-fintech', label: 'Industry: Banking & FinTech' },
          { value: 'industry-fitness-wellness', label: 'Industry: Fitness & Wellness' },
          { value: 'industry-taxi-ride-hailing', label: 'Industry: Taxi & Ride-Hailing' },
          { value: 'industry-education-edtech', label: 'Industry: Education & EdTech' },
          { value: 'industry-dating-social', label: 'Industry: Dating & Social' },
          { value: 'industry-ecommerce-retail', label: 'Industry: E-Commerce & Retail' },
          { value: 'industry-real-estate-proptech', label: 'Industry: Real Estate & PropTech' },
          { value: 'industry-healthcare-telemedicine', label: 'Industry: Healthcare & Telemedicine' },
        ],
      },
      { name: 'question', label: 'Question (H3 / Accordion Header)', type: 'text', required: true, placeholder: 'e.g. Do we retain 100% IP ownership?' },
      { name: 'answer', label: 'Answer (P Tag / Rich Text Details)', type: 'richtext', required: true },
      { name: 'sort_order', label: 'Display Order', type: 'number', required: true },
      { name: 'is_active', label: 'Active (Visible on Website)', type: 'boolean' },
    ],
  },
  stats: {
    key: 'stats',
    table: 'stats',
    label: 'Stat',
    pluralLabel: 'Stats',
    orderBy: 'sort_order',
    listColumns: ['label', 'count', 'suffix', 'is_active'],
    revalidateTag: 'stats',
    fields: [
      { name: 'count', label: 'Number Count (e.g. 100 or 95)', type: 'number', required: true },
      { name: 'suffix', label: 'Suffix Sign (e.g. % or + or ms)', type: 'text', required: true, placeholder: '%' },
      { name: 'label', label: 'Metric Headline (H4 Label)', type: 'text', required: true, placeholder: 'e.g. Client IP Ownership Standard' },
      { name: 'tag', label: 'Category Tag (e.g. SLA GUARANTEE)', type: 'text', required: true, placeholder: 'SLA GUARANTEE' },
      { name: 'accent', label: 'Glow Accent Color', type: 'select', options: [{ value: 'accent', label: 'Blue' }, { value: 'accent-2', label: 'Cyan' }], required: true },
      { name: 'sort_order', label: 'Display Order', type: 'number', required: true },
      { name: 'is_active', label: 'Active (Visible on Website)', type: 'boolean' },
    ],
  },
  'roadmap-steps': {
    key: 'roadmap-steps',
    table: 'roadmap_steps',
    label: 'Roadmap step',
    pluralLabel: 'Roadmap steps',
    orderBy: 'sort_order',
    listColumns: ['step', 'title', 'is_active'],
    revalidateTag: 'roadmap-steps',
    fields: [
      { name: 'step', label: 'Step Number (e.g. 01, 02, 03, 04)', type: 'text', required: true, placeholder: '01' },
      { name: 'phase_tag', label: 'Phase Tag (e.g. PHASE 01 // DISCOVERY)', type: 'text', required: true, placeholder: 'PHASE 01 // DISCOVERY' },
      { name: 'badge', label: 'Badge Pill (e.g. 1-2 Days SLA)', type: 'text', required: true, placeholder: '1-2 Days SLA' },
      { name: 'title', label: 'Milestone Title (H3)', type: 'text', required: true, placeholder: 'e.g. Strategic Alignment & Architecture Blueprint' },
      { name: 'description', label: 'Milestone Narrative (P Tag / Rich Text)', type: 'richtext', required: true },
      { name: 'deliverables', label: 'Deliverables List (One per line)', type: 'string-array', required: true },
      { name: 'status', label: 'Status Text (e.g. Completed or In Progress)', type: 'text', required: true, placeholder: 'Verified' },
      { name: 'terminal_cmd', label: 'Interactive Terminal Command ($ ...)', type: 'text', required: true, placeholder: 'git clone quantyro-repo' },
      { name: 'terminal_output', label: 'Terminal Output Response Text', type: 'text', required: true, placeholder: 'Repository cloned with zero vendor lock-in ✓' },
      {
        name: 'icon_key', label: 'Step Icon', type: 'select', required: true,
        options: [
          { value: 'handshake', label: 'Handshake 🤝' },
          { value: 'calendar', label: 'Calendar 📅' },
          { value: 'blueprint', label: 'Blueprint 📐' },
          { value: 'sprint', label: 'Sprint ⚡' },
          { value: 'launch', label: 'Launch 🚀' },
        ],
      },
      { name: 'sort_order', label: 'Display Order', type: 'number', required: true },
      { name: 'is_active', label: 'Active (Visible on Website)', type: 'boolean' },
    ],
  },
  values: {
    key: 'values',
    table: 'values_content',
    label: 'Value',
    pluralLabel: 'Values',
    orderBy: 'sort_order',
    listColumns: ['title', 'is_active'],
    revalidateTag: 'values',
    fields: [
      { name: 'title', label: 'Principle Name (H3 Card Title)', type: 'text', required: true, placeholder: 'e.g. Senior Squads by Default' },
      { name: 'description', label: 'Principle Narrative (P Tag / Rich Text)', type: 'richtext', required: true },
      { name: 'sort_order', label: 'Display Order', type: 'number', required: true },
      { name: 'is_active', label: 'Active (Visible on Website)', type: 'boolean' },
    ],
  },
  offices: {
    key: 'offices',
    table: 'offices',
    label: 'Office',
    pluralLabel: 'Offices',
    orderBy: 'sort_order',
    listColumns: ['city', 'region', 'is_active'],
    revalidateTag: 'offices',
    fields: [
      { name: 'city', label: 'City Name (H3)', type: 'text', required: true, placeholder: 'e.g. Noida' },
      { name: 'region', label: 'Country / Region', type: 'text', required: true, placeholder: 'e.g. India' },
      { name: 'address_line1', label: 'Address Line 1', type: 'text' },
      { name: 'address_line2', label: 'Address Line 2 (Optional)', type: 'text' },
      { name: 'locality', label: 'Locality / Area (e.g. Sector 62)', type: 'text' },
      { name: 'admin_area', label: 'State / Province (e.g. Uttar Pradesh)', type: 'text' },
      { name: 'postal_code', label: 'Postal Code (e.g. 201309)', type: 'text' },
      { name: 'country', label: 'Country Code (e.g. IN)', type: 'text' },
      { name: 'latitude', label: 'Map Latitude (Optional)', type: 'number' },
      { name: 'longitude', label: 'Map Longitude (Optional)', type: 'number' },
      { name: 'phone', label: 'Office Phone Number', type: 'text' },
      { name: 'photo_url', label: 'Office Photo URL (Optional)', type: 'text', placeholder: 'https://... or /images/...' },
      { name: 'sort_order', label: 'Display Order', type: 'number', required: true },
      { name: 'is_active', label: 'Active (Visible on Website)', type: 'boolean' },
    ],
  },
  'ticker-metrics': {
    key: 'ticker-metrics',
    table: 'ticker_metrics',
    label: 'Ticker metric',
    pluralLabel: 'Ticker metrics',
    orderBy: 'sort_order',
    listColumns: ['label', 'value', 'is_active'],
    revalidateTag: 'ticker-metrics',
    fields: [
      { name: 'label', label: 'Ticker Label (e.g. Lighthouse Score)', type: 'text', required: true, placeholder: 'Lighthouse Score' },
      { name: 'value', label: 'Ticker Value (e.g. 98/100 or Sub-500ms)', type: 'text', required: true, placeholder: '98/100' },
      { name: 'sort_order', label: 'Display Order', type: 'number', required: true },
      { name: 'is_active', label: 'Active (Visible on Website)', type: 'boolean' },
    ],
  },
  'social-links': {
    key: 'social-links',
    table: 'social_links',
    label: 'Social link',
    pluralLabel: 'Social links',
    orderBy: 'sort_order',
    listColumns: ['label', 'href', 'is_active'],
    revalidateTag: 'social-links',
    fields: [
      { name: 'label', label: 'Platform Name (e.g. LinkedIn, Twitter / X, GitHub)', type: 'text', required: true, placeholder: 'LinkedIn' },
      { name: 'href', label: 'Social Profile URL (https://...)', type: 'text', required: true, placeholder: 'https://linkedin.com/company/quantyro' },
      { name: 'sort_order', label: 'Display Order', type: 'number', required: true },
      { name: 'is_active', label: 'Active (Visible on Website)', type: 'boolean' },
    ],
  },
  'site-settings': {
    key: 'site-settings',
    table: 'site_settings',
    label: 'Site settings',
    pluralLabel: 'Site settings',
    orderBy: 'id',
    singleton: true,
    revalidateTag: 'site-settings',
    fields: [
      { name: 'org_name', label: 'Company / Organization Name (H1 in Header)', type: 'text', required: true, placeholder: 'Quantyro Technologies' },
      { name: 'tagline', label: 'Main Tagline (H2 Hero Subtitle)', type: 'text', required: true, placeholder: 'Engineering High-Performance Digital Platforms' },
      { name: 'announcement_badge', label: 'Top Announcement Pill Chip', type: 'text', placeholder: '● Available for Q3/Q4 Sprints' },
      { name: 'description', label: 'Hero Meta / Intro Paragraph (P Tag / Rich Text)', type: 'richtext', required: true },
      { name: 'url', label: 'Canonical Website URL', type: 'text', required: true, placeholder: 'https://quantyrotechnologies.com' },
      { name: 'contact_email', label: 'Official Contact Email', type: 'text', required: true, placeholder: 'contact@quantyrotechnologies.com' },
      { name: 'contact_phone', label: 'Official Contact Phone', type: 'text', placeholder: '+91 99999 99999' },
      { name: 'response_time', label: 'Client SLA Response SLA (e.g. < 4 Hours)', type: 'text', required: true, placeholder: '< 4 Hours SLA' },
      { name: 'about_story', label: 'About Page: Founding Narrative (H2/P Rich Text)', type: 'richtext', placeholder: 'Write company founding story...' },
      { name: 'about_mission', label: 'About Page: Mission Statement (P Tag / Rich Text)', type: 'richtext' },
      { name: 'privacy_policy', label: 'Privacy Policy Document (Full Rich Text)', type: 'richtext' },
      { name: 'terms_conditions', label: 'Terms & Conditions Document (Full Rich Text)', type: 'richtext' },
      { name: 'footer_blurb', label: 'Footer Paragraph Text (P Tag / Rich Text)', type: 'richtext', required: true },
      { name: 'copyright_text', label: 'Copyright Notice Text (e.g. © 2026 Quantyro Technologies)', type: 'text', required: true },
    ],
  },
  'contact-submissions': {
    key: 'contact-submissions',
    table: 'contact_submissions',
    label: 'Submission',
    pluralLabel: 'Submissions',
    orderBy: 'created_at',
    orderDirection: 'desc',
    listColumns: ['name', 'email', 'source', 'status', 'created_at'],
    allowCreate: false,
    revalidateTag: 'contact-submissions',
    fields: [
      { name: 'name', label: 'Sender Name', type: 'text', readOnly: true },
      { name: 'email', label: 'Sender Email', type: 'text', readOnly: true },
      { name: 'company', label: 'Company Name', type: 'text', readOnly: true },
      { name: 'source', label: 'Page / Form Source', type: 'text', readOnly: true },
      { name: 'message', label: 'Message Details', type: 'textarea', readOnly: true },
      { name: 'status', label: 'Status', type: 'select', required: true, options: [{ value: 'new', label: 'New / Unread' }, { value: 'read', label: 'Read' }, { value: 'archived', label: 'Archived' }] },
      { name: 'created_at', label: 'Received At', type: 'text', readOnly: true },
    ],
  },
  'blog-posts': {
    key: 'blog-posts',
    table: 'blog_posts',
    label: 'Blog post',
    pluralLabel: 'Blog posts',
    orderBy: 'created_at',
    orderDirection: 'desc',
    listColumns: ['title', 'status', 'published_at'],
    revalidateTag: 'blog-posts',
    seoFields: { title: 'seo_title', titleFallback: 'title', description: 'seo_description', descriptionFallback: 'excerpt', body: 'content' },
    fields: [
      { name: 'slug', label: 'URL Slug (e.g. building-high-scale-nextjs)', type: 'text', required: true },
      { name: 'title', label: 'Article Headline (H1 on Blog Post)', type: 'text', required: true, placeholder: 'e.g. Architecting Distributed Systems with Next.js' },
      { name: 'excerpt', label: 'Excerpt / Summary (P Tag / Card Preview)', type: 'richtext', required: true },
      { name: 'content', label: 'Full Article Content (H2, H3, Code, Lists, Rich Text)', type: 'richtext', required: true },
      { name: 'author_name', label: 'Author Name', type: 'text', required: true, placeholder: 'e.g. Chirag Kumar' },
      {
        name: 'status', label: 'Publication Status', type: 'select', required: true,
        options: [
          { value: 'draft', label: 'Draft (Hidden)' },
          { value: 'scheduled', label: 'Scheduled (Auto-publish at date)' },
          { value: 'published', label: 'Published (Live Now)' },
        ],
      },
      { name: 'published_at', label: 'Publish Date & Time', type: 'datetime' },
      { name: 'tags', label: 'Article Tags (e.g. Next.js, Architecture, DevOps)', type: 'string-array' },
      { name: 'related_service_id', label: 'Related Service Link at Footer', type: 'relation', relationTable: 'services', relationLabelField: 'title' },
      { name: 'related_industry_id', label: 'Related Industry Link at Footer', type: 'relation', relationTable: 'industries', relationLabelField: 'title' },
      { name: 'accent', label: 'Cover Accent Glow', type: 'select', required: true, options: [{ value: 'accent', label: 'Blue Glow' }, { value: 'accent-2', label: 'Cyan Glow' }] },
      { name: 'seo_title', label: 'SEO Meta Title (Optional)', type: 'text' },
      { name: 'seo_description', label: 'SEO Meta Description (Optional)', type: 'textarea' },
      { name: 'sort_order', label: 'Display Order', type: 'number', required: true },
    ],
  },
  'blog-comments': {
    key: 'blog-comments',
    table: 'blog_comments',
    label: 'Comment',
    pluralLabel: 'Blog comments',
    orderBy: 'created_at',
    orderDirection: 'desc',
    listColumns: ['name', 'email', 'comment', 'status'],
    allowCreate: false,
    revalidateTag: 'blog-comments',
    fields: [
      { name: 'name', label: 'Commenter Name', type: 'text', readOnly: true },
      { name: 'email', label: 'Commenter Email', type: 'text', readOnly: true },
      { name: 'comment', label: 'Comment Content', type: 'textarea', readOnly: true },
      {
        name: 'status', label: 'Review Status', type: 'select', required: true,
        options: [
          { value: 'pending', label: 'Pending Moderation' },
          { value: 'approved', label: 'Approved (Visible on Article)' },
          { value: 'rejected', label: 'Rejected (Hidden)' },
        ],
      },
      { name: 'created_at', label: 'Submitted At', type: 'text', readOnly: true },
    ],
  },
  certifications: {
    key: 'certifications',
    table: 'certifications',
    label: 'Certification',
    pluralLabel: 'Certifications',
    orderBy: 'sort_order',
    listColumns: ['title', 'issuer', 'is_active'],
    revalidateTag: 'certifications',
    fields: [
      { name: 'title', label: 'Certification Title (H4)', type: 'text', required: true, placeholder: 'e.g. AWS Certified Solutions Architect' },
      { name: 'issuer', label: 'Issuing Organization', type: 'text', required: true, placeholder: 'e.g. Amazon Web Services' },
      { name: 'issue_date', label: 'Issue Date (YYYY-MM-DD)', type: 'text', placeholder: '2026-01-15' },
      { name: 'credential_url', label: 'Verification URL (Optional External Link)', type: 'text', placeholder: 'https://...' },
      { name: 'sort_order', label: 'Display Order', type: 'number', required: true },
      { name: 'is_active', label: 'Active (Visible on Website)', type: 'boolean' },
    ],
  },
  'showcase-items': {
    key: 'showcase-items',
    table: 'showcase_items',
    label: 'Showcase Item',
    pluralLabel: 'Showcase Items',
    orderBy: 'sort_order',
    listColumns: ['title', 'tag', 'device_type', 'is_active'],
    revalidateTag: 'showcase-items',
    fields: [
      { name: 'tag', label: 'Category Badge (Pill Tag at Top)', type: 'text', required: true, placeholder: 'e.g. Web & Enterprise Platforms' },
      { name: 'title', label: 'Main Headline (H1 / Big Title)', type: 'text', required: true, placeholder: 'e.g. High-Performance Websites & SaaS' },
      { name: 'subtitle', label: 'Subheading (H2 / Tagline)', type: 'text', required: true, placeholder: 'e.g. Mission-critical web platforms engineered for zero downtime' },
      { name: 'description', label: 'Detailed Description (P Tag / Rich Text)', type: 'richtext', required: true },
      {
        name: 'device_type', label: 'Frame Device Mockup Type', type: 'select', required: true,
        options: [
          { value: 'laptop', label: 'Laptop / Desktop Browser Window' },
          { value: 'mobile', label: 'Mobile Device Frame' },
        ],
      },
      {
        name: 'screen_type', label: 'Mockup Visual Type', type: 'select', required: true,
        options: [
          { value: 'web', label: 'Web / SaaS Interactive Dashboard' },
          { value: 'seo', label: 'SEO & Organic Growth Metrics' },
          { value: 'ai', label: 'AI Copilot & Vector RAG Flow' },
          { value: 'healthcare', label: 'Healthcare & Enterprise Portals' },
        ],
      },
      { name: 'accent_color', label: 'Accent Color Hex (e.g. #1768D6)', type: 'text', placeholder: '#1768D6' },
      { name: 'sort_order', label: 'Display Order', type: 'number', required: true },
      { name: 'is_active', label: 'Active (Visible on Website)', type: 'boolean' },
    ],
  },
  'service-region-pages': {
    key: 'service-region-pages',
    table: 'service_region_pages',
    label: 'Service/region page',
    pluralLabel: 'Location pages',
    orderBy: 'sort_order',
    listColumns: ['region', 'is_active'],
    revalidateTag: 'service-region-pages',
    seoFields: { title: 'seo_title', description: 'seo_description', descriptionFallback: 'intro', body: 'intro' },
    fields: [
      { name: 'service_id', label: 'Service', type: 'relation', required: true, relationTable: 'services', relationLabelField: 'title' },
      {
        name: 'region', label: 'Region Name', type: 'select', required: true,
        options: [
          { value: 'North America', label: 'North America' },
          { value: 'Europe', label: 'Europe' },
          { value: 'South Asia', label: 'South Asia' },
          { value: 'APAC', label: 'APAC' },
        ],
      },
      { name: 'intro', label: 'Region Intro Narrative (P Tag / Rich Text)', type: 'richtext', required: true },
      { name: 'seo_title', label: 'SEO Meta Title (Optional)', type: 'text' },
      { name: 'seo_description', label: 'SEO Meta Description (Optional)', type: 'textarea' },
      { name: 'sort_order', label: 'Display Order', type: 'number', required: true },
      { name: 'is_active', label: 'Published (Live on Website)', type: 'boolean' },
    ],
  },
  'location-pages': {
    key: 'location-pages',
    table: 'location_pages',
    label: 'City location page',
    pluralLabel: 'City pages',
    orderBy: 'sort_order',
    listColumns: ['city', 'is_active'],
    revalidateTag: 'location-pages',
    seoFields: { title: 'seo_title', description: 'seo_description', descriptionFallback: 'local_note', body: 'local_note' },
    fields: [
      { name: 'service_id', label: 'Related Service (Optional)', type: 'relation', relationTable: 'services', relationLabelField: 'title' },
      { name: 'industry_id', label: 'Related Industry (Optional)', type: 'relation', relationTable: 'industries', relationLabelField: 'title' },
      {
        name: 'city', label: 'City Name', type: 'select', required: true,
        options: CITIES.map((c) => ({ value: c, label: c })),
      },
      { name: 'nearby_areas', label: 'Nearby Areas (Comma-separated, optional)', type: 'text' },
      { name: 'local_note', label: 'City Case Note / Local Narrative (P Tag / Rich Text)', type: 'richtext' },
      { name: 'faqs', label: 'City-specific FAQs (JSON array of {q, a})', type: 'json' },
      { name: 'target_keywords', label: 'Target Search Keywords (One phrase per line)', type: 'string-array' },
      { name: 'seo_title', label: 'SEO Meta Title (Optional)', type: 'text' },
      { name: 'seo_description', label: 'SEO Meta Description (Optional)', type: 'textarea' },
      { name: 'sort_order', label: 'Display Order', type: 'number', required: true },
      { name: 'is_active', label: 'Published (Live on Website)', type: 'boolean' },
    ],
  },
  'tech-stack-pages': {
    key: 'tech-stack-pages',
    table: 'tech_stack_pages',
    label: 'Service deep-dive page',
    pluralLabel: 'Service deep-dives',
    orderBy: 'sort_order',
    listColumns: ['title', 'capability_label', 'is_active'],
    revalidateTag: 'tech-stack-pages',
    seoFields: { title: 'seo_title', description: 'seo_description', descriptionFallback: 'overview', body: 'overview' },
    fields: [
      { name: 'service_id', label: 'Parent Service', type: 'relation', required: true, relationTable: 'services', relationLabelField: 'title' },
      { name: 'capability_label', label: 'Capability Label (Matches entry in Service capabilities)', type: 'text', required: true },
      { name: 'slug', label: 'URL Slug (e.g. mern-stack-web-development)', type: 'text', required: true, placeholder: 'mern-stack-web-development' },
      { name: 'title', label: 'Main Headline (H1 on Deep Dive Page)', type: 'text', required: true },
      { name: 'tagline', label: 'Subheading (H2 / Tagline)', type: 'text', required: true },
      { name: 'overview', label: 'Overview Paragraph 1 (P Tag / Rich Text)', type: 'richtext', required: true },
      { name: 'overview_extra', label: 'Overview Paragraph 2 (P Tag / Rich Text)', type: 'richtext', required: true },
      { name: 'implementation', label: '"How we build this" Steps (One point per line)', type: 'string-array' },
      { name: 'benefits', label: 'Key Benefits (One point per line)', type: 'string-array' },
      { name: 'companies', label: 'Companies Using This (JSON array of {name, note})', type: 'json' },
      { name: 'use_cases', label: 'Use Cases (One point per line)', type: 'string-array' },
      { name: 'faqs', label: 'FAQs (JSON array of {q, a})', type: 'json' },
      { name: 'primary_tech', label: 'Primary Tech Tags (One tag per line)', type: 'string-array' },
      { name: 'target_keywords', label: 'Target Search Keywords (One per line)', type: 'string-array' },
      { name: 'seo_title', label: 'SEO Meta Title (Optional)', type: 'text' },
      { name: 'seo_description', label: 'SEO Meta Description (Optional)', type: 'textarea' },
      { name: 'sort_order', label: 'Display Order', type: 'number', required: true },
      { name: 'is_active', label: 'Published (Live on Website)', type: 'boolean' },
    ],
  },
  'industry-solution-pages': {
    key: 'industry-solution-pages',
    table: 'industry_solution_pages',
    label: 'Industry deep-dive page',
    pluralLabel: 'Industry deep-dives',
    orderBy: 'sort_order',
    listColumns: ['title', 'capability_label', 'is_active'],
    revalidateTag: 'industry-solution-pages',
    seoFields: { title: 'seo_title', description: 'seo_description', descriptionFallback: 'overview', body: 'overview' },
    fields: [
      { name: 'industry_id', label: 'Parent Industry', type: 'relation', required: true, relationTable: 'industries', relationLabelField: 'title' },
      { name: 'capability_label', label: 'Capability Label (Matches entry in Industry capabilities)', type: 'text', required: true },
      { name: 'slug', label: 'URL Slug (e.g. ai-fraud-detection)', type: 'text', required: true, placeholder: 'ai-fraud-detection-risk-scoring' },
      { name: 'title', label: 'Main Headline (H1 on Solution Page)', type: 'text', required: true },
      { name: 'tagline', label: 'Subheading (H2 / Tagline)', type: 'text', required: true },
      { name: 'overview', label: 'Overview Paragraph 1 (P Tag / Rich Text)', type: 'richtext', required: true },
      { name: 'overview_extra', label: 'Overview Paragraph 2 (P Tag / Rich Text)', type: 'richtext', required: true },
      { name: 'implementation', label: '"How we build this" Steps (One per line)', type: 'string-array' },
      { name: 'benefits', label: 'Key Benefits (One per line)', type: 'string-array' },
      { name: 'companies', label: 'Companies Using This (JSON array of {name, note})', type: 'json' },
      { name: 'use_cases', label: 'Use Cases (One per line)', type: 'string-array' },
      { name: 'faqs', label: 'FAQs (JSON array of {q, a})', type: 'json' },
      { name: 'primary_tech', label: 'Primary Tech Tags (One per line)', type: 'string-array' },
      { name: 'target_keywords', label: 'Target Search Keywords (One per line)', type: 'string-array' },
      { name: 'seo_title', label: 'SEO Meta Title (Optional)', type: 'text' },
      { name: 'seo_description', label: 'SEO Meta Description (Optional)', type: 'textarea' },
      { name: 'sort_order', label: 'Display Order', type: 'number', required: true },
      { name: 'is_active', label: 'Published (Live on Website)', type: 'boolean' },
    ],
  },
};

export function getResourceConfig(key: string): ResourceConfig | undefined {
  return RESOURCES[key];
}
