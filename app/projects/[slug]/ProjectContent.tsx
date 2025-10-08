'use client';

import {
  faBracketsCurly,
  faCircleExclamation,
  faLocationDot,
  faMap,
  faSitemap,
  faUserRobot,
} from '@awesome.me/kit-7f37d33478/icons/classic/light';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Accordion, Code, Grid, Group, Paper, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import styles from './ProjectContent.module.css';

type CodeExcerpt = {
  title: string;
  code: string;
  language: string;
};

interface ProjectContentProps {
  problem?: string | undefined;
  approach?: string | undefined;
  result?: string | undefined;
  architecture?: string | undefined;
  aiUsage?: string | undefined;
  codeExcerpts: CodeExcerpt[] | undefined;
  nextSteps?: string | undefined;
}

export function ProjectContent({
  problem,
  approach,
  result,
  architecture,
  aiUsage,
  codeExcerpts,
  nextSteps,
}: ProjectContentProps) {
  return (
    <Stack gap="xl" mb="xl">
      <Paper
        radius="lg"
        p="xl"
        mb="xl"
        shadow="md"
        className={styles.mainPaper}
      >
        <Grid gutter="lg">
          <Grid.Col span={{ base: 12, md: 8, lg: 8 }}>
            {/* Problem */}
            {problem && (
              <Stack mb="lg">
                <Title order={2} mb="md">
                  Details
                </Title>
                <Group>
                  <ThemeIcon radius="md" color="yellow" variant="light">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                  </ThemeIcon>
                  <Title order={3}>The Problem</Title>
                </Group>
                <Text style={{ lineHeight: 1.7, fontSize: '1.1rem' }} mb="md">
                  {problem}
                </Text>
              </Stack>
            )}
            {/* Approach */}
            {approach && (
              <Stack mb="lg">
                <Group>
                  <ThemeIcon radius="md" color="yellow" variant="light">
                    <FontAwesomeIcon icon={faMap} />
                  </ThemeIcon>
                  <Title order={3}>My Approach</Title>
                </Group>
                <Text style={{ lineHeight: 1.7, fontSize: '1.1rem' }} mb="md">
                  {approach}
                </Text>
              </Stack>
            )}
            {/* Result */}
            {result && (
              <Stack mb="lg">
                <Group>
                  <ThemeIcon radius="md" color="yellow" variant="light">
                    <FontAwesomeIcon icon={faLocationDot} />
                  </ThemeIcon>
                  <Title order={3}>The Result</Title>
                </Group>
                <Text style={{ lineHeight: 1.7, fontSize: '1.1rem' }} mb="xs">
                  {result}
                </Text>
              </Stack>
            )}
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4, lg: 4 }}>
            {/* Technical Details */}
            {(architecture || aiUsage) && (
              <Stack gap="xl" mb="xl">
                {/* Architecture */}
                {architecture && (
                  <Paper withBorder radius="md" p="lg" className={styles.technicalPaper}>
                    <Title order={3} mb="xs" c="indigo.7">
                      <ThemeIcon
                        radius="xs"
                        color="indigo.7"
                        variant="light"
                        style={{ verticalAlign: 'top' }}
                      >
                        <Text lh="h3">
                          <FontAwesomeIcon icon={faSitemap} />
                        </Text>
                      </ThemeIcon>{' '}
                      Architecture & Key Decisions
                    </Title>
                    <Text style={{ lineHeight: 1.7 }}>{architecture}</Text>
                  </Paper>
                )}

                {/* AI Usage */}
                {aiUsage && (
                  <Paper withBorder radius="md" p="lg" className={styles.technicalPaper}>
                    <Title order={3} mb="xs" c="grape.7">
                      <ThemeIcon
                        radius="xs"
                        color="grape.7"
                        variant="light"
                        style={{ verticalAlign: 'top' }}
                      >
                        <Text lh="h3">
                          <FontAwesomeIcon icon={faUserRobot} />
                        </Text>
                      </ThemeIcon>{' '}
                      AI Integration
                    </Title>
                    <Text style={{ lineHeight: 1.7 }}>{aiUsage}</Text>
                  </Paper>
                )}
              </Stack>
            )}
          </Grid.Col>
        </Grid>
        {/* Code Excerpts */}
        {codeExcerpts && codeExcerpts.length > 0 && (
          <Paper withBorder radius="md" p="lg" className={styles.codePaper}>
            <Stack>
              <Group>
                <ThemeIcon radius="md" color="yellow" variant="light">
                  <FontAwesomeIcon icon={faBracketsCurly} />
                </ThemeIcon>
                <Title order={3}>Code Excerpts</Title>
              </Group>
              <Accordion>
                {codeExcerpts.map((excerpt, index) => (
                  <Accordion.Item key={index} value={excerpt.title}>
                    <Accordion.Control>{excerpt.title}</Accordion.Control>
                    <Accordion.Panel>
                      <Code
                        block
                        style={{
                          fontSize: '0.9rem',
                          fontFamily: 'var(--font-jetbrains)',
                          backgroundColor: 'var(--mantine-color-dark-8)',
                          color: 'var(--mantine-color-gray-0)',
                        }}
                      >
                        {excerpt.code}
                      </Code>
                    </Accordion.Panel>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Stack>
          </Paper>
        )}
      </Paper>
      {/* Next Steps */}
      {nextSteps && (
        <Paper
          withBorder
          radius="md"
          p="lg"
          shadow="md"
          className={styles.nextStepsPaper}
        >
          <Title order={2} mb="md">
            What's Next?
          </Title>
          <Text style={{ lineHeight: 1.7, fontSize: '1.1rem' }}>{nextSteps}</Text>
        </Paper>
      )}
    </Stack>
  );
}
