/**
 * Typed single source of truth for the four things WeThinkDigital does.
 * Service pages, the home overview, metadata and JSON-LD all read from here.
 */

export type ServiceSlug =
  | 'ai-automation'
  | 'ai-engineering'
  | 'software-development'
  | 'web-development';

export interface ServiceCapability {
  title: string;
  description: string;
}

export interface ServiceFaqEntry {
  question: string;
  answer: string;
}

export interface ServiceDetail {
  slug: ServiceSlug;
  /** Display name, e.g. "AI Automation". */
  name: string;
  /** Site-relative route. */
  href: string;
  /** One line, used under the card title. */
  tagline: string;
  /** Two sentences — cards and short descriptions. */
  summary: string;
  /** Three to four sentences for the service page intro. */
  heroDescription: string;
  /** Four concrete outcomes. */
  outcomes: string[];
  /** Six capability cards. */
  capabilities: ServiceCapability[];
  /** What actually lands in the client's repo / account. */
  deliverables: string[];
  /** Technologies we reach for on this kind of work. */
  stack: string[];
  /** Four service-specific questions, answered in 60–90 words. */
  faqs: ServiceFaqEntry[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

export const services: ServiceDetail[] = [
  {
    slug: 'ai-automation',
    name: 'AI Automation',
    href: '/services/ai-automation',
    tagline: 'Agentic workflows that take real work off human hands.',
    summary:
      'We automate the operational work your team does by hand every day — triage, document handling, data reconciliation, internal approvals. Each workflow runs against your existing tools, with evaluations, guardrails and a human checkpoint wherever a mistake would be expensive.',
    heroDescription:
      'Most teams do not need another dashboard. They need the twenty repetitive steps between an incoming request and a finished outcome to happen without a person shepherding them. We design and build agentic workflows that read the inputs, call the systems you already run, make the routine decisions, and escalate the rest to a named human. Every workflow ships with an evaluation suite, an audit trail and a cost ceiling, so you can see exactly what it did and what it spent.',
    outcomes: [
      'Manual, repetitive operational steps executed end to end without a person driving them',
      'A reviewable audit trail for every automated decision, including the inputs it acted on',
      'Human approval gates on the actions where a wrong answer is expensive',
      'Predictable per-run cost and latency, monitored and capped rather than discovered on the invoice',
    ],
    capabilities: [
      {
        title: 'Agentic workflow design',
        description:
          'We map the real process first — including the exceptions people handle informally — then decide what an agent should own, what stays deterministic code, and where a human has to sign off.',
      },
      {
        title: 'Document and data pipelines',
        description:
          'Ingestion, parsing and extraction for invoices, contracts, forms, tickets and exports. Structured output validated against a schema, with low-confidence records routed for review instead of silently guessed.',
      },
      {
        title: 'Internal operations automation',
        description:
          'Triage, routing, reconciliation, status chasing and reporting. The unglamorous work that consumes a team’s week and never appears on a roadmap.',
      },
      {
        title: 'Human-in-the-loop approvals',
        description:
          'Approval steps that live where people already work — Slack, email, or a small internal UI — with the agent’s reasoning, the source documents and a one-click approve, edit or reject.',
      },
      {
        title: 'Integrations with your existing stack',
        description:
          'Slack, Jira, GitHub, HubSpot, Salesforce, Zendesk, Notion, Google Workspace, ERPs and internal APIs. We integrate with what you run today rather than asking you to migrate first.',
      },
      {
        title: 'Evaluation, guardrails and cost control',
        description:
          'A labelled test set per workflow, regression runs on every change, schema and policy validation on outputs, and per-run budget limits with model routing to keep spend flat as volume grows.',
      },
    ],
    deliverables: [
      'A process map of the current workflow with the automation boundary drawn explicitly',
      'Production workflow code in your repository, with infrastructure defined as code',
      'An evaluation suite and labelled test cases you can run in CI',
      'Observability: traces, per-step logs, cost and latency dashboards, failure alerts',
      'Approval interfaces for the human checkpoints, in the tools your team already uses',
      'A runbook covering failure modes, rollback and how to extend the workflow',
    ],
    stack: [
      'Python',
      'TypeScript',
      'LangGraph',
      'Temporal',
      'OpenAI',
      'Anthropic Claude',
      'Postgres',
      'Redis',
      'Celery',
      'Docker',
      'AWS',
      'Terraform',
    ],
    faqs: [
      {
        question: 'Which processes are actually worth automating with AI?',
        answer:
          'The best candidates are high-volume, rules-heavy processes where the inputs are messy but the desired output is well defined — invoice handling, ticket triage, data reconciliation, compliance checks. If a process is fully deterministic, plain code is cheaper and more reliable than a model. If it happens twice a month and takes ten minutes, the automation will cost more than it saves. We assess volume, variability and the cost of an error before recommending anything.',
      },
      {
        question: 'How do you stop an AI workflow from making an expensive mistake?',
        answer:
          'Three layers. First, we constrain what the agent can do: narrow tools, scoped credentials, and schema validation on every output. Second, we place human approval gates in front of irreversible actions such as payments, external emails or production writes. Third, we run an evaluation suite against labelled cases on every change, so a regression is caught before deployment rather than in production. Everything is logged and reversible where the underlying system allows it.',
      },
      {
        question: 'Do we have to replace our current tools?',
        answer:
          'No. Automation is most valuable when it sits on top of the systems your team already trusts. We integrate through existing APIs and webhooks — Slack, Jira, GitHub, your CRM, your ERP — and the people doing the work keep their current interfaces. If a system has no usable API we will say so early and propose an alternative path rather than building something fragile on top of screen scraping.',
      },
      {
        question: 'How is the running cost of an automated workflow controlled?',
        answer:
          'We measure cost per run from the first prototype, not after launch. Techniques include routing simple steps to smaller models, caching repeated context, trimming prompts to what the step actually needs, and running deterministic code wherever a model is not required. Each workflow gets a per-run and per-day budget ceiling with alerting, so volume growth shows up as a dashboard line rather than a surprise invoice.',
      },
    ],
    metaTitle: 'AI Automation — Agentic Workflows for Real Operations',
    metaDescription:
      'We build agentic AI workflows that automate document pipelines, internal operations and approvals across the tools you already run — with evaluations, guardrails and cost control built in.',
    keywords: [
      'ai automation',
      'agentic workflow automation',
      'business process automation',
      'document processing automation',
      'human in the loop ai',
      'ai workflow integration',
      'llm guardrails',
    ],
  },
  {
    slug: 'ai-engineering',
    name: 'AI Engineering',
    href: '/services/ai-engineering',
    tagline: 'LLM, RAG and multi-agent systems built into your product.',
    summary:
      'We build the AI parts of your product properly: retrieval over private data, tool-calling agents, model routing, evaluation harnesses and observability. The goal is a feature your users trust, not a demo that impresses once and then quietly degrades.',
    heroDescription:
      'Getting a language model to produce something impressive takes an afternoon. Getting it to be correct, fast, affordable and safe on real user data takes engineering. We build production LLM systems: retrieval pipelines that return citations, agents that call your tools and recover from failure, routing that sends each request to the cheapest model that can handle it. Every system comes with an evaluation harness so you can prove a change made things better instead of hoping it did.',
    outcomes: [
      'An AI feature that holds up against real user inputs, not just curated demo prompts',
      'Answers grounded in your own data, with citations back to the source document',
      'Measurable quality: a regression suite that scores every prompt, model or retrieval change',
      'Controlled spend through model routing, caching and fallbacks that degrade gracefully',
    ],
    capabilities: [
      {
        title: 'LLM application development',
        description:
          'End-to-end feature work: prompt and context design, streaming interfaces, structured output, retries and timeouts, and the unglamorous state handling that makes a model feel reliable in a product.',
      },
      {
        title: 'Retrieval over private data',
        description:
          'RAG pipelines with deliberate chunking, hybrid keyword and vector search, reranking, and citation-backed answers. Permission filtering applied at retrieval time so users only ever see what they are entitled to.',
      },
      {
        title: 'Multi-agent orchestration',
        description:
          'Planner and worker topologies, tool and function calling, shared state, retries and compensation. Explicit termination conditions and step budgets so an agent loop cannot run away.',
      },
      {
        title: 'Evaluation and observability',
        description:
          'Golden datasets, LLM-as-judge with human spot checks, faithfulness and retrieval-hit metrics, plus tracing on every span so you can see the exact context a bad answer was generated from.',
      },
      {
        title: 'Model strategy and routing',
        description:
          'An honest read on prompting, retrieval, fine-tuning or distillation for your case — then routing across providers with fallback, so one vendor outage or price change does not take your feature down.',
      },
      {
        title: 'Safety and data handling',
        description:
          'PII detection and redaction before data leaves your boundary, prompt-injection defences on retrieved and user content, output policy checks, and retention rules aligned to your compliance position.',
      },
    ],
    deliverables: [
      'Production AI services in your repository, containerised and deployable by your team',
      'A retrieval pipeline with documented chunking, indexing and refresh strategy',
      'An evaluation harness with golden datasets, wired into CI with scored thresholds',
      'Tracing and cost dashboards covering token spend, latency percentiles and failure rates',
      'A written model strategy: what runs where, what it costs, and the fallback path',
      'Handover documentation and a working session with your engineers',
    ],
    stack: [
      'Python',
      'TypeScript',
      'OpenAI',
      'Anthropic Claude',
      'Llama',
      'LangGraph',
      'LlamaIndex',
      'pgvector',
      'Qdrant',
      'Pinecone',
      'FastAPI',
      'Ray',
      'OpenTelemetry',
    ],
    faqs: [
      {
        question: 'Should we fine-tune a model or use retrieval?',
        answer:
          'Retrieval is the right default when the requirement is factual grounding in data that changes — documentation, records, tickets, catalogues. Fine-tuning helps when you need a consistent format, tone or classification behaviour that prompting cannot hold reliably. They solve different problems and are often combined: retrieval supplies the facts, fine-tuning shapes the response. We prototype the cheaper option first and only fine-tune when evaluation scores show prompting has genuinely plateaued.',
      },
      {
        question: 'How do you measure whether an AI feature is good enough to ship?',
        answer:
          'We build a golden dataset of real inputs with expected outputs, then score each release on task success, faithfulness to retrieved sources, latency and cost per request. Automated scoring carries the bulk of the load, with human review on a sampled subset. You set the threshold before launch, and the same suite runs in CI so a prompt tweak or model upgrade cannot quietly regress quality.',
      },
      {
        question: 'How is our private data protected in a RAG system?',
        answer:
          'Access control is enforced at retrieval time, so a user’s query can only match documents they are already permitted to read — never filtered after generation. Sensitive fields are detected and redacted before anything is sent to a model provider. We use zero-retention API configurations where available, keep indexes inside your cloud account, and can run open-weight models in your own infrastructure when the data cannot leave it.',
      },
      {
        question: 'What does it cost to run an LLM feature in production?',
        answer:
          'It depends on request volume, context size and how often you need a frontier model. The largest savings usually come from architecture rather than negotiation: route straightforward requests to smaller models, cache stable context, retrieve fewer and better chunks, and avoid regenerating what has not changed. We model cost per request during the prototype phase so the unit economics are known before you commit to a launch.',
      },
    ],
    metaTitle: 'AI Engineering — LLM, RAG and Agent Systems in Production',
    metaDescription:
      'Production AI engineering: LLM applications, retrieval over private data, multi-agent orchestration, evaluation harnesses, model routing and safe handling of sensitive data.',
    keywords: [
      'ai engineering',
      'llm application development',
      'rag development',
      'retrieval augmented generation',
      'multi agent systems',
      'llm evaluation',
      'vector database',
      'ai observability',
    ],
  },
  {
    slug: 'software-development',
    name: 'Software Development',
    href: '/services/software-development',
    tagline: 'Product engineering from discovery to a system you can operate.',
    summary:
      'We design and build backends, APIs, data models and cloud infrastructure for products that have to keep working under load. Discovery to launch, in reviewable increments, with tests and deployment pipelines that your own team can run after we leave.',
    heroDescription:
      'Software becomes expensive when the early decisions were made quickly and never revisited. We start with technical shaping — the data model, the boundaries between services, the failure modes — then build in increments you can review and deploy continuously. That covers greenfield products, platform work behind an existing front end, and the careful modernisation of systems that are still earning money but have become difficult to change.',
    outcomes: [
      'A working system in production, deployed through a pipeline your team controls',
      'A data model and service boundaries that still make sense after the second and third feature',
      'Test coverage placed where it pays: contracts, critical paths and known failure modes',
      'Infrastructure defined as code, reproducible across environments and documented',
    ],
    capabilities: [
      {
        title: 'Discovery and technical shaping',
        description:
          'We turn an ambition into a buildable plan: domain model, service boundaries, integration points, the risky unknowns, and a sequence that puts the most uncertain thing first rather than last.',
      },
      {
        title: 'Backend and API design',
        description:
          'REST and GraphQL APIs with versioning, pagination, idempotency and sensible error contracts. Designed from the consumer’s perspective and documented in OpenAPI so integration is not archaeology.',
      },
      {
        title: 'Distributed systems and events',
        description:
          'Queues, event streams, background workers and scheduled jobs built with retries, dead-letter handling and idempotent consumers, so a downstream outage degrades the system instead of corrupting it.',
      },
      {
        title: 'Data modelling and storage',
        description:
          'Relational schemas that hold their shape, considered indexing, safe online migrations, and a clear decision on where caching, search and analytical workloads live.',
      },
      {
        title: 'Cloud infrastructure and CI/CD',
        description:
          'Terraform-defined environments, containerised services, automated pipelines with gated deployments, secret management, and monitoring with alerts that map to real user impact.',
      },
      {
        title: 'Legacy modernisation',
        description:
          'Incremental extraction rather than a rewrite gamble: characterisation tests around current behaviour, a strangler-fig boundary, and traffic moved across a slice at a time with rollback available.',
      },
    ],
    deliverables: [
      'Source code in your repository with commit history, architecture notes and decision records',
      'OpenAPI or GraphQL schema documentation for every service interface',
      'Automated test suites: unit, integration and contract tests running in CI',
      'Terraform modules and environment definitions for dev, staging and production',
      'Monitoring, structured logging, alerting and an on-call runbook',
      'A handover with your engineers, covering architecture, operations and known trade-offs',
    ],
    stack: [
      'TypeScript',
      'Node.js',
      'Python',
      'Go',
      'PostgreSQL',
      'Redis',
      'Kafka',
      'GraphQL',
      'Docker',
      'Kubernetes',
      'Terraform',
      'AWS',
      'GitHub Actions',
      'OpenTelemetry',
    ],
    faqs: [
      {
        question: 'Do you work on existing codebases or only new builds?',
        answer:
          'Both, and most of our work is on systems that already exist. We start with a short orientation period: read the code, run it locally, review the deployment path, and write characterisation tests around the behaviour we must not break. From there we work in small, reviewable pull requests against your branching model. Inheriting an undocumented codebase is normal — we plan for it rather than treating it as an exception.',
      },
      {
        question: 'How do you decide between a rewrite and incremental modernisation?',
        answer:
          'Rewrites fail when the old system still holds undocumented business rules, which is almost always. We prefer the strangler-fig approach: put a boundary in front of the legacy system, extract one capability at a time behind it, and move traffic gradually with rollback available at every step. A full rewrite is only sensible when the platform itself is unsupportable and the domain is small enough to re-specify with confidence.',
      },
      {
        question: 'What does your testing strategy actually cover?',
        answer:
          'We aim coverage at risk rather than at a percentage. Unit tests on domain logic and edge cases, integration tests against real databases and queues in containers, contract tests on every API boundary, and a small set of end-to-end tests over the flows that would cost money if they broke. All of it runs in CI on every pull request, and the suite has to stay fast enough that engineers do not start skipping it.',
      },
      {
        question: 'Who owns the code and infrastructure when the engagement ends?',
        answer:
          'You do, from the first commit. Work happens in your repositories, your cloud accounts and your CI system, not ours. There are no proprietary frameworks, hidden licences or components that only we can maintain, and no vendor lock-in written into the contract. Every engagement ends with a handover session covering architecture, operations, deployment and known trade-offs, plus written documentation and decision records so your own engineers can continue without us.',
      },
    ],
    metaTitle: 'Software Development — Product Engineering, APIs and Cloud',
    metaDescription:
      'Custom software development from discovery to launch: backend and API design, distributed systems, data modelling, cloud infrastructure as code, CI/CD and legacy modernisation.',
    keywords: [
      'custom software development',
      'product engineering',
      'api development',
      'backend development',
      'distributed systems',
      'cloud infrastructure',
      'legacy modernisation',
      'infrastructure as code',
    ],
  },
  {
    slug: 'web-development',
    name: 'Web Development',
    href: '/services/web-development',
    tagline: 'Fast, accessible web applications built on Next.js and React.',
    summary:
      'We build web applications and public-facing sites on Next.js and React: a real design system, WCAG 2.2 AA accessibility, and Core Web Vitals treated as a build-time budget. The result loads quickly on a mid-range phone and stays maintainable as the team grows.',
    heroDescription:
      'A modern web front end is a real engineering project: rendering strategy, state management, a component system that stops the design drifting, and a performance budget that is enforced rather than admired. We build on Next.js and React, with accessibility designed in from the first component instead of audited at the end. Whether it is a product application, a headless CMS site or an e-commerce front end, the same standards apply — measured on real devices, not on a developer laptop.',
    outcomes: [
      'Core Web Vitals in the green on mid-range mobile hardware, verified with field-realistic tests',
      'WCAG 2.2 AA conformance: keyboard operable, screen-reader tested, sufficient contrast',
      'A documented design system so new pages stay consistent without redesigning them',
      'Clean, machine-readable markup and structured data so the site is parsed correctly by crawlers and answer engines',
    ],
    capabilities: [
      {
        title: 'Next.js and React applications',
        description:
          'App Router architecture with a deliberate split between server and client components, streaming where it helps perceived speed, and caching and revalidation strategies chosen per route.',
      },
      {
        title: 'Design systems',
        description:
          'A token-driven component library with typed props, documented variants and visual consistency enforced in code — so a new page is assembled rather than reinvented.',
      },
      {
        title: 'Accessibility to WCAG 2.2 AA',
        description:
          'Semantic structure, correct heading order, full keyboard operability, visible focus, sensible ARIA only where native elements fall short, and testing with an actual screen reader.',
      },
      {
        title: 'Performance engineering',
        description:
          'Budgets on JavaScript payload and Core Web Vitals, image and font optimisation, route-level code splitting, and regression checks in CI so a heavy dependency cannot slip in unnoticed.',
      },
      {
        title: 'Headless CMS and commerce',
        description:
          'Sanity, Contentful, Payload or Storyblok wired to a preview workflow editors will actually use, plus commerce front ends on Shopify or Commerce Layer with fast, accessible checkout paths.',
      },
      {
        title: 'Edge rendering and delivery',
        description:
          'Edge middleware for routing, personalisation and localisation, incremental static regeneration where content allows, and CDN caching rules tuned to how each page is actually used.',
      },
    ],
    deliverables: [
      'A Next.js application in your repository, typed end to end and deployment-ready',
      'A documented component library with tokens, variants and usage guidance',
      'An accessibility report covering automated checks and manual keyboard and screen-reader testing',
      'Performance budgets with Lighthouse and Core Web Vitals checks wired into CI',
      'Structured data and clean semantic markup across templates',
      'Editor documentation for the CMS and a handover session for your team',
    ],
    stack: [
      'TypeScript',
      'React',
      'Next.js',
      'Tailwind CSS',
      'Radix UI',
      'Framer Motion',
      'Sanity',
      'Contentful',
      'Payload CMS',
      'Shopify',
      'Playwright',
      'Vercel',
      'Cloudflare',
    ],
    faqs: [
      {
        question: 'Why build on Next.js rather than a single-page React application?',
        answer:
          'Next.js lets each route choose its rendering strategy: static where content is stable, server-rendered where it is personalised, client-side only where interactivity demands it. That means less JavaScript shipped to the browser, faster first paint, and markup that is fully present in the HTML response for crawlers that do not execute scripts. A pure single-page application makes all three of those harder, and the cost compounds as the app grows.',
      },
      {
        question: 'How do you make sure a site is genuinely accessible?',
        answer:
          'Automated tooling catches perhaps a third of real issues, so we treat it as a baseline rather than a result. We build on semantic HTML, keep heading order intact, guarantee keyboard operability for every interactive element, and verify contrast against WCAG 2.2 AA. Before launch we test the key journeys with VoiceOver and NVDA and with the keyboard alone. You receive a written report listing what was tested and anything outstanding.',
      },
      {
        question: 'What actually moves Core Web Vitals?',
        answer:
          'Usually four things: the amount of JavaScript executed before the page becomes interactive, unoptimised images and fonts in the critical path, layout shifts from unreserved space, and slow server response on the initial document. We set a payload budget at the start, measure on throttled mobile hardware rather than a developer laptop, and enforce the budget in CI so a single heavy dependency cannot quietly undo the work.',
      },
      {
        question: 'Can you work with our existing design or CMS?',
        answer:
          'Yes. If you have a design system we build against it and flag gaps and accessibility risks as we go. If you have an established CMS we integrate with it rather than proposing a migration — the content model and editor workflow usually matter more than the vendor. When a platform genuinely limits performance or accessibility we will explain the specific constraint and the cost of the alternative, then leave the decision with you.',
      },
    ],
    metaTitle: 'Web Development — Next.js Applications, Fast and Accessible',
    metaDescription:
      'Next.js and React web development: design systems, WCAG 2.2 AA accessibility, Core Web Vitals performance budgets, headless CMS, commerce front ends and edge rendering.',
    keywords: [
      'web development',
      'next.js development',
      'react development',
      'design systems',
      'web accessibility wcag',
      'core web vitals',
      'headless cms',
      'edge rendering',
    ],
  },
];

/** Look up a service by its slug. */
export function getService(slug: string): ServiceDetail | undefined {
  return services.find((service) => service.slug === slug);
}

/** Every service except the one given — used for cross-links. */
export function getOtherServices(slug: string): ServiceDetail[] {
  return services.filter((service) => service.slug !== slug);
}
