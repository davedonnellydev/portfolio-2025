'use client';

import { faGithub } from '@awesome.me/kit-7f37d33478/icons/classic/brands';
import {
  faArrowUpRightFromSquare,
  faCalendar,
  faCode,
  faHeadSideSpeak,
  faUser,
} from '@awesome.me/kit-7f37d33478/icons/classic/light';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Anchor,
  Badge,
  Button,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { Project } from '@/data/projects';
import styles from './ProjectRecap.module.css';

type ProjectLinks = Project['links'];

interface ProjectRecapProps {
  role?: string | undefined;
  timeframe?: string | undefined;
  links: ProjectLinks;
  techstack: string[];
  tldr?: string | undefined;
}

export function ProjectRecap({ role, timeframe, links, techstack, tldr }: ProjectRecapProps) {
  return (
    <Paper
      radius="lg"
      p="xl"
      mb="xl"
      shadow="md"
      className={styles.recapPaper}
    >
      <Grid gutter="lg">
        <Grid.Col span={{ base: 12, md: 8, lg: 8 }}>
          <Stack gap="lg">
            <Title
              order={2}
              size="h2"
              fw={700}
              style={{ fontFamily: 'Satoshi, var(--mantine-font-family)' }}
            >
              Overview
            </Title>

            {role && (
              <Group gap="sm">
                <ThemeIcon radius="md" color="cyan" variant="light">
                  <FontAwesomeIcon icon={faUser} />
                </ThemeIcon>
                <Text size="md" c="cyan" maw="65ch">
                  Role -{' '}
                  <Text span c="var(--mantine-color-neutral-6)">
                    {role}
                  </Text>
                </Text>
              </Group>
            )}

            {timeframe && (
              <Group gap="sm">
                <ThemeIcon radius="md" color="cyan" variant="light">
                  <FontAwesomeIcon icon={faCalendar} />
                </ThemeIcon>
                <Text size="md" c="cyan" maw="65ch">
                  Timeframe -{' '}
                  <Text span c="var(--mantine-color-neutral-6)">
                    {timeframe}
                  </Text>
                </Text>
              </Group>
            )}

            {tldr && (
              <Stack gap="sm">
                <Group gap="sm">
                  <ThemeIcon radius="md" color="cyan" variant="light">
                    <FontAwesomeIcon icon={faHeadSideSpeak} />
                  </ThemeIcon>
                  <Text size="md" c="cyan" maw="65ch">
                    TL;DR -
                  </Text>
                </Group>
                <Text span c="var(--mantine-color-neutral-6)">
                  {tldr}
                </Text>
              </Stack>
            )}
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4, lg: 4 }}>
          <Paper
            radius="md"
            p="md"
            h="100%"
            className={styles.techStackPaper}
          >
            <Stack h="100%" justify="space-around">
              <Stack gap="sm">
                <Group gap="sm">
                  <ThemeIcon radius="md" color="cyan" variant="light">
                    <FontAwesomeIcon icon={faCode} />
                  </ThemeIcon>
                  <Title order={3} c="cyan">
                    Tech Stack
                  </Title>
                </Group>
                <Group mb="sm">
                  {techstack.map((tech, index) => (
                    <Badge key={index} variant="light" color="cyan" radius="sm" size="md">
                      {tech}
                    </Badge>
                  ))}
                </Group>
              </Stack>
              <Group gap="xs">
                {links.live && (
                  <Anchor href={links.live} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="light"
                      color="indigo"
                      radius="md"
                      leftSection={<FontAwesomeIcon icon={faArrowUpRightFromSquare} />}
                    >
                      Live Demo
                    </Button>
                  </Anchor>
                )}
                {links.repo && (
                  <Anchor href={links.repo} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="light"
                      color="grape"
                      radius="md"
                      leftSection={<FontAwesomeIcon icon={faGithub} />}
                    >
                      Repo
                    </Button>
                  </Anchor>
                )}
              </Group>
            </Stack>
          </Paper>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}
