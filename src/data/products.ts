/**
 * Typed source of truth for the two applications WeThinkDigital builds and runs.
 *
 * Facts here are client-approved. Do not add user counts, pricing, funding or
 * testimonials — none of those have been supplied and inventing them would make
 * both the copy and the structured data indefensible.
 */

import { siteConfig } from '@/lib/site';

export type ProductId = 'agents' | 'resume';

export interface ProductAgentRole {
  id: string;
  name: string;
  /** One-line job description, e.g. "Implements the ticket". */
  role: string;
  description: string;
  /** What the agent picks up. */
  consumes: string;
  /** What the agent hands back. */
  produces: string;
  steps: string[];
}

export interface ProductFeature {
  title: string;
  description: string;
}

export interface ProductWorkflowStep {
  step: string;
  title: string;
  description: string;
}

export interface ProductFaq {
  question: string;
  answer: string;
}

export interface Product {
  id: ProductId;
  name: string;
  /** Short label for nav, cards and breadcrumbs. */
  shortName: string;
  /** Internal route — this is the page we want indexed. */
  href: string;
  /** The live application. Always opened in a new tab. */
  externalUrl: string;
  tagline: string;
  summary: string;
  heroEyebrow: string;
  heroDescription: string;
  /** Label for the button that opens the live app. */
  primaryCtaLabel: string;
  audience: { title: string; description: string }[];
  features: ProductFeature[];
  workflow: ProductWorkflowStep[];
  faqs: ProductFaq[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  /** schema.org SoftwareApplication.applicationCategory */
  applicationCategory: string;
}

/* -------------------------------------------------------------------------- */
/* Agents — the three specialised roles                                        */
/* -------------------------------------------------------------------------- */

export const agentRoles: ProductAgentRole[] = [
  {
    id: 'sde',
    name: 'SDE agent',
    role: 'Implements the work item',
    description:
      'Picks up a ticket from the backlog, reads the surrounding code, and writes the implementation. It works the way an engineer does: understand the change, make it, keep it scoped to the ticket.',
    consumes: 'A work item from your backlog',
    produces: 'An implementation on its own branch',
    steps: [
      'Reads the work item and pulls in the files it touches.',
      'Plans the change and writes the code against your existing patterns.',
      'Commits to a dedicated branch, never straight to your main line.',
      'Links the branch back to the work item so the trail stays intact.',
    ],
  },
  {
    id: 'qa',
    name: 'QA agent',
    role: 'Tests the work item',
    description:
      'Takes the same work item and tests it independently of the agent that wrote it. It checks the change against what the ticket actually asked for, and reports what it finds.',
    consumes: 'The same work item, plus the implementation branch',
    produces: 'Test runs and defect reports',
    steps: [
      'Derives test cases from the acceptance criteria on the work item.',
      'Exercises the change and runs the existing suite alongside it.',
      'Files a defect report against the branch when behaviour and ticket disagree.',
      'Sends failures back to the SDE agent instead of forwarding a broken branch.',
    ],
  },
  {
    id: 'pr-review',
    name: 'PR Review agent',
    role: 'Reviews the pull request',
    description:
      'Reviews pull requests as they are raised — including the ones your engineers raise — and comments on them. It reads the diff in context rather than pattern-matching on style.',
    consumes: 'A pull request',
    produces: 'Inline review comments and a verdict',
    steps: [
      'Reads the full diff together with the code around it.',
      'Comments inline on correctness, edge cases and unhandled failure paths.',
      'Flags changes that widen scope beyond the linked work item.',
      'Leaves a clear verdict so a human reviewer knows where to look first.',
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Products                                                                    */
/* -------------------------------------------------------------------------- */

const agents: Product = {
  id: 'agents',
  name: siteConfig.apps.agents.name,
  shortName: siteConfig.apps.agents.shortName,
  href: siteConfig.apps.agents.href,
  externalUrl: siteConfig.apps.agents.url,
  tagline: siteConfig.apps.agents.tagline,
  summary:
    'Three specialised agents — SDE, QA and PR Review — working one backlog. They implement work items, test them, and review the pull requests your team raises.',
  heroEyebrow: 'Product · AI agents for software delivery',
  heroDescription:
    'Agents is a multi-agent platform that plugs into the backlog and repository you already use. The SDE agent implements work items, the QA agent tests them, and the PR Review agent reviews pull requests and comments on them. Your engineers keep the judgement calls and the merge button.',
  primaryCtaLabel: 'Open Agents',
  audience: [
    {
      title: 'Engineering leads',
      description:
        'You have more backlog than throughput and you need the routine half of it to move without adding headcount.',
    },
    {
      title: 'Small teams shipping under pressure',
      description:
        'Three or four engineers carrying a roadmap sized for ten. The mechanical work is what is eating the week.',
    },
    {
      title: 'Teams with a review bottleneck',
      description:
        'Pull requests sit for days waiting on the one person everyone routes reviews through.',
    },
    {
      title: 'Teams with thin test coverage',
      description:
        'Testing is the step that gets dropped first when a release date tightens. A dedicated agent stops that happening.',
    },
  ],
  features: [
    {
      title: 'Three specialised agents, one backlog',
      description:
        'Implementation, testing and review are separate jobs handled by separate agents, so no single agent marks its own work as finished.',
    },
    {
      title: 'Works on your repository',
      description:
        'Agents operate on the repository and branching model you already have. No migration, no parallel copy of your codebase.',
    },
    {
      title: 'Driven by your work items',
      description:
        'A ticket is the unit of work. Agents read the description and acceptance criteria and stay inside that scope.',
    },
    {
      title: 'Branch-per-item isolation',
      description:
        'Every change lands on its own branch and arrives as a pull request. Nothing reaches your main line unreviewed.',
    },
    {
      title: 'Review comments with reasoning',
      description:
        'The PR Review agent explains why a line is a problem and what it would break, so the comment is actionable rather than cosmetic.',
    },
    {
      title: 'A human merges',
      description:
        'The pipeline deliberately stops before merge. Approval stays a human decision on every single change.',
    },
  ],
  workflow: [
    {
      step: '01',
      title: 'Work item',
      description:
        'A ticket is picked up from the backlog you already maintain, with its description and acceptance criteria.',
    },
    {
      step: '02',
      title: 'SDE agent implements',
      description:
        'The SDE agent reads the surrounding code, writes the change and commits it to a dedicated branch.',
    },
    {
      step: '03',
      title: 'QA agent tests',
      description:
        'The QA agent derives cases from the acceptance criteria, exercises the branch and reports defects back.',
    },
    {
      step: '04',
      title: 'Pull request raised',
      description:
        'Once the branch passes, it is raised as a pull request against your normal target branch.',
    },
    {
      step: '05',
      title: 'PR Review agent reviews',
      description:
        'The review agent reads the diff in context and leaves inline comments plus a verdict on the pull request.',
    },
    {
      step: '06',
      title: 'Human merges',
      description:
        'An engineer reads the summary, the comments and the diff, and makes the call. Merge is never automatic.',
    },
  ],
  faqs: [
    {
      question: 'Does this replace our engineers?',
      answer:
        'No. It removes the mechanical part of the job — the boilerplate implementation, the repetitive test passes, the first read of a diff. Judgement, architecture, product decisions and the merge itself stay with your engineers. The pipeline is built to stop at a human on purpose.',
    },
    {
      question: 'What happens to our code?',
      answer:
        'Agents work against the repository you point them at and operate within the access you grant. We scope permissions to what a task needs, and we do not require you to move your codebase anywhere. If you have specific data-handling requirements, raise them before rollout and we will confirm in writing what the deployment does and does not touch.',
    },
    {
      question: 'Which stacks and languages does it work with?',
      answer:
        'It works on mainstream application stacks — TypeScript and JavaScript, Python, Java, Go, C#, PHP — and the frameworks built on them. The agents read your existing code before writing anything, so they follow the conventions already in the repository rather than imposing a house style. Tell us your stack and we will be straight with you about fit.',
    },
    {
      question: 'What happens when an agent writes a bad implementation?',
      answer:
        'It gets caught before you see it, or it gets caught at review. The QA agent tests the branch against the acceptance criteria and sends failures back to the SDE agent instead of promoting them. Anything that survives that still arrives as a pull request with review comments attached, and a human decides. A bad implementation costs you a rejected pull request, not a production incident.',
    },
    {
      question: 'How are the review comments scoped?',
      answer:
        'The PR Review agent comments on the diff and the code it affects — correctness, edge cases, unhandled failure paths, and scope creep beyond the linked work item. It is not there to relitigate formatting your linter already handles, and it does not open unrelated refactoring arguments in someone else\u2019s pull request.',
    },
    {
      question: 'How do we onboard?',
      answer:
        'We start with one repository and a narrow slice of the backlog so you can judge the output on work you understand. You connect the repository and the backlog, we agree the branch and review conventions, and the agents begin producing pull requests you review as normal. Scope widens only once you are happy with what is landing.',
    },
  ],
  metaTitle: 'Agents — autonomous software delivery with SDE, QA and PR Review agents',
  metaDescription:
    'A multi-agent platform that works your existing backlog and repository. The SDE agent implements work items, the QA agent tests them, and the PR Review agent reviews pull requests. Humans keep the merge.',
  keywords: [
    'AI coding agents',
    'autonomous software delivery',
    'multi-agent development platform',
    'AI pull request review',
    'automated QA agent',
    'AI software engineering agent',
    'agentic development workflow',
  ],
  applicationCategory: 'DeveloperApplication',
};

const resume: Product = {
  id: 'resume',
  name: siteConfig.apps.resume.name,
  shortName: siteConfig.apps.resume.shortName,
  href: siteConfig.apps.resume.href,
  externalUrl: siteConfig.apps.resume.url,
  tagline: siteConfig.apps.resume.tagline,
  summary:
    'Upload the resume you already have. Get back a cleaner, better-structured, recruiter-ready version — same career, presented properly.',
  heroEyebrow: 'Product · AI resume redesign',
  heroDescription:
    'Most resumes are not weak because the career is weak. They are weak because the structure is buried, the formatting fights the reader, and the bullet points describe duties instead of outcomes. Resume takes the document you already have and returns a redesigned version that reads cleanly in the six seconds it actually gets.',
  primaryCtaLabel: 'Redesign my resume',
  audience: [
    {
      title: 'Engineers and technical specialists',
      description:
        'Deep experience that reads as a list of technologies. The redesign puts the work, and its result, in front of the tooling.',
    },
    {
      title: 'Graduates and early-career applicants',
      description:
        'Limited history that needs structure and confident wording rather than padding and filler sections.',
    },
    {
      title: 'Career switchers',
      description:
        'Relevant experience buried under job titles from the previous field, reordered so the transferable work leads.',
    },
    {
      title: 'Anyone applying at volume',
      description:
        'One clean base document you can tailor per role, instead of rebuilding the layout for every application.',
    },
  ],
  features: [
    {
      title: 'Structure that leads with the point',
      description:
        'Sections are ordered and labelled so the strongest, most relevant material is above the fold rather than on page two.',
    },
    {
      title: 'Consistent formatting throughout',
      description:
        'One type scale, one date format, one bullet style, aligned spacing. The inconsistencies that signal carelessness are removed.',
    },
    {
      title: 'Outcome-led bullet points',
      description:
        'Vague responsibility lines are rewritten to say what you did and what changed as a result — using your material, not invented achievements.',
    },
    {
      title: 'Sensible length and density',
      description:
        'Repetition is collapsed and dead weight is cut, so the document is as long as it needs to be and no longer.',
    },
    {
      title: 'Machine-readable output',
      description:
        'A clean single-flow layout without text trapped in images or complex tables, so applicant tracking systems parse it correctly.',
    },
    {
      title: 'Tailored to a target role',
      description:
        'Point it at the role you are applying for and the emphasis, ordering and language shift to match what that job is asking for.',
    },
  ],
  workflow: [
    {
      step: '01',
      title: 'Upload your resume',
      description:
        'Start from the document you already have. No forms to refill, no rebuilding your history from scratch.',
    },
    {
      step: '02',
      title: 'AI restructures and rewrites',
      description:
        'It reorganises the sections, fixes the formatting, and sharpens the wording into clear outcome-led lines.',
    },
    {
      step: '03',
      title: 'Download the redesigned resume',
      description:
        'Review the result, adjust anything you want changed, and download a clean document ready to send.',
    },
  ],
  faqs: [
    {
      question: 'What file types can I upload?',
      answer:
        'Standard resume documents — the usual word-processor and PDF formats people already have. Text-based files give the best result, because a resume saved as a flat image has to be read visually before it can be restructured. Open the app to see the formats currently accepted.',
    },
    {
      question: 'Does it change the facts on my resume?',
      answer:
        'No. It restructures and sharpens how your experience is written — it does not fabricate employers, dates, titles, qualifications or results. If a bullet point contains no outcome, it gets clearer and tighter, not invented. Everything on the redesigned document should still be something you can defend in an interview, and you should read it before you send it.',
    },
    {
      question: 'Is my data kept?',
      answer:
        'Your resume is processed to produce the redesigned version. It is your document and it stays yours — we have no interest in trading it. The app states the current handling and retention terms directly; read them there before uploading if that is a concern for you.',
    },
    {
      question: 'Can I tailor it for a specific job?',
      answer:
        'Yes. Give it the role you are targeting and the output shifts emphasis towards what that job asks for — reordering sections, leading with the relevant experience and matching the language of the field. The underlying facts stay the same across every version.',
    },
    {
      question: 'Is it free to try?',
      answer:
        'Open the app to see the current options. We keep pricing and plan details in one place so they are always accurate rather than repeated on a page that can fall out of date.',
    },
  ],
  metaTitle: 'Resume AI — redesign your resume into a clean, recruiter-ready document',
  metaDescription:
    'Upload an existing resume and get back a redesigned version: better structure, consistent formatting, outcome-led bullet points and a layout applicant tracking systems can read.',
  keywords: [
    'AI resume redesign',
    'resume formatting tool',
    'AI resume builder',
    'resume rewriter',
    'ATS friendly resume',
    'CV redesign tool',
  ],
  applicationCategory: 'BusinessApplication',
};

export const products: Product[] = [agents, resume];

export function getProduct(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

/** Narrowed accessors for the two pages that must always resolve. */
export const agentsProduct = agents;
export const resumeProduct = resume;
