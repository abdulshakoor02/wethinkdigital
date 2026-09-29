import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';

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
        title={
          <>
            What we <span className="serif">build with</span>
          </>
        }
        description="Chosen per project against your constraints and what your team can maintain after we hand over — never because something is new."
      />

      <dl className="mt-14 border-y border-line">
        {groups.map((group) => (
          <div
            key={group.name}
            className="grid gap-4 border-b border-line py-7 last:border-b-0 sm:grid-cols-[13rem_1fr] sm:gap-8"
          >
            <dt className="mono-label sm:pt-1">{group.name}</dt>
            <dd>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <span className="pill">{item}</span>
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
