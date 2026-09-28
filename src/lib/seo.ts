import type { Metadata } from 'next';
import { siteConfig } from './site';

/** Turn a site-relative path into a fully qualified URL. */
export function absoluteUrl(path = '/'): string {
  if (path.startsWith('http')) return path;
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${siteConfig.url}${clean === '/' ? '' : clean}`;
}

export interface BuildMetadataOptions {
  /** Page title without the brand suffix — the helper appends it. */
  title: string;
  description: string;
  /** Site-relative path, e.g. "/services/ai-automation". */
  path?: string;
  keywords?: string[];
  type?: 'website' | 'article';
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  noIndex?: boolean;
  /** Set true on the home page so the title is not suffixed twice. */
  absoluteTitle?: boolean;
}

/**
 * Build a consistent Metadata object: canonical URL, Open Graph and Twitter
 * cards all derived from one place. Every page must use this.
 */
export function buildMetadata({
  title,
  description,
  path = '/',
  keywords,
  type = 'website',
  image,
  publishedTime,
  modifiedTime,
  authors,
  noIndex = false,
  absoluteTitle = false,
}: BuildMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  const ogImage = absoluteUrl(image ?? siteConfig.ogImage);

  return {
    title: fullTitle,
    description,
    ...(keywords?.length ? { keywords } : {}),
    ...(authors?.length ? { authors: authors.map((name) => ({ name })) } : {}),
    alternates: { canonical: url },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: 'en_US',
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }],
      ...(type === 'article'
        ? {
            publishedTime,
            modifiedTime: modifiedTime ?? publishedTime,
            authors,
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}
