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
    <section id="contact" className="relative py-24 bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-blue-600/5 to-purple-600/10" />
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-sm font-medium text-white/90 mb-6">
            lange & fuchs
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Make the First Step and We Will Follow
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Describe your concerns to us and we will get back to you within 48 hours.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 md:p-12"
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
                className="btn-primary px-6 py-3"
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
                    placeholder="Name"
                  />
                  {errors.name && <span className="text-red-300 text-sm mt-2 block">{errors.name.message}</span>}
                </div>

                <div>
                  <input
                    type="text"
                    {...register('company', { required: 'Company is required' })}
                    className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white/40 text-lg transition-all duration-300"
                    placeholder="Vorname"
                  />
                  {errors.company && <span className="text-red-300 text-sm mt-2 block">{errors.company.message}</span>}
                </div>

                <div className="md:col-span-2">
                  <input
                    type="tel"
                    {...register('phone')}
                    className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white/40 text-lg transition-all duration-300"
                    placeholder="Telefonnummer"
                  />
                </div>

                <div className="md:col-span-2">
                  <input
                    type="email"
                    {...register('email', { required: 'Email is required' })}
                    className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white/40 text-lg transition-all duration-300"
                    placeholder="Email Address"
                  />
                  {errors.email && <span className="text-red-300 text-sm mt-2 block">{errors.email.message}</span>}
                </div>
              </div>

              <div>
                <textarea
                  {...register('message', { required: 'Your concerns are required' })}
                  rows={4}
                  className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-white/40 text-lg transition-all duration-300 resize-none"
                  placeholder="Ihr Anliegen"
                />
                {errors.message && <span className="text-red-300 text-sm mt-2 block">{errors.message.message}</span>}
              </div>

              <div className="hidden">
                <select {...register('budget')} className="hidden">
                  <option value="consultation">Consultation</option>
                </select>
                <select {...register('projectType')} className="hidden">
                  <option value="consultation">General Inquiry</option>
                </select>
              </div>

              <div className="pt-6">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white text-blue-900 px-12 py-4 rounded-full font-semibold text-lg hover:bg-white/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {isSubmitting ? 'Absenden...' : 'Absenden'}
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
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 hover:bg-white/15 transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">
              📧
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Email Us</h3>
            <p className="text-white/80">info@wethinkdigital.solutions</p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 hover:bg-white/15 transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">
              📱
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Call Us</h3>
            <p className="text-white/80">+971 (564) 713-394</p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 hover:bg-white/15 transition-all duration-300">
            <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">
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
