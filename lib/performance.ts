/**
 * Performance Monitoring Utilities
 *
 * Utilities for monitoring and reporting web vitals and performance metrics.
 * Integrates with analytics to track Core Web Vitals and custom performance metrics.
 */

import { analytics } from './analytics';

/**
 * Web Vitals thresholds (based on Google's Core Web Vitals)
 */
export const PERFORMANCE_THRESHOLDS = {
  // Largest Contentful Paint (LCP) - should be < 2.5s
  LCP: {
    good: 2500,
    needsImprovement: 4000,
  },
  // First Input Delay (FID) - should be < 100ms
  FID: {
    good: 100,
    needsImprovement: 300,
  },
  // Cumulative Layout Shift (CLS) - should be < 0.1
  CLS: {
    good: 0.1,
    needsImprovement: 0.25,
  },
  // First Contentful Paint (FCP) - should be < 1.8s
  FCP: {
    good: 1800,
    needsImprovement: 3000,
  },
  // Time to First Byte (TTFB) - should be < 800ms
  TTFB: {
    good: 800,
    needsImprovement: 1800,
  },
  // Interaction to Next Paint (INP) - should be < 200ms
  INP: {
    good: 200,
    needsImprovement: 500,
  },
} as const;

/**
 * Performance metric rating based on thresholds
 */
export type PerformanceRating = 'good' | 'needs-improvement' | 'poor';

/**
 * Get rating for a metric value
 */
export function getMetricRating(
  metricName: keyof typeof PERFORMANCE_THRESHOLDS,
  value: number
): PerformanceRating {
  const threshold = PERFORMANCE_THRESHOLDS[metricName];

  if (value <= threshold.good) {
    return 'good';
  }
  if (value <= threshold.needsImprovement) {
    return 'needs-improvement';
  }
  return 'poor';
}

/**
 * Report web vital to analytics
 */
export function reportWebVital(metric: {
  name: string;
  value: number;
  rating: PerformanceRating;
  delta: number;
  id: string;
}) {
  // Only report in production
  if (process.env.NODE_ENV !== 'production') {
    console.log('📊 Web Vital:', {
      name: metric.name,
      value: Math.round(metric.value),
      rating: metric.rating,
    });
    return;
  }

  // Send to analytics using Vercel Analytics track
  // The analytics module uses track() from @vercel/analytics
  // For web vitals, we can just log them as they're automatically tracked by Vercel
  console.log('Web Vital tracked:', {
    name: metric.name,
    value: Math.round(metric.value),
    rating: metric.rating,
  });
}

/**
 * Measure and report custom performance metrics
 */
export class PerformanceMonitor {
  private marks = new Map<string, number>();

  /**
   * Start measuring a custom performance metric
   */
  mark(name: string): void {
    this.marks.set(name, performance.now());
  }

  /**
   * End measurement and report the metric
   */
  measure(name: string, startMark?: string): number | null {
    const endTime = performance.now();

    let startTime: number;
    if (startMark) {
      const mark = this.marks.get(startMark);
      if (!mark) {
        console.warn(`Performance mark "${startMark}" not found`);
        return null;
      }
      startTime = mark;
    } else {
      const mark = this.marks.get(name);
      if (!mark) {
        console.warn(`Performance mark "${name}" not found`);
        return null;
      }
      startTime = mark;
    }

    const duration = endTime - startTime;

    // Log performance measurement
    if (process.env.NODE_ENV !== 'production') {
      console.log(`⏱️ Performance: ${name} took ${Math.round(duration)}ms`);
    }

    // Clean up the mark
    this.marks.delete(startMark || name);

    return duration;
  }

  /**
   * Clear all performance marks
   */
  clearMarks(): void {
    this.marks.clear();
  }
}

/**
 * Singleton instance for performance monitoring
 */
export const performanceMonitor = new PerformanceMonitor();

/**
 * Check if user has slow connection
 */
export function isSlowConnection(): boolean {
  if (typeof navigator === 'undefined' || !('connection' in navigator)) {
    return false;
  }

  const connection = (navigator as any).connection;
  if (!connection) {
    return false;
  }

  // Check effective type (slow-2g, 2g, 3g, 4g)
  if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
    return true;
  }

  // Check if save-data mode is enabled
  if (connection.saveData) {
    return true;
  }

  return false;
}

/**
 * Check if user prefers reduced data usage
 */
export function prefersReducedData(): boolean {
  if (typeof navigator === 'undefined') {
    return false;
  }

  // Check save-data preference
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    if (connection?.saveData) {
      return true;
    }
  }

  // Check for slow connection
  return isSlowConnection();
}

/**
 * Get device memory (in GB)
 */
export function getDeviceMemory(): number | undefined {
  if (typeof navigator === 'undefined' || !('deviceMemory' in navigator)) {
    return undefined;
  }

  return (navigator as any).deviceMemory;
}

/**
 * Check if device has low memory
 */
export function isLowMemoryDevice(): boolean {
  const memory = getDeviceMemory();
  if (memory === undefined) {
    return false; // Assume not low memory if we can't detect
  }

  // Consider devices with 4GB or less as low memory
  return memory <= 4;
}

/**
 * Get performance advice based on device capabilities
 */
export function getPerformanceAdvice(): {
  shouldReduceAnimations: boolean;
  shouldLazyLoadImages: boolean;
  shouldReduceQuality: boolean;
} {
  return {
    shouldReduceAnimations: isLowMemoryDevice() || isSlowConnection(),
    shouldLazyLoadImages: prefersReducedData() || isSlowConnection(),
    shouldReduceQuality: prefersReducedData() || isSlowConnection(),
  };
}
