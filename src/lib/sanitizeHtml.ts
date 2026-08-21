import sanitizeHtml from 'sanitize-html';

/**
 * Server-side allowlist sanitizer for admin-authored rich text (TipTap
 * output) before it's persisted. The editor already only produces these
 * tags, but never trust client input for something rendered with
 * dangerouslySetInnerHTML — this is the actual XSS boundary.
 */
export function sanitizeRichText(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'br', 'strong', 'em', 'u', 's',
      'ul', 'ol', 'li', 'blockquote', 'a',
    ],
    allowedAttributes: {
      a: ['href', 'target', 'rel'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }),
    },
  });
}
