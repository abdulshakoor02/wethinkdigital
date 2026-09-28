import { agentRoles } from '@/data/products';

const accents: Record<string, { bar: string; text: string; ring: string }> = {
  sde: { bar: 'bg-primary', text: 'text-primary', ring: 'border-primary/40 bg-primary/10' },
  qa: {
    bar: 'bg-secondary',
    text: 'text-secondary',
    ring: 'border-secondary/40 bg-secondary/10',
  },
  'pr-review': { bar: 'bg-accent', text: 'text-accent', ring: 'border-accent/40 bg-accent/10' },
};

/** The three specialised agents: SDE, QA, PR Review. */
export default function AgentRoleCards() {
  return (
    <ul className="grid gap-6 lg:grid-cols-3">
      {agentRoles.map((agent) => {
        const accent = accents[agent.id] ?? accents.sde;

        return (
          <li
            key={agent.id}
            className="surface surface-hover relative flex flex-col overflow-hidden p-7 sm:p-8"
          >
            <span className={`absolute inset-x-0 top-0 h-px ${accent.bar}`} aria-hidden="true" />

            <span
              className={`inline-flex w-fit items-center rounded-full border px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.18em] ${accent.ring} ${accent.text}`}
            >
              {agent.role}
            </span>

            <h3 className="mt-5 text-2xl font-bold tracking-[-0.035em] text-foreground">
              {agent.name}
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted">{agent.description}</p>

            <dl className="mt-6 grid gap-px overflow-hidden rounded-md border border-line bg-line">
              <div className="bg-background-muted px-4 py-3">
                <dt className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted">
                  Takes
                </dt>
                <dd className="mt-1 text-sm leading-6 text-foreground">{agent.consumes}</dd>
              </div>
              <div className="bg-background-muted px-4 py-3">
                <dt className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted">
                  Returns
                </dt>
                <dd className="mt-1 text-sm leading-6 text-foreground">{agent.produces}</dd>
              </div>
            </dl>

            <h4 className="mt-7 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted">
              How it operates
            </h4>
            <ol className="mt-4 flex flex-col gap-3">
              {agent.steps.map((step, index) => (
                <li key={step} className="flex gap-3 text-sm leading-6 text-muted">
                  <span
                    className={`shrink-0 font-mono text-xs tabular-nums ${accent.text}`}
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </li>
        );
      })}
    </ul>
  );
}
