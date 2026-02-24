'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

interface FormData {
    name: string;
    email: string;
    company: string;
    phone: string;
    budget: string;
    projectType: string;
    message: string;
}

export default function AutoContactModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

    useEffect(() => {
        // Open modal after 2 seconds
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 2000);

        // Listen for custom event to open modal
        const handleOpenModal = () => setIsOpen(true);
        window.addEventListener('openContactModal', handleOpenModal);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('openContactModal', handleOpenModal);
        };
    }, []);

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
                // Close modal after success message
                setTimeout(() => {
                    setIsOpen(false);
                    setSubmitSuccess(false);
                }, 3000);
            } else {
                const errorData = await response.json();
                console.error('Error sending email:', errorData.error);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-2xl bg-[#1e1e20] rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 p-2 rounded-full bg-[#27272a] hover:bg-gray-600 transition-colors z-10"
                        >
                            <FiX className="w-6 h-6 text-gray-300" />
                        </button>

                        <div className="p-8 md:p-10">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-gray-200 mb-2">Let's Discuss Your Project</h2>
                                <p className="text-gray-400">Fill out the form below and we'll get back to you shortly.</p>
                            </div>

                            {submitSuccess ? (
                                <div className="text-center py-12">
                                    <div className="text-6xl mb-4">🎉</div>
                                    <h3 className="text-2xl font-bold mb-4 text-gray-200">Thank You!</h3>
                                    <p className="text-gray-400">
                                        Your message has been sent successfully. We'll be in touch soon.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <input
                                                type="text"
                                                {...register('name', { required: 'Name is required' })}
                                                className="w-full px-4 py-3 bg-[#18191a] border border-gray-600 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-500 transition-all"
                                                placeholder="Full Name"
                                            />
                                            {errors.name && <span className="text-red-400 text-xs mt-1 block">{errors.name.message}</span>}
                                        </div>

                                        <div>
                                            <input
                                                type="email"
                                                {...register('email', { required: 'Email is required' })}
                                                className="w-full px-4 py-3 bg-[#18191a] border border-gray-600 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-500 transition-all"
                                                placeholder="Email Address"
                                            />
                                            {errors.email && <span className="text-red-400 text-xs mt-1 block">{errors.email.message}</span>}
                                        </div>

                                        <div>
                                            <input
                                                type="text"
                                                {...register('company', { required: 'Company Name is required' })}
                                                className="w-full px-4 py-3 bg-[#18191a] border border-gray-600 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-500 transition-all"
                                                placeholder="Company Name"
                                            />
                                            {errors.company && <span className="text-red-400 text-xs mt-1 block">{errors.company.message}</span>}
                                        </div>

                                        <div>
                                            <input
                                                type="text"
                                                {...register('phone', { required: 'Phone is required' })}
                                                className="w-full px-4 py-3 bg-[#18191a] border border-gray-600 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-500 transition-all"
                                                placeholder="Phone Number"
                                            />
                                            {errors.phone && <span className="text-red-400 text-xs mt-1 block">{errors.phone.message}</span>}
                                        </div>

                                        <div>
                                            <select
                                                {...register('projectType', { required: 'Project type is required' })}
                                                className="w-full px-4 py-3 bg-[#18191a] border border-gray-600 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-500 transition-all"
                                                defaultValue=""
                                            >
                                                <option value="">Select Project Type</option>
                                                <option value="crm-implementation">CRM Implementation</option>
                                                <option value="cloud-crm">Cloud CRM Setup</option>
                                                <option value="sales-automation">Sales Automation</option>
                                                <option value="marketing-automation">Marketing Automation</option>
                                                <option value="crm-integration">CRM Integration</option>
                                                <option value="consultation">Free Consultation</option>
                                            </select>
                                            {errors.projectType && <span className="text-red-400 text-xs mt-1 block">{errors.projectType.message}</span>}
                                        </div>

                                        <div>
                                            <select
                                                {...register('budget', { required: 'Budget is required' })}
                                                className="w-full px-4 py-3 bg-[#18191a] border border-gray-600 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-500 transition-all"
                                                defaultValue=""
                                            >
                                                <option value="">Select Budget Range</option>
                                                <option value="100-1k">AED100 - AED1000</option>
                                                <option value="1k-5k">AED1000 - AED5000</option>
                                                <option value="5k-10k">AED5000 - AED10,000</option>
                                                <option value="10k+">AED10,000+</option>
                                            </select>
                                            {errors.budget && <span className="text-red-400 text-xs mt-1 block">{errors.budget.message}</span>}
                                        </div>
                                    </div>

                                    <div>
                                        <textarea
                                            {...register('message', { required: 'Project Details are required' })}
                                            rows={4}
                                            className="w-full px-4 py-3 bg-[#18191a] border border-gray-600 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-500 transition-all resize-none"
                                            placeholder="Tell us about your project..."
                                        />
                                        {errors.message && <span className="text-red-400 text-xs mt-1 block">{errors.message.message}</span>}
                                    </div>

                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-4 rounded-xl font-bold text-white text-lg shadow-lg shadow-gray-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        style={{
                                            background: 'linear-gradient(135deg, #9333ea 0%, #db2777 100%)',
                                        }}
                                    >
                                        {isSubmitting ? 'Sending...' : 'Send Message'}
                                    </motion.button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
