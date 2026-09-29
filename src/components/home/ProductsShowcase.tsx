import Link from 'next/link';

import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import { agentRoles, agentsProduct, resumeProduct } from '@/data/products';

/** Per-role identity dots, matching the agents page. */
const roleDot: Record<string, string> = {
  sde: 'bg-primary',
  qa: 'bg-success',
  'pr-review': 'bg-accent',
};

/**
 * Home section for the two live applications.
 * Agents is the dark product surface; Resume stays light — the pairing is deliberate.
 * Both cards link to the internal product page so that page is what gets indexed,
 * not the app subdomain.
 */
export default function ProductsShowcase() {
  return (
    <Section id="products" bordered muted>
      <SectionHeading
        eyebrow="Our products"
        title="Software we built for ourselves. Now you can use it too."
        description="Two applications, both live, both born out of work we needed done. One takes the mechanical half of software delivery off your team. The other redesigns the document your career is judged on."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-5">
        {/* ------------------------------------------------------------ */}
        {/* Agents — flagship, 60% of the row. Dark product surface.       */}
        {/* ------------------------------------------------------------ */}
        <article className="surface-dark relative overflow-hidden p-8 sm:p-10 lg:col-span-3">
          <div className="relative flex h-full flex-col">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-white/70">
                <i className={`h-1.5 w-1.5 shrink-0 rounded-full ${roleDot.sde}`} aria-hidden="true" />
                Flagship
              </span>
              <span className="text-xs text-white/45">AI agents for software delivery</span>
            </div>

            <h3 className="mt-6 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
              <Link href={agentsProduct.href} className="after:absolute after:inset-0">
                {agentsProduct.shortName}
              </Link>
            </h3>
            <p className="mt-3 text-base font-medium text-white/75">{agentsProduct.tagline}</p>
            <p className="mt-4 max-w-xl text-sm leading-[1.65] text-white/60">
              Three specialised agents work the same backlog: one implements the ticket, one tests
              it, one reviews the pull request. It runs on the repository you already have, and your
              engineers keep the merge.
            </p>

            <ul className="mt-8 grid gap-2.5 sm:grid-cols-3">
              {agentRoles.map((agent) => (
                <li
                  key={agent.id}
                  className="rounded-[0.625rem] border border-white/10 bg-white/[0.05] px-4 py-3.5"
                >
                  <p className="flex items-center gap-2 text-sm font-medium text-white">
                    <i
                      className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                        roleDot[agent.id] ?? roleDot.sde
                      }`}
                      aria-hidden="true"
                    />
                    {agent.name}
                  </p>
                  <p className="mt-1.5 text-xs leading-[1.5] text-white/50">{agent.role}</p>
                </li>
              ))}
            </ul>

            <p className="mt-auto pt-9 text-sm font-semibold text-primary-soft">
              <span aria-hidden="true">Explore Agents →</span>
              <span className="sr-only">Explore {agentsProduct.name}</span>
            </p>
          </div>
        </article>

        {/* ------------------------------------------------------------ */}
        {/* Resume — 40% of the row. Stays light.                          */}
        {/* ------------------------------------------------------------ */}
        <article className="surface surface-hover relative overflow-hidden p-8 sm:p-10 lg:col-span-2">
          <div className="flex h-full flex-col">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full border border-secondary/40 bg-secondary-soft px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-secondary">
                Live app
              </span>
              <span className="text-xs text-subtle">AI resume redesign</span>
            </div>

            <h3 className="mt-6 text-2xl font-semibold tracking-[-0.04em] text-foreground sm:text-3xl">
              <Link href={resumeProduct.href} className="after:absolute after:inset-0">
                {resumeProduct.shortName}
              </Link>
            </h3>
            <p className="mt-3 text-base font-medium text-secondary">{resumeProduct.tagline}</p>
            <p className="mt-4 text-sm leading-[1.65] text-muted">
              Upload the resume you already have and get back a cleaner, better-structured,
              recruiter-ready version. Same career, presented so it actually reads.
            </p>

            <ul className="mt-8 flex flex-col gap-3">
              {[
                'Structure and hierarchy fixed',
                'Consistent formatting throughout',
                'Outcome-led bullet points',
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm leading-[1.6] text-muted">
                  <span
                    className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 rounded-[1px] bg-secondary"
                    aria-hidden="true"
                  />
                  {point}
                </li>
              ))}
            </ul>

            <p className="mt-auto pt-9 text-sm font-semibold text-primary">
              <span aria-hidden="true">Explore Resume AI →</span>
              <span className="sr-only">Explore {resumeProduct.name}</span>
            </p>
          </div>
        </article>
      </div>

      <div className="mt-10">
        <Link href="/products" className="btn-secondary">
          See both products
        </Link>
      </div>
    </Section>
  );
}
