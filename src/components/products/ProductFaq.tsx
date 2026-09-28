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
    <div className="divide-y divide-line overflow-hidden rounded-lg border border-line bg-surface">
      {faqs.map((faq) => (
        <details key={faq.question} className="group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 p-6 text-base font-semibold tracking-[-0.02em] text-foreground transition-colors hover:text-primary sm:p-7 [&::-webkit-details-marker]:hidden">
            <span>{faq.question}</span>
            <span
              className="mt-1 shrink-0 text-primary transition-transform duration-200 group-open:rotate-45"
              aria-hidden="true"
            >
              +
            </span>
          </summary>
          <p className="px-6 pb-7 text-sm leading-7 text-muted sm:px-7">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
