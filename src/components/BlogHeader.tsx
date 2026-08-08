import Link from 'next/link';

export default function BlogHeader() {
  return (
    <header className="mb-16 grid gap-8 border-b border-line pb-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">WeThinkDigital journal</p>
        <h1 className="mt-5 text-5xl font-bold leading-none tracking-[-0.055em] text-foreground md:text-7xl">Field notes for better growth decisions.</h1>
      </div>
      <div className="max-w-xl lg:justify-self-end">
        <p className="text-lg leading-8 text-muted">Practical thinking on search, websites, systems, and the commercial details that make digital work useful.</p>
        <Link href="/#contact" className="mt-6 inline-flex text-sm font-semibold text-primary hover:text-accent">Bring us your baseline <span aria-hidden="true" className="ml-2">↗</span></Link>
      </div>
    </header>
  );
}
