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
  
  // Don't show breadcrumb on homepage
  if (pathname === '/') return null;

  const pathSegments = pathname.split('/').filter(segment => segment !== '');
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', href: '/' }
  ];

  // Build breadcrumb path
  let currentPath = '';
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    
    let name = segment;
    // Customize names for different paths
    switch (segment) {
      case 'blog':
        name = 'Blog';
        break;
      default:
        // For blog posts, use the pageTitle if provided
        if (index === pathSegments.length - 1 && pageTitle) {
          name = pageTitle;
        } else {
          // Convert slug to readable name
          name = segment.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ');
        }
    }

    breadcrumbs.push({
      name,
      href: currentPath
    });
  });

  // Generate structured data for breadcrumbs
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://www.wethinkdigital.solutions${item.href}`
    }))
  };

  return (
    <>
      <nav 
        aria-label="Breadcrumb" 
        className="pt-20 pb-4 bg-background border-b border-gray-800/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol 
            className="flex items-center space-x-2 text-sm" 
            itemScope 
            itemType="https://schema.org/BreadcrumbList"
          >
            {breadcrumbs.map((item, index) => (
              <li
                key={item.href}
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
                className="flex items-center"
              >
                {index > 0 && (
                  <svg 
                    className="w-4 h-4 text-gray-500 mx-2" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                )}
                
                {index === breadcrumbs.length - 1 ? (
                  // Current page - not clickable
                  <span 
                    className="text-gray-400 font-medium"
                    itemProp="name"
                    aria-current="page"
                  >
                    {item.name}
                  </span>
                ) : (
                  // Clickable breadcrumb links
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors"
                    itemProp="item"
                  >
                    <span itemProp="name">{item.name}</span>
                  </Link>
                )}
                
                <meta itemProp="position" content={String(index + 1)} />
              </li>
            ))}
          </ol>
        </div>
      </nav>

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
    </>
  );
}
