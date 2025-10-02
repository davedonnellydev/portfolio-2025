'use client';

import Link from 'next/link';
import { IconArrowRight } from '@tabler/icons-react';
import { Button, Container, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { Project } from '@/data/projects';
import classes from './SignatureProjects.module.css';

interface SignatureProjectsProps {
  projects: Project[];
}

export function SignatureProjects({ projects }: SignatureProjectsProps) {
  // Filter for featured projects (limit to 3-4)
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 4);

  if (featuredProjects.length === 0) {
    return null;
  }

  return (
    <section className={classes.section} id="signature-projects">
      <Container size="xl">
        <Stack gap="xl">
          {/* Section Header */}
          <div className={classes.header}>
            <Title order={2} className={classes.title}>
              Signature Projects
            </Title>
            <Text size="lg" c="dimmed" maw="65ch" className={classes.subtitle}>
              A selection of my best work—showcasing real-world impact, modern tech stacks, and
              attention to detail.
            </Text>
          </div>

          {/* Project Cards Grid */}
          <SimpleGrid
            cols={{ base: 1, sm: 2, lg: 3 }}
            spacing={{ base: 'md', sm: 'lg', lg: 'xl' }}
            className={classes.grid}
          >
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </SimpleGrid>

          {/* See All Projects Link */}
          <div className={classes.footer}>
            <Button
              component={Link}
              href="/projects"
              variant="light"
              color="indigo"
              size="lg"
              rightSection={<IconArrowRight size={20} />}
              className={classes.seeAllButton}
            >
              See all projects
            </Button>
          </div>
        </Stack>
      </Container>
    </section>
  );
}
