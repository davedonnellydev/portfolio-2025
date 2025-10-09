import { useState } from 'react';
import { ProjectFilters } from './ProjectFilters';

export default {
  title: 'Projects/ProjectFilters',
  component: ProjectFilters,
};

const mockProjects = [
  {
    slug: 'project-1',
    title: 'React App',
    description: 'A React application',
    outcome: 'Success',
    screenshot: '/test1.svg',
    techStack: ['React', 'TypeScript', 'Next.js'],
    links: { caseStudy: '/projects/project-1' },
    featured: true,
  },
  {
    slug: 'project-2',
    title: 'Node API',
    description: 'A Node.js API',
    outcome: 'Success',
    screenshot: '/test2.svg',
    techStack: ['Node.js', 'Express', 'MongoDB'],
    links: { caseStudy: '/projects/project-2' },
    featured: false,
  },
  {
    slug: 'project-3',
    title: 'Full Stack App',
    description: 'A full stack application',
    outcome: 'Success',
    screenshot: '/test3.svg',
    techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    links: { caseStudy: '/projects/project-3' },
    featured: false,
  },
  {
    slug: 'project-4',
    title: 'Python ML Project',
    description: 'Machine learning project',
    outcome: 'Success',
    screenshot: '/test4.svg',
    techStack: ['Python', 'TensorFlow', 'Docker'],
    links: { caseStudy: '/projects/project-4' },
    featured: false,
  },
];

export const Default = () => {
  const [selectedTech, setSelectedTech] = useState<string[]>([]);

  const handleTechToggle = (tech: string) => {
    setSelectedTech((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px' }}>
      <ProjectFilters
        projects={mockProjects}
        selectedTech={selectedTech}
        onTechToggle={handleTechToggle}
      />
    </div>
  );
};

export const WithSomeSelected = () => {
  const [selectedTech, setSelectedTech] = useState<string[]>(['React', 'TypeScript']);

  const handleTechToggle = (tech: string) => {
    setSelectedTech((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px' }}>
      <ProjectFilters
        projects={mockProjects}
        selectedTech={selectedTech}
        onTechToggle={handleTechToggle}
      />
    </div>
  );
};

export const AllSelected = () => {
  const [selectedTech, setSelectedTech] = useState<string[]>([
    'React',
    'TypeScript',
    'Next.js',
    'Node.js',
    'Express',
    'MongoDB',
    'PostgreSQL',
    'Python',
    'TensorFlow',
    'Docker',
  ]);

  const handleTechToggle = (tech: string) => {
    setSelectedTech((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px' }}>
      <ProjectFilters
        projects={mockProjects}
        selectedTech={selectedTech}
        onTechToggle={handleTechToggle}
      />
    </div>
  );
};

export const EmptyProjects = () => {
  const [selectedTech, setSelectedTech] = useState<string[]>([]);

  const handleTechToggle = (tech: string) => {
    setSelectedTech((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px' }}>
      <ProjectFilters projects={[]} selectedTech={selectedTech} onTechToggle={handleTechToggle} />
    </div>
  );
};

export const ManyProjects = () => {
  // Generate many projects with diverse tech stacks
  const manyProjects = Array.from({ length: 20 }, (_, i) => ({
    slug: `project-${i}`,
    title: `Project ${i}`,
    description: 'Description',
    outcome: 'Success',
    screenshot: '/test.svg',
    techStack: ['React', 'TypeScript', 'Node.js', 'Python', 'Docker'][i % 5]
      ? [`Technology-${i % 10}`]
      : ['React'],
    links: { caseStudy: `/projects/project-${i}` },
    featured: false,
  }));

  const [selectedTech, setSelectedTech] = useState<string[]>([]);

  const handleTechToggle = (tech: string) => {
    setSelectedTech((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px' }}>
      <ProjectFilters
        projects={manyProjects}
        selectedTech={selectedTech}
        onTechToggle={handleTechToggle}
      />
    </div>
  );
};

export const Interactive = () => {
  const [selectedTech, setSelectedTech] = useState<string[]>([]);

  const handleTechToggle = (tech: string) => {
    setSelectedTech((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const filteredProjects =
    selectedTech.length === 0
      ? mockProjects
      : mockProjects.filter((project) =>
          selectedTech.every((tech) => project.techStack.includes(tech))
        );

  return (
    <div style={{ padding: '20px', maxWidth: '800px' }}>
      <ProjectFilters
        projects={mockProjects}
        selectedTech={selectedTech}
        onTechToggle={handleTechToggle}
      />

      <div style={{ marginTop: '32px' }}>
        <h3>Filtered Results ({filteredProjects.length} projects)</h3>
        <ul>
          {filteredProjects.map((project) => (
            <li key={project.slug}>
              {project.title} - {project.techStack.join(', ')}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
