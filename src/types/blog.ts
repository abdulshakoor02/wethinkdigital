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
}

export interface BlogPostMetadata {
  title: string;
  description: string;
  date: string;
  author: string;
  readTime?: string;
  tags?: string[];
  image?: string;
}