'use client';

import { IconBrain, IconMessageCircle, IconRocket } from '@tabler/icons-react';
import { Card, Container, Grid, Group, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import classes from './WhyHireMe.module.css';

interface Pillar {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  benefits: string[];
}

const pillars: Pillar[] = [
  {
    title: 'Work Quickly',
    description:
      'I deliver working solutions fast, without cutting corners on quality or maintainability.',
    icon: IconRocket,
    color: 'primary',
    benefits: [
      'Rapid prototyping and MVP development',
      'Efficient debugging and problem-solving',
      'Clean, maintainable code architecture',
      'Automated testing and CI/CD pipelines',
    ],
  },
  {
    title: 'Communicate Clearly',
    description:
      'I bridge the gap between technical complexity and business needs with clear, actionable communication.',
    icon: IconMessageCircle,
    color: 'cyan',
    benefits: [
      'Technical documentation and code comments',
      'Stakeholder updates and progress reports',
      'Code reviews and knowledge sharing',
      'User-friendly error messages and interfaces',
    ],
  },
  {
    title: 'Leverage AI Responsibly',
    description:
      'I use AI tools to enhance productivity while maintaining code quality and understanding.',
    icon: IconBrain,
    color: 'grape',
    benefits: [
      'AI-assisted development and debugging',
      'Automated testing and quality assurance',
      'Code optimisation and refactoring',
      'Learning new technologies efficiently',
    ],
  },
];

export function WhyHireMe() {
  return (
    <Container size="xl" py="xl" className={classes.section} id="why-hire-me">
      <Stack gap="xl" align="center">
        <div className={classes.header}>
          <Title order={2} mb="md">
            Why You Should Hire Me
          </Title>
          <Text size="lg" c="dimmed" className={classes.dimmedText}>
            A hiring manager's cheat sheet to my core strengths and how they map to your role needs.
          </Text>
        </div>

        <Grid>
          {pillars.map((pillar) => (
            <Grid.Col key={pillar.title} span={{ base: 12, md: 4 }}>
              <Card
                withBorder
                radius="lg"
                p="xl"
                h="100%"
                className={classes.pillarCard}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Stack gap="md" h="100%">
                  <Group gap="md" align="flex-start">
                    <ThemeIcon size="xl" radius="md" color={pillar.color} variant="light">
                      <pillar.icon size={24} />
                    </ThemeIcon>
                    <div style={{ flex: 1 }}>
                      <Title order={3} size="h4" mb="xs">
                        {pillar.title}
                      </Title>
                      <Text c="dimmed" size="sm" mb="md" className={classes.dimmedText}>
                        {pillar.description}
                      </Text>
                    </div>
                  </Group>

                  <Stack gap="xs" style={{ flex: 1 }}>
                    <Text
                      size="sm"
                      fw={600}
                      c="dimmed"
                      tt="uppercase"
                      className={classes.dimmedText}
                      style={{ letterSpacing: '0.5px' }}
                    >
                      Key Benefits:
                    </Text>
                    {pillar.benefits.map((benefit, benefitIndex) => (
                      <Group key={benefitIndex} gap="xs" align="flex-start">
                        <ThemeIcon
                          size="xs"
                          radius="xl"
                          color={pillar.color}
                          variant="filled"
                          style={{ marginTop: '2px', minWidth: '6px', minHeight: '6px' }}
                        />
                        <Text size="sm" style={{ flex: 1 }}>
                          {benefit}
                        </Text>
                      </Group>
                    ))}
                  </Stack>
                </Stack>
              </Card>
            </Grid.Col>
          ))}
        </Grid>

        <Text size="sm" c="dimmed" ta="center" mt="lg" className={classes.footerText}>
          <strong>Perfect for roles requiring:</strong> Frontend development, testing,
          accessibility, business analysis, data visualisation and modern web technologies.
        </Text>
      </Stack>
    </Container>
  );
}
