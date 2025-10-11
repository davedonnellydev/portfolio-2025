'use client';

import Link from 'next/link';
import { IconArrowRight } from '@tabler/icons-react';
import { Button, Container, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { Project } from '@/data/projects';
import classes from './FeaturedProjects.module.css';

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  // Filter for featured projects (limit to 3-4)
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 4);

  if (featuredProjects.length === 0) {
    return null;
  }

  return (
    <section className={classes.section} id="featured-projects">
      <Container size="xl">
        <Stack gap="xl">
          {/* Section Header */}
          <div className={classes.header}>
            <Title order={2} className={classes.title}>
              Featured Projects
            </Title>
            <Text size="lg" c="neutral.6" maw="65ch" className={classes.subtitle}>
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
              <ProjectCard key={project.slug} project={project} location="home" />
            ))}
          </SimpleGrid>

          {/* See All Projects Link */}
          <div className={classes.footer}>
            <Button
              component={Link}
              href="/projects"
              variant="filled"
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
