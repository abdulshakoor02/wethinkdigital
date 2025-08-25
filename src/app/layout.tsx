import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { localBusinessSchema } from "./schema";
import WhatsAppButton from "@/components/WhatsAppButton";

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
  title: "Best Digital Marketing Company in Dubai | Custom Web Development Dubai",
  description: "I help businesses in Dubai & UAE dominate their market with custom web development, SEO, and digital marketing services. I get results. It's that simple.",
  keywords: "best digital marketing company dubai, digital marketing services dubai uae, social media marketing agency dubai, seo services dubai small business, ppc advertising company dubai, content marketing services uae, email marketing agency dubai, website design companies dubai uae, custom web development dubai, ecommerce website development uae, responsive web design dubai, mobile app development dubai, wordpress development company dubai, custom software development dubai, mobile app developers uae, enterprise software solutions dubai, crm software development dubai, business automation software uae",
  authors: [{ name: "WeThinkDigital Team" }],
  creator: "WeThinkDigital",
  openGraph: {
    title: "Best Digital Marketing Company in Dubai | Custom Web Development Dubai",
    description: "I help businesses in Dubai & UAE dominate their market with custom web development, SEO, and digital marketing services. I get results. It's that simple.",
    type: "website",
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
            :root{--background:#0f172a;--foreground:#f8fafc;--primary:#6b46c1;--secondary:#3b82f6;--accent:#10b981;--muted:#64748b}
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
          id="json-ld-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
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
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
