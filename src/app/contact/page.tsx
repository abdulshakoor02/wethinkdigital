import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = buildMetadata({
  title: 'Start a project',
  description:
    'Tell us what you need built — AI automation, agent systems, custom software or a web platform. Send the problem and the constraints, and you will get a technical read on the approach.',
  path: '/contact',
  keywords: [
    'hire ai engineers',
    'custom software development enquiry',
    'ai automation consultation',
    'software engineering partner',
  ],
});

const includeItems = [
  'The problem you are trying to solve, in plain terms — not a feature list.',
  'The systems it has to work with: existing stack, data sources, integrations.',
  'Hard constraints: deadlines, compliance, budget envelope, in-house team size.',
  'What "done" looks like, and who signs off on it.',
];

const steps = [
  {
    title: 'We read it properly',
    body: 'A real engineer reads your message, not a sales inbox. You get a reply within one business day.',
  },
  {
    title: 'A 30-minute technical call',
    body: 'We dig into the architecture, the constraints and the unknowns. No slide deck, no discovery fee.',
  },
  {
    title: 'A written approach and shape',
    body: 'You get the proposed technical approach, the team shape, a phased plan and an honest view of the risks.',
  },
];

export default function ContactPage() {
  return (
    <>
      <main id="main" className="bg-background pt-32">
        <div className="mx-auto max-w-7xl px-6 pb-24 sm:px-10 sm:pb-32 lg:px-16">
          <div className="max-w-3xl">
            <p className="mono-label mb-5">Contact</p>
            <h1 className="text-[2.5rem] font-semibold leading-[1.06] tracking-[-0.045em] text-foreground sm:text-6xl lg:text-[4.4rem]">
              Start a <span className="serif">project</span>
            </h1>
            <p className="mt-6 text-[1.05rem] leading-[1.66] text-muted sm:text-[1.0625rem]">
              Tell us what you are trying to build and what is getting in the way. We will come back
              with a technical approach, a shape for the team, and an honest view of what is
              achievable in your timeline.
            </p>
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
            {/* Left: guidance + what happens next + direct channels */}
            <div>
              <section aria-labelledby="what-to-include">
                <h2
                  id="what-to-include"
                  className="text-lg font-semibold tracking-[-0.025em] text-foreground sm:text-xl"
                >
                  What to include
                </h2>
                <ul className="mt-5 space-y-3">
                  {includeItems.map((item) => (
                    <li key={item} className="relative pl-6 text-sm leading-7 text-muted">
                      <span
                        className="absolute left-0 top-[0.7rem] h-1.5 w-1.5 rounded-[1px] bg-primary"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="what-happens-next" className="mt-12">
                <h2
                  id="what-happens-next"
                  className="text-lg font-semibold tracking-[-0.025em] text-foreground sm:text-xl"
                >
                  What happens next
                </h2>
                <ol className="mt-5 space-y-6">
                  {steps.map((step, index) => (
                    <li key={step.title} className="flex gap-4">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line-strong bg-background font-mono text-[0.6875rem] text-muted">
                        {index + 1}
                      </span>
                      <div>
                        <p className="text-sm font-semibold tracking-tight text-foreground">
                          {step.title}
                        </p>
                        <p className="mt-1 text-sm leading-6 text-muted">{step.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>

              <section aria-labelledby="direct-contact" className="mt-12">
                <h2
                  id="direct-contact"
                  className="text-lg font-semibold tracking-[-0.025em] text-foreground sm:text-xl"
                >
                  Or reach us directly
                </h2>
                <dl className="mt-5 divide-y divide-line border-y border-line">
                  <div className="py-5">
                    <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-subtle">Email</dt>
                    <dd className="mt-2">
                      <a href={`mailto:${siteConfig.email}`} className="text-foreground hover:text-primary">
                        {siteConfig.email}
                      </a>
                    </dd>
                  </div>
                  <div className="py-5">
                    <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-subtle">Phone</dt>
                    <dd className="mt-2">
                      <a href={siteConfig.phoneHref} className="text-foreground hover:text-primary">
                        {siteConfig.phone}
                      </a>
                    </dd>
                  </div>
                  <div className="py-5">
                    <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-subtle">WhatsApp</dt>
                    <dd className="mt-2">
                      <a
                        href={siteConfig.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground hover:text-primary"
                      >
                        Message us on WhatsApp ↗
                      </a>
                    </dd>
                  </div>
                  <div className="py-5">
                    <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-subtle">Based in</dt>
                    <dd className="mt-2 text-foreground">Dubai, UAE — working with teams worldwide</dd>
                  </div>
                </dl>
              </section>
            </div>

            {/* Right: the form itself */}
            <div id="contact">
              <ContactForm variant="bare" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
