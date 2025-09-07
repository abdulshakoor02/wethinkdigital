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

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        reset();
      } else {
        const errorData = await response.json();
        console.error('Error sending email:', errorData.error);
        // You might want to show an error message to the user here
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsSubmitting(false);
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 25% 85%, rgba(168, 85, 247, 0.35) 0%, transparent 50%),
          radial-gradient(circle at 75% 15%, rgba(236, 72, 153, 0.35) 0%, transparent 50%),
          radial-gradient(circle at 45% 45%, rgba(139, 92, 246, 0.25) 0%, transparent 50%),
          linear-gradient(135deg, #0f1129 0%, #1a1b3b 25%, #2d1b69 50%, #4c1d95 100%)
        `
      }}
    >
      {/* Glassmorphism Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-violet-800/15 to-fuchsia-900/20" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-block px-4 py-2 rounded-full text-sm font-medium text-white/90 mb-6"
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(15px) saturate(120%)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 10px 20px rgba(139, 92, 246, 0.3)'
            }}
          >
            Contact Us
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Let&apos;s Build Your Empire
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            You&apos;ve see the proof.You know what we can do.Now it&apos;s your turn.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="rounded-3xl shadow-2xl p-8 md:p-12"
          style={{
            background: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(20px) saturate(150%)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 25px 45px rgba(139, 92, 246, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1) inset'
          }}
        >
          {submitSuccess ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-3xl font-bold mb-4 text-white">Thank You!</h3>
              <p className="text-xl text-gray-300 mb-6">
                Your message has been sent successfully. We&apos;ll get back to you within 24 hours.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setSubmitSuccess(false)}
                className="px-6 py-3 font-semibold text-white rounded-full transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.8) 0%, rgba(236, 72, 153, 0.6) 100%)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 10px 30px rgba(139, 92, 246, 0.4)'
                }}
              >
                Send Another Message
              </motion.button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <input
                    type="text"
                    {...register('name', { required: 'Name is required' })}
                    className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white/40 text-lg transition-all duration-300"
                    placeholder="Full Name"
                  />
                  {errors.name && <span className="text-red-300 text-sm mt-2 block">{errors.name.message}</span>}
                </div>

                <div>
                  <input
                    type="text"
                    {...register('email', { required: 'email is required' })}
                    className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white/40 text-lg transition-all duration-300"
                    placeholder="email address"
                  />
                  {errors.email && <span className="text-red-300 text-sm mt-2 block">{errors.email.message}</span>}
                </div>

                <div>
                  <input
                    type="text"
                    {...register('company', { required: 'Company Name is required' })}
                    className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white/40 text-lg transition-all duration-300"
                    placeholder="Company Name"
                  />
                  {errors.company && <span className="text-red-300 text-sm mt-2 block">{errors.company.message}</span>}
                </div>

                <div>
                  <input
                    type="text"
                    {...register('phone', { required: 'Phone is required' })}
                    className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white/40 text-lg transition-all duration-300"
                    placeholder="phone e.g +971 (58) 1233-567"
                  />
                  {errors.phone && <span className="text-red-300 text-sm mt-2 block">{errors.phone.message}</span>}
                </div>

                <div>
                  <select
                    {...register('projectType', { required: 'Project type is required' })}
                    className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white/40 text-lg transition-all duration-300"
                  >
                    <option value="" selected>Select Project Type</option>
                    <option value="web-development">Web Development</option>
                    <option value="mobile-app">Mobile App</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="marketing">Digital Marketing</option>
                    <option value="consultation">Strategy Consultation</option>
                  </select>
                  {errors.projectType && <span className="text-red-400 text-sm">{errors.projectType.message}</span>}
                </div>

                <div>
                  <select
                    {...register('budget', { required: 'Budget is required' })}
                    className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white/40 text-lg transition-all duration-300"
                  >
                    <option value="">Select Budget Range</option>
                    <option value="100-1k">AED100 - AED1000</option>
                    <option value="1k-5k">AED1000 - AED5000</option>
                    <option value="5k-10k">AED5000 - AED10,000</option>
                    <option value="10k+">AED10,000+</option>
                  </select>
                  {errors.budget && <span className="text-red-400 text-sm">{errors.budget.message}</span>}
                </div>
              </div>

              <div>
                <textarea
                  {...register('message', { required: 'Project Details are required' })}
                  rows={4}
                  className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white/40 text-lg transition-all duration-300 resize-none"
                  placeholder="Project Details"
                />
                {errors.message && <span className="text-red-300 text-sm mt-2 block">{errors.message.message}</span>}
              </div>

              <div className="pt-6">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-12 py-4 rounded-full font-semibold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-white"
                  style={{
                    background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.8) 0%, rgba(236, 72, 153, 0.6) 100%)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 10px 30px rgba(139, 92, 246, 0.4)'
                  }}
                >
                  {isSubmitting ? 'Submiting...' : 'Submit'}
                </motion.button>
              </div>
            </form>
          )}
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 grid md:grid-cols-3 gap-8 text-center"
        >
          <div className="rounded-2xl p-8 transition-all duration-300"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(15px) saturate(120%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 15px 35px rgba(139, 92, 246, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.06) inset'
            }}
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-2xl"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              📧
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Email Us</h3>
            <p className="text-white/80">info@wethinkdigital.solutions</p>
          </div>

          <div className="rounded-2xl p-8 transition-all duration-300"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(15px) saturate(120%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 15px 35px rgba(139, 92, 246, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.06) inset'
            }}
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-2xl"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              📱
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Call Us</h3>
            <p className="text-white/80">+971 (564) 713-394</p>
          </div>

          <div className="rounded-2xl p-8 transition-all duration-300"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(15px) saturate(120%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 15px 35px rgba(139, 92, 246, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.06) inset'
            }}
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-2xl"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              📍
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Visit Us</h3>
            <p className="text-white/80">Dubai, UAE</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
