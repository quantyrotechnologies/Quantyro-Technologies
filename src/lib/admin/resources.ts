export type FieldType = 'text' | 'textarea' | 'number' | 'boolean' | 'string-array' | 'select' | 'datetime' | 'relation';

export interface FieldOption {
  value: string;
  label: string;
}

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  /** Static choices for type 'select'. For type 'relation' this is populated dynamically at request time — see relationTable/etc. */
  options?: FieldOption[];
  /** type 'relation' only: which table to pull dropdown choices from. */
  relationTable?: string;
  /** type 'relation' only: column used as the option's visible label (defaults to 'title'). */
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

const CAPABILITIES_FIELD: FieldConfig = { name: 'capabilities', label: 'Capabilities', type: 'string-array', required: true };
const TAGS_FIELD: FieldConfig = { name: 'tags', label: 'Tags', type: 'string-array', required: true };

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
      { name: 'slug', label: 'Slug', type: 'text', required: true },
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      CAPABILITIES_FIELD,
      { name: 'stack', label: 'Tech stack', type: 'string-array' },
      { name: 'seo_title', label: 'SEO title (optional)', type: 'text' },
      { name: 'seo_description', label: 'SEO description (optional)', type: 'textarea' },
      { name: 'sort_order', label: 'Sort order', type: 'number', required: true },
      { name: 'is_active', label: 'Active', type: 'boolean' },
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
      { name: 'slug', label: 'Slug', type: 'text', required: true },
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'client', label: 'Client', type: 'text', required: true },
      { name: 'region', label: 'Region', type: 'text', required: true },
      { name: 'result', label: 'Result', type: 'text', required: true },
      { name: 'year', label: 'Year (optional)', type: 'number', placeholder: 'e.g. 2025 — leave blank to hide' },
      TAGS_FIELD,
      { name: 'summary', label: 'Short summary (card)', type: 'textarea', required: true },
      { name: 'detail', label: 'Full detail (expanded view)', type: 'textarea', required: true },
      { name: 'stack', label: 'Tech stack (optional)', type: 'string-array' },
      { name: 'duration', label: 'Delivery time (optional)', type: 'text', placeholder: 'e.g. 6 weeks' },
      { name: 'highlights', label: 'Advanced / notable features (optional)', type: 'string-array' },
      { name: 'accent', label: 'Accent color', type: 'select', options: [{ value: 'accent', label: 'Blue' }, { value: 'accent-2', label: 'Cyan' }], required: true },
      { name: 'is_featured', label: 'Featured on homepage', type: 'boolean' },
      { name: 'sort_order', label: 'Sort order', type: 'number', required: true },
      { name: 'is_active', label: 'Active', type: 'boolean' },
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
      { name: 'quote', label: 'Quote', type: 'textarea', required: true },
      { name: 'name', label: 'Client name', type: 'text', required: true },
      { name: 'role', label: 'Role', type: 'text', required: true },
      { name: 'company', label: 'Company', type: 'text', required: true },
      { name: 'initials', label: 'Avatar initials', type: 'text', required: true },
      { name: 'avatar_bg', label: 'Avatar background (hex)', type: 'text', required: true },
      { name: 'avatar_fg', label: 'Avatar text color (hex)', type: 'text', required: true },
      { name: 'sort_order', label: 'Sort order', type: 'number', required: true },
      { name: 'is_active', label: 'Active', type: 'boolean' },
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
        name: 'page_slug', label: 'Page', type: 'select', required: true,
        options: [
          { value: 'home', label: 'Home' },
          { value: 'services', label: 'Services' },
          { value: 'work', label: 'Work' },
          { value: 'about', label: 'About' },
          { value: 'contact', label: 'Contact' },
          { value: 'blog', label: 'Blog' },
          { value: 'service-custom-software', label: 'Service: Custom Software' },
          { value: 'service-ai-machine-learning', label: 'Service: AI & Machine Learning' },
          { value: 'service-cloud-devops', label: 'Service: Cloud & DevOps' },
          { value: 'service-mobile-apps', label: 'Service: Mobile Apps' },
          { value: 'service-e-commerce', label: 'Service: E-Commerce' },
        ],
      },
      { name: 'question', label: 'Question', type: 'text', required: true },
      { name: 'answer', label: 'Answer', type: 'textarea', required: true },
      { name: 'sort_order', label: 'Sort order', type: 'number', required: true },
      { name: 'is_active', label: 'Active', type: 'boolean' },
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
      { name: 'count', label: 'Count', type: 'number', required: true },
      { name: 'suffix', label: 'Suffix (e.g. + or %)', type: 'text', required: true },
      { name: 'label', label: 'Label', type: 'text', required: true },
      { name: 'tag', label: 'Tag', type: 'text', required: true },
      { name: 'accent', label: 'Accent color', type: 'select', options: [{ value: 'accent', label: 'Blue' }, { value: 'accent-2', label: 'Cyan' }], required: true },
      { name: 'sort_order', label: 'Sort order', type: 'number', required: true },
      { name: 'is_active', label: 'Active', type: 'boolean' },
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
      { name: 'step', label: 'Step number (e.g. 01)', type: 'text', required: true },
      { name: 'phase_tag', label: 'Phase tag', type: 'text', required: true },
      { name: 'badge', label: 'Badge', type: 'text', required: true },
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'deliverables', label: 'Deliverables', type: 'string-array', required: true },
      { name: 'status', label: 'Status', type: 'text', required: true },
      { name: 'terminal_cmd', label: 'Terminal command', type: 'text', required: true },
      { name: 'terminal_output', label: 'Terminal output', type: 'text', required: true },
      {
        name: 'icon_key', label: 'Icon', type: 'select', required: true,
        options: [
          { value: 'handshake', label: 'Handshake' },
          { value: 'calendar', label: 'Calendar' },
          { value: 'blueprint', label: 'Blueprint' },
          { value: 'sprint', label: 'Sprint' },
          { value: 'launch', label: 'Launch' },
        ],
      },
      { name: 'sort_order', label: 'Sort order', type: 'number', required: true },
      { name: 'is_active', label: 'Active', type: 'boolean' },
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
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'sort_order', label: 'Sort order', type: 'number', required: true },
      { name: 'is_active', label: 'Active', type: 'boolean' },
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
      { name: 'city', label: 'City', type: 'text', required: true },
      { name: 'region', label: 'Region', type: 'text', required: true },
      { name: 'address_line1', label: 'Address line 1', type: 'text' },
      { name: 'address_line2', label: 'Address line 2', type: 'text' },
      { name: 'locality', label: 'Locality', type: 'text' },
      { name: 'admin_area', label: 'State / province', type: 'text' },
      { name: 'postal_code', label: 'Postal code', type: 'text' },
      { name: 'country', label: 'Country', type: 'text' },
      { name: 'latitude', label: 'Latitude', type: 'number' },
      { name: 'longitude', label: 'Longitude', type: 'number' },
      { name: 'phone', label: 'Phone', type: 'text' },
      { name: 'photo_url', label: 'Office photo URL (optional)', type: 'text', placeholder: 'https://... — leave blank to show no photo' },
      { name: 'sort_order', label: 'Sort order', type: 'number', required: true },
      { name: 'is_active', label: 'Active', type: 'boolean' },
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
      { name: 'label', label: 'Label', type: 'text', required: true },
      { name: 'value', label: 'Value', type: 'text', required: true },
      { name: 'sort_order', label: 'Sort order', type: 'number', required: true },
      { name: 'is_active', label: 'Active', type: 'boolean' },
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
      { name: 'label', label: 'Label', type: 'text', required: true },
      { name: 'href', label: 'URL', type: 'text', required: true },
      { name: 'sort_order', label: 'Sort order', type: 'number', required: true },
      { name: 'is_active', label: 'Active', type: 'boolean' },
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
      { name: 'org_name', label: 'Organization name', type: 'text', required: true },
      { name: 'tagline', label: 'Tagline', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'url', label: 'Site URL', type: 'text', required: true },
      { name: 'contact_email', label: 'Contact email', type: 'text', required: true },
      { name: 'contact_phone', label: 'Contact phone', type: 'text' },
      { name: 'response_time', label: 'Response time', type: 'text', required: true },
      { name: 'footer_blurb', label: 'Footer blurb', type: 'textarea', required: true },
      { name: 'copyright_text', label: 'Copyright text', type: 'text', required: true },
    ],
  },
  'contact-submissions': {
    key: 'contact-submissions',
    table: 'contact_submissions',
    label: 'Submission',
    pluralLabel: 'Submissions',
    orderBy: 'created_at',
    orderDirection: 'desc',
    listColumns: ['name', 'email', 'company', 'status', 'created_at'],
    allowCreate: false,
    revalidateTag: 'contact-submissions',
    fields: [
      { name: 'name', label: 'Name', type: 'text', readOnly: true },
      { name: 'email', label: 'Email', type: 'text', readOnly: true },
      { name: 'company', label: 'Company', type: 'text', readOnly: true },
      { name: 'message', label: 'Message', type: 'textarea', readOnly: true },
      { name: 'status', label: 'Status', type: 'select', required: true, options: [{ value: 'new', label: 'New' }, { value: 'read', label: 'Read' }, { value: 'archived', label: 'Archived' }] },
      { name: 'created_at', label: 'Received', type: 'text', readOnly: true },
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
      { name: 'slug', label: 'Slug', type: 'text', required: true },
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'excerpt', label: 'Excerpt', type: 'textarea', required: true },
      { name: 'content', label: 'Content', type: 'textarea', required: true },
      { name: 'author_name', label: 'Author', type: 'text', required: true },
      {
        name: 'status', label: 'Status', type: 'select', required: true,
        options: [
          { value: 'draft', label: 'Draft (hidden)' },
          { value: 'scheduled', label: 'Scheduled (goes live at Publish date)' },
          { value: 'published', label: 'Published (live now)' },
        ],
      },
      { name: 'published_at', label: 'Publish date', type: 'datetime' },
      { name: 'tags', label: 'Tags', type: 'string-array' },
      { name: 'accent', label: 'Cover color', type: 'select', required: true, options: [{ value: 'accent', label: 'Blue' }, { value: 'accent-2', label: 'Cyan' }] },
      { name: 'seo_title', label: 'SEO title (optional)', type: 'text' },
      { name: 'seo_description', label: 'SEO description (optional)', type: 'textarea' },
      { name: 'sort_order', label: 'Sort order', type: 'number', required: true },
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
      { name: 'name', label: 'Name', type: 'text', readOnly: true },
      { name: 'email', label: 'Email', type: 'text', readOnly: true },
      { name: 'comment', label: 'Comment', type: 'textarea', readOnly: true },
      {
        name: 'status', label: 'Status', type: 'select', required: true,
        options: [
          { value: 'pending', label: 'Pending review' },
          { value: 'approved', label: 'Approved (visible on site)' },
          { value: 'rejected', label: 'Rejected' },
        ],
      },
      { name: 'created_at', label: 'Submitted', type: 'text', readOnly: true },
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
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'issuer', label: 'Issuing organization', type: 'text', required: true },
      { name: 'issue_date', label: 'Issue date', type: 'text', placeholder: 'YYYY-MM-DD' },
      { name: 'credential_url', label: 'Credential URL (optional)', type: 'text' },
      { name: 'sort_order', label: 'Sort order', type: 'number', required: true },
      { name: 'is_active', label: 'Active', type: 'boolean' },
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
        name: 'region', label: 'Region', type: 'select', required: true,
        options: [
          { value: 'North America', label: 'North America' },
          { value: 'Europe', label: 'Europe' },
          { value: 'South Asia', label: 'South Asia' },
          { value: 'APAC', label: 'APAC' },
        ],
      },
      { name: 'intro', label: 'Intro (genuine, region-specific — not a template)', type: 'textarea', required: true },
      { name: 'seo_title', label: 'SEO title (optional)', type: 'text' },
      { name: 'seo_description', label: 'SEO description (optional)', type: 'textarea' },
      { name: 'sort_order', label: 'Sort order', type: 'number', required: true },
      { name: 'is_active', label: 'Published (only turn on once real case studies back this page)', type: 'boolean' },
    ],
  },
};

export function getResourceConfig(key: string): ResourceConfig | undefined {
  return RESOURCES[key];
}
