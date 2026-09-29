import type { ProductFaq as ProductFaqItem } from '@/data/products';

interface ProductFaqProps {
  faqs: ProductFaqItem[];
}

/**
 * Native <details> accordion — keyboard accessible and fully functional
 * without JavaScript, so no client boundary is needed here.
 */
export default function ProductFaq({ faqs }: ProductFaqProps) {
  return (
    <div className="surface divide-y divide-line overflow-hidden">
      {faqs.map((faq) => (
        <details key={faq.question} className="group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 p-6 text-base font-semibold tracking-[-0.02em] text-foreground transition-colors hover:bg-surface-elevated sm:p-7 [&::-webkit-details-marker]:hidden">
            <span>{faq.question}</span>
            <span
              className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-line-strong text-sm leading-none text-primary transition-transform duration-200 group-open:rotate-45"
              aria-hidden="true"
            >
              +
            </span>
          </summary>
          <p className="max-w-2xl px-6 pb-7 text-sm leading-[1.65] text-muted sm:px-7">
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
