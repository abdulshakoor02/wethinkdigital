import type { ReactNode } from 'react';

interface PillProps {
  children: ReactNode;
  tone?: 'default' | 'primary' | 'secondary' | 'accent' | 'success';
  className?: string;
}

const tones: Record<NonNullable<PillProps['tone']>, string> = {
  default: 'border-line bg-surface text-muted',
  primary: 'border-primary/30 bg-primary-soft text-primary-strong',
  secondary: 'border-secondary/30 bg-secondary-soft text-secondary',
  accent: 'border-accent/30 bg-accent-soft text-accent',
  success: 'border-success/30 bg-success-soft text-success',
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
