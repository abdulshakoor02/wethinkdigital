import Link from 'next/link';
import type { BlogPost } from '@/types/blog';

interface BlogPostProps {
  post: BlogPost;
}

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <article className="border-y border-line py-8 md:py-12">
      <Link href="/blog" className="inline-flex items-center text-sm text-primary hover:text-accent">
        ← Back to journal
      </Link>

      <header className="mt-10 border-b border-line pb-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Field note</p>
        <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight tracking-[-0.05em] text-foreground md:text-6xl">{post.title}</h1>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted">
          <span>By {post.author}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.date}>{new Date(post.date).toISOString().split('T')[0]}</time>
          {post.readTime && <><span aria-hidden="true">·</span><span>{post.readTime}</span></>}
        </div>
      </header>

      <div className="prose prose-lg mt-10 max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
