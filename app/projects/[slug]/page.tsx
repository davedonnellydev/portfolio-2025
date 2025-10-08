import { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Button, Container, Image } from '@mantine/core';
import { AnimatedBackground } from '@/components/shared/AnimatedBackground';
import { projects } from '@/data/projects';
import { BackToProjectsButton } from './BackToProjectsButton';
import { ProjectContent } from './ProjectContent';
import { ProjectHero } from './ProjectHero';
import { ProjectOverview } from './ProjectOverview';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all projects
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate metadata for each project
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | Dave Donnelly`,
    description: project.outcome,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <AnimatedBackground />
      <Container size="lg">
        {/* Back Button */}
        <Suspense
          fallback={
            <Button variant="light" color="indigo" size="sm" disabled mb="xl">
              Back to Projects
            </Button>
          }
        >
          <BackToProjectsButton />
        </Suspense>
      </Container>
      {/* Hero Image - Full Width */}
      <Container fluid px={0}>
        <Image
          src={project.screenshot}
          alt={`${project.title} screenshot`}
          height={300}
          fit="cover"
          radius={0}
        />
      </Container>

      {/* Main Content */}
      <Container size="lg" py="xl">
        {/* Project Hero Section */}
        <ProjectHero
          title={project.title}
          description={project.description}
          outcome={project.outcome}
          metrics={project.metrics}
        />
        <ProjectOverview
          role={project.content?.role}
          timeframe={project.content?.timeframe}
          links={project.links}
          techstack={project.techStack}
          tldr={project.content?.tldr}
        />

        <ProjectContent
          problem={project.content?.problem}
          approach={project.content?.approach}
          result={project.content?.result}
          architecture={project.content?.architecture}
          aiUsage={project.content?.aiUsage}
          codeExcerpts={project.content?.codeExcerpts}
          nextSteps={project.content?.nextSteps}
        />
      </Container>
    </>
  );
}
