/**
 * Site-level FAQ about how we engage, scope and hand over work.
 * Rendered on the home page and used for FAQPage structured data by core-shell.
 */

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    id: 'how-we-work',
    question: 'How do you work with a new client?',
    answer:
      'We start with a short discovery: what you are trying to build, the constraints, and what already exists. That produces a technical shape and a first increment we can both judge. From there we work in two-week cycles with a demo and a deployable increment at the end of each one. You see working software early rather than a status report, and scope is adjusted on evidence rather than at the end.',
  },
  {
    id: 'team-shape',
    question: 'What does a typical team look like?',
    answer:
      'Most engagements run with two to four engineers plus a technical lead who stays accountable for architecture and delivery. On AI work that usually means an AI engineer and a product engineer; on platform work, backend engineers with infrastructure support. We do not staff project managers who only relay information — the lead is an engineer who writes code and talks to you directly.',
  },
  {
    id: 'existing-codebases',
    question: 'Do you work with existing codebases?',
    answer:
      'Yes, and it is most of what we do. We begin with an orientation period: reading the code, running it locally, understanding the deployment path, and writing tests around behaviour we must not break. Then we work in small pull requests against your branching and review process. An undocumented codebase with uneven test coverage is the normal starting point, not a blocker.',
  },
  {
    id: 'scoping-ai-projects',
    question: 'How do you scope an AI or agent project?',
    answer:
      'We never scope a full build before proving the hard part. The first phase is a time-boxed spike, usually two to three weeks, that tests feasibility on your real data and produces a measured baseline for quality, latency and cost. That evidence determines whether the full build is worth doing and what it should cost. If the spike shows the approach will not work, we say so and you have spent weeks instead of months.',
  },
  {
    id: 'data-privacy-ip',
    question: 'Who owns the code, and how is our data handled?',
    answer:
      'You own all code and intellectual property from the first commit — work happens in your repositories and cloud accounts, not ours. For AI work we use zero-retention provider configurations where available, redact sensitive fields before anything leaves your boundary, and can run open-weight models inside your own infrastructure when data is not permitted to leave it. We sign NDAs and data processing agreements as standard.',
  },
  {
    id: 'timelines',
    question: 'How long does a project usually take?',
    answer:
      'A focused automation workflow typically reaches production in four to eight weeks. An AI feature inside an existing product runs six to twelve weeks including the evaluation work. A full product build is normally three to six months to a real launch. These are ranges from past work, not promises — we give a specific estimate after discovery, with the assumptions behind it written down.',
  },
  {
    id: 'model-cost',
    question: 'How do you keep AI running costs under control?',
    answer:
      'We measure cost per request from the first prototype rather than after launch. The savings come from architecture: routing straightforward steps to smaller models, caching stable context, retrieving fewer and better chunks, and using deterministic code wherever a model is not needed. Each workflow gets a budget ceiling with alerting, so growth in volume appears on a dashboard instead of on an unexpected invoice.',
  },
  {
    id: 'post-launch-support',
    question: 'Do you support the system after launch?',
    answer:
      'Yes, and we also make it possible for you not to need us. Every engagement ends with documentation, a runbook and a handover session with your engineers. If you want ongoing cover we offer a support arrangement with an agreed response time for incidents, plus a monthly allowance for improvements. AI systems in particular benefit from continued evaluation as models and data change.',
  },
];
