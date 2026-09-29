import { agentRoles } from '@/data/products';

interface RoleAccent {
  /** Hairline along the top edge of the card. */
  bar: string;
  /** The per-role identity dot. */
  dot: string;
}

const accents: Record<string, RoleAccent> = {
  sde: { bar: 'bg-primary', dot: 'bg-primary' },
  qa: { bar: 'bg-success', dot: 'bg-success' },
  'pr-review': { bar: 'bg-accent', dot: 'bg-accent' },
};

/** The three specialised agents: SDE, QA, PR Review. Dark surfaces on the bone canvas. */
export default function AgentRoleCards() {
  return (
    <ul className="grid gap-3.5 lg:grid-cols-3">
      {agentRoles.map((agent) => {
        const accent = accents[agent.id] ?? accents.sde;

        return (
          <li
            key={agent.id}
            className="surface-dark relative flex flex-col overflow-hidden p-7 sm:p-8"
          >
            <span className={`absolute inset-x-0 top-0 h-px ${accent.bar}`} aria-hidden="true" />

            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1">
              <i className={`h-1.5 w-1.5 shrink-0 rounded-full ${accent.dot}`} aria-hidden="true" />
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-white/70">
                {agent.role}
              </span>
            </span>

            <h3 className="mt-5 text-lg font-semibold tracking-[-0.025em] text-white sm:text-xl">
              {agent.name}
            </h3>
            <p className="mt-3 text-sm leading-[1.65] text-white/60">{agent.description}</p>

            <dl className="mt-6 grid gap-px overflow-hidden rounded-[0.625rem] border border-white/10 bg-white/10">
              <div className="bg-white/[0.03] px-4 py-3.5">
                <dt className="term-label">Takes</dt>
                <dd className="mt-1.5 text-sm leading-[1.6] text-white/75">{agent.consumes}</dd>
              </div>
              <div className="bg-white/[0.03] px-4 py-3.5">
                <dt className="term-label">Returns</dt>
                <dd className="mt-1.5 text-sm leading-[1.6] text-white/75">{agent.produces}</dd>
              </div>
            </dl>

            <h4 className="term-label mt-7">How it operates</h4>
            <ol className="mt-4 flex flex-col gap-3">
              {agent.steps.map((step, index) => (
                <li key={step} className="flex gap-3 text-sm leading-[1.6] text-white/60">
                  <span
                    className="shrink-0 font-mono text-xs tabular-nums text-white/40"
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
