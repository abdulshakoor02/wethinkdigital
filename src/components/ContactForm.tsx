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
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form submitted:', data);
    setSubmitSuccess(true);
    reset();
    setIsSubmitting(false);
    
    // Reset success message after 5 seconds
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  return (
    <section id="contact" className="py-24 bg-slate-900/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Let's Build Something Amazing</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to transform your business? Get in touch with our team of experts today.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass rounded-xl p-8 md:p-12"
        >
          {submitSuccess ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-3xl font-bold mb-4 text-white">Thank You!</h3>
              <p className="text-xl text-gray-300 mb-6">
                Your message has been sent successfully. We'll get back to you within 24 hours.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setSubmitSuccess(false)}
                className="btn-primary px-6 py-3"
              >
                Send Another Message
              </motion.button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                  <input
                    type="text"
                    {...register('name', { required: 'Name is required' })}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-primary"
                    placeholder="John Doe"
                  />
                  {errors.name && <span className="text-red-400 text-sm">{errors.name.message}</span>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                  <input
                    type="email"
                    {...register('email', { required: 'Email is required' })}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-primary"
                    placeholder="john@company.com"
                  />
                  {errors.email && <span className="text-red-400 text-sm">{errors.email.message}</span>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Company Name *</label>
                  <input
                    type="text"
                    {...register('company', { required: 'Company is required' })}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-primary"
                    placeholder="Your Company"
                  />
                  {errors.company && <span className="text-red-400 text-sm">{errors.company.message}</span>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    {...register('phone')}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-primary"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Project Budget *</label>
                  <select
                    {...register('budget', { required: 'Budget is required' })}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-primary"
                  >
                    <option value="">Select Budget Range</option>
                    <option value="10k-25k">$10,000 - $25,000</option>
                    <option value="25k-50k">$25,000 - $50,000</option>
                    <option value="50k-100k">$50,000 - $100,000</option>
                    <option value="100k+">$100,000+</option>
                  </select>
                  {errors.budget && <span className="text-red-400 text-sm">{errors.budget.message}</span>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Project Type *</label>
                  <select
                    {...register('projectType', { required: 'Project type is required' })}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-primary"
                  >
                    <option value="">Select Project Type</option>
                    <option value="web-development">Web Development</option>
                    <option value="mobile-app">Mobile App</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="marketing">Digital Marketing</option>
                    <option value="consultation">Strategy Consultation</option>
                  </select>
                  {errors.projectType && <span className="text-red-400 text-sm">{errors.projectType.message}</span>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Project Details *</label>
                <textarea
                  {...register('message', { required: 'Project details are required' })}
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-primary"
                  placeholder="Tell us about your project goals, timeline, and any specific requirements..."
                />
                {errors.message && <span className="text-red-400 text-sm">{errors.message.message}</span>}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          )}
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 grid md:grid-cols-3 gap-8 text-center"
        >
          <div className="glass rounded-lg p-6">
            <div className="text-3xl mb-4">📧</div>
            <h3 className="text-xl font-bold mb-2">Email Us</h3>
            <p className="text-gray-300">hello@wethinkdigital.com</p>
          </div>

          <div className="glass rounded-lg p-6">
            <div className="text-3xl mb-4">📱</div>
            <h3 className="text-xl font-bold mb-2">Call Us</h3>
            <p className="text-gray-300">+1 (555) 123-4567</p>
          </div>

          <div className="glass rounded-lg p-6">
            <div className="text-3xl mb-4">📍</div>
            <h3 className="text-xl font-bold mb-2">Visit Us</h3>
            <p className="text-gray-300">San Francisco, CA</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}