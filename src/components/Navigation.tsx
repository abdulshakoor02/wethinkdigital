'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const navItems = [
  { id: 'services', name: 'Services', href: '#services' },
  { id: 'seo-services', name: 'SEO Services', href: '/seo-services' },
  { id: 'case-studies', name: 'Proof', href: '#case-studies' },
  { id: 'process', name: 'Process', href: '#process' },
  { id: 'approach', name: 'Approach', href: '#approach' },
  { id: 'blog', name: 'Journal', href: '/blog' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 32);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    let attempts = 0;
    const findAndScroll = () => {
      const delayedElement = document.getElementById(id);
      if (delayedElement) {
        delayedElement.scrollIntoView({ behavior: 'smooth' });
      } else if (attempts < 20) {
        attempts += 1;
        window.setTimeout(findAndScroll, 100);
      }
    };
    findAndScroll();
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${isScrolled ? 'border-line bg-background/95' : 'border-transparent bg-transparent'}`}>
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-[-0.04em] text-foreground">
            WeThink<span className="text-primary">Digital</span>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              item.href.startsWith('#') ? (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  {item.name}
                </button>
              ) : (
                <Link key={item.id} href={item.href} className="text-sm text-muted transition-colors hover:text-foreground">
                  {item.name}
                </Link>
              )
            ))}
            <button type="button" onClick={() => scrollToSection('contact')} className="btn-primary min-h-11 px-5 py-2 text-sm">
              Plan a growth audit
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center border border-line text-foreground md:hidden"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="border-t border-line bg-background py-5 md:hidden">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                item.href.startsWith('#') ? (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      closeMenu();
                      scrollToSection(item.id);
                    }}
                    className="min-h-12 border-b border-line py-3 text-left text-base text-muted hover:text-foreground"
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link key={item.id} href={item.href} onClick={closeMenu} className="min-h-12 border-b border-line py-3 text-base text-muted hover:text-foreground">
                    {item.name}
                  </Link>
                )
              ))}
              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  scrollToSection('contact');
                }}
                className="btn-primary mt-4 w-full"
              >
                Plan a growth audit
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
