import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { ProjectsPageClient } from './ProjectsPageClient';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Projects',
  description:
    'A collection of web development projects showcasing skills in education technology, accessibility, and modern web frameworks. Explore interactive learning platforms, analytics dashboards, and accessible course builders.',
  path: '/projects',
});

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
