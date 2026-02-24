import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { localBusinessSchema, organizationSchema, professionalServiceSchema } from "./schema";
import WhatsAppButton from "@/components/WhatsAppButton";
import Navigation from "@/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: false, // Only preload critical fonts
});

export const metadata: Metadata = {
  title: "CRM Solutions Dubai | Customer Relationship Management - ebusiness+",
  description: "ebusiness+ provides top-tier CRM solutions in Dubai. Streamline customer relationships, automate sales workflows, and boost productivity with our integrated CRM system.",
  keywords: "CRM software Dubai, customer relationship management, CRM system Dubai, sales CRM, CRM for small business, cloud CRM, CRM for sales teams, business management software, marketing automation Dubai",
  authors: [{ name: "ebusiness+ Team" }],
  creator: "ebusiness+",
  openGraph: {
    title: "CRM Solutions Dubai | Customer Relationship Management - ebusiness+",
    description: "ebusiness+ provides top-tier CRM solutions in Dubai. Streamline customer relationships, automate sales workflows, and boost productivity with our integrated CRM system.",
    type: "website",
    url: "https://www.ebusinessplus.ae",
    siteName: "ebusiness+",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "CRM Solutions Dubai | ebusiness+",
    description: "Streamline your customer relationships with powerful CRM solutions from ebusiness+ in Dubai.",
  },
  alternates: {
    canonical: "https://www.ebusinessplus.ae",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Critical resource hints */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Critical CSS inlined for faster rendering */}
        <style dangerouslySetInnerHTML={{
          __html: `
            :root{--background:#18191a;--foreground:#f4f4f5;--primary:#d1d5db;--secondary:#9ca3af;--accent:#52525b;--muted:#a1a1aa}
            body{background:var(--background);color:var(--foreground);margin:0;overflow-x:hidden}
            .gradient-text{background:linear-gradient(135deg,var(--primary),var(--secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
            .btn-primary{background:linear-gradient(135deg,var(--primary),var(--secondary));border:none;color:white;padding:12px 24px;border-radius:8px;font-weight:600;transition:all 0.3s ease;cursor:pointer}
            .btn-secondary{background:transparent;border:2px solid var(--primary);color:var(--primary);padding:12px 24px;border-radius:8px;font-weight:600;transition:all 0.3s ease;cursor:pointer}
            nav{position:fixed;top:0;left:0;right:0;z-index:50}
          `
        }} />

        {/* Optimize critical CSS delivery */}
        <link rel="preload" href="/wethinkdigital.ico" as="image" type="image/x-icon" />

        <Script
          id="json-ld-organization"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />

        <Script
          id="json-ld-localbusiness"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />

        <Script
          id="json-ld-service"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
        />

        <Script
          id="json-ld-blog"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              "name": "ebusiness+ Blog",
              "url": "https://www.ebusinessplus.ae/blog",
              "description": "Latest insights, tips, and news from ebusiness+ about ERP, CRM, and business automation strategies."
            })
          }}
        />

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

        <link rel="icon" href="/wethinkdigital.ico" />

        {/* Mobile-optimized font preloading */}
        <link
          rel="preload"
          href="/_next/static/media/GeistVF.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          media="(min-width: 768px)"
        />

        {/* Critical font subset for mobile */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @media (max-width: 767px) {
              .gradient-text, h1, h2, h3 {
                font-display: swap;
                text-rendering: optimizeSpeed;
              }
            }
          `
        }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
