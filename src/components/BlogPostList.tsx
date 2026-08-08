import Link from 'next/link';
import type { BlogPost } from '@/types/blog';

interface BlogPostListProps {
  posts: BlogPost[];
}

export default function BlogPostList({ posts }: BlogPostListProps) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {posts.map((post) => (
        <article key={post.id} className="py-8 md:py-10">
          <Link href={`/blog/${post.slug}`} className="group block">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
              <h2 className="max-w-3xl text-2xl font-bold tracking-[-0.03em] text-foreground group-hover:text-primary md:text-3xl">{post.title}</h2>
              <span className="shrink-0 font-mono text-xs uppercase tracking-[0.16em] text-muted">{post.readTime}</span>
            </div>
            {post.excerpt && <p className="mt-4 max-w-3xl leading-7 text-muted">{post.excerpt}</p>}
            <div className="mt-5 flex items-center gap-3 text-sm text-muted">
              <time dateTime={post.date}>{new Date(post.date).toISOString().split('T')[0]}</time>
              <span aria-hidden="true">·</span>
              <span>By {post.author}</span>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
