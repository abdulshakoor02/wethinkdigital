import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';

interface ProcessStep {
  title: string;
  description: string;
  /**
   * Optional stage tags rendered as `.pill` chips. Left unset here because the
   * section copy has no tag list and this redesign adds no new copy.
   */
  tags?: string[];
  /** Decorative node state, mirroring `.step.done` in the reference design. */
  done?: boolean;
}

const steps: ProcessStep[] = [
  {
    title: 'Discovery and technical shaping',
    description:
      'We work out what is actually being asked for, what already exists, and where the risk sits. The output is a domain model, a set of boundaries and a sequence that tackles the most uncertain part first rather than last.',
    done: true,
  },
  {
    title: 'Prototype or spike',
    description:
      'Before anyone commits to a full build, we prove the hard part on your real data in a time-boxed spike. You get a measured baseline for quality, latency and cost — and an honest answer if the approach will not work.',
    done: true,
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

/** Home section: how an engagement actually runs, as a numbered vertical timeline. */
export default function Process() {
  return (
    <Section id="process" bordered>
      <SectionHeading
        eyebrow="Process"
        title={
          <>
            How the work <span className="serif">runs</span>
          </>
        }
        description="Five stages. The point of the order is that the riskiest unknown gets tested early, while changing direction is still cheap."
      />

      <ol className="relative mt-14">
        {/* Connector line — the spine of the timeline. */}
        <span
          aria-hidden="true"
          className="absolute bottom-[26px] left-[19px] top-[14px] w-px bg-line"
        />

        {steps.map((step, index) => (
          <li
            key={step.title}
            className="relative grid grid-cols-[38px_1fr] gap-5 py-5 sm:gap-[22px]"
          >
            <span
              aria-hidden="true"
              className={[
                'relative z-[1] grid h-[38px] w-[38px] place-items-center rounded-full border font-mono text-[11.5px] tabular-nums',
                step.done
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-line-strong bg-background text-muted',
              ].join(' ')}
            >
              {String(index + 1).padStart(2, '0')}
            </span>

            <div className="pt-1">
              <h3 className="text-[1.0625rem] font-semibold tracking-[-0.028em] text-foreground sm:text-lg">
                {step.title}
              </h3>
              <p className="mt-2.5 max-w-[62ch] text-base leading-[1.64] text-muted">
                {step.description}
              </p>
              {step.tags && step.tags.length > 0 ? (
                <div className="mt-3.5 flex flex-wrap gap-2">
                  {step.tags.map((tag) => (
                    <span key={tag} className="pill">
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
