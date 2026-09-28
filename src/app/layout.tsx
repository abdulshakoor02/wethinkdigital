import type { Metadata } from 'next';
import Script from 'next/script';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import JsonLd from '@/components/JsonLd';
import { organizationSchema, websiteSchema, professionalServiceSchema } from './schema';
import WhatsAppButton from '@/components/WhatsAppButton';
import Navigation from '@/components/Navigation';
import { siteConfig } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: false, // Only preload critical fonts
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  ...buildMetadata({
    title: 'WeThinkDigital — AI Automation, AI Agents & Custom Software Development',
    description: siteConfig.description,
    path: '/',
    absoluteTitle: true,
    keywords: [
      'ai automation',
      'ai agents',
      'custom software development',
      'web development',
      'llm application development',
      'agentic workflows',
      'software engineering company',
      'ai integration services',
    ],
  }),
  authors: [{ name: `${siteConfig.name} Team` }],
  creator: siteConfig.name,
};

/**
 * Inlined first-paint styles. Mirrors the dark canvas tokens in globals.css so
 * the page never flashes white before the stylesheet resolves.
 */
const criticalCss = `
:root{--background:oklch(0.15 0.02 260);--foreground:oklch(0.97 0.005 260);--primary:oklch(0.68 0.19 255);--line:oklch(0.33 0.028 263)}
html{background:var(--background)}
body{background:var(--background);color:var(--foreground);margin:0;overflow-x:hidden}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        {/* Critical resource hints */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        <style dangerouslySetInnerHTML={{ __html: criticalCss }} />

        {/* Favicon: lightweight SVG + PNG */}
        <link rel="icon" type="image/svg+xml" href="/wethinkdigital.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/wethinkdigital-32.png" />
        <link rel="apple-touch-icon" sizes="64x64" href="/wethinkdigital-64.png" />

        <JsonLd id="json-ld-organization" data={organizationSchema} />
        <JsonLd id="json-ld-website" data={websiteSchema} />
        <JsonLd id="json-ld-service" data={professionalServiceSchema} />

        {process.env.NODE_ENV === 'production' && (
          <>
            <Script
              strategy="afterInteractive"
              src="https://www.googletagmanager.com/gtag/js?id=AW-17485985143"
            />
            <Script
              id="gtag-inline-script"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'AW-17485985143');
                `,
              }}
            />
          </>
        )}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:inline-flex focus:items-center focus:rounded-md focus:bg-primary focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-background focus:shadow-lg"
        >
          Skip to content
        </a>
        <Navigation />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
