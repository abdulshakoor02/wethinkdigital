type LineTone = 'muted' | 'primary' | 'secondary' | 'accent' | 'success' | 'foreground';

interface TranscriptLine {
  /** Left-hand gutter label, e.g. an agent name. */
  label?: string;
  text: string;
  tone?: LineTone;
}

const toneClass: Record<LineTone, string> = {
  muted: 'text-muted',
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
  success: 'text-success',
  foreground: 'text-foreground',
};

const lines: TranscriptLine[] = [
  { text: '$ agents run --work-item ENG-2481', tone: 'foreground' },
  { text: 'resolved backlog item ENG-2481 · "Reject expired invite tokens"', tone: 'muted' },
  { label: 'sde', text: 'reading 6 files in src/auth/ …', tone: 'primary' },
  { label: 'sde', text: 'planning change: validate token expiry before session issue', tone: 'primary' },
  { label: 'sde', text: 'wrote 2 files · committed to agents/eng-2481-invite-expiry', tone: 'primary' },
  { label: 'qa', text: 'derived 5 cases from acceptance criteria', tone: 'secondary' },
  { label: 'qa', text: 'running suite … 148 passed, 1 failed', tone: 'secondary' },
  { label: 'qa', text: 'defect: expired token returns 500, expected 401 → back to sde', tone: 'accent' },
  { label: 'sde', text: 'patched error path · re-committed', tone: 'primary' },
  { label: 'qa', text: 'running suite … 149 passed, 0 failed', tone: 'secondary' },
  { text: 'pull request #812 raised → main', tone: 'foreground' },
  { label: 'review', text: 'reading diff: 3 files, +64 −11', tone: 'accent' },
  { label: 'review', text: 'comment L42 · expiry compared in local time, use UTC', tone: 'accent' },
  { label: 'review', text: 'verdict: approve with 1 comment', tone: 'accent' },
  { text: 'awaiting human merge — no changes pushed to main', tone: 'success' },
];

/** Illustrative agent run transcript. Rendered as a decorative terminal card. */
export default function TerminalTranscript() {
  return (
    <figure className="overflow-hidden rounded-lg border border-line bg-background-muted">
      <div className="flex items-center gap-3 border-b border-line bg-surface px-4 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
        </span>
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted">
          agents · run log
        </span>
      </div>

      <div className="overflow-x-auto p-5 sm:p-6">
        <pre className="font-mono text-[0.75rem] leading-6 sm:text-[0.8125rem]">
          <code>
            {lines.map((line, index) => (
              <span key={`${line.label ?? 'sys'}-${index}`} className="block whitespace-pre-wrap">
                {line.label ? (
                  <span className="text-muted">{`[${line.label}] `.padEnd(10, ' ')}</span>
                ) : null}
                <span className={toneClass[line.tone ?? 'muted']}>{line.text}</span>
              </span>
            ))}
          </code>
        </pre>
      </div>

      <figcaption className="border-t border-line px-5 py-3 text-xs leading-6 text-muted sm:px-6">
        Illustrative run. Ticket identifiers, file counts and comments are examples, not a
        client project.
      </figcaption>
    </figure>
  );
}
