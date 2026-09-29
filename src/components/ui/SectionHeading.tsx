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

const headingClass = {
  h1: 'text-[2.5rem] font-semibold leading-[1.06] tracking-[-0.045em] text-foreground sm:text-6xl lg:text-[4.4rem]',
  h2: 'text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-foreground sm:text-5xl',
} as const;

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
      <Tag className={headingClass[Tag]}>{title}</Tag>
      {description ? (
        <p
          className={[
            'mt-6 text-[1.05rem] leading-[1.66] text-muted sm:text-[1.0625rem]',
            isCenter ? 'mx-auto max-w-2xl' : 'max-w-2xl',
          ].join(' ')}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
