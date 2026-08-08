'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerLinks = {
    services: [
      { name: 'Websites', href: '#services' },
      { name: 'Search visibility', href: '#services' },
      { name: 'E-commerce', href: '#services' },
      { name: 'Automation', href: '#services' },
    ],
    company: [
      { name: 'Proof', href: '#case-studies' },
      { name: 'Process', href: '#process' },
      { name: 'Approach', href: '#approach' },
      { name: 'Contact', href: '#contact' },
    ],
    resources: [
      { name: 'Journal', href: '/blog' },
      { name: 'Privacy policy', href: '#privacy' },
      { name: 'Terms of service', href: '#terms' },
    ],
  };

  return (
    <footer className="border-t border-line bg-background">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="text-2xl font-bold tracking-[-0.04em] text-foreground">WeThink<span className="text-primary">Digital</span></Link>
            <p className="mt-5 max-w-sm leading-7 text-muted">Digital acquisition systems for businesses that want a clearer path from attention to revenue.</p>
          </div>
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{group}</h2>
              <ul className="mt-5 space-y-3">
                {links.map((link) => <li key={link.name}><Link href={link.href} className="text-sm text-muted hover:text-foreground">{link.name}</Link></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} WeThinkDigital. All rights reserved.</p>
          <p>Dubai, UAE</p>
        </div>
      </div>
    </footer>
  );
}
