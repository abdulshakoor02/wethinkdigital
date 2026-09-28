import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Pill from '@/components/ui/Pill';

interface StackGroup {
  name: string;
  items: string[];
}

const groups: StackGroup[] = [
  {
    name: 'Languages',
    items: ['TypeScript', 'Python', 'Go', 'SQL', 'Rust', 'Bash'],
  },
  {
    name: 'AI / ML',
    items: [
      'OpenAI',
      'Anthropic Claude',
      'Llama',
      'LangGraph',
      'LlamaIndex',
      'pgvector',
      'Qdrant',
      'Pinecone',
      'PyTorch',
      'Hugging Face',
    ],
  },
  {
    name: 'Frontend',
    items: ['React', 'Next.js', 'Tailwind CSS', 'Radix UI', 'Framer Motion', 'Vite', 'Playwright'],
  },
  {
    name: 'Backend & data',
    items: [
      'Node.js',
      'FastAPI',
      'PostgreSQL',
      'Redis',
      'Kafka',
      'GraphQL',
      'Temporal',
      'Elasticsearch',
    ],
  },
  {
    name: 'Cloud & DevOps',
    items: [
      'AWS',
      'Google Cloud',
      'Docker',
      'Kubernetes',
      'Terraform',
      'GitHub Actions',
      'Vercel',
      'Cloudflare',
      'OpenTelemetry',
      'Grafana',
    ],
  },
];

/** Home section: the technologies we work with, grouped by layer. */
export default function TechStack() {
  return (
    <Section id="stack" bordered muted>
      <SectionHeading
        eyebrow="Stack"
        title="What we build with"
        description="Chosen per project against your constraints and what your team can maintain after we hand over — never because something is new."
      />

      <dl className="mt-14 space-y-px overflow-hidden rounded-lg border border-line bg-line">
        {groups.map((group) => (
          <div
            key={group.name}
            className="grid gap-4 bg-background-muted p-7 sm:grid-cols-[13rem_1fr] sm:gap-8"
          >
            <dt className="font-mono text-xs uppercase tracking-[0.24em] text-primary sm:pt-1.5">
              {group.name}
            </dt>
            <dd>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <Pill>{item}</Pill>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
