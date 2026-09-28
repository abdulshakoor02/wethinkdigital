import type { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Adds the top+bottom hairline separators used between home sections. */
  bordered?: boolean;
  muted?: boolean;
  /** Tighter vertical rhythm for dense sections. */
  compact?: boolean;
}

/** Standard page section: consistent max width, gutters and vertical rhythm. */
export default function Section({
  id,
  children,
  className = '',
  bordered = false,
  muted = false,
  compact = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={[
        compact ? 'py-16 sm:py-20' : 'py-24 sm:py-32',
        bordered ? 'border-y border-line' : '',
        muted ? 'bg-background-muted' : 'bg-background',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">{children}</div>
    </section>
  );
}
