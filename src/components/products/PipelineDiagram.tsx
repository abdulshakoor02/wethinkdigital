import type { ProductWorkflowStep } from '@/data/products';

interface PipelineDiagramProps {
  steps: ProductWorkflowStep[];
  /** Plain-language description of the flow for assistive technology. */
  summary: string;
  /** Indices (0-based) of the steps performed by an agent rather than a human. */
  agentSteps?: number[];
}

/**
 * Pipeline visual built entirely from CSS and inline SVG — no images.
 * Horizontal on large screens, stacked on mobile. The connectors are
 * decorative; a text equivalent is exposed to screen readers.
 */
export default function PipelineDiagram({
  steps,
  summary,
  agentSteps = [],
}: PipelineDiagramProps) {
  return (
    <div className="relative">
      <p className="sr-only">{summary}</p>

      <ol
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-0"
        aria-label="Delivery pipeline, in order"
      >
        {steps.map((step, index) => {
          const isAgent = agentSteps.includes(index);
          const isLast = index === steps.length - 1;

          const node = (
            <span
              className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                isAgent
                  ? 'bg-primary ring-4 ring-primary/12'
                  : 'border border-line-strong bg-surface'
              }`}
            />
          );

          return (
            <li key={step.step} className="relative flex lg:block">
              {/* Vertical rail + node for the stacked (mobile) layout */}
              <div className="flex flex-col items-center pr-4 sm:pr-5 lg:hidden" aria-hidden="true">
                {node}
                {!isLast ? <span className="w-px flex-1 bg-line" /> : null}
              </div>

              {/* Horizontal rail + node for the wide layout */}
              <div className="hidden items-center lg:flex" aria-hidden="true">
                {node}
                {!isLast ? (
                  <span className="relative ml-1 h-px flex-1 bg-line">
                    <span className="absolute -top-[3px] right-0 block h-0 w-0 border-y-[3px] border-l-[5px] border-y-transparent border-l-line-strong" />
                  </span>
                ) : null}
              </div>

              <div className="pb-6 lg:pb-0 lg:pr-6 lg:pt-6">
                <p
                  className={`font-mono text-[0.625rem] uppercase tracking-[0.16em] ${
                    isAgent ? 'text-primary' : 'text-subtle'
                  }`}
                >
                  {step.step} · {isAgent ? 'Agent' : 'Human / system'}
                </p>
                <h3 className="mt-2 text-base font-semibold tracking-[-0.025em] text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-[1.65] text-muted">{step.description}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
