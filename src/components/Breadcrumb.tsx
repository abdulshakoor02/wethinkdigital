'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbProps {
  pageTitle?: string;
}

export default function Breadcrumb({ pageTitle }: BreadcrumbProps) {
  const pathname = usePathname();

  if (pathname === '/') return null;

  const pathSegments = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [{ name: 'Home', href: '/' }];
  let currentPath = '';

  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    let name = segment;
    if (segment === 'blog') {
      name = 'Journal';
    } else if (index === pathSegments.length - 1 && pageTitle) {
      name = pageTitle;
    } else {
      name = segment.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
    breadcrumbs.push({ name, href: currentPath });
  });

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://www.wethinkdigital.solutions${item.href}`,
    })),
  };

  return (
    <>
      <nav aria-label="Breadcrumb" className="border-b border-line bg-background pt-20">
        <div className="mx-auto max-w-7xl px-6 py-4 sm:px-10 lg:px-16">
          <ol className="flex items-center gap-2 text-sm" itemScope itemType="https://schema.org/BreadcrumbList">
            {breadcrumbs.map((item, index) => (
              <li key={item.href} className="flex items-center" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                {index > 0 && <span className="px-1 text-muted" aria-hidden="true">/</span>}
                {index === breadcrumbs.length - 1 ? (
                  <span className="font-medium text-foreground" itemProp="name" aria-current="page">{item.name}</span>
                ) : (
                  <Link href={item.href} className="text-muted hover:text-primary" itemProp="item">
                    <span itemProp="name">{item.name}</span>
                  </Link>
                )}
                <meta itemProp="position" content={String(index + 1)} />
              </li>
            ))}
          </ol>
        </div>
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}
