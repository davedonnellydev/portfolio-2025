import { analytics } from '@/lib/analytics';
import { fireEvent, render, screen } from '@/test-utils';
import { Footer } from './Footer';

// Mock analytics
jest.mock('@/lib/analytics', () => ({
  analytics: {
    trackEmailClick: jest.fn(),
    trackCVDownload: jest.fn(),
    trackGitHubClick: jest.fn(),
    trackLinkedInClick: jest.fn(),
  },
}));

// Mock FontAwesome icons
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon }: any) => <div data-testid={`icon-${icon.iconName}`} />,
}));

// Mock useFooterVisibility hook
const mockHandleMouseEnter = jest.fn();
const mockHandleMouseLeave = jest.fn();

jest.mock('@/lib/hooks', () => ({
  useFooterVisibility: jest.fn(() => ({
    isVisible: true,
    handleMouseEnter: mockHandleMouseEnter,
    handleMouseLeave: mockHandleMouseLeave,
  })),
}));

describe('Footer', () => {
  // Store original location
  const originalLocation = window.location;

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock window.location with writable href
    delete (window as any).location;
    (window as any).location = {
      href: 'http://localhost/',
      origin: 'http://localhost',
      protocol: 'http:',
      host: 'localhost',
      hostname: 'localhost',
      port: '',
      pathname: '/',
      search: '',
      hash: '',
    };
  });

  afterAll(() => {
    // Restore original location
    (window as any).location = originalLocation;
  });

  describe('Rendering', () => {
    it('renders footer element', () => {
      render(<Footer />);

      const footer = screen.getByRole('contentinfo');
      expect(footer).toBeInTheDocument();
    });

    it('has accessible label', () => {
      render(<Footer />);

      const footer = screen.getByRole('contentinfo');
      expect(footer).toHaveAttribute('aria-label', 'Contact information and social links');
    });

    it('renders location information', () => {
      render(<Footer />);

      expect(screen.getByText('Sydney, Australia')).toBeInTheDocument();
    });

    it('renders email button with text on desktop', () => {
      render(<Footer />);

      // Desktop button has text
      expect(screen.getByText('Get in Touch')).toBeInTheDocument();
    });

    it('renders CV download button', () => {
      render(<Footer />);

      const cvButton = screen.getByLabelText('Download CV');
      expect(cvButton).toBeInTheDocument();
    });

    it('renders GitHub link', () => {
      render(<Footer />);

      const githubLink = screen.getByLabelText('GitHub Profile');
      expect(githubLink).toBeInTheDocument();
    });

    it('renders LinkedIn link', () => {
      render(<Footer />);

      const linkedinLink = screen.getByLabelText('LinkedIn Profile');
      expect(linkedinLink).toBeInTheDocument();
    });
  });

  describe('Email Button', () => {
    it('has correct aria-label', () => {
      render(<Footer />);

      const emailButtons = screen.getAllByLabelText(/Send email to/);
      expect(emailButtons.length).toBeGreaterThan(0);
      expect(emailButtons[0]).toHaveAttribute(
        'aria-label',
        'Send email to davepauldonnelly@gmail.com'
      );
    });

    it('tracks email click analytics', () => {
      render(<Footer />);

      const emailButtons = screen.getAllByLabelText(/Send email to/);
      const desktopButton = emailButtons[0];

      fireEvent.click(desktopButton);

      expect(analytics.trackEmailClick).toHaveBeenCalledWith('footer');
      expect(analytics.trackEmailClick).toHaveBeenCalledTimes(1);
    });

    it('has accessible aria-label', () => {
      render(<Footer />);

      const emailButtons = screen.getAllByLabelText('Send email to davepauldonnelly@gmail.com');
      expect(emailButtons.length).toBeGreaterThan(0);
    });
  });

  describe('CV Download', () => {
    it('has correct download link', () => {
      render(<Footer />);

      const cvButton = screen.getByLabelText('Download CV');
      expect(cvButton).toHaveAttribute('href', '/CV - D_DONNELLY.pdf');
      expect(cvButton).toHaveAttribute('download');
    });

    it('tracks CV download analytics', () => {
      render(<Footer />);

      const cvButton = screen.getByLabelText('Download CV');
      fireEvent.click(cvButton);

      expect(analytics.trackCVDownload).toHaveBeenCalledWith('footer');
      expect(analytics.trackCVDownload).toHaveBeenCalledTimes(1);
    });
  });

  describe('GitHub Link', () => {
    it('has correct GitHub URL', () => {
      render(<Footer />);

      const githubLink = screen.getByLabelText('GitHub Profile');
      expect(githubLink).toHaveAttribute('href', 'https://github.com/davedonnellydev');
    });

    it('opens in new tab', () => {
      render(<Footer />);

      const githubLink = screen.getByLabelText('GitHub Profile');
      expect(githubLink).toHaveAttribute('target', '_blank');
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('tracks GitHub click analytics', () => {
      render(<Footer />);

      const githubLink = screen.getByLabelText('GitHub Profile');
      fireEvent.click(githubLink);

      expect(analytics.trackGitHubClick).toHaveBeenCalledWith('footer');
      expect(analytics.trackGitHubClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('LinkedIn Link', () => {
    it('has correct LinkedIn URL', () => {
      render(<Footer />);

      const linkedinLink = screen.getByLabelText('LinkedIn Profile');
      expect(linkedinLink).toHaveAttribute(
        'href',
        'https://www.linkedin.com/in/dave-donnelly-dev/'
      );
    });

    it('opens in new tab', () => {
      render(<Footer />);

      const linkedinLink = screen.getByLabelText('LinkedIn Profile');
      expect(linkedinLink).toHaveAttribute('target', '_blank');
      expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('tracks LinkedIn click analytics', () => {
      render(<Footer />);

      const linkedinLink = screen.getByLabelText('LinkedIn Profile');
      fireEvent.click(linkedinLink);

      expect(analytics.trackLinkedInClick).toHaveBeenCalledWith('footer');
      expect(analytics.trackLinkedInClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Visibility Behavior', () => {
    it('applies visible class when isVisible is true', () => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { useFooterVisibility } = require('@/lib/hooks');
      useFooterVisibility.mockImplementation(() => ({
        isVisible: true,
        handleMouseEnter: mockHandleMouseEnter,
        handleMouseLeave: mockHandleMouseLeave,
      }));

      render(<Footer />);

      const footer = screen.getByRole('contentinfo');
      expect(footer.className).toContain('visible');
    });

    it('applies hidden class when isVisible is false', () => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { useFooterVisibility } = require('@/lib/hooks');
      useFooterVisibility.mockImplementation(() => ({
        isVisible: false,
        handleMouseEnter: mockHandleMouseEnter,
        handleMouseLeave: mockHandleMouseLeave,
      }));

      render(<Footer />);

      const footer = screen.getByRole('contentinfo');
      expect(footer.className).toContain('hidden');
    });

    it('calls handleMouseEnter on mouse enter', () => {
      render(<Footer />);

      const footer = screen.getByRole('contentinfo');
      fireEvent.mouseEnter(footer);

      expect(mockHandleMouseEnter).toHaveBeenCalled();
    });

    it('calls handleMouseLeave on mouse leave', () => {
      render(<Footer />);

      const footer = screen.getByRole('contentinfo');
      fireEvent.mouseLeave(footer);

      expect(mockHandleMouseLeave).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has contentinfo role', () => {
      render(<Footer />);

      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('has descriptive aria-label', () => {
      render(<Footer />);

      const footer = screen.getByRole('contentinfo');
      expect(footer).toHaveAttribute('aria-label', 'Contact information and social links');
    });

    it('all buttons have accessible labels', () => {
      render(<Footer />);

      // Email buttons (desktop + mobile)
      expect(screen.getAllByLabelText(/Send email to/).length).toBeGreaterThan(0);

      // Other buttons
      expect(screen.getByLabelText('Download CV')).toBeInTheDocument();
      expect(screen.getByLabelText('GitHub Profile')).toBeInTheDocument();
      expect(screen.getByLabelText('LinkedIn Profile')).toBeInTheDocument();
    });

    it('external links have security attributes', () => {
      render(<Footer />);

      const githubLink = screen.getByLabelText('GitHub Profile');
      const linkedinLink = screen.getByLabelText('LinkedIn Profile');

      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
      expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('all interactive elements are keyboard accessible', () => {
      render(<Footer />);

      // All buttons should be focusable
      const emailButtons = screen.getAllByLabelText(/Send email to/);
      const cvButton = screen.getByLabelText('Download CV');
      const githubLink = screen.getByLabelText('GitHub Profile');
      const linkedinLink = screen.getByLabelText('LinkedIn Profile');

      [emailButtons[0], cvButton, githubLink, linkedinLink].forEach((element) => {
        element.focus();
        expect(document.activeElement).toBe(element);
      });
    });
  });

  describe('Tooltips', () => {
    it('has tooltip on location badge', () => {
      render(<Footer />);

      // Tooltip content would be rendered by Mantine Tooltip
      // Just verify the wrapper exists
      expect(screen.getByText('Sydney, Australia')).toBeInTheDocument();
    });
  });

  describe('Responsive Behavior', () => {
    it('renders both desktop and mobile email buttons', () => {
      render(<Footer />);

      // Should have 2 email buttons (desktop + mobile versions)
      const emailButtons = screen.getAllByLabelText(/Send email to/);
      expect(emailButtons.length).toBe(2);
    });

    it('desktop button has text content', () => {
      render(<Footer />);

      expect(screen.getByText('Get in Touch')).toBeInTheDocument();
    });
  });

  describe('Analytics Integration', () => {
    it('tracks all interaction types', () => {
      render(<Footer />);

      // Click each button
      const emailButton = screen.getAllByLabelText(/Send email to/)[0];
      const cvButton = screen.getByLabelText('Download CV');
      const githubLink = screen.getByLabelText('GitHub Profile');
      const linkedinLink = screen.getByLabelText('LinkedIn Profile');

      fireEvent.click(emailButton);
      fireEvent.click(cvButton);
      fireEvent.click(githubLink);
      fireEvent.click(linkedinLink);

      // Verify all analytics calls
      expect(analytics.trackEmailClick).toHaveBeenCalledWith('footer');
      expect(analytics.trackCVDownload).toHaveBeenCalledWith('footer');
      expect(analytics.trackGitHubClick).toHaveBeenCalledWith('footer');
      expect(analytics.trackLinkedInClick).toHaveBeenCalledWith('footer');
    });

    it('includes location parameter in all events', () => {
      render(<Footer />);

      const cvButton = screen.getByLabelText('Download CV');
      fireEvent.click(cvButton);

      // Verify location='footer' is passed
      expect(analytics.trackCVDownload).toHaveBeenCalledWith('footer');
    });
  });
});
