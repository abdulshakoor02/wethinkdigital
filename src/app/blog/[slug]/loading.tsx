/** Skeleton mirroring the note layout: breadcrumb, header, body column, contents rail. */
export default function BlogPostLoading() {
  return (
    <main className="pt-32" aria-busy="true" aria-label="Loading note">
      <div className="mx-auto max-w-7xl animate-pulse px-6 sm:px-10 lg:px-16">
        <div className="h-4 w-56 rounded-full bg-surface-elevated" />

        <div className="mt-8 max-w-3xl border-b border-line pb-10">
          <div className="h-6 w-32 rounded-full bg-surface-elevated" />
          <div className="mt-6 space-y-3">
            <div className="h-10 rounded-card bg-surface-elevated" />
            <div className="h-10 w-4/5 rounded-card bg-surface-elevated" />
          </div>
          <div className="mt-6 space-y-2">
            <div className="h-4 rounded-full bg-surface-elevated" />
            <div className="h-4 w-3/4 rounded-full bg-surface-elevated" />
          </div>
          <div className="mt-8 h-4 w-64 rounded-full bg-surface-elevated" />
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16">
          <div className="max-w-3xl space-y-10">
            {[0, 1, 2].map((block) => (
              <div key={block} className="space-y-3">
                <div className="h-7 w-2/5 rounded-card bg-surface-elevated" />
                <div className="h-4 rounded-full bg-surface-elevated" />
                <div className="h-4 w-11/12 rounded-full bg-surface-elevated" />
                <div className="h-4 w-4/5 rounded-full bg-surface-elevated" />
                <div className="h-4 w-10/12 rounded-full bg-surface-elevated" />
              </div>
            ))}
          </div>

          <div className="hidden space-y-3 lg:block">
            <div className="h-3 w-28 rounded-full bg-surface-elevated" />
            {[0, 1, 2, 3, 4].map((row) => (
              <div key={row} className="h-4 w-full rounded-full bg-surface-elevated" />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
