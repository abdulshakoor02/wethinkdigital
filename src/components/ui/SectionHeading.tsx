import type { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Render as h1 on pages where this is the primary heading. */
  as?: 'h1' | 'h2';
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  as: Tag = 'h2',
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  const isCenter = align === 'center';

  return (
    <div
      className={[
        isCenter ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {eyebrow ? <p className="mono-label mb-5">{eyebrow}</p> : null}
      <Tag
        className={
          Tag === 'h1'
            ? 'text-4xl font-bold leading-[1.05] tracking-[-0.05em] text-foreground sm:text-6xl'
            : 'text-3xl font-bold leading-[1.1] tracking-[-0.045em] text-foreground sm:text-5xl'
        }
      >
        {title}
      </Tag>
      {description ? (
        <p
          className={[
            'mt-6 text-lg leading-8 text-muted',
            isCenter ? 'mx-auto max-w-2xl' : 'max-w-2xl',
          ].join(' ')}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
