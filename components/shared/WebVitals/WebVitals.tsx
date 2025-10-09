'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { reportWebVital } from '@/lib/performance';

/**
 * Web Vitals Reporter Component
 *
 * Automatically reports Core Web Vitals metrics to analytics.
 * Place this component in the root layout to enable monitoring.
 *
 * Metrics tracked:
 * - LCP (Largest Contentful Paint)
 * - FID (First Input Delay)
 * - CLS (Cumulative Layout Shift)
 * - FCP (First Contentful Paint)
 * - TTFB (Time to First Byte)
 * - INP (Interaction to Next Paint)
 */
export function WebVitals() {
  useReportWebVitals((metric) => {
    reportWebVital(metric);
  });

  return null;
}
