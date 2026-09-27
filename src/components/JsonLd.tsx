/**
 * JsonLd — emits a raw <script type="application/ld+json"> tag in the
 * server-rendered HTML.
 *
 * Why not next/script: `strategy="beforeInteractive"` routes the payload
 * through Next's `self.__next_s` queue, so the markup that actually reaches the
 * browser is a JS push — not an ld+json block. Crawlers that do not execute
 * JavaScript (GPTBot, PerplexityBot, ClaudeBot, most AI answer engines) then
 * see nothing. A raw script tag is readable by every crawler and by anything
 * that extracts structured data from HTML.
 */
export default function JsonLd({ id, data }: { id?: string; data: unknown }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
