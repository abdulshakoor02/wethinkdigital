import Link from 'next/link';
import { siteConfig } from '@/lib/site';

const companyLinks = [
  { name: 'Process', href: '/#process' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const { agents, resume } = siteConfig.apps;

  return (
    <footer className="border-t border-line bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="text-2xl font-bold tracking-[-0.04em] text-foreground">
              WeThink<span className="text-primary">Digital</span>
            </Link>
            <p className="mt-5 max-w-sm leading-7 text-muted">
              An AI and software engineering company. We build AI automation, autonomous agent
              systems, custom software and modern web applications for teams that need to move
              faster.
            </p>
          </div>

          {/* Services */}
          <div>
            <h2 className="mono-label">Services</h2>
            <ul className="mt-5 space-y-3">
              {siteConfig.services.map((service) => (
                <li key={service.href}>
                  <Link href={service.href} className="text-sm text-muted transition-colors hover:text-foreground">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h2 className="mono-label">Products</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <Link href={resume.href} className="text-sm text-muted transition-colors hover:text-foreground">
                  {resume.shortName}
                </Link>
              </li>
              <li>
                <Link href={agents.href} className="text-sm text-muted transition-colors hover:text-foreground">
                  {agents.shortName}
                </Link>
              </li>
              <li>
                <a
                  href={resume.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  Launch Resume AI ↗
                </a>
              </li>
              <li>
                <a
                  href={agents.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  Launch Agents ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h2 className="mono-label">Company</h2>
            <ul className="mt-5 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted transition-colors hover:text-foreground">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {siteConfig.name}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-foreground">
              {siteConfig.email}
            </a>
            <a href={siteConfig.phoneHref} className="transition-colors hover:text-foreground">
              {siteConfig.phone}
            </a>
            <p>Dubai, UAE</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
