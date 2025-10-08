'use client';

import { faGithub } from '@awesome.me/kit-7f37d33478/icons/classic/brands';
import {
  faArrowUpRightFromSquare,
  faCalendar,
  faHeadSideSpeak,
  faScrewdriverWrench,
  faUser,
} from '@awesome.me/kit-7f37d33478/icons/classic/light';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Anchor, Badge, Button, Grid, Group, Paper, Stack, Text, Title } from '@mantine/core';
import { Project } from '@/data/projects';
import styles from './ProjectOverview.module.css';

type ProjectLinks = Project['links'];

interface ProjectOverviewProps {
  role?: string | undefined;
  timeframe?: string | undefined;
  links: ProjectLinks;
  techstack: string[];
  tldr?: string | undefined;
}

export function ProjectOverview({ role, timeframe, links, techstack, tldr }: ProjectOverviewProps) {
  return (
    <Paper radius="lg" p="xl" mb="xl" shadow="md" className={styles.recapPaper}>
      <Grid gutter="lg">
        <Grid.Col span={{ base: 12, md: 8, lg: 8 }}>
          <Stack gap="md">
            <Title
              order={2}
              size="h2"
              fw={700}
              c="cyan"
              style={{ fontFamily: 'Satoshi, var(--mantine-font-family)' }}
            >
              Overview
            </Title>

            {role && (
              <Group gap="xs">
                {/* <ThemeIcon radius="md" color="cyan" variant="light">

                </ThemeIcon> */}
                <Text size="md" maw="65ch">
                  <Text span c="cyan" fw="600">
                    <FontAwesomeIcon icon={faUser} /> Role:{' '}
                  </Text>
                  {role}
                </Text>
              </Group>
            )}

            {timeframe && (
              <Group gap="xs">
                {/* <ThemeIcon radius="md" color="cyan" variant="light">

                </ThemeIcon> */}
                <Text size="md" c="var(--mantine-color-neutral-6)" maw="65ch">
                  <Text span c="cyan" fw="600">
                    <FontAwesomeIcon icon={faCalendar} /> Timeframe:{' '}
                  </Text>
                  {timeframe}
                </Text>
              </Group>
            )}

            {tldr && (
              <Group gap="xs">
                <Text span size="md" c="var(--mantine-color-neutral-6)" maw="65ch">
                  {/* <ThemeIcon radius="md" color="cyan" variant="light" mr="0.5rem">

                  </ThemeIcon> */}
                  <Text span c="cyan" fw="600">
                    <FontAwesomeIcon icon={faHeadSideSpeak} /> TL;DR:{' '}
                  </Text>
                  {tldr}
                </Text>
              </Group>
            )}
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4, lg: 4 }}>
          <Paper radius="md" p="md" h="100%" className={styles.techStackPaper}>
            <Stack h="100%" justify="space-around">
              <Stack gap="sm">
                <Group gap="sm">
                  {/* <ThemeIcon radius="md" color="cyan" variant="light">

                  </ThemeIcon> */}
                  <Title order={3} c="cyan">
                    <FontAwesomeIcon icon={faScrewdriverWrench} /> Tech Stack
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
                      variant="filled"
                      color="cyan.7"
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
                      variant="filled"
                      color="cyan.7"
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
