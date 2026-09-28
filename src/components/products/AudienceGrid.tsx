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
    <ul className="grid gap-5 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item.title} className="surface surface-hover p-7">
          <h3 className="text-base font-bold tracking-[-0.02em] text-foreground">{item.title}</h3>
          <p className="mt-3 text-sm leading-7 text-muted">{item.description}</p>
        </li>
      ))}
    </ul>
  );
}
