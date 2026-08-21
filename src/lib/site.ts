/**
 * Single source of truth for the production domain — referenced by
 * layout.tsx (metadataBase/OG), sitemap.ts, robots.ts, and StructuredData.tsx
 * so it can never drift out of sync between them again.
 */
export const SITE_URL = 'https://quantyrotechnologies.com';

/**
 * Route to the branded default OG/Twitter card image (src/app/opengraph-image.tsx).
 * Metadata `openGraph`/`twitter` objects are shallow-merged (a child route
 * that sets its own `openGraph` fully replaces the parent's, `images`
 * included) — so any generateMetadata that overrides `openGraph`/`twitter`
 * must re-include this, or the page silently loses its share-card image.
 */
export const DEFAULT_OG_IMAGE = '/opengraph-image';

/**
 * Same @id as the Organization node StructuredData.tsx emits site-wide.
 * @id cross-references only resolve within one JSON-LD document, so any
 * page that wants to link to the Organization must inline this node in its
 * OWN script's @graph — referencing the @id from a different <script> tag
 * (as this codebase did briefly) does not reliably resolve for crawlers.
 */
export function organizationNode() {
  return {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Quantyro Technologies',
    url: SITE_URL,
  } as const;
}
