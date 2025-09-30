/**
 * Analytics tracking utilities
 * Track key user interactions for portfolio analytics
 */

export type AnalyticsEvent =
  | 'book_intro_click'
  | 'email_click'
  | 'cv_download'
  | 'repo_click'
  | 'live_demo_click'
  | 'case_study_view'
  | 'project_filter_used';

interface EventProperties {
  [key: string]: string | number | boolean;
}

/**
 * Track a custom event
 * @param event - The event name
 * @param properties - Optional event properties
 */
export function trackEvent(event: AnalyticsEvent, properties?: EventProperties): void {
  // TODO: Implement analytics tracking (Vercel Analytics or GA4)
  if (process.env.NODE_ENV === 'development') {
    console.log('Analytics Event:', event, properties);
  }

  // Example implementation for Vercel Analytics:
  // import { track } from '@vercel/analytics';
  // track(event, properties);
}

/**
 * Track a page view
 * @param page - The page path
 */
export function trackPageView(page: string): void {
  // TODO: Implement page view tracking
  if (process.env.NODE_ENV === 'development') {
    console.log('Page View:', page);
  }
}
