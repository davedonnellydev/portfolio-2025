import { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Button, Container, Paper, Text, Title } from '@mantine/core';
import { projects } from '@/data/projects';
import { BackToProjectsButton } from './BackToProjectsButton';

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
      <Container size="lg" py="xl">
        <Suspense
          fallback={
            <Button variant="light" color="indigo" size="sm" disabled>
              Back to Projects
            </Button>
          }
        >
          <BackToProjectsButton />
        </Suspense>

        <Title order={1}>{project.title}</Title>
        <Text>{project.outcome}</Text>
        {project.content?.tldr && (
          <Paper withBorder p="md" mt="md">
            <Text fw={600}>TL;DR</Text>
            <Text>{project.content.tldr}</Text>
          </Paper>
        )}
        {project.content?.problem && (
          <Paper withBorder p="md" mt="md">
            <Title order={2}>The Problem</Title>
            <Text>{project.content.problem}</Text>
          </Paper>
        )}
        {project.content?.approach && (
          <Paper withBorder p="md" mt="md">
            <Title order={2}>My Approach</Title>
            <Text>{project.content.approach}</Text>
          </Paper>
        )}
        {project.content?.result && (
          <Paper withBorder p="md" mt="md">
            <Title order={2}>The Result</Title>
            <Text>{project.content.result}</Text>
          </Paper>
        )}
      </Container>
    </>
  );
}
