import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';

interface Capability {
  title: string;
  description: string;
}

const capabilities: Capability[] = [
  {
    title: 'Agent systems that survive contact with real backlogs',
    description:
      'Not a demo loop on a clean example. Step budgets, explicit termination conditions, retries with compensation, and a human checkpoint in front of anything irreversible.',
  },
  {
    title: 'RAG that returns citations, not vibes',
    description:
      'Hybrid retrieval with reranking, permission filtering applied at query time, and every answer traceable back to the exact chunk it came from — so a wrong answer is debuggable.',
  },
  {
    title: 'Evaluations before opinions',
    description:
      'Golden datasets, scored regression runs in CI, and thresholds agreed before launch. A prompt change either improves the number or it does not ship.',
  },
  {
    title: 'Systems designed for their second year',
    description:
      'Service boundaries, data models and migration paths chosen so the fourth feature is not harder to build than the first. Architecture decisions written down, not remembered.',
  },
  {
    title: 'Performance treated as a budget',
    description:
      'JavaScript payload and Core Web Vitals limits set at the start and enforced in CI, measured on throttled mobile hardware rather than a developer laptop.',
  },
  {
    title: 'Handover as a deliverable, not a favour',
    description:
      'Your repositories, your cloud accounts, your CI. Runbooks, architecture notes and a working session with your engineers, so continuing without us is a real option.',
  },
];

/** Home section: what we are actually good at, stated as engineering claims. */
export default function Capabilities() {
  return (
    <Section id="capabilities" bordered muted>
      <SectionHeading
        eyebrow="Capabilities"
        title="What we are good at"
        description="Six claims we are willing to be held to. Each one is a thing you can check in the code we hand over."
      />

      <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((capability, index) => (
          <article key={capability.title} className="bg-background-muted p-7">
            <span
              aria-hidden="true"
              className="font-mono text-xs tabular-nums uppercase tracking-[0.24em] text-primary"
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-4 text-lg font-semibold leading-snug tracking-[-0.025em] text-foreground">
              {capability.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted">{capability.description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
