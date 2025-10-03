import { Suspense } from 'react';
import { Metadata } from 'next';
import { Container, Skeleton, Stack } from '@mantine/core';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { ProjectsPageClient } from './ProjectsPageClient';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Projects',
  description:
    'A collection of web development projects showcasing skills in education technology, accessibility, and modern web frameworks. Explore interactive learning platforms, analytics dashboards, and accessible course builders.',
  path: '/projects',
});

function ProjectsPageLoading() {
  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <Stack gap="md" align="center" ta="center">
          <Skeleton height={40} width={200} />
          <Skeleton height={20} width={400} />
        </Stack>
        <Stack gap="lg">
          <Skeleton height={40} width="100%" />
          <Skeleton height={60} width="100%" />
        </Stack>
        <Skeleton height={200} width="100%" />
      </Stack>
    </Container>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<ProjectsPageLoading />}>
      <ProjectsPageClient />
    </Suspense>
  );
}
