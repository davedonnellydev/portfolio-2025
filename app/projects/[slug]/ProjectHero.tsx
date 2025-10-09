'use client';

import { faBullseyeArrow } from '@awesome.me/kit-7f37d33478/icons/classic/light';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, Grid, Group, Paper, Stack, Text, Title } from '@mantine/core';
import styles from './ProjectHero.module.css';

interface ProjectHeroProps {
  title: string;
  description: string;
  outcome: string;
  metrics?: string[];
}

export function ProjectHero({ title, description, outcome, metrics }: ProjectHeroProps) {
  return (
    <Paper id="overview" radius="lg" p="xl" mb="xl" shadow="md" className={styles.heroPaper}>
      <Grid gutter="lg">
        <Grid.Col span={{ base: 12, md: 8, lg: 8 }}>
          <Stack gap="lg">
            <Title
              order={1}
              size="h1"
              fw={700}
              style={{ fontFamily: 'Satoshi, var(--mantine-font-family)' }}
            >
              {title}
            </Title>

            <Text size="xl" c="gray.7" maw="65ch">
              {description}
            </Text>
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4, lg: 4 }}>
          <Stack gap="md">
            <Paper radius="md" p="md" className={styles.outcomePaper}>
              <Text fw={600} className={styles.outcomeText} size="lg">
                <FontAwesomeIcon icon={faBullseyeArrow} /> {outcome}
              </Text>
            </Paper>

            {/* Metrics */}
            {metrics && metrics.length > 0 && (
              <Group gap="md">
                {metrics.map((metric, index) => (
                  <Badge
                    key={index}
                    variant="light"
                    color="primary"
                    size="lg"
                    radius="md"
                    style={{ fontSize: '0.9rem' }}
                  >
                    {metric}
                  </Badge>
                ))}
              </Group>
            )}
          </Stack>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}
