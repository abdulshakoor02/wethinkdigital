import type { TocEntry } from '@/types/blog';

/** Strip any inline tags out of heading markup and decode the few entities we author with. */
function toPlainText(html: string): string {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

/** URL-safe anchor fragment derived from heading text. */
function slugifyHeading(text: string): string {
  return (
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-') || 'section'
  );
}

const H2_PATTERN = /<h2(\s[^>]*)?>([\s\S]*?)<\/h2>/gi;

/**
 * Parse the post body on the server: pull out every `<h2>` for the contents
 * rail and return the same HTML with matching `id` attributes injected so the
 * anchors resolve. Duplicate headings get a numeric suffix.
 *
 * Runs once per request on the server — the body is trusted, statically
 * authored HTML, so a regex pass is cheaper and simpler than a DOM parser.
 */
export function buildTableOfContents(html: string): {
  content: string;
  toc: TocEntry[];
} {
  const toc: TocEntry[] = [];
  const used = new Map<string, number>();

  const content = html.replace(H2_PATTERN, (match, attrs: string | undefined, inner: string) => {
    const text = toPlainText(inner);
    if (!text) return match;

    const base = slugifyHeading(text);
    const seen = used.get(base) ?? 0;
    used.set(base, seen + 1);
    const id = seen === 0 ? base : `${base}-${seen + 1}`;

    toc.push({ id, text });

    const existing = attrs ?? '';
    // Respect a hand-authored id if one is ever added to the source.
    if (/\sid\s*=/i.test(existing)) return match;

    return `<h2 id="${id}"${existing}>${inner}</h2>`;
  });

  return { content, toc };
}

/** Rough word count of a rendered HTML body — used for `wordCount` in schema. */
export function countWords(html: string): number {
  const text = toPlainText(html);
  if (!text) return 0;
  return text.split(/\s+/).length;
}
