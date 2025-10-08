import { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Button, Container, Image } from '@mantine/core';
import { AnimatedBackground } from '@/components/shared/AnimatedBackground';
import { generateProjectSchema } from '@/lib/seo';
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

  const description = `${project.outcome} ${project.description}`;

  return {
    title: `${project.title}`,
    description,
    openGraph: {
      title: `${project.title} | Dave Donnelly`,
      description,
      images: [
        {
          url: project.screenshot,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title}`,
      description,
      images: [project.screenshot],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  // Generate CreativeWork schema for the project
  const projectSchema = generateProjectSchema({
    title: project.title,
    description: project.description,
    url: `/projects/${project.slug}`,
    image: project.screenshot,
  });

  return (
    <>
      <AnimatedBackground />
      {/* CreativeWork Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
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
