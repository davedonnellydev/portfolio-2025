'use client';

import Image from 'next/image';
import Link from 'next/link';
import { faGithub } from '@awesome.me/kit-7f37d33478/icons/classic/brands';
import { faArrowUpRightFromSquare } from '@awesome.me/kit-7f37d33478/icons/classic/light';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, Button, Card, Group, Stack, Text, Title } from '@mantine/core';
import { Project } from '@/data/projects';
import { analytics } from '@/lib/analytics';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
  currentSearchParams?: string;
  location?: 'home' | 'projects';
}

export function ProjectCard({
  project,
  currentSearchParams,
  location = 'projects',
}: ProjectCardProps) {
  // Build the case study URL with current search parameters
  const caseStudyUrl = currentSearchParams
    ? `${project.links.caseStudy}?${currentSearchParams}`
    : project.links.caseStudy;

  const handleCaseStudyClick = () => {
    analytics.trackCaseStudyClick(project.slug, project.title, location);
  };

  const handleLiveDemoClick = () => {
    analytics.trackLiveDemoClick(project.slug, project.title);
  };

  const handleRepoClick = () => {
    analytics.trackRepoClick(project.slug, project.title);
  };

  return (
    <Card withBorder radius="md" shadow="sm" p="lg" className={styles.card}>
      {/* Clickable Case Study Link */}
      <Link href={caseStudyUrl} onClick={handleCaseStudyClick} className={styles.caseStudyLink}>
        {/* Screenshot */}
        <Card.Section className={styles.imageSection}>
          <div className={styles.imageWrapper}>
            <div className={styles.imageInner}>
              <Image
                src={project.screenshot}
                alt={`Screenshot of ${project.title}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={styles.image}
                loading={location === 'home' && project.featured ? 'eager' : 'lazy'}
              />
            </div>
          </div>
        </Card.Section>

        <Stack gap="md" className={styles.content}>
          {/* Title */}
          <Title order={3} className={styles.title}>
            {project.title}
          </Title>

          {/* Description */}
          <Text size="sm" c="gray.7" lineClamp={2}>
            {project.description}
          </Text>

          {/* Outcome Metric - Highlighted */}
          <div className={styles.outcomeWrapper}>
            <Text size="sm" fw={600} className={styles.outcomeLabel}>
              Outcome:
            </Text>
            <Text size="sm" className={styles.outcome}>
              {project.outcome}
            </Text>
          </div>

          {/* Tech Stack Chips */}
          <Group gap="xs" className={styles.techStack}>
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="light" color="indigo" radius="sm" size="sm">
                {tech}
              </Badge>
            ))}
          </Group>
        </Stack>
      </Link>

      {/* External Links Section */}
      {(project.links.live || project.links.repo) && (
        <Group gap="xs" justify="center" className={styles.externalLinks}>
          {project.links.live && (
            <Button
              component="a"
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              variant="subtle"
              color="indigo"
              size="sm"
              radius="md"
              rightSection={<FontAwesomeIcon icon={faArrowUpRightFromSquare} />}
              onClick={handleLiveDemoClick}
            >
              Live site
            </Button>
          )}

          {project.links.repo && (
            <Button
              component="a"
              href={project.links.repo}
              target="_blank"
              rel="noopener noreferrer"
              variant="subtle"
              color="indigo"
              size="sm"
              radius="md"
              onClick={handleRepoClick}
              leftSection={<FontAwesomeIcon icon={faGithub} />}
            >
              Repo
            </Button>
          )}
        </Group>
      )}
    </Card>
  );
}
