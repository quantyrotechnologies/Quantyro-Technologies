/**
 * Plain-text extraction for rich-text fields reused in contexts that must
 * not contain markup — meta descriptions, JSON-LD `description` properties.
 * Server- and client-safe (no DOM dependency).
 */
export function stripHtml(html: string): string {
  return html
    .replace(/<(h[1-6]|p|li|br)\b[^>]*>/gi, ' ')
    .replace(/<\/(h[1-6]|p|li)>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}
