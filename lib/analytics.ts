import { track } from '@vercel/analytics';

export type AnalyticsEvent =
  | 'book_intro_click'
  | 'email_click'
  | 'cv_download'
  | 'github_click'
  | 'linkedin_click'
  | 'repo_click'
  | 'live_demo_click'
  | 'case_study_click'
  | 'project_filter_used'
  | 'project_search_used'
  | 'external_link_click';

interface EventProperties {
  [key: string]: string | number | boolean;
}

/**
 * Check if analytics is enabled (not in development mode)
 */
function isAnalyticsEnabled(): boolean {
  return process.env.NODE_ENV === 'production';
}

/**
 * Track a custom event
 * @param event - The event name
 * @param properties - Optional event properties
 */
export function trackEvent(event: AnalyticsEvent, properties?: EventProperties): void {
  // Console log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics Event:', event, properties);
  }

  if (!isAnalyticsEnabled()) {
    return;
  }

  // Vercel Analytics
  // Uncomment when @vercel/analytics is installed:

  track(event, properties);

  // Google Analytics 4 (if gtag is available)
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as any).gtag('event', event, properties);
  }

  // Custom analytics endpoint (optional)
  // You can send events to your own analytics API here
}

/**
 * Track a page view
 * @param page - The page path
 * @param title - Optional page title
 */
export function trackPageView(page: string, title?: string): void {
  if (process.env.NODE_ENV === 'development') {
    console.log('📄 Page View:', page, title);
  }

  if (!isAnalyticsEnabled()) {
    return;
  }

  // Google Analytics 4
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
      page_path: page,
      page_title: title,
    });
  }
}

/**
 * Helper functions for common tracking events
 */

export const analytics = {
  /**
   * Track "Book Intro" CTA click
   */
  trackBookIntroClick: (location: 'hero' | 'footer' = 'hero') => {
    trackEvent('book_intro_click', { location });
  },

  /**
   * Track email link click
   */
  trackEmailClick: (location: 'hero' | 'footer' = 'footer') => {
    trackEvent('email_click', { location });
  },

  /**
   * Track CV download
   */
  trackCVDownload: (location: 'hero' | 'footer' = 'footer') => {
    trackEvent('cv_download', { location });
  },

  /**
   * Track GitHub profile click
   */
  trackGitHubClick: (location: 'footer' | 'social-proof' = 'footer') => {
    trackEvent('github_click', { location });
  },

  /**
   * Track LinkedIn profile click
   */
  trackLinkedInClick: (location: 'footer' = 'footer') => {
    trackEvent('linkedin_click', { location });
  },

  /**
   * Track project repository link click
   */
  trackRepoClick: (projectSlug: string, projectTitle: string) => {
    trackEvent('repo_click', {
      project_slug: projectSlug,
      project_title: projectTitle,
    });
  },

  /**
   * Track live demo link click
   */
  trackLiveDemoClick: (projectSlug: string, projectTitle: string) => {
    trackEvent('live_demo_click', {
      project_slug: projectSlug,
      project_title: projectTitle,
    });
  },

  /**
   * Track case study link click
   */
  trackCaseStudyClick: (
    projectSlug: string,
    projectTitle: string,
    location: 'home' | 'projects'
  ) => {
    trackEvent('case_study_click', {
      project_slug: projectSlug,
      project_title: projectTitle,
      location,
    });
  },

  /**
   * Track project filter usage
   */
  trackProjectFilterUsed: (filterType: 'tech-stack' | 'search', filterValue: string) => {
    trackEvent('project_filter_used', {
      filter_type: filterType,
      filter_value: filterValue,
    });
  },

  /**
   * Track project search usage
   */
  trackProjectSearchUsed: (searchQuery: string, resultsCount: number) => {
    trackEvent('project_search_used', {
      search_query: searchQuery,
      results_count: resultsCount,
    });
  },

  /**
   * Track external link click
   */
  trackExternalLinkClick: (url: string, linkText: string) => {
    trackEvent('external_link_click', {
      url,
      link_text: linkText,
    });
  },

  /**
   * Track page view
   */
  trackPageView: (page: string, title?: string) => {
    trackPageView(page, title);
  },
};
