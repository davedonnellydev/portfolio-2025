import Image from 'next/image';
import Link from 'next/link';
import { Badge, Button, Card, Group, Stack, Text, Title } from '@mantine/core';
import { Project } from '@/data/projects';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
  currentSearchParams?: string;
}

export function ProjectCard({ project, currentSearchParams }: ProjectCardProps) {
  // Build the case study URL with current search parameters
  const caseStudyUrl = currentSearchParams
    ? `${project.links.caseStudy}?${currentSearchParams}`
    : project.links.caseStudy;
  return (
    <Card withBorder radius="md" shadow="sm" p="lg" className={styles.card}>
      {/* Screenshot */}
      <Card.Section className={styles.imageSection}>
        <div className={styles.imageWrapper}>
          <Image
            src={project.screenshot}
            alt={`Screenshot of ${project.title}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.image}
            unoptimized
          />
        </div>
      </Card.Section>

      <Stack gap="md" className={styles.content}>
        {/* Title */}
        <Title order={3} className={styles.title}>
          {project.title}
        </Title>

        {/* Description */}
        <Text size="sm" c="dimmed" lineClamp={2}>
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

        {/* Action Buttons */}
        <Group gap="sm" justify="space-between" className={styles.actions}>
          <Button
            component={Link}
            href={caseStudyUrl}
            variant="light"
            color="indigo"
            size="sm"
            radius="md"
            className={styles.actionButton}
          >
            Read case study
          </Button>

          <Group gap="xs">
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
              >
                Live
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
              >
                Code
              </Button>
            )}
          </Group>
        </Group>
      </Stack>
    </Card>
  );
}
