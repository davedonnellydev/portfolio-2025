import { Project } from '@/data/projects';
import { render, screen } from '@/test-utils';
import { ProjectFilters } from './ProjectFilters';

describe('ProjectFilters', () => {
  const mockProjects: Project[] = [
    {
      slug: 'project-1',
      title: 'Project 1',
      description: 'Description 1',
      outcome: 'Outcome 1',
      screenshot: '/test1.svg',
      techStack: ['React', 'TypeScript', 'Next.js'],
      links: { caseStudy: '/projects/project-1' },
      featured: true,
    },
    {
      slug: 'project-2',
      title: 'Project 2',
      description: 'Description 2',
      outcome: 'Outcome 2',
      screenshot: '/test2.svg',
      techStack: ['React', 'Node.js', 'MongoDB'],
      links: { caseStudy: '/projects/project-2' },
      featured: false,
    },
    {
      slug: 'project-3',
      title: 'Project 3',
      description: 'Description 3',
      outcome: 'Outcome 3',
      screenshot: '/test3.svg',
      techStack: ['TypeScript', 'Next.js', 'PostgreSQL'],
      links: { caseStudy: '/projects/project-3' },
      featured: false,
    },
  ];

  const mockOnTechToggle = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders the filter title', () => {
      render(
        <ProjectFilters projects={mockProjects} selectedTech={[]} onTechToggle={mockOnTechToggle} />
      );
      expect(screen.getByText('Filter by technology')).toBeInTheDocument();
    });

    it('renders all unique technologies', () => {
      render(
        <ProjectFilters projects={mockProjects} selectedTech={[]} onTechToggle={mockOnTechToggle} />
      );

      // All unique techs from mockProjects
      expect(screen.getByText(/MongoDB/)).toBeInTheDocument();
      expect(screen.getByText(/Next\.js/)).toBeInTheDocument();
      expect(screen.getByText(/Node\.js/)).toBeInTheDocument();
      expect(screen.getByText(/PostgreSQL/)).toBeInTheDocument();
      expect(screen.getByText(/React/)).toBeInTheDocument();
      expect(screen.getByText(/TypeScript/)).toBeInTheDocument();
    });

    it('displays project counts for each technology', () => {
      render(
        <ProjectFilters projects={mockProjects} selectedTech={[]} onTechToggle={mockOnTechToggle} />
      );

      // React appears in 2 projects
      expect(screen.getByText('React (2)')).toBeInTheDocument();
      // TypeScript appears in 2 projects
      expect(screen.getByText('TypeScript (2)')).toBeInTheDocument();
      // Next.js appears in 2 projects
      expect(screen.getByText('Next.js (2)')).toBeInTheDocument();
      // MongoDB appears in 1 project
      expect(screen.getByText('MongoDB (1)')).toBeInTheDocument();
      // Node.js appears in 1 project
      expect(screen.getByText('Node.js (1)')).toBeInTheDocument();
      // PostgreSQL appears in 1 project
      expect(screen.getByText('PostgreSQL (1)')).toBeInTheDocument();
    });

    it('does not display selected tech message when no filters are active', () => {
      render(
        <ProjectFilters projects={mockProjects} selectedTech={[]} onTechToggle={mockOnTechToggle} />
      );
      expect(screen.queryByText(/Showing projects using:/)).not.toBeInTheDocument();
    });

    it('displays selected tech message when filters are active', () => {
      render(
        <ProjectFilters
          projects={mockProjects}
          selectedTech={['React', 'TypeScript']}
          onTechToggle={mockOnTechToggle}
        />
      );
      expect(screen.getByText('Showing projects using: React, TypeScript')).toBeInTheDocument();
    });
  });

  describe('Interaction', () => {
    it('calls onTechToggle when a badge is clicked', () => {
      render(
        <ProjectFilters projects={mockProjects} selectedTech={[]} onTechToggle={mockOnTechToggle} />
      );

      const reactBadge = screen.getByText('React (2)');
      reactBadge.click();

      expect(mockOnTechToggle).toHaveBeenCalledWith('React');
      expect(mockOnTechToggle).toHaveBeenCalledTimes(1);
    });

    it('calls onTechToggle when Enter key is pressed', () => {
      render(
        <ProjectFilters projects={mockProjects} selectedTech={[]} onTechToggle={mockOnTechToggle} />
      );

      const reactBadge = screen.getByText('React (2)');
      reactBadge.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

      expect(mockOnTechToggle).toHaveBeenCalledWith('React');
    });

    it('calls onTechToggle when Space key is pressed', () => {
      render(
        <ProjectFilters projects={mockProjects} selectedTech={[]} onTechToggle={mockOnTechToggle} />
      );

      const reactBadge = screen.getByText('React (2)');
      reactBadge.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));

      expect(mockOnTechToggle).toHaveBeenCalledWith('React');
    });

    it('does not call onTechToggle for other keys', () => {
      render(
        <ProjectFilters projects={mockProjects} selectedTech={[]} onTechToggle={mockOnTechToggle} />
      );

      const reactBadge = screen.getByText('React (2)');
      reactBadge.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true }));

      expect(mockOnTechToggle).not.toHaveBeenCalled();
    });
  });

  describe('Selection State', () => {
    it('marks selected badges with aria-pressed="true"', () => {
      render(
        <ProjectFilters
          projects={mockProjects}
          selectedTech={['React']}
          onTechToggle={mockOnTechToggle}
        />
      );

      const reactBadge = screen.getByText('React (2)').closest('[role="button"]');
      expect(reactBadge).toHaveAttribute('aria-pressed', 'true');
    });

    it('marks unselected badges with aria-pressed="false"', () => {
      render(
        <ProjectFilters
          projects={mockProjects}
          selectedTech={['React']}
          onTechToggle={mockOnTechToggle}
        />
      );

      const typescriptBadge = screen.getByText('TypeScript (2)').closest('[role="button"]');
      expect(typescriptBadge).toHaveAttribute('aria-pressed', 'false');
    });

    it('shows all selected technologies in the message', () => {
      render(
        <ProjectFilters
          projects={mockProjects}
          selectedTech={['React', 'TypeScript', 'Next.js']}
          onTechToggle={mockOnTechToggle}
        />
      );

      expect(
        screen.getByText('Showing projects using: React, TypeScript, Next.js')
      ).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has role="button" on all badges', () => {
      render(
        <ProjectFilters projects={mockProjects} selectedTech={[]} onTechToggle={mockOnTechToggle} />
      );

      const reactBadge = screen.getByText('React (2)').closest('[role="button"]');
      expect(reactBadge).toHaveAttribute('role', 'button');
    });

    it('has tabIndex={0} on all badges for keyboard navigation', () => {
      render(
        <ProjectFilters projects={mockProjects} selectedTech={[]} onTechToggle={mockOnTechToggle} />
      );

      const reactBadge = screen.getByText('React (2)').closest('[role="button"]');
      expect(reactBadge).toHaveAttribute('tabIndex', '0');
    });

    it('has proper aria-pressed state for each badge', () => {
      render(
        <ProjectFilters
          projects={mockProjects}
          selectedTech={['React']}
          onTechToggle={mockOnTechToggle}
        />
      );

      const reactBadge = screen.getByText('React (2)').closest('[role="button"]');
      const nodeBadge = screen.getByText('Node.js (1)').closest('[role="button"]');

      expect(reactBadge).toHaveAttribute('aria-pressed', 'true');
      expect(nodeBadge).toHaveAttribute('aria-pressed', 'false');
    });
  });

  describe('Edge Cases', () => {
    it('renders empty list when no projects provided', () => {
      render(<ProjectFilters projects={[]} selectedTech={[]} onTechToggle={mockOnTechToggle} />);

      expect(screen.getByText('Filter by technology')).toBeInTheDocument();
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('handles projects with empty tech stacks', () => {
      const projectsWithEmptyTech: Project[] = [
        {
          slug: 'empty',
          title: 'Empty Tech',
          description: 'No tech',
          outcome: 'Outcome',
          screenshot: '/test.svg',
          techStack: [],
          links: { caseStudy: '/projects/empty' },
          featured: false,
        },
      ];

      render(
        <ProjectFilters
          projects={projectsWithEmptyTech}
          selectedTech={[]}
          onTechToggle={mockOnTechToggle}
        />
      );

      expect(screen.getByText('Filter by technology')).toBeInTheDocument();
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('handles single technology selection', () => {
      render(
        <ProjectFilters
          projects={mockProjects}
          selectedTech={['MongoDB']}
          onTechToggle={mockOnTechToggle}
        />
      );

      expect(screen.getByText('Showing projects using: MongoDB')).toBeInTheDocument();
    });
  });

  describe('Technology Sorting', () => {
    it('renders technologies in alphabetical order', () => {
      render(
        <ProjectFilters projects={mockProjects} selectedTech={[]} onTechToggle={mockOnTechToggle} />
      );

      const badges = screen.getAllByRole('button');
      const badgeTexts = badges.map((badge) => badge.textContent);

      // Extract tech names (remove counts)
      const techNames = badgeTexts.map((text) => text?.replace(/\s*\(\d+\)/, '') || '');

      // Check alphabetical order
      const sortedTechNames = [...techNames].sort();
      expect(techNames).toEqual(sortedTechNames);
    });
  });
});
