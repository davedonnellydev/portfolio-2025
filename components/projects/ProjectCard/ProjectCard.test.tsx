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

  describe('Links', () => {
    it('renders case study link wrapping main content', () => {
      render(<ProjectCard project={mockProject} />);
      // The title should be within a link to the case study
      const caseStudyLink = screen.getByRole('link', { name: /Test Project/i });
      expect(caseStudyLink).toBeInTheDocument();
      expect(caseStudyLink).toHaveAttribute('href', '/projects/test-project');
    });

    it('renders "Live site" button when live link is provided', () => {
      render(<ProjectCard project={mockProject} />);
      const liveButton = screen.getByRole('link', { name: /Live site/i });
      expect(liveButton).toBeInTheDocument();
      expect(liveButton).toHaveAttribute('href', 'https://example.com/live');
      expect(liveButton).toHaveAttribute('target', '_blank');
      expect(liveButton).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('renders "Repo" button when repo link is provided', () => {
      render(<ProjectCard project={mockProject} />);
      const repoButton = screen.getByRole('link', { name: /^Repo$/i });
      expect(repoButton).toBeInTheDocument();
      expect(repoButton).toHaveAttribute('href', 'https://github.com/test/repo');
      expect(repoButton).toHaveAttribute('target', '_blank');
    });

    it('does not render "Live site" button when live link is not provided', () => {
      const projectWithoutLive = {
        ...mockProject,
        links: { ...mockProject.links, live: undefined },
      };
      render(<ProjectCard project={projectWithoutLive} />);
      expect(screen.queryByRole('link', { name: /Live site/i })).not.toBeInTheDocument();
    });

    it('does not render "Repo" button when repo link is not provided', () => {
      const projectWithoutRepo = {
        ...mockProject,
        links: { ...mockProject.links, repo: undefined },
      };
      render(<ProjectCard project={projectWithoutRepo} />);
      expect(screen.queryByRole('link', { name: /^Repo$/i })).not.toBeInTheDocument();
    });

    it('does not render external links section when both live and repo are missing', () => {
      const projectWithoutExternalLinks = {
        ...mockProject,
        links: { ...mockProject.links, live: undefined, repo: undefined },
      };
      render(<ProjectCard project={projectWithoutExternalLinks} />);
      expect(screen.queryByRole('link', { name: /Live site/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('link', { name: /GitHub repo/i })).not.toBeInTheDocument();
    });
  });

  describe('Search Parameters', () => {
    it('preserves search parameters in case study URL', () => {
      render(<ProjectCard project={mockProject} currentSearchParams="tech=React&search=test" />);
      const caseStudyLink = screen.getByRole('link', { name: /Test Project/i });
      expect(caseStudyLink).toHaveAttribute(
        'href',
        '/projects/test-project?tech=React&search=test'
      );
    });

    it('uses case study URL without parameters when not provided', () => {
      render(<ProjectCard project={mockProject} />);
      const caseStudyLink = screen.getByRole('link', { name: /Test Project/i });
      expect(caseStudyLink).toHaveAttribute('href', '/projects/test-project');
    });
  });

  describe('Analytics Tracking', () => {
    it('tracks case study click with correct parameters', () => {
      render(<ProjectCard project={mockProject} location="home" />);
      const caseStudyLink = screen.getByRole('link', { name: /Test Project/i });

      caseStudyLink.click();

      expect(analytics.trackCaseStudyClick).toHaveBeenCalledWith(
        'test-project',
        'Test Project',
        'home'
      );
    });

    it('tracks live demo click', () => {
      render(<ProjectCard project={mockProject} />);
      const liveButton = screen.getByRole('link', { name: /Live site/i });

      liveButton.click();

      expect(analytics.trackLiveDemoClick).toHaveBeenCalledWith('test-project', 'Test Project');
    });

    it('tracks repo click', () => {
      render(<ProjectCard project={mockProject} />);
      const repoButton = screen.getByRole('link', { name: /^Repo$/i });

      repoButton.click();

      expect(analytics.trackRepoClick).toHaveBeenCalledWith('test-project', 'Test Project');
    });

    it('defaults location to "projects" when not provided', () => {
      render(<ProjectCard project={mockProject} />);
      const caseStudyLink = screen.getByRole('link', { name: /Test Project/i });

      caseStudyLink.click();

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

      const liveButton = screen.getByRole('link', { name: /Live site/i });
      expect(liveButton).toHaveAttribute('target', '_blank');
      expect(liveButton).toHaveAttribute('rel', 'noopener noreferrer');

      const repoButton = screen.getByRole('link', { name: /^Repo$/i });
      expect(repoButton).toHaveAttribute('target', '_blank');
      expect(repoButton).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });
});
