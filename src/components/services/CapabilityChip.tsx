import type { ReactNode } from 'react';

/**
 * Ember capability glyphs. Inline SVG only — no icon library is installed and
 * none should be added. Six abstract engineering marks, one per capability card.
 */
const glyphs: ReactNode[] = [
  // Agent systems — hub and spokes
  <>
    <circle cx="6.4" cy="12" r="2.3" />
    <circle cx="17.6" cy="6.4" r="2.3" />
    <circle cx="17.6" cy="17.6" r="2.3" />
    <path d="M8.5 10.9 15.5 7.5M8.5 13.1l7 3.4" />
  </>,
  // Retrieval with citations — sourced document
  <>
    <path d="M6.8 3.5h6.4L18.5 8.8v11.7H6.8z" />
    <path d="M13.2 3.5v5.3h5.3" />
    <path d="M9.6 13h5.4M9.6 16.4h3.2" />
  </>,
  // Evaluations — measured, not asserted
  <>
    <path d="M4 20h16" />
    <path d="M7.6 20v-5.6M12 20V6.2M16.4 20v-9" />
  </>,
  // Designed for the second year — layered architecture
  <>
    <path d="M12 3.6 20 7.9l-8 4.3-8-4.3z" />
    <path d="m4 12.2 8 4.3 8-4.3" />
    <path d="m4 16.4 8 4.3 8-4.3" />
  </>,
  // Performance as a budget — gauge
  <>
    <path d="M5 18a7 7 0 0 1 14 0" />
    <path d="M12 18l3.8-5.2" />
    <circle cx="12" cy="18" r="1.1" />
  </>,
  // Handover as a deliverable — out of the box
  <>
    <path d="M20 12.4v8.1H4.6V4.5h8.1" />
    <path d="M14.6 4.5H20v5.4" />
    <path d="m20 4.5-7.4 7.4" />
  </>,
];

interface CapabilityChipProps {
  /** Position of the capability in its grid; picks the glyph. */
  index: number;
}

/** Small ember-tinted rounded-square icon chip used by every capability card. */
export default function CapabilityChip({ index }: CapabilityChipProps) {
  const glyph = glyphs[index % glyphs.length];

  return (
    <span
      aria-hidden="true"
      className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-[10px] bg-primary-soft text-primary"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {glyph}
      </svg>
    </span>
  );
}
