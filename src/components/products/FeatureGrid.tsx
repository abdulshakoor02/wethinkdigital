import type { ProductFeature } from '@/data/products';

interface FeatureGridProps {
  features: ProductFeature[];
}

/** Three-column capability grid used on both product pages. */
export default function FeatureGrid({ features }: FeatureGridProps) {
  return (
    <ul className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((feature, index) => (
        <li key={feature.title} className="surface surface-hover p-7 sm:p-8">
          <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-primary">
            {String(index + 1).padStart(2, '0')}
          </p>
          <h3 className="mt-4 text-lg font-semibold tracking-[-0.025em] text-foreground">
            {feature.title}
          </h3>
          <p className="mt-3 text-sm leading-[1.65] text-muted">{feature.description}</p>
        </li>
      ))}
    </ul>
  );
}
