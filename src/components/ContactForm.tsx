'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  budget: string;
  projectType: string;
  message: string;
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [validationSummary, setValidationSummary] = useState<string | null>(null);
  const { register, handleSubmit, reset, setFocus, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setValidationSummary(null);
        reset();
      } else {
        const errorData = await response.json();
        setSubmitError(errorData.error || 'We could not send your request. Please try again.');
      }
    } catch {
      setSubmitError('We could not reach the enquiry service. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onInvalid = (fieldErrors: typeof errors) => {
    setSubmitError(null);
    const errorCount = Object.keys(fieldErrors).length;
    setValidationSummary(`Please review ${errorCount} required ${errorCount === 1 ? 'field' : 'fields'} before sending your enquiry.`);
    const firstError = Object.keys(fieldErrors)[0] as keyof FormData | undefined;
    if (firstError) setFocus(firstError);
  };

  return (
    <section id="contact" className="border-t border-line bg-background-muted py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }}>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.24em] text-primary">Start with the baseline</p>
            <h2 className="text-4xl font-bold leading-tight tracking-[-0.05em] text-foreground sm:text-6xl">Tell us where growth is getting stuck.</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">Share enough context for a useful first response. We&apos;ll come back with the questions, constraints, and next move that matter.</p>
            <div className="mt-12 divide-y divide-line border-y border-line">
              <div className="py-5"><p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Email</p><a href="mailto:info@wethinkdigital.solutions" className="mt-2 inline-block text-foreground hover:text-primary">info@wethinkdigital.solutions</a></div>
              <div className="py-5"><p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Phone</p><a href="tel:+971564713394" className="mt-2 inline-block text-foreground hover:text-primary">+971 (564) 713-394</a></div>
              <div className="py-5"><p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Based in</p><p className="mt-2 text-foreground">Dubai, UAE</p></div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: 0.1 }} className="surface p-6 sm:p-9">
            {submitSuccess ? (
              <div className="py-8" role="status">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Request received</p>
                <h3 className="mt-5 text-3xl font-bold tracking-[-0.04em] text-foreground">We&apos;ll come back with a useful next step.</h3>
                <p className="mt-4 max-w-xl leading-7 text-muted">Your message is through. We aim to reply within 24 hours with a clear read on what to discuss first.</p>
                <button type="button" onClick={() => setSubmitSuccess(false)} className="btn-secondary mt-8">Send another enquiry</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-6" noValidate>
                {validationSummary && (
                  <p id="contact-form-errors" className="border-l-2 border-danger bg-danger/10 px-4 py-3 text-sm leading-6 text-foreground" role="alert">
                    {validationSummary}
                  </p>
                )}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div><label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">Full name <span className="text-primary">*</span></label><input id="name" type="text" {...register('name', { required: 'Please add your name.' })} aria-invalid={errors.name ? 'true' : 'false'} aria-describedby={errors.name ? 'name-error contact-form-errors' : undefined} className="w-full border border-line bg-background px-4 py-3 text-foreground" />{errors.name && <p id="name-error" className="mt-2 text-sm text-danger" role="alert">{errors.name.message}</p>}</div>
                  <div><label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">Email address <span className="text-primary">*</span></label><input id="email" type="email" {...register('email', { required: 'Please add your email.' })} aria-invalid={errors.email ? 'true' : 'false'} aria-describedby={errors.email ? 'email-error contact-form-errors' : undefined} className="w-full border border-line bg-background px-4 py-3 text-foreground" />{errors.email && <p id="email-error" className="mt-2 text-sm text-danger" role="alert">{errors.email.message}</p>}</div>
                  <div><label htmlFor="company" className="mb-2 block text-sm font-medium text-foreground">Company <span className="text-primary">*</span></label><input id="company" type="text" {...register('company', { required: 'Please add your company.' })} aria-invalid={errors.company ? 'true' : 'false'} aria-describedby={errors.company ? 'company-error contact-form-errors' : undefined} className="w-full border border-line bg-background px-4 py-3 text-foreground" />{errors.company && <p id="company-error" className="mt-2 text-sm text-danger" role="alert">{errors.company.message}</p>}</div>
                  <div><label htmlFor="phone" className="mb-2 block text-sm font-medium text-foreground">Phone number</label><input id="phone" type="tel" {...register('phone')} className="w-full border border-line bg-background px-4 py-3 text-foreground" /></div>
                  <div><label htmlFor="budget" className="mb-2 block text-sm font-medium text-foreground">Project budget <span className="text-primary">*</span></label><select id="budget" {...register('budget', { required: 'Please select a budget range.' })} aria-invalid={errors.budget ? 'true' : 'false'} aria-describedby={errors.budget ? 'budget-error contact-form-errors' : undefined} className="w-full border border-line bg-background px-4 py-3 text-foreground"><option value="">Select a range</option><option value="100-1k">AED100 – AED1000</option><option value="1k-5k">AED1000 – AED5000</option><option value="5k-10k">AED5000 – AED10,000</option><option value="10k+">AED10,000+</option></select>{errors.budget && <p id="budget-error" className="mt-2 text-sm text-danger" role="alert">{errors.budget.message}</p>}</div>
                  <div><label htmlFor="projectType" className="mb-2 block text-sm font-medium text-foreground">What needs attention? <span className="text-primary">*</span></label><select id="projectType" {...register('projectType', { required: 'Please select what needs attention.' })} aria-invalid={errors.projectType ? 'true' : 'false'} aria-describedby={errors.projectType ? 'project-type-error contact-form-errors' : undefined} className="w-full border border-line bg-background px-4 py-3 text-foreground"><option value="">Select an area</option><option value="web-development">Website</option><option value="mobile-app">Mobile product</option><option value="ecommerce">E-commerce</option><option value="marketing">Search and marketing</option><option value="consultation">Strategy</option></select>{errors.projectType && <p id="project-type-error" className="mt-2 text-sm text-danger" role="alert">{errors.projectType.message}</p>}</div>
                </div>
                <div><label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">What are you trying to change? <span className="text-primary">*</span></label><textarea id="message" rows={5} {...register('message', { required: 'Please share a little context.' })} aria-invalid={errors.message ? 'true' : 'false'} aria-describedby={errors.message ? 'message-error contact-form-errors' : undefined} className="w-full border border-line bg-background px-4 py-3 text-foreground" placeholder="Share the current baseline, the target, and what feels stuck." />{errors.message && <p id="message-error" className="mt-2 text-sm text-danger" role="alert">{errors.message.message}</p>}</div>
                {submitError && <p className="border-l-2 border-danger bg-danger/10 px-4 py-3 text-sm leading-6 text-foreground" role="alert">{submitError}</p>}
                <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50">{isSubmitting ? 'Sending your enquiry…' : 'Send enquiry'}</button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
