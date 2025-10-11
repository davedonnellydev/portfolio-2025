import { Badge, Group, Stack, Text } from '@mantine/core';
import { Project } from '@/data/projects';
import styles from './ProjectFilters.module.css';

interface ProjectFiltersProps {
  projects: Project[];
  selectedTech: string[];
  onTechToggle: (tech: string) => void;
}

export function ProjectFilters({ projects, selectedTech, onTechToggle }: ProjectFiltersProps) {
  // Get all unique tech stack items from projects
  const allTech = Array.from(new Set(projects.flatMap((project) => project.techStack))).sort();

  // Count how many projects use each tech
  const techCounts = allTech.reduce(
    (acc, tech) => {
      acc[tech] = projects.filter((project) => project.techStack.includes(tech)).length;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className={styles.filtersContainer}>
      <Stack gap="md">
        <Text size="sm" fw={600} c="neutral.6">
          Filter by technology
        </Text>

        <Group gap="xs">
          {allTech.map((tech) => {
            const isSelected = selectedTech.includes(tech);
            const count = techCounts[tech];

            return (
              <Badge
                key={tech}
                variant={isSelected ? 'filled' : 'light'}
                color={isSelected ? 'indigo' : 'gray'}
                radius="sm"
                size="sm"
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                }}
                onClick={() => onTechToggle(tech)}
                aria-pressed={isSelected}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onTechToggle(tech);
                  }
                }}
              >
                {tech} ({count})
              </Badge>
            );
          })}
        </Group>

        {selectedTech.length > 0 && (
          <Text size="xs" c="neutral.6">
            Showing projects using: {selectedTech.join(', ')}
          </Text>
        )}
      </Stack>
    </div>
  );
}
