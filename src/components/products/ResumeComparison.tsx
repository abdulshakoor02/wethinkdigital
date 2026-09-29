/**
 * Before → after resume comparison. Pure markup and CSS, no images.
 * Both panels are decorative illustrations of layout quality, not real resumes.
 */
export default function ResumeComparison() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <p className="sr-only">
        An illustrative comparison of two resume layouts. The &ldquo;before&rdquo; version uses a
        dense contact line, a generic objective paragraph, bullet points describing duties rather
        than results, two different date formats, and a single undifferentiated block of skills. The
        &ldquo;after&rdquo; version leads with a name and target job title, a short factual summary,
        experience entries with aligned dates and outcome-led bullet points, and a separated core
        skills section. Both panels are examples, not real resumes.
      </p>

      {/* ---------------------------------------------------------------- */}
      {/* Before                                                            */}
      {/* ---------------------------------------------------------------- */}
      <figure className="flex flex-col">
        <figcaption className="mb-4 flex items-center gap-3">
          <span className="inline-flex items-center rounded-full border border-danger/25 bg-danger/[0.06] px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-danger">
            Before
          </span>
          <span className="text-sm text-muted">Cramped, inconsistent, hard to scan</span>
        </figcaption>

        <div className="surface-elevated flex-1 p-6 sm:p-7" aria-hidden="true">
          <div className="space-y-1">
            <p className="text-[0.9375rem] font-bold text-foreground">ALEX MORGAN</p>
            <p className="text-[0.625rem] leading-4 text-muted">
              alex.morgan@email.com | +00 000 0000 | linkedin.com/in/alexmorgan | github.com/alexm |
              Available immediately | References on request
            </p>
          </div>

          <p className="mt-4 text-[0.625rem] font-bold uppercase text-muted">Objective</p>
          <p className="mt-1 text-[0.6875rem] leading-4 text-muted">
            Hardworking and motivated team player seeking a challenging position in a dynamic
            organisation where I can utilise my skills and grow professionally while contributing to
            company objectives.
          </p>

          <p className="mt-4 text-[0.6875rem] font-semibold text-foreground">
            Software Developer, Company Ltd — 03/2021-Present
          </p>
          <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[0.6875rem] leading-4 text-muted">
            <li>Responsible for developing new features for the platform</li>
            <li>Worked on bug fixes and maintenance tasks as assigned</li>
            <li>Participated in daily standups and sprint planning meetings</li>
            <li>Assisted with code reviews and helped junior team members</li>
          </ul>

          <p className="mt-3 text-[0.6875rem] font-semibold text-foreground">
            Junior Developer, Another Company &nbsp;&nbsp;Jan 2019 — Feb 2021
          </p>
          <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[0.6875rem] leading-4 text-muted">
            <li>Duties included writing code and fixing issues</li>
            <li>Involved in various projects across the business</li>
          </ul>

          <p className="mt-4 text-[0.625rem] font-bold uppercase text-muted">Skills</p>
          <p className="mt-1 text-[0.6875rem] leading-4 text-muted">
            JavaScript, HTML, CSS, React, Node, SQL, Git, Agile, Communication, Teamwork, Problem
            solving, Microsoft Office, Leadership, Time management, Fast learner
          </p>
        </div>

        <ul className="mt-4 flex flex-wrap gap-2">
          {[
            'Duty-led bullet points',
            'Two date formats',
            'Contact line overloaded',
            'Skills dumped in one block',
          ].map((flag) => (
            <li key={flag} className="pill">
              {flag}
            </li>
          ))}
        </ul>
      </figure>

      {/* ---------------------------------------------------------------- */}
      {/* After                                                             */}
      {/* ---------------------------------------------------------------- */}
      <figure className="flex flex-col">
        <figcaption className="mb-4 flex items-center gap-3">
          <span className="inline-flex items-center rounded-full border border-success/30 bg-success-soft px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-success">
            After
          </span>
          <span className="text-sm text-muted">Structured, consistent, scannable</span>
        </figcaption>

        <div className="surface glow relative flex-1 p-6 sm:p-7" aria-hidden="true">
          <div className="border-b border-line pb-4">
            <p className="text-lg font-bold tracking-[-0.03em] text-foreground">Alex Morgan</p>
            <p className="mt-0.5 text-[0.75rem] text-secondary">Senior Software Engineer</p>
            <p className="mt-2 text-[0.6875rem] leading-4 text-muted">
              alex.morgan@email.com · linkedin.com/in/alexmorgan · github.com/alexm
            </p>
          </div>

          <p className="mt-4 text-[0.625rem] font-bold uppercase tracking-[0.16em] text-primary">
            Summary
          </p>
          <p className="mt-2 text-[0.75rem] leading-5 text-muted">
            Software engineer with five years building and maintaining production web platforms.
            Focused on feature delivery, code quality and mentoring.
          </p>

          <p className="mt-5 text-[0.625rem] font-bold uppercase tracking-[0.16em] text-primary">
            Experience
          </p>

          <div className="mt-3">
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-[0.8125rem] font-semibold text-foreground">Software Engineer</p>
              <p className="shrink-0 font-mono text-[0.625rem] tabular-nums text-muted">
                2021 — Present
              </p>
            </div>
            <p className="text-[0.6875rem] text-secondary">Company Ltd</p>
            <ul className="mt-2 space-y-1.5 text-[0.75rem] leading-5 text-muted">
              <li className="flex gap-2">
                <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-[1px] bg-primary" />
                Shipped platform features end to end, from specification through release.
              </li>
              <li className="flex gap-2">
                <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-[1px] bg-primary" />
                Reduced recurring defects by owning fixes through to root cause.
              </li>
              <li className="flex gap-2">
                <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-[1px] bg-primary" />
                Reviewed team pull requests and mentored two junior engineers.
              </li>
            </ul>
          </div>

          <div className="mt-4">
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-[0.8125rem] font-semibold text-foreground">Junior Developer</p>
              <p className="shrink-0 font-mono text-[0.625rem] tabular-nums text-muted">
                2019 — 2021
              </p>
            </div>
            <p className="text-[0.6875rem] text-secondary">Another Company</p>
            <ul className="mt-2 space-y-1.5 text-[0.75rem] leading-5 text-muted">
              <li className="flex gap-2">
                <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-[1px] bg-primary" />
                Delivered features across three internal products in a small team.
              </li>
            </ul>
          </div>

          <p className="mt-5 text-[0.625rem] font-bold uppercase tracking-[0.16em] text-primary">
            Core skills
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {['TypeScript', 'React', 'Node.js', 'SQL', 'Testing', 'Code review'].map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-line px-2.5 py-0.5 text-[0.6875rem] text-muted"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <ul className="mt-4 flex flex-wrap gap-2">
          {[
            'Outcome-led lines',
            'One date format',
            'Clear hierarchy',
            'Parses cleanly',
          ].map((flag) => (
            <li key={flag} className="pill pill-ok">
              {flag}
            </li>
          ))}
        </ul>
      </figure>
    </div>
  );
}
