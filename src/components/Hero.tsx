import Link from 'next/link';

/**
 * Home hero — a faithful port of the approved "Ember" reference
 * (`design-ember.html` §hero).
 *
 * Deliberately a server component with zero client JavaScript: the LCP element
 * is the <h1> text and every other device on the surface is CSS-only.
 */

/** One work-item lane in the agent-run dashboard. */
interface Lane {
  who: string;
  /** Token class for the agent signal dot and its progress bar. */
  tone: string;
  /** Text before the emphasised fragment. */
  lead: string;
  /** Emphasised fragment (rendered white at 90%). */
  strong: string;
  /** Text after the emphasised fragment. */
  rest: string;
  dur: string;
  /** Progress-bar fill, as a percentage of the lane width. */
  width: string;
  selected?: boolean;
}

const lanes: Lane[] = [
  {
    who: 'agent.sde',
    tone: 'bg-primary',
    lead: 'implemented across ',
    strong: '6 files',
    rest: ' · branch feat/wi-482',
    dur: '41s',
    width: '100%',
  },
  {
    who: 'agent.qa',
    tone: 'bg-success',
    lead: '',
    strong: '34 tests',
    rest: ' generated · 34 passed',
    dur: '2m 11s',
    width: '100%',
  },
  {
    who: 'agent.review',
    tone: 'bg-accent',
    lead: '',
    strong: '3 comments',
    rest: ' on PR #218 · 1 major',
    dur: '18s',
    width: '64%',
    selected: true,
  },
  {
    who: 'human',
    tone: 'bg-white/25',
    lead: 'awaiting sign-off — nothing merges automatically',
    strong: '',
    rest: '',
    dur: '—',
    width: '12%',
  },
];

const kpis = [
  { key: 'Tests', value: '34', unit: '/34', delta: 'all passing', warn: false },
  { key: 'Coverage', value: '91.4', unit: '%', delta: '+3.2 pts', warn: false },
  { key: 'Comments', value: '3', unit: '', delta: '1 major', warn: true },
  { key: 'Wall time', value: '3', unit: 'm 10s', delta: 'vs 2d manual', warn: false },
];

/** Test-count sparkline. Ember, sage and amber keep it inside the palette. */
const sparkBars = [
  { height: '38%', tone: 'bg-primary' },
  { height: '52%', tone: 'bg-success' },
  { height: '44%', tone: 'bg-primary' },
  { height: '66%', tone: 'bg-success' },
  { height: '58%', tone: 'bg-primary' },
  { height: '71%', tone: 'bg-accent' },
  { height: '62%', tone: 'bg-success' },
  { height: '55%', tone: 'bg-primary' },
  { height: '78%', tone: 'bg-success' },
  { height: '69%', tone: 'bg-accent' },
  { height: '74%', tone: 'bg-primary' },
  { height: '88%', tone: 'bg-success' },
];

const capabilities = [
  {
    n: '01',
    title: 'AI Automation',
    detail: 'Agentic workflows that take real operational work off human hands.',
  },
  {
    n: '02',
    title: 'AI Engineering',
    detail: 'RAG, evaluation harnesses and guardrails built into your product.',
  },
  {
    n: '03',
    title: 'Software',
    detail: 'APIs, data models and platform services, end to end.',
  },
  {
    n: '04',
    title: 'Web',
    detail: 'Fast, accessible applications on modern React.',
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-32 sm:pt-40">
      {/* Backdrop: warm gradient mesh + dot field. Replaces the old navy glows. */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="mesh">
          <span className="m-ember" />
          <span className="m-sage" />
          <span className="m-amber" />
          <span className="m-fade" />
        </div>
        <div className="dot-field" />
      </div>

      <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          {/* Copy */}
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex max-w-full flex-wrap items-center justify-center gap-x-2.5 gap-y-1 rounded-full border border-line bg-surface px-3.5 py-2 text-[13px] text-muted shadow-sm">
              <span className="pulse-dot" aria-hidden="true" />
              <span className="whitespace-nowrap">Three agents · one backlog ·</span>
              <span className="serif whitespace-nowrap text-[0.875rem]">human keeps the merge</span>
            </span>

            <h1 className="mt-7 text-[2.5rem] font-semibold leading-[1.06] tracking-[-0.045em] text-foreground sm:text-6xl lg:text-[4.4rem]">
              Agents that ship
              <br />
              your <span className="serif pr-[0.06em]">backlog</span>.
            </h1>

            <p className="mx-auto mt-6 max-w-[56ch] text-[1.05rem] leading-[1.66] text-muted sm:text-[1.0625rem]">
              We design and build AI automation, autonomous agents and the software around them —
              from the first architecture sketch to production, with the people who wrote it still
              on the call.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/products/agents" className="btn-primary">
                See Agents
                <span aria-hidden="true">↗</span>
              </Link>
              <Link href="/contact" className="btn-secondary">
                Talk to an engineer
              </Link>
            </div>

            <p className="mt-4 text-[13px] text-subtle">
              No retainers for activity. Working systems, source code, and the team that built it.
            </p>
          </div>

          {/* Product evidence: the dark agent-run surface */}
          <div className="surface-dark mx-auto mt-14 overflow-hidden sm:mt-16 lg:max-w-[70rem]">
            <div className="term-bar">
              <span className="term-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className="term-title min-w-0 truncate">
                wtd-agents — run #4118 · sprint-27
              </span>
              <span className="term-live">
                <i />
                LIVE
              </span>
            </div>

            <div className="grid lg:grid-cols-[1.25fr_0.95fr]">
              {/* Work-item lanes + the review diff */}
              <div className="border-b border-white/10 p-5 pb-6 lg:border-b-0 lg:border-r">
                <p className="term-label mb-4">Work item WI-482 — expire stale sessions</p>

                <div className="space-y-[3px]">
                  {lanes.map((lane) => (
                    <div
                      key={lane.who}
                      className={`grid grid-cols-[6.5rem_1fr] items-center gap-3 rounded-lg px-3 py-2.5 font-mono text-[11.5px] sm:grid-cols-[6.5rem_1fr_3.25rem] ${
                        lane.selected ? 'bg-white/[0.055] ring-1 ring-white/10' : ''
                      }`}
                    >
                      <span className="flex items-center gap-2 text-white">
                        <i className={`block h-1.5 w-1.5 flex-none rounded-full ${lane.tone}`} />
                        {lane.who}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-white/60">
                          {lane.lead}
                          {lane.strong ? (
                            <b className="font-medium text-white/90">{lane.strong}</b>
                          ) : null}
                          {lane.rest}
                        </span>
                        <span className="mt-1.5 block h-[3px] w-full overflow-hidden rounded-[2px] bg-white/10">
                          <i
                            className={`block h-full rounded-[2px] ${lane.tone}`}
                            style={{ width: lane.width }}
                          />
                        </span>
                      </span>
                      <span className="hidden text-right text-[10.5px] text-white/30 sm:block">
                        {lane.dur}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="diff mt-4">
                  <div className="diff-head">
                    <span>@@ -42,2 +42,3 @@</span>
                    <span>src/session.ts</span>
                    <span className="ml-auto inline-flex items-center gap-1.5 text-white/60">
                      <i className="block h-1 w-1 rounded-full bg-primary" />
                      agent.review
                    </span>
                  </div>
                  <pre className="diff-body">
                    <span className="diff-ctx">{'  const session = await store.get(token)'}</span>
                    <span className="diff-del">{'-  return session'}</span>
                    <span className="diff-add">{'+  if (session.expiresAt < now) return null'}</span>
                    <span className="diff-add">{'+  return session'}</span>
                  </pre>
                  <div className="diff-note">
                    <b>Major</b> — reject expired refresh tokens before issuing a session.
                    <span className="ml-1.5 inline-block rounded-full border border-white/15 px-1.5 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.1em] text-white/40">
                      Committable suggestion
                    </span>
                  </div>
                </div>
              </div>

              {/* Run metrics */}
              <div className="p-5 pb-6 lg:bg-white/[0.014]">
                <p className="term-label mb-4">This run</p>

                <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
                  {kpis.map((kpi) => (
                    <div key={kpi.key} className="kpi">
                      <div className="kpi-k">{kpi.key}</div>
                      <div className="kpi-v">
                        {kpi.value}
                        {kpi.unit ? <small>{kpi.unit}</small> : null}
                      </div>
                      {/* `.kpi-d` is a globals utility, so the warning tint has to
                          land on a child rather than override it. */}
                      <div className="kpi-d">
                        {kpi.warn ? <span className="text-warning">{kpi.delta}</span> : kpi.delta}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 rounded-[10px] border border-white/[0.075] bg-white/[0.04] px-3.5 pb-2.5 pt-3.5">
                  <div className="mb-3 flex items-baseline justify-between">
                    <span className="text-xs text-white/70">Tests generated</span>
                    <span className="font-mono text-[10px] text-white/35">last 12 runs</span>
                  </div>
                  <div className="flex h-14 items-end gap-1" aria-hidden="true">
                    {sparkBars.map((bar, index) => (
                      <i
                        key={`${bar.tone}-${index}`}
                        className={`block flex-1 rounded-t-[3px] ${bar.tone}`}
                        style={{ height: bar.height }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-white/10 px-5 py-3 font-mono text-[10.5px] text-white/40">
              <span>3 agents online</span>
              <span aria-hidden="true">·</span>
              <span>1 PR awaiting review</span>
              <span className="ml-auto inline-flex items-center gap-2 text-white/60">
                human approval required <span aria-hidden="true">→</span>
              </span>
            </div>
          </div>
        </div>

        {/* Capability rail */}
        <div className="mt-16 border-y border-line bg-background-muted">
          <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
            <ul className="grid grid-cols-1 lg:grid-cols-4">
              {capabilities.map((item) => (
                <li
                  key={item.n}
                  className="border-t border-line py-6 first:border-t-0 lg:border-l lg:border-t-0 lg:px-7 lg:py-7 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
                >
                  <p className="font-mono text-[10.5px] tracking-[0.14em] text-primary">{item.n}</p>
                  <h3 className="mt-3 text-[1rem] font-semibold tracking-[-0.025em] text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-[1.6] text-muted">{item.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
