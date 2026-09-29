'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/lib/site';

/** One-line descriptions for the Services dropdown, keyed by route. */
const serviceDescriptions: Record<string, string> = {
  '/services/ai-automation': 'Agentic workflows that take real work off human hands.',
  '/services/ai-engineering': 'LLM, RAG and agent systems built into your product.',
  '/services/software-development': 'Product engineering, platforms, APIs and cloud.',
  '/services/web-development': 'Fast, accessible, modern web applications.',
};

export default function Navigation() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const openTimer = useRef<number | null>(null);

  /**
   * The trigger sits between "Products" and "Process", so a pointer travelling
   * across the nav to the CTA would otherwise flash the menu open. A short
   * delay on open (cancelable) keeps that from happening; closing stays instant
   * once the pointer actually leaves the group.
   */
  const openServices = useCallback(() => {
    if (openTimer.current !== null) window.clearTimeout(openTimer.current);
    openTimer.current = window.setTimeout(() => setIsServicesOpen(true), 90);
  }, []);

  const closeServices = useCallback(() => {
    if (openTimer.current !== null) {
      window.clearTimeout(openTimer.current);
      openTimer.current = null;
    }
    setIsServicesOpen(false);
  }, []);

  useEffect(
    () => () => {
      if (openTimer.current !== null) window.clearTimeout(openTimer.current);
    },
    [],
  );

  // Solid chrome once scrolled; always solid off the home page.
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close everything on route change. Adjusted during render rather than in an
  // effect: an effect would paint the new route with the old menu still open,
  // then trigger a second cascading render to close it.
  // https://react.dev/learn/you-might-not-need-an-effect
  const [renderedPathname, setRenderedPathname] = useState(pathname);
  if (pathname !== renderedPathname) {
    setRenderedPathname(pathname);
    setIsMobileOpen(false);
    setIsServicesOpen(false);
  }

  // Body scroll lock while the mobile panel is open.
  useEffect(() => {
    if (!isMobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isMobileOpen]);

  // Escape closes any open surface; outside click closes the dropdown.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setIsServicesOpen(false);
      setIsMobileOpen(false);
    };
    const onPointerDown = (event: MouseEvent) => {
      if (!servicesRef.current) return;
      if (!servicesRef.current.contains(event.target as Node)) setIsServicesOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onPointerDown);
    };
  }, []);

  /** Close the dropdown when focus leaves the whole services group. */
  const onServicesBlur = useCallback((event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      closeServices();
    }
  }, [closeServices]);

  const solid = isScrolled || !isHome || isMobileOpen;
  const linkItems = siteConfig.nav.filter((item) => item.name !== 'Services');

  return (
    <nav
      aria-label="Primary"
      className={`fixed inset-x-0 top-0 z-50 border-b bg-background/80 backdrop-blur transition-colors duration-300 ${
        solid ? 'border-line' : 'border-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="flex h-20 items-center justify-between gap-6">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-[1.09rem] font-semibold tracking-[-0.03em] text-foreground"
          >
            {/* Italic serif monogram — the brand mark, not the `.serif` emphasis device. */}
            <span
              aria-hidden="true"
              className="grid h-[26px] w-[26px] flex-none place-items-center rounded-[7px] bg-foreground font-serif text-[1rem] italic leading-none text-background"
            >
              W
            </span>
            WeThinkDigital
          </Link>

          {/* Desktop */}
          <div className="hidden items-center gap-7 md:flex">
            <div
              ref={servicesRef}
              className="relative"
              onBlur={onServicesBlur}
              onMouseEnter={openServices}
              onMouseLeave={closeServices}
            >
              <button
                type="button"
                aria-expanded={isServicesOpen}
                aria-haspopup="true"
                aria-controls="services-menu"
                onClick={() => setIsServicesOpen((open) => !open)}
                onFocus={() => setIsServicesOpen(true)}
                className="inline-flex items-center gap-1.5 py-2 text-sm text-muted transition-colors hover:text-foreground"
              >
                Services
                <svg
                  className={`h-3.5 w-3.5 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isServicesOpen && (
                <div
                  id="services-menu"
                  className="absolute left-0 top-full z-50 w-[22rem] overflow-hidden rounded-[14px] border border-line-strong bg-surface p-2 shadow-[0_26px_58px_-14px_rgb(20_19_16/0.26),0_6px_16px_-6px_rgb(20_19_16/0.13)]"
                >
                  <ul>
                    {siteConfig.services.map((service) => (
                      <li key={service.href}>
                        <Link
                          href={service.href}
                          onClick={closeServices}
                          className="block rounded-[10px] px-3 py-3 transition-colors hover:bg-surface-elevated"
                        >
                          <span className="block text-sm font-semibold tracking-tight text-foreground">
                            {service.name}
                          </span>
                          <span className="mt-0.5 block text-xs leading-5 text-muted">
                            {serviceDescriptions[service.href]}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {linkItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {item.name}
              </Link>
            ))}

            <Link href="/contact" className="btn-primary">
              Start a project
            </Link>
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setIsMobileOpen((open) => !open)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-line-strong text-foreground transition-colors hover:border-foreground md:hidden"
            aria-expanded={isMobileOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMobileOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {isMobileOpen && (
        <div
          id="mobile-menu"
          className="max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-line bg-background md:hidden"
        >
          <div className="mx-auto max-w-7xl px-6 py-6 sm:px-10">
            <p className="mono-label">Services</p>
            <ul className="mt-3 space-y-1 border-b border-line pb-5">
              {siteConfig.services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="block py-2.5 text-base text-muted transition-colors hover:text-foreground"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="mt-4 space-y-1">
              {linkItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="block py-3 text-base text-foreground"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              onClick={() => setIsMobileOpen(false)}
              className="btn-primary mt-6 w-full"
            >
              Start a project
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
