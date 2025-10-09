import { ProjectCard } from './ProjectCard';

export default {
  title: 'Projects/ProjectCard',
};

const mockProject = {
  slug: 'example-project',
  title: 'Example Learning Platform',
  description:
    'A comprehensive e-learning platform with real-time collaboration, progress tracking, and AI-powered recommendations.',
  outcome: 'Increased student engagement by 45% and reduced teacher admin time by 30%',
  metrics: ['45% increase in engagement', '30% reduction in admin time', '10,000+ active users'],
  screenshot: '/images/projects/learning-platform.svg',
  techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'OpenAI'],
  links: {
    live: 'https://example.com',
    repo: 'https://github.com/example/learning-platform',
    caseStudy: '/projects/example-project',
  },
  featured: true,
};

const mockProjectNoLinks = {
  ...mockProject,
  slug: 'private-project',
  title: 'Private Enterprise Project',
  description: 'A confidential project for a major enterprise client.',
  outcome: 'Successfully delivered on time and under budget',
  links: {
    caseStudy: '/projects/private-project',
  },
};

const mockProjectManyTech = {
  ...mockProject,
  slug: 'full-stack-project',
  title: 'Full-Stack Application',
  techStack: [
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'Express',
    'PostgreSQL',
    'Redis',
    'Docker',
    'AWS',
    'Jest',
  ],
};

export const Default = () => (
  <div style={{ maxWidth: '400px', padding: '20px' }}>
    <ProjectCard project={mockProject} />
  </div>
);

export const OnHomepage = () => (
  <div style={{ maxWidth: '400px', padding: '20px' }}>
    <ProjectCard project={mockProject} location="home" />
  </div>
);

export const WithoutLiveDemo = () => (
  <div style={{ maxWidth: '400px', padding: '20px' }}>
    <ProjectCard
      project={{
        ...mockProject,
        links: { ...mockProject.links, live: undefined },
      }}
    />
  </div>
);

export const WithoutRepository = () => (
  <div style={{ maxWidth: '400px', padding: '20px' }}>
    <ProjectCard
      project={{
        ...mockProject,
        links: { ...mockProject.links, repo: undefined },
      }}
    />
  </div>
);

export const PrivateProject = () => (
  <div style={{ maxWidth: '400px', padding: '20px' }}>
    <ProjectCard project={mockProjectNoLinks} />
  </div>
);

export const ManyTechnologies = () => (
  <div style={{ maxWidth: '400px', padding: '20px' }}>
    <ProjectCard project={mockProjectManyTech} />
  </div>
);

export const WithSearchParams = () => (
  <div style={{ maxWidth: '400px', padding: '20px' }}>
    <ProjectCard project={mockProject} currentSearchParams="tech=React&search=learning" />
  </div>
);

export const LongDescription = () => (
  <div style={{ maxWidth: '400px', padding: '20px' }}>
    <ProjectCard
      project={{
        ...mockProject,
        description:
          'This is a very long description that should be truncated. It contains a lot of text to demonstrate how the card handles overflow content. The description keeps going and going to show the line clamp behavior in action.',
      }}
    />
  </div>
);

export const ShortOutcome = () => (
  <div style={{ maxWidth: '400px', padding: '20px' }}>
    <ProjectCard
      project={{
        ...mockProject,
        outcome: 'Successful launch',
      }}
    />
  </div>
);

export const Grid = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '24px',
      padding: '20px',
    }}
  >
    <ProjectCard project={mockProject} />
    <ProjectCard project={mockProjectNoLinks} />
    <ProjectCard project={mockProjectManyTech} />
  </div>
);
