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
    <section id="calculator" className="py-24 bg-slate-900/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Calculate Your Potential ROI</span>
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
            className="glass rounded-xl p-8"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Monthly Website Traffic
                </label>
                <input
                  type="number"
                  {...register('monthlyTraffic', { min: 100, max: 10000000 })}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-primary"
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
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-primary"
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
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-primary"
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
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-primary"
                  placeholder="5.0"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-primary py-3 text-lg"
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
              <div className="glass rounded-xl p-8">
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
                    className="w-full btn-primary py-3"
                  >
                    Schedule Free Strategy Call
                  </motion.button>
                </div>
              </div>
            ) : (
              <div className="glass rounded-xl p-8 text-center">
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
              <div className="glass rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary">
                  {Math.round(watchedValues.monthlyTraffic * watchedValues.conversionRate / 100)}
                </div>
                <p className="text-sm text-gray-400">Monthly Conversions</p>
              </div>
              
              <div className="glass rounded-lg p-4 text-center">
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