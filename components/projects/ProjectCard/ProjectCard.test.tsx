import { Project } from '@/data/projects';
import { analytics } from '@/lib/analytics';
import { render, screen } from '@/test-utils';
import { ProjectCard } from './ProjectCard';

// Mock analytics module
jest.mock('@/lib/analytics', () => ({
  analytics: {
    trackCaseStudyClick: jest.fn(),
    trackLiveDemoClick: jest.fn(),
    trackRepoClick: jest.fn(),
  },
}));

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockImage({ src, alt }: { src: string; alt: string }) {
    return <img src={src} alt={alt} />;
  },
}));

describe('ProjectCard', () => {
  const mockProject: Project = {
    slug: 'test-project',
    title: 'Test Project',
    description: 'A test project description',
    outcome: 'Increased efficiency by 50%',
    screenshot: '/images/projects/test.svg',
    techStack: ['React', 'TypeScript', 'Next.js'],
    links: {
      live: 'https://example.com/live',
      repo: 'https://github.com/test/repo',
      caseStudy: '/projects/test-project',
    },
    featured: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders project title', () => {
      render(<ProjectCard project={mockProject} />);
      expect(screen.getByRole('heading', { name: 'Test Project' })).toBeInTheDocument();
    });

    it('renders project description', () => {
      render(<ProjectCard project={mockProject} />);
      expect(screen.getByText('A test project description')).toBeInTheDocument();
    });

    it('renders project outcome', () => {
      render(<ProjectCard project={mockProject} />);
      expect(screen.getByText(/Increased efficiency by 50%/)).toBeInTheDocument();
      expect(screen.getByText('Outcome:')).toBeInTheDocument();
    });

    it('renders project screenshot with correct alt text', () => {
      render(<ProjectCard project={mockProject} />);
      const image = screen.getByAltText('Screenshot of Test Project');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', '/images/projects/test.svg');
    });

    it('renders all tech stack badges', () => {
      render(<ProjectCard project={mockProject} />);
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('Next.js')).toBeInTheDocument();
    });
  });

  describe('Action Buttons', () => {
    it('renders "Read case study" button with correct link', () => {
      render(<ProjectCard project={mockProject} />);
      const caseStudyButton = screen.getByRole('link', { name: /Read case study/i });
      expect(caseStudyButton).toBeInTheDocument();
      expect(caseStudyButton).toHaveAttribute('href', '/projects/test-project');
    });

    it('renders "Live" button when live link is provided', () => {
      render(<ProjectCard project={mockProject} />);
      const liveButton = screen.getByRole('link', { name: /Live/i });
      expect(liveButton).toBeInTheDocument();
      expect(liveButton).toHaveAttribute('href', 'https://example.com/live');
      expect(liveButton).toHaveAttribute('target', '_blank');
      expect(liveButton).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('renders "Code" button when repo link is provided', () => {
      render(<ProjectCard project={mockProject} />);
      const codeButton = screen.getByRole('link', { name: /Code/i });
      expect(codeButton).toBeInTheDocument();
      expect(codeButton).toHaveAttribute('href', 'https://github.com/test/repo');
      expect(codeButton).toHaveAttribute('target', '_blank');
    });

    it('does not render "Live" button when live link is not provided', () => {
      const projectWithoutLive = {
        ...mockProject,
        links: { ...mockProject.links, live: undefined },
      };
      render(<ProjectCard project={projectWithoutLive} />);
      expect(screen.queryByRole('link', { name: /Live/i })).not.toBeInTheDocument();
    });

    it('does not render "Code" button when repo link is not provided', () => {
      const projectWithoutRepo = {
        ...mockProject,
        links: { ...mockProject.links, repo: undefined },
      };
      render(<ProjectCard project={projectWithoutRepo} />);
      expect(screen.queryByRole('link', { name: /Code/i })).not.toBeInTheDocument();
    });
  });

  describe('Search Parameters', () => {
    it('preserves search parameters in case study URL', () => {
      render(<ProjectCard project={mockProject} currentSearchParams="tech=React&search=test" />);
      const caseStudyButton = screen.getByRole('link', { name: /Read case study/i });
      expect(caseStudyButton).toHaveAttribute(
        'href',
        '/projects/test-project?tech=React&search=test'
      );
    });

    it('uses case study URL without parameters when not provided', () => {
      render(<ProjectCard project={mockProject} />);
      const caseStudyButton = screen.getByRole('link', { name: /Read case study/i });
      expect(caseStudyButton).toHaveAttribute('href', '/projects/test-project');
    });
  });

  describe('Analytics Tracking', () => {
    it('tracks case study click with correct parameters', () => {
      render(<ProjectCard project={mockProject} location="home" />);
      const caseStudyButton = screen.getByRole('link', { name: /Read case study/i });

      caseStudyButton.click();

      expect(analytics.trackCaseStudyClick).toHaveBeenCalledWith(
        'test-project',
        'Test Project',
        'home'
      );
    });

    it('tracks live demo click', () => {
      render(<ProjectCard project={mockProject} />);
      const liveButton = screen.getByRole('link', { name: /Live/i });

      liveButton.click();

      expect(analytics.trackLiveDemoClick).toHaveBeenCalledWith('test-project', 'Test Project');
    });

    it('tracks repo click', () => {
      render(<ProjectCard project={mockProject} />);
      const codeButton = screen.getByRole('link', { name: /Code/i });

      codeButton.click();

      expect(analytics.trackRepoClick).toHaveBeenCalledWith('test-project', 'Test Project');
    });

    it('defaults location to "projects" when not provided', () => {
      render(<ProjectCard project={mockProject} />);
      const caseStudyButton = screen.getByRole('link', { name: /Read case study/i });

      caseStudyButton.click();

      expect(analytics.trackCaseStudyClick).toHaveBeenCalledWith(
        'test-project',
        'Test Project',
        'projects'
      );
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      render(<ProjectCard project={mockProject} />);
      const heading = screen.getByRole('heading', { name: 'Test Project' });
      expect(heading.tagName).toBe('H3');
    });

    it('has descriptive alt text for screenshot', () => {
      render(<ProjectCard project={mockProject} />);
      expect(screen.getByAltText('Screenshot of Test Project')).toBeInTheDocument();
    });

    it('opens external links in new tab with security attributes', () => {
      render(<ProjectCard project={mockProject} />);

      const liveButton = screen.getByRole('link', { name: /Live/i });
      expect(liveButton).toHaveAttribute('target', '_blank');
      expect(liveButton).toHaveAttribute('rel', 'noopener noreferrer');

      const codeButton = screen.getByRole('link', { name: /Code/i });
      expect(codeButton).toHaveAttribute('target', '_blank');
      expect(codeButton).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });
});
