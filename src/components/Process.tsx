'use client';

import { motion } from 'framer-motion';

const processSteps = [
  {
    id: '01',
    title: 'Discovery and strategy',
    description: 'We get specific about the commercial target, current friction, and the evidence that will move the decision.',
    duration: '1–2 weeks',
    deliverables: ['Business analysis', 'Competitive research', 'Growth strategy'],
  },
  {
    id: '02',
    title: 'Design and architecture',
    description: 'We shape the experience and technical foundation around the way your customers actually decide.',
    duration: '2–3 weeks',
    deliverables: ['Interface direction', 'Technical architecture', 'Project roadmap'],
  },
  {
    id: '03',
    title: 'Build and test',
    description: 'We ship in focused increments, measuring the path as it becomes real instead of waiting for a big reveal.',
    duration: '4–8 weeks',
    deliverables: ['Development sprints', 'Testing reports', 'Feature releases'],
  },
  {
    id: '04',
    title: 'Launch and learn',
    description: 'We monitor the live experience, remove friction, and keep the next improvement visible to the team.',
    duration: 'Ongoing',
    deliverables: ['Performance monitoring', 'Experiment plan', 'Growth optimisation'],
  },
];

export default function Process() {
  return (
    <section id="process" className="border-y border-line bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]"
        >
          <div>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.24em] text-primary">How we work</p>
            <h2 className="text-4xl font-bold leading-tight tracking-[-0.05em] text-foreground sm:text-6xl">A visible path from brief to business result.</h2>
          </div>
          <p className="max-w-2xl self-end text-lg leading-8 text-muted">No black box, no ceremonial handoff. Every phase leaves behind a decision, an artifact, and a measurable next move.</p>
        </motion.div>

        <div className="mt-16 divide-y divide-line border-y border-line">
          {processSteps.map((step, index) => (
            <motion.article
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="grid gap-6 py-8 md:grid-cols-[72px_1fr_220px] md:items-start"
            >
              <p className="font-mono text-sm text-primary">{step.id}</p>
              <div>
                <h3 className="text-2xl font-semibold tracking-[-0.03em] text-foreground">{step.title}</h3>
                <p className="mt-3 max-w-2xl leading-7 text-muted">{step.description}</p>
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-secondary">
                  {step.deliverables.map((deliverable) => <span key={deliverable}>{deliverable}</span>)}
                </div>
              </div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted md:pt-1">{step.duration}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-6 border-b border-line pb-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-lg leading-7 text-muted">Bring us the growth problem you keep circling. We&apos;ll help you turn it into a tractable plan.</p>
          <button
            type="button"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary self-start"
          >
            Plan a growth audit
          </button>
        </div>
      </div>
    </section>
  );
}
