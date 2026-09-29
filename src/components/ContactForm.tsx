'use client';

import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { siteConfig } from '@/lib/site';

/** Exactly the field names `/api/contact` destructures — do not rename. */
interface ContactPayload {
  name: string;
  email: string;
  company: string;
  phone: string;
  budget: string;
  projectType: string;
  message: string;
}

/** Client-side only; never submitted. Bots fill it, humans never see it. */
interface FormValues extends ContactPayload {
  companyWebsite: string;
}

const projectTypes = [
  'AI automation',
  'AI agents / LLM product',
  'Custom software',
  'Web application',
  'Existing system integration',
  'Something else',
];

const budgets = [
  'Under $10k — prototype or scoped build',
  '$10k – $30k — one product workstream',
  '$30k – $75k — multi-workstream delivery',
  '$75k+ — ongoing engineering partnership',
  'Not sure yet',
];

const inputClass =
  'w-full rounded-[var(--radius-sm)] border border-line bg-surface px-4 py-3 text-foreground transition-colors placeholder:text-subtle focus:border-primary aria-[invalid=true]:border-danger';
const labelClass = 'mb-2 block text-sm font-medium text-foreground';

interface ContactFormProps {
  /**
   * `section` (default) renders the full home-page band with its own heading.
   * `bare` renders only the form card, for pages that supply their own heading.
   */
  variant?: 'section' | 'bare';
}

export default function ContactForm({ variant = 'section' }: ContactFormProps) {
  const uid = useId();
  const fid = (name: string) => `${uid}-${name}`;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (values: FormValues) => {
    // Honeypot tripped — pretend success, send nothing.
    if (values.companyWebsite) {
      setStatus('success');
      setStatusMessage('Thanks — your message is through.');
      reset();
      return;
    }

    setIsSubmitting(true);
    setStatus('idle');
    setStatusMessage('');

    const payload: ContactPayload = {
      name: values.name,
      email: values.email,
      company: values.company,
      phone: values.phone,
      budget: values.budget,
      projectType: values.projectType,
      message: values.message,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus('success');
        setStatusMessage('Thanks — your message is through. We reply within one business day.');
        reset();
      } else {
        setStatus('error');
        setStatusMessage(
          `We could not send your message. Please try again, or email ${siteConfig.email} directly.`,
        );
      }
    } catch {
      setStatus('error');
      setStatusMessage(
        `We could not reach the server. Please try again, or email ${siteConfig.email} directly.`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const onInvalid = (fieldErrors: typeof errors) => {
    const count = Object.keys(fieldErrors).length;
    setStatus('error');
    setStatusMessage(
      `Please complete ${count} required ${count === 1 ? 'field' : 'fields'} before sending.`,
    );
    const first = Object.keys(fieldErrors)[0] as keyof FormValues | undefined;
    if (first) setFocus(first);
  };

  const form = (
    <div className="surface p-6 sm:p-8">
      {/* Polite live region — announced without interrupting the user. */}
      <p
        role="status"
        aria-live="polite"
        className={
          status === 'idle'
            ? 'sr-only'
            : `mb-6 rounded-[var(--radius-sm)] border-l-2 px-4 py-3 text-sm leading-6 text-foreground ${
                status === 'success' ? 'border-success bg-success/10' : 'border-danger bg-danger/10'
              }`
        }
      >
        {statusMessage}
      </p>

      <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-6" noValidate>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor={fid('name')} className={labelClass}>
              Full name <span className="text-primary">*</span>
            </label>
            <input
              id={fid('name')}
              type="text"
              autoComplete="name"
              {...register('name', { required: 'Please add your name.' })}
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-describedby={errors.name ? fid('name-error') : undefined}
              className={inputClass}
            />
            {errors.name && (
              <p id={fid('name-error')} className="mt-2 text-sm text-danger">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor={fid('email')} className={labelClass}>
              Work email <span className="text-primary">*</span>
            </label>
            <input
              id={fid('email')}
              type="email"
              autoComplete="email"
              {...register('email', {
                required: 'Please add your email.',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please check the email address.' },
              })}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? fid('email-error') : undefined}
              className={inputClass}
            />
            {errors.email && (
              <p id={fid('email-error')} className="mt-2 text-sm text-danger">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor={fid('company')} className={labelClass}>
              Company <span className="text-primary">*</span>
            </label>
            <input
              id={fid('company')}
              type="text"
              autoComplete="organization"
              {...register('company', { required: 'Please add your company.' })}
              aria-invalid={errors.company ? 'true' : 'false'}
              aria-describedby={errors.company ? fid('company-error') : undefined}
              className={inputClass}
            />
            {errors.company && (
              <p id={fid('company-error')} className="mt-2 text-sm text-danger">
                {errors.company.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor={fid('phone')} className={labelClass}>
              Phone <span className="text-muted">(optional)</span>
            </label>
            <input
              id={fid('phone')}
              type="tel"
              autoComplete="tel"
              {...register('phone')}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor={fid('projectType')} className={labelClass}>
              What do you need built? <span className="text-primary">*</span>
            </label>
            <select
              id={fid('projectType')}
              {...register('projectType', { required: 'Please choose what you need built.' })}
              aria-invalid={errors.projectType ? 'true' : 'false'}
              aria-describedby={errors.projectType ? fid('projectType-error') : undefined}
              className={inputClass}
              defaultValue=""
            >
              <option value="" disabled>
                Select an option
              </option>
              {projectTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.projectType && (
              <p id={fid('projectType-error')} className="mt-2 text-sm text-danger">
                {errors.projectType.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor={fid('budget')} className={labelClass}>
              Engagement size <span className="text-primary">*</span>
            </label>
            <select
              id={fid('budget')}
              {...register('budget', { required: 'Please choose an engagement size.' })}
              aria-invalid={errors.budget ? 'true' : 'false'}
              aria-describedby={errors.budget ? fid('budget-error') : undefined}
              className={inputClass}
              defaultValue=""
            >
              <option value="" disabled>
                Select a range
              </option>
              {budgets.map((band) => (
                <option key={band} value={band}>
                  {band}
                </option>
              ))}
            </select>
            {errors.budget && (
              <p id={fid('budget-error')} className="mt-2 text-sm text-danger">
                {errors.budget.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor={fid('message')} className={labelClass}>
            What are you trying to build? <span className="text-primary">*</span>
          </label>
          <textarea
            id={fid('message')}
            rows={5}
            {...register('message', {
              required: 'Please describe the problem you want solved.',
              minLength: { value: 20, message: 'A couple of sentences helps us reply usefully.' },
            })}
            aria-invalid={errors.message ? 'true' : 'false'}
            aria-describedby={
              errors.message ? `${fid('message-error')} ${fid('message-hint')}` : fid('message-hint')
            }
            className={inputClass}
            placeholder="The problem, the systems involved, any hard constraints or deadlines."
          />
          <p id={fid('message-hint')} className="mt-2 text-sm text-muted">
            The more concrete the problem, the more concrete our answer.
          </p>
          {errors.message && (
            <p id={fid('message-error')} className="mt-2 text-sm text-danger">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Honeypot — hidden from humans and assistive tech. */}
        <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
          <label htmlFor={fid('companyWebsite')}>Company website</label>
          <input
            id={fid('companyWebsite')}
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register('companyWebsite')}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="btn-primary w-full"
        >
          {isSubmitting ? 'Sending…' : 'Send message'}
        </button>
      </form>
    </div>
  );

  if (variant === 'bare') return form;

  return (
    <section id="contact" className="border-t border-line bg-background-muted py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="mono-label mb-5">Start a project</p>
            <h2 className="text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-foreground sm:text-5xl">
              Tell us what you are <span className="serif">trying to build</span>.
            </h2>
            <p className="mt-6 max-w-xl text-[1.05rem] leading-[1.66] text-muted sm:text-[1.0625rem]">
              Send the problem, the constraints and the deadline. You will get a technical read on
              the approach, a shape for the team, and an honest view of what is achievable.
            </p>

            <dl className="mt-12 divide-y divide-line border-y border-line">
              <div className="py-5">
                <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-subtle">
                  Email
                </dt>
                <dd className="mt-2">
                  <a href={`mailto:${siteConfig.email}`} className="text-foreground hover:text-primary">
                    {siteConfig.email}
                  </a>
                </dd>
              </div>
              <div className="py-5">
                <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-subtle">
                  Phone
                </dt>
                <dd className="mt-2">
                  <a href={siteConfig.phoneHref} className="text-foreground hover:text-primary">
                    {siteConfig.phone}
                  </a>
                </dd>
              </div>
              <div className="py-5">
                <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-subtle">
                  Based in
                </dt>
                <dd className="mt-2 text-foreground">Dubai, UAE — working with teams worldwide</dd>
              </div>
            </dl>
          </div>

          {form}
        </div>
      </div>
    </section>
  );
}
