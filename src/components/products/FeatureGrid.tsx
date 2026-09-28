import type { ProductFeature } from '@/data/products';

interface FeatureGridProps {
  features: ProductFeature[];
}

/** Three-column capability grid used on both product pages. */
export default function FeatureGrid({ features }: FeatureGridProps) {
  return (
    <ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {features.map((feature, index) => (
        <li key={feature.title} className="bg-surface p-7 sm:p-8">
          <p className="font-mono text-xs tracking-[0.2em] text-primary">
            {String(index + 1).padStart(2, '0')}
          </p>
          <h3 className="mt-4 text-lg font-bold tracking-[-0.03em] text-foreground">
            {feature.title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-muted">{feature.description}</p>
        </li>
      ))}
    </ul>
  );
}
