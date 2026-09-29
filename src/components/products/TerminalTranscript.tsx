import type { ReactNode } from 'react';

type LaneTone = 'sde' | 'qa' | 'review' | 'human' | 'system';

interface TranscriptLane {
  /** Left-hand gutter label, e.g. an agent name. */
  who: string;
  tone: LaneTone;
  text: ReactNode;
  /** Draws the selection affordance — used for the lane the diff belongs to. */
  selected?: boolean;
}

/** Per-role accent dots. Hues only identify a lane; the label carries the meaning. */
const dotClass: Record<LaneTone, string> = {
  sde: 'bg-primary',
  qa: 'bg-success',
  review: 'bg-accent',
  human: 'bg-white/35',
  system: 'bg-white/20',
};

const lanes: TranscriptLane[] = [
  {
    who: 'agent.sde',
    tone: 'sde',
    text: (
      <>
        reading <b className="font-medium text-white/90">6 files</b> in src/auth/ · planning the
        change
      </>
    ),
  },
  {
    who: 'agent.sde',
    tone: 'sde',
    text: <>wrote 2 files · committed to agents/eng-2481-invite-expiry</>,
  },
  {
    who: 'agent.qa',
    tone: 'qa',
    text: (
      <>
        derived <b className="font-medium text-white/90">5 cases</b> from the acceptance criteria
      </>
    ),
  },
  { who: 'agent.qa', tone: 'qa', text: <>suite run 1 — 148 passed, 1 failed</> },
  {
    who: 'agent.qa',
    tone: 'qa',
    text: <>defect: expired token returns 500, expected 401 → back to sde</>,
  },
  { who: 'agent.sde', tone: 'sde', text: <>patched the error path · re-committed</> },
  { who: 'agent.qa', tone: 'qa', text: <>suite run 2 — 149 passed, 0 failed</> },
  { who: 'pull request', tone: 'system', text: <>#812 raised → main</> },
  {
    who: 'agent.review',
    tone: 'review',
    text: (
      <>
        reading diff: <b className="font-medium text-white/90">3 files</b>, +64 −11
      </>
    ),
    selected: true,
  },
  { who: 'agent.review', tone: 'review', text: <>comment L42 · expiry compared in local time, use UTC</> },
  { who: 'agent.review', tone: 'review', text: <>verdict: approve with 1 comment</> },
  { who: 'human', tone: 'human', text: <>awaiting merge — no changes pushed to main</> },
];

/** Illustrative agent run transcript. Rendered as a decorative dark evidence panel. */
export default function TerminalTranscript() {
  return (
    <figure className="surface-dark overflow-hidden">
      <div className="term-bar">
        <span className="term-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="term-title">wtd-agents — run #4118 · sprint-27</span>
        <span className="term-live">
          <i />
          LIVE
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <p className="term-label">Work item ENG-2481 — reject expired invite tokens</p>

        <ul className="-mx-2.5 mt-3 flex flex-col">
          {lanes.map((lane, index) => (
            <li
              key={`${lane.who}-${index}`}
              className={[
                'grid grid-cols-[92px_1fr] items-start gap-3 rounded-[0.5rem] px-2.5 py-1.5 font-mono text-[0.72rem] leading-[1.5] sm:grid-cols-[108px_1fr]',
                lane.selected ? 'bg-white/[0.055] ring-1 ring-white/[0.08]' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <span className="flex items-center gap-2 pt-[0.15rem] text-white/90">
                <i
                  className={`h-1.5 w-1.5 shrink-0 rounded-full ${dotClass[lane.tone]}`}
                  aria-hidden="true"
                />
                {lane.who}
              </span>
              <span className="text-white/60">{lane.text}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <div className="kpi">
            <div className="kpi-k">Tests</div>
            <div className="kpi-v">
              149<small>/149</small>
            </div>
            <div className="kpi-d">all passing</div>
          </div>
          <div className="kpi">
            <div className="kpi-k">Defects</div>
            <div className="kpi-v">1</div>
            <div className="kpi-d">fixed, re-tested</div>
          </div>
          <div className="kpi">
            <div className="kpi-k">Comments</div>
            <div className="kpi-v">1</div>
            <div className="kpi-d">verdict: approve</div>
          </div>
          <div className="kpi">
            <div className="kpi-k">Pull request</div>
            <div className="kpi-v">
              #812<small>→ main</small>
            </div>
            <div className="kpi-d">human merges</div>
          </div>
        </div>

        <div className="diff mt-3.5">
          <div className="diff-head">
            <span>@@ -38,7 +38,9 @@</span>
            <span>src/auth/tokens.ts</span>
            <span className="ml-auto text-primary-soft">agent.review</span>
          </div>
          <pre className="diff-body">
            <span className="diff-ctx">{'  const record = await store.get(token)'}</span>
            <span className="diff-del">{'-  if (record.expiresAt < now) return null'}</span>
            <span className="diff-add">{'+  if (record.expiresAt <= Date.now()) return null'}</span>
            <span className="diff-ctx">{'   return record'}</span>
          </pre>
          <div className="diff-note">
            <b>Comment</b> — L42: expiry is compared in local time; compare in UTC instead. Verdict:
            approve with 1 comment.
          </div>
        </div>
      </div>

      <figcaption className="border-t border-white/10 px-5 py-3 text-xs leading-[1.6] text-white/45 sm:px-6">
        Illustrative run. Ticket identifiers, file counts and comments are examples, not a client
        project.
      </figcaption>
    </figure>
  );
}
