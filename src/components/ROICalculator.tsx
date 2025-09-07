'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

interface FormData {
  monthlyTraffic: number;
  conversionRate: number;
  averageOrderValue: number;
  targetConversionRate: number;
}

interface ROIResults {
  currentRevenue: number;
  targetRevenue: number;
  potentialIncrease: number;
  percentageIncrease: number;
}

export default function ROICalculator() {
  const [results, setResults] = useState<ROIResults | null>(null);
  const [showResults, setShowResults] = useState(false);
  
  const { register, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      monthlyTraffic: 10000,
      conversionRate: 2,
      averageOrderValue: 100,
      targetConversionRate: 4
    }
  });

  const onSubmit = (data: FormData) => {
    const currentRevenue = (data.monthlyTraffic * data.conversionRate / 100) * data.averageOrderValue;
    const targetRevenue = (data.monthlyTraffic * data.targetConversionRate / 100) * data.averageOrderValue;
    const potentialIncrease = targetRevenue - currentRevenue;
    const percentageIncrease = ((potentialIncrease / currentRevenue) * 100);

    setResults({
      currentRevenue,
      targetRevenue,
      potentialIncrease,
      percentageIncrease
    });
    setShowResults(true);
  };

  const watchedValues = watch();

  return (
    <section id="calculator" className="py-24 relative overflow-hidden"
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6"
            style={{
              background: 'linear-gradient(90deg, #ffffff 0%, #f0abfc 25%, #a78bfa 50%, #60a5fa 75%, #ffffff 100%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Calculate Your Potential ROI
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            See exactly how much revenue we can help you generate with data-driven improvements.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Calculator Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="rounded-xl p-8"
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(20px) saturate(150%)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 20px 40px rgba(139, 92, 246, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.08) inset'
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Monthly Website Traffic
                </label>
                <input
                  type="number"
                  {...register('monthlyTraffic', { min: 100, max: 10000000 })}
                  className="w-full px-4 py-3 rounded-lg text-white focus:outline-none transition-all duration-300"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)'
                  }}
                  placeholder="10,000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Current Conversion Rate (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  {...register('conversionRate', { min: 0.1, max: 100 })}
                  className="w-full px-4 py-3 rounded-lg text-white focus:outline-none transition-all duration-300"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)'
                  }}
                  placeholder="2.5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Average Order Value ($)
                </label>
                <input
                  type="number"
                  {...register('averageOrderValue', { min: 1, max: 10000 })}
                  className="w-full px-4 py-3 rounded-lg text-white focus:outline-none transition-all duration-300"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)'
                  }}
                  placeholder="150"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Target Conversion Rate (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  {...register('targetConversionRate', { min: 0.1, max: 100 })}
                  className="w-full px-4 py-3 rounded-lg text-white focus:outline-none transition-all duration-300"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)'
                  }}
                  placeholder="5.0"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 text-lg font-semibold text-white rounded-full transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.8) 0%, rgba(236, 72, 153, 0.6) 100%)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 10px 30px rgba(139, 92, 246, 0.4)'
                }}
              >
                Calculate My ROI
              </button>
            </form>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {results && showResults ? (
              <div className="rounded-xl p-8"
                style={{
                  background: 'rgba(255, 255, 255, 0.12)',
                  backdropFilter: 'blur(20px) saturate(150%)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 20px 40px rgba(139, 92, 246, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.08) inset'
                }}
              >
                <h3 className="text-2xl font-bold mb-6 text-center">Your ROI Projection</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Current Monthly Revenue:</span>
                    <span className="text-2xl font-bold text-white">${results.currentRevenue.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Potential Monthly Revenue:</span>
                    <span className="text-2xl font-bold text-green-400">${results.targetRevenue.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Monthly Increase:</span>
                    <span className="text-2xl font-bold text-primary">${results.potentialIncrease.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Percentage Increase:</span>
                    <span className="text-2xl font-bold text-accent">{results.percentageIncrease.toFixed(1)}%</span>
                  </div>
                </div>

                <div className="mt-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-3 font-semibold text-white rounded-full transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.8) 0%, rgba(236, 72, 153, 0.6) 100%)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: '0 10px 30px rgba(139, 92, 246, 0.4)'
                    }}
                  >
                    Schedule Free Strategy Call
                  </motion.button>
                </div>
              </div>
            ) : (
              <div className="rounded-xl p-8 text-center"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(15px) saturate(120%)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 15px 35px rgba(139, 92, 246, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.06) inset'
                }}
              >
                <div className="text-6xl mb-4">💡</div>
                <h3 className="text-2xl font-bold mb-4">Ready to See Your Potential?</h3>
                <p className="text-gray-300">
                  Fill in your details to get an instant ROI projection and discover how much 
                  additional revenue we can help you generate.
                </p>
              </div>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="rounded-lg p-4 text-center"
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  backdropFilter: 'blur(12px) saturate(100%)',
                  border: '0.5px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 10px 30px rgba(139, 92, 246, 0.05), 0 0 0 1px rgba(255, 255, 255, 0.04) inset'
                }}
              >
                <div className="text-2xl font-bold text-primary">
                  {Math.round(watchedValues.monthlyTraffic * watchedValues.conversionRate / 100)}
                </div>
                <p className="text-sm text-gray-400">Monthly Conversions</p>
              </div>
              
              <div className="rounded-lg p-4 text-center"
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  backdropFilter: 'blur(12px) saturate(100%)',
                  border: '0.5px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 10px 30px rgba(139, 92, 246, 0.05), 0 0 0 1px rgba(255, 255, 255, 0.04) inset'
                }}
              >
                <div className="text-2xl font-bold text-accent">
                  ${Math.round(watchedValues.monthlyTraffic * watchedValues.conversionRate / 100 * watchedValues.averageOrderValue).toLocaleString()}
                </div>
                <p className="text-sm text-gray-400">Current Revenue</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}