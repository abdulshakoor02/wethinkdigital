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
  const { register, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      monthlyTraffic: 10000,
      conversionRate: 2,
      averageOrderValue: 100,
      targetConversionRate: 4,
    },
  });

  const onSubmit = (data: FormData) => {
    const currentRevenue = (data.monthlyTraffic * data.conversionRate / 100) * data.averageOrderValue;
    const targetRevenue = (data.monthlyTraffic * data.targetConversionRate / 100) * data.averageOrderValue;
    const potentialIncrease = targetRevenue - currentRevenue;
    const percentageIncrease = currentRevenue ? (potentialIncrease / currentRevenue) * 100 : 0;

    setResults({ currentRevenue, targetRevenue, potentialIncrease, percentageIncrease });
  };

  const watchedValues = watch();
  const currentConversions = Math.round(Number(watchedValues.monthlyTraffic) * Number(watchedValues.conversionRate) / 100);
  const watchedRevenue = Math.round(currentConversions * Number(watchedValues.averageOrderValue));

  return (
    <section id="calculator" className="bg-background-muted py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.24em] text-primary">A useful baseline</p>
            <h2 className="text-4xl font-bold leading-tight tracking-[-0.05em] text-foreground sm:text-6xl">Put a number against the upside.</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">Use your current traffic, conversion rate, and order value to see what a focused improvement could be worth each month.</p>
            <p className="mt-8 border-l-2 border-primary pl-5 text-sm leading-6 text-muted">This is a directional model, not a forecast. The value is in making the assumptions visible enough to discuss.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="surface p-6 sm:p-9"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="monthlyTraffic" className="mb-2 block text-sm font-medium text-foreground">Monthly website traffic</label>
                <input id="monthlyTraffic" type="number" {...register('monthlyTraffic', { min: 100, max: 10000000 })} className="w-full border border-line bg-background px-4 py-3 text-foreground" />
              </div>
              <div>
                <label htmlFor="conversionRate" className="mb-2 block text-sm font-medium text-foreground">Current conversion rate (%)</label>
                <input id="conversionRate" type="number" step="0.1" {...register('conversionRate', { min: 0.1, max: 100 })} className="w-full border border-line bg-background px-4 py-3 text-foreground" />
              </div>
              <div>
                <label htmlFor="averageOrderValue" className="mb-2 block text-sm font-medium text-foreground">Average order value ($)</label>
                <input id="averageOrderValue" type="number" {...register('averageOrderValue', { min: 1, max: 10000 })} className="w-full border border-line bg-background px-4 py-3 text-foreground" />
              </div>
              <div>
                <label htmlFor="targetConversionRate" className="mb-2 block text-sm font-medium text-foreground">Target conversion rate (%)</label>
                <input id="targetConversionRate" type="number" step="0.1" {...register('targetConversionRate', { min: 0.1, max: 100 })} className="w-full border border-line bg-background px-4 py-3 text-foreground" />
              </div>
              <button type="submit" className="btn-primary sm:col-span-2">Calculate the monthly upside</button>
            </form>

            <div className="mt-8 border-t border-line pt-6">
              {results ? (
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Directional projection</p>
                  <div className="mt-6 divide-y divide-line border-y border-line">
                    <div className="flex items-baseline justify-between gap-4 py-4"><span className="text-sm text-muted">Current monthly revenue</span><span className="text-xl font-bold text-foreground">${results.currentRevenue.toLocaleString()}</span></div>
                    <div className="flex items-baseline justify-between gap-4 py-4"><span className="text-sm text-muted">Potential monthly revenue</span><span className="text-xl font-bold text-foreground">${results.targetRevenue.toLocaleString()}</span></div>
                    <div className="flex items-baseline justify-between gap-4 py-4"><span className="text-sm text-muted">Potential increase</span><span className="text-xl font-bold text-primary">${results.potentialIncrease.toLocaleString()} ({results.percentageIncrease.toFixed(1)}%)</span></div>
                  </div>
                  <button type="button" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="btn-secondary mt-6">Talk through the assumptions</button>
                </div>
              ) : (
                <div className="border border-dashed border-line p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Live baseline</p>
                  <p className="mt-4 text-lg leading-7 text-foreground">{currentConversions.toLocaleString()} monthly conversions at the current inputs.</p>
                  <p className="mt-2 text-sm leading-6 text-muted">That is approximately ${watchedRevenue.toLocaleString()} in current monthly revenue.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
