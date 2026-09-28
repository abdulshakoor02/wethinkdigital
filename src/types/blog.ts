/**
 * Blog domain types.
 *
 * `content` is a trusted HTML fragment authored in `src/data/posts.ts` and
 * rendered with `dangerouslySetInnerHTML` inside a `.prose-wtd` container.
 * It never contains user input.
 */

export type BlogCategory =
  | 'AI Automation'
  | 'AI Engineering'
  | 'Software Development'
  | 'Web Development'
  | 'Engineering Practice';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  /** ISO date, YYYY-MM-DD. Present when the post was revised after publishing. */
  updated?: string;
  author: string;
  readTime: string;
  category: BlogCategory;
  tags: string[];
  metaTitle?: string;
  metaDescription: string;
  keywords: string[];
}

/**
 * The subset of a post needed to render a card or list row. Used to keep the
 * multi-kilobyte `content` field out of client component payloads.
 */
export interface PostSummary {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: BlogCategory;
  tags: string[];
}

/** A single `<h2>` extracted from a post body, used to build the contents rail. */
export interface TocEntry {
  id: string;
  text: string;
}
