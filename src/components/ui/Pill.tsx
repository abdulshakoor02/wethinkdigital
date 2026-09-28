import type { ReactNode } from 'react';

interface PillProps {
  children: ReactNode;
  tone?: 'default' | 'primary' | 'secondary' | 'accent' | 'success';
  className?: string;
}

const tones: Record<NonNullable<PillProps['tone']>, string> = {
  default: 'border-line text-muted',
  primary: 'border-primary/40 text-primary bg-primary/10',
  secondary: 'border-secondary/40 text-secondary bg-secondary/10',
  accent: 'border-accent/40 text-accent bg-accent/10',
  success: 'border-success/40 text-success bg-success/10',
};

/** Small capability / tech-stack tag. */
export default function Pill({ children, tone = 'default', className = '' }: PillProps) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-tight',
        tones[tone],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  );
}
