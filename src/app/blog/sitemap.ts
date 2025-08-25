import { MetadataRoute } from 'next';
import { BlogPost } from '@/types/blog';

// Mock blog posts data - in a real app, this would come from a CMS or database
const mockPosts: Pick<BlogPost, 'id' | 'slug' | 'date'>[] = [
  {
    id: '1',
    slug: 'digital-marketing-trends-2025',
    date: '2025-08-15',
  },
  {
    id: '2',
    slug: 'seo-best-practices',
    date: '2025-08-01',
  },
  {
    id: '3',
    slug: 'web-development-frameworks',
    date: '2025-07-20',
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const blogUrls: MetadataRoute.Sitemap = [
    {
      url: 'https://www.wethinkdigital.solutions/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  mockPosts.forEach(post => {
    blogUrls.push({
      url: `https://www.wethinkdigital.solutions/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  return blogUrls;
}