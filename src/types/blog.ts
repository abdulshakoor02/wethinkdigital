export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  date: string;
  author: string;
  readTime?: string;
  tags?: string[];
  image?: string;
  category?: 'Taxsaving' | 'Wealth' | 'Business' | 'Market Trends' | 'Investment';
  featured?: boolean;
}

export interface BlogCategory {
  name: 'Taxsaving' | 'Wealth' | 'Business' | 'Market Trends' | 'Investment';
  color: string;
  bgColor: string;
}

export interface BlogPostMetadata {
  title: string;
  description: string;
  date: string;
  author: string;
  readTime?: string;
  tags?: string[];
  image?: string;
  category?: 'Taxsaving' | 'Wealth' | 'Business' | 'Market Trends' | 'Investment';
}