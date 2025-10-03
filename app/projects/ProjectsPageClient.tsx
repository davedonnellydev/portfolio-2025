'use client';

import { useMemo, useState } from 'react';
import { Button, Container, Grid, Group, Stack, Text, Title } from '@mantine/core';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectFilters } from '@/components/projects/ProjectFilters';
import { ProjectSearch } from '@/components/projects/ProjectSearch';
import { ProjectsStructuredData } from '@/components/projects/ProjectsStructuredData';
import { projects } from '@/data/projects';

export function ProjectsPageClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState<string[]>([]);

  // Filter and search logic
  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.outcome.toLowerCase().includes(query)
      );
    }

    // Apply tech stack filter
    if (selectedTech.length > 0) {
      filtered = filtered.filter((project) =>
        selectedTech.every((tech) => project.techStack.includes(tech))
      );
    }

    return filtered;
  }, [searchQuery, selectedTech]);

  const handleTechToggle = (tech: string) => {
    setSelectedTech((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedTech([]);
  };

  const hasActiveFilters = searchQuery.trim() || selectedTech.length > 0;

  return (
    <>
      <ProjectsStructuredData />
      <Container size="xl" py="xl">
        <Stack gap="xl">
          {/* Page Header */}
          <Stack gap="md" align="center" ta="center">
            <Title order={1} size="h1" fw={700}>
              My Projects
            </Title>
            <Text size="lg" c="dimmed" maw={600}>
              A collection of projects showcasing my skills in web development, with a focus on
              education technology and accessibility.
            </Text>
          </Stack>

          {/* Filters and Search */}
          <Stack gap="lg">
            <ProjectSearch
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              resultCount={filteredProjects.length}
            />

            <ProjectFilters
              projects={projects}
              selectedTech={selectedTech}
              onTechToggle={handleTechToggle}
            />

            {hasActiveFilters && (
              <Group justify="space-between" align="center">
                <Text size="sm" c="dimmed">
                  {filteredProjects.length} of {projects.length} projects
                  {selectedTech.length > 0 && ` using ${selectedTech.join(', ')}`}
                  {searchQuery && ` matching "${searchQuery}"`}
                </Text>
                <Button variant="light" color="gray" size="sm" onClick={clearAllFilters}>
                  Clear all filters
                </Button>
              </Group>
            )}
          </Stack>

          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <Grid gutter="lg">
              {filteredProjects.map((project) => (
                <Grid.Col key={project.slug} span={{ base: 12, sm: 6, lg: 4 }}>
                  <ProjectCard project={project} />
                </Grid.Col>
              ))}
            </Grid>
          ) : (
            <Stack gap="md" align="center" ta="center" py="xl">
              <Title order={3} c="dimmed">
                No projects found
              </Title>
              <Text c="dimmed">
                Try adjusting your search terms or filters to find what you're looking for.
              </Text>
              {hasActiveFilters && (
                <Button variant="light" color="indigo" onClick={clearAllFilters}>
                  Clear all filters
                </Button>
              )}
            </Stack>
          )}
        </Stack>
      </Container>
    </>
  );
}
