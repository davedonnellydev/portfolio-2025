'use client';

import {
  faCalendar,
  faHeadSideSpeak,
  faScrewdriverWrench,
  faUser,
} from '@awesome.me/kit-7f37d33478/icons/classic/light';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, Grid, Group, Paper, Stack, Text, Title } from '@mantine/core';
import styles from './ProjectOverview.module.css';

interface ProjectOverviewProps {
  role?: string | undefined;
  timeframe?: string | undefined;
  techstack: string[];
  tldr?: string | undefined;
}

export function ProjectOverview({ role, timeframe, techstack, tldr }: ProjectOverviewProps) {
  return (
    <Paper radius="lg" p="xl" mb="xl" shadow="md" className={styles.recapPaper}>
      <Grid gutter="lg">
        <Grid.Col span={{ base: 12, md: 8, lg: 8 }}>
          <Stack gap="md">
            <Title
              order={2}
              size="h2"
              fw={700}
              className={styles.cyanText}
              style={{ fontFamily: 'Satoshi, var(--mantine-font-family)' }}
            >
              Overview
            </Title>

            {role && (
              <Group gap="xs">
                {/* <ThemeIcon radius="md" color="cyan" variant="light">

                </ThemeIcon> */}
                <Text size="md" maw="65ch">
                  <Text span className={styles.cyanText} fw="600">
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
                  <Text span className={styles.cyanText} fw="600">
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
                  <Text span className={styles.cyanText} fw="600">
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
            <Stack gap="sm">
              <Group gap="sm">
                {/* <ThemeIcon radius="md" color="cyan" variant="light">

                </ThemeIcon> */}
                <Title order={3} className={styles.cyanText}>
                  <FontAwesomeIcon icon={faScrewdriverWrench} /> Tech Stack
                </Title>
              </Group>
              <Group mb="sm">
                {techstack.map((tech, index) => (
                  <Badge
                    key={index}
                    variant="light"
                    className={styles.cyanBadge}
                    radius="sm"
                    size="md"
                  >
                    {tech}
                  </Badge>
                ))}
              </Group>
            </Stack>
          </Paper>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}
