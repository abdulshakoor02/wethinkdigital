import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';

interface ProcessStep {
  title: string;
  description: string;
}

const steps: ProcessStep[] = [
  {
    title: 'Discovery and technical shaping',
    description:
      'We work out what is actually being asked for, what already exists, and where the risk sits. The output is a domain model, a set of boundaries and a sequence that tackles the most uncertain part first rather than last.',
  },
  {
    title: 'Prototype or spike',
    description:
      'Before anyone commits to a full build, we prove the hard part on your real data in a time-boxed spike. You get a measured baseline for quality, latency and cost — and an honest answer if the approach will not work.',
  },
  {
    title: 'Build in reviewable increments',
    description:
      'Two-week cycles, each ending in something deployable. Small pull requests against your branching model, demos rather than status reports, and scope adjusted on evidence from working software.',
  },
  {
    title: 'Evaluate and harden',
    description:
      'Regression suites, load and failure testing, and for AI systems the evaluation harness, guardrails and cost ceilings. We deliberately try to break it before your users find the same edges.',
  },
  {
    title: 'Ship and support',
    description:
      'Deployment through a pipeline your team controls, with monitoring and alerting mapped to real user impact. Then documentation, a runbook and a handover session — with ongoing support if you want it.',
  },
];

/** Home section: how an engagement actually runs. */
export default function Process() {
  return (
    <Section id="process" bordered>
      <SectionHeading
        eyebrow="Process"
        title="How the work runs"
        description="Five stages. The point of the order is that the riskiest unknown gets tested early, while changing direction is still cheap."
      />

      <ol className="mt-14 space-y-px overflow-hidden rounded-lg border border-line bg-line">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="grid gap-4 bg-background p-7 sm:grid-cols-[auto_1fr] sm:gap-10 sm:p-9"
          >
            <span
              aria-hidden="true"
              className="font-mono text-sm tabular-nums uppercase tracking-[0.24em] text-primary sm:pt-1"
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <div>
              <h3 className="text-xl font-semibold tracking-[-0.03em] text-foreground">
                {step.title}
              </h3>
              <p className="mt-3 max-w-3xl text-base leading-7 text-muted">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
