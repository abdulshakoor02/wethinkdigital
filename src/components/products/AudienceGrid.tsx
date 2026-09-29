interface AudienceItem {
  title: string;
  description: string;
}

interface AudienceGridProps {
  items: AudienceItem[];
}

/** "Who it is for" — four short profiles. */
export default function AudienceGrid({ items }: AudienceGridProps) {
  return (
    <ul className="grid gap-3.5 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item.title} className="surface surface-hover p-7 sm:p-8">
          <h3 className="text-lg font-semibold tracking-[-0.025em] text-foreground">
            {item.title}
          </h3>
          <p className="mt-3 text-sm leading-[1.65] text-muted">{item.description}</p>
        </li>
      ))}
    </ul>
  );
}
