/**
 * Renders admin-authored rich text (sanitized HTML from RichTextEditor).
 * Safe to use dangerouslySetInnerHTML here — sanitizeRichText() strips
 * anything outside a small allowlist at write time, so what's stored is
 * never attacker-controlled markup.
 */
export default function RichText({ html, className = '' }: { html: string; className?: string }) {
  return (
    <div
      className={`
        [&_h1]:text-[26px] [&_h1]:font-bold [&_h1]:font-[var(--font-display)] [&_h1]:text-[var(--ink)] [&_h1]:mt-[24px] [&_h1]:mb-[10px] [&_h1]:first:mt-0
        [&_h2]:text-[22px] [&_h2]:font-bold [&_h2]:font-[var(--font-display)] [&_h2]:text-[var(--ink)] [&_h2]:mt-[22px] [&_h2]:mb-[9px] [&_h2]:first:mt-0
        [&_h3]:text-[19px] [&_h3]:font-bold [&_h3]:font-[var(--font-display)] [&_h3]:text-[var(--ink)] [&_h3]:mt-[20px] [&_h3]:mb-[8px] [&_h3]:first:mt-0
        [&_h4]:text-[17px] [&_h4]:font-bold [&_h4]:text-[var(--ink)] [&_h4]:mt-[18px] [&_h4]:mb-[7px] [&_h4]:first:mt-0
        [&_h5]:text-[15px] [&_h5]:font-bold [&_h5]:text-[var(--ink)] [&_h5]:mt-[16px] [&_h5]:mb-[6px] [&_h5]:first:mt-0
        [&_h6]:text-[13px] [&_h6]:font-bold [&_h6]:uppercase [&_h6]:tracking-wide [&_h6]:text-[var(--muted)] [&_h6]:mt-[16px] [&_h6]:mb-[6px] [&_h6]:first:mt-0
        [&_p]:mb-[14px] [&_p]:last:mb-0
        [&_a]:text-[var(--accent)] [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:opacity-80
        [&_strong]:font-bold [&_strong]:text-[var(--ink)]
        [&_ul]:list-disc [&_ul]:pl-[22px] [&_ul]:mb-[14px] [&_ul]:space-y-[4px]
        [&_ol]:list-decimal [&_ol]:pl-[22px] [&_ol]:mb-[14px] [&_ol]:space-y-[4px]
        [&_blockquote]:border-l-[3px] [&_blockquote]:border-[var(--accent)] [&_blockquote]:pl-[16px] [&_blockquote]:italic [&_blockquote]:text-[var(--muted)] [&_blockquote]:my-[14px]
        ${className}
      `}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
