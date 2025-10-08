'use client';

import { useEffect } from 'react';
import { analytics } from '@/lib/analytics';

interface ProjectPageTrackerProps {
  projectSlug: string;
  projectTitle: string;
}

/**
 * Client component to track project page views
 * Separated from the main page component to keep it as a Server Component
 */
export function ProjectPageTracker({ projectSlug, projectTitle }: ProjectPageTrackerProps) {
  useEffect(() => {
    // Track page view when component mounts
    analytics.trackPageView(`/projects/${projectSlug}`, projectTitle);
  }, [projectSlug, projectTitle]);

  return null; // This component doesn't render anything
}
