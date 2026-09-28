import Link from 'next/link';

/**
 * Home hero. Deliberately a server component with no client JavaScript:
 * the LCP element is the <h1> text and everything else is CSS.
 */

interface TranscriptLine {
  agent: string;
  tone: 'primary' | 'secondary' | 'accent' | 'success';
  text: string;
}

const transcript: TranscriptLine[] = [
  { agent: 'agent.sde', tone: 'primary', text: 'picked up WI-482 — "expire stale sessions"' },
  { agent: 'agent.sde', tone: 'primary', text: 'branch feat/wi-482 · 6 files changed' },
  { agent: 'agent.qa', tone: 'secondary', text: '34 tests generated, 34 passed' },
  { agent: 'agent.qa', tone: 'secondary', text: 'coverage 91.4% (+3.2%)' },
  { agent: 'agent.review', tone: 'accent', text: '3 comments posted on PR #218' },
  { agent: 'agent.sde', tone: 'primary', text: 'comments resolved · PR ready for human sign-off' },
];

const toneClass: Record<TranscriptLine['tone'], string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
  success: 'text-success',
};

const capabilities = [
  { label: 'Agentic delivery pipeline', detail: 'Agents that plan, build, test and review' },
  { label: 'LLM + RAG systems', detail: 'Retrieval, evals and guardrails in production' },
  { label: 'Cloud-native platforms', detail: 'APIs, data pipelines, infrastructure as code' },
  { label: 'Modern web apps', detail: 'Fast, accessible, server-rendered front ends' },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-32 pb-0">
      {/* Backdrop: engineered grid + two soft radial washes */}
      <div className="pointer-events-none absolute inset-0 grid-bg" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-40 -top-32 h-[38rem] w-[38rem] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            'radial-gradient(circle at center, color-mix(in oklab, var(--primary) 55%, transparent), transparent 68%)',
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-48 top-24 h-[34rem] w-[34rem] rounded-full opacity-25 blur-3xl"
        style={{
          background:
            'radial-gradient(circle at center, color-mix(in oklab, var(--accent) 55%, transparent), transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="grid items-center gap-14 py-16 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Copy column */}
          <div>
            <p className="mono-label mb-6">AI automation · Agentic systems · Product engineering</p>

            <h1 className="text-[2.6rem] font-bold leading-[1.04] tracking-[-0.05em] text-foreground sm:text-6xl lg:text-[4.1rem]">
              We build the AI systems and{' '}
              <span className="gradient-text">software your team actually ships.</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-muted">
              We design and build AI automation, autonomous agents, custom software and web
              platforms — end to end, from the first architecture sketch to production. Engineering
              team, not an agency: you get working systems, source code and the people who wrote it.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="btn-primary">
                Start a project
              </Link>
              <Link href="/products" className="btn-secondary">
                See our AI products
              </Link>
            </div>
          </div>

          {/* Terminal / code-window card */}
          <div className="glow surface relative overflow-hidden">
            <div className="flex items-center gap-2 border-b border-line bg-background-muted px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-danger/70" aria-hidden="true" />
              <span className="h-3 w-3 rounded-full bg-accent/70" aria-hidden="true" />
              <span className="h-3 w-3 rounded-full bg-success/70" aria-hidden="true" />
              <p className="ml-3 font-mono text-xs tracking-tight text-muted">
                wtd-agents — run #4118
              </p>
            </div>

            <div className="overflow-x-auto px-5 py-5 font-mono text-[0.78rem] leading-7 sm:text-[0.82rem]">
              <p className="text-muted">
                <span className="text-success">$</span> wtd agents run --backlog sprint-27
              </p>
              <p className="mt-1 text-muted/70">connected · 3 agents online</p>

              <ul className="mt-4 space-y-1.5">
                {transcript.map((line) => (
                  <li key={`${line.agent}-${line.text}`} className="flex gap-3 whitespace-nowrap">
                    <span className={`shrink-0 ${toneClass[line.tone]}`}>{line.agent}</span>
                    <span className="shrink-0 text-muted/50" aria-hidden="true">
                      →
                    </span>
                    <span className="text-foreground/85">{line.text}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-4 border-t border-line pt-4 text-muted">
                <span className="text-success">✓</span> run complete · 1 PR awaiting review
                <span className="ml-1 inline-block h-[1.05em] w-[0.5em] translate-y-[0.15em] bg-primary align-baseline" aria-hidden="true" />
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Capability strip */}
      <div className="relative border-y border-line bg-background-muted">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <ul className="grid gap-x-10 gap-y-8 py-10 sm:grid-cols-2 sm:py-12 lg:grid-cols-4">
            {capabilities.map((item) => (
              <li key={item.label} className="border-l border-line pl-4">
                <p className="text-sm font-semibold tracking-tight text-foreground">{item.label}</p>
                <p className="mt-1.5 text-sm leading-6 text-muted">{item.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
