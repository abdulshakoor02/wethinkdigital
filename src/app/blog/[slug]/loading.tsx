export default function BlogPostLoading() {
  return (
    <main className="min-h-screen bg-background px-6 pb-20 pt-32 sm:px-10 lg:px-16" aria-busy="true" aria-label="Loading journal entry">
      <div className="mx-auto max-w-5xl animate-pulse">
        <div className="h-4 w-28 bg-surface-elevated" />
        <div className="mt-10 h-16 max-w-3xl bg-surface-elevated" />
        <div className="mt-4 h-5 w-48 bg-surface-elevated" />
        <div className="mt-12 max-w-3xl space-y-4">
          <div className="h-4 bg-surface-elevated" />
          <div className="h-4 w-11/12 bg-surface-elevated" />
          <div className="h-4 w-4/5 bg-surface-elevated" />
          <div className="h-4 bg-surface-elevated" />
          <div className="h-4 w-10/12 bg-surface-elevated" />
        </div>
      </div>
    </main>
  );
}
