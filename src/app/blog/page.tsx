import { Metadata } from 'next';
import { BlogPost } from '@/types/blog';
import BlogPostList from '@/components/BlogPostList';
import BlogHeader from '@/components/BlogHeader';

export const metadata: Metadata = {
  title: 'Blog | WeThinkDigital',
  description: 'Latest insights, tips, and news from WeThinkDigital about digital marketing, web development, and SEO strategies.',
  openGraph: {
    title: 'Blog | WeThinkDigital',
    description: 'Latest insights, tips, and news from WeThinkDigital about digital marketing, web development, and SEO strategies.',
    type: 'website',
    locale: 'en_US',
  },
};

// Mock blog posts data - in a real app, this would come from a CMS or database
const mockPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'digital-marketing-trends-2025',
    title: 'Digital marketing trends worth paying attention to',
    excerpt: 'A clear view of the shifts changing digital growth and what they mean for a commercial team.',
    content: '',
    date: '2025-08-15',
    author: 'WeThinkDigital Team',
    readTime: '5 min read',
  },
  {
    id: '2',
    slug: 'seo-best-practices',
    title: 'SEO practices for modern websites',
    excerpt: 'The technical and editorial decisions that help search work compound over time.',
    content: '',
    date: '2025-08-01',
    author: 'WeThinkDigital Team',
    readTime: '6 min read',
  },
  {
    id: '3',
    slug: 'web-development-frameworks',
    title: 'Choosing a web development framework',
    excerpt: 'A practical way to weigh team, product, and maintenance needs before you commit.',
    content: '',
    date: '2025-07-20',
    author: 'WeThinkDigital Team',
    readTime: '7 min read',
  },
  {
    id: '4',
    slug: 'best-seo-company-in-dubai',
    title: 'What a good SEO partner should measure in Dubai',
    excerpt: 'A practical look at the difference between ranking reports and commercial progress.',
    content: '',
    date: '2025-08-20',
    author: 'WeThinkDigital Team',
    readTime: '8 min read',
  },
  {
    id: '5',
    slug: 'best-seo-services-in-dubai',
    title: 'The SEO services that actually move a business forward',
    excerpt: 'Five ways to connect search work to the revenue decisions behind it.',
    content: '',
    date: '2025-08-18',
    author: 'WeThinkDigital Team',
    readTime: '9 min read',
  },
  {
    id: '6',
    slug: 'crm-and-lead-management',
    title: 'Where good leads disappear after they arrive',
    excerpt: 'The handoffs between marketing, sales, and operations that quietly cost growth.',
    content: '',
    date: '2025-08-15',
    author: 'WeThinkDigital Team',
    readTime: '10 min read',
  },
  {
    id: '7',
    slug: 'website-design-development-services-in-dubai',
    title: 'Why most business websites fail to convert',
    excerpt: 'What separates a useful commercial path from a digital brochure.',
    content: '',
    date: '2025-08-12',
    author: 'WeThinkDigital Team',
    readTime: '12 min read',
  },
  {
    id: '8',
    slug: 'top-10-digital-marketing-company-in-dubai',
    title: 'Why agency rankings do not make the decision',
    excerpt: 'A better way to compare partners when the stakes are commercial.',
    content: '',
    date: '2025-08-10',
    author: 'WeThinkDigital Team',
    readTime: '11 min read',
  },
  {
    id: '9',
    slug: 'top-5-digital-marketing-company-in-dubai',
    title: 'How to find the right growth partner',
    excerpt: 'The questions that reveal whether an agency understands your business.',
    content: '',
    date: '2025-08-08',
    author: 'WeThinkDigital Team',
    readTime: '10 min read',
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background px-6 pb-20 pt-32 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <BlogHeader />
        <BlogPostList posts={mockPosts} />
      </div>
    </main>
  );
}
